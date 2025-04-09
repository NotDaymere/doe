import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftIcon from "../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../shared/icons/ArrowRight.icon";

const regularFont = "/fonts/Roboto_Condensed-Regular.ttf";
const boldFont = "/fonts/Roboto_Condensed-ExtraBold.ttf";

const pdfUrlCache: { [key: string]: string } = {};

export interface PDFViewerHandle {
    saveAnnotations: () => Promise<string>;
}

interface TextAnnotation {
    page: number;
    x: number;
    y: number;
    text: string;
    maxWidth: number;
    fontColor: string;
    fontSize: number;
    fontWeight: "regular" | "bold";
    pdfX?: number;
    pdfY?: number;
    pdfFontSize?: number;
}

interface PDFViewerProps {
    url: string;
    isDrawingEnabled: boolean;
    isTextMode: boolean;
    drawingColor: string;
    fontWeight: "regular" | "bold";
    fontSize: number;
    fontColor: string;
    setIsTextMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PDFViewer = forwardRef<PDFViewerHandle, PDFViewerProps>(
    (
        {
            url,
            isDrawingEnabled,
            isTextMode,
            setIsTextMode,
            drawingColor,
            fontWeight,
            fontSize,
            fontColor,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
        const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
        const [originalDimensions, setOriginalDimensions] = useState<
            Array<{ width: number; height: number }>
        >([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
        const [activeTextInput, setActiveTextInput] = useState<{
            page: number;
            x: number;
            y: number;
        } | null>(null);
        const [activeDraggableAnnotation, setActiveDraggableAnnotation] =
            useState<TextAnnotation | null>(null);
        const [dragOffset, setDragOffset] = useState<{ offsetX: number; offsetY: number } | null>(null);
        const draggingRef = useRef(false);
        const drawingColorRef = useRef(drawingColor);

        const [hasAnnotationsChanged, setHasAnnotationsChanged] = useState(false);
        const workerRef = useRef<Worker | null>(null);

        useEffect(() => {
            drawingColorRef.current = drawingColor;
        }, [drawingColor]);

        useEffect(() => {
            workerRef.current = new Worker(new URL("./pdfWorker.ts", import.meta.url), { type: "module" });
            workerRef.current.onerror = (err) => {
                console.error("Worker error:", err);
            };
            return () => {
                workerRef.current?.terminate();
            };
        }, []);

        useEffect(() => {
            (async () => {
                const loadedPdf = await pdfjsLib.getDocument(url).promise;
                setPdf(loadedPdf);
                const dims: Array<{ width: number; height: number }> = [];
                for (let i = 1; i <= loadedPdf.numPages; i++) {
                    const page = await loadedPdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1 });
                    dims.push({ width: viewport.width, height: viewport.height });
                }
                setOriginalDimensions(dims);

                if (!pdfUrlCache[url]) {
                    pdfUrlCache[url] = url;
                    console.log("Initialized cache with original URL:", url);
                }
            })();
        }, [url]);

        const fixedWidth = window.innerWidth * 0.3;
        const fixedHeight = window.innerHeight * 0.8;

        const getCanvasCoordinates = (
            e: MouseEvent | TouchEvent | React.MouseEvent,
            canvas: HTMLCanvasElement
        ) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };
        };

        const isDrawingRef = useRef(false);
        const lastPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

        const startDrawing = (e: MouseEvent | TouchEvent, page: number) => {
            const canvas = canvasRefs.current[page * 2 + 1];
            if (!canvas) return;
            const { x, y } = getCanvasCoordinates(e, canvas);
            isDrawingRef.current = true;
            lastPointRef.current = { x, y };
        };

        const draw = (e: MouseEvent | TouchEvent, page: number) => {
            if (!isDrawingRef.current) return;
            const canvas = canvasRefs.current[page * 2 + 1];
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const { x, y } = getCanvasCoordinates(e, canvas);
            const pr = window.devicePixelRatio || 1;
            ctx.beginPath();
            ctx.moveTo(lastPointRef.current.x * pr, lastPointRef.current.y * pr);
            ctx.lineTo(x * pr, y * pr);
            ctx.strokeStyle = drawingColorRef.current;
            ctx.lineWidth = 5 * pr;
            ctx.stroke();
            if (lastPointRef.current.x !== x || lastPointRef.current.y !== y) {
                setHasAnnotationsChanged(true);
                console.log("Annotations changed due to drawing");
            }
            lastPointRef.current = { x, y };
        };

        const endDrawing = () => {
            isDrawingRef.current = false;
        };

        const handleTextInput = (
            e: React.KeyboardEvent<HTMLInputElement>,
            page: number,
            x: number,
            y: number
        ) => {
            if (e.key === "Enter") {
                const text = e.currentTarget.value.trim();
                if (text) {
                    const safeFontColor =
                        fontColor && /^#[0-9A-F]{6}$/i.test(fontColor) ? fontColor : "#000000";
                    const safeFontSize = fontSize || 18;
                    const safeFontWeight = fontWeight || "regular";

                    const canvas = canvasRefs.current[page * 2 + 1];
                    const canvasRect = canvas ? canvas.getBoundingClientRect() : { width: fixedWidth };
                    const availableWidth = canvasRect.width - x;
                    const newAnnotation: TextAnnotation = {
                        page,
                        x,
                        y,
                        text,
                        maxWidth: Math.min(availableWidth, 600),
                        fontColor: safeFontColor,
                        fontSize: safeFontSize,
                        fontWeight: safeFontWeight,
                        pdfX: x,
                        pdfY: fixedHeight - y - safeFontSize,
                        pdfFontSize: safeFontSize,
                    };
                    setActiveDraggableAnnotation(newAnnotation);
                    setHasAnnotationsChanged(true);
                    console.log("Annotations changed due to text input");
                }
                setActiveTextInput(null);
                setIsTextMode(false);
            }
        };

        const onDraggableMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
            draggingRef.current = true;
            const rect = (e.target as HTMLDivElement).getBoundingClientRect();
            setDragOffset({ offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top });
        };

        const onDraggableMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!draggingRef.current || !activeDraggableAnnotation || !dragOffset) return;
            const pageContainers = containerRef.current?.getElementsByClassName("pageContainer");
            if (!pageContainers) return;
            const pageContainer = pageContainers[activeDraggableAnnotation.page] as HTMLElement;
            if (!pageContainer) return;
            const pageContainerRect = pageContainer.getBoundingClientRect();
            const newX = e.clientX - pageContainerRect.left - dragOffset.offsetX;
            const newY = e.clientY - pageContainerRect.top - dragOffset.offsetY;
            setActiveDraggableAnnotation({
                ...activeDraggableAnnotation,
                x: newX,
                y: newY,
            });
            setHasAnnotationsChanged(true);
            console.log("Annotations changed due to dragging");
        };

        const onDraggableMouseUp = () => {
            if (activeDraggableAnnotation) {
                setTextAnnotations((prev) => [...prev, activeDraggableAnnotation]);
                setActiveDraggableAnnotation(null);
            }
            draggingRef.current = false;
            setDragOffset(null);
        };

        const handleCanvasClick = (e: React.MouseEvent, pageIndex: number) => {
            if (!isTextMode || isDrawingEnabled) return;
            const canvas = canvasRefs.current[pageIndex * 2 + 1];
            if (!canvas) return;
            const { x, y } = getCanvasCoordinates(e, canvas);
            setActiveTextInput({ page: pageIndex, x, y });
        };

        useEffect(() => {
            if (!pdf || !originalDimensions.length) return;
            (async () => {
                const pr = window.devicePixelRatio || 1;
                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const { width: ow, height: oh } = originalDimensions[i];
                    const scale = Math.min(fixedWidth / ow, fixedHeight / oh);
                    const viewport = page.getViewport({ scale });
                    const pdfCanvas = canvasRefs.current[i * 2]!;
                    const drawCanvas = canvasRefs.current[i * 2 + 1]!;
                    pdfCanvas.width = fixedWidth * pr;
                    pdfCanvas.height = fixedHeight * pr;
                    drawCanvas.width = fixedWidth * pr;
                    drawCanvas.height = fixedHeight * pr;
                    const ctx = pdfCanvas.getContext("2d")!;
                    ctx.scale(pr, pr);
                    await page.render({ canvasContext: ctx, viewport }).promise;
                }
            })();
        }, [pdf, originalDimensions]);

        useEffect(() => {
            canvasRefs.current.forEach((c, idx) => {
                if (idx % 2 === 1 && c) {
                    c.onmousedown = isDrawingEnabled
                        ? (e) => startDrawing(e, Math.floor(idx / 2))
                        : null;
                    c.onmousemove = isDrawingEnabled
                        ? (e) => draw(e, Math.floor(idx / 2))
                        : null;
                    c.onmouseup = isDrawingEnabled ? endDrawing : null;
                    c.onmouseleave = isDrawingEnabled ? endDrawing : null;
                    c.ontouchstart = isDrawingEnabled
                        ? (e) => startDrawing(e, Math.floor(idx / 2))
                        : null;
                    c.ontouchmove = isDrawingEnabled
                        ? (e) => draw(e, Math.floor(idx / 2))
                        : null;
                    c.ontouchend = isDrawingEnabled ? endDrawing : null;
                    c.style.pointerEvents = isDrawingEnabled ? "auto" : "none";
                }
            });
        }, [isDrawingEnabled]);

        useEffect(() => {
            const cont = containerRef.current;
            if (!cont) return;
            const onScroll = () => {
                const pages = Array.from(cont.getElementsByClassName("pageContainer")) as HTMLElement[];
                const best = pages.reduce(
                    (acc, el, i) => {
                        const d = Math.abs(el.offsetTop - cont.scrollTop);
                        return d < acc.dist ? { dist: d, idx: i } : acc;
                    },
                    { dist: Infinity, idx: 0 }
                );
                setCurrentPage(best.idx + 1);
            };
            cont.addEventListener("scroll", onScroll);
            return () => cont.removeEventListener("scroll", onScroll);
        }, [pdf]);

        const scrollToPage = (p: number) => {
            const el = containerRef.current?.getElementsByClassName("pageContainer")[p - 1] as HTMLElement;
            el?.scrollIntoView({ behavior: "smooth" });
        };

        const saveAnnotations = async (): Promise<string> => {
            if (!hasAnnotationsChanged && pdfUrlCache[url]) {
                return Promise.resolve(pdfUrlCache[url]);
            }

            if (!pdf) throw new Error("PDF not loaded");
            const arrayBuffer = await fetch(url).then((r) => r.arrayBuffer());
            const drawCanvasesData: string[] = [];
            for (let i = 0; i < pdf.numPages; i++) {
                const canvas = canvasRefs.current[i * 2 + 1];
                drawCanvasesData.push(canvas ? canvas.toDataURL("image/png") : "");
            }

            const payload = {
                pdfArrayBuffer: arrayBuffer,
                drawCanvasesData,
                textAnnotations,
                originalDimensions,
                regularFontUrl: regularFont,
                boldFontUrl: boldFont,
            };

            return new Promise((resolve, reject) => {
                if (!workerRef.current) {
                    reject(new Error("Worker is not initialized"));
                    return;
                }
                workerRef.current.onmessage = (event: MessageEvent<any>) => {
                    const { status, pdfBlob, error } = event.data;
                    if (status === "success") {
                        const blob = new Blob([pdfBlob], { type: "application/pdf" });
                        const newUrl = URL.createObjectURL(blob);
                        console.log("New PDF URL generated:", newUrl);
                        pdfUrlCache[url] = newUrl;
                        setHasAnnotationsChanged(false);
                        resolve(newUrl);
                    } else {
                        console.error("Worker error:", error);
                        reject(new Error(error));
                    }
                };
                workerRef.current.onerror = (err) => {
                    console.error("Worker error:", err);
                    reject(err);
                };
                workerRef.current.postMessage({ type: "saveAnnotations", payload });
            });
        };

        useImperativeHandle(ref, () => ({
            saveAnnotations,
        }));

        useEffect(() => {
            if (isTextMode && !activeTextInput) {
                let x = fixedWidth / 3;
                let y = fixedHeight / 2.5;
                const firstCanvas = canvasRefs.current[1];
                if (firstCanvas) {
                    const { width } = firstCanvas.getBoundingClientRect();
                    x = width / 3;
                    y = fixedHeight / 2.5;
                }
                setActiveTextInput({
                    page: currentPage - 1,
                    x,
                    y,
                });
            }
        }, [isTextMode, activeTextInput, currentPage, fixedWidth, fixedHeight]);

        return (
            <div className={css.modalPdfContainer}>
                <div className={css.modalPdf} ref={containerRef}>
                    {pdf &&
                        originalDimensions.length > 0 &&
                        Array.from({ length: pdf.numPages }, (_, i) => (
                            <div
                                key={i}
                                className="pageContainer"
                                style={{
                                    position: "relative",
                                    width: `${fixedWidth}px`,
                                    height: `${fixedHeight}px`,
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                    marginBottom: 10,
                                    overflow: "hidden",
                                }}
                                onClick={(e) => handleCanvasClick(e, i)}
                            >
                                <canvas
                                    ref={(el) => (canvasRefs.current[i * 2] = el)}
                                    className={css.pdfCanvas}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                    }}
                                />
                                <canvas
                                    ref={(el) => (canvasRefs.current[i * 2 + 1] = el)}
                                    className={css.drawCanvas}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        zIndex: 10,
                                        touchAction: "none",
                                    }}
                                />
                                {activeTextInput && activeTextInput.page === i && (
                                    <input
                                        type="text"
                                        className={css.textAnnotationInput}
                                        style={{
                                            position: "absolute",
                                            transform: `translate(${activeTextInput.x}px, ${activeTextInput.y}px)`,
                                            maxWidth: "150px",
                                            fontWeight,
                                            fontSize: `${fontSize}px`,
                                            color: fontColor,
                                            border: "none",
                                            overflow: "hidden",
                                            zIndex: 20,
                                            whiteSpace: "nowrap",
                                        }}
                                        autoFocus
                                        onKeyDown={(e) =>
                                            handleTextInput(e, i, activeTextInput.x, activeTextInput.y)
                                        }
                                    />
                                )}
                                {activeDraggableAnnotation && activeDraggableAnnotation.page === i && (
                                    <div
                                        className={css.textAnnotation}
                                        style={{
                                            position: "absolute",
                                            transform: `translate(${activeDraggableAnnotation.x}px, ${activeDraggableAnnotation.y}px)`,
                                            maxWidth: "1000px",
                                            fontSize: `${activeDraggableAnnotation.fontSize}px`,
                                            color: activeDraggableAnnotation.fontColor,
                                            fontWeight: activeDraggableAnnotation.fontWeight === "bold" ? "bold" : "normal",
                                            cursor: "grabbing",
                                            zIndex: 20,
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            userSelect: "none",
                                        }}
                                        onMouseDown={onDraggableMouseDown}
                                        onMouseMove={onDraggableMouseMove}
                                        onMouseUp={onDraggableMouseUp}
                                    >
                                        {activeDraggableAnnotation.text}
                                    </div>
                                )}
                                {textAnnotations
                                    .filter((t) => t.page === i)
                                    .map((t, idx) => (
                                        <div
                                            key={idx}
                                            className={css.textAnnotation}
                                            style={{
                                                position: "absolute",
                                                transform: `translate(${t.x}px, ${t.y}px)`,
                                                maxWidth: "1000px",
                                                fontSize: `${t.fontSize}px`,
                                                color: t.fontColor,
                                                fontWeight: t.fontWeight === "bold" ? "bold" : "normal",
                                                cursor: "auto",
                                                zIndex: 20,
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {t.text}
                                        </div>
                                    ))}
                            </div>
                        ))}
                </div>
                <div className={css.modalPdfPageSlideWrapper}>
                    <button onClick={() => currentPage > 1 && scrollToPage(currentPage - 1)}>
                        <ArrowLeftIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                    </button>
                    <span>
                        {currentPage} {pdf ? `/ ${pdf.numPages}` : ""}
                    </span>
                    <button
                        onClick={() =>
                            pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)
                        }
                    >
                        <ArrowRightIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                    </button>
                </div>
            </div>
        );
    }
);

PDFViewer.displayName = "PDFViewer";
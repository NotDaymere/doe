import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import css from "./PdfFilePreviewModal.module.less";
import ArrowRightButtonIcon from "../../../../../shared/icons/ArrowRightButton.icon";
import ArrowLeftButtonIcon from "../../../../../shared/icons/ArrowLeftButton.icon";
import { TextAnnotation } from "./pdfWorker";
import * as pdfjsLib from "pdfjs-dist";

import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.entry.js?url";

const pdfUrlCache = new Map<string, string>()

export interface PDFViewerHandle {
    saveAnnotations: () => Promise<string>;
}
const regularFont = "/fonts/Roboto_Condensed-Regular.ttf";
const boldFont = "/fonts/Roboto_Condensed-ExtraBold.ttf";

export interface PDFViewerHandle {
    saveAnnotations: () => Promise<string>;
}

interface PDFViewerProps {
    url: string | Blob;
    isDrawingEnabled: boolean;
    isTextMode: boolean;
    drawingColor: string;
    fontWeight: "regular" | "bold";
    fontSize: number;
    fontColor: string;
    setIsTextMode: React.Dispatch<React.SetStateAction<boolean>>;
    onLoad?: () => void;
}


async function resolveWorkerSrc(): Promise<string | null> {
    const cdnUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const buildRoot = "/pdf.worker.min.js";
    const buildStatic = "/static/pdf.worker.min.js";
    const npmEntry = pdfWorkerUrl;
    const candidates = [
        { name: "CDN", url: cdnUrl },
        { name: "BUILD_ROOT", url: buildRoot },
        { name: "BUILD_STATIC", url: buildStatic },
        { name: "NPM_ENTRY", url: npmEntry },
    ];

    for (const { name, url } of candidates) {
        try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) return url;
        } catch (err) {

        }
    }
    pdfjsLib.GlobalWorkerOptions.disableWorker = true;
    return null;
}

resolveWorkerSrc().then((src) => {
    if (src) pdfjsLib.GlobalWorkerOptions.workerSrc = src;
});

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
            onLoad,
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
        const [hasAnnotationsChanged, setHasAnnotationsChanged] = useState(false);
        const draggingRef = useRef(false);
        const drawingColorRef = useRef(drawingColor);
        const workerRef = useRef<Worker | null>(null);

        useEffect(() => {
            drawingColorRef.current = drawingColor;
        }, [drawingColor]);

        useEffect(() => {
            try {
                workerRef.current = new Worker(new URL("./pdfWorker.ts", import.meta.url), { type: "module" });
            } catch (err) {
                console.error("[pdfWorker] Worker spawn failed", err);
            }
            return () => workerRef.current?.terminate();
        }, []);

        useEffect(() => {
            (async () => {
                let doc: pdfjsLib.PDFDocumentProxy | null = null;

                if (typeof url === "string" && /^https?:\/\//.test(url)) {
                    try {
                        doc = await pdfjsLib.getDocument({ url }).promise;
                    } catch (err1) {
                        console.warn("[load] getDocument({url}) failed", err1);
                    }
                }

                if (!doc && typeof url === "string") {
                    try {
                        const buf = await fetch(url).then(r => r.arrayBuffer());
                        doc = await pdfjsLib.getDocument({ data: buf }).promise;
                    } catch (err2) {
                        console.warn("[load] fetch+data failed", err2);
                    }
                }

                if (!doc && (typeof url === "string" && url.startsWith("blob:") || url instanceof Blob)) {
                    try {
                        const buf = typeof url === "string" ? await fetch(url).then(r => r.arrayBuffer()) : await url.arrayBuffer();
                        doc = await pdfjsLib.getDocument({ data: buf }).promise;
                    } catch (err3) {
                        console.warn("[load] blob→data failed", err3);
                    }
                }

                if (!doc && !pdfjsLib.GlobalWorkerOptions.disableWorker) {
                    console.debug("[load] retry with disableWorker = true");
                    pdfjsLib.GlobalWorkerOptions.disableWorker = true;
                    try {
                        const buf = typeof url === "string" ? await fetch(url).then(r => r.arrayBuffer()) : await (url as Blob).arrayBuffer();
                        doc = await pdfjsLib.getDocument({ data: buf, disableWorker: true }).promise;
                    } catch (err4) {
                        console.error("[load] disableWorker fallback failed", err4);
                    }
                }

                if (!doc) {
                    console.error("[load] all PDF load strategies failed");
                    return;
                }

                setPdf(doc);
                const dims: { width: number; height: number }[] = [];
                for (let i = 1; i <= doc.numPages; i++) {
                    const p = await doc.getPage(i);
                    const vp = p.getViewport({ scale: 1 });
                    dims.push({ width: vp.width, height: vp.height });
                }
                setOriginalDimensions(dims);

                if (typeof url === "string" && !pdfUrlCache.has(url)) {
                    pdfUrlCache.set(url, url);
                }
                onLoad?.();
            })();
        }, [url, onLoad]);


        const computePageDimensions = (pageIndex: number) => {
            const { width: ow, height: oh } = originalDimensions[pageIndex];
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            const scaleFactor = Math.min(maxWidth / ow, maxHeight / oh, 1);
            const pageWidth = ow * scaleFactor;
            const pageHeight = oh * scaleFactor;
            return { pageWidth, pageHeight, scaleFactor };
        };

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
                    const canvasRect = canvas ? canvas.getBoundingClientRect() : { width: 100 };
                    const availableWidth = canvasRect.width - x;

                    const { width: ow, height: oh } = originalDimensions[page];
                    const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(page);

                    const pdfX = (x / pageWidth) * ow;
                    const pdfY = oh - (y / pageHeight) * oh - (safeFontSize * scaleFactor);
                    const pdfFontSize = safeFontSize * scaleFactor;
                    const pdfMaxWidth = (availableWidth / pageWidth) * ow;

                    const newAnnotation: TextAnnotation = {
                        page,
                        x,
                        y,
                        text,
                        maxWidth: pdfMaxWidth,
                        fontColor: safeFontColor,
                        fontSize: safeFontSize,
                        fontWeight: safeFontWeight,
                        pdfX,
                        pdfY,
                        pdfFontSize,
                    };
                    setActiveDraggableAnnotation(newAnnotation);
                    setHasAnnotationsChanged(true);
                }
                setActiveTextInput(null);
                setIsTextMode(false);
            }
        };

        const onDraggableMouseDown = (
            e: React.MouseEvent<HTMLDivElement>, type: "input" | "annotation"
        ) => {
            e.stopPropagation();
            draggingRef.current = true;
            const rect = (e.target as HTMLDivElement).getBoundingClientRect();
            setDragOffset({ offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top });
        };

        const onDraggableMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!draggingRef.current || !dragOffset) return;

            const pageContainers = containerRef.current?.getElementsByClassName("pageContainer");
            if (!pageContainers) return;

            if (activeDraggableAnnotation) {
                const pageContainer = pageContainers[activeDraggableAnnotation.page] as HTMLElement;
                if (!pageContainer) return;
                const pageContainerRect = pageContainer.getBoundingClientRect();
                const newX = e.clientX - pageContainerRect.left - dragOffset.offsetX;
                const newY = e.clientY - pageContainerRect.top - dragOffset.offsetY;

                const { width: ow, height: oh } = originalDimensions[activeDraggableAnnotation.page];
                const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(activeDraggableAnnotation.page);
                const pdfX = (newX / pageWidth) * ow;
                const pdfY = oh - (newY / pageHeight) * oh - (activeDraggableAnnotation.fontSize * scaleFactor);

                if (newX !== activeDraggableAnnotation.x || newY !== activeDraggableAnnotation.y) {
                    setActiveDraggableAnnotation({
                        ...activeDraggableAnnotation,
                        x: newX,
                        y: newY,
                        pdfX,
                        pdfY,
                    });
                    setHasAnnotationsChanged(true);
                }
            } else if (activeTextInput) {
                const pageContainer = pageContainers[activeTextInput.page] as HTMLElement;
                if (!pageContainer) return;
                const pageContainerRect = pageContainer.getBoundingClientRect();
                const newX = e.clientX - pageContainerRect.left - dragOffset.offsetX;
                const newY = e.clientY - pageContainerRect.top - dragOffset.offsetY;

                setActiveTextInput({
                    ...activeTextInput,
                    x: newX,
                    y: newY,
                });
            }
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
            if (!isTextMode || isDrawingEnabled || activeTextInput) return;
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
                    const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(i);
                    const viewport = page.getViewport({ scale: scaleFactor });
                    const pdfCanvas = canvasRefs.current[i * 2]!;
                    const drawCanvas = canvasRefs.current[i * 2 + 1]!;
                    pdfCanvas.width = pageWidth * pr;
                    pdfCanvas.height = pageHeight * pr;
                    drawCanvas.width = pageWidth * pr;
                    drawCanvas.height = pageHeight * pr;
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
            if (!hasAnnotationsChanged && pdfUrlCache.has(url)) {
                return Promise.resolve(pdfUrlCache.get(url)!);
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
                        pdfUrlCache.set(url, newUrl);
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
            if (isTextMode && !activeTextInput && originalDimensions[currentPage - 1]) {
                const { width: ow, height: oh } = originalDimensions[currentPage - 1];
                const maxWidth = window.innerWidth * 0.8;
                const maxHeight = window.innerHeight * 0.8;
                const scale = Math.min(maxWidth / ow, maxHeight / oh, 1);
                const pageWidth = ow * scale;
                setActiveTextInput({
                    page: currentPage - 1,
                    x: pageWidth / 3,
                    y: (oh * scale) / 2.5,
                });
            }
        }, [isTextMode, activeTextInput, currentPage, originalDimensions]);

        return (
            <div className={css.modalPdfContainer}>
                <div className={css.modalPdf} ref={containerRef}>
                    {pdf &&
                        originalDimensions.length > 0 &&
                        Array.from({ length: pdf.numPages }, (_, i) => {
                            const { pageWidth, pageHeight } = computePageDimensions(i);
                            return (
                                <div
                                    key={i}
                                    className="pageContainer"
                                    style={{
                                        position: "relative",
                                        width: `${pageWidth}px`,
                                        height: `${pageHeight}px`,
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
                                        <div
                                            className={css.annotationContainer}
                                            style={{
                                                position: "absolute",
                                                transform: `translate(${activeTextInput.x}px, ${activeTextInput.y}px)`,
                                                cursor: draggingRef.current ? "grabbing" : "grab",
                                                zIndex: 20,
                                            }}
                                            onMouseDown={(e) => onDraggableMouseDown(e, "input")}
                                            onMouseMove={onDraggableMouseMove}
                                            onMouseUp={onDraggableMouseUp}
                                        >
                                            <input
                                                type="text"
                                                className={css.textAnnotationInput}
                                                style={{
                                                    maxWidth: "150px",
                                                    fontWeight,
                                                    fontSize: `${fontSize}px`,
                                                    color: fontColor,
                                                    border: "none",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                }}
                                                autoFocus
                                                onKeyDown={(e) => handleTextInput(e, i, activeTextInput.x, activeTextInput.y)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    )}
                                    {activeTextInput && activeTextInput.page === i && (
                                        <div
                                            className={css.annotationContainer}
                                            style={{
                                                position: "absolute",
                                                transform: `translate(${activeTextInput.x}px, ${activeTextInput.y}px)`,
                                                cursor: draggingRef.current ? "grabbing" : "grab",
                                                zIndex: 20,
                                            }}
                                            onMouseDown={(e) => onDraggableMouseDown(e, "input")}
                                            onMouseMove={onDraggableMouseMove}
                                            onMouseUp={onDraggableMouseUp}
                                        >
                                            <input
                                                type="text"
                                                className={css.textAnnotationInput}
                                                style={{
                                                    maxWidth: "150px",
                                                    fontWeight,
                                                    fontSize: `${fontSize}px`,
                                                    color: fontColor,
                                                    border: "none",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                }}
                                                autoFocus
                                                onKeyDown={(e) => handleTextInput(e, i, activeTextInput.x, activeTextInput.y)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
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
                                                cursor: draggingRef.current ? "grabbing" : "grab",
                                                zIndex: 20,
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                userSelect: "none",
                                            }}
                                            onMouseDown={(e) => onDraggableMouseDown(e, "annotation")}
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
                            );
                        })}
                </div>
                <div className={css.modalPdfPageSlideWrapper}>
                    <button onClick={() => currentPage > 1 && scrollToPage(currentPage - 1)}>
                        <ArrowLeftButtonIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                    </button>
                    <span>
                        {currentPage} {pdf ? `/ ${pdf.numPages}` : ""}
                    </span>
                    <button
                        onClick={() =>
                            pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)
                        }
                    >
                        <ArrowRightButtonIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                    </button>
                </div>
            </div>
        );
    }
);

PDFViewer.displayName = "PDFViewer";
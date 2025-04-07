import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, rgb } from "pdf-lib";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftIcon from "../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../shared/icons/ArrowRight.icon";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFViewerHandle {
    saveAnnotations: () => Promise<string>;
}

interface TextAnnotation {
    page: number;
    x: number;
    y: number;
    text: string;
    maxWidth: number;
    height: number;
    fontColor: string;
    fontSize: number;
    fontWeight: "400" | "700";
}

interface PDFViewerProps {
    url: string;
    isDrawingEnabled: boolean;
    isTextMode: boolean;
    drawingColor: string;
    fontWeight: "400" | "700";
    fontSize: number;
    fontColor: string;
    setIsTextMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PDFViewer = forwardRef<PDFViewerHandle, PDFViewerProps>(
    ({ url, isDrawingEnabled, isTextMode, setIsTextMode, drawingColor, fontWeight, fontSize, fontColor }, ref) => {
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
        const drawingColorRef = useRef(drawingColor);

        useEffect(() => {
            drawingColorRef.current = drawingColor;
        }, [drawingColor]);

        useEffect(() => {
            (async () => {
                const loadedPdf = await pdfjsLib.getDocument(url).promise;
                setPdf(loadedPdf);
                const dims: Array<{ width: number; height: number }> = [];
                for (let i = 1; i <= loadedPdf.numPages; i++) {
                    const vp = await (await loadedPdf.getPage(i)).getViewport({ scale: 1 });
                    dims.push({ width: vp.width, height: vp.height });
                }
                setOriginalDimensions(dims);
            })();
        }, [url]);

        const fixedWidth = window.innerWidth * 0.3;
        const fixedHeight = window.innerHeight * 0.8;

        const getCanvasCoordinates = (
            e: MouseEvent | TouchEvent | React.MouseEvent,
            canvas: HTMLCanvasElement,
            pageIndex: number
        ) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            const x_screen = clientX - rect.left;
            const y_screen = clientY - rect.top;
            const { width: ow, height: oh } = originalDimensions[pageIndex];
            const scale = Math.min(fixedWidth / ow, fixedHeight / oh);
            return {
                x: (x_screen / fixedWidth) * (ow * scale),
                y: (y_screen / fixedHeight) * (oh * scale),
            };
        };

        const isDrawingRef = useRef(false);
        const lastPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

        const startDrawing = (e: MouseEvent | TouchEvent, page: number) => {
            const canvas = canvasRefs.current[page * 2 + 1];
            if (!canvas) return;
            const { x, y } = getCanvasCoordinates(e, canvas, page);
            isDrawingRef.current = true;
            lastPointRef.current = { x, y };
        };
        const draw = (e: MouseEvent | TouchEvent, page: number) => {
            if (!isDrawingRef.current) return;
            const canvas = canvasRefs.current[page * 2 + 1];
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const { x, y } = getCanvasCoordinates(e, canvas, page);
            const pr = window.devicePixelRatio || 1;
            ctx.beginPath();
            ctx.moveTo(lastPointRef.current.x * pr, lastPointRef.current.y * pr);
            ctx.lineTo(x * pr, y * pr);
            ctx.strokeStyle = drawingColorRef.current;
            ctx.lineWidth = 5 * pr;
            ctx.stroke();
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
                    const safeFontColor = fontColor && /^#[0-9A-F]{6}$/i.test(fontColor) ? fontColor : "#000000";
                    const safeFontSize = fontSize || 18;
                    const safeFontWeight = fontWeight || "400";
                    setTextAnnotations((t) => [
                        ...t,
                        {
                            page,
                            x,
                            y,
                            text,
                            maxWidth: 200,
                            height: 100,
                            fontColor: safeFontColor,
                            fontSize: safeFontSize,
                            fontWeight: safeFontWeight,
                        },
                    ]);
                }
                setActiveTextInput(null);
                setIsTextMode(false);
            }
        };

        const handleCanvasClick = (
            e: React.MouseEvent,
            pageIndex: number
        ) => {
            if (!isTextMode || isDrawingEnabled) return;
            const canvas = canvasRefs.current[pageIndex * 2 + 1];
            if (!canvas) return;
            const { x, y } = getCanvasCoordinates(e, canvas, pageIndex);
            setActiveTextInput({ page: pageIndex, x, y });
        };

        useEffect(() => {
            if (!pdf || !originalDimensions.length) return;
            (async () => {
                const pr = window.devicePixelRatio || 1;
                for (let i = 0; i < pdf.numPages; i++) {
                    const page = await pdf.getPage(i + 1);
                    const vp1 = page.getViewport({ scale: 1 });
                    const scale = Math.min(fixedWidth / vp1.width, fixedHeight / vp1.height);
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
                    c.onmousedown = isDrawingEnabled ? (e) => startDrawing(e, Math.floor(idx / 2)) : null;
                    c.onmousemove = isDrawingEnabled ? (e) => draw(e, Math.floor(idx / 2)) : null;
                    c.onmouseup = isDrawingEnabled ? endDrawing : null;
                    c.onmouseleave = isDrawingEnabled ? endDrawing : null;
                    c.ontouchstart = isDrawingEnabled ? (e) => startDrawing(e, Math.floor(idx / 2)) : null;
                    c.ontouchmove = isDrawingEnabled ? (e) => draw(e, Math.floor(idx / 2)) : null;
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

        const hexToRgb = (hex: string): [number, number, number] => {
            const validHex = hex && /^#[0-9A-F]{6}$/i.test(hex) ? hex : "#000000";
            return [
                parseInt(validHex.slice(1, 3), 16) / 255,
                parseInt(validHex.slice(3, 5), 16) / 255,
                parseInt(validHex.slice(5, 7), 16) / 255,
            ];
        };

        const saveAnnotations = async (): Promise<string> => {
            if (!pdf) throw new Error("PDF not loaded");
            const arrayBuffer = await fetch(url).then((r) => r.arrayBuffer());
            const pdfData = new Uint8Array(arrayBuffer);
            const pdfDoc = await PDFDocument.load(pdfData);

            const fontNormal = await (pdfDoc as any).embedFont("Helvetica");
            const fontBold = await (pdfDoc as any).embedFont("Helvetica-Bold");

            for (let i = 0; i < pdf.numPages; i++) {
                const drawCanvas = canvasRefs.current[i * 2 + 1];
                if (!drawCanvas) continue;
                const dataUrl = drawCanvas.toDataURL("image/png");
                if (!dataUrl.includes("data:image/png")) continue;
                const img = await pdfDoc.embedPng(dataUrl);
                const page = (pdfDoc as any).getPage(i);
                page.drawImage(img, {
                    x: 0,
                    y: 0,
                    width: fixedWidth,
                    height: fixedHeight,
                });
            }

            for (const ann of textAnnotations) {
                const page = (pdfDoc as any).getPage(ann.page);
                const font = ann.fontWeight === "700" ? fontBold : fontNormal;
                const [r, g, b] = hexToRgb(ann.fontColor);

                try {
                    page.drawText(ann.text, {
                        x: ann.x,
                        y: page.getHeight() - ann.y - ann.height,
                        size: ann.fontSize,
                        font,
                        color: rgb(r, g, b),
                        maxWidth: ann.maxWidth,
                    });
                } catch (error) {
                    console.error("Error drawing text annotation:", error, ann);
                }
            }

            const bytes = await pdfDoc.save();
            const blob = new Blob([bytes], { type: "application/pdf" });
            return URL.createObjectURL(blob);
        };

        useImperativeHandle(ref, () => ({
            saveAnnotations,
        }));

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
                                        width: `${fixedWidth}px`,
                                        height: `${fixedHeight}px`,
                                    }}
                                />
                                <canvas
                                    ref={(el) => (canvasRefs.current[i * 2 + 1] = el)}
                                    className={css.drawCanvas}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: `${fixedWidth}px`,
                                        height: `${fixedHeight}px`,
                                        zIndex: 10,
                                        touchAction: "none",
                                    }}
                                />
                                {activeTextInput && activeTextInput.page === i && (
                                    <input
                                        type="text"
                                        className={css.textAnnotation}
                                        style={{
                                            position: "absolute",
                                            left: activeTextInput.x,
                                            top: activeTextInput.y,
                                            maxWidth: 200,
                                            fontWeight,
                                            fontSize: `${fontSize}px`,
                                            color: fontColor,
                                            border: "none",
                                            background: "transparent",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            zIndex: 20,
                                        }}
                                        autoFocus
                                        onKeyDown={(e) => handleTextInput(e, i, activeTextInput.x, activeTextInput.y)}
                                    />
                                )}
                                {textAnnotations
                                    .filter((t) => t.page === i)
                                    .map((t, idx) => (
                                        <div
                                            key={idx}
                                            className={css.textAnnotation}
                                            style={{
                                                position: "absolute",
                                                left: t.x,
                                                top: t.y,
                                                maxWidth: t.maxWidth,
                                                height: t.height,
                                                fontSize: `${t.fontSize}px`,
                                                color: t.fontColor,
                                                fontWeight: t.fontWeight,
                                                cursor: "auto",
                                                zIndex: 15,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
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
                        onClick={() => pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)}
                    >
                        <ArrowRightIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                    </button>
                </div>
            </div>
        );
    }
);

PDFViewer.displayName = "PDFViewer";
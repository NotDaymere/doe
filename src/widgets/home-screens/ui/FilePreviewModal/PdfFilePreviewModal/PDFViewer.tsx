import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftIcon from "../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../shared/icons/ArrowRight.icon";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFViewerHandle {
    saveAnnotations: () => Promise<void>;
}

interface PDFViewerProps {
    url: string;
    isDrawingEnabled: boolean;
    onSaveDrawing: (newUrl: string) => void;
    initialPaths?: Record<number, { x: number; y: number }[][]>;
    drawingColor: string;
}

export const PDFViewer = forwardRef<PDFViewerHandle, PDFViewerProps>(
    ({ url, isDrawingEnabled, onSaveDrawing, initialPaths, drawingColor }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
        const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
        const [originalDimensions, setOriginalDimensions] = useState<
            Array<{ width: number; height: number }>
        >([]);
        const [currentPage, setCurrentPage] = useState(1);
        const drawingColorRef = useRef(drawingColor);

        useEffect(() => {
            drawingColorRef.current = drawingColor;
        }, [drawingColor]);

        const isDrawingRef = useRef(false);
        const lastPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

        useEffect(() => {
            const loadPdf = async () => {
                const loadedPdf = await pdfjsLib.getDocument(url).promise;
                setPdf(loadedPdf);
                if (originalDimensions.length === 0) {
                    const dims: Array<{ width: number; height: number }> = [];
                    for (let i = 1; i <= loadedPdf.numPages; i++) {
                        const vp = await loadedPdf.getPage(i).then((page) =>
                            page.getViewport({ scale: 1 })
                        );
                        dims.push({ width: vp.width, height: vp.height });
                    }
                    setOriginalDimensions(dims);
                }
            };
            loadPdf();
        }, [url, originalDimensions.length]);

        const fixedWidth = window.innerWidth * 0.3;
        const fixedHeight = window.innerHeight * 0.8;

        const getCanvasCoordinates = (
            e: MouseEvent | TouchEvent,
            canvas: HTMLCanvasElement,
            pageIndex: number
        ) => {
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;
            if ("touches" in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            const x_screen = clientX - rect.left;
            const y_screen = clientY - rect.top;

            const { width: originalWidth, height: originalHeight } =
                originalDimensions[pageIndex];

            const scaleFactor = Math.min(
                fixedWidth / originalWidth,
                fixedHeight / originalHeight
            );

            const x_pdf =
                (x_screen / rect.width) * (originalWidth * scaleFactor);
            const y_pdf =
                (y_screen / rect.height) * (originalHeight * scaleFactor);
            return { x: x_pdf, y: y_pdf };
        };

        const startDrawing = (e: MouseEvent | TouchEvent, pageIndex: number) => {

            const canvas = canvasRefs.current[pageIndex];
            if (!canvas) return;
            const { x, y } = getCanvasCoordinates(e, canvas, pageIndex);
            isDrawingRef.current = true;
            lastPointRef.current = { x, y };
        };

        const draw = (e: MouseEvent | TouchEvent, pageIndex: number) => {
            if (!isDrawingRef.current) return;
            const canvas = canvasRefs.current[pageIndex];
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const { x, y } = getCanvasCoordinates(e, canvas, pageIndex);
            const pixelRatio = window.devicePixelRatio || 1;
            ctx.beginPath();
            ctx.moveTo(
                lastPointRef.current.x * pixelRatio,
                lastPointRef.current.y * pixelRatio
            );
            ctx.lineTo(x * pixelRatio, y * pixelRatio);
            ctx.strokeStyle = drawingColorRef.current;
            ctx.lineWidth = 5 * pixelRatio;
            ctx.stroke();
            lastPointRef.current = { x, y };
        };

        const endDrawing = (pageIndex: number) => {
            if (!isDrawingRef.current) return;
            isDrawingRef.current = false;
        };

        useEffect(() => {
            if (!pdf || !containerRef.current) return;
            containerRef.current.innerHTML = "";
            canvasRefs.current = [];

            (async () => {
                const pixelRatio = window.devicePixelRatio || 1;
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const originalViewport = page.getViewport({ scale: 1 });
                    const scaleFactor = Math.min(
                        fixedWidth / originalViewport.width,
                        fixedHeight / originalViewport.height
                    );
                    const viewport = page.getViewport({ scale: scaleFactor });

                    const pageContainer = document.createElement("div");
                    pageContainer.className = "pageContainer";
                    pageContainer.style.position = "relative";
                    pageContainer.style.width = `${fixedWidth}px`;
                    pageContainer.style.height = `${fixedHeight}px`;
                    pageContainer.style.marginBottom = "10px";

                    const pdfCanvas = document.createElement("canvas");
                    pdfCanvas.className = "pdfCanvas";
                    pdfCanvas.width = fixedWidth * pixelRatio;
                    pdfCanvas.height = fixedHeight * pixelRatio;
                    pdfCanvas.style.width = `${fixedWidth}px`;
                    pdfCanvas.style.height = `${fixedHeight}px`;
                    pageContainer.appendChild(pdfCanvas);

                    const drawCanvas = document.createElement("canvas");
                    drawCanvas.className = "drawCanvas";
                    drawCanvas.width = fixedWidth * pixelRatio;
                    drawCanvas.height = fixedHeight * pixelRatio;
                    drawCanvas.style.width = `${fixedWidth}px`;
                    drawCanvas.style.height = `${fixedHeight}px`;
                    drawCanvas.style.position = "absolute";
                    drawCanvas.style.top = "0";
                    drawCanvas.style.left = "0";
                    drawCanvas.style.zIndex = "10";
                    drawCanvas.style.pointerEvents = isDrawingEnabled ? "auto" : "none";
                    drawCanvas.style.touchAction = "none";
                    pageContainer.appendChild(drawCanvas);

                    containerRef.current!.appendChild(pageContainer);

                    const pdfContext = pdfCanvas.getContext("2d");
                    if (pdfContext) {
                        pdfContext.scale(pixelRatio, pixelRatio);
                        page.render({ canvasContext: pdfContext, viewport });
                    }

                    canvasRefs.current[i - 1] = drawCanvas;

                    const index = i - 1;
                    drawCanvas.onmousedown = (e: MouseEvent) => startDrawing(e, index);
                    drawCanvas.onmousemove = (e: MouseEvent) => draw(e, index);
                    drawCanvas.onmouseup = () => endDrawing(index);
                    drawCanvas.onmouseleave = () => endDrawing(index);
                    drawCanvas.ontouchstart = (e: TouchEvent) => startDrawing(e, index);
                    drawCanvas.ontouchmove = (e: TouchEvent) => draw(e, index);
                    drawCanvas.ontouchend = () => endDrawing(index);

                }
            })();
        }, [pdf, fixedWidth, fixedHeight]);

        useEffect(() => {
            canvasRefs.current.forEach((canvas) => {
                if (canvas) {
                    canvas.style.pointerEvents = isDrawingEnabled ? "auto" : "none";
                }
            });
        }, [isDrawingEnabled]);

        const saveAnnotations = async () => {
            if (!pdf || originalDimensions.length === 0) return;
            const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());
            const pdfData = new Uint8Array(arrayBuffer);
            const pdfDoc = await PDFDocument.load(pdfData);

            for (let i = 0; i < pdf.numPages; i++) {
                const canvas = canvasRefs.current[i];
                if (!canvas) continue;
                const imageData = canvas.toDataURL("image/png");
                const image = await pdfDoc.embedPng(imageData);
                const page = (pdfDoc as any).getPage(i);
                page.drawImage(image, {
                    x: 0,
                    y: page.getHeight() - fixedHeight,
                    width: fixedWidth,
                    height: fixedHeight,
                });
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: "application/pdf" });
            const newUrl = URL.createObjectURL(blob);
            onSaveDrawing(newUrl);
        };

        useImperativeHandle(ref, () => ({
            saveAnnotations,
        }));

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;
            const onScroll = () => {
                const pageContainers = Array.from(
                    container.getElementsByClassName("pageContainer")
                );
                const closest = pageContainers.reduce<{ index: number; dist: number }>(
                    (best, el, idx) => {
                        const dist = Math.abs(
                            (el as HTMLElement).offsetTop - container.scrollTop
                        );
                        return dist < best.dist ? { index: idx, dist } : best;
                    },
                    { index: 0, dist: Infinity }
                );
                setCurrentPage(closest.index + 1);
            };
            container.addEventListener("scroll", onScroll);
            return () => container.removeEventListener("scroll", onScroll);
        }, [pdf]);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;
            const onWheel = (e: WheelEvent) => {
                if (!e.ctrlKey) return;
                e.preventDefault();
            };
            container.addEventListener("wheel", onWheel, { passive: false });
            return () =>
                container.removeEventListener("wheel", onWheel);
        }, []);

        const scrollToPage = (page: number) => {
            const el = containerRef.current?.getElementsByClassName("pageContainer")[
            page - 1
                ] as HTMLElement;
            if (el)
                el.scrollIntoView({ behavior: "smooth" });
        };

        return (
            <div className={css.modalPdfContainer}>
                <div className={css.modalPdf} ref={containerRef}></div>
                <div className={css.modalPdfPageSlideWrapper}>
                    <button
                        onClick={() =>
                            currentPage > 1 && scrollToPage(currentPage - 1)
                        }
                    >
                        <ArrowLeftIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                    </button>
                    <span>
            {currentPage}
                        {pdf ? ` / ${pdf.numPages}` : ""}
          </span>
                    <button
                        onClick={() =>
                            pdf &&
                            currentPage < pdf.numPages &&
                            scrollToPage(currentPage + 1)
                        }
                    >
                        <ArrowRightIcon
                            opacity={
                                pdf && currentPage >= pdf.numPages ? 0.3 : 1
                            }
                        />
                    </button>
                </div>
            </div>
        );
    }
);

PDFViewer.displayName = "PDFViewer";
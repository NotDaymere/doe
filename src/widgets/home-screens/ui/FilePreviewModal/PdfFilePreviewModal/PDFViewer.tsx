import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import css from "./PdfFilePreviewModal.module.less";
import { TextAnnotation, DrawAnnotation, Annotation } from "./pdfWorker";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/legacy/build/pdf.worker.entry.js?url";
import PaginationControls from "./PaginationControls";
import DrawCanvas from "./Canvases/DrawCanvas";
import TextAnnotationCanvas from "./Canvases/TextAnnotationsCanvas";

const pdfUrlCache = new Map<string, string>();
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
    setIsDrawingEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
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
        } catch (err) {}
    }
    // @ts-ignore
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
            setIsDrawingEnabled,
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
        const [annotations, setAnnotations] = useState<Annotation[]>([]);
        const [hasAnnotationsChanged, setHasAnnotationsChanged] = useState(false);
        const workerRef = useRef<Worker | null>(null);

        useEffect(() => {
            try {
                workerRef.current = new Worker(
                    new URL("./pdfWorker.ts", import.meta.url),
                    { type: "module" }
                );
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
                        const buf = await fetch(url).then((r) => r.arrayBuffer());
                        doc = await pdfjsLib.getDocument({ data: buf }).promise;
                    } catch (err2) {
                        console.warn("[load] fetch+data failed", err2);
                    }
                }

                if (
                    !doc &&
                    (typeof url === "string" && url.startsWith("blob:") || url instanceof Blob)
                ) {
                    try {
                        const buf =
                            typeof url === "string"
                                ? await fetch(url).then((r) => r.arrayBuffer())
                                : await url.arrayBuffer();
                        doc = await pdfjsLib.getDocument({ data: buf }).promise;
                    } catch (err3) {
                        console.warn("[load] blob→data failed", err3);
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
            const { width: ow, height: oh } = originalDimensions[pageIndex] || { width: 100, height: 100 };
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            const scaleFactor = Math.min(maxWidth / ow, maxHeight / oh, 1);
            const pageWidth = ow * scaleFactor;
            const pageHeight = oh * scaleFactor;
            return { pageWidth, pageHeight, scaleFactor };
        };

        useEffect(() => {
            if (!pdf || !originalDimensions.length) return;

            let isMounted = true;
            const renderTasks: pdfjsLib.RenderTask[] = [];

            const renderPages = async () => {
                try {
                    const pr = window.devicePixelRatio || 1;
                    for (let i = 0; i < pdf.numPages; i++) {
                        if (!isMounted) break;

                        const page = await pdf.getPage(i + 1);
                        const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(i);
                        const viewport = page.getViewport({ scale: scaleFactor });
                        const pdfCanvas = canvasRefs.current[i * 2];

                        if (pdfCanvas) {
                            pdfCanvas.width = pageWidth * pr;
                            pdfCanvas.height = pageHeight * pr;
                            const ctx = pdfCanvas.getContext("2d");
                            if (ctx) {
                                ctx.scale(pr, pr);
                                const renderTask = page.render({ canvasContext: ctx, viewport });
                                renderTasks.push(renderTask);
                                await renderTask.promise;
                            }
                        }
                    }
                } catch (error) {
                    console.error("Failed to render pages:", error);
                }
            };

            renderPages();

            return () => {
                isMounted = false;
                renderTasks.forEach((task) => task.cancel());
            };
        }, [pdf, originalDimensions]);

        const saveAnnotations = async (): Promise<string> => {
            if (!hasAnnotationsChanged && pdfUrlCache.has(url as string)) {
                return Promise.resolve(pdfUrlCache.get(url as string)!);
            }
            if (!pdf) throw new Error("PDF not loaded");
            const arrayBuffer = typeof url === "string" ? await fetch(url).then((r) => r.arrayBuffer()) : await url.arrayBuffer();

            const payload = {
                pdfArrayBuffer: arrayBuffer,
                annotations,
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
                        pdfUrlCache.set(url as string, newUrl);
                        setAnnotations([]); // Очищаем аннотации после сохранения
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

        useEffect(() => {
            if (isDrawingEnabled && isTextMode) {
                setIsTextMode(false);
            }
        }, [isDrawingEnabled, isTextMode, setIsTextMode]);

        useEffect(() => {
            if (isTextMode && setIsDrawingEnabled) {
                setIsDrawingEnabled(false);
            }
        }, [isTextMode, setIsDrawingEnabled]);

        useImperativeHandle(ref, () => ({
            saveAnnotations,
        }));

        const scrollToPage = (p: number) => {
            const el = containerRef.current?.getElementsByClassName(
                "pageContainer"
            )[p - 1] as HTMLElement;
            el?.scrollIntoView({ behavior: "smooth" });
        };

        useEffect(() => {
            const cont = containerRef.current;
            if (!cont) return;
            const onScroll = () => {
                const pages = Array.from(
                    cont.getElementsByClassName("pageContainer")
                ) as HTMLElement[];
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
                                >
                                    <canvas
                                        ref={(el) => {
                                            canvasRefs.current[i * 2] = el;
                                        }}
                                        className={css.drawCanvas}
                                        style={{ position: "absolute", top: 0, left: 0, zIndex: 5 }}
                                    />
                                    <DrawCanvas
                                        pageIndex={i}
                                        canvasRef={canvasRefs}
                                        drawingColor={drawingColor}
                                        isDrawingEnabled={isDrawingEnabled}
                                        isTextMode={isTextMode}
                                        pageWidth={pageWidth}
                                        pageHeight={pageHeight}
                                        onAnnotationChange={() => {
                                            const canvas = canvasRefs.current[i * 2 + 1];
                                            if (canvas) {
                                                const canvasData = canvas.toDataURL("image/png");
                                                setAnnotations((prev) => [
                                                    ...prev,
                                                    { type: "draw", page: i, canvasData } as DrawAnnotation,
                                                ]);
                                                setHasAnnotationsChanged(true);
                                            }
                                        }}
                                    />
                                    <TextAnnotationCanvas
                                        pageIndex={i}
                                        isTextMode={isTextMode}
                                        fontWeight={fontWeight}
                                        fontSize={fontSize}
                                        fontColor={fontColor}
                                        setIsTextMode={setIsTextMode}
                                        originalDimensions={originalDimensions}
                                        computePageDimensions={computePageDimensions}
                                        canvasRef={canvasRefs}
                                        currentPage={currentPage}
                                        onAnnotationChange={(newAnnotation: TextAnnotation) => {
                                            setAnnotations((prev) => [...prev, newAnnotation]);
                                            setHasAnnotationsChanged(true);
                                        }}
                                        onAnnotationsUpdate={(newAnnotations: TextAnnotation[]) => {
                                            setAnnotations((prev) => [...prev, ...newAnnotations]);
                                            setHasAnnotationsChanged(true);
                                        }}
                                    />
                                    {annotations
                                        .filter((ann) => ann.page === i)
                                        .map((ann, idx) => {
                                            if (ann.type === "text") {
                                                return (
                                                    <div
                                                        key={`text-${idx}`}
                                                        className={css.textAnnotation}
                                                        style={{
                                                            transform: `translate(${ann.x}px, ${ann.y}px)`,
                                                            fontSize: `${ann.fontSize}px`,
                                                            color: ann.fontColor,
                                                            fontWeight: ann.fontWeight === "bold" ? "bold" : "normal",
                                                            position: "absolute",
                                                            zIndex: 10 + idx,
                                                            pointerEvents: "none",
                                                        }}
                                                    >
                                                        {ann.text}
                                                    </div>
                                                );
                                            } else if (ann.type === "draw") {
                                                return (
                                                    <img
                                                        key={`draw-${idx}`}
                                                        src={ann.canvasData}
                                                        alt="Drawing"
                                                        style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: `${pageWidth}px`,
                                                            height: `${pageHeight}px`,
                                                            zIndex: 10 + idx,
                                                            pointerEvents: "none",
                                                        }}
                                                    />
                                                );
                                            }
                                            return null;
                                        })}
                                </div>
                            );
                        })}
                </div>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={pdf ? pdf.numPages : 0}
                    onPrev={() => currentPage > 1 && scrollToPage(currentPage - 1)}
                    onNext={() =>
                        pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)
                    }
                />
            </div>
        );
    }
);

PDFViewer.displayName = "PDFViewer";
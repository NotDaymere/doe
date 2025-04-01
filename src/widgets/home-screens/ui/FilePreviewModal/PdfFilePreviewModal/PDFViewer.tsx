import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftButtonIcon from "../../../../../shared/icons/ArrowLeftButton.icon";
import ArrowRightButtonIcon from "../../../../../shared/icons/ArrowRightButton.icon";

export const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [hasZoomed, setHasZoomed] = useState(false);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf: pdfjsLib.PDFDocumentProxy) => {
            setPdf(loadedPdf);
        });
        pdfjsLib.getDocument(url).promise.then(setPdf);
    }, [url]);


    useEffect(() => {
        if (!pdf || !containerRef.current) return;

        (async () => {
            if(containerRef?.current?.clientWidth && containerRef?.current?.clientHeight) {
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;

                if (!containerWidth || !containerHeight) {
                    console.warn("Container has zero size, using scale=1 by default");
                    setScale(1);
                    return;
                }

                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 1 });

                const widthRatio = containerWidth / viewport.width;
                const heightRatio = containerHeight / viewport.height;

                const bestScale = Math.min(widthRatio, heightRatio);

                setScale(bestScale);
            }
        })();
    }, [pdf]);


    useEffect(() => {
        if (!pdf || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        (async () => {
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: hasZoomed ? scale : 1 });
                // for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                //     const page = await pdf.getPage(pageNum);
                //     const viewport = page.getViewport({ scale });

                    const canvas = document.createElement("canvas");
                canvas.className = "pdfCanvas";
                canvas.classList.add("pdfCanvas");

                canvas.width = viewport.width;
                canvas.height = viewport.height;
                if(containerRef?.current) {
                containerRef.current.appendChild(canvas);
                }
                if (!hasZoomed) {
                    canvas.style.width = "100%";
                    canvas.style.height = "auto";
                }

                containerRef.current!.appendChild(canvas);
                const context = canvas.getContext("2d");
                if (context) page.render({ canvasContext: context, viewport });
                if (context) {
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    page.render(renderContext);
                }
            }
        })();
    }, [pdf, scale, hasZoomed]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const onScroll = () => {
            const canvases = Array.from(container.getElementsByClassName("pdfCanvas"));
            const closest = canvases.reduce<{ index: number; dist: number }>(
                (best, el, idx) => {
                    const dist = Math.abs((el as HTMLElement).offsetTop - container.scrollTop);
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

        const handleScroll = () => {
            const canvases = container.getElementsByClassName("pdfCanvas");
            if (canvases.length === 0) return;

            let closestIndex = 0;
            let minDistance = Infinity;
            for (let i = 0; i < canvases.length; i++) {
                const canvas = canvases[i] as HTMLElement;
                const distance = Math.abs(canvas.offsetTop - container.scrollTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = i;
                }
            }
            setCurrentPage(closestIndex + 1);
        };

        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, [pdf]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {

            if (!e.ctrlKey) return;
            e.preventDefault();
            setHasZoomed(true);
            setScale(prev => Math.min(Math.max(prev + (e.deltaY < 0 ? 0.1 : -0.1), 0.2), 5));

            setScale((prev) => {

                let newScale = e.deltaY < 0 ? prev + 0.1 : prev - 0.1;
                if (newScale < 0.2) newScale = 0.2;
                if (newScale > 5) newScale = 5;
                return newScale;
            });
        };
        container.addEventListener("wheel", handleWheel, { passive: false });
            return () => {
                container.removeEventListener("wheel", handleWheel);
            };
        }, []);

    const scrollToPage = (page: number) => {
        const el = containerRef.current?.getElementsByClassName("pdfCanvas")[page - 1] as HTMLElement;
        if (el) el.scrollIntoView({ behavior: "smooth" });
        if (!containerRef.current) return;
        const canvasElements = containerRef.current.getElementsByClassName("pdfCanvas");
        if (!canvasElements[page - 1]) return;
        (canvasElements[page - 1] as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const nextPage = () => {
        if (pdf && currentPage < pdf.numPages) {
            scrollToPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (pdf && currentPage > 1) {
            scrollToPage(currentPage - 1);
        }
    };

    return (
        <div className={css.modalPdfContainer}>
            <div className={css.modalPdf} ref={containerRef} />
            <div className={css.modalPdfPageSlideWrapper}>
                <button onClick={() => currentPage > 1 && scrollToPage(currentPage - 1)}>
                    <ArrowLeftButtonIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                </button>
                <span>{currentPage}{pdf ? ` / ${pdf.numPages}` : ""}</span>
                <button onClick={() => pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)}>
                    <ArrowRightButtonIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                </button>
            </div>
        </div>
    );
};

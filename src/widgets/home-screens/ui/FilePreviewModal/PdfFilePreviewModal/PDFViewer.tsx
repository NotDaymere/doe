import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftButtonIcon from "../../../../../shared/icons/ArrowLeftButton.icon";
import ArrowRightButtonIcon from "../../../../../shared/icons/ArrowRightButton.icon";

export const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [scale, setScale] = useState<number>(1);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf: pdfjsLib.PDFDocumentProxy) => {
            setPdf(loadedPdf);
        });
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
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                canvas.classList.add("pdfCanvas");

                canvas.width = viewport.width;
                canvas.height = viewport.height;
                if(containerRef?.current) {
                containerRef.current.appendChild(canvas);
                }

                const context = canvas.getContext("2d");
                if (context) {
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    page.render(renderContext);
                }
            }
        })();
    }, [pdf, scale]);


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
            <div className={css.modalPdf} ref={containerRef}>
            </div>

            <div className={css.modalPdfPageSlideWrapper}>
                <button className={css.prevAndNextButton} onClick={prevPage}>
                    <ArrowLeftButtonIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                </button>
                <span>
          {currentPage}
                    {pdf ? ` / ${pdf.numPages}` : ""}
        </span>
                <button className={css.prevAndNextButton} onClick={nextPage}>
                    <ArrowRightButtonIcon
                        opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1}
                    />
                </button>
            </div>
        </div>
    );
};

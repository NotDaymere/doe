import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import css from "./PdfFilePreviewModal.module.less";
import ArrowLeftIcon from "../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../shared/icons/ArrowRight.icon";

export const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [hasZoomed, setHasZoomed] = useState(false);

    useEffect(() => {
        pdfjsLib.getDocument(url).promise.then(setPdf);
    }, [url]);

    useEffect(() => {
        if (!pdf || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        (async () => {
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: hasZoomed ? scale : 1 });
                const canvas = document.createElement("canvas");
                canvas.className = "pdfCanvas";
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Если ещё не зумили — растягиваем CSS‑ом на 100% ширины контейнера
                if (!hasZoomed) {
                    canvas.style.width = "100%";
                    canvas.style.height = "auto";
                }

                containerRef.current!.appendChild(canvas);
                const context = canvas.getContext("2d");
                if (context) page.render({ canvasContext: context, viewport });
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

        const onWheel = (e: WheelEvent) => {
            if (!e.ctrlKey) return;
            e.preventDefault();
            setHasZoomed(true);
            setScale(prev => Math.min(Math.max(prev + (e.deltaY < 0 ? 0.1 : -0.1), 0.2), 5));
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        return () => container.removeEventListener("wheel", onWheel);
    }, []);

    const scrollToPage = (page: number) => {
        const el = containerRef.current?.getElementsByClassName("pdfCanvas")[page - 1] as HTMLElement;
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={css.modalPdfContainer}>
            <div className={css.modalPdf} ref={containerRef} />
            <div className={css.modalPdfPageSlideWrapper}>
                <button onClick={() => currentPage > 1 && scrollToPage(currentPage - 1)}>
                    <ArrowLeftIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                </button>
                <span>{currentPage}{pdf ? ` / ${pdf.numPages}` : ""}</span>
                <button onClick={() => pdf && currentPage < pdf.numPages && scrollToPage(currentPage + 1)}>
                    <ArrowRightIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                </button>
            </div>
        </div>
    );
};

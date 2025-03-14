import React from "react";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./PdfFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import ArrowLeftIcon from "../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../shared/icons/ArrowRight.icon";
import ZoomPdfFileIcon from "../../../../../shared/icons/ZoomPdfFile.icon";
import ModalContentPanelRedactIcon from "../../../../../shared/icons/ModalContentPanelRedact.icon";
import ModalContentPanelPencilIcon from "../../../../../shared/icons/ModalContentPanelPencil.icon";
import ModalContentPanelAddTextIcon from "../../../../../shared/icons/ModalContentPanelAddText.icon";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt?: string;
    isLoading?: boolean;
}

const PDFViewer: React.FC<{ url: string }> = ({ url }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [pdf, setPdf] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isZoomed, setIsZoomed] = useState<boolean>(false);

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(url);
        loadingTask.promise.then((loadedPdf: any) => {
            setPdf(loadedPdf);
        });
    }, [url]);

    useEffect(() => {
        if (!pdf || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        const scale = isZoomed ? 3 : 1.5;

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            pdf.getPage(pageNumber).then((page: any) => {
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement("canvas");
                canvas.classList.add("pdfCanvas");

                canvas.setAttribute("data-page-number", pageNumber.toString());
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                containerRef.current?.appendChild(canvas);

                const context = canvas.getContext("2d");
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                page.render(renderContext);
            });
        }
    }, [pdf, isZoomed]);

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

    const scrollToPage = (page: number) => {
        if (!containerRef.current) return;
        const canvasElements = containerRef.current.getElementsByClassName("pdfCanvas");
        if (canvasElements.length === 0) return;

        const targetCanvas = canvasElements[page - 1] as HTMLElement;
        if (targetCanvas) {
            targetCanvas.scrollIntoView({ behavior: "smooth", block: "start" });
        }
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
            <div className={css.modalPdf} ref={containerRef}></div>
            <div className={css.modalPdfPageSlideWrapper}>
                <button className={css.prevAndNextButton} onClick={prevPage}>
                    <ArrowLeftIcon opacity={currentPage <= 1 ? 0.3 : 1} />
                </button>
                <span>
                    {currentPage}
                    {pdf ? ` / ${pdf.numPages}` : ""}
                </span>
                <button className={css.prevAndNextButton} onClick={nextPage}>
                    <ArrowRightIcon opacity={pdf && currentPage >= pdf.numPages ? 0.3 : 1} />
                </button>
            </div>
            <button className={css.zoomButton} onClick={() => setIsZoomed((prev) => !prev)}>
                <ZoomPdfFileIcon />
            </button>
        </div>
    );
};

const PdfFilePreviewModal: React.FC<PdfModalProps> = ({ url, onClose, fileName, fileExt }) => {
    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            modalContentClass={css.modalContentPdf}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNamePdfContainer}
        >
            <PDFViewer url={url} />
            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelRedactIcon fill="inherit" />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelPencilIcon fill="inherit" />
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelAddTextIcon fill="inherit" />
                </div>
            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default PdfFilePreviewModal;

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./PdfFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import ModalContentPanelRedactIcon from "../../../../../shared/icons/ModalContentPanelRedact.icon";
import ModalContentPanelPencilIcon from "../../../../../shared/icons/ModalContentPanelPencil.icon";
import ModalContentPanelAddTextIcon from "../../../../../shared/icons/ModalContentPanelAddText.icon";
import { PDFViewer } from "./PDFViewer";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt?: string;
    isLoading?: boolean;
}

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

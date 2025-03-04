import React from "react";
import { createPortal } from "react-dom";
import css from "../FilePreviewModalOverplay/FilePreviewModalOverplay.module.less";
import ModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";

interface PdfModalProps {
    url: string;
    onClose: () => void;
}

const PdfFilePreviewModal: React.FC<PdfModalProps> = ({ url, onClose }) => {
    console.log("PDF MODAL OPEN");
    return createPortal(
        <ModalOverlay onClose={onClose}>
            <iframe src={url} title="PDF Preview" className={css.modalPdf} />
        </ModalOverlay>,
        document.body
    );
};

export default PdfFilePreviewModal;

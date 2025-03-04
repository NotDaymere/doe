import React from "react";
import { createPortal } from "react-dom";
import css from "./ModalOverplay.module.less";
import ModalOverlay from "./ModalOverplay";

interface PdfModalProps {
    url: string;
    onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ url, onClose }) => {
    console.log("PDF MODAL OPEN");
    return createPortal(
        <ModalOverlay onClose={onClose}>
            <iframe src={url} title="PDF Preview" className={css.modalPdf} />
        </ModalOverlay>,
        document.body
    );
};

export default PdfModal;

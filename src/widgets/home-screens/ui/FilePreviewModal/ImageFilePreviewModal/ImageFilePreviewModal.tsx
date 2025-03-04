import React from "react";
import { createPortal } from "react-dom";
import css from "../FilePreviewModalOverplay/FilePreviewModalOverplay.module.less";
import ModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay"; // Если нужны специфичные стили для изображений, можно их добавить в этот файл

interface ImageModalProps {
    url: string;
    onClose: () => void;
}

const ImageFilePreviewModal: React.FC<ImageModalProps> = ({ url, onClose }) => {
    return createPortal(
        <ModalOverlay onClose={onClose}>
            <img src={url} alt="Preview" className={css.modalImage} />
        </ModalOverlay>,
        document.body
    );
};

export default ImageFilePreviewModal;

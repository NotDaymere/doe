import React from "react";
import { createPortal } from "react-dom";
import css from "../FilePreviewModalOverplay/FilePreviewModalOverplay.module.less";
import ModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";

interface VideoModalProps {
    url: string;
    onClose: () => void;
}

const VideoFilePreviewModal: React.FC<VideoModalProps> = ({ url, onClose }) => {
    return createPortal(
        <ModalOverlay onClose={onClose}>
            <video controls className={css.modalVideo}>
                <source src={url} />
                Your browser does not support the video tag.
            </video>
        </ModalOverlay>,
        document.body
    );
};

export default VideoFilePreviewModal;

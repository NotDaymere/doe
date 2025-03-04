import React from "react";
import { createPortal } from "react-dom";
import css from "./ModalOverplay.module.less";
import ModalOverlay from "./ModalOverplay";

interface VideoModalProps {
    url: string;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ url, onClose }) => {
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

export default VideoModal;

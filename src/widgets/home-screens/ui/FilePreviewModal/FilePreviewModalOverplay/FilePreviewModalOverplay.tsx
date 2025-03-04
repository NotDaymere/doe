import React, { ReactNode } from "react";
import css from "./FilePreviewModalOverplay.module.less";
import CrossIcon from "src/shared/icons/Cross.icon";

interface ModalOverlayProps {
    onClose: () => void;
    children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => {
    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={css.modalCloseBtn} onClick={onClose}>
                    <CrossIcon />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalOverlay;

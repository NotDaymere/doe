import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.less";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<IProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default Modal;

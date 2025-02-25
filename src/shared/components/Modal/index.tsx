import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.less";
import classNames from "classnames";

interface IProps {
    isOpen: boolean;
    showScroll?: boolean;
    classes?: string;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<IProps> = ({ isOpen, onClose, children, showScroll = false, classes = "" }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className={css.modalOverlay} onClick={onClose}>
            <div
                className={classNames(css.modalContent, classes, {
                    [css.showScroll]: showScroll,
                })}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default Modal;

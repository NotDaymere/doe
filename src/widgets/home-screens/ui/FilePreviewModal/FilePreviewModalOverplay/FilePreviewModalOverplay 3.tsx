import React, { ReactNode } from "react";
import css from "./FilePreviewModalOverplay.module.less";
import CloseViewFileIcon from "../../../../../shared/icons/CloseViewFile.icon";

interface ModalOverlayProps {
    onClose: () => void;
    children: ReactNode;
    fileName?: string;
    fileExt?: string;
    fileNameContainerClass?: string;
    modalContentClass?: string;
}

const FilePreviewModalOverlay: React.FC<ModalOverlayProps> = ({
                                                       onClose,
                                                       children,
                                                       fileName,
                                                       fileExt,
                                                       fileNameContainerClass,
                                                       modalContentClass,
}) => {
    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div className={`${css.modalContent} ${modalContentClass ? modalContentClass : ""}`}
                 onClick={(e) => e.stopPropagation()}
            >
                {fileName && fileNameContainerClass && (
                    <div className={fileNameContainerClass}>
                        <span className={css.modalFileName}>{fileName}</span>
                        {fileExt &&
                            <span className={css.modalFileExt}>.{fileExt}</span>
                        }
                    </div>
                )}
                <button className={css.modalCloseBtn} onClick={onClose}>
                    <CloseViewFileIcon />
                </button>
                {children}
            </div>
        </div>
    );
};

export default FilePreviewModalOverlay;

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
    isEditing?: boolean;
    tempName?: string;
    onTempNameChange?: (name: string) => void;
    onFileNameSubmit?: () => void;
}

const FilePreviewModalOverlay: React.FC<ModalOverlayProps> = ({
                                                       onClose,
                                                       children,
                                                       fileName,
                                                       fileExt,
                                                       fileNameContainerClass,
                                                       modalContentClass,
                                                       isEditing,
                                                       tempName,
                                                       onTempNameChange,
                                                       onFileNameSubmit,
                                                        }) => {

    return (
        <div className={css.modalOverlay} onClick={onClose}>
            <div
                className={`${css.modalContent} ${modalContentClass ? modalContentClass : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {fileName && fileNameContainerClass && (
                    <>
                        {isEditing ? (
                            <div className={fileNameContainerClass}>
                                <div className={css.fileNameInput}>
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => onTempNameChange && onTempNameChange(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                onFileNameSubmit && onFileNameSubmit();
                                            }
                                        }}
                                        autoFocus
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={fileNameContainerClass}>
                                <span className={css.modalFileNameWrapper}>
                                    <span className={css.modalFileName}>{fileName}</span>
                                </span>
                                {fileExt && (
                                    <span className={fileName.length < 10 ? css.modalFileExtShorten  : css.modalFileExt}>
                                        {fileName.length < 10 ? `.${fileExt}` : fileExt}
                                    </span>
                                )}
                            </div>
                        )}
                    </>
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

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./ImageFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelPencilIcon from "../../../../../shared/icons/ModalContentPanelPencil.icon";
import ModalContentPanelAddTextIcon from "../../../../../shared/icons/ModalContentPanelAddText.icon";
import ModalContentPanelCutIcon from "../../../../../shared/icons/ModalContentPanelCut.icon";
import ModalContentPanelEditIcon from "../../../../../shared/icons/ModalContentPanelEdit.icon";
import ModalContentPanelColorsIcon from "../../../../../shared/icons/ModalContentPanelColors.icon";

interface ImageModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt: string;
    isLoading?: boolean;
}

const ImageFilePreviewModal: React.FC<ImageModalProps> = ({
                                                              url,
                                                              onClose,
                                                              fileName,
                                                              fileExt}) => {

    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNameImgContainer}
            modalContentClass={css.modalContentImg}
        >
            <img src={url} alt="Preview" className={css.modalImage} />

            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem}>
                     <ModalContentPanelCutIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelPencilIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelEditIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelColorsIcon fill="currentColor"/>
                </div>
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelAddTextIcon fill="currentColor"/>
                </div>
            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default ImageFilePreviewModal;

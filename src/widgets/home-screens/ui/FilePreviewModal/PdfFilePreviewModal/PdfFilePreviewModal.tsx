import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./PdfFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import ModalContentPanelRedactIcon from "../../../../../shared/icons/ModalContentPanelRedact.icon";
import ModalContentPanelPencilIcon from "../../../../../shared/icons/ModalContentPanelPencil.icon";
import ModalContentPanelAddTextIcon from "../../../../../shared/icons/ModalContentPanelAddText.icon";
import { PDFViewer, PDFViewerHandle } from "./PDFViewer";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfModalProps {
    url: string;
    onClose: () => void;
    fileName: string;
    fileExt?: string;
    isLoading?: boolean;
    onRename: (newName: string) => void;
    onSaveDrawing: (newUrl: string) => void;
}

const PdfFilePreviewModal: React.FC<PdfModalProps> = ({
                                                          url,
                                                          onClose,
                                                          fileName,
                                                          fileExt,
                                                          onRename,
                                                          onSaveDrawing,
                                                      }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(fileName);
    const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [drawingColor, setDrawingColor] = useState("black");
    const pdfViewerRef = useRef<PDFViewerHandle>(null);

    useEffect(() => {
        setTempName(fileName);
    }, [fileName]);

    const handleSaveDrawing = (newUrl: string) => {
        setCurrentUrl(newUrl);
        onSaveDrawing(newUrl);
    };

    const handleClose = async () => {
        if (pdfViewerRef.current) {
            await pdfViewerRef.current.saveAnnotations();
        }
        onClose();
    };

    const toggleDrawing = async () => {
        if (isDrawingEnabled && pdfViewerRef.current) {
            await pdfViewerRef.current.saveAnnotations();
        }
        setIsDrawingEnabled((prev) => !prev);
    };

    return createPortal(
        <FilePreviewModalOverlay
            onClose={handleClose}
            modalContentClass={css.modalContentPdf}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNamePdfContainer}
            isEditing={isEditing}
            tempName={tempName}
            onTempNameChange={setTempName}
            onFileNameSubmit={() => {
                onRename(tempName);
                setIsEditing(false);
            }}
        >
            <PDFViewer
                ref={pdfViewerRef}
                url={currentUrl}
                isDrawingEnabled={isDrawingEnabled}
                onSaveDrawing={handleSaveDrawing}
                initialPaths={undefined}
                drawingColor={drawingColor}
            />

            <div className={css.modalContentEditPanel}>
                <div
                    className={css.modalContentEditPanelItem}
                    data-active={isEditing}
                    onClick={() => setIsEditing(true)}
                >
                    <ModalContentPanelRedactIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div
                    className={css.modalContentEditPanelItem}
                    data-active={isDrawingEnabled}
                    onClick={toggleDrawing}
                >
                    <ModalContentPanelPencilIcon fill="currentColor" />
                </div>
                {isDrawingEnabled && (
                    <div className={css.drawContainer}>
                        <input
                            type="color"
                            className={css.colorInput}
                            value={drawingColor}
                            onChange={(e) => setDrawingColor(e.target.value)}
                        />
                    </div>
                )}
                <div className={css.separator}></div>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelAddTextIcon fill="currentColor" />
                </div>
            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default PdfFilePreviewModal;
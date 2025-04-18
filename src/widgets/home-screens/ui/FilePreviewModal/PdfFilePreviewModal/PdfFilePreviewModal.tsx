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
import { CustomDropdownSelect } from "../ImageFilePreviewModal/CustomDropdownSelect/CustomDropdownSelect";

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
    const [isTextMode, setIsTextMode] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(url);
    const [drawingColor, setDrawingColor] = useState("#000000");
    const pdfViewerRef = useRef<PDFViewerHandle>(null);
    const [fontWeight, setFontWeight] = useState<"regular" | "bold">("regular");
    const [fontSize, setFontSize] = useState<number>(18);
    const [fontColor, setFontColor] = useState<string>("#000000");
    const [textSettingsOpen, setTextSettingsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const toggleTextSettings = () => {
        setTextSettingsOpen((v) => !v);
        setIsDrawingEnabled(false);
    };

    const confirmTextSettings = () => {
        setIsTextMode(true);
        setTextSettingsOpen(false);
    };

    useEffect(() => {
        setTempName(fileName);
    }, [fileName]);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                // Загружаем PDF для проверки готовности
                const pdf = await pdfjsLib.getDocument(url).promise;
                await pdf.getPage(1); // Проверяем, что хотя бы одна страница загрузилась
                setIsContentLoaded(true); // Контент готов
            } catch (error) {
                console.error("Error loading PDF:", error);
                setIsContentLoaded(true); // Показываем модалку даже при ошибке, чтобы не блокировать UI
            }
        };
        loadPdf();
    }, [url]);

    const handleClose = async () => {
        try {
            if (pdfViewerRef.current) {
                setIsSaving(true);
                const newUrl = await pdfViewerRef.current.saveAnnotations();
                setCurrentUrl(newUrl);
                onSaveDrawing(newUrl);

            }
        } catch (error) {
            console.error("Error during saveAnnotations:", error);
        } finally {
            setIsSaving(false);
            onClose();
        }
    };

    const toggleDrawing = () => {
        setIsDrawingEnabled((prev) => !prev);
        setIsTextMode(false);
        setTextSettingsOpen(false);
    };

    return createPortal(
        <FilePreviewModalOverlay
            onClose={handleClose}
            modalContentClass={`${css.modalContentPdf} ${isContentLoaded ? css.visible : css.hidden}`}
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
                isTextMode={isTextMode}
                drawingColor={drawingColor}
                fontWeight={fontWeight}
                fontSize={fontSize}
                fontColor={fontColor}
                setIsTextMode={setIsTextMode}
            />
            {isSaving && (
                <div className={css.savingOverlay}>
                    <span>Saving...</span>
                </div>
            )}

            <div className={css.modalContentEditPanel}>
                <div
                    className={css.modalContentEditPanelItem}
                    data-active={isEditing}
                    onClick={() => setIsEditing(true)}
                >
                    <ModalContentPanelRedactIcon fill="currentColor" />
                </div>
                <div className={css.separator} />
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
                <div className={css.separator} />
                <div
                    className={css.modalContentEditPanelItem}
                    data-active={isTextMode || textSettingsOpen}
                    onClick={toggleTextSettings}
                >
                    <ModalContentPanelAddTextIcon fill="currentColor" />
                </div>
            </div>
            {textSettingsOpen && (
                <div className={css.textSettingsMenu}>
                    <CustomDropdownSelect
                        name="Size"
                        value={fontSize}
                        options={[
                            { value: 8, label: "8px" },
                            { value: 12, label: "12px" },
                            { value: 18, label: "18px" },
                            { value: 24, label: "24px" },
                            { value: 30, label: "30px" },
                            { value: 34, label: "34px" }
                        ]}
                        onChange={(v) => setFontSize(Number(v))}
                        dropdownClass={css.selectTextSize}
                    />
                    <div className={css.colorInputContainer}>
                        Color
                        <input
                            type="color"
                            className={css.colorInput}
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                        />
                    </div>
                    <button onClick={confirmTextSettings}>OK</button>
                </div>
            )}
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default PdfFilePreviewModal;
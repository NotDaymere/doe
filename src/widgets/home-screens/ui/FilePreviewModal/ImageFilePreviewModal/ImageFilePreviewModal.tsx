import React, { useEffect, useState, useRef } from "react";
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
    savedImage?: string;
    onSaveDrawing: (dataUrl: string) => void;
}

const ImageFilePreviewModal: React.FC<ImageModalProps> = ({
                                                              url,
                                                              onClose,
                                                              fileName,
                                                              fileExt,
                                                              savedImage,
                                                              onSaveDrawing,
                                                          }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [drawingColor, setDrawingColor] = useState("black");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = savedImage ? savedImage : url;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    }, [url, savedImage]);

    const getCanvasCoordinates = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let x, y;
        if ("touches" in e) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }
        return { x, y };
    };

    const startDrawing = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!isDrawingEnabled) return;
        const { x, y } = getCanvasCoordinates(e);
        setIsDrawing(true);
        setLastPoint({ x, y });
    };

    const draw = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const { x, y } = getCanvasCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        // Используем выбранный цвет
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 10;
        ctx.stroke();
        setLastPoint({ x, y });
    };

    const endDrawing = () => {
        setIsDrawing(false);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        onSaveDrawing(dataUrl);
        setIsDrawingEnabled((prev) => !prev);
    };

    const toggleDrawingEnabled = () => {
        setIsDrawingEnabled((prev) => !prev);
    };

    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNameImgContainer}
            modalContentClass={css.modalContentImg}
        >
            <canvas
                ref={canvasRef}
                className={css.modalImage}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={endDrawing}
            />
                <div className={css.modalContentEditPanel}>
                    <div className={css.modalContentEditPanelItem}>
                        <ModalContentPanelCutIcon fill="currentColor" />
                    </div>
                <div className={css.separator}></div>
                <div
                    className={css.modalContentEditPanelItem}
                    onClick={toggleDrawingEnabled}
                    data-active={isDrawingEnabled}>
                    <ModalContentPanelPencilIcon fill="currentColor" />

                </div>

                {isDrawingEnabled && (
                    <div className={css.drawContainer}>
                        <input
                            type="color"
                            className={css.colorInput}
                            value={drawingColor}
                            onChange={(e) => setDrawingColor(e.target.value)}
                            style={{ marginLeft: "8px" }}
                        />
                        <button
                            onClick={handleSave}
                            className={css.saveButton}>
                            Save
                        </button>
                    </div>
                )}
                    <div className={css.separator}></div>
                    <div className={css.modalContentEditPanelItem}>
                        <ModalContentPanelEditIcon fill="currentColor" />
                    </div>
                    <div className={css.separator}></div>
                    <div className={css.modalContentEditPanelItem}>
                        <ModalContentPanelColorsIcon fill="currentColor" />
                    </div>
                    <div className={css.separator}></div>
                    <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelAddTextIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default ImageFilePreviewModal;

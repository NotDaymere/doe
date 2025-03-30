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

interface TextOverlay {
    id: string;
    text: string;
    x: number;
    y: number;
    editing: boolean;
    textColor: string;
    fontWeight: string;
    textSize: number;
}

interface TextOverlayComponentProps {
    overlay: TextOverlay;
    containerRef: React.RefObject<HTMLDivElement>;
    onUpdate: (overlay: TextOverlay) => void;
    onMerge: (updatedOverlay: TextOverlay) => void;
}

const TextOverlayComponent: React.FC<TextOverlayComponentProps> = ({
                                                                       overlay,
                                                                       containerRef,
                                                                       onUpdate,
                                                                       onMerge,
                                                                   }) => {
    const [isDragging, setIsDragging] = useState(false);
    const startOverlayRef = useRef({ x: overlay.x, y: overlay.y });
    const startMouseRef = useRef({ x: 0, y: 0 });

    const overlayRef = useRef(overlay);
    useEffect(() => {
        overlayRef.current = overlay;
    }, [overlay]);

    const handleDocumentMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        if (isDragging) {
            const currentMouse = {
                x: e.clientX - containerRect.left,
                y: e.clientY - containerRect.top,
            };
            const deltaX = currentMouse.x - startMouseRef.current.x;
            const deltaY = currentMouse.y - startMouseRef.current.y;
            const newX = startOverlayRef.current.x + deltaX;
            const newY = startOverlayRef.current.y + deltaY;
            onUpdate({ ...overlayRef.current, x: newX, y: newY });
        }
    };

    const handleDocumentMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            document.removeEventListener("mousemove", handleDocumentMouseMove);
            document.removeEventListener("mouseup", handleDocumentMouseUp);
            onMerge({ ...overlayRef.current });
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        e.preventDefault();
        setIsDragging(true);
        startOverlayRef.current = { x: overlayRef.current.x, y: overlayRef.current.y };
        startMouseRef.current = {
            x: e.clientX - containerRect.left,
            y: e.clientY - containerRect.top,
        };
        document.addEventListener("mousemove", handleDocumentMouseMove);
        document.addEventListener("mouseup", handleDocumentMouseUp);
        e.stopPropagation();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onUpdate({
                ...overlay,
                editing: false,
                text: (e.target as HTMLInputElement).value,
            });
        }
    };

    return overlay.editing ? (
        <input
            type="text"
            autoFocus
            value={overlay.text}
            onChange={(e) => onUpdate({ ...overlay, text: e.target.value })}
            onKeyDown={handleKeyDown}
            style={{
                position: "absolute",
                left: overlay.x,
                top: overlay.y,
                fontSize: `${overlay.textSize}px`,
                padding: "2px",
                color: overlay.textColor,
                fontWeight: overlay.fontWeight,
            }}
        />
    ) : (
        <div
            style={{
                position: "absolute",
                left: overlay.x,
                top: overlay.y,
                cursor: "grabbing",
                fontSize: `${overlay.textSize}px`,
                userSelect: "none",
                color: overlay.textColor,
                fontWeight: overlay.fontWeight,
            }}
            onMouseDown={handleMouseDown}
        >
            {overlay.text}
        </div>
    );
};


const ImageFilePreviewModal: React.FC<ImageModalProps> = ({
                                                              url,
                                                              onClose,
                                                              fileName,
                                                              fileExt,
                                                              savedImage,
                                                              onSaveDrawing,
                                                          }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasDimensions, setCanvasDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [drawingColor, setDrawingColor] = useState("black");
    const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
    const [textColor, setTextColor] = useState("black");
    const [fontWeight, setFontWeight] = useState("400");
    const [textSize, setTextSize] = useState(20);
    const [isAddingText, setIsAddingText] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = savedImage ? savedImage : url;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            setCanvasDimensions({ width: image.width, height: image.height });
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
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 10;
        ctx.stroke();
        setLastPoint({ x, y });
    };

    const endDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        onSaveDrawing(dataUrl);
    };

    const toggleDrawingEnabled = () => {
        setIsDrawingEnabled((prev) => !prev);
    };

    const addTextOverlay = () => {
        if (!containerRef.current) return;
        const { clientWidth, clientHeight } = containerRef.current;
        const newOverlay: TextOverlay = {
            id: Date.now().toString(),
            text: "",
            x: clientWidth / 2,
            y: clientHeight / 2,
            editing: true,
            textColor: textColor,
            fontWeight: fontWeight,
            textSize: textSize,
        };
        setTextOverlays((prev) => [...prev, newOverlay]);
        setIsAddingText(false);
    };

    const mergeTextOverlay = (updatedOverlay: TextOverlay) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.font = `${updatedOverlay.fontWeight} ${updatedOverlay.textSize}px sans-serif`;
        ctx.fillStyle = updatedOverlay.textColor;
        ctx.fillText(updatedOverlay.text, updatedOverlay.x, updatedOverlay.y);
        setTextOverlays((prev) => prev.filter((o) => o.id !== updatedOverlay.id));
        const dataUrl = canvas.toDataURL("image/png");
        onSaveDrawing(dataUrl);
    };

    return createPortal(
        <FilePreviewModalOverlay
            onClose={onClose}
            fileName={fileName}
            fileExt={fileExt}
            fileNameContainerClass={css.modalFileNameImgContainer}
            modalContentClass={css.modalContentImg}
        >
            <div ref={containerRef} className={css.canvas_styles}>
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
                {textOverlays.map((overlay) => (
                    <TextOverlayComponent
                        key={overlay.id}
                        overlay={overlay}
                        containerRef={containerRef}
                        onUpdate={(updated) =>
                            setTextOverlays((prev) =>
                                prev.map((o) => (o.id === overlay.id ? updated : o))
                            )
                        }
                        onMerge={mergeTextOverlay}
                    />
                ))}
            </div>
            <div className={css.modalContentEditPanel}>
                <div className={css.modalContentEditPanelItem}>
                    <ModalContentPanelCutIcon fill="currentColor" />
                </div>
                <div className={css.separator}></div>
                <div
                    className={css.modalContentEditPanelItem}
                    onClick={toggleDrawingEnabled}
                    data-active={isDrawingEnabled}
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
                            style={{ marginLeft: "8px" }}
                        />
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
                <div
                    className={css.modalContentEditPanelItem}
                    onClick={() => setIsAddingText((prev) => !prev)}
                    data-active={isAddingText}
                >
                    <ModalContentPanelAddTextIcon fill="currentColor" />
                </div>

                {isAddingText && (
                    <div
                        className={css.addTextContainer}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                addTextOverlay();
                            }
                        }}
                    >
                        <div className={css.colorInputContainer}>
                            Color
                            <input
                                type="color"
                                className={css.colorInput}
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                            />
                        </div>
                        <select
                            className={css.selectWeightInput}
                            value={fontWeight}
                            onChange={(e) => setFontWeight(e.target.value)}
                        >
                            <option value="400">Normal</option>
                            <option value="700">Bold</option>
                        </select>
                        <select
                            className={css.selectTextSize}
                            value={textSize}
                            onChange={(e) => setTextSize(parseInt(e.target.value))}
                        >
                            <option value="16">16px</option>
                            <option value="18">18px</option>
                            <option value="20">20px</option>
                            <option value="24">24px</option>
                            <option value="28">28px</option>
                            <option value="32">32px</option>
                        </select>
                    </div>
                )}

            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default ImageFilePreviewModal;

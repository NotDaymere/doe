import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./ImageFilePreviewModal.module.less";
import FilePreviewModalOverlay from "../FilePreviewModalOverplay/FilePreviewModalOverplay";
import ModalContentPanelPencilIcon from "../../../../../shared/icons/ModalContentPanelPencil.icon";
import ModalContentPanelAddTextIcon from "../../../../../shared/icons/ModalContentPanelAddText.icon";
import ModalContentPanelCutIcon from "../../../../../shared/icons/ModalContentPanelCut.icon";
import ModalContentPanelEditIcon from "../../../../../shared/icons/ModalContentPanelEdit.icon";
import ModalContentPanelColorsIcon from "../../../../../shared/icons/ModalContentPanelColors.icon";
import { TextOverlay } from "./TextOverlay/TextOverlay";
import { CustomDropdownSelect } from "./CustomDropdownSelect/CustomDropdownSelect";
import ImageCropper from "./ImageCropper/ImageCropper";
import CloseSearchInputIcon from "../../../../../shared/icons/CloseSearchInputIcon";

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

    const [isCropping, setIsCropping] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = savedImage ? savedImage : url;
        image.onload = () => {
            const maxWidth = window.innerWidth * 0.5;
            const maxHeight = window.innerHeight * 0.7;
            const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
            const scaledWidth = image.width * scale;
            const scaledHeight = image.height * scale;
            canvas.width = scaledWidth;
            canvas.height = scaledHeight;
            setCanvasDimensions({ width: scaledWidth, height: scaledHeight });
            ctx?.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        };
    }, [url, savedImage]);

    const getCanvasCoordinates = (
        e:
            | React.MouseEvent<HTMLDivElement>
            | React.TouchEvent<HTMLDivElement>
            | React.MouseEvent<HTMLCanvasElement>
            | React.TouchEvent<HTMLCanvasElement>
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
        if (!isDrawingEnabled || isCropping) return;
        const { x, y } = getCanvasCoordinates(e);
        setIsDrawing(true);
        setLastPoint({ x, y });
    };

    const draw = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!isDrawing || isCropping) return;
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
        if (!isDrawing || isCropping) return;
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
            x: clientWidth / 4,
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
        const fontSpec = `${updatedOverlay.fontWeight} ${updatedOverlay.textSize}px sans-serif`;
        ctx.font = fontSpec;
        ctx.fillStyle = updatedOverlay.textColor;
        const containerWidth = containerRef.current?.clientWidth || canvas.width;
        const availableWidth = containerWidth * 0.8;
        const lineHeight = updatedOverlay.textSize * 1.2;
        const words = updatedOverlay.text.split(" ");
        const lines: string[] = [];
        let currentLine = "";
        words.forEach((word) => {
            const testLine = currentLine ? currentLine + " " + word : word;
            if (ctx.measureText(testLine).width > availableWidth) {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    let subLine = "";
                    for (let char of word) {
                        const testSub = subLine + char;
                        if (ctx.measureText(testSub).width > availableWidth) {
                            lines.push(subLine);
                            subLine = char;
                        } else {
                            subLine = testSub;
                        }
                    }
                    currentLine = subLine;
                }
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }
        let currentY = Math.round(updatedOverlay.y);
        lines.forEach((line) => {
            ctx.fillText(line, Math.round(updatedOverlay.x), currentY);
            currentY += lineHeight;
        });
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
            <div
                ref={containerRef}
                className={css.canvas_styles}
                style={{
                    width: `${canvasDimensions.width}px`,
                    height: `${canvasDimensions.height}px`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    position: "relative",
                }}
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
                {isCropping && (
                    <ImageCropper
                        canvasRef={canvasRef}
                        onApplyCrop={(dataUrl) => {
                            onSaveDrawing(dataUrl);
                            setIsCropping(false);
                        }}
                        onCancelCrop={() => setIsCropping(false)}
                    />
                )}
                {textOverlays.map((overlay) => (
                    <TextOverlay
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
                {!isCropping
                ? (
                        <div
                            className={css.modalContentEditPanelItem}
                            onClick={() => {
                                setIsCropping(true);
                                setIsDrawingEnabled(false);
                            }}
                            data-active={isCropping}
                        >
                            <ModalContentPanelCutIcon fill="currentColor" />
                        </div>
                    )
                : (
                        <div
                            onClick={() => setIsCropping(false)}
                            className={css.modalContentEditPanelItem}
                        ><CloseSearchInputIcon width={30} height={30}/></div>
                    )}

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
                        <CustomDropdownSelect
                            name={"Weight"}
                            value={fontWeight}
                            onChange={(value: string | number) => setFontWeight(value as string)}
                            options={[
                                { value: "400", label: "Normal" },
                                { value: "700", label: "Bold" },
                            ]}
                            dropdownClass={css.selectWeightInput}
                        />
                        <CustomDropdownSelect
                            name={"Size"}
                            value={textSize}
                            onChange={(val) => setTextSize(parseInt(val as string))}
                            options={[
                                { value: 18, label: "18px" },
                                { value: 24, label: "24px" },
                                { value: 30, label: "30px" },
                            ]}
                            dropdownClass={css.selectTextSize}
                        />
                    </div>
                )}
            </div>
        </FilePreviewModalOverlay>,
        document.body
    );
};

export default ImageFilePreviewModal;

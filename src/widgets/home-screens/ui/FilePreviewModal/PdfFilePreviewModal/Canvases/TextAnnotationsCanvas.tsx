import React, { useRef, useState, useEffect } from "react";
import css from "../PdfFilePreviewModal.module.less";
import { TextAnnotation } from "../pdfWorker";

interface TextAnnotationCanvasProps {
    pageIndex: number;
    isTextMode: boolean;
    fontWeight: "regular" | "bold";
    fontSize: number;
    fontColor: string;
    setIsTextMode: React.Dispatch<React.SetStateAction<boolean>>;
    originalDimensions: Array<{ width: number; height: number }>;
    computePageDimensions: (pageIndex: number) => {
        pageWidth: number;
        pageHeight: number;
        scaleFactor: number;
    };
    canvasRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
    currentPage: number;
    onAnnotationChange: (newAnnotation: TextAnnotation) => void;
    onAnnotationsUpdate: (annotations: TextAnnotation[]) => void;
}

const TextAnnotationCanvas: React.FC<TextAnnotationCanvasProps> = ({
                                                                       pageIndex,
                                                                       isTextMode,
                                                                       fontWeight,
                                                                       fontSize,
                                                                       fontColor,
                                                                       setIsTextMode,
                                                                       originalDimensions,
                                                                       computePageDimensions,
                                                                       canvasRef,
                                                                       currentPage,
                                                                       onAnnotationChange,
                                                                       onAnnotationsUpdate,
                                                                   }) => {
    const [activeTextInput, setActiveTextInput] = useState<{
        page: number;
        x: number;
        y: number;
        value?: string;
    } | null>(null);
    const [activeDraggableAnnotation, setActiveDraggableAnnotation] =
        useState<TextAnnotation | null>(null);
    const [dragOffset, setDragOffset] = useState<{
        offsetX: number;
        offsetY: number;
    } | null>(null);
    const draggingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getTextInputCoordinates = (
        e: React.MouseEvent,
        canvas: HTMLCanvasElement
    ) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    const applyTextAnnotation = (page: number, x: number, y: number, text: string) => {
        if (text) {
            const safeFontColor =
                fontColor && /^#[0-9A-F]{6}$/i.test(fontColor) ? fontColor : "#000000";
            const safeFontSize = fontSize || 18;
            const safeFontWeight = fontWeight || "regular";

            const canvas = canvasRef.current[page * 2 + 1];
            const canvasRect = canvas ? canvas.getBoundingClientRect() : { width: 100 };
            const availableWidth = canvasRect.width - x;

            const { width: ow, height: oh } = originalDimensions[page] || { width: 100, height: 100 };
            const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(page);

            const pdfX = (x / pageWidth) * ow;
            const pdfY = oh - (y / pageHeight) * oh - safeFontSize * scaleFactor;
            const pdfFontSize = safeFontSize * scaleFactor;
            const pdfMaxWidth = (availableWidth / pageWidth) * ow;

            const newAnnotation: TextAnnotation = {
                type: "text",
                page,
                x,
                y,
                text,
                maxWidth: pdfMaxWidth,
                fontColor: safeFontColor,
                fontSize: safeFontSize,
                fontWeight: safeFontWeight,
                pdfX,
                pdfY,
                pdfFontSize,
            };
            setActiveDraggableAnnotation(newAnnotation);
            onAnnotationChange(newAnnotation);
            setActiveTextInput(null);
        } else {
            setActiveTextInput(null);
        }
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isTextMode) return;

        const target = e.target as HTMLElement;
        if (inputRef.current && (inputRef.current.contains(target) || target.closest(`.${css.annotationContainer}`))) {
            return;
        }

        const canvas = canvasRef.current[pageIndex * 2 + 1];
        const { x, y } = canvas
            ? getTextInputCoordinates(e, canvas)
            : { x: e.clientX, y: e.clientY };

        if (activeTextInput) {
            applyTextAnnotation(activeTextInput.page, activeTextInput.x, activeTextInput.y, activeTextInput.value || "");
            setActiveTextInput({ page: pageIndex, x, y, value: "" });
        } else {
            setActiveTextInput({ page: pageIndex, x, y, value: "" });
        }
    };

    const handleTextInput = (
        e: React.KeyboardEvent<HTMLInputElement>,
        page: number,
        x: number,
        y: number
    ) => {
        if (e.key === "Enter") {
            const text = e.currentTarget.value.trim();
            applyTextAnnotation(page, x, y, text);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (activeTextInput) {
            setActiveTextInput({ ...activeTextInput, value: e.target.value });
        }
    };

    const onDraggableMouseDown = (
        e: React.MouseEvent<HTMLDivElement>,
        type: "input" | "annotation"
    ) => {
        e.stopPropagation();
        e.preventDefault();
        draggingRef.current = true;
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        setDragOffset({ offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top });
    };

    const onDraggableMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!draggingRef.current || !dragOffset || !containerRef.current) return;
        e.preventDefault();

        const pageContainer = containerRef.current;
        const pageContainerRect = pageContainer.getBoundingClientRect();
        const newX = e.clientX - pageContainerRect.left - dragOffset.offsetX;
        const newY = e.clientY - pageContainerRect.top - dragOffset.offsetY;

        if (activeDraggableAnnotation) {
            const { width: ow, height: oh } = originalDimensions[activeDraggableAnnotation.page] || { width: 100, height: 100 };
            const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(
                activeDraggableAnnotation.page
            );
            const pdfX = (newX / pageWidth) * ow;
            const pdfY = oh - (newY / pageHeight) * oh - activeDraggableAnnotation.fontSize * scaleFactor;

            if (newX !== activeDraggableAnnotation.x || newY !== activeDraggableAnnotation.y) {
                setActiveDraggableAnnotation({
                    ...activeDraggableAnnotation,
                    x: newX,
                    y: newY,
                    pdfX,
                    pdfY,
                });
                onAnnotationChange({
                    ...activeDraggableAnnotation,
                    x: newX,
                    y: newY,
                    pdfX,
                    pdfY,
                });
            }
        } else if (activeTextInput) {
            setActiveTextInput({
                ...activeTextInput,
                x: newX,
                y: newY,
            });
        }
    };

    const onDraggableMouseUp = () => {
        if (activeDraggableAnnotation) {
            onAnnotationsUpdate([activeDraggableAnnotation]);
            setActiveDraggableAnnotation(null);
        }
        draggingRef.current = false;
        setDragOffset(null);
    };

    useEffect(() => {
        if (isTextMode && !activeTextInput && originalDimensions[pageIndex] && currentPage - 1 === pageIndex) {
            const { width: ow, height: oh } = originalDimensions[pageIndex];
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            const scale = Math.min(maxWidth / ow, maxHeight / oh, 1);
            const pageWidth = ow * scale;
            setActiveTextInput({
                page: pageIndex,
                x: pageWidth / 3,
                y: (oh * scale) / 2.5,
                value: "",
            });
        }
    }, [isTextMode, activeTextInput, pageIndex, originalDimensions, currentPage]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: isTextMode ? 100 : 0,
                pointerEvents: isTextMode ? "auto" : "none",
            }}
            onClick={handleCanvasClick}
        >
            {activeTextInput && activeTextInput.page === pageIndex && (
                <div
                    className={css.annotationContainer}
                    style={{
                        transform: `translate(${activeTextInput.x}px, ${activeTextInput.y}px)`,
                        cursor: draggingRef.current ? "grabbing" : "grab",
                        zIndex: 101,
                    }}
                    onMouseDown={(e) => onDraggableMouseDown(e, "input")}
                    onMouseMove={onDraggableMouseMove}
                    onMouseUp={onDraggableMouseUp}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        className={css.textAnnotationInput}
                        style={{
                            fontWeight,
                            fontSize: `${fontSize}px`,
                            color: fontColor,
                        }}
                        value={activeTextInput.value || ""}
                        onChange={handleInputChange}
                        autoFocus
                        onKeyDown={(e) => handleTextInput(e, pageIndex, activeTextInput.x, activeTextInput.y)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            {activeDraggableAnnotation && activeDraggableAnnotation.page === pageIndex && (
                <div
                    className={css.textAnnotation}
                    style={{
                        transform: `translate(${activeDraggableAnnotation.x}px, ${activeDraggableAnnotation.y}px)`,
                        fontSize: `${activeDraggableAnnotation.fontSize}px`,
                        color: activeDraggableAnnotation.fontColor,
                        fontWeight: activeDraggableAnnotation.fontWeight === "bold" ? "bold" : "normal",
                        cursor: draggingRef.current ? "grabbing" : "grab",
                        zIndex: 101,
                    }}
                    onMouseDown={(e) => onDraggableMouseDown(e, "annotation")}
                    onMouseMove={onDraggableMouseMove}
                    onMouseUp={onDraggableMouseUp}
                >
                    {activeDraggableAnnotation.text}
                </div>
            )}
        </div>
    );
};

export default TextAnnotationCanvas;
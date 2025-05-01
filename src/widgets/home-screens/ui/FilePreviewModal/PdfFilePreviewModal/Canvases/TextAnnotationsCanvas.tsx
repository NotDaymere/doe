import React, { useRef, useState, useEffect } from "react";
import css from "../PdfFilePreviewModal.module.less";
import { TextAnnotation } from "../pdfWorker";

interface TextAnnotationCanvasProps {
    pageIndex: number;
    isTextMode: boolean;
    fontWeight: "regular" | "bold";
    fontSize: number;
    fontColor: string;
    originalDimensions: Array<{ width: number; height: number }>;
    computePageDimensions: (pageIndex: number) => {
        pageWidth: number;
        pageHeight: number;
        scaleFactor: number;
    };
    canvasRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
    onAnnotationChange: (newAnnotation: TextAnnotation) => void;
}

const TextAnnotationCanvas: React.FC<TextAnnotationCanvasProps> = ({
                                                                       pageIndex,
                                                                       isTextMode,
                                                                       fontWeight,
                                                                       fontSize,
                                                                       fontColor,
                                                                       originalDimensions,
                                                                       computePageDimensions,
                                                                       canvasRef,
                                                                       onAnnotationChange,
                                                                   }) => {
    const [activeTextInput, setActiveTextInput] = useState<{
        page: number;
        x: number;
        y: number;
        value: string;
    } | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
        if (!text) {
            setActiveTextInput(null);
            return;
        }

        const safeFontColor = fontColor && /^#[0-9A-F]{6}$/i.test(fontColor) ? fontColor : "#000000";
        const safeFontSize = fontSize || 18;
        const safeFontWeight = fontWeight || "regular";

        const canvas = canvasRef.current[page * 2 + 1];
        const canvasRect = canvas ? canvas.getBoundingClientRect() : { width: 100 };
        const availableWidth = canvasRect.width - x;

        const { width: ow, height: oh } = originalDimensions[page] || { width: 100, height: 100 };
        const { pageWidth, pageHeight, scaleFactor } = computePageDimensions(page);

        const pdfX = (x / pageWidth) * ow;
        const pdfY = oh - (y / pageHeight) * oh;
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

        console.log("Applying text annotation:", newAnnotation);
        onAnnotationChange(newAnnotation);
        setActiveTextInput(null);
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isTextMode) return;

        const canvas = canvasRef.current[pageIndex * 2 + 1];
        const { x, y } = canvas
            ? getTextInputCoordinates(e, canvas)
            : { x: e.clientX, y: e.clientY };

        console.log("Canvas clicked:", { pageIndex, x, y });

        if (activeTextInput) {
            applyTextAnnotation(activeTextInput.page, activeTextInput.x, activeTextInput.y, activeTextInput.value);
        }
        setActiveTextInput({ page: pageIndex, x, y, value: "" });
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

    useEffect(() => {
        if (activeTextInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeTextInput]);

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
                        zIndex: 101,
                    }}
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
                        value={activeTextInput.value}
                        onChange={handleInputChange}
                        autoFocus
                        onKeyDown={(e) => handleTextInput(e, pageIndex, activeTextInput.x, activeTextInput.y)}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default TextAnnotationCanvas;
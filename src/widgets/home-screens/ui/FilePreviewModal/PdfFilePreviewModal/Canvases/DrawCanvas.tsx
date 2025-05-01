import React, { useRef, useEffect } from "react";
import css from "../PdfFilePreviewModal.module.less";

interface DrawCanvasProps {
    pageIndex: number;
    canvasRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
    drawingColor: string;
    isDrawingEnabled: boolean;
    isTextMode: boolean; // Добавляем для проверки текстового режима
    pageWidth: number;
    pageHeight: number;
    onAnnotationChange: () => void;
}

const DrawCanvas: React.FC<DrawCanvasProps> = ({
                                                   pageIndex,
                                                   canvasRef,
                                                   drawingColor,
                                                   isDrawingEnabled,
                                                   isTextMode,
                                                   pageWidth,
                                                   pageHeight,
                                                   onAnnotationChange,
                                               }) => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef(false);
    const lastPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (drawCanvasRef.current) {
            canvasRef.current[pageIndex * 2 + 1] = drawCanvasRef.current;
            const pr = window.devicePixelRatio || 1;
            drawCanvasRef.current.width = pageWidth * pr;
            drawCanvasRef.current.height = pageHeight * pr;
            const ctx = drawCanvasRef.current.getContext("2d");
            if (ctx) {
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
            }
        }
    }, [pageIndex, canvasRef, pageWidth, pageHeight]);

    const getCanvasCoordinates = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
        canvas: HTMLCanvasElement
    ) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.type.includes("touch")
            ? (e as React.TouchEvent).touches[0].clientX
            : (e as React.MouseEvent).clientX;
        const clientY = e.type.includes("touch")
            ? (e as React.TouchEvent).touches[0].clientY
            : (e as React.MouseEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const startDrawing = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!drawCanvasRef.current || !isDrawingEnabled || isTextMode) return;
        e.preventDefault();
        const { x, y } = getCanvasCoordinates(e, drawCanvasRef.current);
        isDrawingRef.current = true;
        lastPointRef.current = { x, y };
    };

    const draw = (
        e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) => {
        if (!isDrawingRef.current || !drawCanvasRef.current || isTextMode) return;
        e.preventDefault();
        const ctx = drawCanvasRef.current.getContext("2d");
        if (!ctx) return;
        const { x, y } = getCanvasCoordinates(e, drawCanvasRef.current);
        const pr = window.devicePixelRatio || 1;
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x * pr, lastPointRef.current.y * pr);
        ctx.lineTo(x * pr, y * pr);
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 5 * pr;
        ctx.stroke();
        lastPointRef.current = { x, y };
    };

    const endDrawing = () => {
        if (isDrawingRef.current && drawCanvasRef.current) {
            isDrawingRef.current = false;
            onAnnotationChange(); // Вызываем только после завершения рисования
        }
    };

    return (
        <canvas
            ref={drawCanvasRef}
            className={css.drawCanvas}
            onMouseDown={isDrawingEnabled && !isTextMode ? startDrawing : undefined}
            onMouseMove={isDrawingEnabled && !isTextMode ? draw : undefined}
            onMouseUp={isDrawingEnabled && !isTextMode ? endDrawing : undefined}
            onMouseLeave={isDrawingEnabled && !isTextMode ? endDrawing : undefined}
            onTouchStart={isDrawingEnabled && !isTextMode ? startDrawing : undefined}
            onTouchMove={isDrawingEnabled && !isTextMode ? draw : undefined}
            onTouchEnd={isDrawingEnabled && !isTextMode ? endDrawing : undefined}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: isDrawingEnabled && !isTextMode ? 100 : 10,
                pointerEvents: isDrawingEnabled && !isTextMode ? "auto" : "none",
                cursor: isDrawingEnabled && !isTextMode ? "crosshair" : "default",
            }}
        />
    );
};

export default DrawCanvas;
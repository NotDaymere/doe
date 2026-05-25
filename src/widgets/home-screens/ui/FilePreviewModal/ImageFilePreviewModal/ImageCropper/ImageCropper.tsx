import React, { useState } from "react";

interface ImageCropperProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    onApplyCrop: (dataUrl: string) => void;
    onCancelCrop: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
                                                       canvasRef,
                                                       onApplyCrop,
                                                       onCancelCrop,
                                                   }) => {
    const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
    const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);

    const getCanvasCoordinates = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let x: number, y: number;
        if ("touches" in e) {
            x = (e.touches[0].clientX - rect.left) * scaleX;
            y = (e.touches[0].clientY - rect.top) * scaleY;
        } else {
            x = (e.clientX - rect.left) * scaleX;
            y = (e.clientY - rect.top) * scaleY;
        }
        return { x, y };
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {

        if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;
        const { x, y } = getCanvasCoordinates(e);
        setCropStart({ x, y });
        setCropEnd({ x, y });
    };

    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;
        if (!cropStart) return;
        const { x, y } = getCanvasCoordinates(e);
        setCropEnd({ x, y });
    };

    const handleMouseUp = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {

        if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;
        if (!cropStart) return;
        const { x, y } = getCanvasCoordinates(e);
        const cropEnd = { x, y };

        const left = Math.min(cropStart.x, cropEnd.x);
        const top = Math.min(cropStart.y, cropEnd.y);
        const cropWidth = Math.abs(cropEnd.x - cropStart.x);
        const cropHeight = Math.abs(cropEnd.y - cropStart.y);

        if (cropWidth === 0 || cropHeight === 0) {

            setCropStart(null);
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(left, top, cropWidth, cropHeight);
        const offscreen = document.createElement("canvas");

        offscreen.width = cropWidth;
        offscreen.height = cropHeight;

        const offCtx = offscreen.getContext("2d");
        if (!offCtx) return;

        offCtx.putImageData(imageData, 0, 0);

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.putImageData(imageData, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");

        onApplyCrop(dataUrl);

        setCropStart(null);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
            {cropStart && cropEnd && (
                <div
                    style={{
                        position: "absolute",
                        left: Math.min(cropStart.x, cropEnd.x),
                        top: Math.min(cropStart.y, cropEnd.y),
                        width: Math.abs(cropEnd.x - cropStart.x),
                        height: Math.abs(cropEnd.y - cropStart.y),
                        border: "2px dashed white",
                        backgroundColor: "rgba(255,255,255,0.22)",
                        pointerEvents: "none",
                    }}
                />
            )}
        </div>
    );
};

export default ImageCropper;

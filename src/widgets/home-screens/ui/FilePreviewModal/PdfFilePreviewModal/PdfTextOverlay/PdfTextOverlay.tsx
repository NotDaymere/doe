import React, { useEffect, useRef, useState } from "react";
import css from "./PdfTextOverlay.module.less";

export interface PdfTextOverlay {
    id: string;
    text: string;
    x: number;
    y: number;
    pageIndex: number;
    editing: boolean;
    textColor: string;
    fontWeight: string;
    textSize: number;
}

export interface PdfTextOverlayProps {
    overlay: PdfTextOverlay;
    containerRef: React.RefObject<HTMLDivElement>;
    onUpdate: (overlay: PdfTextOverlay) => void;
    onMerge: (updatedOverlay: PdfTextOverlay) => void;
}

export const PdfTextOverlay: React.FC<PdfTextOverlayProps> = ({
                                                            overlay,
                                                            containerRef,
                                                            onUpdate,
                                                            onMerge,
                                                        }) => {
    const [isDragging, setIsDragging] = useState(false);
    const startOverlayRef = useRef({ x: overlay.x, y: overlay.y });
    const startMouseRef = useRef({ x: 0, y: 0 });
    const finalCoordsRef = useRef({ x: overlay.x, y: overlay.y });

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
            const newX = Math.round(startOverlayRef.current.x + deltaX);
            const newY = Math.round(startOverlayRef.current.y + deltaY);
            finalCoordsRef.current = { x: newX, y: newY };
            onUpdate({ ...overlayRef.current, x: newX, y: newY });
        }
    };

    const handleDocumentMouseUp = () => {
        if (isDragging) {
            setIsDragging(false);
            document.removeEventListener("mousemove", handleDocumentMouseMove);
            document.removeEventListener("mouseup", handleDocumentMouseUp);
            onMerge({ ...overlayRef.current, ...finalCoordsRef.current });
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
        finalCoordsRef.current = { x: overlayRef.current.x, y: overlayRef.current.y };
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
        <div
            style={{
                background: "red",
                position: "absolute",
                left: "50%",
                top: overlay.y,
                transform: "translateX(-50%)",
                maxWidth: "80%",
                wordWrap: "break-word",
            }}
        >
            <input
                className={css.textInput}
                type="text"
                autoFocus
                value={overlay.text}
                onChange={(e) => onUpdate({ ...overlay, text: e.target.value })}
                onKeyDown={handleKeyDown}
                style={{
                    background: "red",
                    fontSize: `${overlay.textSize}px`,
                    padding: "2px",
                    color: overlay.textColor,
                    fontWeight: overlay.fontWeight,
                    width: "100%",
                    boxSizing: "border-box",
                }}
            />
        </div>
    ) : (
        <div
            className={isDragging ? css.textSelected : ""}
            style={{
                background: "red",
                position: "absolute",
                left: overlay.x,
                top: overlay.y,
                cursor: "grabbing",
                fontSize: `${overlay.textSize}px`,
                userSelect: "none",
                color: overlay.textColor,
                fontWeight: overlay.fontWeight,
                maxWidth: "80%",
                wordWrap: "break-word",
            }}
            onMouseDown={handleMouseDown}
        >
            {overlay.text}
        </div>
    );
};
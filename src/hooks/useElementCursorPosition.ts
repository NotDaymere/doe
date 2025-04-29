import { useEffect, useState } from "react";

interface CursorPosition {
    top: number;
    left: number;
}

interface UseElementCursorPositionProps {
    location?: string;
    cursorPosition?: {
        top?: number;
        left?: number;
    };
    cursorCentered?: boolean;
    delay?: number;
}

export function useElementCursorPosition({
    location,
    cursorPosition,
    cursorCentered,
    delay = 0,
}: UseElementCursorPositionProps): CursorPosition {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    // console.log("position: ", position);

    useEffect(() => {
        if (!location || cursorCentered) return;

        const element = document.querySelector(location);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                setPosition({
                    top: rect.bottom - (cursorPosition?.top ?? 4),
                    left: rect.right - (cursorPosition?.left ?? 4),
                });
            }, delay || 0);
        }
    }, [location, cursorPosition, cursorCentered]);

    return position;
}

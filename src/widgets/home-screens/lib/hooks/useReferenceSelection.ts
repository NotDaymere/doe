import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

interface Position { top: number; left: number }

export function useReferenceSelection(
    containerRef: RefObject<HTMLElement>,
    onSelect: (text: string) => void
) {
    const selectedTextRef = useRef("");
    const lastMouseEvent = useRef<MouseEvent | null>(null);

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<Position | null>(null);

    const getSelectedTextWithin = (container: HTMLElement): string => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return "";
        const range = sel.getRangeAt(0);
        if (container.contains(range.startContainer) && container.contains(range.endContainer)) {
            return sel.toString().trim();
        }
        return "";
    };

    const handleSelectionChange = () => {
        if (!containerRef.current) return;

        const text = getSelectedTextWithin(containerRef.current);
        if (text) {
            selectedTextRef.current = text;
            const range = window.getSelection()!.getRangeAt(0);
            const rect = range.getClientRects()[range.getClientRects().length - 1];
            setPosition({ top: rect.bottom + window.scrollY - 50, left: (lastMouseEvent.current?.pageX ?? rect.right) - 20 });
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            lastMouseEvent.current = e;
            handleSelectionChange();
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("selectionchange", handleSelectionChange);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, []);

    const close = () => setVisible(false);

    const handleReferenceClick = () => {
        onSelect(selectedTextRef.current);
        setVisible(false);
        window.getSelection()?.removeAllRanges();
    };

    return { visible, position, close, handleReferenceClick };
}

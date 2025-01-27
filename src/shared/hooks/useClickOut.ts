import React from "react";

interface Props {
    handler?: () => void;
}

export function useClickOut<T extends HTMLDivElement>({ handler }: Props = {}) {
    const mouseDown = React.useRef(false);
    const ref = React.useRef<T>(null);

    const handleMouseDown = (event: MouseEvent) => {
        if (
            ref.current &&
            !event.composedPath().includes(ref.current) &&
            event.button !== 2 &&
            ref.current
        ) {
            mouseDown.current = true;
        }
    };

    const handleMouseUp = (event: MouseEvent) => {
        if (mouseDown.current && ref.current) {
            if (!event.composedPath().includes(ref.current) && event.button !== 2) {
                handler?.();
                mouseDown.current = false;
            }
        }
    };

    React.useEffect(() => {
        const element = ref.current;
        if (element) {
            window.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mouseup", handleMouseUp);

            return () => {
                window.removeEventListener("mousedown", handleMouseDown);
                window.removeEventListener("mouseup", handleMouseUp);
            };
        }
    });

    return ref;
}

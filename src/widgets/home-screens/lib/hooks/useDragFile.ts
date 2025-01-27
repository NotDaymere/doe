import React from "react";

interface Props {
    onUploadFiles?: (files: File[]) => void;
}

export function useDragFile(props: Props = {}) {
    const [state, setState] = React.useState({
        drag: false,
        dragTarget: false,
    });

    const setDrag = (drag: boolean) =>
        setState((state) => ({
            ...state,
            drag,
        }));

    const setDragTarget = (dragTarget: boolean) =>
        setState((state) => ({
            ...state,
            dragTarget,
        }));

    const stopDrag = () =>
        setState({
            drag: false,
            dragTarget: false,
        });

    const handleDragOverTarget = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragLeaveTarget = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragTarget(false);
    };

    const handleDragDropTarget = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        props.onUploadFiles?.(files);
        stopDrag();
    };

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDrag(true);
    };

    const handleDragCancel = (event: React.DragEvent<HTMLDivElement>) => {
        if (
            event.currentTarget.contains(event.relatedTarget as any) ||
            event.currentTarget === event.relatedTarget
        ) {
            return;
        }
        event.preventDefault();
        setDrag(false);
    };

    return {
        ...state,
        handleDragStart,
        handleDragOver,
        handleDragCancel,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        stopDrag,
    };
}

import React from "react";
import { extractFilesFromLinks } from "../helpers/LinkToFileTransformer";

export interface FileWithId extends File {
    id: string;
}

interface Props {
    onUploadFiles?: (files: FileWithId[]) => void;
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

    React.useEffect(() => {
        const handleDragEnter = (event: DragEvent) => {
            event.preventDefault();
            setDrag(true);
        };

        const handleDragOver = (event: DragEvent) => {
            event.preventDefault();
            setDrag(true);
        };

        const handleDragLeave = (event: DragEvent) => {
            if (!document.documentElement.contains(event.relatedTarget as Node)) {
                setDrag(false);
            }
        };

        const handleDrop = (event: DragEvent) => {
            event.preventDefault();
            setDrag(false);
        };

        document.addEventListener("dragenter", handleDragEnter);
        document.addEventListener("dragover", handleDragOver);
        document.addEventListener("dragleave", handleDragLeave);
        document.addEventListener("drop", handleDrop);

        return () => {
            document.removeEventListener("dragenter", handleDragEnter);
            document.removeEventListener("dragover", handleDragOver);
            document.removeEventListener("dragleave", handleDragLeave);
            document.removeEventListener("drop", handleDrop);
        };
    }, []);

    const handleDragOverTarget = (
        event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragLeaveTarget = (
        event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setDragTarget(false);
    };

    const handleDragDropTarget = async (
        event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();

        let filesWithId: FileWithId[] = Array.from(event.dataTransfer.files).map(
            (file) =>
                Object.assign(file, {
                    id: `${Date.now()}-${Math.random()}`,
                }) as FileWithId
        );

        const linkFiles = await extractFilesFromLinks(event.dataTransfer.items);
        filesWithId = filesWithId.concat(linkFiles);
        console.log("filesWithId", filesWithId);

        props.onUploadFiles?.(filesWithId);
    };

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleDragOver = (
        event: React.DragEvent<HTMLDivElement> | React.DragEvent<HTMLButtonElement>
    ) => {
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

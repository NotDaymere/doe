import React from "react";

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

    const handleDragOverTarget = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragTarget(true);
    };

    const handleDragLeaveTarget = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragTarget(false);
    };

    const handleDragDropTarget = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        let filesWithId: FileWithId[] = Array.from(event.dataTransfer.files).map((file) =>
            Object.assign(file, {
                id: `${Date.now()}-${Math.random()}`,
            }) as FileWithId
        );

        const linkItems = Array.from(event.dataTransfer.items).filter(
            (item) => item.kind === "string" && item.type === "text/uri-list"
        );

        for (const item of linkItems) {
            const url = await new Promise<string>((resolve) => item.getAsString(resolve));

            if (/^https?:\/\//i.test(url)) {

                let fileName = "unknown";
                try {
                    const urlObj = new URL(url);
                    const lastSegment = urlObj.href;
                    fileName = lastSegment || fileName;
                } catch {

                }
                let blob: Blob;
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Non-200 status: ${response.status}`);
                    }
                    blob = await response.blob();
                } catch (error) {
                    console.error("Could not fetch the link content (possibly CORS issue).", error);
                    blob = new Blob(
                        [`Could not fetch the real content from:\n${url}`],
                        { type: "text/plain" }
                    );
                }

                const fileWithId = Object.assign(
                    new File([blob], fileName, { type: blob.type }),
                    { id: `${Date.now()}-${Math.random()}` }
                ) as FileWithId;

                filesWithId.push(fileWithId);
            } else {
                console.log("Dropped link that is not http/https:", url);
            }
        }
        props.onUploadFiles?.(filesWithId);
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

import React, { useEffect, useRef, useState } from "react";
import css from "./FileList.module.less";
import clsx from "clsx";
import { FileItem } from "../FileItem";
import { FileWithId } from "../../../widgets/home-screens/lib/hooks/useDragFile";

interface Props {
    className?: string;
    files: FileWithId[];
    onChange: (files: FileWithId[]) => void;
}

export const FileListForDisplay: React.FC<Props> = ({ files, onChange, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [fileURLs, setFileURLs] = useState<Record<string, string>>({});
    const [scrollPosition, setScrollPosition] = useState<"start" | "middle" | "end">("start");
    const scrollTimeout = useRef<number | null>(null);
    const dragged = useRef(false);
    const DRAG_THRESHOLD = 3;

    useEffect(() => {
        const urls: Record<string, string> = {};
        files.forEach(file => {
            urls[file.id] = URL.createObjectURL(file);
        });
        setFileURLs(urls);

        return () => {
            Object.values(urls).forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        dragged.current = false;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = "grabbing";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX.current;
        if (Math.abs(walk) > DRAG_THRESHOLD) {
            dragged.current = true;
        }
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUpOrLeave = () => {
        if (!containerRef.current) return;
        setIsDragging(false);
        containerRef.current.style.cursor = "grab";
    };

    const updateScrollPosition = () => {
        if (!containerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft === 0) {
            setScrollPosition("start");
        } else if (scrollLeft >= scrollWidth - clientWidth - 1) {
            setScrollPosition("end");
        } else {
            setScrollPosition("middle");
        }
    };

    const handleScroll = () => {
        updateScrollPosition();
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = window.setTimeout(() => {
            updateScrollPosition();
        }, 200);
    };

    const handleClickCapture = (e: React.MouseEvent) => {
        if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
            dragged.current = false;
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.cursor = "grab";
            updateScrollPosition();
        }
    }, []);

    return (
        <div
            className={clsx(
                css.files,
                "scrollbar",
                className,
                {
                    [css.scrollStart]: scrollPosition === "start",
                    [css.scrollMiddle]: scrollPosition === "middle",
                    [css.scrollEnd]: scrollPosition === "end",
                }
            )}
            ref={containerRef}
            onClickCapture={handleClickCapture}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
        >
            {files.map(file => (
                <FileItem
                    key={file.id}
                    name={file.name}
                    mimetype={file.type}
                    url={fileURLs[file.id]}
                    onDelete={() => onChange(files.filter(item => item.id !== file.id))}
                />
            ))}
        </div>
    );
};

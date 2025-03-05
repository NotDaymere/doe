import React from "react";
import css from "./FileList.module.less";
import clsx from "clsx";
import { FileItem } from "../FileItem";

interface Props {
    className?: string;
    files: File[];
    onChange: (files: File[]) => void;
}

export const FileList: React.FC<Props> = ({
    files,
    onChange,
    className
}) => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const startX = React.useRef(0);
    const scrollLeft = React.useRef(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);

        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
        containerRef.current.style.cursor = "grabbing";
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX.current;
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const onMouseUpOrLeave = () => {
        if (!containerRef.current) return;
        setIsDragging(false);
        containerRef.current.style.cursor = "grab";
    };


    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.cursor = "grab";
        }
    }, []);

    return (
        <div
            className={clsx(css.files, "scrollbar", className)}
             ref={containerRef}
             onMouseDown={onMouseDown}
             onMouseMove={onMouseMove}
             onMouseUp={onMouseUpOrLeave}
             onMouseLeave={onMouseUpOrLeave}
        >
            {files.map((file, id) => (
                <FileItem 
                    name={file.name}
                    mimetype={file.type}
                    onDelete={() => onChange(files.filter((item) => item !== file))}
                    key={file.name + id}
                />
            ))}
        </div>
    );
};
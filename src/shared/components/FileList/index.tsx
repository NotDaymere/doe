import React, { useEffect, useRef, useState } from "react";
import css from "./FileList.module.less";
import clsx from "clsx";
import { FileItem } from "../FileItem";
import FileUploadSuccessIcon from "../../icons/FileUploadSuccess.icon";
import UploadFilesProgressIcon from "../../icons/UploadFilesProgress.icon";
import ArrowDownIcon from "../../icons/ArrowDown.icon";
import { CSSTransition } from "react-transition-group";

interface Props {
    className?: string;
    files: File[];
    onChange: (files: File[]) => void;
    onLoadingStatusChange?: (notLoadedFile: string | undefined) => void;
}

type ScrollPosition = "start" | "middle" | "end";

export const FileList: React.FC<Props> = ({
                                              files,
                                              onChange,
                                              className,
                                              onLoadingStatusChange}) => {

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const startX = React.useRef(0);
    const scrollLeft = React.useRef(0);
    const [fileURLs, setFileURLs] = useState<Record<string, string>>({});
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("start");
    const scrollTimeout = React.useRef<number | null>(null);
    const mouseDownTime = useRef<number | null>(null);
    const longPress = useRef<boolean>(false);
    const dragged = useRef<boolean>(false);
    const DRAG_THRESHOLD = 3;
    const CLICK_THRESHOLD = 1000;

    const [loadedFiles, setLoadedFiles] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [showAllFiles, setShowAllFiles] = useState(false);

    useEffect(() => {
        const urls: Record<string, string> = {};
        files.forEach(file => {
            urls[file.name] = URL.createObjectURL(file);
        });
        setFileURLs(urls);

        return () => {
            Object.values(urls).forEach(url => URL.revokeObjectURL(url));
        };
    }, [files]);

    useEffect(() => {
        setLoadedFiles((prev) => prev.filter((name) => files.some((file) => file.name === name)));
    }, [files]);

    const activeFile = files.find((file) => !loadedFiles.includes(file.name))?.name;


    useEffect(() => {
        if (activeFile) {
            const timer = setTimeout(() => {
                setLoadedFiles(prev => [...prev, activeFile]);
            }, 3000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [activeFile]);

    useEffect(() => {
        if (onLoadingStatusChange) {
            onLoadingStatusChange(activeFile);
        }
    }, [activeFile, onLoadingStatusChange]);

    useEffect(() => {
        if (activeFile) {
            setUploadProgress(0);
            const totalDuration = 3000;
            const startTime = Date.now();
            const interval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
                setUploadProgress(progress);
            }, 100);
            return () => clearInterval(interval);
        }
        return undefined;
    }, [activeFile]);


    useEffect(() => {
        if (onLoadingStatusChange) {
            onLoadingStatusChange(activeFile ? `${activeFile}|||${uploadProgress}` : undefined);
        }
    }, [activeFile, uploadProgress, onLoadingStatusChange]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);

        dragged.current = false;

        mouseDownTime.current = Date.now();
        longPress.current = false;

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

        if (mouseDownTime.current) {
            const duration = Date.now() - mouseDownTime.current;
            longPress.current = duration >= CLICK_THRESHOLD;
        }
        mouseDownTime.current = null;
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

    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.cursor = "grab";
            updateScrollPosition();
        }
    }, []);

    const allFilesLoaded = files.length > 1 ? loadedFiles.length === files.length : true;

    return (
        <>
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
                {allFilesLoaded &&
                    files.map((file, id) =>
                            loadedFiles.includes(file.name) && (
                                <FileItem
                                    name={file.name}
                                    mimetype={file.type}
                                    url={fileURLs[file.name]}
                                    onDelete={() => onChange(files.filter((item) => item !== file))}
                                    key={file.name + id}
                                />
                            )
                    )}
            </div>

            {!allFilesLoaded && files.length > 0 && (
                <div className={css.partial_loaded_files}>
                    {files.length > 2 && (
                        <button
                            className={css.toggle_loaded_files}
                            onClick={() => setShowAllFiles((prev) => !prev)}
                        >
                            {showAllFiles ? (
                                <ArrowDownIcon className={css.partial_loaded_files_down_btn} />
                            ) : (
                                <ArrowDownIcon className={css.partial_loaded_files_up_btn} />
                            )}
                        </button>
                    )}

                    <div
                        className={clsx(css.all_files_container, { [css.expanded]: showAllFiles })}
                    >
                        {(showAllFiles ? files : files.slice(-2)).map((file) => (
                            <div key={file.name} className={css.partial_file_name_container}>
                                <UploadFilesProgressIcon />
                                <span className={css.partial_file_name}>{file.name}</span>
                                {loadedFiles.includes(file.name) && <FileUploadSuccessIcon />}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

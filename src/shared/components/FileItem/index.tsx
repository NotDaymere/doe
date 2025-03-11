import React, { useState, useMemo } from "react";
import clsx from "clsx";
import css from "./FileItem.module.less";
import CrossIcon from "src/shared/icons/Cross.icon";
import PdfFilePreviewModal
    from "../../../widgets/home-screens/ui/FilePreviewModal/PdfFilePreviewModal/PdfFilePreviewModal";
import ImageFilePreviewModal
    from "../../../widgets/home-screens/ui/FilePreviewModal/ImageFilePreviewModal/ImageFilePreviewModal";
import VideoFilePreviewModal
    from "../../../widgets/home-screens/ui/FilePreviewModal/VideoFilePreviewModal/VideoFilePreviewModal";


interface FileItemProps {
    name: string;
    mimetype: string;
    url?: string;
    className?: string;
    onDelete?: () => void;

}

export const FileItem: React.FC<FileItemProps> = ({ name,
                                                    mimetype,
                                                    url,
                                                    className,
                                                    onDelete,
                                                    }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const info = useMemo(() => {
        const segments = name.split(".");
        const ext = segments.pop() ?? "";
        const path = segments.join(".").split(/\/\\/gi);
        const filename = path.pop() || "";
        return {
            filename,
            mimetype,
            ext,
        };
    }, [name, mimetype]);

    const extLower = info.ext.toLowerCase();

    const iconURL = useMemo(() => {
        if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(extLower)) {
            return "/img/icons/file-image.svg";
        }
        if (["mp4", "webm", "ogg"].includes(extLower)) {
            return "/img/icons/file-media.svg";
        }
        return "/img/icons/file-file.svg";
    }, [extLower]);

    const handleClick = () => {
        if (
            ["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(extLower) ||
            ["mp4", "webm", "ogg"].includes(extLower) ||
            extLower === "pdf"
        ) {
            setIsModalOpen(true);
        }
    };

    const shortenFileName = info.filename.length > 10 ? `${info.filename.slice(0, 10)}...` : info.filename;

    return (
        <>
        <div className={clsx(css.file, className)} onClick={handleClick}>
            <div className={css.file_icon}>
                <img src={iconURL} alt="" />
            </div>
            <div className={css.file_content}>
                <p className={css.file_name}>
                        <span>
                            {info.filename.length > 15
                                ? `${info.filename.slice(0, 15)}...`
                                : info.filename}
                        </span>
                    .{info.ext}
                </p>
                <p className={css.file_ext}>{info.ext}</p>
            </div>
            {onDelete && (
                <button
                    className={css.file_deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <CrossIcon />
                </button>
            )}
        </div>

    {
        isModalOpen && extLower === "pdf" && url && (
            <PdfFilePreviewModal
                url={url}
                onClose={() => setIsModalOpen(false)}
                fileName={shortenFileName}
                fileExt={info.ext} />
        )}
    {
        isModalOpen && ["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(extLower) && url && (
                <ImageFilePreviewModal
                    url={url}
                    onClose={() => setIsModalOpen(false)}
                    fileName={shortenFileName}
                    fileExt={info.ext}/>
            )}
            {isModalOpen && ["mp4", "webm", "ogg"].includes(extLower) && url && (
                <VideoFilePreviewModal
                    url={url}
                    onClose={() => setIsModalOpen(false)}
                    fileName={shortenFileName}
                    fileExt={info.ext}/>
            )}
        </>
    );
};

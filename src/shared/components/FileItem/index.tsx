import React, { useState, useMemo } from "react";
import clsx from "clsx";
import css from "./FileItem.module.less";
import CrossIcon from "src/shared/icons/Cross.icon";
import PdfModal from "../../../widgets/home-screens/ui/FilePreviewModal/PdfModal";
import VideoModal from "../../../widgets/home-screens/ui/FilePreviewModal/VideoModal";
import ImageModal from "../../../widgets/home-screens/ui/FilePreviewModal/ImageModal";


interface FileItemProps {
    name: string;
    mimetype: string;
    url?: string;
    className?: string;
    onDelete?: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ name, mimetype, url, className, onDelete }) => {
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
        console.log("handleClick, extLower:", extLower, "url:", url);
        if (
            ["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(extLower) ||
            ["mp4", "webm", "ogg"].includes(extLower) ||
            extLower === "pdf"
        ) {
            setIsModalOpen(true);
        }
    };

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

            {isModalOpen && extLower === "pdf" && url && (
                <PdfModal url={url} onClose={() => setIsModalOpen(false)} />
            )}
            {isModalOpen && ["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(extLower) && url && (
                <ImageModal url={url} onClose={() => setIsModalOpen(false)} />
            )}
            {isModalOpen && ["mp4", "webm", "ogg"].includes(extLower) && url && (
                <VideoModal url={url} onClose={() => setIsModalOpen(false)} />
            )}
        </>
    );
};

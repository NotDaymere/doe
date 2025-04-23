import React, { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import css from "./FileItem.module.less";
import CrossIcon from "src/shared/icons/Cross.icon";
import PdfFilePreviewModal from "../../../widgets/home-screens/ui/FilePreviewModal/PdfFilePreviewModal/PdfFilePreviewModal";
import ImageFilePreviewModal from "../../../widgets/home-screens/ui/FilePreviewModal/ImageFilePreviewModal/ImageFilePreviewModal";
import VideoFilePreviewModal from "../../../widgets/home-screens/ui/FilePreviewModal/VideoFilePreviewModal/VideoFilePreviewModal";

interface FileItemProps {
    name: string;
    mimetype: string;
    url?: string;
    className?: string;
    onDelete?: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({
                                                      name,
                                                      mimetype,
                                                      url,
                                                      className,
                                                      onDelete,
                                                  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const [savedImage, setSavedImage] = useState<string | undefined>(undefined);
    const [savedPdf, setSavedPdf] = useState<string | undefined>(url);
    const [savedVideoUrl, setSavedVideoUrl] = useState<string | undefined>(url);

    const info = useMemo(() => {
        if (name.startsWith("http://") || name.startsWith("https://")) {
            try {
                const urlObj = new URL(name);
                let fileName = urlObj.pathname;
                if (fileName.startsWith("/")) fileName = fileName.slice(1);
                if (!fileName) fileName = urlObj.hostname;
                return { filename: fileName, mimetype, ext: urlObj.hostname, isUrl: true };
            } catch {
                return { filename: name, mimetype, ext: "", isUrl: false };
            }
        } else {
            const segments = name.split(".");
            const ext = segments.pop() ?? "";
            const path = segments.join(".").split(/[/\\]/gi);
            const filename = path.pop() || "";
            return { filename, mimetype, ext, isUrl: false };
        }
    }, [name, mimetype]);

    const [fileName, setFileName] = useState(info.filename);

    useEffect(() => {
        setFileName(fileName);
    }, [info.filename]);

    const extLower = info.ext.toLowerCase();
    const candidateIconURLs = useMemo((): string[] => {
        if (name.startsWith("http://") || name.startsWith("https://")) {
            return [
                `https://logo.clearbit.com/${info.ext}?size=128`,
                `https://www.google.com/s2/favicons?domain=${info.ext}&sz=64`,
                `https://icons.duckduckgo.com/ip3/${info.ext}.ico`,
                "/img/icons/file-file.svg",
            ];
        } else if (["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].includes(extLower)) {
            return ["/img/icons/file-image.svg"];
        } else if (["mp4", "webm", "ogg"].includes(extLower)) {
            return ["/img/icons/file-media.svg"];
        } else {
            return ["/img/icons/file-file.svg"];
        }
    }, [name, info.ext, extLower]);

    useEffect(() => {
        setCurrentIconIndex(0);
    }, [candidateIconURLs]);

    const handleClick = () => {
        if (name.startsWith("http://") || name.startsWith("https://")) {
            window.open(name, "_blank");
        } else if (
            ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].includes(extLower) ||
            ["mp4", "webm", "ogg"].includes(extLower) ||
            extLower === "pdf"
        ) {
            setIsModalOpen(true);
        }
    };

    const handleUpdateVideoUrl = (newUrl: string) => {
        setSavedVideoUrl(newUrl);
    };

    return (
        <>
            <div className={clsx(css.file, className)} onClick={handleClick}>
                <div className={css.file_icon}>
                    <img
                        src={candidateIconURLs[currentIconIndex]}
                        alt=""
                        onError={() =>
                            setCurrentIconIndex((prevIndex) => {
                                const nextIndex = prevIndex + 1;
                                return nextIndex < candidateIconURLs.length ? nextIndex : prevIndex;
                            })
                        }
                    />
                </div>
                <div className={css.file_content}>
                    <p className={css.file_name}>
                        <span>{fileName.length > 15 ? `${fileName.slice(0, 15)}...` : fileName}</span>
                        {!(name.startsWith("http://") || name.startsWith("https://")) && <>.{info.ext}</>}
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
                <PdfFilePreviewModal
                    url={savedPdf || url}
                    onClose={() => setIsModalOpen(false)}
                    fileName={fileName}
                    fileExt={info.ext}
                    onRename={setFileName}
                    onSaveDrawing={setSavedPdf}
                />
            )}
            {isModalOpen &&
                ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"].includes(extLower) &&
                url && (
                    <ImageFilePreviewModal
                        url={url}
                        onClose={() => setIsModalOpen(false)}
                        fileName={fileName}
                        fileExt={info.ext}
                        savedImage={savedImage}
                        onSaveDrawing={setSavedImage}
                    />
                )}
            {isModalOpen &&
                ["mp4", "webm", "ogg"].includes(extLower) &&
                url && (
                    <VideoFilePreviewModal
                        url={savedVideoUrl || url}
                        onClose={() => setIsModalOpen(false)}
                        fileName={fileName}
                        fileExt={info.ext}
                        onUpdateUrl={handleUpdateVideoUrl}
                    />
                )}
        </>
    );
};
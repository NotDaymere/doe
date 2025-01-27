import React from "react";
import css from "./FileItem.module.less";
import clsx from "clsx";
import CrossIcon from "src/shared/icons/Cross.icon";

interface Props {
    name: string;
    mimetype: string;
    url?: string;
    className?: string;
    onDelete?: () => void;
}

export const FileItem: React.FC<Props> = ({ name, mimetype, className, onDelete }) => {
    const info = React.useMemo(() => {
        const segments = name.split(".");
        const ext = segments.pop();
        const path = segments.join(".").split(/\/\\/gi);
        const filename = path.pop() || "";

        return {
            filename,
            mimetype,
            ext,
        };
    }, [name]);

    const iconURL = React.useMemo(() => {
        if (info.mimetype.startsWith("image")) {
            return "/img/icons/file-image.svg";
        }
        if (info.mimetype.startsWith("video")) {
            return "/img/icons/file-media.svg";
        }
        return "/img/icons/file-file.svg";
    }, [info]);

    return (
        <div className={clsx(css.file, className)}>
            <div className={css.file_icon}>
                <img src={iconURL} alt="" />
            </div>
            <div className={css.file_content}>
                <p className={css.file_name}>
                    <span>
                        {info.filename.length > 15
                            ? `${info.filename?.slice(0, 15)}...`
                            : info.filename}
                    </span>
                    .{info.ext}
                </p>
                <p className={css.file_ext}>{info.ext}</p>
            </div>
            {onDelete && (
                <button className={css.file_deleteBtn} onClick={onDelete}>
                    <CrossIcon />
                </button>
            )}
        </div>
    );
};

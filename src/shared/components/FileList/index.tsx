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
    return (
        <div className={clsx(css.files, "scrollbar", className)}>
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
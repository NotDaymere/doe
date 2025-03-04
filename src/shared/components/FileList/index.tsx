import React, { useEffect, useState } from "react";
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
    const [fileURLs, setFileURLs] = useState<Record<string, string>>({});

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

    return (
        <div className={clsx(css.files, "scrollbar", className)}>
            {files.map((file, id) => (
                <FileItem
                    name={file.name}
                    mimetype={file.type}
                    url={fileURLs[file.name]}
                    onDelete={() => onChange(files.filter((item) => item !== file))}
                    key={file.name + id}
                />
            ))}
        </div>
    );
};

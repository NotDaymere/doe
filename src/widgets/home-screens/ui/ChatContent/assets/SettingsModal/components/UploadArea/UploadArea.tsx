import clsx from "clsx";
import FileIcon from "src/shared/icons/File.icon";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import HandCursorIcon from "src/shared/icons/HandCursor.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import styles from "./UploadArea.module.less";
import { FileWithId, UploadButton } from "../UploadButton/UploadButton";
import { useState } from "react";
import { UploadProgress } from "../UploadProgress/UploadProgress";

type UploadAreaProps = {
    onCompleteUpload: (uploadedFile: FileWithId[]) => void;
};

export const UploadArea = ({ onCompleteUpload }: UploadAreaProps) => {
    const [files, setFiles] = useState<FileWithId[] | null>(null);
    const {
        drag,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        handleDragStart,
    } = useDragFile({
        onUploadFiles(uploadFiles) {
            onCompleteUpload(
                uploadFiles.filter((file) => {
                    const fileExtension = file.name.split(".").pop()?.toLowerCase();
                    return (
                        fileExtension === "pdf" ||
                        fileExtension === "doc" ||
                        fileExtension === "txt" ||
                        fileExtension === "docx"
                    );
                })
            );
        },
    });
    return (
        <>
            <UploadButton
                className={clsx(styles.uploadArea)}
                onDragStart={handleDragStart}
                onDragOver={handleDragOverTarget}
                onDrop={handleDragDropTarget}
                onDragLeave={handleDragLeaveTarget}
                fileType=".pdf,.doc,.txt, .docx"
                multiple
                onMultipleFilesChange={(files) => {
                    onCompleteUpload(files);
                }}
            >
                <div className={styles.uploadArea__icon}>
                    <FileFilledIcon />
                </div>
                <div
                    className={clsx(
                        styles.uploadArea__drag,
                        drag && styles["uploadArea__drag--dragging"]
                    )}
                >
                    <div className={clsx(styles.uploadArea__dragIcon)}>
                        <FileIcon />
                        <HandCursorIcon className={styles.uploadArea__handIcon} />
                    </div>
                    <div className={clsx(styles.uploadArea__dragGlow)} />
                </div>

                <p className={styles.uploadArea__description}>
                    <span className={styles.uploadArea__description__strong}>Click to upload</span>{" "}
                    or drag and drop PDF,
                    <br /> DOC or TXT (1GB max file size)
                </p>
            </UploadButton>
        </>
    );
};

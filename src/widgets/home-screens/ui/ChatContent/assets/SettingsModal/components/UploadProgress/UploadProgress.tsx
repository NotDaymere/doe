import { useEffect, useState } from "react";
import { FileWithId } from "../UploadButton/UploadButton";
import styles from "./UploadProgress.module.less";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import { CrossIcon } from "src/shared/icons/CrossIcon";
import clsx from "clsx";
import FileUploadSuccessIcon from "src/shared/icons/FileUploadSuccess.icon";
import { calculateSize } from "../../utils/calculateFileSize";

type UploadProgressProps = {
    file: FileWithId | null;
    onClear: () => void;
    onCompleteUpload: (uploadedFile: FileWithId) => void;
    disappearAfterUpload?: boolean;
    showAsUploaded?: boolean;
};

export const UploadProgress = ({
    file,
    onClear,
    onCompleteUpload,
    disappearAfterUpload = true,
    showAsUploaded = false,
}: UploadProgressProps) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "success">(
        showAsUploaded ? "success" : "idle"
    );
    const complete = status === "success";
    useEffect(() => {
        if (!file) {
            setProgress(0);
            setStatus("idle");
            return;
        }
        if (!showAsUploaded) {
            setStatus("uploading");
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus("success");
                        onCompleteUpload(file);
                        return 100;
                    }
                    return Math.min(Math.round(prev + Math.random() * 10 + 5), 100);
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [file, showAsUploaded]);

    useEffect(() => {
        if (status === "success" && disappearAfterUpload) {
            const timeout = setTimeout(() => {
                onClear();
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [status, onClear, disappearAfterUpload]);

    if (!file) return null;

    return (
        <div
            className={clsx(
                styles.uploadProgress__container,
                complete && styles["uploadProgress__container--complete"]
            )}
        >
            <div className={styles.uploadProgress__file__iconWrapper}>
                <FileFilledIcon />
            </div>
            <div className={styles.uploadProgress__info}>
                <div className={styles.uploadProgress__file__info}>
                    <p className={styles.uploadProgress__file__name}>{file.name} </p>
                    {complete && <FileUploadSuccessIcon />}
                </div>
                <div className={styles.uploadProgress__progress}>
                    <p className={styles.uploadProgress__file__size}>
                        {calculateSize(file.size)}mb
                    </p>
                    {status === "uploading" && (
                        <p className={styles.uploadProgress__percentage}>{progress}%</p>
                    )}
                </div>
                <div
                    className={clsx(
                        styles.uploadProgress__progressBar,
                        status === "uploading" && styles["uploadProgress__progressBar--uploading"]
                    )}
                >
                    <div
                        style={{ width: `${progress}%` }}
                        className={styles.uploadProgress__progressFill}
                    />
                </div>
            </div>
            <button className={styles.uploadProgress__delete} onClick={onClear}>
                <CrossIcon />
            </button>
        </div>
    );
};

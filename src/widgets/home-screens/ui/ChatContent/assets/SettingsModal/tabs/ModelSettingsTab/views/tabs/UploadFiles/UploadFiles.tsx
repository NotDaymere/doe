import { ReactNode, useState } from "react";
import { UploadArea } from "../../../../../components/UploadArea/UploadArea";
import { UploadProgress } from "../../../../../components/UploadProgress/UploadProgress";
import styles from "./UploadFiles.module.less";
import { FileWithId } from "../../../../../components/UploadButton/UploadButton";

type UploadFilesProps = {
    setFile: (file: FileWithId) => void;
    files?: FileWithId[];
    children?: ReactNode;
};

export const UploadFiles = ({ setFile, files, children }: UploadFilesProps) => {
    console.log(" UploadFiles ~ files:", files);
    const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([]);

    return (
        <div className={styles.uploadTab__container}>
            <UploadArea
                onCompleteUpload={(files) => setUploadedFiles((prev) => [...files, ...prev])}
            />
            {uploadedFiles.length === 0 && files?.length === 0 && (
                <p className={styles.uploadTab__description}>
                    To create a compelling persona, consider several steps, like defining purpose
                    and target audience, choose name, voice and tone etc.
                </p>
            )}
            {(!!uploadedFiles.length || !!children) && (
                <div className={styles.uploadTab__list__wrapper}>
                    <div className={styles.uploadTab__list__container}>
                        {uploadedFiles.map((file) => (
                            <UploadProgress
                                key={file.id}
                                onClear={() => {
                                    setUploadedFiles((prev) =>
                                        prev.filter((item) => item.id !== file.id)
                                    );
                                }}
                                onCompleteUpload={(file) => {
                                    setFile(file);
                                    setUploadedFiles((prev) =>
                                        prev.filter((item) => item.id !== file.id)
                                    );
                                }}
                                file={file}
                                disappearAfterUpload={false}
                            />
                        ))}
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

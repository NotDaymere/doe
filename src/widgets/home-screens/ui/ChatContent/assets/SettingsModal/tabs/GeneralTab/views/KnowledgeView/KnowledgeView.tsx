import styles from "./KnowledgeView.module.less";
import modalStyles from "../../../../SettingsModal.module.less";
import { Folder } from "../../../../components/Folder/Folder";
import { CreateFolder } from "../../../../components/CreateFolder/CreateFolder";
import { File as FileComponent } from "../../../../components/File/File";
import { useState } from "react";
import classNames from "classnames";
import { UploadArea } from "../../../../components/UploadArea/UploadArea";
import { FileWithId } from "../../../../components/UploadButton/UploadButton";
import { FolderView } from "../FolderView/FolderView";
import { UploadProgress } from "../../../../components/UploadProgress/UploadProgress";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";

type FileType = FileWithId & { folderId: string | null };
export type FolderType = {
    id: string;
    name: string;
    color: string;
    size: number;
    files: Array<FileType>;
};
type DataType = {
    folders: FolderType[];
    recentFiles: Array<FileType>;
};
export const KnowledgeView = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState<DataType>({
        folders: [],
        recentFiles: [],
    });
    const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([]);
    const createNewFolder = (color: string) => {
        let folderNumber = 1;
        while (data.folders.some((folder) => folder.name === `Folder ${folderNumber}`)) {
            folderNumber++;
        }
        const newFolder = {
            id: crypto.randomUUID(),
            name: `Folder ${folderNumber}`,
            color: color,
            size: 0,
            files: [],
        };
        setData((prev) => ({
            ...prev,
            folders: [...prev.folders, newFolder],
        }));
    };
    const deleteFolder = (id: string) => {
        setData((prev) => ({
            ...prev,
            folders: prev.folders.filter((folder) => folder.id !== id),
        }));
    };
    const renameFolder = (id: string, newName: string) => {
        setData((prev) => ({
            ...prev,
            folders: prev.folders.map((folder) => {
                if (folder.id === id) {
                    return {
                        ...folder,
                        name: newName,
                    };
                }
                return folder;
            }),
        }));
    };
    const renameFile = (fileId: string, newName: string = "123") => {
        const changeName = (file: FileType) => {
            const fileExtension = file.name.split(".").pop();
            const newFile = new File([file], `${newName}.${fileExtension}`, {
                type: file.type,
                lastModified: file.lastModified,
            });
            return Object.assign(newFile, { id: file.id, folderId: file.folderId });
        };
        setData((prev) => ({
            ...prev,
            recentFiles: prev.recentFiles.map((file) =>
                file.id === fileId ? changeName(file) : file
            ),
            folders: prev.folders.map((folder) => ({
                ...folder,
                files: folder.files.map((file) => (file.id === fileId ? changeName(file) : file)),
            })),
        }));
    };
    const deleteFile = (id: string) => {
        setData((prev) => ({
            ...prev,
            recentFiles: prev.recentFiles.filter((file) => file.id !== id),
            folders: prev.folders.map((folder) => ({
                ...folder,
                size: folder.files
                    .filter((file) => file.id !== id)
                    .reduce((acc, file) => acc + file.size, 0),
                files: folder.files.filter((file) => file.id !== id),
            })),
        }));
    };
    const moveToFolder = (folderId: string) => {
        searchParams.set("view", "folder");
        searchParams.set("folderId", folderId);
        setSearchParams(searchParams);
    };
    const moveFileToFolder = (fileId: string, folderId: string) => {
        setData((prev) => ({
            ...prev,
            folders: prev.folders.map((folder) => {
                if (folder.id === folderId) {
                    const file = prev.recentFiles.find((file) => file.id === fileId);
                    if (folder.files.some((file) => file.id === fileId)) {
                        return folder;
                    }
                    return {
                        ...folder,
                        size: folder.size + file!.size,
                        files: [...folder.files, file!],
                    };
                }
                const files = folder.files.filter((file) => file.id !== fileId);
                return { ...folder, size: files.reduce((acc, file) => acc + file.size, 0), files };
            }),
            recentFiles: prev.recentFiles.map((file) =>
                file.id === fileId ? Object.assign(file, { folderId }) : file
            ),
        }));
    };
    const currentFolder = data.folders.find((folder) => folder.id === searchParams.get("folderId"));
    if (!currentFolder && (searchParams.has("folderId") || searchParams.get("view") === "folder")) {
        searchParams.delete("folderId");
        searchParams.set("view", "knowledge");
        setSearchParams(searchParams);
    }
    if (currentFolder)
        return (
            <FolderView
                folder={currentFolder}
                onDelete={deleteFile}
                onRename={renameFile}
                folders={data.folders}
                onMoveToFolder={moveFileToFolder}
            />
        );
    return (
        <div className={styles.knowledge}>
            <div className={styles.knowledge__header__container}>
                <h2 className={styles.knowledge__header__title}>Knowledge</h2>
                <ModalButton variant="outline primary" onClick={() => navigate(-1)}>
                    Back to general settings
                </ModalButton>
            </div>
            <div className={styles.knowledge__content__container}>
                <UploadArea
                    onCompleteUpload={(files) => {
                        setUploadedFiles(files);
                    }}
                />
                {!!uploadedFiles.length &&
                    uploadedFiles.map((file) => (
                        <UploadProgress
                            key={file.id}
                            file={file}
                            onClear={() => {
                                setUploadedFiles((prev) =>
                                    prev.filter((item) => item.id !== file.id)
                                );
                            }}
                            onCompleteUpload={(file) => {
                                setData((prev) => ({
                                    ...prev,
                                    recentFiles: [
                                        Object.assign(file, { folderId: null }),
                                        ...prev.recentFiles,
                                    ],
                                }));
                            }}
                        />
                    ))}
                <div
                    className={classNames(
                        styles.knowledge__section,
                        styles.knowledge__section__folders
                    )}
                >
                    <h3 className={styles.knowledge__section__title}>Folders</h3>
                    <div className={styles.knowledge__folder__section}>
                        {data.folders.map((folder) => (
                            <Folder
                                key={folder.id}
                                name={folder.name}
                                size={folder.size}
                                color={folder.color}
                                onDelete={() => deleteFolder(folder.id)}
                                onRename={(newName) => renameFolder(folder.id, newName)}
                                onClick={() => moveToFolder(folder.id)}
                            />
                        ))}
                        <CreateFolder onCreate={createNewFolder} />
                    </div>
                </div>
                <div className={styles.knowledge__section}>
                    <h3 className={styles.knowledge__section__title}>Recent Files</h3>
                    <div className={styles.knowledge__files__section}>
                        {data.recentFiles.map((file) => (
                            <FileComponent
                                key={file.id}
                                file={file}
                                onDelete={() => deleteFile(file.id)}
                                onRename={(newName) => renameFile(file.id, newName)}
                                folders={data.folders}
                                onMoveToFolder={(folderId) => moveFileToFolder(file.id, folderId)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

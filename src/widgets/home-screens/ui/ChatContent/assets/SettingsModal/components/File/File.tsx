import { calculateSize } from "../../utils/calculateFileSize";
import { FileWithId } from "../UploadButton/UploadButton";
import styles from "./File.module.less";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import { MenuDotsIcon } from "src/shared/icons/MenuDotsIcon";
import { FolderType } from "../../tabs/GeneralTab/views/KnowledgeView/KnowledgeView";
import { PopupMenu } from "../PopupMenu/PopupMenu";
import { useState } from "react";

export type FileProps = {
    file: FileWithId;
    folders: FolderType[];
    onDelete: () => void;
    onMoveToFolder: (folderId: string) => void;
    onRename: (newName: string) => void;
};

export const File = ({ file, onDelete, folders, onMoveToFolder, onRename }: FileProps) => {
    const [isRename, setIsRename] = useState(false);
    const parseName = file.name.split(".");
    const fileName = parseName.slice(0, parseName.length - 1).join(".");
    const fileExtension = parseName[parseName.length - 1];

    return (
        <div className={styles.file}>
            <PopupMenu
                folders={folders}
                className={styles.file__menuBtn}
                onDelete={() => onDelete()}
                onMoveToFolder={(folderId) => {
                    onMoveToFolder(folderId);
                }}
                onRename={() => setIsRename(true)}
            >
                <MenuDotsIcon />
            </PopupMenu>

            <div className={styles.file__iconContainer}>
                <FileFilledIcon />
            </div>
            <div className={styles.file__nameContainer}>
                {!isRename && (
                    <>
                        <span className={styles.file__name}>{fileName}</span>.
                        <span>{fileExtension}</span>
                    </>
                )}
                {isRename && (
                    <input
                        style={{
                            border: "1px solid var(--var-151)",
                            padding: "0 4px",
                            borderRadius: 4,
                        }}
                        type="text"
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && setIsRename(false)}
                        value={fileName}
                        onChange={(e) => onRename(e.target.value)}
                        onBlur={() => setIsRename(false)}
                    />
                )}
            </div>
            <p className={styles.file__size}>{calculateSize(file.size)}mb</p>
        </div>
    );
};

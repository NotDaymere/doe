import { FolderIcon } from "src/shared/icons/FolderIcon";
import styles from "./Folder.module.less";
import { useEffect, useRef, useState } from "react";
import TrashIcon from "src/shared/icons/Trash.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import { calculateSize } from "../../utils/calculateFileSize";
import { applyAlphaToHsl, increaseSaturation } from "../../utils/colors";
type FolderProps = {
    name: string;
    size: number;
    color: string;
    onClick: () => void;
    onDelete: () => void;
    onRename: (newName: string) => void;
};

export const Folder = ({ name, size, color, onClick, onDelete, onRename }: FolderProps) => {
    const [edit, setEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (containerRef.current && !containerRef.current.contains(target)) {
                setEdit(false);
            }
            if (inputRef.current && inputRef.current.value !== name) {
                onRename(inputRef.current.value || name);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setEdit((prev) => !prev);
        !edit && inputRef.current?.focus();
    };
    const handleFolderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        !edit && onClick(); // Prevents triggering onClick when editing
        edit && inputRef.current?.focus(); // Keep focus on input when clicking the folder
    };
    return (
        <div
            ref={containerRef}
            style={{
                backgroundColor: applyAlphaToHsl(color, 0.3),
                borderColor: applyAlphaToHsl(color, 0.5),
            }}
            className={styles.folder}
            onClick={handleFolderClick}
        >
            <FolderIcon fill={color} />
            <div className={styles.folder__controls}>
                <button className={styles.folder__edit} onClick={handleEdit}>
                    <PenIcon />
                </button>
                <button className={styles.folder__delete} onClick={onDelete}>
                    <TrashIcon />
                </button>
            </div>
            <div className={styles.folder__info}>
                <input
                    ref={inputRef}
                    readOnly={!edit}
                    defaultValue={name}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onRename(e.currentTarget.value || name);
                            setEdit(false);
                        }
                    }}
                    style={{ color: increaseSaturation(color, 25) }}
                    className={styles.folder__name}
                />
                <p
                    style={{ color: applyAlphaToHsl(increaseSaturation(color, 15), 0.7) }}
                    className={styles.folder__size}
                >
                    {calculateSize(size)}mb
                </p>
            </div>
        </div>
    );
};

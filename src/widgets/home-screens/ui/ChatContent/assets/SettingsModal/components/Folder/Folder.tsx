import { FolderIcon } from "src/shared/icons/FolderIcon"
import styles from "./Folder.module.less"
import { useEffect, useRef, useState } from "react"
import TrashIcon from "src/shared/icons/Trash.icon"
import PenIcon from "src/shared/icons/Pen.icon"
import { calculateSize } from "../../utils/calculateFileSize"
import { applyAlphaToHsl, increaseSaturation } from "../../utils/colors"
type FolderProps = {
	name: string
	size: number
	color: string
	onClick: () => void
	onDelete: () => void
	onRename: (newName: string) => void
}

export const Folder = ({ name, size, color, onClick, onDelete, onRename }: FolderProps) => {
	const [edit, setEdit] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (inputRef.current && !inputRef.current.contains(target)) {
				setEdit(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
	return <div style={{ backgroundColor: applyAlphaToHsl(color, 0.3), borderColor: applyAlphaToHsl(color, 0.5) }} className={styles.folder} onClick={() => onClick()}>
		<FolderIcon fill={color} />
		<div className={styles.folder__controls}>
			<button className={styles.folder__edit} onClick={(e) => {
				e.stopPropagation();
				setEdit(true);
				inputRef.current?.focus();
			}}><PenIcon /></button>
			<button className={styles.folder__delete} onClick={onDelete}><TrashIcon /></button>
		</div>
		<div className={styles.folder__info}>
			<input ref={inputRef} readOnly={!edit} defaultValue={name} onBlur={e => onRename(e.currentTarget.value || name)} style={{ color: increaseSaturation(color, 20) }} className={styles.folder__name} />
			<p style={{ color: applyAlphaToHsl(increaseSaturation(color, 10), 0.65) }} className={styles.folder__size}>{calculateSize(size)}mb</p>
		</div>
	</div>
}
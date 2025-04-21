import { FolderIcon } from "src/shared/icons/FolderIcon"
import styles from "./Folder.module.less"
import { useRef, useState } from "react"
import TrashIcon from "src/shared/icons/Trash.icon"
import PenIcon from "src/shared/icons/Pen.icon"
type FolderProps = {
	name: string
	size: string
	color: string
	onClick?: () => void
	onDelete: () => void
	onRename: (newName: string) => void
}
export const Folder = ({ name, size, color, onClick, onDelete, onRename }: FolderProps) => {
	const [edit, setEdit] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	return <div className={styles.folder}>
		<FolderIcon />
		<div className={styles.folder__controls}>
			<button className={styles.folder__edit} onClick={() => {
				setEdit(true);
				inputRef.current?.focus();
			}}><PenIcon /></button>
			<button className={styles.folder__delete} onClick={onDelete}><TrashIcon /></button>
		</div>
		<div className={styles.folder__info}>
			<input ref={inputRef} readOnly={!edit} defaultValue={name} onBlur={e => onRename(e.currentTarget.value || name)} className={styles.folder__name} />
			<p className={styles.folder__size}>{size ?? '0mb'}</p>
		</div>
	</div>
}
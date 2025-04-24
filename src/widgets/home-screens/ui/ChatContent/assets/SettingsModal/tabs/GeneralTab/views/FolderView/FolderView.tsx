import { FolderType } from "../KnowledgeView/KnowledgeView"
import styles from './FolderView.module.less'
import modalStyles from '../../../../SettingsModal.module.less'
import { FolderIcon } from "src/shared/icons/FolderIcon"
import { File, FileProps } from "../../../../components/File/File"


type FolderViewProps = {
	back: () => void
	folder: FolderType
	onDelete: (fileId: string) => void
	onMoveToFolder: (fileId: string, folderId: string) => void
	folders: FolderType[]
}

export const FolderView = ({ folder, back, folders, onDelete, onMoveToFolder }: FolderViewProps) => {
	return <div className={styles.folderView}>
		<div className={styles.folderView__header__container}>
			<FolderIcon />
			<h2 className={styles.folderView__header__title}>{folder.name}</h2>
			<button className={modalStyles.settingsModal__cancelBtn} onClick={back}>Back</button>
		</div >
		<div className={styles.folderView__content__container}>
			<div className={styles.folderView__content}>
				{folder.files.map(file => {
					return <File key={file.id} folders={folders} file={file} onDelete={() => onDelete(file.id)} onMoveToFolder={(folderId) => onMoveToFolder(file.id, folderId)} />
				})}
			</div>
		</div>
	</div>
}
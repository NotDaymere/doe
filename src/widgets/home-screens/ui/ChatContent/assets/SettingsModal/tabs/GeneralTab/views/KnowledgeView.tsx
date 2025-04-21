import styles from "./KnowledgeView.module.less"
import modalStyles from '../../../SettingsModal.module.less'
import { Folder } from "../../../components/Folder/Folder"
import { CreateFolder } from "../../../components/CreateFolder/CreateFolder"
import { File } from "../../../components/File/File"
import { useState } from "react"
import classNames from "classnames"
import { useDragFile } from "src/widgets/home-screens/lib"
import FileFilledIcon from "src/shared/icons/FileFilled.icon"
import clsx from "clsx"
import FileIcon from "src/shared/icons/File.icon"
import HandCursorIcon from "src/shared/icons/HandCursor.icon"
type KnowledgeViewProps = {
	back: () => void
}
type FileType = {
	name: string
	type: string
	size: string
}
type DataType = {
	folders: Array<{
		id: number
		name: string
		color: string
		size: string
		files: Array<FileType>
	}>
}
export const KnowledgeView = ({ back }: KnowledgeViewProps) => {
	const [data, setData] = useState<DataType>({
		folders: [
			{ id: 1, name: 'Folder 1', color: 'red', size: '460mb', files: [] },
			{ id: 2, name: 'Folder 2', color: 'blue', size: '460mb', files: [] },
		]
	});
	const createNewFolder = () => {
		let folderNumber = 1;
		while (data.folders.some(folder => folder.name === `Folder ${folderNumber}`)) {
			folderNumber++;
		}
		const newFolder = {
			id: Math.random() * 10000,
			name: `Folder ${folderNumber}`,
			color: 'red',
			size: '0mb',
			files: []
		};
		setData(prev => ({
			...prev,
			folders: [...prev.folders, newFolder]
		}));
	}
	const deleteFolder = (id: number) => {
		setData(prev => ({
			...prev,
			folders: prev.folders.filter(folder => folder.id !== id)
		}));
	}
	const renameFolder = (id: number, newName: string) => {
		setData(prev => ({
			...prev,
			folders: prev.folders.map(folder => {
				if (folder.id === id) {
					return {
						...folder,
						name: newName
					}
				}
				return folder;
			})
		}));
	}
	const {
		drag,
		dragTarget,
		handleDragDropTarget,
		handleDragLeaveTarget,
		handleDragOverTarget,
		handleDragStart,
		handleDragOver,
		handleDragCancel,
	} = useDragFile({
		onUploadFiles(uploadFiles) {
			console.log(uploadFiles);
		},
	});
	console.log(' KnowledgeView ~ dragTarget:', dragTarget)
	console.log(' KnowledgeView ~ drag:', drag)
	return (
		<div className={styles.knowledge}>
			<div className={styles['knowledge__header-container']}>
				<h2 className={styles['knowledge__header-title']}>Knowledge</h2>
				<button className={modalStyles['settingsModal__cancel-btn']} onClick={back}>Back to general settings</button>
			</div >
			<div className={styles['knowledge__content-container']}>
				<div className={clsx(styles['knowledge__upload-area'], dragTarget && styles['knowledge__upload-area--dragging'])}
					onDragStart={handleDragStart}
					onDragOver={handleDragOverTarget}
					onDrop={handleDragDropTarget}
					onDragLeave={handleDragLeaveTarget}
				>
					<div className={styles['knowledge__upload-area-icon']}><FileFilledIcon /></div>
					<div className={clsx(styles['knowledge__upload-area-drag'], dragTarget && styles['knowledge__upload-area-drag--dragging'])}>
						<div className={clsx(styles['knowledge__upload-area-drag-icon'])} ><FileIcon /><HandCursorIcon className={styles['knowledge__upload-area-hand-icon']} /></div>
						<div className={clsx(styles['knowledge__upload-area-drag-glow'])} />
					</div>

					<p className={styles['knowledge__upload-area-description']}>
						<span className={styles['knowledge__upload-area-description-strong']}>Click to upload</span> or drag and drop PDF,<br /> DOC or TXT (1GB max file size)</p>
				</div>
				<div className={classNames(styles.knowledge__section, styles['knowledge__section-folders'])}>
					<h3 className={styles['knowledge__section-title']}>Folders</h3>
					<div className={styles['knowledge__folder-section']}>
						{data.folders.map(folder => (
							<Folder
								key={folder.id}
								name={folder.name}
								size={folder.size}
								color={folder.color}
								onDelete={() => deleteFolder(folder.id)}
								onRename={newName => renameFolder(folder.id, newName)}
							/>))}
						<CreateFolder onCreate={createNewFolder} />

					</div>
				</div>
				<div className={styles.knowledge__section}>
					<h3 className={styles['knowledge__section-title']}>Recent Files</h3>
					<div className={styles['knowledge__files-section']}>
						<File />
						<File />
						<File />
						<File />
						<File />
						<File />
						<File />
						<File />
						<File />
					</div>
				</div>
			</div>
		</div>
	)
}
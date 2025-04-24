import { CSSTransition } from 'react-transition-group'
import { calculateSize } from '../../utils/calculateFileSize'
import { FileWithId } from '../UploadButton'
import styles from './File.module.less'
import FileFilledIcon from 'src/shared/icons/FileFilled.icon'
import { useEffect, useRef, useState } from 'react'
import { MenuDotsIcon } from 'src/shared/icons/MenuDotsIcon'
import { FileMenu } from './FileMenu'
import { createPortal } from 'react-dom'
import { FolderType } from '../../tabs/GeneralTab/views/KnowledgeView/KnowledgeView'
const ANIMATION_DURATION = 300
type MenuState = {
	active: boolean;
	position: { top: number; left: number } | null;
	anchorRect: DOMRect | null;
}

export type FileProps = {
	file: FileWithId
	folders: FolderType[]
	onDelete: () => void
	onMoveToFolder: (folderId: string) => void
}

export const File = ({ file, onDelete, folders, onMoveToFolder }: FileProps) => {
	const parseName = file.name.split('.')
	const fileName = parseName.slice(0, parseName.length - 1).join('.')
	const fileExtension = parseName[parseName.length - 1]

	return <div className={styles.file}>

		<FileMenu
			folders={folders}
			className={styles['file__menu-btn']}
			onDelete={() => onDelete()}
			onMoveToFolder={(folderId) => {
				onMoveToFolder(folderId)
			}}
		>
			<MenuDotsIcon />
		</FileMenu>

		<div className={styles['file__icon-container']}><FileFilledIcon /></div>
		<div className={styles['file__name-container']}><p className={styles.file__name}>{fileName}</p>.<p>{fileExtension}</p></div>
		<p className={styles.file__size}>{calculateSize(file.size)}mb</p>
	</div>
}
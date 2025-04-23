import { forwardRef } from 'react';
import styles from './File.module.less';
import { MoveToFolderIcon } from 'src/shared/icons/MoveToFolderIcon';
import { PenIcon } from 'src/shared/icons/PenIcon';
import TrashIcon from 'src/shared/icons/Trash.icon';
import { FolderType } from '../../tabs/GeneralTab/views/KnowledgeView/KnowledgeView';

type FileMenuProps = {
	style: React.CSSProperties;
	folders: FolderType[]
	onDelete: () => void
	onMoveToFolder: (folderId: string) => void

}
export const FileMenu = forwardRef<HTMLDivElement, FileMenuProps>(({ style, folders, onDelete, onMoveToFolder }, ref) => {
	return <div ref={ref} style={style} className={styles.menu}>
		<button className={styles.menu__item}>
			<PenIcon />
			Rename</button>
		<button className={styles.menu__item}>
			<MoveToFolderIcon />
			<p>Move</p>
			{!!folders.length && <button className={styles.menu__submenu}>
				{folders.map((folder) => (
					<button key={folder.id} className={styles['menu__submenu-item']} onClick={() => onMoveToFolder(folder.id)}><span>{folder.name}</span></button>
				))}
			</button>
			}
		</button>
		<button className={styles.menu__item} onClick={() => onDelete()}><TrashIcon />Delete</button>
	</div>
})
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
	const [menuState, setMenuState] = useState<MenuState>({ active: false, position: null, anchorRect: null });

	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const parseName = file.name.split('.')
	const fileName = parseName.slice(0, parseName.length - 1).join('.')
	const fileExtension = parseName[parseName.length - 1]

	const handleOpenMenu = (e: React.MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		setMenuState({
			active: true,
			position: {
				top: rect.top + 2 + window.scrollY,
				left: rect.right - 1 + window.scrollX,
			},
			anchorRect: rect,
		});
	};
	const handleCloseMenu = () => {
		setMenuState({ ...menuState, active: false });
		setTimeout(() => {
			setMenuState({ active: false, position: null, anchorRect: null });
		}, ANIMATION_DURATION);
	};
	useEffect(() => {

		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as Node;
			if (menuRef.current && !menuRef.current.contains(target) &&
				buttonRef.current &&
				!buttonRef.current.contains(target) && menuState.active) {
				handleCloseMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuState.active]);

	useEffect(() => {

		const handleScroll = () => {
			if (!menuState.anchorRect) return;
			const element = document.elementFromPoint(menuState.anchorRect.left + 5, menuState.anchorRect.top + 5);
			const currentRect = element?.getBoundingClientRect();

			if (!currentRect) {
				handleCloseMenu();
				return;
			}

			if (
				Math.abs(currentRect.top - menuState.anchorRect!.top) > 1 ||
				Math.abs(currentRect.left - menuState.anchorRect!.left) > 1
			) {
				handleCloseMenu();
			}
		};

		window.addEventListener('scroll', handleScroll, true);
		return () => {
			window.removeEventListener('scroll', handleScroll, true);
		};
	}, [menuState.anchorRect]);

	return <div className={styles.file}>
		<button ref={buttonRef} className={styles['file__menu-btn']} onClick={handleOpenMenu}><MenuDotsIcon /></button>

		{createPortal(
			<CSSTransition
				classNames={styles}
				timeout={ANIMATION_DURATION}
				in={menuState.active}
				nodeRef={menuRef}
				mountOnEnter
				unmountOnExit
			>
				<FileMenu
					style={{
						top: menuState.position?.top,
						left: menuState.position?.left,
						zIndex: 1000,
					}}
					ref={menuRef}
					folders={folders}
					onDelete={() => onDelete()}
					onMoveToFolder={(folderId) => {
						onMoveToFolder(folderId)
						handleCloseMenu()
					}}
				/>
			</CSSTransition>,
			document.body)}

		<div className={styles['file__icon-container']}><FileFilledIcon /></div>
		<div className={styles['file__name-container']}><p className={styles.file__name}>{fileName}</p>.<p>{fileExtension}</p></div>
		<p className={styles.file__size}>{calculateSize(file.size)}mb</p>
	</div>
}
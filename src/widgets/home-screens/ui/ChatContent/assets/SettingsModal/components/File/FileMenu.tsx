import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './File.module.less';
import { MoveToFolderIcon } from 'src/shared/icons/MoveToFolderIcon';
import { PenIcon } from 'src/shared/icons/PenIcon';
import TrashIcon from 'src/shared/icons/Trash.icon';
import { FolderType } from '../../tabs/GeneralTab/views/KnowledgeView/KnowledgeView';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

type FileMenuProps = {
	children: React.ReactNode;
	className?: string;
	folders: FolderType[]
	onDelete: () => void
	onMoveToFolder: (folderId: string) => void
}

type MenuState = {
	active: boolean;
	position: { top: number; left: number } | null;
	anchorRect: DOMRect | null;
}

const ANIMATION_DURATION = 300

export const FileMenu = ({ children, className, folders, onDelete, onMoveToFolder }: FileMenuProps) => {
	const [menuState, setMenuState] = useState<MenuState>({ active: false, position: null, anchorRect: null });

	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
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
			if (!menuState.anchorRect || !buttonRef.current) return;
			const currentRect = buttonRef.current.getBoundingClientRect();

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
	const handleMoveToFolder = (folderId: string) => {
		onMoveToFolder(folderId);
		handleCloseMenu();
	}
	return <button onClick={handleOpenMenu} ref={buttonRef} className={className}>
		{children}
		{createPortal(
			<CSSTransition
				classNames={styles}
				timeout={ANIMATION_DURATION}
				in={menuState.active}
				nodeRef={menuRef}
				mountOnEnter
				unmountOnExit
			>

				<div ref={menuRef} style={{
					top: menuState.position?.top,
					left: menuState.position?.left,
					zIndex: 1000,
				}} className={styles.menu}>
					<button className={styles.menu__item}>
						<PenIcon />
						Rename</button>
					<button className={styles.menu__item}>
						<MoveToFolderIcon />
						<p>Move</p>
						{!!folders.length && <div className={styles.menu__submenu}>
							{folders.map((folder) => (
								<button key={folder.id} className={styles['menu__submenu-item']} onClick={() => handleMoveToFolder(folder.id)}><span>{folder.name}</span></button>
							))}
						</div>
						}
					</button>
					<button className={styles.menu__item} onClick={() => onDelete()}><TrashIcon />Delete</button>
				</div>
			</CSSTransition>,
			document.body)}
	</button>
}

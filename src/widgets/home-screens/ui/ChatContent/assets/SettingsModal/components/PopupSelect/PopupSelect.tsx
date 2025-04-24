import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './PopupSelect.module.less';
import { PopupSelectIcon } from 'src/shared/icons/PopupSelectIcon';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';
export type OptionType = {
	label: string;
	value: string;
}
type PopupSelectProps = {
	options: OptionType[]
	value: string
	onChange?: (value: string) => void
}
const ANIMATION_DURATION = 300

type MenuState = {
	active: boolean;
	position: { top: number; left: number } | null;
	anchorRect: DOMRect | null;
}
export const PopupSelect = ({ options, value, onChange }: PopupSelectProps) => {
	const [selected, setSelected] = useState(value);
	const [menuState, setMenuState] = useState<MenuState>({ active: false, position: null, anchorRect: null });

	const menuRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleChange = useCallback((value: string) => {
		setSelected(value);
		onChange?.(value);

	}, [])
	useEffect(() => {
		if (options.every((option) => option.value !== selected)) {
			handleChange(options[0].value);
		}
	}, [options, selected])
	const selectedOption = options.find((option) => option.value === selected);
	const handleOpenMenu = (e: React.MouseEvent) => {
		e.preventDefault()
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		setMenuState({
			active: true,
			position: {
				top: rect.top,
				left: rect.right + 4,
			},
			anchorRect: rect,
		});
	};
	const handleCloseMenu = () => {
		setMenuState(prev => ({ ...prev, active: false }));
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

	useEffect(() => { handleCloseMenu() }, [selected])
	return (
		<button ref={buttonRef} className={clsx(styles.popupSelect, menuState.active && styles['popupSelect--open'])} onClick={handleOpenMenu} >
			{selectedOption?.label} <PopupSelectIcon />
			{createPortal(
				<CSSTransition
					classNames={styles}
					timeout={ANIMATION_DURATION}
					in={menuState.active}
					nodeRef={menuRef}
					mountOnEnter
					unmountOnExit
				>
					<div ref={menuRef}
						style={{
							position: 'absolute',
							top: menuState.position?.top,
							left: menuState.position?.left,
							zIndex: 1000,
						}}
						className={styles.popupSelect__menu}>
						{options.map((option) => (
							<button className={clsx(styles.popupSelect__menu__item, selected === option.value && styles['popupSelect__menu__item--active'])} onClick={() => setSelected(option.value)}>{option.label}</button>
						))}
					</div>
				</CSSTransition>,
				document.body)}
		</button>
	)
}
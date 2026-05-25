import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./CategorySelect.module.less";
import clsx from "clsx";
import { puzzleCategories } from "../Puzzles.config";
import { PuzzleCategories } from "../PuzzleItem/PuzzleItem";
import { MemoryIcon } from "src/shared/icons/MemoryIcon";

export type CategorySelectProps = {
    category: PuzzleCategories | null;
    onSelect: (category: PuzzleCategories) => void;
    className?: string;
};
const ANIMATION_DURATION = 300;
type MenuState = {
    active: boolean;
    position: { top: number; left: number } | null;
    anchorRect: DOMRect | null;
};
export const CategorySelect = ({ category, onSelect, className }: CategorySelectProps) => {
    const [menuState, setMenuState] = useState<MenuState>({
        active: false,
        position: null,
        anchorRect: null,
    });
    const currentCategory = useMemo(() => {
        if (!category) {
            return null;
        }
        return puzzleCategories.find((cat) => cat.name === category);
    }, [category]);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleOpenMenu = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMenuState({
            active: true,
            position: {
                top: rect.bottom + 5 + window.scrollY,
                left: rect.left + window.scrollX,
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
            if (
                menuRef.current &&
                !menuRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target) &&
                menuState.active
            ) {
                handleCloseMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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

        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [menuState.anchorRect]);
    const handleSelect = (e: React.MouseEvent, category: PuzzleCategories) => {
        e.stopPropagation();
        onSelect(category);
        handleCloseMenu();
    };
    return (
        <button
            onClick={handleOpenMenu}
            ref={buttonRef}
            className={clsx(styles.categorySelect, styles[currentCategory?.value ?? ""], className)}
        >
            {category ?? <MemoryIcon />}
            {createPortal(
                <CSSTransition
                    classNames={styles}
                    timeout={ANIMATION_DURATION}
                    in={menuState.active}
                    nodeRef={menuRef}
                    mountOnEnter
                    unmountOnExit
                >
                    <div
                        ref={menuRef}
                        id="category-select"
                        style={{
                            top: menuState.position?.top,
                            left: menuState.position?.left,
                            zIndex: 1000,
                        }}
                        className={styles.categorySelect__menu}
                    >
                        {puzzleCategories.map((cat) => (
                            <button
                                key={cat.name}
                                className={clsx(
                                    styles.categorySelect__menu__item,
                                    styles[cat.value],
                                    cat.value === currentCategory?.value &&
                                        styles[`${cat.value}--selected`]
                                )}
                                onClick={(e) => handleSelect(e, cat.name)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </CSSTransition>,
                document.body
            )}
        </button>
    );
};

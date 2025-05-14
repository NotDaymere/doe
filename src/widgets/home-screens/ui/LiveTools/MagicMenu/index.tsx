import classNames from "classnames";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import MagicMenuItem, { IMagicMenuItem } from "./MagicMenuItem";
import { useAppStore } from "src/shared/providers";
import css from "./MagicMenu.module.less";
import clsx from "clsx";

interface IProps {
    items: IMagicMenuItem[];
    magicButtonIcon: ReactElement;
    magicButtonClass?: string;
    classes?: string;
}

export const MagicMenu: React.FC<IProps> = ({
    items,
    magicButtonIcon,
    magicButtonClass,
    classes,
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuWrapperRef = useRef<HTMLDivElement>(null);

    const [showMagicMenu, setShowMagicMenu] = useState(false);
    const { activeTranslationOption } = useAppStore();

    useEffect(() => {
        setShowMagicMenu(false);
    }, [activeTranslationOption]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (nodeRef.current?.contains(target) || buttonRef.current?.contains(target)) {
                return;
            }
            setShowMagicMenu(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            className={clsx(css.magicMenu, showMagicMenu && css.active)}
            style={{
                zIndex: showMagicMenu ? 100 : undefined,
            }}
        >
            <button
                ref={buttonRef}
                className={clsx(magicButtonClass)}
                onClick={() => setShowMagicMenu((prev) => !prev)}
            >
                {magicButtonIcon}
            </button>

            <CSSTransition
                in={showMagicMenu}
                timeout={500}
                classNames={css}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={classNames(css.menuWrapper, classes)} ref={menuWrapperRef}>
                    <div className={css.menu} ref={nodeRef}>
                        {items.map((item) => (
                            <MagicMenuItem key={item.text} item={item} />
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

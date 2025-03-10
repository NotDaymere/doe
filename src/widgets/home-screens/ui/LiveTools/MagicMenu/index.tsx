import classNames from "classnames";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import MagicMenuItem from "./MagicMenuItem";
import { useAppStore } from "src/shared/providers";
import css from "./MagicMenu.module.less";

interface IProps {
    items: any;
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
    const nodeRef = React.useRef<HTMLDivElement>(null);
    let closeTimeout = useRef<any>(null);
    const [showMagicMenu, setShowMagicMenu] = useState(false);
    const { activeTranslationOption } = useAppStore();

    useEffect(() => {
        setShowMagicMenu(false);
    }, [activeTranslationOption]);

    const handleMouseEnter = () => {
        setShowMagicMenu(true);
        clearTimeout(closeTimeout.current);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setShowMagicMenu(false);
        }, 200);
    };

    return (
        <div
            className={css.magicMenu}
            style={{
                zIndex: showMagicMenu ? 100 : "",
            }}
        >
            <button
                className={magicButtonClass ? magicButtonClass : ""}
                onMouseEnter={handleMouseEnter}
            >
                {magicButtonIcon}
            </button>
            <CSSTransition
                classNames={css}
                timeout={500}
                in={showMagicMenu}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={classNames(css.menuWrapper, classes)}>
                    <div className={css.menu} ref={nodeRef} onMouseLeave={handleMouseLeave}>
                        {items.map((item: any) => (
                            <MagicMenuItem key={item.text} item={item} />
                        ))}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

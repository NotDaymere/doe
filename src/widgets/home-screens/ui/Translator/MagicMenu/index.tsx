import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useClickOut } from "src/shared/hooks/useClickOut";
import MagicMenuItem from "./MagicMenuItem";
import { useAppStore } from "src/shared/providers";
import css from "./MagicMenu.module.less";

interface IProps {
    items: any;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    classes?: string;
}

export const MagicMenu: React.FC<IProps> = ({ items, isActive, setIsActive, classes }) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [showMagicMenu, setShowMagicMenu] = useState(false);
    const { activeTranslationOption } = useAppStore();

    useEffect(() => {
        setShowMagicMenu(false);
        setIsActive(false);
    }, [activeTranslationOption]);

    useEffect(() => {
        if (isActive) {
            setShowMagicMenu(true);
        }

        return () => {
            setShowMagicMenu(false);
        };
    }, [isActive]);

    const ref = useClickOut({
        handler: () => {
            setShowMagicMenu(false);
            setIsActive(false);
        },
    });

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setShowMagicMenu(false);
        };
    };

    return (
        <div
            className={css.magicMenu}
            style={{
                zIndex: showMagicMenu ? 100 : "",
            }}
            ref={ref}
        >
            <CSSTransition
                classNames={css}
                timeout={300}
                in={showMagicMenu}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={classNames(css.menu, classes)} ref={nodeRef}>
                    {items.map((item: any) => (
                        <MagicMenuItem key={item.text} item={item} />
                    ))}
                </div>
            </CSSTransition>
        </div>
    );
};

import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import StarsIcon from "src/shared/icons/Stars.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";
import { usePanel } from "src/widgets/home-screens/lib";
import MagicMenuItem from "./MagicMenuItem";
import { useAppStore } from "src/shared/providers";
import css from "./MagicMenu.module.less";

interface IProps {
    items: any;
}

export const MagicMenu: React.FC<IProps> = ({ items }) => {
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [showMagicMenu, setShowMagicMenu] = useState(false);
    const { activeTranslationOption } = useAppStore();
    const { files, setFiles } = usePanel();

    useEffect(() => {
        setShowMagicMenu(false);
    }, [activeTranslationOption]);

    const ref = useClickOut({
        handler: () => setShowMagicMenu(false),
    });

    const upload = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (ev: any) => {
            const newFiles = Array.from(ev.target.files) as File[];
            setFiles([...files, ...newFiles]);

            input.remove();
        };
        input.click();
    };

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
            <button className={css.magicButton} onMouseEnter={() => setShowMagicMenu(true)}>
                <StarsIcon width={21} height={28} />
            </button>
            <CSSTransition
                classNames={css}
                timeout={300}
                in={showMagicMenu}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={css.menu} ref={nodeRef}>
                    {items.map((item: any) => (
                        <MagicMenuItem key={item.text} item={item} />
                    ))}
                </div>
            </CSSTransition>
        </div>
    );
};

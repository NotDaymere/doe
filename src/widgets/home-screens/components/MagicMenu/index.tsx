import React from "react";
import { CSSTransition } from "react-transition-group";
import BranchIcon from "src/shared/icons/Branch.icon";
import CallIcon from "src/shared/icons/Call.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import TalkIcon from "src/shared/icons/Talk.icon";
import UploadIcon from "src/shared/icons/Upload.icon";
import { MagicApplications, MagicMenuButton, MagicUploadApps } from "./ui";
import { useClickOut } from "src/shared/hooks/useClickOut";
import css from "./MagicMenu.module.less";

interface Props {
    onUploadFiles?: (files: File[]) => void;
    onDispatchDoe?: () => void;
}

export const MagicMenu: React.FC<Props> = ({
    onUploadFiles,
    onDispatchDoe
}) => {
    const [activeMenu, setActiveMenu] = React.useState(false);
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const ref = useClickOut({
        handler: () => setActiveMenu(false)
    });

    const toggleMenu = () => setActiveMenu(!activeMenu);

    const upload = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (ev: any) => {
            const files = Array.from(ev.target.files) as File[];
            onUploadFiles?.(files);
            input.remove();
        }
        input.click();
    };

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setActiveMenu(false);
        }
    }

    return (
        <div 
            className={css.magic} 
            style={{ 
                zIndex: activeMenu ? 100 : "" 
            }} 
            ref={ref}
        >
            <button className={css.magic_btn} onClick={toggleMenu}>
                <StarsIcon />
            </button>
            <CSSTransition
                classNames={css}
                timeout={300}
                in={activeMenu}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={css.menu} ref={nodeRef}>
                    <MagicApplications />
                    <MagicMenuButton 
                        icon={<UploadIcon />} 
                        text="Upload from desktop" 
                        onClick={setCloseHandler(upload)}
                    />
                    <MagicUploadApps />
                    <MagicMenuButton 
                        icon={<CallIcon />} 
                        text="Dispatch Doe" 
                        onClick={setCloseHandler(onDispatchDoe)}
                    />
                    <MagicMenuButton icon={<TalkIcon />} text="Talk mode" />
                    <MagicMenuButton icon={<BranchIcon />} text="Create new branch" />
                </div>
            </CSSTransition>
        </div>
    );
};

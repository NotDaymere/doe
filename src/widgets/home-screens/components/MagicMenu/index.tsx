import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import CallIcon from "src/shared/icons/Call.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import TalkIcon from "src/shared/icons/Talk.icon";
import { MagicApplications, MagicMenuButton, MagicUploadApps } from "./ui";
import { useClickOut } from "src/shared/hooks/useClickOut";
import css from "./MagicMenu.module.less";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import { MagicCreateNewBranch } from "./ui/MagicCreateNewBranch/MagicCreateNewBranch";
import { MagicUploadFromDesktop } from "./ui/MagicUploadFromDesktop/MagicUploadFromDesktop";
import { FileWithId } from "../../lib/hooks/useDragFile";


interface Props {
    onUploadFiles?: (files: FileWithId[]) => void;
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
    const isUploadFileChatMode = useChatStore((state) => state.isUploadFileChatMode);
    const {setTalkModeActive } = useAppStore();
    const toggleMenu = () => setActiveMenu(!activeMenu);

    useEffect(() => {
        if(isUploadFileChatMode){
            setActiveMenu(false);
        }
    }, [isUploadFileChatMode]);

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
                    <MagicUploadFromDesktop setActiveMenu={setActiveMenu}/>
                    <MagicUploadApps />
                    <MagicMenuButton 
                        icon={<CallIcon />} 
                        text="Dispatch Doe" 
                        onClick={setCloseHandler(onDispatchDoe)}
                    />
                    <MagicMenuButton
                        icon={<TalkIcon />}
                        text="Talk mode"
                        onClick={setCloseHandler(() => setTalkModeActive(true))}
                    />
                    <MagicCreateNewBranch/>
                </div>
            </CSSTransition>
        </div>
    );
};

import clsx from "clsx";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { useCursor } from "src/contexts/CursorContext";
import { useClickOut } from "src/shared/hooks/useClickOut";
import BranchIcon from "src/shared/icons/Branch.icon";
import CallIcon from "src/shared/icons/Call.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import TalkIcon from "src/shared/icons/Talk.icon";
import UploadIcon from "src/shared/icons/Upload.icon";
import css from "./OnboardingMagicMenu.module.less";
import {
    MagicApplications,
    MagicUploadApps,
} from "src/widgets/home-screens/components/MagicMenu/ui";
import { OnboardingMagicMenuButton } from "./OnboardingMagicMenuButton";

interface Props {
    onUploadFiles?: (files: File[]) => void;
    onDispatchDoe?: () => void;
    step?: number;
    handleTalkModeClick?: () => void;
    handleNewBranchClick?: () => void;
}

export const OnboardingMagicMenu: React.FC<Props> = ({
    onUploadFiles,
    onDispatchDoe,
    step,
    handleTalkModeClick,
    handleNewBranchClick,
}) => {
    const { cursorMoving } = useCursor();
    const [activeMenu, setActiveMenu] = React.useState(false);
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const ref = useClickOut({
        handler: () => setActiveMenu(false),
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
        };
        input.click();
    };

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setActiveMenu(false);
        };
    };

    return (
        <div
            className={clsx(css.magic, {
                [css.magic_active]: ((step === 37 || step === 45) && !cursorMoving) || step === 38,
            })}
            style={{
                zIndex: activeMenu ? 100 : "",
            }}
            ref={ref}
            data-step="sparkle"
        >
            <button className={css.magic_btn} onClick={toggleMenu}>
                <StarsIcon />
            </button>
            <CSSTransition
                classNames={css}
                timeout={300}
                in={activeMenu || step === 38 || step === 45.1}
                nodeRef={nodeRef}
                mountOnEnter
                unmountOnExit
            >
                <div className={css.menu} ref={nodeRef}>
                    <MagicApplications />
                    <OnboardingMagicMenuButton
                        icon={<UploadIcon />}
                        text="Upload from desktop"
                        onClick={setCloseHandler(upload)}
                    />
                    <MagicUploadApps />
                    <OnboardingMagicMenuButton
                        icon={<CallIcon />}
                        text="Dispatch Doe"
                        onClick={setCloseHandler(onDispatchDoe)}
                    />
                    <OnboardingMagicMenuButton
                        icon={<TalkIcon />}
                        text="Talk mode"
                        step={step}
                        triggerStep={45.1}
                        dataStep="talk-mode"
                        onClick={handleTalkModeClick}
                    />
                    <OnboardingMagicMenuButton
                        icon={<BranchIcon />}
                        text="Create new branch"
                        step={step}
                        triggerStep={38}
                        dataStep="branch"
                        onClick={handleNewBranchClick}
                    />
                </div>
            </CSSTransition>
        </div>
    );
};

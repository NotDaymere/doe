import MinusIcon from "src/shared/icons/Minus.icon";
import MinimizeIcon from "src/shared/icons/Minimize.icon";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import css from "./Bookmarks.module.less";
import { ModeType } from "../../../../../../shared/types/Chat";
import { useChatStore } from "../../../../../../shared/providers";
import RecordsIcon from "../../../../../../shared/icons/Records.icon";

interface IProps {
    icon?: ReactElement;
    title?: string;
    recording?: string;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    mode?: ModeType;
}

type AnimationState = "enter" | "visible" | "exit";

const Recording: FC<IProps> = ({ isActive, setIsActive }) => {
    const [animationState, setAnimationState] = useState<AnimationState>("enter");
    const ref = useRef<HTMLDivElement>(null);
    const {savedRecordings,deleteRecording} = useChatStore();

    useEffect(() => {
        if (isActive) {
            setAnimationState("visible");
        }
    }, [isActive]);

    const handleClose = () => {
        setAnimationState("exit");
        setTimeout(() => {
            setIsActive(false);
        }, 300);
    };

    if (!isActive && animationState === "enter") return null;

    return (
        <div
            ref={ref}
            className={classNames(css.bookmarks, css[animationState])}
        >
            <div className={css.bookmarkItem}>
                <div className={css.bookmarkHeader}>
                    <div className={css.bookmarkTitle}>
                        <RecordsIcon width={23} height={10} className={css.icon} />
                        <span>Recordings</span>
                    </div>
                    <div className={css.minimizeButton}>
                        <MinimizeIcon width={12} height={12} onClick={handleClose} />
                    </div>
                </div>
                <div  className={css.bookmarkWrapper}>

                {savedRecordings.map(({ id, title }) => (

                        <div key={id} className={css.bookmark}>
                            <span>{title}</span>
                            <MinusIcon width={12} height={2} className={css.removeButton}  onClick={() => deleteRecording(id)}/>
                        </div>
            ))}
                </div>

            </div>
        </div>
    );
};

export default Recording;

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import css from "./TalkMode.module.less";
import { useAppStore } from "../../../../shared/providers";
import { TalkModeDynamicObj } from "./TalkModeDynamicObj/TalkModeDynamicObj";
import { TalkModeMessages } from "./TalkModeMessages/TalkModeMessages";


interface TalkModeProps {
    targetRef: React.RefObject<HTMLElement>;
}

export const TalkMode: React.FC<TalkModeProps> = ({ targetRef }) => {
    const { talkModeActive } = useAppStore();

    const [containerActive, setContainerActive] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let containerTimer: ReturnType<typeof setTimeout>;
        let messageTimer: ReturnType<typeof setTimeout>;

        if (talkModeActive) {
            containerTimer = setTimeout(() => {
                setContainerActive(true);
            }, 50);

            messageTimer = setTimeout(() => {
                setShowMessage(true);
            }, 500);
        } else {
            setContainerActive(false);
            setShowMessage(false);
        }

        return () => {
            clearTimeout(containerTimer);
            clearTimeout(messageTimer);
        };
    }, [talkModeActive]);

    if (!talkModeActive && !containerActive) {
        return null;
    }

    const closeBubbleHandler = () => {
        setShowMessage(false);
    };

    return (
        <div className={clsx(css.talkMode, { [css._active]: containerActive })}>
            <TalkModeMessages
                showMessage={showMessage}
                closeBubbleHandler={closeBubbleHandler}
            />
            <TalkModeDynamicObj />
        </div>
    );
};

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import css from "./TalkMode.module.less";
import { useAppStore } from "../../../../shared/providers";
import { TalkModeDynamicObj } from "./TalkModeDynamicObj/TalkModeDynamicObj";
import { TalkModeMessages } from "./TalkModeMessages/TalkModeMessages";
import { TalkModeActionsPanel } from "./TalkModeActionsPanel/TalkModeActionsPanel";

interface TalkModeProps {
    targetRef: React.RefObject<HTMLElement>;
}

export const TalkMode: React.FC<TalkModeProps> = ({ targetRef }) => {
    const { talkModeActive, setTalkModeActive } = useAppStore();

    const [containerActive, setContainerActive] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [hoverPanelVisible, setHoverPanelVisible] = useState(false);
    const [isNeedToClose, setIsNeedToClose] = useState(false);

    useEffect(() => {
        if (talkModeActive) {
            setIsNeedToClose(false);
        }
    }, [talkModeActive]);

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

    useEffect(() => {
        if (isNeedToClose) {
            setContainerActive(false);
            setShowMessage(false);
            const closeTimer = setTimeout(() => {
                setTalkModeActive(false);
            }, 300);

            return () => clearTimeout(closeTimer);
        }
        return;
    }, [isNeedToClose, setTalkModeActive]);

    if (!talkModeActive && !containerActive) {
        return null;
    }

    const closeBubbleHandler = () => {
        setShowMessage(false);
    };

    return (
        <div
            className={clsx(css.talkMode, { [css._active]: containerActive })}
            onMouseLeave={() => setHoverPanelVisible(false)}
        >
            <TalkModeMessages
                showMessage={showMessage}
                closeBubbleHandler={closeBubbleHandler}
            />
            <div
                className={clsx(css.hoverPanel, { [css._visible]: hoverPanelVisible })}
                onMouseEnter={() => setHoverPanelVisible(true)}
                onMouseLeave={() => setHoverPanelVisible(false)}
            >
                <TalkModeActionsPanel onClose={() => setIsNeedToClose(true)} />
            </div>
            <div
                className={css.dynamicObjWrapper}
                onMouseEnter={() => setHoverPanelVisible(true)}
                onMouseLeave={() => setHoverPanelVisible(false)}
            >
                <TalkModeDynamicObj />
            </div>
        </div>
    );
};

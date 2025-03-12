import React, { useEffect, useState } from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import { useAppStore, useChatStore } from "src/shared/providers";
import PlaygroundRenderer from "../Playground";
import classNames from "classnames";
import LimitScreen from "../LimitScreen";
import WelcomeScreen from "../WelcomeScreen";
import { MODE } from "src/shared/types/Chat";
import LiveTools from "../LiveTools";
import css from "./ChatLayout.module.less";

export const MAX_MESSAGES_LIMIT = 50;

const DEFAULT_STYLES = {
    width: "100%",
    playgroundWidth: "0%",
    opacity: 0,
    paddingRight: "76px",
};

export const ChatLayout: React.FC = () => {
    const { playground } = useAppStore();
    const { messagesCount, mode } = useChatStore();
    const [styles, setStyles] = useState({ ...DEFAULT_STYLES });

    useEffect(() => {
        if (playground.open) {
            setStyles({
                width: "66%",
                playgroundWidth: "34%",
                opacity: 1,
                paddingRight: "20px",
            });
        } else {
            setStyles({ ...DEFAULT_STYLES });
        }
    }, [playground.open]);

    if (mode === MODE.TRANSLATION || mode === MODE.RECORDING)
        return (
            <div className={css.chatLayout}>
                <div className={css.layout}>
                    <div className={css.layout_sidebar}>
                        <Sidebar />
                    </div>
                    <LiveTools />
                </div>
            </div>
        );

    return (
        <>
            {messagesCount === 0 && (
                <div className={css.welcomeScreen}>
                    <WelcomeScreen />
                    <ChatPanel />
                </div>
            )}
            <div className={css.chatLayout} style={{ paddingRight: styles.paddingRight }}>
                <div
                    className={classNames(css.layout, {
                        [css.layoutWithPlayground]: playground.open,
                    })}
                    style={{ width: styles.width }}
                >
                    <div className={css.layout_sidebar}>
                        <Sidebar />
                    </div>
                    <div className={css.layout_chat}>
                        <ChatContent />
                        {messagesCount < MAX_MESSAGES_LIMIT ? (
                            <ChatPanel />
                        ) : (
                            <div className={css.limitScreen}>
                                <LimitScreen />
                            </div>
                        )}
                    </div>
                </div>
                {playground.open && (
                    <div
                        className={css.playground}
                        style={{ width: styles.playgroundWidth, opacity: styles.opacity }}
                    >
                        <PlaygroundRenderer type={playground.type} />
                    </div>
                )}
            </div>
        </>
    );
};

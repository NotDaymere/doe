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
import TranslationMode from "../Translator";
import css from "./ChatLayout.module.less";

export const MAX_MESSAGES_LIMIT = 50;

export const ChatLayout: React.FC = () => {
    const { playground } = useAppStore();
    const { messagesCount, mode } = useChatStore();
    const [width, setWidth] = useState("100%");
    const [playgroundWidth, setPlaygroundWidth] = useState("0%");
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (playground.open) {
            setWidth("66%");
            setPlaygroundWidth("34%");
            setOpacity(1);
        } else {
            setWidth("100%");
            setPlaygroundWidth("0%");
            setOpacity(0);
        }
    }, [playground.open]);

    if (mode === MODE.TRANSLATION)
        return (
            <div className={css.chatLayout}>
                <div className={css.layout}>
                    <div className={css.layout_sidebar}>
                        <Sidebar />
                    </div>
                    <div className={css.translation}>
                        <TranslationMode />
                    </div>
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
            <div className={css.chatLayout}>
                <div
                    className={classNames(css.layout, {
                        [css.layoutWithPlayground]: playground.open,
                    })}
                    style={{ width }}
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
                    <div className={css.playground} style={{ width: playgroundWidth, opacity }}>
                        <PlaygroundRenderer type={playground.type} />{" "}
                    </div>
                )}
            </div>
        </>
    );
};

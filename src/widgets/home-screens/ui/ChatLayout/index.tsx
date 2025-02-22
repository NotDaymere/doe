import React from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import { useAppStore, useChatStore } from "src/shared/providers";
import PlaygroundRenderer from "../Playground";
import classNames from "classnames";
import LimitScreen from "../LimitScreen";
import css from "./ChatLayout.module.less";
import WelcomeScreen from "../WelcomeScreen";

const MAX_MESSAGES_LIMIT = 5;

export const ChatLayout: React.FC = () => {
    const { playground } = useAppStore();
    const { messagesCount } = useChatStore();
    return (
        <>
            {messagesCount === 0 && (
                <div className={css.welcomeScreen}>
                    <WelcomeScreen />
                    <ChatPanel />
                </div>
            )}
            <div
                className={classNames(css.layout, { [css.layoutWithPlayground]: playground.open })}
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
                {playground.open && <PlaygroundRenderer type={playground.type} />}
            </div>
        </>
    );
};

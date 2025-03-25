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
import { ChatProvider } from "../../lib/hooks/ChatContext";
interface EditModeState {
    isEditMsgMode: boolean;
    msgId: number | null;
}

export const MAX_MESSAGES_LIMIT = 50;

const DEFAULT_STYLES = {
    width: "100%",
    playgroundWidth: "0%",
    opacity: 0,
    paddingRight: "76px",
};

export const ChatLayout: React.FC = () => {
    const { playground, playgroundFullscreen, getOpenSavedPlaygrounds, messagesCount, mode } = useChatStore();
    const [editMsgMode, setEditMsgMode] = React.useState<EditModeState>({
        isEditMsgMode: false,
        msgId: null,
    });
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
            <ChatProvider>
                <div
                    className={getOpenSavedPlaygrounds().length > 0 ? (playgroundFullscreen ? css.layout_playground_fullscreen : css.layout_playground) : css.layout}>
                    {!playgroundFullscreen &&
                        <div className={getOpenSavedPlaygrounds().length > 0 ? css.layout_sidebar_playground : css.layout_sidebar}>
                            <Sidebar />
                        </div>
                    }
                    <div className={css.layout_chat}>
                        <ChatContent editMsgMode={editMsgMode} setEditMsgMode={setEditMsgMode} />
                        {messagesCount < MAX_MESSAGES_LIMIT ? (
                            <>
                                {editMsgMode.isEditMsgMode ? null : <ChatPanel />}
                            </>
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
            </ChatProvider>
        </>

    );
};

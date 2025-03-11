import React from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import css from "./ChatLayout.module.less";
import { useChatStore } from "../../../../shared/providers";
import { ChatProvider } from "../../lib/hooks/ChatContext";
interface EditModeState {
    isEditMsgMode: boolean;
    msgId: number | null;
}
export const ChatLayout: React.FC = () => {
    const { playground, playgroundFullscreen, getOpenSavedPlaygrounds } = useChatStore();
    const [editMsgMode, setEditMsgMode] = React.useState<EditModeState>({
        isEditMsgMode: false,
        msgId: null,
    });
    return (
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
                    {editMsgMode.isEditMsgMode ? null : <ChatPanel />}
                </div>
            </div>
        </ChatProvider>
    );
};
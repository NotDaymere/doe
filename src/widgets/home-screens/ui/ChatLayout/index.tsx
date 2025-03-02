import React, { createContext } from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import css from "./ChatLayout.module.less";
import { ChatProvider } from "../../lib/hooks/ChatContext";

interface EditModeState {
    isEditMsgMode: boolean;
    msgId: number | null;
}

export const ChatLayout: React.FC = () => {
    const [editMsgMode, setEditMsgMode] = React.useState<EditModeState>({
        isEditMsgMode: false,
        msgId: null,
    });

    return (
        <ChatProvider>
            <div className={css.layout}>
                <div className={css.layout_sidebar}>
                    <Sidebar />
                </div>
                <div className={css.layout_chat}>
                    <ChatContent editMsgMode={editMsgMode} setEditMsgMode={setEditMsgMode} />
                    {editMsgMode.isEditMsgMode ? null : <ChatPanel />}
                </div>
            </div>
        </ChatProvider>
    );
};

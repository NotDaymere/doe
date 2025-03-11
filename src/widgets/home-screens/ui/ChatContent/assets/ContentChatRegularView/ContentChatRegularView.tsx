import React from "react";
import AllPlaygrounds from "../AllPlaygrounds/AllPlaygrounds";
import AllBranches from "../AllBranches/AllBranches";
import { ChatMessageDate } from "../ChatMessageData/ChatMessageDate";
import ChatBranchSection from "../ChatBranchSection/ChatBranchSection";
import { ChatMessage } from "../../../ChatMessage";
import css from "./ContentChatRegularView.module.less";

interface ChatRegularViewProps {
    playgroundFullscreen: boolean;
    messageQueue: any[];
    editor: any;
    editMsgMode: {
        isEditMsgMode: boolean;
        msgId: number | null;
    };
    setEditMsgMode: React.Dispatch<
        React.SetStateAction<{
            isEditMsgMode: boolean;
            msgId: number | null;
        }>
    >;
}

export const ChatRegularView: React.FC<ChatRegularViewProps> = ({
    playgroundFullscreen,
    messageQueue,
    editor,
    editMsgMode,
    setEditMsgMode,
}) => (
    <>
        {!playgroundFullscreen && (
            <div className={css.content_top_actions_container}>
                <AllBranches />
                <AllPlaygrounds />
            </div>
        )}
        <div className={css.content_chat}>
            {messageQueue.map((item, index) => (
                <React.Fragment key={item.id}>
                    <ChatMessageDate id={index} />
                    <ChatBranchSection messageId={item.id} />
                    <ChatMessage
                        data={item}
                        editor={editor}
                        editMsgMode={editMsgMode}
                        setEditMsgMode={setEditMsgMode}
                    />
                </React.Fragment>
            ))}
        </div>
    </>
);

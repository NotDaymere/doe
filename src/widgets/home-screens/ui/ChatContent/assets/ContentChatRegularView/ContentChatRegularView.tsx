import React, { useEffect } from "react";
import { ChatMessageDate } from "../ChatMessageData/ChatMessageDate";
import ChatBranchSection from "../ChatBranchSection/ChatBranchSection";
import { ChatMessage } from "../../../ChatMessage";
import { useChatStore } from "../../../../../../shared/providers";
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
                                                                    messageQueue,
                                                                    editor,
                                                                    editMsgMode,
                                                                    setEditMsgMode,
                                                                }) => {
    const { savedBranches, activeMessage, setActiveMessage } = useChatStore();

    useEffect(() => {
        if (activeMessage) {
            const element = document.getElementById(`chat-msg-${activeMessage.id}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActiveMessage(null);
        }
    }, [activeMessage, setActiveMessage]);

    return (
        <div className={css.content_chat}>
            {messageQueue.map((item, index) => {
                const branch = savedBranches.find(b => b.mainMessageId === item.id);
                const hasBranch = !!(branch && branch.mainMessageId === item.id);

                return (
                    <div key={item.id} id={`chat-msg-${item.id}`}>
                        <ChatMessageDate id={index} />
                        {hasBranch && branch ? (
                            <ChatBranchSection branch={branch} />
                        ) : (
                            <ChatMessage
                                data={item}
                                editor={editor}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

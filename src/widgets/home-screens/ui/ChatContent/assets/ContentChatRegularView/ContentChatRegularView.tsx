import React from "react";
import { ChatMessageDate } from "../ChatMessageData/ChatMessageDate";
import ChatBranchSection from "../ChatBranchSection/ChatBranchSection";
import { ChatMessage } from "../../../ChatMessage";
import { useChatStore } from "../../../../../../shared/providers";
import css from "./ContentChatRegularView.module.less";
import { message } from "antd";

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
    const { savedBranches } = useChatStore();

    return (
        <>

            <div className={css.content_chat}>
                {messageQueue.map((item, index) => {
                    const branch = savedBranches.find(b => b.mainMessageId === item.id);
                    let hasBranch = false;
                    if (branch) {
                        if (branch.mainMessageId === item.id) {
                            hasBranch = branch.mainMessageId === item.id;
                        }
                    }

                    return (
                        <React.Fragment key={item.id}>
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
                        </React.Fragment>
                    );
                })}
            </div>
        </>
    );
};

import React from "react";

import css from "./ChatBranchView.module.less";
import { ChatMessageDate } from "../ChatMessageData/ChatMessageDate";
import { ChatMessage } from "../../../ChatMessage";
import ChatBranchSection from "../ChatBranchSection/ChatBranchSection";
import { IBranch } from "../../../../../../shared/types/Branch";

interface ChatBranchViewProps {
    currentBranch: IBranch;
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
    dialogRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const ChatBranchView: React.FC<ChatBranchViewProps> = ({
                                                                  currentBranch,
                                                                  editor,
                                                                  editMsgMode,
                                                                  setEditMsgMode,
                                                                  dialogRefs,
                                                              }) => (
    <div>
        <div className={css.content_chat_branch_messages}>
            {currentBranch.messages.slice(-3, -1).map((item, index) => (
                <React.Fragment key={item.id}>
                    <ChatMessageDate id={index} />
                    <ChatMessage
                        data={item}
                        editor={editor}
                        editMsgMode={editMsgMode}
                        setEditMsgMode={setEditMsgMode}
                    />
                </React.Fragment>
            ))}
        </div>
        <div className={css.content_chat_branch_dialogs}>
            {currentBranch.dialogsMessages.map((dialog, index) => (
                <React.Fragment key={index}>
                    <div className={css.content_chat_branch}>
                        <ChatBranchSection isOpenBrunch={true} />
                        <div className={css.content_chat_branch_dialog}>
                            <ChatMessage
                                data={dialog.userRequest}
                                editor={editor}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                            <ChatMessage
                                data={dialog.botMessages}
                                editor={editor}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>

    </div>
);

import React, { useEffect } from "react";
import css from "./ChatBranchView.module.less";
import { ChatMessageDate } from "../ChatMessageDate/ChatMessageDate";
import { ChatMessage } from "../../../ChatMessage";
import ChatBranchSection from "../ChatBranchSection/ChatBranchSection";
import { IBranch } from "../../../../../../shared/types/Branch";
import { useChatStore } from "../../../../../../shared/providers";
import ChatMainBranchSection from "../ChatMainBranchSection/ChatMainBranchSection";

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
                                                              }) => {
    const { activeMessage, setActiveMessage, getOpenSavedPlaygrounds } = useChatStore();

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
        <div>
            <div className={css.content_chat_branch_messages}>
                {currentBranch.messages.slice(-3).map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ChatMessageDate id={index} />
                        <div id={`chat-msg-${item.id}`}>
                            <ChatMessage
                                data={item}
                                editor={editor}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className={getOpenSavedPlaygrounds().length < 1
                            ? css.content_chat_branch_dialogs
                            : css.content_chat_branch_dialogs_open_playground}>

                {currentBranch.dialogsMessages.map((dialog, index) => (
                    <React.Fragment key={index}>
                        <div className={css.content_chat_branch}>
                            {currentBranch && (
                                <div className={css.branch_section}>
                                    <ChatBranchSection isOpenBrunch={true} />
                                </div>
                                )
                            }
                            <div className={css.content_chat_branch_dialog}>
                                <div id={`chat-msg-${dialog.userRequest.id}`}>
                                    <ChatMessage
                                        data={dialog.userRequest}
                                        editor={editor}
                                        editMsgMode={editMsgMode}
                                        setEditMsgMode={setEditMsgMode}
                                    />
                                </div>
                                {dialog.botMessages &&
                                    <div id={`chat-msg-${dialog.botMessages.id}`}>
                                        <ChatMessage
                                            data={dialog.botMessages}
                                            editor={editor}
                                            editMsgMode={editMsgMode}
                                            setEditMsgMode={setEditMsgMode}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
// <div>
//     <div className={css.content_chat_branch_messages}>
//         {currentBranch.messages.slice(-3, -1).map((item: any, index: number) => (
//             <React.Fragment key={item.id}>
//                 <ChatMessageDate id={index} />
//                 <ChatMessage
//                     data={item}
//                     editor={editor}
//                     editMsgMode={editMsgMode}
//                     setEditMsgMode={setEditMsgMode}
//                 />
//             </React.Fragment>
//         ))}
//     </div>
//     <div className={css.content_chat_branch_dialogs}>
//         {currentBranch.dialogsMessages.map((dialog: any, index: number) => (
//             <React.Fragment key={index}>
//                 <div
//                     ref={(el) => (dialogRefs.current[index] = el)}
//                     className={css.content_chat_branch}
//                 >
//                     <ChatBranchSection isOpenBrunch={true} />
//                     <div className={css.content_chat_branch_dialog}>
//                         <ChatMessage
//                             data={dialog.userRequest}
//                             editor={editor}
//                             editMsgMode={editMsgMode}
//                             setEditMsgMode={setEditMsgMode}
//                         />
//                         <ChatMessage
//                             data={dialog.botMessages}
//                             editor={editor}
//                             editMsgMode={editMsgMode}
//                             setEditMsgMode={setEditMsgMode}
//                         />
//                     </div>
//                 </div>
//             </React.Fragment>
//         ))}
//     </div>
// </div>
// );

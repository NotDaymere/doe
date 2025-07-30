import React, { useEffect, useRef } from "react";
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
    chatRef: React.RefObject<HTMLDivElement>;
}

export const ChatBranchView: React.FC<ChatBranchViewProps> = ({
                                                                  currentBranch,
                                                                  editor,
                                                                  editMsgMode,
                                                                  setEditMsgMode,
                                                                  dialogRefs,
                                                                  chatRef,
                                                              }) => {
    const { activeMessage, setActiveMessage, getOpenSavedPlaygrounds } = useChatStore();
    const branchSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (branchSectionRef.current && chatRef.current) {
                const scrollTop = chatRef.current.scrollTop;
                branchSectionRef.current.style.transform = `translateY(${-scrollTop}px)`;
            }
        };

        const scrollContainer = chatRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [chatRef]);

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
        <div className={css.branches_wrapper}>
             <ChatMessage
                                data={currentBranch.messages[0]}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
            <div className={css.content_chat_branch_messages}>
                {currentBranch.messages.slice(-3).map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ChatMessageDate id={index} />
                        <div id={`chat-msg-${item.id}`}>
                            <ChatMessage
                                key={item.id + "m"}
                                data={item}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {currentBranch && (
                <div
                     className={
                         getOpenSavedPlaygrounds().length < 1
                             ? css.branch_section
                             : css.branch_section_open_playground
                     }
                     ref={branchSectionRef}>
                    <ChatBranchSection isOpenBrunch={true} />
                </div>
            )}

            <div
                className={
                    getOpenSavedPlaygrounds().length < 1
                        ? css.content_chat_branch_dialogs
                        : css.content_chat_branch_dialogs_open_playground
                }
            >
                {currentBranch.dialogsMessages.map((dialog, index) => (
                    <React.Fragment key={index}>
                        <div className={css.content_chat_branch}>
                            <div className={css.content_chat_branch_dialog}>
                                <div
                                    id={`chat-msg-${dialog.userRequest.id}`}
                                    className={css.branch_message}
                                >
                                    <ChatMessage
                                        data={dialog.userRequest}
                                        editMsgMode={editMsgMode}
                                        setEditMsgMode={setEditMsgMode}
                                    />
                                </div>
                                {dialog.botMessages && (
                                    <div
                                        id={`chat-msg-${dialog.botMessages.id}`}
                                        className={css.branch_message}
                                    >
                                        <ChatMessage
                                            data={dialog.botMessages}
                                            editMsgMode={editMsgMode}
                                            setEditMsgMode={setEditMsgMode}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
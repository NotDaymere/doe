import React, { Dispatch } from "react";

// TipTap extensions
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";

// Shared providers
import { useChatStore } from "src/shared/providers";

// Custom TipTap extensions
import {
    CustomCodeBlock,
    CustomInlineCode,
    CustomSpan,
    Div,
    Formula,
    createHandleTab,
} from "src/components/tiptap-editor/extensions/index";

// Chat components
import { useChatController } from "../..";
import { ChatMessage } from "../ChatMessage";
import AllPlaygrounds from "./assets/AllPlaygrounds/AllPlaygrounds";

// Styles
import css from "./ChatContent.module.less";
import { TalkMode } from "../TalkMode";
import AllBranches from "./assets/AllBranches/AllBranches";
import { ChatMessageDate } from "./assets/ChatMessageData/ChatMessageDate";
import ArrowDownChatScrollIcon from "../../../../shared/icons/ArrowDownChatScroll.icon";
import ChatBranchSection from "./assets/ChatBranchSection/ChatBranchSection";

interface Props {
    editMsgMode: {
        isEditMsgMode: boolean;
        msgId: number | null;
    };
    setEditMsgMode: Dispatch<
        React.SetStateAction<{
            isEditMsgMode: boolean;
            msgId: number | null;
        }>
    >;
}

export const ChatContent: React.FC<Props> = ({ editMsgMode, setEditMsgMode }) => {
    const { chatRef } = useChatController();
    const {
        playground,
        playgroundFullscreen,
        currentBranch,
        messages,
        isCurrentBranchOpen,
        currentBranchDialog,
        setCurrentBranchDialog
    } = useChatStore();
    const [showScrollDownBtn, setShowScrollDownBtn] = React.useState(false);

    const dialogRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    const editor = useEditor({
        extensions: [
            Div,
            Document,
            Text,
            History.configure({
                depth: 100,
                newGroupDelay: 500,
            }),
            Paragraph,
            Bold,
            Italic,
            CustomSpan,
            Formula,
            Underline,
            CustomInlineCode,
            CustomCodeBlock,
            Link.configure({
                autolink: false,
            }),
            createHandleTab(),
        ],
    });

    React.useEffect(() => {
        const currentChat = chatRef.current;
        if (currentBranch?.dialogsMessages && currentChat) {
            currentChat.scrollTo({
                left: currentChat.scrollWidth,
                behavior: "smooth",
            });
        }
    }, [currentBranch?.dialogsMessages]);

    React.useEffect(() => {
        if (
            isCurrentBranchOpen &&
            currentBranchDialog !== null &&
            dialogRefs.current[currentBranchDialog]
        ) {
            dialogRefs.current[currentBranchDialog]?.scrollIntoView({ behavior: "smooth" });
            setCurrentBranchDialog(null);
        }
    }, [isCurrentBranchOpen, currentBranchDialog, setCurrentBranchDialog]);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (chatRef.current) {
            const { scrollTop, clientHeight, scrollHeight } = chatRef.current;
            setShowScrollDownBtn(scrollTop + clientHeight < scrollHeight - 50);
        }
    };

    React.useEffect(() => {
        const currentChat = chatRef.current;
        if (currentChat) {
            currentChat.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (currentChat) {
                currentChat.removeEventListener("scroll", handleScroll);
            }
        };
    }, [chatRef]);

    React.useEffect(() => {
        const currentChat = chatRef.current;
        if (currentChat) {
            const { scrollTop, clientHeight, scrollHeight } = currentChat;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                scrollToBottom();
            }
        }
    }, [messages]);

    return (
        <div
            className={
                playground.open
                    ? playgroundFullscreen
                        ? css.content_playground_fullscreen
                        : css.content_playground
                    : css.content
            }
        >
            <div className={css.content_inner} ref={chatRef}>
                {!(isCurrentBranchOpen && currentBranch && currentBranch.messages) ? (
                    <>
                        {!playgroundFullscreen && (
                            <div className={css.content_top_actions_container}>
                                <AllBranches />
                                <AllPlaygrounds />
                            </div>
                        )}
                        <div className={css.content_chat}>
                            {messages.map((item, index) => (
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
                ) : (
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
                                    <div
                                        ref={(el) => (dialogRefs.current[index] = el)}
                                        className={css.content_chat_branch}
                                    >
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
                )}

                {showScrollDownBtn && (
                    <button
                        className={css.scroll_down_btn}
                        onClick={scrollToBottom}
                    >
                        <ArrowDownChatScrollIcon />
                    </button>
                )}
                <TalkMode targetRef={chatRef} />
            </div>
        </div>
    );
};

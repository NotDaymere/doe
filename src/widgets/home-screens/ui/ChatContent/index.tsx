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
    const { playground, playgroundFullscreen } = useChatStore();
    const { currentBranch, messages } = useChatStore();
    const [showScrollDownBtn, setShowScrollDownBtn] = React.useState(false);

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
            className={playground.open ? (playgroundFullscreen ? css.content_playground_fullscreen : css.content_playground) : css.content}>
            <div className={css.content_inner} ref={chatRef}>
                {!playgroundFullscreen &&
                    <div className={css.content_top_actions_container}>
                        <AllBranches />
                        <AllPlaygrounds />
                    </div>
                }

                <div className={css.content_chat} >
                    {messages.map((item, index) => (
                        <>
                            <ChatMessageDate id={index}/>
                            <ChatMessage
                                data={item}
                                key={item.id}
                                editor={editor}
                                editMsgMode={editMsgMode}
                                setEditMsgMode={setEditMsgMode}
                            />
                        </>
                    ))}
                </div>

                {showScrollDownBtn && (
                    <button
                        className={css.scroll_down_btn}
                        onClick={scrollToBottom}
                    >
                        <ArrowDownChatScrollIcon/>
                    </button>
                )}
                <TalkMode targetRef={chatRef} />
            </div>
        </div>
    );
};

import React, { Dispatch } from "react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";

import { useAppStore, useChatStore } from "src/shared/providers";
import { useEditor } from "@tiptap/react";
import {
    CustomCodeBlock,
    CustomInlineCode,
    CustomSpan,
    Div,
    Formula,
    createHandleTab,
} from "src/components/tiptap-editor/extensions/index";
import { useChatController } from "../..";
import { ChatMessage } from "../ChatMessage";
import AllPlaygrounds from "./assets/AllPlaygrounds/AllPlaygrounds";
import { TalkMode } from "../TalkMode";
import css from "./ChatContent.module.less";
import { ScrollDownButton } from "./assets/ScrollDownButton/ScrollDownButton";
import { ChatRegularView } from "./assets/ContentChatRegularView/ContentChatRegularView";
import { ChatBranchView } from "./assets/ChatBranchView/ChatBranchView";
import Reflections from "./assets/Reflections/Reflections";

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
        getOpenSavedPlaygrounds,
        currentBranch,
        messages,
        isCurrentBranchOpen,
        currentBranchDialog,
        setCurrentBranchDialog,
    } = useChatStore();
    const { talkModeActive} = useAppStore();
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

    const messageNodeMap = useChatStore((state) => state.messageNodeMap);

    const messageQueue = React.useMemo(() => {
        return useChatStore.getState().getMessageQueueFromNode();
    }, [messageNodeMap]);

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
    }, [messageQueue]);

    return (
        <div
            className={
                getOpenSavedPlaygrounds().length > 0
                    ? playgroundFullscreen
                        ? css.content_playground_fullscreen
                        : css.content_playground
                    : css.content
            }
        >
            <div className={css.content_inner} ref={chatRef}>
                {/*{!playgroundFullscreen && <AllPlaygrounds />}*/}
                {/*<div className={css.content_chat} ref={chatRef}>*/}
                {/*    {messages.map((item) => (*/}
                {/*        <ChatMessage*/}
                {/*            data={item}*/}
                {/*            key={item.id}*/}
                {/*            editor={editor}*/}
                {/*            editMsgMode={editMsgMode}*/}
                {/*            setEditMsgMode={setEditMsgMode}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</div>*/}
                {!(isCurrentBranchOpen && currentBranch && currentBranch.messages) ? (
                    <ChatRegularView
                        playgroundFullscreen={playgroundFullscreen}
                        messageQueue={messageQueue}
                        editor={editor}
                        editMsgMode={editMsgMode}
                        setEditMsgMode={setEditMsgMode}
                    />
                ) : (
                    <ChatBranchView
                        currentBranch={currentBranch}
                        editor={editor}
                        editMsgMode={editMsgMode}
                        setEditMsgMode={setEditMsgMode}
                        dialogRefs={dialogRefs}
                    />
                )}

                {!talkModeActive &&
                    <Reflections/>
                }
                {showScrollDownBtn && <ScrollDownButton onClick={scrollToBottom} />}

                <TalkMode targetRef={chatRef} />
            </div>
    </div>
    );
};

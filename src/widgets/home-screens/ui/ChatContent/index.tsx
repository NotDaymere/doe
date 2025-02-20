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

// Styles
import css from "./ChatContent.module.less";

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
    const { currentBranch, messages } = useChatStore();
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

    return (
        <div className={css.content}>
            <div className={css.content_inner}>
                <div className={css.content_chat} ref={chatRef}>
                    {messages.map((item) => (
                        <ChatMessage
                            data={item}
                            key={item.id}
                            editor={editor}
                            editMsgMode={editMsgMode}
                            setEditMsgMode={setEditMsgMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

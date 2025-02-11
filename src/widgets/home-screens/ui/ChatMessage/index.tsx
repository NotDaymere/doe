import React from "react";

// External libraries
import { Editor as EditorTiptap } from "@tiptap/react";
import { MathJax } from "better-react-mathjax";

// Shared types & providers
import { IMessage } from "src/shared/types/Message";
import { useChatStore } from "src/shared/providers";

// Shared components
import { Editor } from "src/shared/components/Editor";

// Icons
import CrossIcon from "src/shared/icons/Cross.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import SendIcon from "src/shared/icons/Send.icon";
import { ReactComponent as Logo } from "src/assets/icons/general-logo.svg";

// Chat message utilities
import { parseContent } from "src/components/chat-message/parseContent";
import { parseTextFormatting } from "src/components/chat-message/parseTextFormatting";
import ChartRenderer from "src/components/chat-message/parseChart";

// Styles
import css from "./ChatMessage.module.less";

interface Props {
    data: IMessage
    editor: EditorTiptap | null;
}

export const ChatMessage: React.FC<Props> = ({
    data
}) => {
    const [isEdit, setEdit] = React.useState(false);
    const [content, setContent] = React.useState(data.content);
    const { editor, setEditor } = useChatStore();
    const parsedContent = parseContent(content);
    const messageRef = React.useRef<HTMLDivElement>(null);

    const toggleEdit = () => {
        setEdit(!isEdit);
    }

    const cancelEdit = () => {
        setContent(data.content);
        setEdit(false);
    }

    if(data.isUser) {
        if(isEdit) {
            return (
                <div className={css.edit}>
                    <Editor 
                        value={content}
                        onChange={setContent}
                        onFocus={setEditor}
                        onBlur={() => setEditor(null)}
                        className={css.edit_editor}
                        classNameEditor={css.edit_editor_editor}
                        placeholder="Edit message"
                    />
                    <div className={css.edit_controls}>
                        <button className={css.edit_controls_cancelBtn} onClick={cancelEdit}>
                            <CrossIcon />
                        </button>
                        <button className={css.edit_controls_saveBtn}>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className={css.input}>
                <button className={css.input_editBtn} onClick={toggleEdit}>
                    <PenIcon />
                </button>
                <div className={css.input_message} 
                    dangerouslySetInnerHTML={{
                        __html: data.content
                    }}
                />
            </div>
        )
    }
    if(data.isCode) {
        return (
            <div className={`${css.chat_message} ${data.isUser ? css.user_message : css.bot_message}`}>
                {!data.isUser && (
                    <div className={css.bot_logo}>
                        <Logo />
                    </div>
                )}
            <div className={css.message_content}>
                <div ref={messageRef}>
                    <MathJax>
                        {parsedContent.map((part, index) => {
                            if (part.type === "text" && !data.isUser) {
                                return (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: parseTextFormatting(part.content),
                                        }}
                                    />
                                );
                            } else if (part.type === "chart" && !data.isUser) {
                                return <ChartRenderer key={index} input={part.content} />;
                            }
                            return (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: parseTextFormatting(part.content),
                                    }}
                                />
                            );
                        })}
                    </MathJax>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className={css.message}>
            {null}
        </div>
    );
};
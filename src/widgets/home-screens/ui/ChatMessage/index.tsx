import React from "react";
import { IMessage } from "src/shared/types/Message";
import PenIcon from "src/shared/icons/Pen.icon";
import { Editor } from "src/shared/components/Editor";
import { useChatStore } from "src/shared/providers";
import CrossIcon from "src/shared/icons/Cross.icon";
import SendIcon from "src/shared/icons/Send.icon";
import css from "./ChatMessage.module.less";

interface Props {
    data: IMessage;
}

export const ChatMessage: React.FC<Props> = ({ data }) => {
    const [isEdit, setEdit] = React.useState(false);
    const [content, setContent] = React.useState(data.content);
    const { setEditor, setMessagesCount, messagesCount } = useChatStore();

    const toggleEdit = () => {
        setEdit(!isEdit);
    };

    const cancelEdit = () => {
        setContent(data.content);
        setEdit(false);
    };

    const handleSendButtonClick = () => {
        setMessagesCount(messagesCount + 1);
    };

    const renderChatMessages = (data: IMessage) => {
        if (data.isUser) {
            if (isEdit) {
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
                            <button
                                className={css.edit_controls_saveBtn}
                                onClick={handleSendButtonClick}
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                );
            }

            return (
                <div className={css.input}>
                    <button className={css.input_editBtn} onClick={toggleEdit}>
                        <PenIcon />
                    </button>
                    <div
                        className={css.input_message}
                        dangerouslySetInnerHTML={{
                            __html: data.content,
                        }}
                    />
                </div>
            );
        }
    };

    return renderChatMessages(data);
};

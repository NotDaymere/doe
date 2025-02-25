import classNames from "classnames";
import React, { useEffect } from "react";
import { IMessage } from "src/shared/types/Message";
import PenIcon from "src/shared/icons/Pen.icon";
import { Editor } from "src/shared/components/Editor";
import { useAppStore, useChatStore } from "src/shared/providers";
import CrossIcon from "src/shared/icons/Cross.icon";
import SendIcon from "src/shared/icons/Send.icon";
import MagicIcon from "src/shared/icons/Magic.icon";
import css from "./ChatMessage.module.less";
import QuickSearch from "../QuickSearch";

interface Props {
    data: IMessage;
}

export const ChatMessage: React.FC<Props> = ({ data }) => {
    const [isEdit, setEdit] = React.useState(false);
    const [content, setContent] = React.useState(data.content);
    const { setPlayground, playground } = useAppStore();
    const {
        editor,
        setEditor,
        setMessagesCount,
        messagesCount,
        showQuickSearch,
        setShowQuickSearch,
    } = useChatStore();

    const toggleEdit = () => {
        setEdit(!isEdit);
    };

    const cancelEdit = () => {
        setContent(data.content);
        setEdit(false);
    };

    const handleStepsButtonClick = () => {
        setPlayground({
            ...playground,
            type: "source",
            open: !playground.open,
        });
    };

    const handleSendButtonClick = () => {
        setMessagesCount(messagesCount + 1);
    };

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "f") {
                event.preventDefault();
                setShowQuickSearch(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

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

    return (
        <div>
            <div className={css.message}>ChatMessage</div>
            {!data.isUser && (
                <>
                    <div className={css.actions}>
                        <button
                            className={classNames(css.steps_button, {
                                [css.active_steps_button]: playground.open,
                            })}
                            onClick={handleStepsButtonClick}
                        >
                            <MagicIcon /> See all steps
                        </button>
                    </div>
                </>
            )}
            {showQuickSearch && (
                <div className={css.quickSearch}>
                    <QuickSearch onClose={setShowQuickSearch} />
                </div>
            )}
        </div>
    );
};

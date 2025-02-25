import React, { useState } from "react";
import clsx from "clsx";
import { Editor } from "src/shared/components/Editor";
import { Editor as IEditor } from "@tiptap/react";
import { InputDynamicWidth } from "src/shared/components/InputDynamicWidth";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import CallVoiceIcon from "src/shared/icons/CallVoice.icon";
import MicrophoneIcon from "src/shared/icons/Microphone.icon";
import ReplyIcon from "src/shared/icons/Reply.icon";
import ScreenShareIcon from "src/shared/icons/ScreenShare.icon";
import { useChatStore } from "src/shared/providers";
import { MagicMenu, useDragFile, usePanel, usePrompt } from "../..";
import { FileList } from "src/shared/components/FileList";
import css from "./ChatPanel.module.less";
import UploadIcon from "src/shared/icons/Upload.icon";
import Hints from "../WelcomeScreen/Hints";
import HintsTyping from "../WelcomeScreen/HintsTyping";

export const ChatPanel: React.FC = () => {
    const { text, files, setText, setFiles } = usePanel();
    const { setEditor, setMessagesCount, messagesCount } = useChatStore();
    const {
        drag,
        dragTarget,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        handleDragStart,
        handleDragOver,
        handleDragCancel,
    } = useDragFile({
        onUploadFiles(uploadFiles) {
            setFiles([...files, ...uploadFiles]);
        },
    });

    const [showHints, setShowHints] = useState({ hints: messagesCount === 0, typingHints: false });

    const prompt = usePrompt();

    const handleSendButtonClick = () => {
        setMessagesCount(messagesCount + 1);
    };

    const handleFocusEditor = (editor: IEditor | null) => {
        setEditor(editor);
        setShowHints({ hints: false, typingHints: true });
    };

    const handleBlurEditor = () => {
        setEditor(null);
        setShowHints({ hints: false, typingHints: false });
    };

    return (
        <div
            className={css.panel}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragCancel}
        >
            <div
                className={clsx(css.panel_wrapper, dragTarget && css._over)}
                onDragOver={handleDragOverTarget}
                onDrop={handleDragDropTarget}
                onDragLeave={handleDragLeaveTarget}
            >
                {prompt.active && (
                    <div className={css.panel_prompt}>
                        <ReplyIcon className={css.panel_prompt_icon} />
                        <p>
                            Call{" "}
                            <InputDynamicWidth
                                className={css.panel_prompt_input}
                                value={prompt.number}
                                onChange={prompt.setNumber}
                                placeholder="number"
                            />{" "}
                            using Doe
                        </p>
                    </div>
                )}
                {files.length > 0 && (
                    <FileList className={css.panel_files} files={files} onChange={setFiles} />
                )}
                {drag && (
                    <div className={css.panel_drag}>
                        <p className={css.panel_drag_text}>
                            Upload files, folders, text content, or code here.
                        </p>
                        <button className={css.panel_drag_btn}>
                            <UploadIcon />
                        </button>
                    </div>
                )}
                <div className={css.panel_main}>
                    <MagicMenu
                        onDispatchDoe={() => prompt.togglePrompt(true)}
                        onUploadFiles={(values) => setFiles([...files, ...values])}
                    />
                    <Editor
                        readOnly={prompt.active}
                        value={text}
                        onChange={setText}
                        onFocus={handleFocusEditor}
                        onBlur={handleBlurEditor}
                        className={css.panel_editor}
                        classNameEditor={css.panel_editor_editor}
                        placeholder="Ask Doe anything you’d like about the world..."
                    />
                    <button className={css.panel_button} disabled>
                        <ScreenShareIcon />
                    </button>
                    <button className={css.panel_button}>
                        <MicrophoneIcon />
                    </button>
                    {!prompt.active ? (
                        <button className={css.panel_submitBtn} onClick={handleSendButtonClick}>
                            Send <ArrowUpIcon />
                        </button>
                    ) : (
                        <button className={css.panel_callBtn}>
                            <CallVoiceIcon />
                        </button>
                    )}
                </div>
                {showHints.hints && messagesCount === 0 && (
                    <div className={css.hint}>
                        <Hints onSelect={setText} />
                    </div>
                )}
                {showHints.typingHints && messagesCount === 0 && (
                    <div className={css.typingHints}>
                        <HintsTyping onSelect={setText} />
                    </div>
                )}
            </div>
        </div>
    );
};

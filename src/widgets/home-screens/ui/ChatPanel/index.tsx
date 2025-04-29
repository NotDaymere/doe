import clsx from "clsx";
import React from "react";
import { Editor } from "src/shared/components/Editor";
import { FileList } from "src/shared/components/FileList";
import { InputDynamicWidth } from "src/shared/components/InputDynamicWidth";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import CallVoiceIcon from "src/shared/icons/CallVoice.icon";
import MicrophoneIcon from "src/shared/icons/Microphone.icon";
import ReplyIcon from "src/shared/icons/Reply.icon";
import ScreenShareIcon from "src/shared/icons/ScreenShare.icon";
import UploadIcon from "src/shared/icons/Upload.icon";
import { useChatStore } from "src/shared/providers";
import { MagicMenu, useDragFile, usePanel, usePrompt } from "../..";
import css from "./ChatPanel.module.less";

export const ChatPanel: React.FC = () => {
    const { text, files, setText, setFiles } = usePanel();
    const { setEditor } = useChatStore();
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

    const prompt = usePrompt();

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
                        onFocus={setEditor}
                        onBlur={() => setEditor(null)}
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
                        <button className={css.panel_submitBtn}>
                            Send <ArrowUpIcon />
                        </button>
                    ) : (
                        <button className={css.panel_callBtn}>
                            <CallVoiceIcon />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

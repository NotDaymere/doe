import React from "react";
import clsx from "clsx";
import { Editor } from "src/shared/components/Editor";
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
import { testTextAndCharts } from "src/components/chat-message/mockData";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useChatContext } from "../../lib/hooks/ChatContext";
import CloseIcon from "../../../../shared/icons/Close.icon";
import QuestionCodeMessage from "./assets/QuestionCodeMessage/QuestionCodeMessage";
import HammerIcon from "src/shared/icons/HammerIcon";
import ChatResponseStopIcon from "../../../../shared/icons/ChatResponseStopIcon";
import UploadFilesIcon from "../../../../shared/icons/UploadFiles.icon";
import HandCursorIcon from "../../../../shared/icons/HandCursor.icon";
import BranchIcon from "../../../../shared/icons/Branch.icon";
import UploadFilesProgressIcon from "../../../../shared/icons/UploadFilesProgress.icon";
import { IMessage } from "src/shared/types/Message";

export const ChatPanel: React.FC = () => {
    const { text, files, setText, setFiles, reset } = usePanel();
    const {
        setEditor,
        isCreateBranchChatMode,
        setIsCreateBranchChatMode,
        addSavedBranch,
        setCurrentBranch,
        isCurrentBranchOpen,
        addDialogToCurrentBranch,
        currentBranch
    } = useChatStore();

    const [clearContent, setClearContent] = React.useState(false);
    const { playground, questionCodeMessage, playgroundFullscreen } = useChatStore();
    const [isLoading, setIsLoading] = React.useState(false);
    const [loadingFile, setLoadingFile] = React.useState<string | undefined>(undefined);

    const {
        drag,
        dragTarget,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        handleDragStart,
        handleDragOver,
        handleDragCancel
    } = useDragFile({
        onUploadFiles(uploadFiles) {
            setFiles([...files, ...uploadFiles]);
        },
    });

    const prompt = usePrompt();
    const { selectedText, isShowReferencePanel, setIsShowReferencePanel } = useChatContext();

    const placeholder = React.useMemo(() => {
        if (isCreateBranchChatMode) {
            return "Create new branch";
        }
        if (playgroundFullscreen) {
            return "Ask Doe anything";
        }
        return "Ask Doe anything you’d like about the world...";
    }, [isCreateBranchChatMode, playgroundFullscreen]);

    const handleSend = () => {
        setIsLoading(true);

        const userMessage: IMessage = {
            id: Date.now(),
            isUser: true,
            isCode: false,
            content: text,
            files: files,
        };

        const botMessage: IMessage = {
            id: Date.now() + 1,
            isUser: false,
            isCode: true,
            content: testTextAndCharts,
        };

        const branchDialog = {
            userRequest: userMessage,
            botMessages: botMessage
        };

        if (isCurrentBranchOpen && currentBranch) {
            reset();
            setClearContent(true);
            setTimeout(() => {
                addDialogToCurrentBranch(branchDialog);
                setIsLoading(false);
            }, 3000);
        } else {
            const chatStore = useChatStore.getState();
            const lastNode = chatStore.getLastCurrentVersionMessageNode();
            chatStore.addMessageNode(lastNode, userMessage);

            if (isCreateBranchChatMode) {
                const newBranch = addSavedBranch(text, [userMessage], [branchDialog], userMessage.id);
                setCurrentBranch(newBranch);
                setIsCreateBranchChatMode(false);
            }

            reset();
            setClearContent(true);

            setTimeout(() => {
                const lastNode = chatStore.getLastCurrentVersionMessageNode();
                chatStore.addMessageNode(lastNode, botMessage);
                setIsLoading(false);
            }, 3000);
        }
    };

    const handleChangeEditor = (e: string) => {
        setClearContent(false);
        setText(e);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={playground.open ? (playgroundFullscreen ? css.panel_playground_fullscreen : css.panel_playground) : css.panel}
             onDragStart={handleDragStart}
             onDragOver={handleDragOver}
             onDragLeave={handleDragCancel}
        >
            {questionCodeMessage && <QuestionCodeMessage questionCodeMessage={questionCodeMessage} />}
            <div
                className={clsx(css.panel_wrapper, dragTarget && css._over)}
                onDragOver={handleDragOverTarget}
                onDrop={handleDragDropTarget}
                onDragLeave={handleDragLeaveTarget}
            >
                {isShowReferencePanel && (
                    <div className={css.panel_prompt}>
                        <ReplyIcon className={css.panel_prompt_icon} />
                        <div className={css.reference_panel}>
                            <button onClick={() => setIsShowReferencePanel(false)}><CloseIcon /></button>
                            <div className={css.referencePanelContent}>{selectedText}</div>
                        </div>
                    </div>
                )}
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
                    <div className={css.panel_files_mask}>
                        <FileList
                            className={css.panel_files}
                            files={files}
                            onChange={setFiles}
                            onLoadingStatusChange={setLoadingFile}
                        />
                    </div>
                )}
                {loadingFile && (() => {
                    const [fileName, progressStr] = loadingFile.split("|||");
                    const progress = Number(progressStr) || 0;
                    return (
                        <div className={css.panel_uploading_files} key={fileName}>
                            <div className={css.uploading_file}>
                                <div className={css.panel_uploading_files_icon}>
                                    <UploadFilesProgressIcon />
                                </div>
                                <div className={css.panel_uploading_files_name_and_progressbar}>
                                    <div className={css.panel_uploading_files_name_and_progress}>
                                        <span>{fileName}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className={css.progressBar}>
                                        <div
                                            className={css.progressFill}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}
                {drag && (
                    <div className={css.panel_drag}>
                        <p className={css.panel_drag_text}>Upload files, folders, text content, or code here.</p>
                        <div className={css.panel_drag_background}>
                            <div className={css.panel_drag_upload_files_wrapper}>
                                <UploadFilesIcon width={14} height={20} />
                                <div className={css.panel_drag_hand_cursor_img}>
                                    <HandCursorIcon />
                                </div>
                            </div>
                        </div>
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
                    {isCreateBranchChatMode && (
                        <div className={css.panel_branchIcon}>
                            <BranchIcon width={16} height={16} fill={"currentColor"} />
                        </div>
                    )}
                    <Editor
                        key={placeholder}
                        readOnly={prompt.active}
                        value={text}
                        onChange={handleChangeEditor}
                        handleKeyDown={handleKeyPress}
                        onFocus={setEditor}
                        onBlur={() => setEditor(null)}
                        className={css.panel_editor}
                        classNameEditor={css.panel_editor_editor}
                        clearContent={clearContent}
                        placeholder={placeholder}
                    />
                    <SwitchTransition>
                        {isLoading ? (
                            <CSSTransition
                                in={isLoading}
                                key="loading"
                                timeout={{ enter: 300, exit: 300 }}
                                classNames={{
                                    enter: css.fadeEnter,
                                    enterActive: css.fadeEnterActive,
                                    exit: css.fadeExit,
                                    exitActive: css.fadeExitActive
                                }}
                                mountOnEnter
                                unmountOnExit
                            >
                                <button className={css.panel_loadingBtn}>
                                    <ChatResponseStopIcon fill="currentColor" />
                                </button>
                            </CSSTransition>
                        ) : (
                            <CSSTransition
                                in={!isLoading}
                                key="ready"
                                timeout={{ enter: 300, exit: 300 }}
                                classNames={{
                                    enter: css.fadeEnter,
                                    enterActive: css.fadeEnterActive,
                                    exit: css.fadeExit,
                                    exitActive: css.fadeExitActive
                                }}
                                mountOnEnter
                                unmountOnExit
                            >
                                <>
                                    <button className={css.panel_button} disabled>
                                        <ScreenShareIcon />
                                    </button>
                                    <button className={css.panel_button}>
                                        <MicrophoneIcon />
                                    </button>
                                    {!prompt.active ? (
                                        !questionCodeMessage ? (
                                            <button className={css.panel_submitBtn} onClick={handleSend}>
                                                Send <ArrowUpIcon />
                                            </button>
                                        ) : (
                                            <button className={css.panel_hammerBtn}>
                                                <HammerIcon />
                                            </button>
                                        )
                                    ) : (
                                        <button className={css.panel_callBtn}>
                                            <CallVoiceIcon />
                                        </button>
                                    )}
                                </>
                            </CSSTransition>
                        )}
                    </SwitchTransition>
                </div>
            </div>
        </div>
    );
};

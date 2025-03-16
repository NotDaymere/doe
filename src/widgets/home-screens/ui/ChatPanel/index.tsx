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
import { FileListForUpload } from "src/shared/components/FileList/FileListForUpload";
import css from "./ChatPanel.module.less";
import UploadIcon from "src/shared/icons/Upload.icon";
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
import SendTableDataIcon from "../../../../shared/icons/SendTableData.icon";
import { FileWithId } from "../../lib/helpers/LinkToFileTransformer";

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
        currentBranch,
        doMessageReply,
        cancelReply,
        isReplyLoading,
        getLastCurrentVersionMessageNode,
        addMessageNode,
        setIsCurrentBranchOpen,
        isHyperlinkInputOpen,
        setIsHyperlinkInputOpen,
    } = useChatStore();

    const [clearContent, setClearContent] = React.useState(false);
    const { playground, questionCodeMessage, playgroundFullscreen } = useChatStore();
    const [loadingFile, setLoadingFile] = React.useState<string | undefined>(undefined);

    const { isTablePromptVisible, setIsTablePromptVisible } = useChatStore();
    const { selectedArea } = useChatStore();
    const panelRef = React.useRef<HTMLDivElement>(null);

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

    const editorRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (isCreateBranchChatMode && editorRef.current) {
            (editorRef.current as HTMLDivElement).focus();
        }
    }, [isCreateBranchChatMode]);

    const [showLinkInput, setShowLinkInput] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState("");
    const [savedRange, setSavedRange] = React.useState<Range | null>(null);

    const [linkInputPosition, setLinkInputPosition] = React.useState({ top: 0, left: 0 });
    const lastMouseEventRef = React.useRef<MouseEvent | null>(null);

    const skipPositionUpdate = React.useRef(false);

    React.useEffect(() => {
        const handleMouseUp = (e: MouseEvent) => {
            lastMouseEventRef.current = e;
            updateLinkInputPosition();
        };

        const handleSelectionChange = () => {
            updateLinkInputPosition();
        };

        function updateLinkInputPosition() {
            if (skipPositionUpdate.current) return;

            const selection = window.getSelection();
            if (!selection) return;
            const selectionText = selection.toString().trim();
            if (selectionText === "") return;

            const range = selection.getRangeAt(0);
            const rects = range.getClientRects();
            if (rects.length === 0) return;
            const lastRect = rects[rects.length - 1];
            const selectionTop = lastRect.bottom + window.scrollY;
            const selectionLeft = lastRect.right + window.scrollX;
            const maxDistance = 30;
            const offsetY = -70;
            const offsetX = -20;

            if (lastMouseEventRef.current) {
                const candidateTop = lastMouseEventRef.current.pageY;
                const candidateLeft = lastMouseEventRef.current.pageX;
                const topDiff = candidateTop - selectionTop;
                const clampedTop =
                    Math.abs(topDiff) > maxDistance
                        ? selectionTop + (topDiff > 0 ? maxDistance : -maxDistance)
                        : candidateTop;
                setLinkInputPosition({ top: clampedTop + offsetY, left: candidateLeft + offsetX });
            } else {
                setLinkInputPosition({ top: selectionTop + offsetY, left: selectionLeft + offsetX });
            }
        }

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("selectionchange", handleSelectionChange);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, []);

    const handleTextSelection = React.useCallback(() => {
        const selection = window.getSelection();
        if (!selection) return;

        const selectedText = selection.toString();
        if (selectedText.trim().length > 0) {
            const range = selection.getRangeAt(0);
            setSavedRange(range);
            setShowLinkInput(true);
        }
    }, []);

    const handleApplyLink = React.useCallback(async () => {
        if (!savedRange || linkUrl.trim().length === 0) {
            setShowLinkInput(false);
            return;
        }

        skipPositionUpdate.current = true;

        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
        document.execCommand("createLink", false, linkUrl);

        setTimeout(() => {
            window.getSelection()?.removeAllRanges();
            if (editorRef.current && typeof (editorRef.current as HTMLDivElement).blur === "function") {
                (editorRef.current as HTMLDivElement).blur();
            } else {
                if (document.activeElement && typeof (document.activeElement as HTMLElement).blur === "function") {
                    (document.activeElement as HTMLElement).blur();
                }
            }
        }, 100);

        let fileName = "unknown";
        try {
            const urlObj = new URL(linkUrl);
            fileName = urlObj.href || fileName;
        } catch {}

        let blob;
        try {
            const response = await fetch(linkUrl);
            if (!response.ok) {
                throw new Error(`Non-200 status: ${response.status}`);
            }
            blob = await response.blob();
        } catch (error) {
            console.error("Failed to fetch content from the link (possibly a CORS issue).", error);
            blob = new Blob([`Failed to fetch actual content from the link:\n${linkUrl}`], { type: "text/plain" });
        }

        const fileWithId = Object.assign(new File([blob], fileName, { type: blob.type }), {
            id: `${Date.now()}-${Math.random()}`,
        }) as FileWithId;

        setFiles([...files, fileWithId]);

        setIsHyperlinkInputOpen(false);
        setShowLinkInput(false);
        setLinkUrl("");
        setSavedRange(null);

        setTimeout(() => {
            skipPositionUpdate.current = false;
        }, 300);
    }, [savedRange, linkUrl, files, setFiles, setIsHyperlinkInputOpen]);

    const handleSend = async () => {
        const userMessage: IMessage = {
            id: Date.now(),
            isUser: true,
            isCode: false,
            content: text,
            files: files,
        };

        reset();
        setClearContent(true);

        if (isCreateBranchChatMode) {
            const reply = await doMessageReply();
            const branchDialog = {
                userRequest: userMessage,
                botMessages: reply,
            };
            const newBranch = addSavedBranch(text, [userMessage], [branchDialog], userMessage.id);
            setCurrentBranch(newBranch);
            setIsCreateBranchChatMode(false);
            setIsCurrentBranchOpen(true);
        } else if (isCurrentBranchOpen && currentBranch) {
            const reply = await doMessageReply();
            const lastNodeForUserMessage = getLastCurrentVersionMessageNode();
            addMessageNode(lastNodeForUserMessage, userMessage);
            const branchDialog = {
                userRequest: userMessage,
                botMessages: reply,
            };
            addDialogToCurrentBranch(branchDialog);
        } else {
            const lastNodeForUserMessage = getLastCurrentVersionMessageNode();
            addMessageNode(lastNodeForUserMessage, userMessage);
            reset();
            setClearContent(true);
            const reply = await doMessageReply();
            const lastNodeForReply = getLastCurrentVersionMessageNode();
            addMessageNode(lastNodeForReply, reply);
        }
    };

    const handleChangeEditor = (value: string) => {
        setClearContent(false);
        setText(value);
    };

    const normalizeUrl = (url: string): string => {
        try {
            return new URL(url, window.location.href).toString();
        } catch (error) {
            return url.trim();
        }
    };

    const cleanUrl = (url: string): string => {
        try {
            const decodedUrl = decodeURIComponent(url);

            const match = decodedUrl.match(/^(https?:\/\/[^\s<]+)/i);
            const cleaned = match ? match[0] : decodedUrl;

            return new URL(cleaned, window.location.href).toString();
        } catch (error) {
            return url.trim();
        }
    };

    const processLinksFromText = async () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const anchors = doc.querySelectorAll("a");
        let newFiles: FileWithId[] = [];

        const anchorLinks = new Set<string>();

        for (const anchor of Array.from(anchors)) {
            let link = anchor.getAttribute("href");
            if (!link) continue;

            link = cleanUrl(link);

            if (files.some((file) => file.name === link) || anchorLinks.has(link)) {
                continue;
            }

            anchorLinks.add(link);

            let blob;
            try {
                const response = await fetch(link);
                if (!response.ok) {
                    throw new Error(`Non-200 status: ${response.status}`);
                }
                blob = await response.blob();
            } catch (error) {
                console.error("Failed to fetch content from link (possibly due to CORS).", error);
                blob = new Blob([`Failed to fetch content from link:\n${link}`], {
                    type: "text/plain",
                });
            }

            const fileWithId = Object.assign(
                new File([blob], link, { type: blob.type }),
                { id: `${Date.now()}-${Math.random()}` }
            ) as FileWithId;

            newFiles.push(fileWithId);
        }

        const urlRegex = /(https?:\/\/[^\s'"]+)/gi;
        const plainLinks = text.match(urlRegex) || [];

        const uniquePlainLinks = new Set(plainLinks.map(link => cleanUrl(link)));

        for (const link of uniquePlainLinks) {

            if (files.some((file) => file.name === link) || anchorLinks.has(link)) {
                continue;
            }

            let blob;
            try {
                const response = await fetch(link);
                if (!response.ok) {
                    throw new Error(`Non-200 status: ${response.status}`);
                }
                blob = await response.blob();
            } catch (error) {
                console.error("Failed to fetch content from link (possibly due to CORS).", error);
                blob = new Blob([`Failed to fetch content from link:\n${link}`], {
                    type: "text/plain",
                });
            }

            const fileWithId = Object.assign(
                new File([blob], link, { type: blob.type }),
                { id: `${Date.now()}-${Math.random()}` }
            ) as FileWithId;

            newFiles.push(fileWithId);
        }

        if (newFiles.length > 0) {
            setFiles([...files, ...newFiles]);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            await processLinksFromText();
            return;
        }
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await handleSend();
        }
    };

    const handleStopReply = () => {
        cancelReply();
    };

    return (
        <div
            ref={panelRef}
            className={
                playground.open
                    ? playgroundFullscreen
                        ? css.panel_playground_fullscreen
                        : css.panel_playground
                    : css.panel
            }
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
                            <button onClick={() => setIsShowReferencePanel(false)}>
                                <CloseIcon />
                            </button>
                            <div className={css.referencePanelContent}>{selectedText}</div>
                        </div>
                    </div>
                )}

                {isTablePromptVisible && (
                    <div className={css.panel_prompt}>
                        <ReplyIcon className={css.panel_prompt_icon} />
                        <div className={css.table_prompt_panel}>
                            <button onClick={() => setIsTablePromptVisible(false)}>
                                <CloseIcon />
                            </button>
                            <div className={css.referencePanelContent}>
                                {selectedArea.type} {selectedArea.value}
                            </div>
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
                        <FileListForUpload
                            className={css.panel_files}
                            files={files}
                            onChange={setFiles}
                            onLoadingStatusChange={setLoadingFile}
                        />
                    </div>
                )}
                {loadingFile &&
                    (() => {
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
                        <p className={css.panel_drag_text}>
                            Upload files, folders, text content, or code here.
                        </p>
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
                        ref={editorRef}
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
                        onMouseUp={handleTextSelection}
                    />

                    <CSSTransition
                        in={showLinkInput && isHyperlinkInputOpen}
                        timeout={300}
                        classNames={{
                            enter: css.linkEnter,
                            enterActive: css.linkEnterActive,
                            exit: css.linkExit,
                            exitActive: css.linkExitActive,
                        }}
                        unmountOnExit
                    >
                        <div
                            className={css.hyperlink_form}
                            style={{
                                position: "fixed",
                                top: linkInputPosition.top,
                                left: linkInputPosition.left,
                                zIndex: 1000,
                            }}
                        >
                            <input
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="Enter URL"
                                onFocus={() => {
                                    window.getSelection()?.removeAllRanges();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        (e.currentTarget as HTMLInputElement).blur();
                                        handleApplyLink();
                                        setTimeout(() => {
                                            window.getSelection()?.removeAllRanges();
                                            if (
                                                document.activeElement &&
                                                typeof (document.activeElement as HTMLElement).blur === "function"
                                            ) {
                                                (document.activeElement as HTMLElement).blur();
                                            }
                                        }, 100);
                                    }
                                }}
                            />
                        </div>
                    </CSSTransition>

                    <SwitchTransition>
                        {isReplyLoading ? (
                            <CSSTransition
                                in={isReplyLoading}
                                key="loading"
                                timeout={{ enter: 300, exit: 300 }}
                                classNames={{
                                    enter: css.fadeEnter,
                                    enterActive: css.fadeEnterActive,
                                    exit: css.fadeExit,
                                    exitActive: css.fadeExitActive,
                                }}
                                mountOnEnter
                                unmountOnExit
                            >
                                <button className={css.panel_loadingBtn}>
                                    <div className={css.chat_response_stop_icon}>
                                        <ChatResponseStopIcon
                                            fill="currentColor"
                                            onClick={handleStopReply}
                                        />
                                    </div>
                                </button>
                            </CSSTransition>
                        ) : (
                            <CSSTransition
                                in={!isReplyLoading}
                                key="ready"
                                timeout={{ enter: 300, exit: 300 }}
                                classNames={{
                                    enter: css.fadeEnter,
                                    enterActive: css.fadeEnterActive,
                                    exit: css.fadeExit,
                                    exitActive: css.fadeExitActive,
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

                                    {isTablePromptVisible ? (
                                        <button className={css.panel_send_table_data_btn}>
                                            <SendTableDataIcon fill="currentColor" />
                                        </button>
                                    ) : !prompt.active ? (
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

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Editor } from "src/shared/components/Editor";
import { Editor as IEditor } from "@tiptap/react";
import { InputDynamicWidth } from "src/shared/components/InputDynamicWidth";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import CallVoiceIcon from "src/shared/icons/CallVoice.icon";
import MicrophoneIcon from "src/shared/icons/Microphone.icon";
import ReplyIcon from "src/shared/icons/Reply.icon";
import ScreenShareIcon from "src/shared/icons/ScreenShare.icon";
import { useAppStore, useChatStore } from "src/shared/providers";
import { MagicMenu, useDragFile, usePanel, usePrompt } from "../..";
import { FileListForUpload } from "src/shared/components/FileList/FileListForUpload";
import css from "./ChatPanel.module.less";
import UploadIcon from "src/shared/icons/Upload.icon";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { useChatContext } from "../../lib/hooks/ChatContext";
import QuestionCodeMessage from "./assets/QuestionCodeMessage/QuestionCodeMessage";
import HammerIcon from "src/shared/icons/HammerIcon";
import ChatResponseStopIcon from "../../../../shared/icons/ChatResponseStopIcon";
import UploadFilesIcon from "../../../../shared/icons/UploadFiles.icon";
import HandCursorIcon from "../../../../shared/icons/HandCursor.icon";
import BranchIcon from "../../../../shared/icons/Branch.icon";
import UploadFilesProgressIcon from "../../../../shared/icons/UploadFilesProgress.icon";
import { IMessage } from "src/shared/types/Message";
import CloseIcon from "../../../../shared/icons/Close.icon";
import { Close } from "src/shared/icons/Close";
import SendTableDataIcon from "../../../../shared/icons/SendTableData.icon";
import { FileWithId } from "../../lib/helpers/LinkToFileTransformer";
import Hints from "../WelcomeScreen/Hints";
import HintsTyping from "../WelcomeScreen/HintsTyping";
import ShareScreenInfo from "../ShareScreen/ShareScreenInfo";
import CableIcon from "src/shared/icons/Cable.icon";
import BluetoothIcon from "src/shared/icons/Bluetooth.icon";
import ScreenIcon from "src/shared/icons/Screen.icon";
import { IScreenSharePopup, ShareType } from "src/shared/types/ScreenShare";
import ScreenShareMenu from "../ShareScreen/ScreenShareMenu";
import { Simulate } from "react-dom/test-utils";
import classNames from "classnames";

interface IShareScreen {
    expandedButtons: boolean;
    shareType: ShareType | null;
}

export const SCREEN_SHARE_CONFIG: IScreenSharePopup = {
    shareScreen: {
        title: "Share your computer screen",
        description: `<span>Start broadcasting your desktop device screen. You can continue working with Doe with full functionality while the screen is being broadcast and Doe is interacting with the screen content.</span>`,
        label: "Share computer screen",
        icon: <ScreenIcon width={14} height={12} className={css.screenShareIcon} />,
        videoUrl: "/screen-share/shere_screen_onboarding_3_1.mp4",
    },
    shareViaBluetooth: {
        title: "Share your mobile screen",
        description: `<span>To switch to sharing mode, connect your mobile device to your computer <strong>via a cable</strong>.</span>
            <span>You can also connect your device <strong>via Bluetooth</strong> if a cable connection is not available.<span/>`,
        label: "Share Mobile screen via Bluetooth",
        icon: <BluetoothIcon width={15} height={15} className={css.screenShareBluetoothIcon} />,
        videoUrl: "/screen-share/bluetooth_connection_success.MP4",
    },
    shareViaCabel: {
        title: "Share your mobile screen",
        description: `<span>To switch to sharing mode, connect your mobile device to your computer <strong>via a cable.</strong></span><span>You can also connect your device <strong>via Bluetooth</strong> if a cable connection is not available. <span/>`,
        label: "Share Mobile screen via a cable",
        icon: <CableIcon width={21} height={5} className={css.screenShareIcon} />,
        videoUrl: "/screen-share/usb_connection_success.MP4",
    },
    connectionFailed: {
        title: "Connection failed",
        description: `<span>Check if the connection method you selected is correct and try again. Or change the connection method to another.<span/>`,
        actions: true,
        videoUrl: "",
    },
    connectionSuccessful: {
        title: "Connection successful!",
        description: "You can now continue working in screen sharing mode with Doe.",
        videoUrl: "",
    },
};

export const ChatPanel: React.FC = () => {
    const { text, files, setText, setFiles, reset } = usePanel();
    const messages = useChatStore((state) => state.messages);
    const [clearContent, setClearContent] = React.useState(false);
    const { playground, questionCodeMessage, playgroundFullscreen } = useChatStore();
    const {
        setEditor,
        setMessages,
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

        getMessageQueueFromNode,
        setMessagesCount,
        messagesCount,
        disableButtons,
        setDisableButtons,
    } = useChatStore();

    const [loadingFile, setLoadingFile] = React.useState<string | undefined>(undefined);

    const {
        isTablePromptVisible,
        setIsTablePromptVisible,
        isHyperlinkInputOpen,
        setIsHyperlinkInputOpen,
    } = useAppStore();
    const { selectedArea } = useAppStore();
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

    const panelWrapperRef = useRef<HTMLDivElement>(null);
    const [showHints, setShowHints] = useState({ hints: messagesCount === 0, typingHints: false });
    const [shareScreenConfig, setShareScreenConfig] = useState<IShareScreen>({
        expandedButtons: false,
        shareType: null,
    });

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
    const linkInputRef = React.useRef<HTMLInputElement | null>(null);
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
            const selection = window.getSelection();
            const isLinkInputFocused = document.activeElement === linkInputRef.current;

            if (!selection || (selection.toString().trim() === "" && !isLinkInputFocused)) {
                setShowLinkInput(false);
                setIsHyperlinkInputOpen(false);
                setSavedRange(null);
                setLinkUrl("");
                return;
            }

            if (selection && selection.toString().trim() !== "") {
                updateLinkInputPosition();
            }
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
                setLinkInputPosition({
                    top: selectionTop + offsetY,
                    left: selectionLeft + offsetX,
                });
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

    const handleClickOutside = (event: MouseEvent) => {
        if (panelWrapperRef.current && !panelWrapperRef.current.contains(event.target as Node)) {
            setShowHints({ ...showHints, typingHints: false });
        }
    };
    const onSendMessage = (text: string) => {
        if (!text || text === "<p></p>") return;

        setMessagesCount(messagesCount + 1);
        setDisableButtons(false);

        setMessages([
            ...messages,
            {
                id: messages.length,
                content: text,
                files: [],
                isCode: false,
                isUser: true,
            },
        ]);
        setText("");
    };
    const onShareScreenClickOutside = () => {
        setShareScreenConfig({
            shareType: null,
            expandedButtons: false,
        });
    };
    const handleBlurEditor = () => {
        setEditor(null);
    };
    const handleFocusEditor = (editor: IEditor | null) => {
        setEditor(editor);
        setShowHints({ hints: false, typingHints: true });
    };

    const isValidUrl = (url: string): { isValid: boolean; normalizedUrl: string } => {
        const trimmedUrl = url.trim();

        try {
            const urlObj = new URL(trimmedUrl);
            if (["http:", "https:"].includes(urlObj.protocol)) {
                return { isValid: true, normalizedUrl: trimmedUrl };
            }
            return { isValid: false, normalizedUrl: trimmedUrl };
        } catch {}

        const withHttps = `https://${trimmedUrl}`;
        try {
            const urlObj = new URL(withHttps);
            if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmedUrl)) {
                return { isValid: true, normalizedUrl: withHttps };
            }
            return { isValid: false, normalizedUrl: trimmedUrl };
        } catch {}

        const withHttp = `http://${trimmedUrl}`;
        try {
            const urlObj = new URL(withHttp);
            if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmedUrl)) {
                return { isValid: true, normalizedUrl: withHttp };
            }
        } catch {}

        return { isValid: false, normalizedUrl: trimmedUrl };
    };

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

        const { isValid, normalizedUrl } = isValidUrl(linkUrl);
        if (!isValid) {
            alert("Please enter a valid URL (e.g., example.com or https://example.com)");
            setShowLinkInput(false);
            setIsHyperlinkInputOpen(false);
            setLinkUrl("");
            setSavedRange(null);
            window.getSelection()?.removeAllRanges();
            setTimeout(() => {
                skipPositionUpdate.current = false;
            }, 300);
            return;
        }

        document.execCommand("createLink", false, normalizedUrl);

        setTimeout(() => {
            window.getSelection()?.removeAllRanges();
            if (
                editorRef.current &&
                typeof (editorRef.current as HTMLDivElement).blur === "function"
            ) {
                (editorRef.current as HTMLDivElement).blur();
            } else {
                if (
                    document.activeElement &&
                    typeof (document.activeElement as HTMLElement).blur === "function"
                ) {
                    (document.activeElement as HTMLElement).blur();
                }
            }
        }, 100);

        let fileName = "unknown";
        try {
            const urlObj = new URL(normalizedUrl);
            fileName = urlObj.href || fileName;
        } catch {}

        let blob;
        try {
            const response = await fetch(normalizedUrl);
            if (!response.ok) {
                throw new Error(`Non-200 status: ${response.status}`);
            }
            blob = await response.blob();
        } catch (error) {
            console.error("Failed to fetch content from the link (possibly a CORS issue).", error);
            blob = new Blob([`Failed to fetch actual content from the link:\n${normalizedUrl}`], {
                type: "text/plain",
            });
        }

        const fileWithId = Object.assign(new File([blob], fileName, { type: blob.type }), {
            id: `${Date.now()}-${Math.random()}`,
        }) as FileWithId;

        setFiles([...files, fileWithId]);

        setShowLinkInput(false);
        setIsHyperlinkInputOpen(false);
        setLinkUrl("");
        setSavedRange(null);

        setTimeout(() => {
            skipPositionUpdate.current = false;
        }, 300);
    }, [savedRange, linkUrl, files, setFiles, setIsHyperlinkInputOpen]);

    const hasTextContent = (html: string): boolean => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent!.trim() !== "";
    };

    const handleSend = async () => {
        if (text.trim() === "") {
            return;
        }

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
            const messagesHistory = getMessageQueueFromNode();
            const newBranch = addSavedBranch(text, messagesHistory, [branchDialog], userMessage.id);
            const lastNodeForUserMessage = getLastCurrentVersionMessageNode();
            addMessageNode(lastNodeForUserMessage, userMessage);
            const lastNodeForReply = getLastCurrentVersionMessageNode();
            addMessageNode(lastNodeForReply, reply);
            setCurrentBranch(newBranch);
            setIsCreateBranchChatMode(false);
            setIsCurrentBranchOpen(true);
        } else if (isCurrentBranchOpen && currentBranch) {
            const reply = await doMessageReply();
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
        processLinksFromText(value);
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

    const processLinksFromText = async (inputText: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(inputText, "text/html");
        const anchors = doc.querySelectorAll("a");
        const currentLinks = new Set<string>();

        for (const anchor of Array.from(anchors)) {
            const link = anchor.getAttribute("href");
            if (link) {
                currentLinks.add(cleanUrl(link));
            }
        }

        const urlRegex = /(https?:\/\/[^\s'"]+)/gi;
        const plainLinks = inputText.match(urlRegex) || [];
        plainLinks.forEach((link) => currentLinks.add(cleanUrl(link)));

        const updatedFiles = files.filter((file) => {
            if (!file.name.startsWith("http://") && !file.name.startsWith("https://")) {
                return true;
            }
            return currentLinks.has(file.name);
        });

        const newLinks = Array.from(currentLinks).filter(
            (link) => !files.some((file) => file.name === link)
        );

        const newFiles = await Promise.all(
            newLinks.map(async (link) => {
                let blob;
                try {
                    const response = await fetch(link);
                    if (!response.ok) {
                        throw new Error(`Non-200 status: ${response.status}`);
                    }
                    blob = await response.blob();
                } catch (error) {
                    console.error(
                        "Failed to fetch content from link (possibly due to CORS).",
                        error
                    );
                    blob = new Blob([`Failed to fetch content from link:\n${link}`], {
                        type: "text/plain",
                    });
                }

                const fileWithId = Object.assign(new File([blob], link, { type: blob.type }), {
                    id: `${Date.now()}-${Math.random()}`,
                }) as FileWithId;

                return fileWithId;
            })
        );

        if (newFiles.length > 0 || updatedFiles.length < files.length) {
            setFiles([...updatedFiles, ...newFiles]);
        }
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            await processLinksFromText(text);
            return;
        }
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (hasTextContent(text)) {
                await handleSend();
            }
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
            {questionCodeMessage && (
                <QuestionCodeMessage questionCodeMessage={questionCodeMessage} />
            )}
            <div
                className={clsx(css.panel_wrapper, dragTarget && css._over)}
                onDragOver={handleDragOverTarget}
                onDrop={handleDragDropTarget}
                onDragLeave={handleDragLeaveTarget}
                ref={panelWrapperRef}
            >
                {isShowReferencePanel && (
                    <div className={css.panel_prompt}>
                        <ReplyIcon className={css.panel_prompt_icon} />
                        <div className={css.reference_panel}>
                            <button
                                className={css.reference_panel_close_btn}
                                onClick={() => setIsShowReferencePanel(false)}
                            >
                                <Close />
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
                                        <div
                                            className={css.panel_uploading_files_name_and_progress}
                                        >
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
                        readOnly={prompt.active || disableButtons}
                        value={text}
                        onChange={handleChangeEditor}
                        handleKeyDown={handleKeyPress}
                        onFocus={(editor: IEditor | null) => {
                            setEditor(editor);
                            handleFocusEditor(editor);
                        }}
                        onBlur={() => {
                            setEditor(null);
                            handleBlurEditor();
                        }}
                        className={css.panel_editor}
                        classNameEditor={css.panel_editor_editor}
                        clearContent={clearContent}
                        placeholder={placeholder}
                        onMouseUp={handleTextSelection}
                    />
                    <div
                        className={classNames(css.screenShareWrapper, {
                            [css.screenShareWrapperExpanded]: shareScreenConfig.expandedButtons,
                        })}
                    >
                        <ScreenShareMenu
                            isActive={shareScreenConfig.expandedButtons}
                            type={shareScreenConfig.shareType}
                            onConfig={(type) =>
                                setShareScreenConfig({ ...shareScreenConfig, shareType: type })
                            }
                            onClickOutside={onShareScreenClickOutside}
                        />
                        {shareScreenConfig.shareType && (
                            <ShareScreenInfo
                                isActive={!!shareScreenConfig.shareType}
                                onClickOutside={onShareScreenClickOutside}
                                {...SCREEN_SHARE_CONFIG[shareScreenConfig.shareType]}
                            />
                        )}
                    </div>
                    <button
                        className={classNames(css.screenShareButton, {
                            [css.screenShareButtonExpanded]: shareScreenConfig.expandedButtons,
                        })}
                        disabled={disableButtons}
                        onMouseEnter={(event) => {
                            if (!event.currentTarget.disabled) {
                                setShareScreenConfig({
                                    ...shareScreenConfig,
                                    expandedButtons: true,
                                });
                            }
                        }}
                    >
                        <ScreenShareIcon width={16} height={16} />
                    </button>
                    <button className={css.panel_button}>
                        <MicrophoneIcon />
                    </button>

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
                                ref={linkInputRef}
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="Enter URL"
                                onFocus={() => {
                                    window.getSelection()?.removeAllRanges();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const { isValid } = isValidUrl(linkUrl);
                                        if (isValid) {
                                            handleApplyLink();
                                        } else {
                                            alert(
                                                "Please enter a valid URL (e.g., example.com or https://example.com)"
                                            );
                                            setShowLinkInput(false);
                                            setLinkUrl("");
                                            setSavedRange(null);
                                            window.getSelection()?.removeAllRanges();
                                        }
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
                                    <div
                                        className={css.chat_response_stop_icon}
                                        onClick={handleStopReply}
                                    >
                                        <ChatResponseStopIcon fill="currentColor" />
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
                                    {isTablePromptVisible ? (
                                        <button className={css.panel_send_table_data_btn}>
                                            <SendTableDataIcon fill="currentColor" />
                                        </button>
                                    ) : !prompt.active ? (
                                        !questionCodeMessage ? (
                                            <button
                                                className={css.panel_submitBtn}
                                                onClick={() => {
                                                    if (hasTextContent(text)) {
                                                        handleSend();
                                                    }
                                                }}
                                            >
                                                Send <ArrowUpIcon />
                                            </button>
                                        ) : (
                                            <button
                                                className={clsx(
                                                    css.panel_button,
                                                    css.panel_hammerBtn
                                                )}
                                            >
                                                <HammerIcon />
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            className={clsx(css.panel_button, css.panel_callBtn)}
                                        >
                                            <CallVoiceIcon />
                                        </button>
                                    )}
                                </>
                            </CSSTransition>
                        )}
                    </SwitchTransition>
                </div>
                {messagesCount === 0 && (
                    <div className={css.hintsWrapper}>
                        {showHints.typingHints && messagesCount === 0 && (
                            <div className={css.typingHints}>
                                <HintsTyping onSelect={(hint: string) => onSendMessage(hint)} />
                            </div>
                        )}
                        {showHints.hints && (
                            <div className={css.hints}>
                                <Hints onSelect={(hint: string) => onSendMessage(hint)} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

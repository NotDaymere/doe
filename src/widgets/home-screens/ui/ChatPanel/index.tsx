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
import { useChatStore } from "src/shared/providers";
import { MagicMenu, useDragFile, usePanel, usePrompt } from "../..";
import { FileList } from "src/shared/components/FileList";
import UploadIcon from "src/shared/icons/Upload.icon";
import Hints from "../WelcomeScreen/Hints";
import HintsTyping from "../WelcomeScreen/HintsTyping";
import ShareScreenInfo from "../ShareScreen/ShareScreenInfo";
import CableIcon from "src/shared/icons/Cable.icon";
import BluetoothIcon from "src/shared/icons/Bluetooth.icon";
import ScreenIcon from "src/shared/icons/Screen.icon";
import classNames from "classnames";
import { IScreenSharePopup, ShareType } from "src/shared/types/ScreenShare";
import css from "./ChatPanel.module.less";
import ScreenShareMenu from "../ShareScreen/ScreenShareMenu";

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
        videoUrl: "",
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
        videoUrl: "",
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
    const { text, files, setText, setFiles } = usePanel();
    const {
        setEditor,
        setMessagesCount,
        messagesCount,
        messages,
        setMessages,
        disableButtons,
        setDisableButtons,
    } = useChatStore();
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

    const typingHintsRef = useRef<HTMLDivElement>(null);
    const [showHints, setShowHints] = useState({ hints: messagesCount === 0, typingHints: false });
    const [shareScreenConfig, setShareScreenConfig] = useState<IShareScreen>({
        expandedButtons: false,
        shareType: null,
    });

    const [selectedHint, setSelectedHint] = useState("");

    useEffect(() => {
        setText(selectedHint);
    }, [selectedHint]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const prompt = usePrompt();

    const handleSendButtonClick = () => {
        setMessagesCount(messagesCount + 1);
        setDisableButtons(false);

        if (!text) return;

        setMessages([
            ...messages,
            {
                id: 3,
                content: text,
                files: [],
                isCode: false,
                isUser: true,
            },
        ]);
        setText("");
    };

    const handleFocusEditor = (editor: IEditor | null) => {
        setEditor(editor);
        setShowHints({ hints: false, typingHints: true });
    };

    const handleBlurEditor = () => {
        setEditor(null);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (typingHintsRef.current && !typingHintsRef.current.contains(event.target as Node)) {
            setShowHints({ ...showHints, typingHints: false });
        }
    };

    const onShareScreenClickOutside = () => {
        setShareScreenConfig({
            shareType: null,
            expandedButtons: false,
        });
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
                        insertedContent={selectedHint}
                    />
                    <ScreenShareMenu
                        isActive={shareScreenConfig.expandedButtons}
                        type={shareScreenConfig.shareType}
                        onConfig={(type) =>
                            setShareScreenConfig({ ...shareScreenConfig, shareType: type })
                        }
                        onClickOutside={onShareScreenClickOutside}
                    />
                    {!shareScreenConfig.expandedButtons && (
                        <button
                            className={css.screenShareButton}
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
                    )}
                    {shareScreenConfig.shareType && (
                        <ShareScreenInfo
                            isActive={!!shareScreenConfig.shareType}
                            onClickOutside={onShareScreenClickOutside}
                            {...SCREEN_SHARE_CONFIG[shareScreenConfig.shareType]}
                        />
                    )}
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
                    <div className={css.hints}>
                        <Hints onSelect={setSelectedHint} />
                    </div>
                )}
                {showHints.typingHints && messagesCount === 0 && (
                    <div className={css.typingHints} ref={typingHintsRef}>
                        <HintsTyping onSelect={setSelectedHint} />
                    </div>
                )}
            </div>
        </div>
    );
};

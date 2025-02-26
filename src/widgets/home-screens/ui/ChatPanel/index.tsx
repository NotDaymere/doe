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
import UploadIcon from "src/shared/icons/Upload.icon";
import Hints from "../WelcomeScreen/Hints";
import HintsTyping from "../WelcomeScreen/HintsTyping";
import ShareScreenInfo from "../ShareScreen/ShareScreenInfo";
import css from "./ChatPanel.module.less";
import CableIcon from "src/shared/icons/Cable.icon";
import BluetoothIcon from "src/shared/icons/Bluetooth.icon";
import ScreenIcon from "src/shared/icons/Screen.icon";
import classNames from "classnames";
import { IScreenSharePopup } from "src/shared/types/ScreenShare";

type ShareType = keyof IScreenSharePopup;

export const SCREEN_SHARE_CONFIG: IScreenSharePopup = {
    shareScreen: {
        title: "Share your computer screen",
        description: `<span>Start broadcasting your desktop device screen. You can continue working with Doe with full functionality while the screen is being broadcast and Doe is interacting with the screen content.</span>`,
        label: "Share computer screen",
        icon: <ScreenIcon width={14} height={12} className={css.screenShareIcon} />,
    },
    shareViaBluetooth: {
        title: "Share your mobile screen",
        description: `<span>To switch to sharing mode, connect your mobile device to your computer <strong>via a cable</strong>.</span>
            <span>You can also connect your device <strong>via Bluetooth</strong> if a cable connection is not available.<span/>`,
        label: "Share Mobile screen via Bluetooth",
        icon: <BluetoothIcon width={15} height={15} className={css.screenShareBluetoothIcon} />,
    },
    shareViaCabel: {
        title: "Share your mobile screen",
        description: `<span>To switch to sharing mode, connect your mobile device to your computer <strong>via a cable.</strong></span><span>You can also connect your device <strong>via Bluetooth</strong> if a cable connection is not available. <span/>`,
        label: "Share Mobile screen via a cable",
        icon: <CableIcon width={21} height={5} className={css.screenShareIcon} />,
    },
    connectionFailed: {
        title: "Connection failed",
        description: `<span>Check if the connection method you selected is correct and try again. Or change the connection method to another.<span/>`,
        actions: true,
    },
    connectionSuccessful: {
        title: "Connection successful!",
        description: "You can now continue working in screen sharing mode with Doe.",
    },
};

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
    const [showScreenShareInfo, setShowScreenShareInfo] = useState(false);

    const [showHints, setShowHints] = useState({ hints: messagesCount === 0, typingHints: false });
    const [shareType, setShareType] = useState<ShareType>("shareViaCabel");

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
                    <div
                        className={classNames(css.shareScreenExpanded, {
                            [css.shareScreenShow]: showScreenShareInfo,
                        })}
                    >
                        <button
                            className={classNames(css.expandedIcon, {
                                [css.activeShareType]: shareType === "shareViaCabel",
                            })}
                            onClick={() => setShareType("shareViaCabel")}
                        >
                            <CableIcon width={21} height={5} />
                        </button>
                        <button
                            className={classNames(css.bluetoothIcon, {
                                [css.activeBluetoothButton]: shareType === "shareViaBluetooth",
                            })}
                            onClick={() => setShareType("shareViaBluetooth")}
                        >
                            <BluetoothIcon width={9} height={13} />
                        </button>
                        <button
                            className={classNames(css.expandedIcon, {
                                [css.activeShareType]: shareType === "shareScreen",
                            })}
                            onClick={() => setShareType("shareScreen")}
                        >
                            <ScreenIcon width={16} height={13} />
                        </button>
                        <div className={classNames(css.expandedIcon, css.activeShareType)}>
                            <ScreenShareIcon width={16} height={16} />
                        </div>
                    </div>
                    {!showScreenShareInfo && (
                        <button
                            className={css.screenShareButton}
                            onClick={() => setShowScreenShareInfo(true)}
                        >
                            <ScreenShareIcon width={16} height={16} />
                        </button>
                    )}
                    <div
                        className={classNames(css.shareScreen, {
                            [css.shareScreenShow]: showScreenShareInfo,
                        })}
                    >
                        <ShareScreenInfo {...SCREEN_SHARE_CONFIG[shareType]} />
                    </div>
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

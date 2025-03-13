import React, { Dispatch, useState } from "react";

// External libraries
import { Editor as EditorTiptap } from "@tiptap/react";
import { MathJax } from "better-react-mathjax";
import hljs from "highlight.js";
import jsPDF from "jspdf";
import { Flex } from "antd";
import { CSSTransition } from "react-transition-group";

// Shared types & providers
import { IMessage } from "src/shared/types/Message";
import { useChatStore } from "src/shared/providers";

// Shared components
import { Editor } from "src/shared/components/Editor";
import { useApp } from "src/components/app";
import {FileListForDisplay} from "../../../../shared/components/FileList/FileListForDisplay";

// Icons
import CrossIcon from "src/shared/icons/Cross.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import SendIcon from "src/shared/icons/Send.icon";
import { ReactComponent as Logo } from "src/assets/icons/general-logo.svg";
import { SvgIcon } from "src/components/icon";

// Chat message utilities
import { parseContent } from "src/components/chat-message/parseContent";
import { parseTextFormatting } from "src/components/chat-message/parseTextFormatting";

// Styles
import css from "./ChatMessage.module.less";
import "highlight.js/styles/github-dark.css";
import PlayIcon from "src/shared/icons/Play.icon";
import DownloadIcon from "src/shared/icons/Download.icon";
import CopyIcon from "src/shared/icons/Copy.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";
import ReferenceButton from "../ChatReferences/ReferenceButton/ReferenceButton";

import { useChatContext } from "../../lib/hooks/ChatContext";
import TableRandomValues from "./assets/TableRandomValues/TableRandomValues";
import DownloadCSV from "./assets/DownloadCSV/DownloadCSV";
import PythonTaskManager from "./assets/PythonTaskManager/PythonTaskManager";
import MessageLogoIcon from "../../../../shared/icons/MessageLogo.icon";
import { MessageNodeVersionSelector } from "./assets/MessageNodeVersionSelector/MessageNodeVersionSelector";
import MessageTable from "./assets/MessageTable/MessageTable";
import MessageFrame from "./assets/MessageFrame/MessageFrame";
import { mockTableData } from "./assets/MessageTable/mockTableData";
import { mockMessageFrameData } from "./assets/MessageFrame/mockMessageFrameData";
import ChartRenderer from "./assets/ChatRenderer/ChatRenderer";
import MessageColumnsChart from "./assets/MessageColumnsChart/MessageColumnsChart";
import { mockColumnsChartMessageData } from "./assets/MessageColumnsChart/mockColumnsChartMessageData";
import { usePanel } from "../../lib";

interface Props {
    data: IMessage;
    editor: EditorTiptap | null;
    editMsgMode: {
        isEditMsgMode: boolean;
        msgId: number | null;
    };
    setEditMsgMode: Dispatch<
        React.SetStateAction<{
            isEditMsgMode: boolean;
            msgId: number | null;
        }>
    >;
}

export const ChatMessage: React.FC<Props> = ({ data, editMsgMode, setEditMsgMode }) => {
    const [activeMenu, setActiveMenu] = React.useState(false);
    const downloadMenuRef = React.useRef<HTMLDivElement>(null);
    const downloadRef = useClickOut({
        handler: () => setActiveMenu(false),
    });

    const toggleMenu = () => setActiveMenu(!activeMenu);

    const setCloseHandler = (fn?: () => void) => {
        return () => {
            fn?.();
            setActiveMenu(false);
        };
    };

    // const [isEdit, setEdit] = React.useState(false);
    const [content, setContent] = React.useState(data.content);
    const [updatedContent, setUpdatedContent] = useState(data.content);

    const {
        editor,
        setEditor ,
        isCurrentBranchOpen,
        addMessageNodeVersion,
        addMessageNode,
        getLastCurrentVersionMessageNode,
        doMessageReply
    } = useChatStore();

    const parsedContent = parseContent(content);
    const messageRef = React.useRef<HTMLDivElement>(null);
    const { setPlayground } = useApp().app;

    const [referenceButtonVisible, setReferenceButtonVisible] = React.useState(false);
    const [referenceButtonPosition, setReferenceButtonPosition] = React.useState<{ top: number; left: number } | null>(null);

    const { setSelectedText, setIsShowReferencePanel } = useChatContext();
    const {setFiles} = usePanel();
    const [isPaused, setIsPaused] = React.useState(true);
    const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance | null>(null);

    React.useEffect(() => {
        const lastMouseEvent = { current: null as MouseEvent | null };

        const handleMouseUp = (e: MouseEvent) => {
            lastMouseEvent.current = e;
            handleSelectionChange();
        };

        const handleSelectionChange = () => {
            if (!messageRef.current) return;
            const selection = window.getSelection();
            const selectionText = selection ? selection.toString().trim() : "";

            if (
                selection &&
                selectionText
            ) {
                const range = selection.getRangeAt(0);
                const rects = range.getClientRects();
                if (rects.length === 0) return;

                const lastRect = rects[rects.length - 1];
                const selectionTop = lastRect.bottom + window.scrollY;
                const selectionLeft = lastRect.right + window.scrollX;
                const maxDistance = 30;
                const offsetY = -50;
                const offsetX = -20;

                if (lastMouseEvent.current) {
                    const candidateTop = lastMouseEvent.current.pageY;
                    const candidateLeft = lastMouseEvent.current.pageX;
                    const topDiff = candidateTop - selectionTop;

                    const clampedTop =
                        Math.abs(topDiff) > maxDistance
                            ? selectionTop + (topDiff > 0 ? maxDistance : -maxDistance)
                            : candidateTop;

                    setReferenceButtonPosition({ top: clampedTop + offsetY, left: candidateLeft + offsetX });
                } else {
                    setReferenceButtonPosition({ top: selectionTop, left: selectionLeft });
                }
                setReferenceButtonVisible(true);
            } else {
                handleClose();
            }
        };

        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("selectionchange", handleSelectionChange);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("selectionchange", handleSelectionChange);
        };
    }, []);

    const handleClose = () => {
        setReferenceButtonVisible(false);
    };

    const handleReferenceClick = () => {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : "";
        setSelectedText(text);
        setIsShowReferencePanel(true);
        if (selection) selection.removeAllRanges();
    };

    React.useEffect(() => {
        if (messageRef.current) {
            const codeBlocks = messageRef.current.querySelectorAll("code");
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [content, messageRef]);

    //speech
    const synth = React.useRef(window.speechSynthesis);
    React.useEffect(() => {
        const synth = window.speechSynthesis;

        const initUtterance = () => {
            const textToSpeak = messageRef.current?.textContent || "";
            const u = new SpeechSynthesisUtterance(textToSpeak);

            const voices = synth.getVoices();
            if (voices.length > 0) {
                u.voice = voices.find((v) => v.lang.startsWith("en")) || voices[0];
            }

            setUtterance(u);
        };

        initUtterance();
        //voice updating
        const handleVoicesChanged = () => {
            initUtterance();
        };

        synth.addEventListener("voiceschanged", handleVoicesChanged);

        return () => {
            synth.cancel();
            synth.removeEventListener("voiceschanged", handleVoicesChanged);
        };
    }, []);

    const handlePlay = () => {
        if (!utterance) {
            console.error("Utterance is not ready.");
            return;
        }

        if (synth.current.speaking) {
            console.warn("Already speaking.");
            return;
        }

        utterance.onend = () => {
            setIsPaused(true);
        };

        synth.current.speak(utterance);
        setIsPaused(false);
    };

    const handleStop = () => {
        synth.current.cancel();

        setIsPaused(true);
    };

    const toggleEdit = (id: number) => {
        setEditMsgMode({ isEditMsgMode: true, msgId: id });
        // setEditMsgMode(!editMsgMode);
    };

    const handleEdit = async () => {
        const newId = Date.now();

        const newMessage: IMessage = {
            ...data,
            id: newId,
            content: content,
        };


        addMessageNodeVersion(data.id, newMessage);

        setUpdatedContent(content);
        setEditMsgMode({ isEditMsgMode: false, msgId: null });

        const reply = await doMessageReply();
        const lastNodeForUserMessage = getLastCurrentVersionMessageNode();
        addMessageNode(lastNodeForUserMessage, reply);

    };

    const cancelEdit = (id: number) => {
        setContent(data.content);
        setEditMsgMode({ isEditMsgMode: false, msgId: null });
        // setEditMsgMode(false);
    };
    const handleCopy = () => {
        if (messageRef.current) {
            const range = document.createRange();
            range.selectNodeContents(messageRef.current);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            document.execCommand("copy");
            selection?.removeAllRanges();
        }
    };
    const downloadPDF = () => {
        if (messageRef.current) {
            const doc = new jsPDF();

            const content = messageRef.current;

            doc.html(content, {
                callback: function (doc) {
                    doc.save("response.pdf");
                },
                html2canvas: { scale: 0.3 },
                x: 10,
                y: 10,
            });
        }
    };
    const openSourcePlayground = () => {
        setPlayground((prev) => ({
            ...prev,
            type: "source",
            open: true,
        }));
    };

    if (data.isUser) {
        if (editMsgMode.isEditMsgMode && editMsgMode.msgId === data.id) {
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
                        <button
                            className={css.edit_controls_cancelBtn}
                            onClick={() => cancelEdit(data.id)}
                        >
                            <span className={css.svg_wrapper}>
                                 <span className={css.tooltip}>Cancel</span>
                                <CrossIcon />
                            </span>
                        </button>

                        <button
                            className={css.edit_controls_saveBtn}
                            onClick={handleEdit}
                        >
                            <span className={css.svg_wrapper}>
                                <span className={css.tooltip}>Send edit</span>
                                <SendIcon />
                            </span>
                        </button>
                    </div>
                    <ReferenceButton
                        isVisible={referenceButtonVisible}
                        position={referenceButtonPosition}
                        onClose={handleClose}
                        onReferenceClick={handleReferenceClick}
                    />
                </div>
            );
        }

        return (
            <div className={css.input_container}>
                <div className={`${isCurrentBranchOpen ? css.input_open_branch : css.input} `}>
                    <div className={css.user_message_container}>
                        <div className={css.user_message_and_edit_button}>
                            {!isCurrentBranchOpen &&
                                <button className={css.input_editBtn} onClick={() => toggleEdit(data.id)}>
                            <span className={css.svg_wrapper}>
                                <PenIcon />
                                <span className={css.tooltip}>Edit</span>
                            </span>
                                </button>
                            }

                            <div
                                className={`${isCurrentBranchOpen ? css.input_message_branch : css.input_message} `}
                                dangerouslySetInnerHTML={{
                                    __html: updatedContent,
                                }}
                            ></div>
                        </div>


                        <div
                            className={css.file_container}
                            style={{
                                height: data.files && data.files.length > 0 ? "auto" : "0px",
                                overflow: "hidden",
                                transition: "height 0.3s ease",
                            }}
                        >
                            {data.files && data.files.length > 0 && (
                                <FileListForDisplay
                                    className={css.panel_files}
                                    files={data.files}
                                    onChange={setFiles}
                                />
                            )}
                        </div>
                    </div>
                    <ReferenceButton
                        isVisible={referenceButtonVisible}
                        position={referenceButtonPosition}
                        onClose={handleClose}
                        onReferenceClick={handleReferenceClick}
                    />
                </div>
                {!isCurrentBranchOpen &&
                    <MessageNodeVersionSelector message={data} />
                }
            </div>
        );
    }

    if (data.isCode) {
        return (
            <div
                className={`${isCurrentBranchOpen ? css.chat_message_branch : css.chat_message}  ${data.isUser ? css.user_message : css.bot_message}`}
            >

                <ReferenceButton
                    isVisible={referenceButtonVisible}
                    position={referenceButtonPosition}
                    onClose={handleClose}
                    onReferenceClick={handleReferenceClick}
                />

                <div className={css.sub_bot_message_info_container}>
                    {!data.isUser && (
                        <div
                            className={`${css.bot_logo_background} ${isCurrentBranchOpen ? css.bot_logo_background_open : ""}`}>
                            <div className={`${css.bot_logo}  ${isCurrentBranchOpen ? css.bot_logo_background_open : ""}`}>
                                <MessageLogoIcon fillPath={"currentColor"}/>
                            </div>
                        </div>
                    )}
                    <MessageNodeVersionSelector message={data}/>
                </div>
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

                        <MessageColumnsChart data={mockColumnsChartMessageData}/>
                        <MessageFrame data={mockMessageFrameData}/>
                        <text className={"message-text"}>Now Ill show the output in the table:</text>
                        <MessageTable tableData={mockTableData}/>
                        <Flex justify={"flex-start"} className={"message-actions"} vertical>
                            <Flex>
                                <TableRandomValues />
                                <DownloadCSV />
                            </Flex>
                            <Flex>
                                <PythonTaskManager />
                            </Flex>
                        </Flex>

                    </div>

                    {!data.isUser && (
                        <Flex justify={"space-between"} className={"message-actions"}>

                            <button onClick={openSourcePlayground} className={css.button_steps}>
                                <SvgIcon
                                    style={{ width: "15px", height: "15px", marginRight: "2px" }}
                                    type={"seeAllStepsVioletIcon"}
                                />
                                <span className={css.button_steps_label}>See all steps</span>
                            </button>
                            <Flex gap={10}>
                                    <button
                                        className={`${!isPaused ? css.glowing_border : css.button_steps_grey}`}
                                        onClick={isPaused ? handlePlay : handleStop}
                                    >
                                        <span className={css.tooltip}>Listen answer</span>
                                        <div className={css.button_container}>
                                            <PlayIcon fill="currentColor" />
                                        </div>
                                    </button>

                                <div className={css.download} ref={downloadRef}>
                                    <button
                                        onClick={toggleMenu}
                                        className={`${css.button_steps_green} ${activeMenu ? css.active : ""}`}
                                    >
                                        <span className={css.tooltip}>Download chat text</span>
                                        <DownloadIcon />
                                    </button>
                                    <CSSTransition
                                        classNames={css}
                                        timeout={150}
                                        in={activeMenu}
                                        downloadMenuRef={downloadMenuRef}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <div className={css.download_menu} ref={downloadMenuRef}>
                                            <ul>
                                                <li onClick={setCloseHandler(downloadPDF)}>.png</li>
                                                <li onClick={setCloseHandler(downloadPDF)}>.txt</li>
                                                <li onClick={setCloseHandler(downloadPDF)}>.pdf</li>
                                            </ul>
                                        </div>
                                    </CSSTransition>
                                </div>
                                <button onClick={handleCopy} className={css.button_steps_green}>
                                    <span className={css.tooltip}>Copy chat text</span>
                                    <CopyIcon />
                                </button>

                            </Flex>
                        </Flex>
                    )}
                </div>
            </div>
        );
    }

    return <div className={css.message}>{null}</div>;
};

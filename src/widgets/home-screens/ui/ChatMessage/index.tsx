import React, { Dispatch, useEffect, useState } from "react";

// External libraries
import { Editor as EditorTiptap } from "@tiptap/react";
import { MathJax } from "better-react-mathjax";
import hljs from "highlight.js";
import jsPDF from "jspdf";
import { Flex } from "antd";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

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

import { MessageNodeVersionSelector } from "./assets/MessageNodeVersionSelector/MessageNodeVersionSelector";
import GeneralLogo from "../GeneralLogo/GeneralLogo";
import MessageTable from "./assets/MessageTable/MessageTable";
import MessageFrame from "./assets/MessageFrame/MessageFrame";
import { mockTableData } from "./assets/MessageTable/mockTableData";
import { mockMessageFrameData } from "./assets/MessageFrame/mockMessageFrameData";
import ChartRenderer from "./assets/ChatRenderer/ChatRenderer";
import MessageColumnsChart from "./assets/MessageCharts/MessageColumnsChart/MessageColumnsChart";
import { mockColumnsChartMessageData } from "./assets/MessageCharts/MessageColumnsChart/mockColumnsChartMessageData";
import { usePanel } from "../../lib";
import MessageLineChart from "./assets/MessageCharts/MessageLineChart/MessageLineChart";
import { mockLineChartMessageData } from "./assets/MessageCharts/MessageLineChart/mockLineChartMessageData";
import { IPlayground } from "../../../../shared/types/Playground";
import AllBranches from "../ChatContent/assets/AllBranches/AllBranches";
import AllPlaygrounds from "../ChatContent/assets/AllPlaygrounds/AllPlaygrounds";
import SeeAllStepsIcon from "../../../../shared/icons/SeeAllSteps.icon";
import FavoriteIcon from "../../../../shared/icons/Favorite.icon";

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

    const [isLiked, setIsLiked] = useState(data.isLiked || false);

    const {
        editor,
        setEditor,
        isCurrentBranchOpen,
        addMessageNodeVersion,
        addMessageNode,
        getLastCurrentVersionMessageNode,
        doMessageReply,
        isHyperlinkInputOpen,
        citationPlaygroundRef,
        setCitationPlaygroundRef,
        setIsCitationPlayground,
        setPlayground,
        setSavedPlaygrounds,
        savedPlaygrounds,
        deleteSavedPlaygrounds,
        updateSavedPlaygrounds,
        changeMessage,
        playgroundFullscreen
    } = useChatStore();

    const parsedContent = parseContent(content);
    const messageRef = React.useRef<HTMLDivElement>(null);


    const [referenceButtonVisible, setReferenceButtonVisible] = React.useState(false);
    const [referenceButtonPosition, setReferenceButtonPosition] = React.useState<{
        top: number;
        left: number
    } | null>(null);

    const { setSelectedText, setIsShowReferencePanel } = useChatContext();
    const { setFiles } = usePanel();
    const [isShowLogoPopup, setIsShowLogoPopup] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(true);
    const [isAllStepOpen, setIsAllStepOpen] = React.useState(false);
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

    React.useEffect(() => {
        const handleCitationClick = (event: Event) => {
            const fileInput = document.getElementById("fileInput");
            if (fileInput && fileInput.contains(event.target as Node)) {
                return;
            }

            event.preventDefault();
            const target = (event.target as HTMLElement).closest(".citation-container");
            if (!target) return;

            const citationUrl = target.getAttribute("data-citation-url");
            if (!citationUrl) return;

            const allCitationContainers = document.querySelectorAll(".citation-container");
            allCitationContainers.forEach((container) => {
                container.classList.remove("citation-active");

                const citedText = container.querySelector(".cited-text") as HTMLElement | null;
                if (citedText) {
                    citedText.style.textDecoration = "";
                }

                const citationElement = container.querySelector(".citation") as HTMLElement | null;
                if (citationElement) {
                    citationElement.style.border = "";
                    citationElement.style.backgroundColor = "";
                    citationElement.style.color = "";
                }
            });

            if (citationPlaygroundRef === citationUrl) {
                const existingIframe = savedPlaygrounds.find(p => p.type === "iframe");
                if (existingIframe) {
                    deleteSavedPlaygrounds(existingIframe.id);
                }
                setPlayground({
                    type: null,
                    name: "",
                    open: false,
                    data: null,
                    text: "",
                    id: null,
                });
                setCitationPlaygroundRef(null);
                setIsCitationPlayground(false);
            } else {
                target.classList.add("citation-active");

                const citedText = target.querySelector(".cited-text") as HTMLElement | null;
                if (citedText) {
                    citedText.style.textDecoration = "underline dashed #9747FF";
                }

                const citationElement = target.querySelector(".citation") as HTMLElement | null;
                if (citationElement) {
                    citationElement.style.border = "1px solid #9747ff";
                    citationElement.style.backgroundColor = "#9747ff";
                    citationElement.style.color = "#FFFFFF";
                }

                const domain = new URL(citationUrl).hostname;
                const newId = Date.now().toString();
                const newPlayground: IPlayground = {
                    id: newId,
                    name: `Citation: ${domain}`,
                    type: "iframe",
                    data: citationUrl,
                    open: true,
                };

                const existingIframe = savedPlaygrounds.find(p => p.type === "iframe");
                if (existingIframe) {
                    const updatedPlayground = { ...existingIframe, ...newPlayground };
                    updateSavedPlaygrounds(updatedPlayground);
                    setPlayground(updatedPlayground);
                } else {
                    setSavedPlaygrounds(newPlayground);
                    setPlayground(newPlayground);
                }
                setCitationPlaygroundRef(citationUrl);
                setIsCitationPlayground(true);
            }
        };

        document.addEventListener("click", handleCitationClick);
        return () => {
            document.removeEventListener("click", handleCitationClick);
        };
    }, [
        citationPlaygroundRef,
        setCitationPlaygroundRef,
        setIsCitationPlayground,
        setSavedPlaygrounds,
        setPlayground,
    ]);

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
                callback: function(doc) {
                    doc.save("response.pdf");
                },
                html2canvas: { scale: 0.3 },
                x: 10,
                y: 10,
            });
        }
    };
    const openSourcePlayground = (sourceData: string) => {
        if (isAllStepOpen) {

            const existingAllStep = savedPlaygrounds.find(p => p.type === "source");
            if (existingAllStep) {
                deleteSavedPlaygrounds(existingAllStep.id);
            }
            setIsAllStepOpen(false);
        } else {

            const newPlayground: IPlayground = {
                id: "see_all_steps",
                name: "See All Steps",
                type: "source",
                data: sourceData,
                open: true,
            };

            const existingAllStep = savedPlaygrounds.find(p => p.type === "source");
            if (existingAllStep) {
                const updatedPlayground = { ...existingAllStep, ...newPlayground };
                updateSavedPlaygrounds(updatedPlayground);
                setPlayground(updatedPlayground);
            } else {
                setSavedPlaygrounds(newPlayground);
                setPlayground(newPlayground);
            }

            setIsAllStepOpen(true);
        }
    };

    const handleLike = () => {
        const newMessage: IMessage = {
            ...data,
            isLiked: !isLiked,
        };

        const changeResult = changeMessage(data, newMessage);
        setIsLiked(changeResult?.isLiked || false)
    };


    const renderFavButton = () => {
        return (
            <button
                className={clsx(css.fav_button, { [css.fav_button_liked]: isLiked})}
                onClick={handleLike}
            >
                <FavoriteIcon fill="currentColor" />
            </button>
        );
    };


    if (data.isUser) {
        if (editMsgMode.isEditMsgMode && editMsgMode.msgId === data.id) {
            return (
                <div className={css.message_with_button_container}>
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
                        {!isHyperlinkInputOpen &&
                            <ReferenceButton
                                isVisible={referenceButtonVisible}
                                position={referenceButtonPosition}
                                onClose={handleClose}
                                onReferenceClick={handleReferenceClick}
                            />
                        }
                    </div>
                    {renderFavButton()}
                </div>
            );
        }

        return (
            <div className={css.message_with_button_container}>
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
                        {!isHyperlinkInputOpen &&
                            <ReferenceButton
                                isVisible={referenceButtonVisible}
                                position={referenceButtonPosition}
                                onClose={handleClose}
                                onReferenceClick={handleReferenceClick}
                            />
                        }
                    </div>
                    {!isCurrentBranchOpen &&
                        <MessageNodeVersionSelector message={data} />
                    }
                </div>
                {renderFavButton()}
            </div>
        );
    }

    if (data.isCode) {
        return (
            <div className={css.message_with_button_container}>
                <div
                    className={`${isCurrentBranchOpen ? css.chat_message_branch : css.chat_message}  ${data.isUser ? css.user_message : css.bot_message}`}
                >
                    {!isHyperlinkInputOpen &&
                        <ReferenceButton
                            isVisible={referenceButtonVisible}
                            position={referenceButtonPosition}
                            onClose={handleClose}
                            onReferenceClick={handleReferenceClick}
                        />
                    }
                    <div className={css.sub_bot_message_info_container}>
                        <div className={css.logoWrapper}>
                            <div onClick={() => setIsShowLogoPopup((prev) => !prev)} style={{ cursor: "pointer" }}>
                                <GeneralLogo />
                            </div>
                            <CSSTransition
                                in={isShowLogoPopup}
                                timeout={300}
                                classNames={{
                                    enter: css.logoPopupEnter,
                                    enterActive: css.logoPopupEnterActive,
                                    exit: css.logoPopupExit,
                                    exitActive: css.logoPopupExitActive,
                                }}
                                unmountOnExit
                            >
                                <div className={css.logoPopup}>
                                    {!playgroundFullscreen && (
                                        <>
                                            <AllBranches />
                                            <AllPlaygrounds />
                                        </>
                                    )}
                                </div>
                            </CSSTransition>
                        </div>
                        <MessageNodeVersionSelector message={data} />
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
                            <text>Now I’ll plot the output inline instead of using code:</text>
                            <MessageLineChart data={mockLineChartMessageData} />
                            <text>Now I’ll plot the output inline instead of using code:</text>
                            <MessageColumnsChart data={mockColumnsChartMessageData} />
                            <text className={"message-text"}>
                                Here's a simple project idea: a manager platform in Notion,
                                focusing on task management, milestones, and clear goals for the Microsoft Imagine Cup.
                                I've
                                chosen a project to create a simple to-do list application as an example.
                            </text>
                            <p><br className="ProseMirror-trailingBreak" /></p>
                            <text className={"message-text"}>
                                Give me a moment to access your Notion, then you should be able to view the document.
                            </text>
                            <p><br className="ProseMirror-trailingBreak" /></p>
                            <MessageFrame data={mockMessageFrameData} />
                            <text className={"message-text"}>Now Ill show the output in the table:</text>
                            <MessageTable tableData={mockTableData} />
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
                                <button
                                    onClick={() => openSourcePlayground(data.id.toString())}
                                    className={clsx(css.button_steps, { [css.steps_open]: isAllStepOpen })}
                                >
                                    <SeeAllStepsIcon />
                                    <span
                                        className={clsx({
                                            [css.button_steps_open_label]: isAllStepOpen,
                                            [css.button_steps_label]: !isAllStepOpen,
                                        })}
                                    >
                                    See all steps
                                </span>
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
                {renderFavButton()}
            </div>
        );
    }

    return <div className={css.message}>{null}</div>;
};

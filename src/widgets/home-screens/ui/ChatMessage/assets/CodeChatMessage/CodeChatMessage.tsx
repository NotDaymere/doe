import React, { useCallback } from "react";
import { IMessage } from "src/shared/types/Message";
import css from "./CodeChatMessage.module.less";
import { MathJaxContext } from "better-react-mathjax";
import ReactDOM from "react-dom";
import ReferenceButton from "../../../ChatReferences/ReferenceButton/ReferenceButton";
import MessageLogoIcon from "../../../../../../shared/icons/MessageLogo.icon";
import GeneralLogo from "../../../GeneralLogo/GeneralLogo";
import { MessageNodeVersionSelector } from "../MessageNodeVersionSelector/MessageNodeVersionSelector";
import ChatMessageContent from "../ChatMessageContent";
import MessageLineChart from "../MessageCharts/MessageLineChart/MessageLineChart";
import { mockLineChartMessageData } from "../MessageCharts/MessageLineChart/mockLineChartMessageData";
import MessageColumnsChart from "../MessageCharts/MessageColumnsChart/MessageColumnsChart";
import { mockColumnsChartMessageData } from "../MessageCharts/MessageColumnsChart/mockColumnsChartMessageData";
import MessageFrame from "../MessageFrame/MessageFrame";
import { mockMessageFrameData } from "../MessageFrame/mockMessageFrameData";
import MessageTable from "../MessageTable/MessageTable";
import { mockTableData } from "../MessageTable/mockTableData";
import { Flex } from "antd";
import TableRandomValues from "../TableRandomValues/TableRandomValues";
import DownloadCSV from "../DownloadCSV/DownloadCSV";
import PythonTaskManager from "../PythonTaskManager/PythonTaskManager";
import clsx from "clsx";
import SeeAllStepsIcon from "../../../../../../shared/icons/SeeAllSteps.icon";
import PlayIcon from "../../../../../../shared/icons/Play.icon";
import DownloadIcon from "../../../../../../shared/icons/Download.icon";
import { CSSTransition } from "react-transition-group";
import CopyIcon from "../../../../../../shared/icons/Copy.icon";
import type { MouseEventHandler } from "react";
import { FavButton } from "../FavButton/FavButton";
import jsPDF from "jspdf";
import { useClickOut } from "../../../../../../shared/hooks/useClickOut";
import PlayButtonIcon from "../../../../../../shared/icons/PlayButton.icon";
import CopyButtonIcon from "../../../../../../shared/icons/CopyButton.icon";


interface CodeChatMessageProps {
    isCurrentBranchOpen: boolean;
    data: IMessage;
    isHyperlinkInputOpen: boolean;
    referenceButtonVisible: boolean;
    referenceButtonPosition: { top: number; left: number } | null;
    handleClose: () => void;
    handleReferenceClick: () => void;
    messageRef: React.RefObject<HTMLDivElement>;
    openSourcePlayground: (sourceData: string) => void;
    isAllStepOpen: boolean;
}

export const CodeChatMessage: React.FC<CodeChatMessageProps> = ({
                                                                    isCurrentBranchOpen,
                                                                    data,
                                                                    isHyperlinkInputOpen,
                                                                    referenceButtonVisible,
                                                                    referenceButtonPosition,
                                                                    handleClose,
                                                                    handleReferenceClick,
                                                                    messageRef,
                                                                    openSourcePlayground,
                                                                    isAllStepOpen,
                                                        }) => {
    const [isPaused, setIsPaused] = React.useState(true);
    const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance | null>(null);
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


    const downloadPDF = useCallback(() => {
        if (!messageRef.current) return;
        const doc = new jsPDF();
        doc.html(messageRef.current, {
            callback: doc => doc.save("response.pdf"),
            html2canvas: { scale: 0.3 },
            x: 10,
            y: 10,
        });
    }, []);

    const handleCopy = useCallback(() => {
        if (!messageRef.current) return;
        const range = document.createRange();
        range.selectNodeContents(messageRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        document.execCommand("copy");
        sel?.removeAllRanges();
    }, []);

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

    return (
        <div className={css.message_with_button_container}>
            <MathJaxContext>
                <div
                    className={`${isCurrentBranchOpen ? css.chat_message_branch : css.chat_message}  ${data.isUser ? css.user_message : css.bot_message}`}
                >
                    {!isHyperlinkInputOpen && ReactDOM.createPortal(
                        <ReferenceButton
                            isVisible={referenceButtonVisible}
                            position={referenceButtonPosition}
                            onClose={handleClose}
                            onReferenceClick={handleReferenceClick}
                        />,
                        document.body
                    )}
                    <div className={css.sub_bot_message_info_container}>
                        <div className={css.logoWrapper}>

                            {isCurrentBranchOpen ? (
                                <div
                                    className={`${css.bot_logo_background} ${isCurrentBranchOpen ? css.bot_logo_background_open : ""}`}>
                                    <div
                                        className={`${css.bot_logo}  ${isCurrentBranchOpen ? css.bot_logo_background_open : ""}`}>
                                        <MessageLogoIcon fillPath={"currentColor"} />
                                    </div>
                                </div>
                            ) : <GeneralLogo/>}
                        </div>
                        <MessageNodeVersionSelector message={data} />
                    </div>
                    <div className={css.message_content}>

                        <div ref={messageRef}>
                            <ChatMessageContent messageData={data}/>

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
                                    className={clsx(css.steps_button, { [css.active_steps_button]: isAllStepOpen })}
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
                                            <PlayButtonIcon fill="currentColor" />
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
                                            {/*<div className={css.download_menu} ref={downloadMenuRef}>*/}
                                            {/*    <ul>*/}
                                            {/*        <li onClick={setCloseHandler(downloadPDF)}>.png</li>*/}
                                            {/*        <li onClick={setCloseHandler(downloadPDF)}>.txt</li>*/}
                                            {/*        <li onClick={setCloseHandler(downloadPDF)}>.pdf</li>*/}
                                            {/*    </ul>*/}
                                            {/*</div>*/}
                                        </CSSTransition>
                                    </div>
                                    <button onClick={handleCopy} className={css.button_steps_green}>
                                        <span className={css.tooltip}>Copy chat text</span>
                                        <CopyButtonIcon />
                                    </button>

                                </Flex>
                            </Flex>
                        )}
                    </div>
                </div>
            </MathJaxContext>
            {!isCurrentBranchOpen && <FavButton
                data={data}
                className={css.custom_fav_button}/>
            }
        </div>
    );
}
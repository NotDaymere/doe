import React from "react";

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

// Icons
import CrossIcon from "src/shared/icons/Cross.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import SendIcon from "src/shared/icons/Send.icon";
import { ReactComponent as Logo } from "src/assets/icons/general-logo.svg";
import { SvgIcon } from "src/components/icon";

// Chat message utilities
import { parseContent } from "src/components/chat-message/parseContent";
import { parseTextFormatting } from "src/components/chat-message/parseTextFormatting";
import ChartRenderer from "src/components/chat-message/parseChart";

// Styles
import css from "./ChatMessage.module.less";
import "highlight.js/styles/github-dark.css";
import PlayIcon from "src/shared/icons/Play.icon";
import DownloadIcon from "src/shared/icons/Download.icon";
import CopyIcon from "src/shared/icons/Copy.icon";
import { useClickOut } from "src/shared/hooks/useClickOut";

interface Props {
    data: IMessage;
    editor: EditorTiptap | null;
}

export const ChatMessage: React.FC<Props> = ({ data }) => {
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

    const [isEdit, setEdit] = React.useState(false);
    const [content, setContent] = React.useState(data.content);
    const { editor, setEditor } = useChatStore();
    const parsedContent = parseContent(content);
    const messageRef = React.useRef<HTMLDivElement>(null);
    const { setPlayground } = useApp().app;
    React.useEffect(() => {
        if (messageRef.current) {
            const codeBlocks = messageRef.current.querySelectorAll("code");
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [content, messageRef]);
    const [isPaused, setIsPaused] = React.useState(true);
    const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance | null>(null);
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

        synth.current.speak(utterance);
        setIsPaused(false);
    };

    const handleStop = () => {
        synth.current.cancel();

        setIsPaused(true);
    };

    const toggleEdit = () => {
        setEdit(!isEdit);
    };

    const cancelEdit = () => {
        setContent(data.content);
        setEdit(false);
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
        if (isEdit) {
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
                        <button className={css.edit_controls_cancelBtn} onClick={cancelEdit}>
                            <CrossIcon />
                        </button>
                        <button className={css.edit_controls_saveBtn}>
                            <SendIcon />
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className={css.input}>
                <button className={css.input_editBtn} onClick={toggleEdit}>
                    <span className={css.svg_wrapper}>
                        <PenIcon />
                        <span className={css.tooltip}>Edit</span>
                    </span>
                </button>
                <div
                    className={css.input_message}
                    dangerouslySetInnerHTML={{
                        __html: data.content,
                    }}
                />
            </div>
        );
    }
    if (data.isCode) {
        return (
            <div
                className={`${css.chat_message} ${data.isUser ? css.user_message : css.bot_message}`}
            >
                {!data.isUser && (
                    <div className={css.bot_logo_background}>
                        <div className={css.bot_logo}>
                            <Logo />
                        </div>
                    </div>
                )}
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
                                    className={`${css.button_steps_grey} ${isPaused ? css.glowing_border : ""}`}
                                    onClick={isPaused ? handlePlay : handleStop}
                                >
                                    <span className={css.tooltip}>Listen answer</span>

                                    <PlayIcon />
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

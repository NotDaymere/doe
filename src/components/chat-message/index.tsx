import { Editor } from "@tiptap/react";
import { Button, Flex } from "antd";
import { MathJax } from "better-react-mathjax";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import jsPDF from "jspdf";
import React, { FC, useEffect, useRef, useState } from "react";
import { ReactComponent as Logo } from "src/assets/icons/general-logo.svg";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import { useApp } from "../app";
import { SvgIcon } from "../icon";
import { FileItem } from "../ui/FileItem";
import "./index.less";
import ChartRenderer from "./parseChart";
import { parseContent } from "./parseContent";
import { parseTextFormatting } from "./parseTextFormatting";

interface ChatMessageProps {
    id: number | null;
    content: string;
    files?: UploadFile[];
    editor: Editor | null;
    isUser?: boolean;
    isCode?: boolean;
    onEditMessage: React.Dispatch<
        React.SetStateAction<{
            id: number | null;
        }>
    >;
}

export const ChatMessage: FC<ChatMessageProps> = ({
    id,
    content,
    editor,
    files,
    isUser = false,
    isCode = false,
    onEditMessage,
}) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const [isTypedComplete, setIsTypedComplete] = useState(false);
    const { isTyping, setIsTyping } = useApp().app;
    const { setPlayground } = useApp().app;
    const parsedContent = parseContent(content);

    useEffect(() => {
        if (isTypedComplete) {
            setIsTyping(false);
        }
    }, [isTypedComplete, setIsTyping]);

    useEffect(() => {
        if (messageRef.current) {
            const codeBlocks = messageRef.current.querySelectorAll("code");
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [content, isTypedComplete, messageRef]);

    const openSourcePlayground = () => {
        setPlayground((prev) => ({
            ...prev,
            type: "source",
            open: true,
        }));
    };

    const openCodePlayground = () => {
        setPlayground((prev) => ({
            ...prev,
            type: "code",
            open: true,
        }));
    };
    const openTablePlayground = () => {
        setPlayground((prev) => ({
            ...prev,
            type: "table",
            open: true,
        }));
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

    const handleSetEditMessage = () => {
        if (editor) {
            editor.commands.setContent(content);
        }
        onEditMessage({ id });
    };

    return (
        <Flex vertical>
            <div className={`message-container ${isUser ? "user" : "bot"}`}>
                {!isUser && (
                    <div className={"bot-logo"}>
                        <Logo />
                    </div>
                )}

                {isUser && (
                    <div className={"edit-button"} onClick={handleSetEditMessage}>
                        <SvgIcon type={"pencil"} />
                    </div>
                )}

                <div className={`chat-message ${isUser ? "user-message" : "bot-message"}`}>
                    <div className={"message-content"}>
                        <div ref={messageRef}>
                            <MathJax>
                                {parsedContent.map((part, index) => {
                                    if (part.type === "text" && !isUser) {
                                        return (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: parseTextFormatting(part.content),
                                                }}
                                            />
                                        );
                                    } else if (part.type === "chart" && !isUser) {
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
                        {!isUser && (
                            <Flex vertical>
                                <Flex justify={"space-between"} className={"message-actions"}>
                                    <Button onClick={openTablePlayground} className={'table-playground-button'}>
                                        <TableIcon /> Table Random Values
                                    </Button>
                                </Flex>
                                <Flex justify={"space-between"} className={"message-actions"}>
                                <Button
                                    icon={
                                        <SvgIcon
                                            style={{ width: "15px", height: "15px" }}
                                            type={"seeAllStepsIcon"}
                                        />
                                    }
                                    onClick={openSourcePlayground}
                                >
                                    See all steps
                                </Button>
                                <Flex gap={10}>
                                    <Button onClick={openCodePlayground}>Playground</Button>
                                    <Button
                                        onClick={downloadPDF}
                                        icon={
                                            <SvgIcon
                                                style={{ width: "15px", height: "15px" }}
                                                type={"downloadAnswerIcon"}
                                            />
                                        }
                                    />
                                    <Button
                                        icon={
                                            <SvgIcon
                                                style={{ width: "15px", height: "15px" }}
                                                type={"copyAnswerIcon"}
                                            />
                                        }
                                        onClick={handleCopy}
                                    />
                                </Flex>
                            </Flex>
                            </Flex>
                        )}
                    </div>
                </div>
            </div>

            {files && (
                <Flex gap={4} style={{ flexWrap: "nowrap", overflowX: "auto" }}>
                    {files?.map((file, index) => (
                        <FileItem index={index} key={file.name} file={file} isLink={true} />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

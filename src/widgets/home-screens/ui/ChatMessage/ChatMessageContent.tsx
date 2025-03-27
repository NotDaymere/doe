import React, { useEffect, useMemo, useRef } from "react";
import { MathJax } from "better-react-mathjax";
import hljs from "highlight.js";
import { parseContent } from "src/components/chat-message/parseContent";
import { parseTextFormatting } from "src/components/chat-message/parseTextFormatting";
import ChartRenderer from "./assets/ChatRenderer/ChatRenderer";
import { IMessage } from "../../../../shared/types/Message";

interface Props {
    messageData: IMessage;
}

const ChatMessageContent: React.FC<Props> = React.memo(({messageData }) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const parsedContent = useMemo(() => parseContent(messageData.content), [messageData.content]);

    useEffect(() => {
        messageRef.current
            ?.querySelectorAll("code")
            .forEach(el => hljs.highlightElement(el as HTMLElement));
    }, [messageData]);

    return (
        <div ref={messageRef}>
            <MathJax>
                {parsedContent.map((part, index) => {
                    if (part.type === "text" && !messageData.isUser) {
                        return (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: parseTextFormatting(part.content),
                                }}
                            />
                        );
                    } else if (part.type === "chart" && !messageData.isUser) {
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
    );
});

export default ChatMessageContent;

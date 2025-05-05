import { MathJax } from "better-react-mathjax";
import { memo, useEffect } from "react";
import css from "../ChatMessage.module.less";

interface ChatMathBlockProps {
    content?: string | null;
    isVisible?: boolean;
    step?: number;
}

const ChatMathBlock = ({ content, isVisible, step }: ChatMathBlockProps) => {
    if (!content) return null;

    useEffect(() => {}, [step]);

    return (
        <MathJax dynamic hideUntilTypeset="first">
            <div
                className={css.mathWrapper}
                style={{
                    opacity: isVisible ? 1 : 0,
                    maxHeight: isVisible ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "opacity 0s ease, max-height 0s ease",
                }}
            >
                {content}
            </div>
        </MathJax>
    );
};

export default memo(ChatMathBlock);

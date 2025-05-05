import { MathJax } from "better-react-mathjax";
import { memo } from "react";
import css from "../ChatMessage.module.less";

interface ChatMathBlockProps {
    content?: string | null;
    isVisible?: boolean;
}

const ChatMathBlock = ({ content, isVisible }: ChatMathBlockProps) => {
    if (!content) return null;

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

import { MathJax } from "better-react-mathjax";
import { memo, useEffect } from "react";
import css from "../OnboardingChatMessage.module.less";

interface OnboardingChatMathBlockProps {
    content?: string | null;
    isVisible?: boolean;
    step?: number;
}

const OnboardingChatMathBlock = ({ content, isVisible, step }: OnboardingChatMathBlockProps) => {
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

export default memo(OnboardingChatMathBlock);

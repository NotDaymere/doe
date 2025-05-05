import { MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import { mathBlock } from "src/helpers/onboardingMessages";
import { OnboardingMessage } from "src/shared/types/Message";
import ChatMessage from "../ChatMessage";
import css from "./HistorySlider.module.less";

interface HistorySliderProps {
    messages: OnboardingMessage[];
    step: number;
}

const mathJaxConfig = {
    tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
    },
};

export const HistorySlider = ({ messages, step }: HistorySliderProps) => {
    const historyRef = useRef<HTMLDivElement>(null);
    const secondRef = useRef<HTMLDivElement>(null);
    const [mathKey, setMathKey] = useState(0);

    const mathMessage: OnboardingMessage = {
        role: "ai",
        content:
            "Sure! Here’s a basic overview of matrix mathematics along with an example to illustrate some key operations: addition, multiplication, and determinants:",
        mathBlock: mathBlock,
        content2: `<b>Implications</b></br></br> <div style="margin-left: 16px;">1. Representable Functors: A functor is representable if it is isomorphic to Hom(−,X) for some object X in C. This concept is essential in many areas of mathematics, including algebraic geometry and topology.</br></br>2.Characterization of Objects: Objects in the category can be characterized entirely by their morphisms to other objects, which provides a deep understanding of their structure.</br></br>3. Foundational Result: The Yoneda Lemma and the Yoneda Embedding provide a foundational framework for many concepts in category theory, such as limits, colimits, and adjunctions.</div>`,
    };

    useEffect(() => {
        if (secondRef.current && step !== 40) {
            // setMathKey((prev) => prev + 1);
            secondRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [step]);

    return (
        <div className={css.history_slider}>
            <div className={css.slide}>
                <div className={css.branch}>
                    Create a simple project for me in any language. Using math mode.
                </div>
                <div className={css.chatHistoryContainer} ref={historyRef}>
                    <div className={css.chatHistoryContent}>
                        {messages.map((msg, index) => (
                            <MathJaxContext config={mathJaxConfig} key={index}>
                                <ChatMessage
                                    message={msg}
                                    prevRole={index > 0 ? messages[index - 1]?.role : undefined}
                                    // setTypingDone={setTypingDone}
                                    ref={historyRef}
                                    noTypeEffect
                                    step={step}
                                />
                            </MathJaxContext>
                        ))}
                    </div>
                </div>
            </div>

            {/* ----------- slide for horizontal scrolling ----------- */}
            <div className={css.slide} ref={secondRef}>
                <div className={css.branch}>
                    Create a simple project for me in any language. Using math mode.
                </div>
                <div className={css.chatHistoryContainer}>
                    <div className={css.chatHistoryContent}>
                        <MathJaxContext config={mathJaxConfig}>
                            <ChatMessage
                                key={mathKey}
                                message={mathMessage}
                                // setTypingDone={setTypingDone}
                                noTypeEffect
                                step={step}
                            />
                        </MathJaxContext>
                    </div>
                </div>
            </div>
        </div>
    );
};

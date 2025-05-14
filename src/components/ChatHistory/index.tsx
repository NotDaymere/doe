import { MathJaxContext } from "better-react-mathjax";
import clsx from "clsx";
import { memo, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { OnboardingMessage } from "src/shared/types/Message";
import { BranchBar } from "../BranchBar";
import ChatMessage from "../ChatMessage";
import css from "./ChatHistory.module.less";

interface ChatHistoryProps {
    messages: OnboardingMessage[];
    step: number;
    setStep: (value: number) => void;
}

const mathJaxConfig = {
    tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
    },
};

const ChatHistory = ({ messages, step, setStep }: ChatHistoryProps) => {
    const historyRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={historyRef}
            className={clsx(css.chatHistoryContainer, {
                [css.low_padding]: step >= 28.1,
                [css.half]: step === 40,
            })}
        >
            <div className={css.chatHistoryContent}>
                <MathJaxContext config={mathJaxConfig}>
                    <TransitionGroup component={null}>
                        {messages.map((msg, index) => (
                            <CSSTransition
                                key={index}
                                timeout={1000}
                                classNames={{
                                    exit: css.msgExit,
                                    exitActive: css.msgExitActive,
                                }}
                                unmountOnExit
                            >
                                <ChatMessage
                                    message={msg}
                                    prevRole={index > 0 ? messages[index - 1]?.role : undefined}
                                    step={step}
                                    ref={historyRef}
                                    noTypeEffect={step === 35 || step >= 44 || msg.noTypeEffect}
                                    setStep={setStep}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </MathJaxContext>
            </div>
            {step >= 39 && <BranchBar />}
        </div>
    );
};

export default memo(ChatHistory);

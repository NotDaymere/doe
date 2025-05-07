import { MathJaxContext } from "better-react-mathjax";
import clsx from "clsx";
import { memo, useRef } from "react";
import { OnboardingMessage } from "src/shared/types/Message";
import { BranchBar } from "../BranchBar";
import ChatMessage from "../ChatMessage";
import css from "./ChatHistory.module.less";

interface ChatHistoryProps {
    messages: OnboardingMessage[];
    step: number;
    userClickedTranslate: boolean;
    setStep: (value: number) => void;
    handleUntranslatedTypedOut: () => void;
    handleVoiceMessageAppearing: () => void;
}

const mathJaxConfig = {
    tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
    },
};

const ChatHistory = ({
    messages,
    step,
    userClickedTranslate,
    setStep,
    handleUntranslatedTypedOut,
    handleVoiceMessageAppearing,
}: ChatHistoryProps) => {
    const historyRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={historyRef}
            className={clsx(css.chatHistoryContainer, {
                [css.low_padding]: step >= 29,
                [css.half]: step === 40,
            })}
        >
            <div className={css.chatHistoryContent}>
                {messages.map((msg, index) => (
                    <MathJaxContext config={mathJaxConfig} key={index}>
                        <ChatMessage
                            message={msg}
                            prevRole={index > 0 ? messages[index - 1]?.role : undefined}
                            step={step}
                            ref={historyRef}
                            userClickedTranslate={userClickedTranslate}
                            noTypeEffect={step >= 44}
                            setStep={setStep}
                            handleUntranslatedTypedOut={handleUntranslatedTypedOut}
                            handleVoiceMessageAppearing={handleVoiceMessageAppearing}
                        />
                    </MathJaxContext>
                ))}
            </div>
            {step >= 39 && <BranchBar />}
        </div>
    );
};

export default memo(ChatHistory);

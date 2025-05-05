import { OnboardingMessage } from "src/shared/types/Message";
import ChatMathBlock from "../ChatMathBlock";
import css from "./ChatMessage.module.less";

interface Props {
    isAI: boolean;
    step: number;
    message: OnboardingMessage;
    typedText: string;
    isTypingDone: boolean;
    noTypeEffect?: boolean;
    showMath?: boolean;
}

export const ChatMessageContent = ({
    isAI,
    step,
    message,
    typedText,
    isTypingDone,
    noTypeEffect,
    showMath,
}: Props) => {
    if (isAI) {
        return (
            <>
                {step !== 19 && step !== 21 && step !== 21.1 && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                isTypingDone || noTypeEffect
                                    ? message.content
                                    : typedText + `<span class="${css.caret}"></span>`,
                        }}
                    />
                )}
                <ChatMathBlock content={message.mathBlock} isVisible={showMath} />
                {message.content2 && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: message.content2,
                        }}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div
                dangerouslySetInnerHTML={{
                    __html: message.content,
                }}
            />
            {message.mathBlock && (
                <div className={css.user_math_block}>
                    <ChatMathBlock content={message.mathBlock} isVisible={showMath} />
                </div>
            )}
        </>
    );
};

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { OnboardingMessage } from "src/shared/types/Message";
import ChatMathBlock from "../ChatMathBlock";
import css from "../ChatMessage.module.less";
import { ChatMessageCodeButtons } from "../ChatMessageCodeButtons";

interface Props {
    isAI: boolean;
    step: number;
    message: OnboardingMessage;
    typedText: string;
    isTypingDone: boolean;
    noTypeEffect?: boolean;
    setStep?: (value: number) => void;
}

export const ChatMessageContent = ({
    isAI,
    step,
    message,
    typedText,
    isTypingDone,
    noTypeEffect,
    setStep,
}: Props) => {
    const { setCursorMoving } = useCursor();
    const containerRef = useRef<HTMLDivElement>(null);
    const showMath = isTypingDone || noTypeEffect || message.noTypeEffect;

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // const button = target.closest("#simulate-selection button");
            if (step === 35 && target.matches("#simulate-selection button")) {
                e.preventDefault();
                setCursorMoving();
                setStep?.(36);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("click", handleClick);
        }

        return () => {
            if (container) {
                container.removeEventListener("click", handleClick);
            }
        };
    }, [step]);

    if (isAI) {
        return (
            <>
                <div
                    className={clsx(css.hide_button, { [css.show_button]: step === 35 })}
                    ref={containerRef}
                    dangerouslySetInnerHTML={{
                        __html:
                            isTypingDone || noTypeEffect
                                ? message.content
                                : typedText + `<span class="${css.caret}"></span>`,
                    }}
                />
                <ChatMathBlock content={message.mathBlock} isVisible={showMath} step={step} />
                {message.hasCode && <ChatMessageCodeButtons isVisible={isTypingDone} />}
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
                    <ChatMathBlock content={message.mathBlock} isVisible={showMath} step={step} />
                </div>
            )}
        </>
    );
};

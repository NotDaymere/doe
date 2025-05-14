import cn from "classnames";
import clsx from "clsx";
import { forwardRef, memo } from "react";
import { ReactComponent as DoeLogoIcon } from "src/assets/icons/logo-gradient.svg";
import { ReactComponent as TranslateIcon } from "src/assets/icons/translateIcon.svg";
import recording from "src/assets/images/recording.png";
import { useScrollIntoViewOnUpdate } from "src/hooks/useScrollIntoViewOnUpdate";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import { OnboardingMessage } from "src/shared/types/Message";
import { ChatBetaWidget } from "./ChatBetaWidget/intex";
import css from "./ChatMessage.module.less";
import { ChatMessageContent } from "./ChatMessageContent";
import { ChatMessageTranslation } from "./ChatMessageTranslation";

interface ChatMessageProps {
    message: OnboardingMessage;
    prevRole?: "user" | "ai";
    step: number;
    noTypeEffect?: boolean;
    setStep?: (value: number) => void;
    handleFirstReadyMessage?: () => void;
    handleSecondReadyMessage?: () => void;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
    (
        {
            message,
            prevRole,
            step,
            noTypeEffect,
            setStep,
            handleFirstReadyMessage,
            handleSecondReadyMessage,
        },
        ref
    ) => {
        const isAI = message.role === "ai";
        const isTranslation = isAI && message.origin;
        const isRecording = isAI && message.recording;

        const { text: typedText, isDone: isTypingDone } = useTypewriterEffect({
            text: message.content,
            speed: message.content.length > 200 ? 18 : 70,
            startTyping: isAI && !noTypeEffect,
            onComplete: () => {
                if (step === 8.3) setStep?.(8.4);
                if (step === 9.3) setStep?.(9.4);
                if (step === 19) setStep?.(20);
                if (step === 21) setStep?.(22);
                if (step === 28.1) {
                    setTimeout(() => setStep?.(29), 1000);
                    setTimeout(() => setStep?.(30), 1500);
                }
                if (step === 58) handleFirstReadyMessage?.();
                if (step === 59) handleSecondReadyMessage?.();
            },
        });

        useScrollIntoViewOnUpdate(ref, [typedText, isTypingDone]);

        return (
            <div
                className={cn(css.messageWrapper, {
                    [css.aiMessageWrapper]: isAI,
                    [css.userMessageWrapper]: !isAI,
                })}
            >
                <LogoIcon show={isAI && prevRole !== "ai"} step={step} />
                <div
                    className={cn(css.message, {
                        [css.aiMessage]: isAI,
                        [css.userMessage]: !isAI,
                        [css.translationMessage]: isTranslation || isRecording,
                        [css.selectText]: step === 35,
                    })}
                >
                    {isTranslation && (
                        <div className={css.translate_icon}>
                            <TranslateIcon />
                        </div>
                    )}
                    {isRecording && (
                        <div className={css.recording_img_container}>
                            <img src={recording} alt="recording" className={css.recording_img} />
                        </div>
                    )}
                    <ChatMessageContent
                        isAI={isAI}
                        step={step}
                        message={message}
                        typedText={typedText}
                        isTypingDone={isTypingDone}
                        noTypeEffect={noTypeEffect}
                        setStep={setStep}
                    />
                    {isTranslation && (
                        <ChatMessageTranslation message={message} noTypeEffect={noTypeEffect} />
                    )}
                    {message.betaWidget && isTypingDone && <ChatBetaWidget />}
                </div>
            </div>
        );
    }
);

export default memo(ChatMessage);

interface LogoIconProps {
    show: boolean;
    step: number;
}

export const LogoIcon = memo(({ show, step }: LogoIconProps) => {
    if (!show) return null;

    const noShadow = step >= 28 && step <= 57 && step !== 28.1;
    const blackLogo = step >= 40 && step <= 42;

    return (
        <div
            className={clsx(css.logoIcon, {
                [css.logoIcon_no_shadow]: noShadow,
                [css.logoIcon_black]: blackLogo,
            })}
        >
            <DoeLogoIcon />
        </div>
    );
});

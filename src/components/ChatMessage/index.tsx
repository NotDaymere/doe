import cn from "classnames";
import clsx from "clsx";
import { forwardRef, memo } from "react";
import { ReactComponent as DoeLogoIcon } from "src/assets/icons/logo-gradient.svg";
import { ReactComponent as TranslateIcon } from "src/assets/icons/translateIcon.svg";
import recording from "src/assets/images/recording.png";
import { useScrollIntoViewOnUpdate } from "src/hooks/useScrollIntoViewOnUpdate";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import { OnboardingMessage } from "src/shared/types/Message";
import css from "./ChatMessage.module.less";
import { ChatMessageContent } from "./ChatMessageContent";
import { ChatMessageTranslation } from "./ChatMessageTranslation";

interface ChatMessageProps {
    message: OnboardingMessage;
    prevRole?: "user" | "ai";
    step: number;
    noTypeEffect?: boolean;
    userClickedTranslate?: boolean;
    setStep?: (value: number) => void;
    handleUntranslatedTypedOut?: () => void;
    handleVoiceMessageAppearing?: () => void;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
    (
        {
            message,
            prevRole,
            step,
            noTypeEffect,
            setStep,
            handleUntranslatedTypedOut,
            handleVoiceMessageAppearing,
        },
        ref
    ) => {
        const isAI = message.role === "ai";
        const isTranslation = isAI && message.origin;
        const isRecording = isAI && message.recording;

        const { text: typedText, isDone: isTypingDone } = useTypewriterEffect({
            text: message.content,
            speed: message.content.length > 200 ? 18 : 70,
            startTyping: isAI && !noTypeEffect && ![19, 19.1, 21, 21.1].includes(step),
            onComplete: () => {
                if (step === 28.1) {
                    setTimeout(() => setStep?.(29), 1000);
                    setTimeout(() => setStep?.(30), 1500);
                }
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
                            <img
                                src={recording}
                                alt="recording"
                                className={css.recording_img}
                                onAnimationEnd={handleVoiceMessageAppearing}
                            />
                        </div>
                    )}
                    <ChatMessageContent
                        isAI={isAI}
                        step={step}
                        message={message}
                        typedText={typedText}
                        isTypingDone={isTypingDone}
                        noTypeEffect={noTypeEffect}
                    />
                    {isTranslation && (
                        <ChatMessageTranslation
                            message={message}
                            step={step}
                            handleUntranslatedTypedOut={handleUntranslatedTypedOut}
                        />
                    )}
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

    const noShadow = step >= 28 && step <= 57;
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

import { MathJax } from "better-react-mathjax";
import cn from "classnames";
import { forwardRef, memo, useEffect, useMemo, useState } from "react";
import { ReactComponent as DoeLogoIcon } from "src/assets/icons/logo-gradient.svg";
import { ReactComponent as TranslateIcon } from "src/assets/icons/translateIcon.svg";
import { ReactComponent as TranslateIcon2 } from "src/assets/icons/translateIcon2.svg";
import { ReactComponent as VolumeIcon } from "src/assets/icons/volume.svg";
import recording from "src/assets/images/recording.png";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import { OnboardingMessage } from "src/shared/types/Message";
import css from "./ChatMessage.module.less";

interface ChatMessageProps {
    message: OnboardingMessage;
    prevRole?: "user" | "ai";
    step: number;
    noTypeEffect?: boolean;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
    ({ message, prevRole, step, noTypeEffect }, ref) => {
        const [isTypingDone, setIsTypingDone] = useState(false);
        const isAI = message.role === "ai";
        const isTranslation = isAI && message.origin;
        const isRecording = isAI && message.recording;

        const baseSpeed = 70;
        const fastSpeed = 18;
        const speed = message.content.length > 200 ? fastSpeed : baseSpeed;

        const typedText =
            isAI && !noTypeEffect
                ? useTypewriterEffect({
                      text: message.content,
                      speed,
                      onComplete: () => {
                          setIsTypingDone(true);
                      },
                      startTyping: !isTypingDone,
                  })
                : message.content;

        useEffect(() => {
            setIsTypingDone(false);
        }, [message.content]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "ArrowRight" && !isTypingDone) {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsTypingDone(true);
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [isTypingDone]);

        useEffect(() => {
            if (ref && typeof ref !== "function" && ref.current) {
                ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                });
            }
        }, [typedText, isTypingDone]);

        const mathElement = useMemo(() => {
            if (!message.mathBlock) return null;

            return (
                <MathJax dynamic hideUntilTypeset="first">
                    <div
                        className={css.mathWrapper}
                        style={{
                            opacity: isTypingDone || noTypeEffect || message.noTypeEffect ? 1 : 0,
                            maxHeight:
                                isTypingDone || noTypeEffect || message.noTypeEffect
                                    ? "500px"
                                    : "0px",
                            overflow: "hidden",
                            transition: "opacity 0s ease, max-height 0s ease",
                        }}
                    >
                        {message.mathBlock}
                    </div>
                </MathJax>
            );
        }, [isTypingDone, message.mathBlock]);

        const memoizedLogoIcon = useMemo(() => {
            if (isAI && prevRole !== "ai") {
                return (
                    <div className={css.logoIcon}>
                        <DoeLogoIcon />
                    </div>
                );
            }
            return null;
        }, [isAI, prevRole]);

        return (
            <div
                className={cn(css.messageWrapper, {
                    [css.aiMessageWrapper]: isAI,
                    [css.userMessageWrapper]: !isAI,
                    [css.wrapperFullWidth]: isTranslation || isRecording,
                })}
            >
                {memoizedLogoIcon}
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
                            <img src={recording} alt="recording" />
                        </div>
                    )}
                    {isAI ? (
                        <>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        isTypingDone || noTypeEffect
                                            ? message.content
                                            : typedText + `<span class="${css.caret}"></span>`,
                                }}
                            />
                            {mathElement}
                            {message.content2 && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: message.content2,
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {message.content}
                            <div className={css.user_math_block}>{mathElement}</div>
                        </>
                    )}
                    {isTranslation && (
                        <div className={css.translate_buttons}>
                            <button className={css.translate_volume_button}>
                                <VolumeIcon />
                            </button>
                            <button className={css.translate_button}>
                                <TranslateIcon2 />
                            </button>
                        </div>
                    )}
                    {isTranslation && isTypingDone && (
                        <div className={css.origin_container}>
                            <div
                                className={css.origin}
                                dangerouslySetInnerHTML={{
                                    __html: message.origin || "Translation",
                                }}
                            ></div>
                            <div
                                className={css.origin_transcribed}
                                dangerouslySetInnerHTML={{
                                    __html: message.originTranscribed || "Translation",
                                }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default memo(ChatMessage);

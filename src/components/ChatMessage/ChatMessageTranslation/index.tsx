import { ReactComponent as TranslateIcon } from "src/assets/icons/translateIcon2.svg";
import { ReactComponent as VolumeIcon } from "src/assets/icons/volume.svg";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import { OnboardingMessage } from "src/shared/types/Message";
import css from "../ChatMessage.module.less";

interface ChatMessageTranslationProps {
    message: OnboardingMessage;
    step: number;
    handleUntranslatedTypedOut?: () => void;
}

export const ChatMessageTranslation = ({
    message,
    step,
    handleUntranslatedTypedOut,
}: ChatMessageTranslationProps) => {
    const { text: typedOriginalMessage, isDone } = useTypewriterEffect({
        text: message.origin || "origin",
        speed: 25,
        onComplete: () => {
            handleUntranslatedTypedOut?.();
        },
    });

    return (
        <>
            <div className={css.translate_buttons}>
                <button className={css.translate_volume_button}>
                    <VolumeIcon />
                </button>
                <button className={css.translate_button}>
                    <TranslateIcon />
                </button>
            </div>
            <div className={css.origin_container}>
                {message.origin && (
                    <div
                        className={css.origin}
                        dangerouslySetInnerHTML={{
                            __html: isDone
                                ? message.origin
                                : typedOriginalMessage + `<span class="${css.caret}"></span>`,
                        }}
                    />
                )}
                {isDone && (
                    <div
                        className={css.origin_transcribed}
                        dangerouslySetInnerHTML={{
                            __html: message.originTranscribed || "Translation",
                        }}
                    />
                )}
            </div>
        </>
    );
};

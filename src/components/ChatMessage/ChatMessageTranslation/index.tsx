import { ReactComponent as TranslateIcon } from "src/assets/icons/translateIcon2.svg";
import { ReactComponent as VolumeIcon } from "src/assets/icons/volume.svg";
import { useCursor } from "src/contexts/CursorContext";
import { useTypewriterEffect } from "src/hooks/useTypewriterEffect";
import { OnboardingMessage } from "src/shared/types/Message";
import css from "../ChatMessage.module.less";

interface ChatMessageTranslationProps {
    message: OnboardingMessage;
    noTypeEffect?: boolean;
}

export const ChatMessageTranslation = ({ message, noTypeEffect }: ChatMessageTranslationProps) => {
    const { setCursorMoving } = useCursor();

    const { text: typedOriginalMessage, isDone } = useTypewriterEffect({
        text: message.origin || "origin",
        speed: 25,
        onComplete: () => {
            setCursorMoving();
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
                            __html:
                                isDone || noTypeEffect
                                    ? message.origin
                                    : typedOriginalMessage + `<span class="${css.caret}"></span>`,
                        }}
                    />
                )}
                {(isDone || noTypeEffect) && (
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

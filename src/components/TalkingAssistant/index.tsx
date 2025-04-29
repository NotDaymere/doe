import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as CameraIcon } from "src/assets/icons/camera.svg";
import { ReactComponent as ExitIcon } from "src/assets/icons/exit.svg";
import { ReactComponent as MicrophoneIcon } from "src/assets/icons/microphone.svg";
import { ReactComponent as AssistantIcon } from "src/assets/icons/talking-assistant.svg";
import person from "src/assets/images/person.png";
import css from "./TalkingAssistant.module.less";

interface TalkingAssistantProps {
    step: number;
}

export const TalkingAssistant = ({ step }: TalkingAssistantProps) => {
    if (step <= 45 || step >= 50) return null;
    const [isImgAnimDone, setIsImgAnimDone] = useState(false);

    return (
        <div
            className={clsx(css.assistant_container, {
                [css.assistant_container_with_image]: step >= 49,
            })}
        >
            {step >= 47 && (
                <div className={css.assistant_message}>
                    <p className={css.assistant_text}>Hey, John. How can I help you?</p>
                </div>
            )}
            {step >= 48 && (
                <div className={css.assistant_buttons}>
                    <button className={css.assistant_button}>
                        <MicrophoneIcon />
                    </button>
                    <button
                        className={clsx(css.assistant_button, { [css.active]: step === 48 })}
                        data-step="camera"
                    >
                        <CameraIcon />
                    </button>
                    <button className={css.assistant_button}>
                        <ExitIcon />
                    </button>
                </div>
            )}
            <div className={css.assistant_circle}>
                <AssistantIcon />
            </div>
            {step >= 49 && (
                <div className={css.assistant_image_container}>
                    <img
                        src={person}
                        alt="Person image"
                        className={css.assistant_image}
                        onAnimationEnd={() => setIsImgAnimDone(true)}
                    />
                    <div
                        className={clsx(css.assistant_image_menu, { [css.visible]: isImgAnimDone })}
                    >
                        <button className={css.assistant_button}>
                            <MicrophoneIcon />
                        </button>
                        <button
                            className={clsx(css.assistant_button, { [css.active]: step === 48 })}
                            data-step="camera"
                        >
                            <CameraIcon />
                        </button>
                        <button className={css.assistant_button}>
                            <ExitIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import css from "./TalkModeMessages.module.less";
import { CloseMessageIcon } from "../../../../../shared/icons/CloseMessage.icon";

interface TalkModeMessagesProps {
    showMessage: boolean;
    message: string;
    closeBubbleHandler: () => void;
}

export const TalkModeMessages: React.FC<TalkModeMessagesProps> = ({
                                                                      showMessage,
                                                                      message,
                                                                      closeBubbleHandler,
                                                                  }) => {

    const [typedText, setTypedText] = useState("");

    const isEmptyOrWhitespace = message.trim().length === 0;

    useEffect(() => {
        if (!showMessage || isEmptyOrWhitespace) {
            setTypedText("");
            return;
        }

        setTypedText("");
        let currentIndex = 0;

        const timer = setInterval(() => {
            setTypedText((prev) => {
                const nextText = prev + message.charAt(currentIndex);
                currentIndex++;

                if (currentIndex >= message.length) {
                    clearInterval(timer);
                }
                return nextText;
            });
        }, 40);

        return () => clearInterval(timer);
    }, [showMessage, message, isEmptyOrWhitespace]);

    if (!showMessage || isEmptyOrWhitespace) {
        return null;
    }

    const dynamicMaxWidth = message.length > 100 ? 300 : 150;

    return (
        <div
            className={clsx(css.messageBubble, { [css._showBubble]: showMessage })}
            style={{ maxWidth: dynamicMaxWidth }}
        >
            <p className={css.messageText}>{typedText.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>
            ))}</p>

            <button className={css.bubbleCloseButton} onClick={closeBubbleHandler}>
                <CloseMessageIcon />
            </button>
        </div>
    );
};

import React from "react";
import clsx from "clsx";
import css from "./TalkModeMessages.module.less"
import { CloseMessageIcon } from "../../../../../shared/icons/CloseMessage.icon";

interface TalkModeMessagesProps {
    showMessage: boolean;
    closeBubbleHandler: () => void;
}

export const TalkModeMessages: React.FC<TalkModeMessagesProps> = ({
                                                                      showMessage,
                                                                      closeBubbleHandler,
                                                                  }) => {
    return (
        <div
            className={clsx(css.messageBubble, {
                [css._showBubble]: showMessage,
            })}
        >
            <p className={css.messageText}>Hey, John. How can I help you?</p>
            <button className={css.bubbleCloseButton} onClick={closeBubbleHandler}>
                <CloseMessageIcon/>
            </button>
        </div>
    );
};

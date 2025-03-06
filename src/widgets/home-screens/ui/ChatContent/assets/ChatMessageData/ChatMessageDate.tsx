import React, { useMemo } from "react";
import css from "./ChatMessageDate.module.less";

interface ChatMessageDateProps {
    id: number;
}

const ChatMessageDateComponent: React.FC<ChatMessageDateProps> = ({ id }) => {
    const showDate = id % 5 === 0;

    if (!showDate) return null;

    const cachedDateString = useMemo(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const timeString = date.toLocaleString("en-US", options);
        return `Today, ${timeString}`;
    }, []);

    return (
        <div className={css.dateSeparator}>
            <span className={css.dateSeparator_text}>{cachedDateString}</span>
        </div>
    );
};

export const ChatMessageDate = React.memo(ChatMessageDateComponent);

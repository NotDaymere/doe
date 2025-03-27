import React from "react";
import StarsIcon from "../../../../../../../shared/icons/Stars.icon";
import UserMessageIcon from "../../../../../../../shared/icons/UserMessage.icon";
import ObliquePinIcon from "../../../../../../../shared/icons/ObliquePin.icon";
import "./ReflectionsMessageItem.less";
import { ReflectionsMessage } from "../ReflectionsMessage";

interface ReflectionsMessageItemProps {
    message: ReflectionsMessage;
    onTogglePinned: (id: number) => void;
}

export const ReflectionsMessageItem: React.FC<ReflectionsMessageItemProps> = ({
                                                                                  message,
                                                                                  onTogglePinned,
                                                                              }) => {
    const togglePinned = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onTogglePinned(message.id);
    };

    return (
        <div className="message-list-of-each-day-item">
            <div className="message-and-icon">
                <div className={`message-icon ${!message.isRead ? "new-message" : ""}`}>
                    {message.isUser ? <UserMessageIcon /> : <StarsIcon width={13} height={17} />}
                </div>
                <div>{message.content}</div>
            </div>
            <div
                className={`oblique_pin_icon ${message.isPinned ? "pinned_icon" : ""}`}
                onClick={togglePinned}
            >
                <ObliquePinIcon fill="currentColor" />
            </div>
        </div>
    );
};

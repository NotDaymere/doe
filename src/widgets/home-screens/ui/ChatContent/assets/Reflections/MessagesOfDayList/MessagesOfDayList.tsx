import React, { useState, useEffect, useRef } from "react";
import "./MessagesOfDayList.less";
import { ReflectionsMessageItem } from "../ReflectionsMessageItem/ReflectionsMessageItem";
import { ReflectionsMessage } from "../ReflectionsMessage";

interface MessagesOfDayProps {
    date: string;
    messages: ReflectionsMessage[];
    onTogglePinned: (id: number) => void;
    onMarkAsRead: (ids: number[]) => void;
}

export default function MessagesOfDayList({
                                          date,
                                          messages,
                                          onTogglePinned,
                                          onMarkAsRead,
                                      }: MessagesOfDayProps) {
    const [isMessageListVisible, setIsMessageListVisible] = useState(false);
    const prevVisibilityRef = useRef(isMessageListVisible);

    const toggleMessageList = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsMessageListVisible((prev) => !prev);
    };

    useEffect(() => {
        if (prevVisibilityRef.current && !isMessageListVisible) {
            const unreadIds = messages.filter((msg) => !msg.isRead).map((msg) => msg.id);
            if (unreadIds.length > 0) {
                onMarkAsRead(unreadIds);
            }
        }
        prevVisibilityRef.current = isMessageListVisible;
    }, [isMessageListVisible, messages, onMarkAsRead]);

    const getLastMessageTime = (): string => {
        if (messages.length === 0) return "";
        let latest = messages[0];
        messages.forEach((msg) => {
            const msgTime = new Date(`1970-01-01 ${msg.time}`);
            const latestTime = new Date(`1970-01-01 ${latest.time}`);
            if (msgTime > latestTime) {
                latest = msg;
            }
        });
        return latest.time;
    };

    const unreadCount = messages.filter((msg) => !msg.isRead).length;

    return (
        <div className="messages-of-day">
            <div className="messages-of-day-title">
                <div>
                    {`${date}, ${getLastMessageTime()}`}{" "}
                </div>
                <div className="messages-count-and-button">
                    {unreadCount > 0 && <div className="message-count">{unreadCount}</div>}
                    <div className="small-add-btn" onClick={toggleMessageList}>
                        {isMessageListVisible ? "-" : "+"}
                    </div>
                </div>
            </div>
                {isMessageListVisible && (
                <div className="message-list-of-each-day">
                    {messages.map((message) => (
                        <ReflectionsMessageItem
                            key={message.id}
                            message={message}
                            onTogglePinned={onTogglePinned}
                        />
                    ))}
                </div>
                )}
        </div>
    );
}

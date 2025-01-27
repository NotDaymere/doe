import React from "react";
import { useChatController } from "../..";
import { useChatStore } from "src/shared/providers";
import css from "./ChatContent.module.less";
import { ChatMessage } from "../ChatMessage";

export const ChatContent: React.FC = () => {
    const { chatRef } = useChatController();
    const { currentBranch, messages } = useChatStore();

    return (
        <div className={css.content}>
            <div className={css.content_inner}>
                <div className={css.content_chat} ref={chatRef}>
                    {messages.map((item) => (
                        <ChatMessage 
                            data={item} 
                            key={item.id} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
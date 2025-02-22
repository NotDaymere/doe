import React from "react";
import { useChatController } from "../..";
import { useChatStore } from "src/shared/providers";
import css from "./ChatContent.module.less";
import { ChatMessage } from "../ChatMessage";
import AllPlaygrounds from "./assets/AllPlaygrounds/AllPlaygrounds";

export const ChatContent: React.FC = () => {
    const { chatRef } = useChatController();
    const { messages } = useChatStore();
    const { playground, playgroundFullscreen } = useChatStore();
    return (
        <div className={playground.open ? (playgroundFullscreen ? css.content_playground_fullscreen : css.content_playground) : css.content}>
            <div className={css.content_inner}>
                {!playgroundFullscreen && <AllPlaygrounds />}
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
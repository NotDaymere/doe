import React, { useEffect } from "react";
import { useChatController } from "../..";
import { useAppStore, useChatStore } from "src/shared/providers";
import { ChatMessage } from "../ChatMessage";
import classNames from "classnames";
import MagicIcon from "src/shared/icons/Magic.icon";
import QuickSearch from "../QuickSearch";
import css from "./ChatContent.module.less";

export const ChatContent: React.FC = () => {
    const { chatRef } = useChatController();
    const { messages, showQuickSearch, setShowQuickSearch } = useChatStore();
    const { setPlayground, playground } = useAppStore();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "f") {
                event.preventDefault();
                setShowQuickSearch(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleStepsButtonClick = () => {
        setPlayground({
            ...playground,
            type: "source",
            open: !playground.open,
        });
    };

    return (
        <div className={css.content}>
            <div className={css.content_inner}>
                <div className={css.content_chat} ref={chatRef}>
                    <div className={css.message}>ChatMessage</div>
                    {messages.map((item) => (
                        <ChatMessage data={item} key={item.id} />
                    ))}
                    <div className={css.actions}>
                        <button
                            className={classNames(css.steps_button, {
                                [css.active_steps_button]: playground.open,
                            })}
                            onClick={handleStepsButtonClick}
                        >
                            <MagicIcon /> See all steps
                        </button>
                    </div>

                    {showQuickSearch && (
                        <div className={css.quickSearch}>
                            <QuickSearch onClose={setShowQuickSearch} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

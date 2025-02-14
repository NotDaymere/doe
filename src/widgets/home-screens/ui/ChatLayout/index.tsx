import React from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import css from "./ChatLayout.module.less";
import { useChatStore } from "../../../../shared/providers";

export const ChatLayout: React.FC = () => {
    const { playground } = useChatStore();
    return (
        <div className={ playground.open ? css.layout_playground : css.layout}>
            <div className={playground.open ? css.layout_sidebar_playground : css.layout_sidebar}>
                <Sidebar />
            </div>
            <div className={css.layout_chat}>
                <ChatContent />
                <ChatPanel />
            </div>
        </div>
    );
};

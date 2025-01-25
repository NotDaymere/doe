import React from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import css from "./ChatLayout.module.less";

export const ChatLayout: React.FC = () => {
    return (
        <div className={css.layout}>
            <div className={css.layout_sidebar}>
                <Sidebar />
            </div>
            <div className={css.layout_chat}>
                <ChatContent />
                <ChatPanel />
            </div>
        </div>
    );
};

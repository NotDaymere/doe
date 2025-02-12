import React from "react";
import { Sidebar } from "src/widgets/Sidebar";
import { ChatContent } from "../ChatContent";
import { ChatPanel } from "../ChatPanel";
import { useAppStore } from "src/shared/providers";
import PlaygroundRenderer from "../Playground";
import classNames from "classnames";
import css from "./ChatLayout.module.less";

export const ChatLayout: React.FC = () => {
    const { playground } = useAppStore();
    return (
        <div className={classNames(css.layout, { [css.layoutWithPlayground]: playground.open })}>
            <div className={css.layout_sidebar}>
                <Sidebar />
            </div>
            <div className={css.layout_chat}>
                <ChatContent />
                <ChatPanel />
            </div>
            {playground.open && <PlaygroundRenderer type={playground.type} />}
        </div>
    );
};

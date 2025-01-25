import React from "react";
import { Editor } from "src/shared/components/Editor";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import ScreenShareIcon from "src/shared/icons/ScreenShare.icon";
import MicrophoneIcon from "src/shared/icons/Microphone.icon";
import { useAppStore } from "src/shared/providers";
import { MagicMenu } from "../..";
import css from "./ChatPanel.module.less";

export const ChatPanel: React.FC = () => {
    const [value, setValue] = React.useState("");
    const { setActiveEditor } = useAppStore();

    return (
        <div className={css.panel}>
            <div className={css.panel_wrapper}>
                <MagicMenu />
                <Editor 
                    value={value}
                    onChange={setValue}
                    onFocus={setActiveEditor}
                    onBlur={() => setActiveEditor(null)}
                    className={css.panel_editor}
                    classNameEditor={css.panel_editor_editor}
                    placeholder="Ask Doe anything you’d like about the world..."
                />
                <button className={css.panel_button} disabled>
                    <ScreenShareIcon />
                </button>
                <button className={css.panel_button}>
                    <MicrophoneIcon />
                </button>
                <button className={css.panel_submitBtn}>
                    Send <ArrowUpIcon />
                </button>
            </div>
        </div>
    );
};
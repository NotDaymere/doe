import React from "react";
import GlobalIcon from "src/shared/icons/Global.icon";
import LightThemeIcon from "src/shared/icons/LightTheme.icon";
import MoonIcon from "src/shared/icons/Moon.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import BoldIcon from "src/shared/icons/Bold.icon";
import UnderlineIcon from "src/shared/icons/Underline.icon";
import ItalicIcon from "src/shared/icons/Italic.icon";
import FunctionIcon from "src/shared/icons/Function.icon";
import CodeIcon from "src/shared/icons/Code.icon";
import LinkIcon from "src/shared/icons/Link.icon";
import { useEditorContext } from "src/shared/components/Editor";
import { useAppStore } from "src/shared/providers";
import css from "./Sidebar.module.less";

export const Sidebar: React.FC = () => {
    const { editor } = useAppStore();
    const editorState = useEditorContext(editor);

    const pointerDown = (event: React.PointerEvent) => {
        event.preventDefault()
    };

    return (
        <aside className={css.sidebar}>
            <button className={css.sidebar_global}>
                <GlobalIcon />
            </button>
            <div className={css.sidebar_profile}>
                <img 
                    className={css.sidebar_profile_img} 
                    src="/temp/profile.jpg" 
                    alt="" 
                />
            </div>
            <div className={css.sidebar_theme}>
                <div className={css.sidebar_theme_toggler}>
                    <button className={css.sidebar_theme_btn} disabled>
                        <LightThemeIcon />
                    </button>
                    <button className={css.sidebar_theme_btn}>
                        <MoonIcon />
                    </button>
                </div>
            </div>
            <div className={css.sidebar_controls}>
                <div className={css.sidebar_controls_group}>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/corpora.svg" alt="" />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/chats.svg" alt="" />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/star.svg" alt="" />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/tags.svg" alt="" />
                    </button>
                </div>
                <div className={css.sidebar_controls_group}>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleBold}
                        data-active={editorState.isBold}
                    >
                        <BoldIcon />
                    </button>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleUnderline}
                        data-active={editorState.isUnderline}
                    >
                        <UnderlineIcon />
                    </button>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleItalic}
                        data-active={editorState.isItalic}
                    >
                        <ItalicIcon />
                    </button>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                    >
                        <FunctionIcon />
                    </button>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                    >
                        <CodeIcon />
                    </button>
                    <button 
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                    >
                        <LinkIcon />
                    </button>
                </div>
                <div className={css.sidebar_controls_group}>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/translations.svg" alt="" />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/recording.svg" alt="" />
                    </button>

                </div>
                <div className={css.sidebar_controls_group}>
                    <button className={css.sidebar_controls_btn}>
                        <img src="/img/icons/shared.svg" alt="" />
                    </button>
                </div>
            </div>
            <button className={css.sidebar_removeMsg}>
                <TrashIcon />
            </button>
        </aside>
    );
};
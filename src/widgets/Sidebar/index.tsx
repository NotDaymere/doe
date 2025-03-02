import React from "react";
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
import { useChatStore } from "src/shared/providers";
import { SidebarGaia } from "./ui";
import TranslationIcon from "src/shared/icons/Translation.icon";
import TapeIcon from "src/shared/icons/Tape.icon";
import SharedWithYouIcon from "src/shared/icons/SharedWithYou.icon";
import css from "./Sidebar.module.less";
import { MODE } from "src/shared/types/Chat";
import TranslationActiveIcon from "src/shared/icons/TranslationActive.icon";
import SharedWithYouActiveIcon from "src/shared/icons/SharedWithYouActive.icon";

export const Sidebar: React.FC = () => {
    const { editor, mode, setMode } = useChatStore();
    const editorState = useEditorContext(editor);

    const pointerDown = (event: React.PointerEvent) => {
        event.preventDefault();
    };

    return (
        <aside className={css.sidebar}>
            <SidebarGaia />

            <div className={css.sidebar_profile}>
                <img className={css.sidebar_profile_img} src="/temp/profile.jpg" alt="" />
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
                    <button className={css.sidebar_controls_btn} onPointerDown={pointerDown}>
                        <FunctionIcon />
                    </button>
                    <button
                        className={css.sidebar_controls_btn}
                        onPointerDown={pointerDown}
                        onClick={editorState.toggleCode}
                        data-active={editorState.isCode}
                    >
                        <CodeIcon />
                    </button>
                    <button className={css.sidebar_controls_btn} onPointerDown={pointerDown}>
                        <LinkIcon />
                    </button>
                </div>
                <div className={css.sidebar_controls_group}>
                    <button
                        className={css.sidebar_controls_btn}
                        onClick={() => setMode(MODE.TRANSLATION)}
                    >
                        {mode === MODE.TRANSLATION ? (
                            <TranslationActiveIcon />
                        ) : (
                            <TranslationIcon />
                        )}
                    </button>
                    <button
                        className={css.sidebar_controls_btn}
                        onClick={() => setMode(MODE.RECORDING)}
                    >
                        {mode === MODE.RECORDING ? (
                            <TapeIcon className={css.activeTapeIcon} />
                        ) : (
                            <TapeIcon />
                        )}
                    </button>
                </div>
                <div className={css.sidebar_controls_group}>
                    <button
                        className={css.sidebar_controls_btn}
                        onClick={() => setMode(MODE.SHARED_WITH_YOU)}
                    >
                        {mode === MODE.SHARED_WITH_YOU ? (
                            <SharedWithYouActiveIcon />
                        ) : (
                            <SharedWithYouIcon />
                        )}
                    </button>
                </div>
            </div>
            <button className={css.sidebar_removeMsg}>
                <TrashIcon />
            </button>
        </aside>
    );
};

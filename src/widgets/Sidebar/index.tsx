import React from "react";
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
import css from "./Sidebar.module.less";
import { LinkInput } from "../../components/tiptap-editor/assets/LinkInput";
import { CorporaIcon } from "src/shared/icons/CorporaIcon";
import { ChatsIcon } from "src/shared/icons/ChatsIcon";
import { StarIcon } from "src/shared/icons/StarIcon";
import { TagsIcon } from "src/shared/icons/TagsIcon";
import { TranslationsIcon } from "src/shared/icons/TranslationsIcon";
import { RecordingIcon } from "src/shared/icons/RecordingIcon";
import { SharedIcon } from "src/shared/icons/SharedIcon";
import ThemeToggleSwitch from "src/shared/components/ThemeToggler/ThemeToggler";

export const Sidebar: React.FC = () => {
    const { editor } = useChatStore();
    const editorState = useEditorContext(editor);
    const { playground } = useChatStore();
    const pointerDown = (event: React.PointerEvent) => {
        event.preventDefault();
    };

    return (
        <aside className={playground.open ? css.sidebar_playground : css.sidebar}>
            <SidebarGaia />
            <div className={css.sidebar_profile}>
                <img className={css.sidebar_profile_img} src="/temp/profile.jpg" alt="" />
            </div>
            <ThemeToggleSwitch className={css.sidebar_theme} />
            <div className={css.sidebar_controls}>
                <div className={css.sidebar_controls_group}>
                    <button className={css.sidebar_controls_btn}>
                        <CorporaIcon />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <ChatsIcon />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <StarIcon />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <TagsIcon />
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
                    <button className={css.sidebar_controls_btn}>
                        <TranslationsIcon />
                    </button>
                    <button className={css.sidebar_controls_btn}>
                        <RecordingIcon />
                    </button>
                </div>
                <div className={css.sidebar_controls_group}>
                    <button className={css.sidebar_controls_btn}>
                        <SharedIcon />
                    </button>
                </div>
            </div>
            <button className={css.sidebar_removeMsg}>
                <TrashIcon />
            </button>
        </aside>
    );
};

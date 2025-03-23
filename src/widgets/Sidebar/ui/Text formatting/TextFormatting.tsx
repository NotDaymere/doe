import React from "react";
import css from "./TextFormatting.module.less";
import BoldIcon from "../../../../shared/icons/Bold.icon";
import UnderlineIcon from "../../../../shared/icons/Underline.icon";
import ItalicIcon from "../../../../shared/icons/Italic.icon";
import FunctionIcon from "../../../../shared/icons/Function.icon";
import CodeIcon from "../../../../shared/icons/Code.icon";
import clsx from "clsx";
import LinkIcon from "../../../../shared/icons/Link.icon";
import { useEditorContext } from "src/shared/components/Editor";
import { useAppStore, useChatStore } from "../../../../shared/providers";

export const TextFormatting = () => {

    const { isSideBarOpen } = useAppStore();
    const { editor } = useAppStore();
    const editorState = useEditorContext(editor);
    const {isHyperlinkInputOpen, setIsHyperlinkInputOpen } = useAppStore();
    const [isSideBarTextFormattingOpen, setIsSideBarTextFormattingOpen] = React.useState(true);

    const pointerDown = (event: React.PointerEvent) => {
        event.preventDefault();
    };

    const handleOpenSideBarTextFormatting = () => {
        setIsSideBarTextFormattingOpen(!isSideBarTextFormattingOpen);
    }

    return (
        <div className={isSideBarOpen ? css.sidebar_open_text_formatting : css.sidebar_text_formatting}>

            <div className={css.text_formatting_actions_section_name}>
                <div>Text formatting</div>
                <div
                    className={css.text_formatting_show_actions_btn}
                    onClick={handleOpenSideBarTextFormatting}>
                    {!isSideBarTextFormattingOpen ? "+" : "-"}

                </div>
            </div>

            {isSideBarTextFormattingOpen && (
                <div
                    className={css.text_formatting_actions_section_container}
                   >
                    <div
                        className={ css.sidebar_text_formatting_action_container }
                         onPointerDown={pointerDown}
                         onClick={editorState.toggleBold}
                         data-active={editorState.isBold}>
                        <button
                            className={css.sidebar_text_formatting_action_btn}
                        >
                            <BoldIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Bold Text
                        </div>
                    </div>

                    <div className={css.sidebar_text_formatting_action_container}
                         onPointerDown={pointerDown}
                         onClick={editorState.toggleUnderline}
                         data-active={editorState.isUnderline}>
                        <button
                            className={css.sidebar_text_formatting_action_btn}
                        >
                            <UnderlineIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Underlined text
                        </div>
                    </div>

                    <div className={css.sidebar_text_formatting_action_container}
                         onPointerDown={pointerDown}
                         onClick={editorState.toggleItalic}
                         data-active={editorState.isItalic}>
                        <button
                            className={css.sidebar_text_formatting_action_btn}
                        >
                            <ItalicIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Italic text
                        </div>
                    </div>

                    <div className={css.sidebar_text_formatting_action_container}
                         onPointerDown={pointerDown}>
                        <button
                            className={css.sidebar_text_formatting_action_btn}
                        >
                            <FunctionIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Math Mode
                        </div>
                    </div>

                    <div className={css.sidebar_text_formatting_action_container}
                         onPointerDown={pointerDown}
                         onClick={editorState.toggleCode}
                         data-active={editorState.isCode}>
                        <button
                            className={css.sidebar_text_formatting_action_btn}
                        >
                            <CodeIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Code Mode
                        </div>
                    </div>

                    <div className={css.sidebar_text_formatting_action_container}
                         onPointerDown={pointerDown}
                         onClick={() => setIsHyperlinkInputOpen(!isHyperlinkInputOpen)}
                         data-active={isHyperlinkInputOpen}>
                        <button
                            className={clsx(css.sidebar_text_formatting_action_btn, { [css.active]: isHyperlinkInputOpen })}
                        >
                            <LinkIcon fill="currentColor" width={20} height={20} />
                        </button>
                        <div className={css.sidebar_text_formatting_action_btn_tooltip}>
                            Insert Link
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
};
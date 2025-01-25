import React from "react";
import clsx from "clsx";
import { EditorContent } from "@tiptap/react";
import { EditorProps, useInitialEditor } from "../..";
import css from "./Editor.module.less";

type Props = {
    className?: string;
} & EditorProps;

export const Editor: React.FC<Props> = ({
    className,
    classNameEditor,
    classNameFocus,
    classNamePlaceholder,
    ...editorProps
}) => {
    const editor = useInitialEditor({
        ...editorProps,
        classNameEditor: clsx(css.editor_editor, classNameEditor),
        classNameFocus: clsx(css.editor_focused, classNameFocus),
        classNamePlaceholder: clsx(css.editor_placeholder, classNamePlaceholder)
    });

    return (
        <div className={clsx(css.editor, className)}>
            <EditorContent editor={editor} />
        </div>
    );
};
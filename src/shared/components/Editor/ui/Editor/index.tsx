import React, { useEffect } from "react";
import clsx from "clsx";
import { EditorContent, Editor as IEditor } from "@tiptap/react";
import { EditorProps, useInitialEditor } from "../..";
import css from "./Editor.module.less";

type Props = {
    className?: string;
    insertedContent?: string;
} & EditorProps;

export const Editor: React.FC<Props> = ({
    className,
    classNameEditor,
    classNameFocus,
    classNamePlaceholder,
    insertedContent = "",
    ...editorProps
}) => {
    const editor = useInitialEditor({
        ...editorProps,
        classNameEditor: clsx(css.editor_editor, classNameEditor),
        classNameFocus: clsx(css.editor_focused, classNameFocus),
        classNamePlaceholder: clsx(css.editor_placeholder, classNamePlaceholder),
    });

    useEffect(() => {
        if (!insertedContent) return;
        editor && editor?.commands?.insertContent(insertedContent);
    }, [insertedContent]);

    return (
        <div className={clsx(css.editor, className)}>
            <EditorContent editor={editor} />
        </div>
    );
};

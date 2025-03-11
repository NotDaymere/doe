import React, { forwardRef, useImperativeHandle } from "react";
import clsx from "clsx";
import { EditorContent } from "@tiptap/react";
import { EditorProps, useInitialEditor } from "../..";
import css from "./Editor.module.less";

interface EditorRef {
    focus: () => void;
}

type Props = {
    className?: string;
    clearContent?: boolean;
    handleKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
} & EditorProps;

export const Editor = forwardRef<EditorRef, Props>(({
                                                        className,
                                                        classNameEditor,
                                                        classNameFocus,
                                                        classNamePlaceholder,
                                                        clearContent,
                                                        handleKeyDown,
                                                        ...editorProps
                                                    }, ref) => {
    const editor = useInitialEditor({
        ...editorProps,
        classNameEditor: clsx(css.editor_editor, classNameEditor),
        classNameFocus: clsx(css.editor_focused, classNameFocus),
        classNamePlaceholder: clsx(css.editor_placeholder, classNamePlaceholder)
    });

    React.useEffect(() => {
        if (clearContent) editor?.commands.clearContent();
    }, [clearContent, editor]);

    useImperativeHandle(ref, () => ({
        focus: () => {
            editor?.chain().focus().run();
        }
    }), [editor]);

    return (
        <div className={clsx(css.editor, className)}>
            <EditorContent editor={editor} onKeyDown={handleKeyDown} />
        </div>
    );
});

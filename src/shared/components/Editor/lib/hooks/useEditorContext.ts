import { Editor } from "@tiptap/react";
import React from "react";

export function useEditorContext(editor: Editor | null) {
    const [_, update] = React.useState(0);

    const formats = React.useMemo(() => {
        const isBold = editor?.isActive("bold");
        const isItalic = editor?.isActive("italic");
        const isStrike = editor?.isActive("strike");
        const isUnderline = editor?.isActive("underline");
        const isCode = editor?.isActive("codeBlock");

        return {
            isBold,
            isItalic,
            isStrike,
            isUnderline,
            isCode
        };
    }, [editor, _]);

    const toggleBold = React.useCallback(
        () => editor?.chain().focus().toggleBold().run(),
        [editor]
    );
    const toggleItalic = React.useCallback(
        () => editor?.chain().focus().toggleItalic().run(),
        [editor]
    );
    const toggleUnderline = React.useCallback(
        () => editor?.chain().focus().toggleUnderline().run(),
        [editor]
    );
    const toggleStrike = React.useCallback(
        () => editor?.chain().focus().toggleStrike().run(),
        [editor]
    );
    const toggleCode = React.useCallback(
        () => editor?.chain().focus().toggleCodeBlock().run(),
        [editor]
    );

    React.useEffect(() => {
        if (editor) {
            const handleUpdate = () => update((prev) => prev + 1);
            editor.on("update", handleUpdate);
            editor.on("selectionUpdate", handleUpdate)
            return () => {
                editor.off("update", handleUpdate);
                editor.off("selectionUpdate", handleUpdate);
            };
        }
    }, [editor]);

    return {
        ...formats,
        toggleBold,
        toggleItalic,
        toggleStrike,
        toggleUnderline,
        toggleCode,
    };
}

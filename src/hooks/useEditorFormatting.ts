import { Editor } from "@tiptap/core";
import { useCallback, useEffect, useState } from "react";

const useEditorFormatting = (editor: Editor | null) => {
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        code: false,
    });

    const updateActiveFormats = useCallback(() => {
        if (!editor) return;

        const isBold = editor.isActive("bold");
        const isItalic = editor.isActive("italic");
        const isUnderline = editor.isActive("underline");
        const isCodeBlock = editor.isActive("codeBlock");

        setActiveFormats({
            bold: isBold,
            italic: isItalic,
            underline: isUnderline,
            code: isCodeBlock,
        });
    }, [editor]);

    useEffect(() => {
        if (!editor) return;

        editor.on("update", updateActiveFormats);
        editor.on("selectionUpdate", updateActiveFormats);

        return () => {
            editor.off("update", updateActiveFormats);
            editor.off("selectionUpdate", updateActiveFormats);
        };
    }, [editor, updateActiveFormats]);

    const toggleBold = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleBold().run();
            updateActiveFormats();
        }
    }, [editor, updateActiveFormats]);

    const toggleItalic = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleItalic().run();
            updateActiveFormats();
        }
    }, [editor, updateActiveFormats]);

    const toggleUnderline = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleUnderline().run();
            updateActiveFormats();
        }
    }, [editor, updateActiveFormats]);

    const toggleCode = useCallback(() => {
        if (editor) {
            editor.chain().focus().toggleCodeBlock().run();
            updateActiveFormats();
        }
    }, [editor, updateActiveFormats]);

    const clearFormats = useCallback(() => {
        setActiveFormats({
            bold: false,
            italic: false,
            underline: false,
            code: false,
        });
    }, []);

    return {
        toggleBold,
        toggleItalic,
        toggleUnderline,
        toggleCode,
        activeFormats,
        clearFormats,
    };
};

export default useEditorFormatting;

import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Focus from "@tiptap/extension-focus";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import clsx from "clsx";
import React from "react";
import { EditorProps, getCodeBlockConfigured } from "..";

export function useInitialEditor(props: EditorProps) {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Link.configure({
                autolink: false,
                openOnClick: true,
                linkOnPaste: false,
                protocols: ["http", "https", "mailto", "tel"],
                HTMLAttributes: {
                    style: "color: #127FFF; text-decoration: underline",
                },
            }),
            Bold,
            Italic,
            Strike,
            Underline,
            History.configure({
                depth: 100,
                newGroupDelay: 500,
            }),
            getCodeBlockConfigured(),
            Focus.configure({
                className: props.classNameFocus,
            }),
            Placeholder.configure({
                placeholder: props.placeholder,
                emptyEditorClass: props.classNamePlaceholder,
            }),
        ],
        content: props.value,
        injectCSS: false,
        editorProps: {
            attributes: {
                class: clsx("tiptap", props.classNameEditor as any),
            },
        },
        onUpdate({ editor }) {
            if (props.onChange) {
                props.onChange(editor.getHTML());
            }
        },
        onFocus({ editor }) {
            if (props.onFocus) {
                props.onFocus(editor);
            }
        },
        onBlur({ editor }) {
            if (props.onBlur) {
                props.onBlur(editor);
            }
        },
    });

    React.useEffect(() => {
        if (editor) {
            editor.setEditable(!props.readOnly);
        }
    }, [props.readOnly, editor]);

    return editor;
}

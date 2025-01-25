import { Editor } from "@tiptap/react";

export type EditorProps = {
    value: string;
    onChange: (value: string) => void;
    onFocus?: (editor: Editor | null) => void;
    onBlur?: (editor: Editor | null) => void;
    readOnly?: boolean;
    placeholder?: string;
    classNameEditor?: string;
    classNameFocus?: string;
    classNamePlaceholder?: string;
};

import React from "react";
import { Editor } from "@tiptap/react";
import css from "./EditorLink.module.scss";

interface Props {
    editor: Editor | null;
}

export const EditorLink: React.FC<Props> = ({ editor }) => {
    const [isActive, setActive] = React.useState(false);

    return (
        <div className={css.root}>
            EditorLink
        </div>
    );
};
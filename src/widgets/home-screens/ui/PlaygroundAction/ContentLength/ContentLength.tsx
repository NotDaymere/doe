import React, { useState, useEffect } from "react";
import "../WritingLevel/WritingLevel.less";
import Menu from "../WritingLevel/Menu";
import PenIcon from "src/shared/icons/Pen.icon";

import { Editor } from "@tiptap/react";

interface Props {
    editor: Editor | null;
}

function ContentLength({ editor }: Props) {
    const [contentLengthOption, setContentLengthOption] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [promptValue, setPromptValue] = useState<string>("");

    const updatePromptValue = () => {
        if (editor == null) return;

        if (editor instanceof Editor) {
            const { state } = editor;
            const { selection } = state;
            if (!selection || selection.empty) return;
            setPromptValue(state.doc.textBetween(selection.from, selection.to, " "));
        }
    };

    useEffect(() => {
        if (editor instanceof Editor) {
            editor.on("selectionUpdate", updatePromptValue);
            return () => {
                editor.off("selectionUpdate", updatePromptValue);
            };
        }
    }, [editor]);

    return (
        <React.Fragment>
            <div className={"writing-level-content"}>
                <p className={"text-columns-button-p"}>
                    Change<span className={"text-columns-button-span"}>Content Length</span>to
                </p>
                <div className={"writing-level-option"}>
                    <div className={"writing-level-option-text"}>{contentLengthOption}</div>
                    <button className={"writing-level-option-button"} onClick={() => setOpenMenu(!openMenu)}>
                        <PenIcon className={"pen-icon-writing-level"} />
                    </button>
                    {openMenu && <Menu setOpenMenu={setOpenMenu} setWritingLevelOption={setContentLengthOption} />}
                </div>
                <span className={"text-columns-button-span ml--5"}>in</span>
                {promptValue && <div className={'text-columns-target'}>{promptValue}</div>}
            </div>
        </React.Fragment>
    );
}

export default ContentLength;
import "./WritingLevel.less";
import Menu from "./Menu";
import PenIcon from "src/shared/icons/Pen.icon";
import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
interface Props {
    editor: Editor | null;
}

function WritingLevel({ editor }: Props) {
    const [writingLevelOption, setWritingLevelOption] = useState<string>("");
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
        <>
            <div className={"writing-level-content"}>
                <p className={"text-columns-button-p"}>
                    Change<span className={"text-columns-button-span"}>Writing Level</span>to
                </p>
                <div className={"writing-level-option"}>
                    <div className={"writing-level-option-text"}>{writingLevelOption}</div>
                    <button className={"writing-level-option-button"} onClick={() => setOpenMenu(!openMenu)}>
                        <PenIcon className={"pen-icon-writing-level"} />
                    </button>
                    {openMenu && <Menu setOpenMenu={setOpenMenu} setWritingLevelOption={setWritingLevelOption} />}
                </div>
                <span className={"text-columns-button-span ml--5"}>in</span>
                <div className={'text-columns-target'}>{promptValue}</div>
            </div>
        </>
    );
}

export default WritingLevel;
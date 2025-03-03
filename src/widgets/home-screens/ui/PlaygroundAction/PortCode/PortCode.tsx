import "./PortCode.less"
import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";

interface Props {
    editor: monaco.editor.IStandaloneCodeEditor | null;
}
function PortCode({ editor }: Props) {

    const [promptValue, setPromptValue] = useState<string>("");

    const getMonacoSelection = (editor: monaco.editor.IStandaloneCodeEditor) => {
        if (!editor) return null;
        const selection = editor.getSelection();
        if (!selection) return null;
        const model = editor.getModel();
        if (!model) return null;
        const selectedText = model.getValueInRange(selection);
        return selectedText;
    };

    const updatePromptValue = () => {
        if (editor == null) return;
        const selectedText = getMonacoSelection(editor);
        if (selectedText) {
            setPromptValue(selectedText);
        }
    };

    useEffect(() => {
        if (!editor)
        {}  else {
            const updateSelection = () => {
                const selectedText = getMonacoSelection(editor);
                setPromptValue(selectedText || "");
            };

            const disposable = editor.onDidChangeCursorSelection(updateSelection);
            return () => disposable.dispose();
        }
    }, [editor]);
    return (
        <>
            <div className={"port-code-content"}>
                <p className={"text-columns-button-p"}>
                    Port Code to
                </p>
                <div className={"port-code-option"}>
                    <div className={"port-code-option-text"}>
                    </div>
                </div>
                <span className={"text-columns-button-span"}>in</span>
                <div className={'text-columns-target'}>{promptValue}</div>
            </div>
        </>
    )
}

export default PortCode;
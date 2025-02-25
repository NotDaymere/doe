import './Prompt.less';
import CloseIcon from "src/shared/icons/CloseIcon";
import SendIcon from "src/shared/icons/SendIcon";
import { usePlaygroundStore } from "src/shared/providers";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import * as monaco from "monaco-editor";

export default function Prompt({ editor }: { editor: Editor | monaco.editor.IStandaloneCodeEditor | null }) {
    const { setPlaygroundAction } = usePlaygroundStore();
    const [promptValue, setPromptValue] = useState<string>('');

    const addPrompt = () => {
        if (!editor) return;
        if (editor instanceof Editor) {
            editor.chain().focus().insertContentAt(editor.state.doc.content.size, {
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: " ",
                    },
                    {
                        type: "text",
                        text: promptValue,
                        marks: [
                            {
                                type: "customBlock",
                            },
                        ],
                    },
                ],
            }).run();
        } else {
            const model = editor.getModel();
            if (model) {
                const lastLine = model.getLineCount();
                const lastColumn = model.getLineMaxColumn(lastLine);
                const blockText = `\n/* --- Prompt Block Start --- */\n +
                /* ${promptValue} */\n +
                /* --- Prompt Block End --- */\n`;
                editor.executeEdits("addPrompt", [
                    {
                        range: new monaco.Range(lastLine, lastColumn, lastLine, lastColumn),
                        text: blockText,
                        forceMoveMarkers: true,
                    },
                ]);
                editor.revealLine(lastLine + 2);
            }
        }
        setPlaygroundAction(null)
    };
    return (
        <>
            <input className={'prompt-input'}
                   value={promptValue}
                   onChange={(e) => setPromptValue(e.target.value)}
            />
            <div className={'actions'}>
                <button
                    className={'prompt-button prompt-button-close'}
                    onClick={() => setPlaygroundAction(null)}
                >
                    <CloseIcon />
                </button>
                <button
                    className={'prompt-button prompt-button-send'}
                    onClick={addPrompt}
                >
                    <SendIcon />
                </button>
            </div>
        </>
    )
}
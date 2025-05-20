import "./Prompt.less";
import { usePlaygroundStore } from "src/shared/providers";
import { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";

interface Props {
    setSendButton: (sendButton: () => void) => void;
    editor: Editor | monaco.editor.IStandaloneCodeEditor | null;
}

export default function Prompt({ editor, setSendButton }: Props) {
    const { setPlaygroundAction } = usePlaygroundStore();
    const [promptValue, setPromptValue] = useState<string>("");

    const addPrompt = () => {
        if (!editor) return;

        if (editor instanceof Editor) {
            editor.chain().focus().insertContentAt(editor.state.doc.content.size, {
                type: "paragraph",
                content: [
                    { type: "text", text: " " },
                    {
                        type: "text",
                        text: promptValue,
                        marks: [{ type: "customBlock" }],
                    },
                ],
            }).run();
        } else {
            const model = editor.getModel();
            if (model) {
                const lastLine = model.getLineCount();
                const blockText = `\n ${promptValue} \n`;

                editor.executeEdits("addPrompt", [
                    {
                        range: new monaco.Range(lastLine + 1, 1, lastLine + 1, 1),
                        text: blockText,
                        forceMoveMarkers: true,
                    },
                ]);

                editor.pushUndoStop();
                editor.revealLine(lastLine + 3);
            }
        }

        setPlaygroundAction(null);
    };

    useEffect(() => {
        return () => setSendButton(() => {});
    }, []);

    useEffect(() => {
        setSendButton(() => addPrompt);
    }, [promptValue]);

    return (
        <>
            <input
                className="prompt-input"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
            />
        </>
    );
}

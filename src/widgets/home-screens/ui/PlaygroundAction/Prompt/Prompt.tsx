import './Prompt.less';
import CloseIcon from "src/shared/icons/CloseIcon";
import SendIcon from "src/shared/icons/SendIcon";
import { usePlaygroundStore } from "src/shared/providers";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function Prompt({ editor }: { editor: Editor | null }) {
    const { setPlaygroundAction } = usePlaygroundStore();
    const [promptValue, setPromptValue] = useState<string>('');

    const addPrompt = () => {
        if (!editor) return;
        editor.chain().focus().insertContentAt(editor.state.doc.content.size, {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: " ",
                },
                {
                    type: 'text',
                    text: promptValue,
                    marks: [
                        {
                            type: 'customBlock',
                        }
                    ]
                }
            ]
        }).run();


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
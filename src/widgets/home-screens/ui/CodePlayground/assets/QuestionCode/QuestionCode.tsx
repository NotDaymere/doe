import * as monaco from "monaco-editor";
import { Flex } from "antd";
import './QuestionCode.less';
import { useChatStore } from "../../../../../../shared/providers";

type TextFormatProps = {
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
    editor: monaco.editor.IStandaloneCodeEditor | null;
};

const QuestionCode = ({ buttonPosition, editor }: TextFormatProps) =>  {
    const { setQuestionCodeMessage } = useChatStore();
    const getEditorSelection = () => {
        if (!editor) return null;
        const selection = editor.getSelection();
        if (!selection) return null;
        const model = editor.getModel();
        if (!model) return null;
        const selectedText = model.getValueInRange(selection);
        return { selection, model, selectedText };
    };

    const questionCode = () => {
        const sel = getEditorSelection();
        if (!sel) return;
        const { selectedText } = sel;
        console.log(selectedText);
        setQuestionCodeMessage({text: selectedText, active: true});
    }
    return (
        <Flex className="question-code-container"
             style = {{
                 top: `${buttonPosition?.top}px`,
                 left: buttonPosition?.left
                     ? `${buttonPosition.left - 17}px`
                     : "auto",
                 bottom: `${buttonPosition?.bottom}px`,
                 right: `${buttonPosition?.right}px`,
             }}
        >
            <button
                className={'question-code-button'}
                onClick={questionCode}
            >
                ?
            </button>
        </Flex>
    );
}

export default QuestionCode;
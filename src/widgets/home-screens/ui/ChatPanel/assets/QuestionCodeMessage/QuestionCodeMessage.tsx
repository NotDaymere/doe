import { IQuestionCodeMessage } from "src/shared/types/QuestionCodeMessage";
import './QuestionCodeMessage.less'
import EnterIcon from "src/shared/icons/EnterIcon";

interface IQuestionCodeMessageProps {
    questionCodeMessage: IQuestionCodeMessage;
}
export default function QuestionCodeMessage({questionCodeMessage}: IQuestionCodeMessageProps) {
    return (
        <div className="question-code-message-container">
            <div className="enter-icon-block">
                <EnterIcon />
            </div>
            <div className="question-code-message-text-block">
                {questionCodeMessage.text}
            </div>
        </div>
    )
}
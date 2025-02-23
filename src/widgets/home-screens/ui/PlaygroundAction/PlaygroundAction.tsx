import { FC } from "react";
import { IPlaygroundAction } from "src/shared/types/PlaygroundAction";
import Prompt from "./Prompt/Prompt";
import './PlaygroundAction.less';
import { Editor } from "@tiptap/react";

interface IProps {
    playgroundAction: IPlaygroundAction,
    editor: Editor | null;
}
const PlaygroundAction: FC<IProps> = ({ playgroundAction: {type}, editor }) => {
    return (
        <div className={'playground-action-container'}>
            <div className={'playground-action-content'}>
                { type === 'prompt' && <Prompt editor={editor} /> }
            </div>
        </div>
    )
}

export default PlaygroundAction;
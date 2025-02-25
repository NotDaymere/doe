import { FC, useEffect, useRef, useState } from "react";
import { IPlaygroundAction } from "src/shared/types/PlaygroundAction";
import Prompt from "./Prompt/Prompt";
import './PlaygroundAction.less';
import { Editor } from "@tiptap/react";
import * as monaco from "monaco-editor";
import { useChatStore } from "src/shared/providers";

interface IProps {
    playgroundAction: IPlaygroundAction,
    editor: Editor | monaco.editor.IStandaloneCodeEditor | null;
    containerWidth?: number;
}
const PlaygroundAction: FC<IProps> = ({ playgroundAction: {type}, editor, containerWidth = 0 }) => {
    const { playgroundFullscreen } = useChatStore();
    const chatRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 700, y: -40 });
    const [inputWidth, setInputWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!playgroundFullscreen) return;
        if (event.button !== 2) return;
        setIsDragging(true);
    };
    useEffect(() => {
        if (!playgroundFullscreen) return;
        if (chatRef.current) {
            setInputWidth(chatRef.current.getBoundingClientRect().width);
        }
        setPosition({ x: (containerWidth / 2 + inputWidth - 100), y: -40 })
    }, []);
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;
            setPosition((prev) => ({
                x: prev.x + event.movementX,
                y: prev.y + event.movementY,
            }));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className={`playground-action-container ${playgroundFullscreen && 'playground-action-container-fullscreen'}`}
             ref={chatRef}
             style={{ top: position.y || '-1px', left: position.x || '1px' }}
             onMouseDown={handleMouseDown}
        >
            <div className={'playground-action-content'}>
                { type === 'prompt' && <Prompt editor={editor} /> }
            </div>
        </div>
    )
}

export default PlaygroundAction;
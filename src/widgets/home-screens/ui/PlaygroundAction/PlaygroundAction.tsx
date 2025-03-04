import { FC, useEffect, useRef, useState } from "react";
import { IPlaygroundAction } from "src/shared/types/PlaygroundAction";
import Prompt from "./Prompt/Prompt";
import "./PlaygroundAction.less";
import { Editor } from "@tiptap/react";
import * as monaco from "monaco-editor";
import { useChatStore, usePlaygroundStore } from "src/shared/providers";
import WritingLevel from "./WritingLevel/WritingLevel";
import CloseIcon from "../../../../shared/icons/CloseIcon";
import SendIcon from "../../../../shared/icons/SendIcon";
import PortCode from "./PortCode/PortCode";

interface IProps {
    playgroundAction: IPlaygroundAction;
    editor: Editor | monaco.editor.IStandaloneCodeEditor | null;
    containerWidth?: number;
}

const PlaygroundAction: FC<IProps> = ({ playgroundAction: { type }, editor, containerWidth = 0 }) => {
    const { playgroundFullscreen } = useChatStore();
    const { setPlaygroundAction } = usePlaygroundStore();
    const [sendButton, setSendButton] = useState<(() => void) | null>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 700, y: -40 });
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!playgroundFullscreen || event.button !== 2) return;
        setIsDragging(true);
    };

    useEffect(() => {
        if (!playgroundFullscreen || !chatRef.current) return;
        const componentWidth = chatRef.current.getBoundingClientRect().width;
        setPosition({ x: (containerWidth - componentWidth) / 100, y: -100 });
    }, [containerWidth, playgroundFullscreen]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging) return;
            setPosition((prev) => ({
                x: prev.x + event.movementX,
                y: prev.y + event.movementY,
            }));
        };

        const handleMouseUp = () => setIsDragging(false);

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
        <div
            className={`playground-action-container ${playgroundFullscreen ? "playground-action-container-fullscreen" : ""}`}
            ref={chatRef}
            style={{ top: position.y, left: position.x }}
            onMouseDown={handleMouseDown}
        >
            <div className="playground-action-content">
                {type === "prompt" && <Prompt editor={editor} setSendButton={setSendButton} />}
                {type === "writing-level" && <WritingLevel editor = {editor} />}
                {type === "port-code" && <PortCode editor = {editor} />}

                <div className="actions">
                    <button className="prompt-button prompt-button-close" onClick={() => setPlaygroundAction(null)}>
                        <CloseIcon />
                    </button>
                    <button className="prompt-button prompt-button-send" onClick={() => sendButton?.()} disabled={!sendButton}>
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaygroundAction;

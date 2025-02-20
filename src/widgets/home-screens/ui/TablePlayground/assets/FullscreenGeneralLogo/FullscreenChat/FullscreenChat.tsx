import { useState, useRef, useEffect } from "react";
import { Flex } from "antd";
import { ChatLayout } from "../../../../ChatLayout";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground-active.svg";
import "./FullscreenChat.less";

interface Props {
    onClick?: () => void;
}

export default function FullscreenChat({ onClick }: Props) {
    const chatRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 15, y: 50 });
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button !== 2) return;
        setIsDragging(true);
    };

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
        <div

        >
            <Flex vertical>
                <button onClick={onClick} className={"decrease-chat-button"}>
                    <DecreasePlaygroundIcon />
                </button>
                <div
                    ref={chatRef}
                    style={{ position: "absolute", top: position.y || '-1px', left: position.x || '1px', cursor: "grab" }}
                    onMouseDown={handleMouseDown}
                >
                    <ChatLayout />
                </div>
            </Flex>
        </div>
    );
}

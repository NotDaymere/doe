import { ReactComponent as PenIcon } from "src/assets/icons/pen.svg";
import React, { useRef, useEffect, useState } from "react";
import './PenFormatingButton.less';

interface IPen {
    onClick: (position: { top: number; left: number }) => void;
    isActive: string | null;
}

function PenFormatingButton({ onClick, isActive }: IPen) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
            if (buttonRef.current && !position) {
                const rect = buttonRef.current.getBoundingClientRect();
                setPosition({
                    top: rect.top - 50,
                    left: rect.left - 285
                });
            }
    }, []);

    return (
        <>
            <button
                onClick={() => {
                    if (position)
                    onClick(position)
                }}
                className={`pen-button ${isActive ? "pen-button-active" : ""}`}
                ref={buttonRef}
            >
                <PenIcon className={"pen-icon"} />
            </button>
        </>
    );
}

export default PenFormatingButton;

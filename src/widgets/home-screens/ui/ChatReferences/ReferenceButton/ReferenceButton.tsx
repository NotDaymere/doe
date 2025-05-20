import React from "react";
import "./ReferenceButton.less";
import ReferenceIcon from "../../../../../shared/icons/Reference.icon";

interface ReferenceButtonProps {
    position?: { top: number; left: number } | null;
    isVisible: boolean;
    onClose: () => void;
    onReferenceClick: () => void;
}

const ReferenceButton: React.FC<ReferenceButtonProps> = ({
    position = { top: 0, left: 0 },
    isVisible,
    onClose,
    onReferenceClick,
}) => {
    const handleClick = () => {
        onClose();
        onReferenceClick();
    };

    if (!position) {
        return null;
    }
    return (
        <div
            className={`reference-btn-container ${isVisible ? "visible" : ""}`}
            style={{
                "--top": `${position.top}px`,
                "--left": `${position.left}px`,
            } as React.CSSProperties}
            onClick={handleClick}
        >
                <ReferenceIcon fill="currentColor" />
        </div>
    );
};

export default ReferenceButton;

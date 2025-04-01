import "./DrawingToolButton.less";

type ToolButtonProps = {
    icon: string;
    onClick?: () => void;
    isActive?: boolean;
};

function DrawingToolButton({ icon, onClick, isActive = false }: ToolButtonProps) {
    return (
        <button className={`drawing-tool-button ${isActive ? "active" : ""}`} onClick={onClick}>
            <img src={icon} alt="Tool Icon" />
        </button>
    );
}

export default DrawingToolButton;

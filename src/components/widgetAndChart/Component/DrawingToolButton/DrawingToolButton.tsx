import "./DrawingToolButton.less";

type ToolButtonProps = {
  icon: string;
  onClick?: () => void;
};

function DrawingToolButton({ icon, onClick }: ToolButtonProps) {
  return (
    <button onClick={onClick}>
      <img src={icon} alt="Tool Icon" />
    </button>
  );
}

export default DrawingToolButton;

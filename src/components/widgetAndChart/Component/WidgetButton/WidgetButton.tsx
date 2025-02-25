import "./WidgetButton.less";

type WidgetButtonProps = {
  icon: string;
  text: string;

  onClick?: () => void;
};

function WidgetButton({ icon, text, onClick }: WidgetButtonProps) {
  return (
    <div className="boxbutton" onClick={onClick}>
      <div className="icon">
        <img src={icon} alt={text} />
      </div>
      <p>{text}</p>
    </div>
  );
}
export default WidgetButton;

import "./ChartButton.less";

type ChartButtonProps = {
  icon: string;
  text: string;

  onClick?: () => void;
};

function ChartButton({ icon, text,onClick }: ChartButtonProps) {
 
  return (
    <div className="chartbutton" onClick={onClick}>
      <div
        className="chartbutton_image"
     
        style={{ backgroundImage: `url(${icon})` }}
    >
        <p>{text}</p>
      </div>
    </div>
  );

}

export default ChartButton;

import "./GameButton.less";

type GameButtonProps = {
  icon: string;
  text: string;

  onClick?: () => void;
};

function GameButton({ icon, text,onClick }: GameButtonProps) {
 
  return (
    <div className="gamebutton" onClick={onClick}>
      <div
        className="gamebutton_image"
     
        style={{ backgroundImage: `url(${icon})` }}
    >
        <p>{text}</p>
      </div>
    </div>
  );

}

export default GameButton;

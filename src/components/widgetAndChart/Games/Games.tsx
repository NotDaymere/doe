import GameButton from '../Component/GameButton/GameButton'
import './Games.less'

function Games() {
  return (
    <div className="gameContainer">
      <GameButton icon="/img/icons/game/chess.svg" text="Chess" />
      <GameButton icon="/img/icons/game/go.png" text="Go" />
      <GameButton icon="/img/icons/game/connect.png" text="Connect 4" />
      <GameButton icon="/img/icons/game/ticktactoe.svg" text="Tic Tac Toe" />
      <GameButton icon="/img/icons/game/poker.svg" text="Poker" />
     
    </div>
  )
}

export default Games

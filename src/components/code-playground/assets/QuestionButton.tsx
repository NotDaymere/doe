import { Button } from "antd"
import { FC } from "react"
import './QuestionButton.less'

type Props = {
  onClick: () => void
  buttonPosition: {
    top?: number;
    left?: number;
}
}

export const QuestionButton: FC<Props> = ({ onClick, buttonPosition }) => {
  return (
    <Button 
      onClick={onClick} 
      className={"question-button"}
      style={{
        top: `${buttonPosition.top}px`,
        left: `${buttonPosition.left}px`,
      }}
    >
      ?
    </Button>
  )
}
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { Button } from "antd";
import './ResizePlaygroundButton.less';

interface IDecreasePlayground {
    onClick: () => void
}
export default function ResizePlaygroundButton ({onClick}: IDecreasePlayground) {
    return  (
        <Button
            onClick={onClick}
            className={"decrease-playground-button"}
        >
            <DecreasePlaygroundIcon className={"decrease-playground-icon"} />
        </Button>
    )
}

import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { Button } from "antd";
import './DecreasePlayground.less';

interface IDecreasePlayground {
    onClick: () => void
}
function DecreasePlayground ({onClick}: IDecreasePlayground) {
    return  (
        <Button
            onClick={onClick}
            className={"decrease-playground-button"}
        >
            <DecreasePlaygroundIcon className={"decrease-playground-icon"} />
        </Button>
    )
}
    export default DecreasePlayground
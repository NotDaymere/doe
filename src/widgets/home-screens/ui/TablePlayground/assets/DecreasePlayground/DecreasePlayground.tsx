import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { Button } from "antd";
import './DecreasePlayground.less';
import { useChatStore } from "../../../../../../shared/providers";

function DecreasePlayground () {
    const { playgroundFullscreen, setPlaygroundFullscreen } = useChatStore()

    function changePlaygroundSize() {
        setPlaygroundFullscreen(!playgroundFullscreen)
    }
    return  (
        <Button
            onClick={changePlaygroundSize}
            className={"decrease-playground-button"}
        >
            <DecreasePlaygroundIcon className={"decrease-playground-icon"} />
        </Button>
    )
}
export default DecreasePlayground
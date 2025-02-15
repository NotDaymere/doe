import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { Button } from "antd";
import './ResizePlaygroundButton.less';
import { useChatStore } from "src/shared/providers";

export default function ResizePlaygroundButton () {
    const {setPlaygroundFullscreen, playgroundFullscreen} = useChatStore();
    const resizePlayground = () => {
        setPlaygroundFullscreen(!playgroundFullscreen);
    }
    return  (
        <Button
            onClick={resizePlayground}
            className={"decrease-playground-button"}
        >
            <DecreasePlaygroundIcon className={"decrease-playground-icon"} />
        </Button>
    )
}

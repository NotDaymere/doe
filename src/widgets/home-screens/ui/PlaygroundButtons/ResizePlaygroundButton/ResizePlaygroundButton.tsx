import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { ReactComponent as DecreasePlaygroundActiveIcon } from "src/assets/icons/decrease-playground-active.svg"
import './ResizePlaygroundButton.less';
import { useChatStore } from "src/shared/providers";

export default function ResizePlaygroundButton () {
    const {setPlaygroundFullscreen, playgroundFullscreen} = useChatStore();
    const resizePlayground = () => {
        setPlaygroundFullscreen(!playgroundFullscreen);
    }
    return  (
        <button
            onClick={resizePlayground}
            className={!playgroundFullscreen
                ? "decrease-playground-button"
                : "decrease-playground-active-button"
        }
        >
            {!playgroundFullscreen
                ? <DecreasePlaygroundIcon className={"decrease-playground-icon"} />
                : <DecreasePlaygroundActiveIcon className={"decrease-playground-active-icon"} />
            }
        </button>
    )
}

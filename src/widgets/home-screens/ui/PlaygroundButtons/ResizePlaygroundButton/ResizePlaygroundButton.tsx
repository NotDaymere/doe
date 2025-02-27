import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { ReactComponent as DecreasePlaygroundActiveIcon } from "src/assets/icons/decrease-playground-active.svg"
import './ResizePlaygroundButton.less';
import { useChatStore } from "src/shared/providers";

export default function ResizePlaygroundButton () {
    const {setPlaygroundFullscreen, playgroundFullscreen, getOpenSavedPlaygrounds, updateSavedPlaygrounds} = useChatStore();
    const resizePlayground = () => {
        setPlaygroundFullscreen(!playgroundFullscreen);

        if (getOpenSavedPlaygrounds().length > 2) {
            const lastPlayground = getOpenSavedPlaygrounds().at(-1);
            if (lastPlayground) {
                lastPlayground.open = false;
                updateSavedPlaygrounds(lastPlayground);
            }
        }
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

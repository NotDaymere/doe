import { IPlayground } from "src/shared/types/Playground";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import { ReactComponent as CodeIcon } from "src/assets/icons/code.svg";
import './OpenFromSavedPlayground.less';
import { useChatStore } from "src/shared/providers";

interface Props {
    savedPlayground: IPlayground;
}
export default function OpenFromSavedPlayground({savedPlayground} : Props) {
    const {updateSavedPlaygrounds, getOpenSavedPlaygrounds, playgroundFullscreen} = useChatStore();
    const openSavedPlaygroundStatus = () => {
        const maxLength = playgroundFullscreen ? 3:2;
        if (getOpenSavedPlaygrounds().length >= maxLength) {
            return;
        }
        savedPlayground.open = true;
        updateSavedPlaygrounds(savedPlayground);
    }
    const closeSavedPlaygroundStatus = () => {
        savedPlayground.open = false;
        updateSavedPlaygrounds(savedPlayground);
    }
    return (
        <button
            className={`open-from-saved-playground-button ${savedPlayground.open && 'open-from-saved-playground-button-active'}`}
            onClick={!savedPlayground.open ? openSavedPlaygroundStatus : closeSavedPlaygroundStatus}
        >
            {savedPlayground.type == 'table' && <TableIcon />}
            {savedPlayground.type == 'code' && <CodeIcon />}
        </button>
    )
}
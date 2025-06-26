import { IPlayground } from "src/shared/types/Playground";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import { ReactComponent as CodeIcon } from "src/assets/icons/code.svg";
import './OpenFromSavedPlayground.less';
import { useChatStore } from "src/shared/providers";
import MagicIcon from "../../../../../../shared/icons/Magic.icon";
import LinkIcon from "../../../../../../shared/icons/Link.icon";
import FileIcon from "../../../../../../shared/icons/File.icon";

interface Props {
    savedPlayground: IPlayground;
    length: number;
}
export default function OpenFromSavedPlayground({savedPlayground, length} : Props) {
    const {updateSavedPlaygrounds, getOpenSavedPlaygrounds, playgroundFullscreen} = useChatStore();
    const openSavedPlaygroundStatus = () => {
        const maxLength = playgroundFullscreen ? 3 : 2;
        if (getOpenSavedPlaygrounds().length >= maxLength) {
            const lastOpen = getOpenSavedPlaygrounds().at(-1)
            if (lastOpen) {
                lastOpen.open = false;
                updateSavedPlaygrounds(lastOpen);
            }
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
            {length <= 3 && (<>
                    <span className={'open-from-saved-playground-name'}>{savedPlayground.name}</span>
                </>
            )}
        </button>
    )
}
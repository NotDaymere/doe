import { IPlayground } from "src/shared/types/Playground";
import { ReactComponent as TableIcon } from "src/assets/icons/table.svg";
import './OpenFromSavedPlayground.less';
import { useChatStore } from "src/shared/providers";

interface Props {
    savedPlayground: IPlayground;
}
export default function OpenFromSavedPlayground({savedPlayground} : Props) {
    const {updateSavedPlaygrounds, getOpenSavedPlaygrounds} = useChatStore();
    const changeSavedPlaygroundStatus = () => {
        if (getOpenSavedPlaygrounds().length > 2) {
            return;
        }
        savedPlayground.open = !savedPlayground.open;
        updateSavedPlaygrounds(savedPlayground);
    }
    return (
        <button
            className={`open-from-saved-playground-button ${savedPlayground.open && 'open-from-saved-playground-button-active'}`}
            onClick={changeSavedPlaygroundStatus}
        >
            {savedPlayground.type == 'table' && <TableIcon />}
        </button>
    )
}
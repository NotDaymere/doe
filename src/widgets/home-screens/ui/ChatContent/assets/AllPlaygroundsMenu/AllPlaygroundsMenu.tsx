import DeleteIcon from "src/shared/icons/DeleteIcon";
import RenameIcon from "src/shared/icons/RenameIcon";
import "./AllPlaygroundsMenu.less";
import { useChatStore } from "src/shared/providers";

interface IProps {
    activeOpenAllPlaygroundsMenu: string,
    changeActiveOpenAllPlaygroundsMenu: () => void,
    changeActiveAllPlaygrounds: () => void,
}
export default function AllPlaygroundsMenu({
                                               activeOpenAllPlaygroundsMenu,
                                               changeActiveOpenAllPlaygroundsMenu,
                                               changeActiveAllPlaygrounds
}: IProps) {
    const { getSavedPlayground, updateSavedPlaygrounds, deleteSavedPlaygrounds, getSavedPlaygroundLast } = useChatStore();
    const playgroundRename = () => {
        const playground = getSavedPlayground(activeOpenAllPlaygroundsMenu);
        if (playground == null) {
            return;
        }
        const newName = prompt("Enter new name:", playground.name || "");
        if (newName !== null && newName.trim() !== "") {
            playground.name = newName.trim();
            updateSavedPlaygrounds(playground);
            changeActiveOpenAllPlaygroundsMenu();
        }
    }
    const deletePlayground = () => {
        deleteSavedPlaygrounds(activeOpenAllPlaygroundsMenu);
        changeActiveOpenAllPlaygroundsMenu();
        if (!getSavedPlaygroundLast()) {
            changeActiveAllPlaygrounds()
        }
    }
    return (
        <div className="all-playgrounds-menu-container">
            <button className={'all-playgrounds-menu-button'}
                    onClick={ playgroundRename }
            >
                <RenameIcon/> Rename
            </button>
            <button className={'all-playgrounds-menu-button'}
                    onClick={deletePlayground}
            >
                <DeleteIcon/> Delete
            </button>
        </div>
    )
}

import DeleteIcon from "src/shared/icons/DeleteIcon";
import RenameIcon from "src/shared/icons/RenameIcon";
import "./AllPlaygroundsMenu.less";
import { useChatStore } from "src/shared/providers";

interface IProps {
    activeOpenAllPlaygroundsMenu: string,
    changeActiveOpenAllPlaygroundsMenu: () => void,
}
export default function AllPlaygroundsMenu({ activeOpenAllPlaygroundsMenu, changeActiveOpenAllPlaygroundsMenu }: IProps) {
    const { getSavedPlayground, updateSavedPlaygrounds, deleteSavedPlaygrounds } = useChatStore();
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
    return (
        <div className="all-playgrounds-menu-container">
            <button className={'all-playgrounds-menu-button'}
                    onClick={ playgroundRename }
            >
                <RenameIcon/> Rename
            </button>
            <button className={'all-playgrounds-menu-button'}
                    onClick={() => {
                        deleteSavedPlaygrounds(activeOpenAllPlaygroundsMenu);
                        changeActiveOpenAllPlaygroundsMenu();
                    }
            }
            >
                <DeleteIcon/> Delete
            </button>
        </div>
    )
}

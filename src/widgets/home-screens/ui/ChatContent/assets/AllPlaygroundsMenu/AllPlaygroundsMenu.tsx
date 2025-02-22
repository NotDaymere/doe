import DeleteIcon from "src/shared/icons/DeleteIcon";
import RenameIcon from "src/shared/icons/RenameIcon";
import "./AllPlaygroundsMenu.less";

export default function AllPlaygroundsMenu(){
    return (
        <div className="all-playgrounds-menu-container">
            <button className={'all-playgrounds-menu-button'}>
                <RenameIcon/> Rename
            </button>
            <button className={'all-playgrounds-menu-button'}>
                <DeleteIcon/> Delete
            </button>
        </div>
    )
}

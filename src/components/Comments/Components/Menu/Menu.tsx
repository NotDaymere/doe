import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import "./Menu.less";
import { PenIcon } from "src/shared/icons/PenIcon";
import LinkIcon from "src/shared/icons/Link.icon";
import DeleteIcon from "src/shared/icons/DeleteIcon";

function Menu({ setShowMenu, isEditing, setIsEditing,removeCommentOrReply }: any) {
    const { removeComment, copyLink } = useCommentWindowStore();

    return (
        <div className="menuBoxContainer">
            <button
                onClick={() => {
                    setIsEditing(!isEditing);
                    setShowMenu(false);
                }}
            >
                <PenIcon /> Edit
            </button>

            <button
                onClick={() => {
                    copyLink();
                    setShowMenu(false);
                }}
            >
                <LinkIcon />
                Copy link
            </button>
            <button onClick={() => removeComment()}>
                <DeleteIcon />
                Delete
            </button>
        </div>
    );
}

export default Menu;

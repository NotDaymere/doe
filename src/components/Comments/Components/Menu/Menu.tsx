import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import "./Menu.less";

function Menu({setShowMenu,isEditing,setIsEditing}:any) {
   const {removeComment,copyLink } = useCommentWindowStore();
  
   return (
    <div className="menuBoxContainer">
      <button onClick={() => {setIsEditing(!isEditing);setShowMenu(false)}}>
        <img src="/img/icons/edit_icon.svg" /> Edit
      </button>
     
      <button onClick={() => {copyLink();setShowMenu(false)}}>
        <img src="/img/icons/link_icon.svg" />
        Copy link
     
      </button>
      <button onClick={() => removeComment()}>
        <img src="/img/icons/delete_icon.svg" />
        Delete
      </button>
 
    </div>
  );
}


export default Menu;

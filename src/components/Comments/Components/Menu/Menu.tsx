import { useEffect, useRef } from "react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import "./Menu.less";
import { PenIcon } from "src/shared/icons/PenIcon";
import LinkIcon from "src/shared/icons/Link.icon";
import DeleteIcon from "src/shared/icons/DeleteIcon";

function Menu({ setShowMenu, isEditing, setIsEditing, removeCommentOrReply }: any) {
  const { copyLink } = useCommentWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div className="menuBoxContainer" ref={menuRef}>
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

      <button
        onClick={() => {
          removeCommentOrReply();
          setShowMenu(false);
        }}
      >
        <DeleteIcon />
        Delete
      </button>
    </div>
  
);
}

export default Menu;

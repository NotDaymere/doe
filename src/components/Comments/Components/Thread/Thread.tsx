import { useState } from "react";
import clsx from "clsx";
import Menu from "../Menu/Menu";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import { CheckRoundIcon } from "src/shared/icons/CheckRoundIcon";
import ThreeVerticalDots from "src/shared/icons/ThreeVerticalDots";
  import "../Comment Container/CommentContainer.less";

function Thread({ reply, comment }: any) {
  const { isResolved, toggleResolved } = useCommentWindowStore();

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="thread">
      <div className="th-header">
        <div className="left">
          <img src="/img/profile_pic.png" alt="avatar" />
          <div>
            <h4>{reply.user.name}</h4>
            <p>{reply.timestamp}</p>
          </div>
        </div>

        <div className="right">
          <button
            onClick={toggleResolved}
            className={clsx("resolved-button", isResolved && "resolved")}
          >
            <CheckRoundIcon />
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className={clsx("menu-button", showMenu && "active")}
          >
            <ThreeVerticalDots fill="currentColor" />
          </button>

          {showMenu && (
            <Menu
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setShowMenu={setShowMenu}
            />
          )}
        </div>
      </div>

      <div className="th-body">
        <p>{reply.message}</p>
      </div>
    </div>
  );
}

export default Thread;

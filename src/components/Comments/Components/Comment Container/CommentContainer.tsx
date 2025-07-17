import { useState, useRef, useEffect } from "react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import Menu from "../Menu/Menu";
import "./CommentContainer.less";
import { CheckRoundIcon } from "src/shared/icons/CheckRoundIcon";
import ThreeVerticalDots from "src/shared/icons/ThreeVerticalDots";
import clsx from "clsx";
import SendIcon from "src/shared/icons/SendIcon";

export default function CommentContainer({ showMenu, setShowMenu }: any) {
  const {
    comments,
    comment,
    addReply,
    updateComment,
    isResolved,
    toggleResolved,
  } = useCommentWindowStore();

  const [replyMessage, setReplyMessage] = useState("");
  const [isEditing, setIsEditing] = useState(comment?.message == null);
  const [editedMessage, setEditedMessage] = useState(comment?.message || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      const timeout = setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const len = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(len, len);
        }
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isEditing, comment]);

  const handleSaveEdit = () => {
    if (editedMessage.trim().length > 0) {
      useCommentWindowStore
        .getState()
        .updateComment(comment?.id, editedMessage);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedMessage(comment?.message || "");
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleReplyKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addReply(comment!.id, replyMessage);
      setReplyMessage("");
    }
  };

  return (
    <div className="top">
      <div className="cp-header">
        <div className="left">
          <img
            className="profile"
            src="/img/profile_pic.png"
            alt="Profile"
          />
          <div className="profile-name-time">
            <h4>{comment?.user.name}</h4>
            <p>{comment?.timestamp}</p>
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

      <div className="cp-body">
        {isEditing ? (
          <div className="edit-mode">
            <textarea
              ref={textareaRef}
              className="comment-input edit-input"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              onKeyDown={handleEditKeyDown}
              style={{
                minHeight: "40px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
            <button
              style={{ backgroundColor: "grey" }}
              onClick={handleSaveEdit}
            >
              <SendIcon />
            </button>
          </div>
        ) : (
          <p>{editedMessage}</p>
        )}
      </div>

      {!isEditing && (
        <div className="cp-footer">
          <input
            type="text"
            className="comment-input"
            value={replyMessage}
            placeholder="Reply..."
            onKeyDown={handleReplyKeyDown}
            onChange={(e) => setReplyMessage(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
          <button
            onClick={() => {
              addReply(comment!.id, replyMessage);
              setReplyMessage("");
            }}
            disabled={!replyMessage}
          >
            <SendIcon />
          </button>
        </div>
      )}
    </div>
  );
}

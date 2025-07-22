import { useState, useRef, useEffect } from "react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import Menu from "../Menu/Menu";
import "./CommentContainer.less";
import { CheckRoundIcon } from "src/shared/icons/CheckRoundIcon";
import ThreeVerticalDots from "src/shared/icons/ThreeVerticalDots";
import clsx from "clsx";
import SendIcon from "src/shared/icons/SendIcon";
import ReplyInput from "../ReplyInput";

export default function CommentContainer({ commentId,commmentFromProp, replyOn }: any) {
  const {
    comment,
    addReply,
    openComments,
   
    deleteComment,
    updateComment,
    isResolved,
    deleteReply,
    toggleResolved,
  } = useCommentWindowStore();

  const activeComment = commmentFromProp || comment;

  const [showMenu, setShowMenu] = useState(false);
  
  const [replyMessage, setReplyMessage] = useState("");
  const [isEditing, setIsEditing] = useState(activeComment?.message == null);
  const [editedMessage, setEditedMessage] = useState(activeComment?.message || "");
  

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
 
  }, [isEditing, activeComment]);

  const handleSaveEdit = () => {
    if (editedMessage.trim().length > 0) {
      updateComment(activeComment?.id, editedMessage);
      setIsEditing(false);
    }
  };

 
  const handleCancelEdit = () => {
    setEditedMessage(activeComment?.message || "");
    setIsEditing(false);
  };


  



    const removeCommentOrReply = () => {
      if (activeComment?.isReply) {
         deleteReply(commentId,activeComment.id);
         openComments(commentId);
      } else {
        deleteComment(commentId ?? activeComment.id);
      }
    }
    


  const handleEditKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="top">
      <div className="cp-header">
        <div className="left">
          <img className="profile" src="/img/profile_pic.png" alt="Profile" />
          <div className="profile-name-time">
            <h4>{activeComment?.user.name}</h4>
            <p>{activeComment?.timestamp}</p>
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
              removeCommentOrReply={removeCommentOrReply}
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

      {!isEditing && replyOn && (
       
        <ReplyInput commentId={commentId} parentId={activeComment.id} isReply={activeComment.isReply} />
      )}
    </div>
  );
}

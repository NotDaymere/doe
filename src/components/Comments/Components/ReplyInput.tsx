import { useState } from "react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import SendIcon from "src/shared/icons/SendIcon";
import "../Components/Comment Container/CommentContainer.less";

export default function ReplyInput({ commentId,parentId,isReply }: any) {
  const [replyMessage, setReplyMessage] = useState("");
  const { addReply } = useCommentWindowStore();

  const handleReplySubmit = () => {
    if (!replyMessage.trim()) return;
    console.log("Replying to comment with ID:", parentId, "Message:", replyMessage);
    addReply(commentId, replyMessage);
    setReplyMessage("");
  };

  const handleReplyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReplySubmit();
    }
  };
  


  return (
    <div className="cp-footer">
      <input
        type="text"
        className="comment-input"
        value={replyMessage}
        placeholder="Reply..."
        onChange={(e) => setReplyMessage(e.target.value)}
        onKeyDown={handleReplyKeyDown}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
        }}
      />
      <button
        onClick={handleReplySubmit}
        disabled={!replyMessage.trim()}
      >
        <SendIcon />
      </button>
    </div>
  );
}

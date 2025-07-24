import formatFriendlyDate from "src/helpers/freindlyDate";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  name: string;
  avatar: string;
}

interface Comment {
  id: number | string;
  user: User;
  timestamp: string;
  message?: string | null;
  to?: any;
  from?: any;
  replies: Comment[];
  isReply?: boolean;
  isResolved?: boolean;
  _version?: any;
}

interface CommentWindowStore {
  isOpen: boolean;
  comment?: Comment | null;
  comments: Comment[];
  isResolved: boolean;

  openComments: (id?: number | string) => void;
  closeComments: (id?: number | string) => void;
  toggleComments: () => void;

  setComment: (comment: Comment) => void;
  addComment: (comment: Comment) => void;
  selectComment: (id: number) => void;
  deleteComment: (commentId: number | string) => void;

  addReply: (parentId: number | string, content: string) => void;
  updateComment: (id: number | string, content: string) => void;
  updateReply: (parentId: number | string, replyId: number | string, content: string) => void;
  deleteReply: (parentId: number | string, replyId: number | string) => void;
  toggleResolvedComment: (commentId: number | string) => void;
  toggleReplyResolved: (parentId: number | string, replyId: number | string) => void;

  removeComment: () => void;
  toggleResolved: () => void;
  copyLink: () => boolean;
}

export const useCommentWindowStore = create<CommentWindowStore>()(
  devtools((set, get) => ({
    isOpen: false,
    comment: null,
    comments: [],
    isResolved: false,

    openComments: (id) => {
      const comment = get().comments.find((c) => c.id === id);
      set({
        comment: comment || null,
        isOpen: true,
      }, false, "openComments");
    },

    closeComments: (id) => {
      const { comments } = get();

      if (id) {
        const updatedComments = comments.filter((c) => {
          return c.id !== id || (c.message !== null && c.message !== "");
        });
        set({
          comments: updatedComments,
          comment: null,
          isOpen: false,
        }, false, "closeComments");
      } else {
        set({
          comment: null,
          isOpen: false,
        }, false, "closeComments");
      }
    },

    toggleComments: () =>
      set((state) => ({ isOpen: !state.isOpen }), false, "toggleComments"),

    setComment: (comment) =>
      set({ comment }, false, "setComment"),

    selectComment: (id) => {
      const selected = get().comments.find((c) => c.id === id) || null;
      set({ comment: selected }, false, "selectComment");
    },

    addComment: (comment) => {
      set((state) => ({
        comments: [...state.comments, comment],
        comment,
        isOpen: true,
      }), false, "addComment");
    },

    addReply: (parentId, content) => {
      const { comments, comment } = get();
      const newReply: Comment = {
        id: Date.now(),
        user: {
          name: "John Doe",
          avatar: "https://example.com/avatar3.jpg",
        },
        timestamp: formatFriendlyDate(new Date()),
        isReply: true,
        message: content,
        replies: [],
      };

      const updatedComments = comments.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c
      );

      const updatedComment =
        comment?.id === parentId
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment;

      set({
        comments: updatedComments,
        comment: updatedComment,
  
      }, false, "addReply");
    },

    updateComment: (id, content) => {
      const { comments, comment } = get();

      const updatedComments = comments.map((c) =>
        c.id === id ? { ...c, message: content, _version: Date.now() } : c
      );

      const updatedComment =
        comment?.id === id
          ? { ...comment, message: content, _version: Date.now() }
          : comment;

      set({
        comments: updatedComments,
        comment: updatedComment,
      }, false, "updateComment");
    },

    updateReply: (parentId, replyId, content) => {
      const { comments, comment } = get();

      const updatedComments = comments.map((c) => {
        if (c.id === parentId) {
          const updatedReplies = c.replies.map((r) =>
            r.id === replyId ? { ...r, message: content, _version: Date.now() } : r
          );
          return { ...c, replies: updatedReplies };
        }
        return c;
      });

      const updatedComment =
        comment?.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map((r) =>
                r.id === replyId ? { ...r, message: content, _version: Date.now() } : r
              ),
            }
          : comment;

      set({
        comments: updatedComments,
        comment: updatedComment,
      }, false, "updateReply");
    },

    deleteComment(commentId) {
      const { comments, comment } = get();

      const updatedComments = comments.filter((c) => c.id !== commentId);
      const updatedComment = comment?.id === commentId ? null : comment;
    
      set({
        comments: updatedComments,
        comment: updatedComment,
       
        isOpen: updatedComments.length > 0 ,
      }, false, "deleteComment");
    },

    
    deleteReply: (parentId, replyId) => {
      const { comments, comment } = get();
      console.log("Deleting reply with ID:", replyId, "from parent ID:", parentId);

      const updatedComments = comments.map((c) => {
        if (c.id === parentId) {
          const filteredReplies = c.replies.filter((r) => r.id !== replyId);
          return { ...c, replies: filteredReplies };
        }
        return c;
      });

      const updatedComment =
  comment?.id === parentId
    ? {
        ...comment,
        replies: comment.replies.filter((r) => r.id !== replyId),
      }
    : comment;

set({
  isOpen:true,
  comments: updatedComments,
  comment: updatedComment ?? comment,
}, false, "deleteReply");
    },

    removeComment: () =>
      set({ comment: undefined, isOpen: true }, false, "removeComment"),

    toggleResolvedComment: (commentId) => {
 
      if (!commentId) return;
  const { comments } = get();
  const updatedComments = comments.map((c) =>
    c.id === commentId ? { ...c, isResolved: !c.isResolved } : c
  );
  set({
    comments: updatedComments,
    isResolved: !get().isResolved,
  }, false, "toggleResolvedComment");

},

 toggleReplyResolved: (parentId:any, replyId:any) => {
      const { comments } = get();
      const updatedComments = comments.map((c) => {
        if (c.id === parentId) {
          const updatedReplies = c.replies.map((r) =>
            r.id === replyId ? { ...r, isResolved: !r.isResolved }
            : r
          );
          return { ...c, replies: updatedReplies };
        }

        return c;
      });
      set({
        comments: updatedComments,
      }, false, "toggleReplyResolved");
    },
    

    copyLink: () => {
      const { comment } = get();
      if (!comment) return false;

      const commentLink = `${window.location.origin}/comment/${comment.id}`;
      navigator.clipboard.writeText(commentLink)
        .then(() => alert("Copied"))
        .catch(() => false);

      return true;
    },
  }))
);

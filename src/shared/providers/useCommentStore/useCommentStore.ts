import formatFriendlyDate from "src/helpers/freindlyDate";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
 
    name: string;
  avatar: string;
}


interface Comment {
  id: number|string;
  user: User;
  timestamp: string;

  message?: string | null;
 
  to?: any;
  from?: any;
  replies: Comment[];
  _version?: any;

}


interface CommentWindowStore {
  isOpen: boolean;

  comment?: Comment | null;
  comments: Comment[];
  isResolved: boolean;

  openComments: (id?: number|string) => void;
  closeComments: (id?:number|string) => void;

  toggleComments: () => void;
  setComment: (comment: Comment) => void;
  addComment: (comment: Comment) => void;

  selectComment: (id: number) => void;
  addReply: (id:number|string,content: string) => void;
  updateComment: (id:any,content: string) => void;
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

   openComments: (id: any) => {
    const state = get();

 
  const comment = get().comments.find(c => c.id === id);
  if (comment) {
    

    set({
      comment,
      isOpen: true
    }, false, "openComments");
  }else{console.log("No Comment Found")}
},

   closeComments: (id?: number | string) => {
  const { comments, comment } = get();

  if (!id) return;
  console.log("Removing comment");
  const updatedComments = comments.filter((c) => {
    // Remove comment only if it matches ID and is empty
    return c.id !== id || (c.message !== null && c.message !== '');
  });

  set({
    comments: updatedComments,

    comment: null,
    isOpen: false,
  }, false, "closeComments");
},


    toggleComments: () =>
      set((state) => ({ isOpen: !state.isOpen }), false, "toggleComments"),


    setComment: (comment) =>

        set({ comment }, false, "setComment"),

    selectComment: (id) => {
      const selected = get().comments.find((c) => c.id === id) || null;
      set({ comment: selected }, false, "selectComment");
    },

    

    addComment: (comment) =>{
     console.log("adding Comment");
     

     set((state) => ({

        comments: [...state.comments, comment],
        comment,

        isOpen: true,
      }), false, "addComment")},

  addReply: (id: number | string, content: string) => {
  const { comments, comment } = get();

  const newReply: Comment = {
    id: Date.now(),
    user: {
   
      name: "Reply User",
      avatar: "https://example.com/avatar3.jpg",
    },
    timestamp: formatFriendlyDate(new Date()),
    message: content,
    replies: [],
  };

  const updatedComments = comments.map((c) =>
  
    c.id === id ? { ...c, replies: [...c.replies, newReply] } : c
  );

  const updatedComment =
    comment?.id === id
      ? { ...comment, replies: [...comment.replies, newReply] }
      : comment;

  set(
  
    {
      comments: updatedComments,
      comment: updatedComment,
    },
    false,
    "addReply"
  );
},

  
updateComment: (id: any, content: string) => {
 
  
    const { comments, comment } = get();


  const updatedComments = comments.map((c) =>
    
    c.id === id ? { ...c, message: content, _version: Date.now() } : c
  );

  const updatedComment = Number(comment?.id) === Number(id)
 
  ? { ...comment, message: content, _version: Date.now() }
    : comment;

  set(
    {
      comments: updatedComments,
      comment: comments.find(c => c.id === id)
    },
    false,
   
    
    "updateComment"
  );
},

    removeComment: () =>

        set({ comment: undefined, isOpen: false }, false, "removeComment"),


        toggleResolved: () =>
      set((state) => ({ isResolved: !state.isResolved }), false, "toggleResolved"),

    copyLink: () => {
      const { comment } = get();
      if (!comment) return false;

      const commentLink = `${window.location.origin}/comment/${comment.id}`;
      navigator.clipboard.writeText(commentLink)

      .then(() => {
          alert("Copied");
        })

        .catch(() => {
          return false;
        });

      return true;

    },
  }))
);
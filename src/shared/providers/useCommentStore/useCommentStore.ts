import formatFriendlyDate from "src/helpers/freindlyDate";
import { create } from "zustand";

interface User {
    name: string;
 
    avatar: string;
}

interface Comment {
 
    id: number;
    user: User;
    timestamp: string;
    message: string;

    to?:any,
    from?:any,
 
    replies: Comment[];
  
    _version?:any
}



interface CommentWindowStore { 
    isOpen: boolean;
    comment?: Comment|null;
    openComments: (id?:string|number) => void;
    
    closeComments: () => void;
    toggleComments: () => void;
    setComment: (comment: Comment) => void;
    addReply: (content: string) => void;
    removeComment: () => void;
    updateComment: (content: string) => void;

    isResolved: boolean;
    toggleResolved: () => void;
    copyLink: () => boolean;
}


export const useCommentWindowStore = create<CommentWindowStore>()((set, get) => ({
    isOpen: false,
    isResolved: false,
    comment: null,


    openComments: (id?:string|number) => {
  
        const { comment } = get();
  if (comment) {
    set({ isOpen: true });
  }
},
    
    closeComments: () => set({ isOpen: false }),
    toggleComments: () => set((state) => ({ isOpen: !state.isOpen })),

  
    setComment: (comment: Comment) => {console.log("setComment called with", comment);set({ comment })},

    addReply: (content: string) => {
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


        set((state) => ({
            comment: {
                ...state.comment,
                replies: [...state.comment.replies, newReply],
            },
        }));
    },

    removeComment: () => {

        set({
            comment: undefined,
            isOpen: false,
        });
    },

    toggleResolved: () => {
        set({
            isResolved: !get().isResolved,

        });
    },

    updateComment: (content: string) => {
console.log("updatedComment called with", content);
        set((state) => ({
            comment: {
                ...state.comment,
                
                message: content,
               _version: Date.now(),
            },
        }));
        
   
    },


    copyLink: () => {
   
        const state = get();
        if (!state.comment) return;


      
        const commentLink = `${window.location.origin}/comment/${state.comment.id}`;
        navigator.clipboard
            .writeText(commentLink)
            .then(() => {
        
                alert("Copied");

                return true;
            })
     
            .catch((err) => {

                return false;
            });

    },
}));
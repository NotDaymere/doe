import formatFriendlyDate from 'src/helpers/freindlyDate';
import { create } from 'zustand';

interface User {
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  user: User;
  timestamp: string;
  message: string;
  replies: Comment[]; // Nested replies to each comment
}

interface CommentWindowStore {
  isOpen: boolean;
  comment?: Comment; // Only one comment with replies
  openComments: () => void;
  closeComments: () => void;
  toggleComments: () => void;
  setComment: (comment: Comment) => void;
  addReply: (content: string) => void; // Adds a reply to the comment
  removeComment: () => void; // Removes the main comment (without removing replies)
  updateComment: (content: string) => void; // Edits the main comment's message
 
  isResolved: boolean; // Indicates if the comment is resolved
  toggleResolved: () => void; // Toggles the resolved state
  copyLink: () => boolean; // Method to copy the comment's link
}

export const useCommentWindowStore = create<CommentWindowStore>()((set, get) => ({
  isOpen: true,
  isResolved: false,
  comment: {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
    },
    timestamp: "Today, 9:41 AM",
    message: "This is your table looks like when it's in Doe Playground",
    replies: [{
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
      },
      timestamp: "Today, 9:45 AM",
      message: "This looks great! Nice work.",
      replies: [],
    }],
  },
  
  openComments: () => set({ isOpen: true }),
  closeComments: () => set({ isOpen: false }),
  toggleComments: () => set((state) => ({ isOpen: !state.isOpen })),

  setComment: (comment: Comment) => set({ comment }),

  // Adds a reply to the main comment
  addReply: (content: string) => {
    const newReply: Comment = {
      id: Date.now(), // Unique ID for each reply
      user: {
        name: "Reply User",
        avatar: "https://example.com/avatar3.jpg", // You can replace with the actual user's avatar
      },
      timestamp: formatFriendlyDate(new Date()),
      message: content,
      replies: [],
    };

    set((state) => ({
      comment: {
        ...state.comment,
        replies: [...state.comment.replies, newReply], // Add the reply to the replies array
      },
    }));
  },

  // Removes the main comment (but keeps replies intact)
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

  
  
  // Updates the main comment's message
  updateComment: (content: string) => {
    set((state) => ({
      comment: {
        ...state.comment,
        message: content,
      },
    }));
  },

  // Copies the link for the current comment
  copyLink: () => {
    const state = get(); // Correctly get the state using get()
    if (!state.comment) return; // Check if the comment exists

    const commentLink = `${window.location.origin}/comment/${state.comment.id}`; // Generate the link
    navigator.clipboard.writeText(commentLink) // Use the Clipboard API to copy the link
      .then(() => {
        alert("Copied");
      
        return true;
      })
      .catch((err) => {
       return false;
      });
  },

}));
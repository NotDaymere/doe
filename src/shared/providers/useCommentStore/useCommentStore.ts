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
    replies: Comment[];
}

interface CommentWindowStore {
    isOpen: boolean;
    comment?: Comment;
    openComments: () => void;
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
        replies: [
            {
                id: 2,
                user: {
                    name: "Jane Smith",
                    avatar: "https://example.com/avatar2.jpg",
                },
                timestamp: "Today, 9:45 AM",
                message: "This looks great! Nice work.",
                replies: [],
            },
        ],
    },

    openComments: () => set({ isOpen: true }),
    closeComments: () => set({ isOpen: false }),
    toggleComments: () => set((state) => ({ isOpen: !state.isOpen })),

    setComment: (comment: Comment) => set({ comment }),

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
        set((state) => ({
            comment: {
                ...state.comment,
                message: content,
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

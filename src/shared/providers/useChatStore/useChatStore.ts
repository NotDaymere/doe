import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";
import { IPlayground } from "src/shared/types/Playground";
import { IQuestionCodeMessage } from "src/shared/types/QuestionCodeMessage";

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    currentBranch: IBranch | null;
    messages: IMessage[];
    playground: IPlayground;
    savedPlaygrounds: IPlayground[];
    playgroundFullscreen: boolean;
    questionCodeMessage: IQuestionCodeMessage | null;
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setPlayground: (playground: IPlayground) => void;
    setSavedPlaygrounds: (playground: IPlayground) => void;
    updateSavedPlaygrounds: (playground: IPlayground) => void;
    deleteSavedPlaygrounds: (id: string | null) => void;
    getSavedPlayground: (id: string | null) => IPlayground | null;
    getOpenSavedPlaygrounds: () => IPlayground[];
    getSavedPlaygroundLast: () => IPlayground | null;
    setPlaygroundFullscreen: (playgroundFullscreen: boolean) => void;
    setQuestionCodeMessage: (questionCodeMessage: IQuestionCodeMessage) => void;
}

export const useChatStore = create<ChatState>()(
    (set, get) => ({
        isTyping: false,
        editor: null,
        currentBranch: null,
        messages: [
            {
                id: 1,
                content: `<p>Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.</p><p><br class="ProseMirror-trailingBreak"></p><p>We will write this code completely in Python.</p><p><br class="ProseMirror-trailingBreak"></p><p>The Python code for the deletion function is as follows:</p><p><br class="ProseMirror-trailingBreak"></p>`,
                files: [],
                isCode: true,
                isUser: false
            }, {
                id: 2,
                content: "<p>Create a simple project for me in any <strong>language</strong>.</p>",
                files: [],
                isCode: false,
                isUser: true
            }
        ],
        playground: {
            type: null,
            name: "",
            open: false,
            data: null,
            text: "",
            id: null,
        },
        savedPlaygrounds: [],
        playgroundFullscreen: false,
        questionCodeMessage: null,
        setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
        setMessages: (messages) => set(() => ({ messages })),
        setEditor: (editor) => set(() => ({ editor })),
        setTyping: (isTyping) => set(() => ({ isTyping })),
        setPlayground: (playground) => set(() => ({ playground })),
        setPlaygroundFullscreen: (playgroundFullscreen) => set(() => ({ playgroundFullscreen })),
        setQuestionCodeMessage: (questionCodeMessage) => set(() => ({ questionCodeMessage })),

        setSavedPlaygrounds: (playground) => set((state) => {
            const newId = state.savedPlaygrounds.length > 0 ?
                String(Math.max(...state.savedPlaygrounds.map(p => Number(p.id) || 0)) + 1) : "1";
            return { savedPlaygrounds: [...state.savedPlaygrounds, { ...playground, id: newId }] };
        }),

        updateSavedPlaygrounds: (playground) => set((state) => ({
            savedPlaygrounds: state.savedPlaygrounds.map(p => p.id === playground.id ? playground : p),
        })),

        deleteSavedPlaygrounds: (id) => set((state) => ({
            savedPlaygrounds: state.savedPlaygrounds.filter(p => p.id !== id),
        })),

        getSavedPlayground: (id) => {
            return get().savedPlaygrounds.find(p => p.id === id) || null;
        },

        getOpenSavedPlaygrounds: () => {
            return get().savedPlaygrounds.filter(p => p.open);
        },

        getSavedPlaygroundLast: () => {
            return get().savedPlaygrounds.at(-1) || null;
        }
    })
);

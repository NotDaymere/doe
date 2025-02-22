import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    currentBranch: IBranch | null;
    messages: IMessage[];
    messagesCount: number;
    showQuickSearch: boolean;
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setMessagesCount: (messagesCount: number) => void;
    setShowQuickSearch: (showQuickSearch: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
    isTyping: false,
    editor: null,
    currentBranch: null,
    messages: [
        {
            id: 1,
            content: `<p>Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.</p><p><br class="ProseMirror-trailingBreak"></p><p>We will write this code completely in Python.</p><p><br class="ProseMirror-trailingBreak"></p><p>The Python code for the deletion function is as follows:</p><p><br class="ProseMirror-trailingBreak"></p>`,
            files: [],
            isCode: true,
            isUser: false,
        },
        {
            id: 2,
            content: "<p>Create a simple project for me in any <strong>language</strong>.</p>",
            files: [],
            isCode: false,
            isUser: true,
        },
    ],
    messagesCount: 0,
    showQuickSearch: false,
    setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
    setMessages: (messages) => set(() => ({ messages })),
    setEditor: (editor) => set(() => ({ editor })),
    setTyping: (isTyping) => set(() => ({ isTyping })),
    setMessagesCount: (messagesCount) => set(() => ({ messagesCount })),
    setShowQuickSearch: (showQuickSearch) => set(() => ({ showQuickSearch })),
}));

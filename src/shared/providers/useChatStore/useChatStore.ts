import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";
import { IPlayground } from "../../types/Playground";

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    currentBranch: IBranch | null;
    messages: IMessage[];
    playground: IPlayground;
    playgroundFullscreen: boolean;
    setPlaygroundFullscreen: (playgroundFullscreen: boolean) => void;
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setPlayground: (playground: IPlayground) => void;
}

export const useChatStore = create<ChatState>()(
    (set) => ({
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
            open: false,
            data: null,
            text: "",
            id: "code",
        },
        playgroundFullscreen: false,
        setPlaygroundFullscreen: (playgroundFullscreen) => set(() => ({ playgroundFullscreen })),
        setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
        setMessages: (messages) => set(() => ({ messages })),
        setEditor: (editor) => set(() => ({ editor })),
        setTyping: (isTyping) => set(() => ({ isTyping })),
        setPlayground: (playground) => set(() => ({ playground })),
    })
);
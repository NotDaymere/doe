import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";
import { IPlayground } from "src/shared/types/Playground";
import { IQuestionCodeMessage } from "src/shared/types/QuestionCodeMessage";

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    messages: IMessage[];
    playground: IPlayground;
    savedPlaygrounds: IPlayground[];
    playgroundFullscreen: boolean;
    questionCodeMessage: IQuestionCodeMessage | null;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setPlayground: (playground: IPlayground) => void;
    setSavedPlaygrounds: (playground: IPlayground) => void;
    updateSavedPlaygrounds: (playground: IPlayground) => void;
    deleteSavedPlaygrounds: (id: string | null) => void;
    getSavedPlayground: (id: string | null) => IPlayground | null;
    getOpenSavedPlaygrounds: () => IPlayground[];
    getOpenSavedPlaygroundsByType: (type: "code" | "table" | "source") => IPlayground[];
    getSavedPlaygroundLast: () => IPlayground | null;
    getSavedPlaygroundLastByType: (type: "code" | "table" | "source") => IPlayground | null;
    setPlaygroundFullscreen: (playgroundFullscreen: boolean) => void;
    setQuestionCodeMessage: (questionCodeMessage: IQuestionCodeMessage) => void;

    isCreateBranchChatMode: boolean;
    setIsCreateBranchChatMode: (isCreateBranchChatMode: boolean) => void;
    currentBranch: IBranch | null;
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    savedBranches: IBranch[];
    addSavedBranch: (name: string, messages: IMessage[]) => void;
    deleteSavedBranch: (id: number) => void;

    isUploadFileChatMode: boolean;
    setIsUploadFileChatMode: (isCreateBranchChatMode: boolean) => void;
}

export const useChatStore = create<ChatState>()(
    (set, get) => ({
        isTyping: false,
        editor: null,
        messages: [
            {
                id: 1,
                content: "<p>Create a simple project for me in any <strong>language</strong>.</p>",
                files: [],
                isCode: false,
                isUser: true

            }, {
                id: 2,
                content:
                `<p>Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.</p>
                <p><br class="ProseMirror-trailingBreak"></p>
                <p>We will write this code completely in Python.</p>
                <p><br class="ProseMirror-trailingBreak"></p>
                <p>The Python code for the deletion function is as follows:</p>
                <p><br class="ProseMirror-trailingBreak"></p>
                <block-code>
                <pre><code>
                def delete_element(my_list, element):
                """Removes the first occurrence of the element from the list."""
                try:
                    my_list.remove(element)
                    return my_list
                except ValueError:
                     return f"Element {element} not found in the list."

                # Example usage
                my_list = [1, 2, 3, 4, 5]
                element_to_delete = 3

                result = delete_element(my_list, element_to_delete)
                print(result)  # Output: [1, 2, 4, 5]</code></pre>
                 </block-code>`,
                files: [],
                isCode: true,
                isUser: false
            },
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

        getOpenSavedPlaygroundsByType: (type: "code" | "table" | "source") => {
            return get().savedPlaygrounds
                .filter(p => p.open)
                .filter(savedPlayground => savedPlayground.type === type);
        },

        getSavedPlaygroundLast: () => {
            return get().savedPlaygrounds.at(-1) || null;
        },

        getSavedPlaygroundLastByType: (type) => {
            return get().savedPlaygrounds
                .filter(savedPlayground => savedPlayground.type === type)
                .at(-1) || null;
        },

        isCreateBranchChatMode: false,
        currentBranch: null,
        savedBranches: [],
        addSavedBranch: (name, messages) => set((state) => {
            const newId = state.savedBranches.length > 0 ?
                Math.max(...state.savedBranches.map(p => Number(p.id) || 0)) + 1
                :
                1;
            const newBranch = {
                id: newId,
                name: name,
                messages: messages
            };
            return { savedBranches: [...state.savedBranches, newBranch] };
        }),
        deleteSavedBranch: (id) => set((state) => ({
            savedBranches: state.savedBranches.filter(branch => branch.id !== id),
        })),
        setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
        setIsCreateBranchChatMode: (isCreateBranchChatMode) => set(() => ({ isCreateBranchChatMode })),

        isUploadFileChatMode: false,
        setIsUploadFileChatMode: (isUploadFileChatMode) => set(() => ({ isUploadFileChatMode })),
    })
);

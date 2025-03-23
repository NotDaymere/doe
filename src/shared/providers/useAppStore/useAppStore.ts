import { create } from "zustand";
import { IChat } from "../../types/IChat";
import { Editor } from "@tiptap/react";
import { useChatStore } from "../useChatStore";
import { IMessage } from "../../types/Message";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    talkModeActive: boolean;
    linkInputActive: boolean;
    currentChat: IChat | null;
    chats: IChat[];
    setLinkInputActive: (bool: boolean) => void;
    setGaiaActive: (bool: boolean) => void;
    setActiveEditor: (editor: any) => void;
    setTalkModeActive: (bool: boolean) => void;
    setTheme: (value: "light" | "dark") => void;
    setCurrentChat: (chat: IChat) => void;
    addChat: (chat: IChat) => void;
    switchChat: (chatId: string) => void;
    addMessageToCurrentChat: (message: IMessage) => void;
}

const initialMessages: IMessage[] = [
    {
        id: 1,
        content: "<p>Create a simple project for me in any <strong>language</strong>.</p>",
        files: [],
        isCode: false,
        isUser: true,
    },
    {
        id: 2,
        content: `<p>Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.</p>
                  <p><br class="ProseMirror-trailingBreak"></p>
                  <p>We will write this code completely in Python.</p>
                  <p>
                    Here is a citation: 
                    <span class="citation-container" id="citation-ref-1" data-citation-url="https://en.wikipedia.org/wiki/Number_theory">
                      <span class="cited-text">This is a cited quote.</span>
                      <sup class="citation">1</sup>
                    </span>
                  </p>
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
print(result)  # Output: [1, 2, 4, 5]
                    </code></pre>
                  </block-code>
                  <p>Copy the code into a Python file, e.g., <inline-code>task_mna.py</inline-code></p>
                  <p><br/></p>`,
        files: [],
        isCode: true,
        isUser: false,
    },
];

export const useAppStore = create<AppState>()((set, get) => {
    const defaultChat: IChat = {
        id: "init-chat",
        name: "New Chat",
        messages: initialMessages,
    };

    useChatStore.getState().initChat(defaultChat.messages);

    return {
        editor: null,
        theme: "light",
        gaiaActive: false,
        talkModeActive: false,
        linkInputActive: false,
        currentChat: defaultChat,
        chats: [defaultChat],

        setLinkInputActive: (bool: boolean) => set(() => ({ linkInputActive: bool })),
        setGaiaActive: (gaiaActive: boolean) => set(() => ({ gaiaActive })),
        setActiveEditor: (editor: any) => set(() => ({ editor })),
        setTalkModeActive: (talkModeActive: boolean) => set(() => ({ talkModeActive })),
        setTheme: (theme: "light" | "dark") => set(() => ({ theme })),

        setCurrentChat: (chat: IChat) => {
            set(() => ({ currentChat: chat }));
            useChatStore.getState().initChat(chat.messages);
        },

        addChat: (chat: IChat) =>
            set((state) => ({
                chats: [...state.chats, chat],
                currentChat: state.currentChat || chat,
            })),

        switchChat: (chatId: string) => {
            const chat = get().chats.find((c) => c.id === chatId);
            if (chat) {
                set(() => ({ currentChat: chat }));
                useChatStore.getState().initChat(chat.messages);
            }
        },

        addMessageToCurrentChat: (message: IMessage) => {
            set((state) => {
                if (!state.currentChat) return {};
                const updatedMessages = [...state.currentChat.messages, message];
                let updatedName = state.currentChat.name;
                if (updatedMessages.length === 1) {
                    const plainText = message.content.replace(/<[^>]+>/g, '');
                    updatedName = plainText.slice(0, 20);
                }
                const updatedChat = { ...state.currentChat, messages: updatedMessages, name: updatedName };
                const updatedChats = state.chats.map(chat =>
                    chat.id === updatedChat.id ? updatedChat : chat
                );
                return { currentChat: updatedChat, chats: updatedChats };
            });
        },
    };
});

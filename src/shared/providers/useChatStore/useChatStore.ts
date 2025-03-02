import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    currentBranch: IBranch | null;
    messages: IMessage[];
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>()(
    (set) => ({
        isTyping: false,
        editor: null,
        currentBranch: null,
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
        setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
        setMessages: (messages) => set(() => ({ messages })),
        setEditor: (editor) => set(() => ({ editor })),
        setTyping: (isTyping) => set(() => ({ isTyping }))
    })
);
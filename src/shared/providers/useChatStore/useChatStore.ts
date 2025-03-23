import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";
import { IPlayground } from "src/shared/types/Playground";
import { IQuestionCodeMessage } from "src/shared/types/QuestionCodeMessage";
import { IBranchDialog } from "../../types/BranchDialog";
import { IMessageNode } from "../../types/MessageNode";
import { testTextAndCharts } from "../../../components/chat-message/mockData";
import { useVersionHistoryStore } from "../index";

import { ChatTagsEnum } from "../../enums/ChatTagsEnum";
import { IChat } from "../../types/Chat";

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

const initialMessageNodeMap = (initialMessages: IMessage[]): Record<string, IMessageNode> => {
    const messageNodeMap: Record<string, IMessageNode> = {
        root: { id: "root", isRootNode: true, children: [] },
    };

    let previousNode = messageNodeMap.root;

    initialMessages.forEach((message, index) => {
        const nodeId = message.id ? String(message.id) : String(index + 1);
        const node: IMessageNode = {
            id: nodeId,
            parent: previousNode,
            children: [],
            message,
            isRootNode: false,
        };
        messageNodeMap[nodeId] = node;

        if (!previousNode.children) {
            previousNode.children = [];
        }
        previousNode.children.push(node);
        previousNode.currentChildrenVersion = previousNode.children.length - 1;
        previousNode = node;
    });

    return messageNodeMap;
};

const defaultChat: IChat = {
    id: "init-chat",
    name: "Сhat 01",
    messageNodes: initialMessageNodeMap(initialMessages),
    tags: [ChatTagsEnum.Green],
    notificationsCount: 2,
    branches: []
};

const defaultTagNames = new Map<ChatTagsEnum, string>([
    [ChatTagsEnum.Green, "Green"],
    [ChatTagsEnum.Orange, "Orange"],
    [ChatTagsEnum.Purple, "Purple"],
    [ChatTagsEnum.Yellow, "Yellow"],
    [ChatTagsEnum.Red, "Red"],
    [ChatTagsEnum.Blue, "Blue"],
    [ChatTagsEnum.Black, "Black"],
    [ChatTagsEnum.Beige, "Beige"],
    [ChatTagsEnum.Gray, "Gray"],
]);

let currentReplyTimeoutId: number | null = null;
let currentReplyReject: ((reason?: any) => void) | null = null;

export interface ChatState {
    editor: Editor | null;
    isTyping: boolean;

    questionCodeMessage: IQuestionCodeMessage | null;
    setQuestionCodeMessage: (questionCodeMessage: IQuestionCodeMessage) => void;

    setCurrentChat: (chat: IChat) => void;
    currentChat: IChat | null;
    chats: IChat[];
    addChat: (chat: IChat) => void;
    addNewChat: (chat: IChat) => void;
    switchChat: (chatId: string) => void;
    renameChat: (chatId: string, newName: string) => void;

    customTagNames: Map<ChatTagsEnum, string>;

    playground: IPlayground;
    savedPlaygrounds: IPlayground[];
    playgroundFullscreen: boolean;

    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setPlayground: (playground: IPlayground) => void;
    setSavedPlaygrounds: (playground: IPlayground) => void;
    updateSavedPlaygrounds: (playground: IPlayground) => void;
    saveHistory: (playground: IPlayground) => void;
    deleteSavedPlaygrounds: (id: string | null) => void;
    getSavedPlayground: (id: string | null) => IPlayground | null;
    getOpenSavedPlaygrounds: () => IPlayground[];
    getOpenSavedPlaygroundsByType: (type: "code" | "table" | "source" | "iframe") => IPlayground[];
    getSavedPlaygroundLast: () => IPlayground | null;
    getSavedPlaygroundLastByType: (type: "code" | "table" | "source" | "iframe") => IPlayground | null;
    setPlaygroundFullscreen: (playgroundFullscreen: boolean) => void;

    doMessageReply: () => Promise<IMessage>;
    cancelReply: () => void;
    isReplyLoading: boolean;
    setIsReplyLoading: (loading: boolean) => void;
    replyTimeoutId: number | null;
    replyPromiseReject?: (reason?: any) => void;

    changeMessage: (oldMessage: IMessage, newMessage: IMessage) => IMessage | null;
    addMessageNode: (parent: IMessageNode | string | undefined, message: IMessage) => void;
    addMessageNodeVersion: (current: IMessageNode | string | IMessage | number, message: IMessage) => void;
    changeCurrentNodeVersion: (node: IMessageNode | string | IMessage | number, direction: "prev" | "next") => void;
    getMessageQueueFromNode: () => IMessage[];
    getFavouritesMessages: () => IMessage[];
    getLastCurrentVersionMessageNode: () => IMessageNode;
    getCurrentMessageNodeVersionInfo: (
        node: IMessageNode | string | IMessage | number
    ) => { totalVersions: number; currentVersion: number } | null;

    isCreateBranchChatMode: boolean;
    setIsCreateBranchChatMode: (isCreateBranchChatMode: boolean) => void;
    isCurrentBranchOpen: boolean;
    setIsCurrentBranchOpen: (open: boolean) => void;
    currentBranch: IBranch | null;
    setCurrentBranch: (currentBranch: IBranch | string | number | null) => void;
    savedBranches: IBranch[];
    addSavedBranch: (
        name: string,
        messages: IMessage[],
        dialogsMessages: IBranchDialog[],
        mainMessageId?: string | number
    ) => IBranch;
    deleteSavedBranch: (id: number) => void;
    addDialogToCurrentBranch: (dialog: IBranchDialog) => void;
    getBranchById: (id: string | number) => IBranch | null;
    currentBranchDialog: number | null;
    setCurrentBranchDialog: (dialogIndex: number | null) => void;

    renameTag: (tag: ChatTagsEnum, newName: string) => void;
    setChatTags: (chatId: string, newTags: ChatTagsEnum[]) => void;

    initChat: (messages: IMessage[]) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({

    initChat: (messages: IMessage[]) => {
        const messageNodes = initialMessageNodeMap(messages);
        const initializedChat: IChat = {
            ...defaultChat,
            messageNodes,
        };
        set(() => ({
            currentChat: initializedChat,
            chats: [initializedChat],
        }));
    },

    customTagNames: defaultTagNames,
    isTyping: false,
    editor: null,

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

    currentChat: defaultChat,
    chats: [defaultChat],

    replyTimeoutId: null,
    isReplyLoading: false,
    setIsReplyLoading: (loading: boolean) => set(() => ({ isReplyLoading: loading })),

    doMessageReply: () => {
        set({ isReplyLoading: true });
        return new Promise<IMessage>((resolve, reject) => {
            currentReplyReject = reject;
            currentReplyTimeoutId = window.setTimeout(() => {
                set({
                    isReplyLoading: false,
                    replyTimeoutId: null,
                    replyPromiseReject: undefined,
                });
                currentReplyTimeoutId = null;
                currentReplyReject = null;
                const newMessage: IMessage = {
                    id: Date.now() + 1,
                    isUser: false,
                    isCode: true,
                    content: testTextAndCharts,
                    files: [],
                };
                get().addMessageNode(undefined, newMessage);
                resolve(newMessage);
            }, 3000);
            set({ replyTimeoutId: currentReplyTimeoutId, replyPromiseReject: currentReplyReject });
        });
    },

    cancelReply: () => {
        if (currentReplyTimeoutId !== null) {
            clearTimeout(currentReplyTimeoutId);
            if (currentReplyReject) {
                currentReplyReject(new Error("Cancelled"));
            }
            set({
                isReplyLoading: false,
                replyTimeoutId: null,
                replyPromiseReject: undefined,
            });
            currentReplyTimeoutId = null;
            currentReplyReject = null;
        }
    },

    setEditor: (editor) => set(() => ({ editor })),
    setTyping: (isTyping) => set(() => ({ isTyping })),
    setPlayground: (playground) => set(() => ({ playground })),
    setPlaygroundFullscreen: (playgroundFullscreen) => set(() => ({ playgroundFullscreen })),
    setQuestionCodeMessage: (questionCodeMessage) => set(() => ({ questionCodeMessage })),

    setSavedPlaygrounds: (playground) =>
        set((state) => {
            const newId =
                state.savedPlaygrounds.length > 0
                    ? String(Math.max(...state.savedPlaygrounds.map(p => Number(p.id) || 0)) + 1)
                    : "1";
            const newPlayground = { ...playground, id: newId };

            useVersionHistoryStore.getState().updateHistory({
                id: Date.now(),
                name: null,
                time: new Date().toLocaleString(),
                user: "Current User",
                photo: "/temp/profile.jpg",
                playgroundId: newPlayground.id,
                playground: newPlayground,
            });

            return { savedPlaygrounds: [...state.savedPlaygrounds, newPlayground] };
        }),

    updateSavedPlaygrounds: (playground) =>
        set((state) => ({
            savedPlaygrounds: state.savedPlaygrounds.map(p => p.id === playground.id ? playground : p),
        })),

    deleteSavedPlaygrounds: (id) =>
        set((state) => ({
            savedPlaygrounds: state.savedPlaygrounds.filter(p => p.id !== id),
        })),

    getSavedPlayground: (id) => {
        return get().savedPlaygrounds.find(p => p.id === id) || null;
    },

    getOpenSavedPlaygrounds: () => {
        return get().savedPlaygrounds.filter(p => p.open);
    },
    saveHistory: (playground) =>
        set((state) => {
            useVersionHistoryStore.getState().updateHistory({
                id: Date.now(),
                name: null,
                time: new Date().toLocaleString(),
                user: "Current User",
                photo: "/temp/profile.jpg",
                playgroundId: playground.id,
                playground: playground,
            });

            return {
                savedPlaygrounds: state.savedPlaygrounds.map(p => p.id === playground.id ? playground : p),
            };
        }),
    getOpenSavedPlaygroundsByType: (type) => {
        return get().savedPlaygrounds.filter(p => p.open && p.type === type);
    },

    getSavedPlaygroundLast: () => {
        return get().savedPlaygrounds.at(-1) || null;
    },

    getSavedPlaygroundLastByType: (type) => {
        return get().savedPlaygrounds.filter(p => p.type === type).at(-1) || null;
    },

    isCreateBranchChatMode: false,
    currentBranch: null,
    currentBranchDialog: null,
    isCurrentBranchOpen: false,
    savedBranches: [],

    addSavedBranch: (name: string, messages: IMessage[], dialogsMessages: IBranchDialog[], mainMessageId?: string | number) => {
        const stripHTML = (html: string): string => {
            const element = document.createElement("div");
            element.innerHTML = html;
            return element.textContent || element.innerText || "";
        };
        const branchName = stripHTML(name);
        const state = get();
        const newId = state.currentChat?.branches.length
            ? Math.max(...state.currentChat!.branches.map((p) => Number(p.id) || 0)) + 1
            : 1;
        const newBranch = {
            id: newId,
            name: branchName,
            messages,
            dialogsMessages,
            mainMessageId,
        };
        if (!state.currentChat) return newBranch;
        const updatedChat = {
            ...state.currentChat,
            branches: [...state.currentChat.branches, newBranch],
        };
        const updatedChats = state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat);
        set({ currentChat: updatedChat, savedBranches: updatedChat.branches, chats: updatedChats });
        return newBranch;
    },

    getBranchById: (id: string | number) => {
        return get().currentChat?.branches.find((branch) => String(branch.id) === String(id)) || null;
    },

    addDialogToCurrentBranch: (dialog: IBranchDialog) =>
        set((state) => {
            if (!state.currentChat) return state;
            const updatedBranches = state.currentChat.branches.map((b) =>
                b.id === state.currentBranch?.id ? { ...b, dialogsMessages: [...b.dialogsMessages, dialog] } : b
            );
            const updatedChat = { ...state.currentChat, branches: updatedBranches };
            const updatedCurrentBranch = updatedBranches.find((b) => b.id === state.currentBranch?.id) || state.currentBranch;
            return { currentChat: updatedChat, savedBranches: updatedChat.branches, currentBranch: updatedCurrentBranch };
        }),

    deleteSavedBranch: (id) =>
        set((state) => {
            if (!state.currentChat) return state;
            const isCurrentBranchDeleted = state.currentBranch && String(state.currentBranch.id) === String(id);
            const updatedBranches = state.currentChat.branches.filter((branch) => branch.id !== id);
            const updatedChat = { ...state.currentChat, branches: updatedBranches };
            return {
                currentChat: updatedChat,
                savedBranches: updatedBranches,
                currentBranch: isCurrentBranchDeleted ? null : state.currentBranch,
                currentBranchDialog: isCurrentBranchDeleted ? null : state.currentBranchDialog,
            };
        }),

    setCurrentBranch: (branch: IBranch | string | number | null) => {
        if (branch === null) {
            set({ currentBranch: null, currentBranchDialog: null });
        } else if (typeof branch === "object") {
            set({ currentBranch: branch, currentBranchDialog: null });
        } else {
            const foundBranch = get().currentChat?.branches.find((b) => String(b.id) === String(branch));
            set({ currentBranch: foundBranch || null, currentBranchDialog: null });
        }
    },

    setCurrentBranchDialog: (dialogIndex: number | null) => set({ currentBranchDialog: dialogIndex }),
    setIsCreateBranchChatMode: (isCreateBranchChatMode) => set(() => ({ isCreateBranchChatMode })),
    setIsCurrentBranchOpen: (open: boolean) => set(() => ({ isCurrentBranchOpen: open })),

    setCurrentChat: (chat: IChat) => {
        set(() => ({
            currentChat: chat,
            currentBranch: null,
            currentBranchDialog: null,
            isCreateBranchChatMode: false,
            isCurrentBranchOpen: false,
        }));
    },

    addChat: (chat: IChat) =>
        set((state) => ({
            chats: [...state.chats, chat],
            currentChat: state.currentChat || chat,
        })),

    addNewChat: (chat: IChat) =>
        set((state) => ({
            chats: [...state.chats, chat],
            currentChat: chat,
        })),

    switchChat: (chatId: string) => {
        const chat = get().chats.find((c) => c.id === chatId);
        if (chat) {
            set(() => ({
                currentChat: chat,
                currentBranch: null,
                currentBranchDialog: null,
                isCreateBranchChatMode: false,
                isCurrentBranchOpen: false,
            }));
        }
    },

    renameChat: (chatId: string, newName: string) => {
        set((state) => {
            const updatedChats = state.chats.map(chat =>
                chat.id === chatId ? { ...chat, name: newName } : chat
            );
            let updatedCurrentChat = state.currentChat;
            if (state.currentChat && state.currentChat.id === chatId) {
                updatedCurrentChat = { ...state.currentChat, name: newName };
            }
            return {
                chats: updatedChats,
                currentChat: updatedCurrentChat,
            };
        });
    },

    setChatTags: (chatId: string, newTags: ChatTagsEnum[]) =>
        set((state) => {
            const updatedChats = state.chats.map((chat) =>
                chat.id === chatId ? { ...chat, tags: newTags } : chat
            );
            let updatedCurrentChat = state.currentChat;
            if (state.currentChat && state.currentChat.id === chatId) {
                updatedCurrentChat = { ...state.currentChat, tags: newTags };
            }
            return { chats: updatedChats, currentChat: updatedCurrentChat };
        }),
    renameTag: (tag: ChatTagsEnum, newName: string) => {
        set((state) => {
            const updatedTagNames = new Map(state.customTagNames);
            updatedTagNames.set(tag, newName);
            return { customTagNames: updatedTagNames };
        });
    },

    addMessageNode: (parent: IMessageNode | string | undefined, message: IMessage) =>
        set((state) => {
            if (!state.currentChat) return {};
            let actualParent: IMessageNode | undefined;
            if (typeof parent === "string") {
                actualParent = state.currentChat.messageNodes[parent];
            } else if (parent) {
                actualParent = parent;
            } else {
                actualParent = state.currentChat.messageNodes["root"];
            }
            const newId = message.id
                ? String(message.id)
                : (Object.keys(state.currentChat.messageNodes).length + 1).toString();
            const newNode: IMessageNode = {
                id: newId,
                parent: actualParent,
                children: [],
                message: message,
                isRootNode: false,
            };

            if (actualParent) {
                const updatedChildren = actualParent.children ? [...actualParent.children, newNode] : [newNode];
                actualParent.children = updatedChildren;
                actualParent.currentChildrenVersion = updatedChildren.length - 1;
            }

            const updatedNodes = {
                ...state.currentChat.messageNodes,
                [newId]: newNode,
            };
            const updatedChat = { ...state.currentChat, messageNodes: updatedNodes };
            const updatedChats = state.chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat);
            return { currentChat: updatedChat, chats: updatedChats };
        }),

    addMessageNodeVersion: (current: IMessageNode | string | IMessage | number, message: IMessage) =>
        set((state) => {
            if (!state.currentChat) return {};
            let currentNode: IMessageNode | undefined;
            if (typeof current === "object") {
                if ("isRootNode" in current) {
                    currentNode = current as IMessageNode;
                } else {
                    currentNode = Object.values(state.currentChat.messageNodes).find(
                        (n) => n.message && n.message.id === (current as IMessage).id
                    );
                }
            } else {
                currentNode = state.currentChat.messageNodes[current.toString()];
                if (!currentNode) {
                    currentNode = Object.values(state.currentChat.messageNodes).find((n) => n.message && n.message.id === current);
                }
            }
            if (!currentNode) {
                currentNode = state.currentChat.messageNodes["root"];
            }
            const parentOfCurrent = currentNode.parent || state.currentChat.messageNodes["root"];
            const newId = message.id
                ? String(message.id)
                : (Object.keys(state.currentChat.messageNodes).length + 1).toString();
            const newNode: IMessageNode = {
                id: newId,
                parent: parentOfCurrent,
                children: [],
                message: message,
                isRootNode: false,
            };
            if (parentOfCurrent) {
                const updatedChildren = parentOfCurrent.children
                    ? [...parentOfCurrent.children, newNode]
                    : [newNode];
                parentOfCurrent.children = updatedChildren;
                parentOfCurrent.currentChildrenVersion = updatedChildren.length - 1;
            }
            const updatedNodes = { ...state.currentChat.messageNodes, [newId]: newNode };
            const updatedChat = { ...state.currentChat, messageNodes: updatedNodes };
            return { currentChat: updatedChat };
        }),

    changeCurrentNodeVersion: (
        node: IMessageNode | string | IMessage | number,
        direction: "prev" | "next"
    ) =>
        set((state) => {
            if (!state.currentChat) return {};
            let targetNode: IMessageNode | undefined;
            if (typeof node === "object") {
                if ("isRootNode" in node) {
                    targetNode = node as IMessageNode;
                } else {
                    const msg = node as IMessage;
                    targetNode = Object.values(state.currentChat.messageNodes).find(
                        (n) => n.message && n.message.id === msg.id
                    );
                }
            } else {
                targetNode = state.currentChat.messageNodes[node.toString()];
                if (!targetNode) {
                    targetNode = Object.values(state.currentChat.messageNodes).find(
                        (n) => n.message && n.message.id === node
                    );
                }
            }
            if (!targetNode) return {};
            const parent = targetNode.parent;
            if (!parent || !parent.children || parent.children.length === 0) return {};
            const currentIndex = parent.children.findIndex((n) => n.id === targetNode!.id);
            if (currentIndex === -1) return {};
            let newIndex = parent.currentChildrenVersion ?? currentIndex;
            if (direction === "prev") {
                newIndex = Math.max(0, newIndex - 1);
            } else if (direction === "next") {
                newIndex = Math.min(parent.children.length - 1, newIndex + 1);
            }
            parent.currentChildrenVersion = newIndex;
            const updatedChat = { ...state.currentChat };
            return { currentChat: updatedChat };
        }),

    getMessageQueueFromNode: () => {
        const state = get();
        if (!state.currentChat) return [];
        const result: IMessage[] = [];
        let currentNode = state.currentChat.messageNodes["root"];
        while (currentNode && currentNode.children && currentNode.children.length > 0) {
            const versionIndex = currentNode.currentChildrenVersion ?? 0;
            if (versionIndex < 0 || versionIndex >= currentNode.children.length) break;
            const nextNode = currentNode.children[versionIndex];
            if (nextNode && nextNode.message) {
                result.push(nextNode.message);
            }
            currentNode = nextNode;
        }
        return result;
    },

    getFavouritesMessages: () => {
        const messages = get().getMessageQueueFromNode();
        return messages.filter(message => message.isLiked === true);
    },

    getCurrentMessageNodeVersionInfo: (node: IMessageNode | string | IMessage | number) => {
        const state = get();
        if (!state.currentChat) return null;
        let targetNode: IMessageNode | undefined;
        if (typeof node === "object") {
            if ("isRootNode" in node) {
                targetNode = node as IMessageNode;
            } else {
                const msg = node as IMessage;
                targetNode = Object.values(state.currentChat.messageNodes).find(
                    (n) => n.message && n.message.id === msg.id
                );
            }
        } else {
            targetNode = state.currentChat.messageNodes[node.toString()];
            if (!targetNode) {
                targetNode = Object.values(state.currentChat.messageNodes).find(
                    (n) => n.message && n.message.id === node
                );
            }
        }
        if (!targetNode || !targetNode.parent) return null;
        const parent = targetNode.parent;
        const childrenCount = parent.children ? parent.children.length : 0;
        const currentVersion = parent.currentChildrenVersion ?? 0;
        return { totalVersions: childrenCount, currentVersion: currentVersion };
    },

    getLastCurrentVersionMessageNode: () => {
        const state = get();
        if (!state.currentChat) {
            throw new Error("No current chat available");
        }
        let currentNode = state.currentChat.messageNodes["root"];
        while (currentNode && currentNode.children && currentNode.children.length > 0) {
            const index = currentNode.currentChildrenVersion ?? 0;
            const nextNode = currentNode.children[index];
            if (!nextNode) break;
            currentNode = nextNode;
        }

        return currentNode!;
    },

    changeMessage: (oldMessage: IMessage, newMessage: IMessage): IMessage | null => {
        let result: IMessage | null = null;
        set((state) => {
            if (!state.currentChat) return {};
            let targetKey: string | undefined;
            for (const key in state.currentChat.messageNodes) {
                if (state.currentChat.messageNodes[key]?.message?.id === oldMessage.id) {
                    targetKey = key;
                    break;
                }
            }
            if (!targetKey || !state.currentChat.messageNodes[targetKey]) {
                result = null;
                return {};
            }
            const updatedNode = {
                ...state.currentChat.messageNodes[targetKey]!,
                message: newMessage,
            };
            const updatedNodes = {
                ...state.currentChat.messageNodes,
                [targetKey]: updatedNode,
            };
            result = newMessage;
            const updatedChat = { ...state.currentChat, messageNodes: updatedNodes };
            return {
                currentChat: updatedChat,
            };
        });
        return result;
    },
}));

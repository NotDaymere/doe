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
import {TableSelectedAreaType} from "../../../widgets/home-screens/lib/enums/TableSelectedAreaTypeEnum";
import { useState } from "react";

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
                    </block-code>`,
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
        const id = (index + 1).toString();
        const node: IMessageNode = {
            id,
            parent: previousNode,
            children: [],
            message,
            isRootNode: false,
        };
        messageNodeMap[id] = node;
        previousNode.children!.push(node);
        previousNode.currentChildrenVersion = previousNode.children!.length - 1;
        previousNode = node;
    });

    return messageNodeMap;
};

let currentReplyTimeoutId: number | null = null;
let currentReplyReject: ((reason?: any) => void) | null = null;

interface ChatState {
    editor: Editor | null;
    isTyping: boolean;

    questionCodeMessage: IQuestionCodeMessage | null;
    setQuestionCodeMessage: (questionCodeMessage: IQuestionCodeMessage) => void;

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
    getOpenSavedPlaygroundsByType: (type: "code" | "table" | "source") => IPlayground[];
    getSavedPlaygroundLast: () => IPlayground | null;
    getSavedPlaygroundLastByType: (type: "code" | "table" | "source") => IPlayground | null;
    setPlaygroundFullscreen: (playgroundFullscreen: boolean) => void;

    messages: IMessage[];
    setMessages: (messages: IMessage[]) => void;
    doMessageReply: () => Promise<IMessage>;
    cancelReply: () => void;
    isReplyLoading: boolean;
    setIsReplyLoading: (loading: boolean) => void;
    replyTimeoutId: number | null;
    replyPromiseReject?: (reason?: any) => void;

    messageNodeMap: Record<string, IMessageNode>;
    addMessageNode: (parent: IMessageNode | string | undefined, message: IMessage) => void;
    addMessageNodeVersion: (current: IMessageNode | string | IMessage | number, message: IMessage) => void;
    changeCurrentNodeVersion: (node: IMessageNode | string | IMessage | number, direction: "prev" | "next") => void;
    getMessageQueueFromNode: () => IMessage[];
    getLastCurrentVersionMessageNode: () => IMessageNode;
    getCurrentMessageNodeVersionInfo: (
        node: IMessageNode | string | IMessage | number
    ) => { totalVersions: number, currentVersion: number } | null;

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
    isUploadFileChatMode: boolean;
    setIsUploadFileChatMode: (isCreateBranchChatMode: boolean) => void;

    isHyperlinkInputOpen: boolean;
    setIsHyperlinkInputOpen: (isHyperlinkInput: boolean) => void;

    isTablePromptVisible: boolean;
    selectedArea: {
        type: TableSelectedAreaType | null;
        value: string | number | null;
    };

    setIsTablePromptVisible: (visible: boolean) => void;
    setSelectedArea: (area: { type: TableSelectedAreaType | null;
    value: string | number | null }) => void;

    isMaximized: boolean;
    setIsMaximized: (isMaximized: boolean) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
    isTyping: false,
    editor: null,
    messages: initialMessages,

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

    replyTimeoutId: null,

    setMessages: (messages) => set(() => ({ messages })),
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
                resolve({
                    id: Date.now() + 1,
                    isUser: false,
                    isCode: true,
                    content: testTextAndCharts,
                    files: [],
                });
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

        setSavedPlaygrounds: (playground) => set((state) => {
            const newId = state.savedPlaygrounds.length > 0 ?
                String(Math.max(...state.savedPlaygrounds.map(p => Number(p.id) || 0)) + 1) : "1";
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
    saveHistory: (playground) => set((state) => {
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
        const newId = state.savedBranches.length > 0
            ? Math.max(...state.savedBranches.map((p) => Number(p.id) || 0)) + 1
            : 1;
        const newBranch = {
            id: newId,
            name: branchName,
            messages,
            dialogsMessages,
            mainMessageId,
        };
        set({ savedBranches: [...state.savedBranches, newBranch] });
        return newBranch;
    },
    getBranchById: (id: string | number) => {
        return get().savedBranches.find((branch) => String(branch.id) === String(id)) || null;
    },
    addDialogToCurrentBranch: (dialog: IBranchDialog) =>
        set((state) => {
            if (!state.currentBranch) return state;
            const updatedBranches = state.savedBranches.map((b) =>
                b.id === state.currentBranch!.id ? { ...b, dialogsMessages: [...b.dialogsMessages, dialog] } : b
            );
            const updatedCurrentBranch =
                updatedBranches.find((b) => b.id === state.currentBranch!.id) || state.currentBranch;
            return { savedBranches: updatedBranches, currentBranch: updatedCurrentBranch };
        }),
    deleteSavedBranch: (id) =>
        set((state) => {
            const isCurrentBranchDeleted = state.currentBranch && String(state.currentBranch.id) === String(id);
            return {
                savedBranches: state.savedBranches.filter((branch) => branch.id !== id),
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
            const foundBranch = get().savedBranches.find((b) => String(b.id) === String(branch));
            set({ currentBranch: foundBranch || null, currentBranchDialog: null });
        }
    },
    setCurrentBranchDialog: (dialogIndex: number | null) => set({ currentBranchDialog: dialogIndex }),
    setIsCreateBranchChatMode: (isCreateBranchChatMode) => set(() => ({ isCreateBranchChatMode })),
    setIsCurrentBranchOpen: (open: boolean) => set(() => ({ isCurrentBranchOpen: open })),

    isUploadFileChatMode: false,
    setIsUploadFileChatMode: (isUploadFileChatMode) => set(() => ({ isUploadFileChatMode })),

    isHyperlinkInputOpen: false,
    setIsHyperlinkInputOpen: (isHyperlinkInputOpen) => set(() => ({isHyperlinkInputOpen})),

    isTablePromptVisible: false,
    selectedArea: { type: null, value: null },

    setIsTablePromptVisible: (visible: boolean) => set(() => ({ isTablePromptVisible: visible })),
    setSelectedArea: (area) => set(() => ({ selectedArea: area })),

    isMaximized: false,
    setIsMaximized: (isMaximized) => set(() => ({isMaximized})),


    messageNodeMap: initialMessageNodeMap(initialMessages),

    addMessageNode: (parent: IMessageNode | string | undefined, message: IMessage) =>
        set((state) => {
            let actualParent: IMessageNode | undefined;
            if (typeof parent === "string") {
                actualParent = state.messageNodeMap[parent];
            } else if (parent) {
                actualParent = parent;
            } else {
                actualParent = state.messageNodeMap["root"];
            }
            const newId = (Object.keys(state.messageNodeMap).length + 1).toString();
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

            const updatedMap = {
                ...state.messageNodeMap,
                [newId]: newNode,
            };

            return { messageNodeMap: updatedMap, messages: [...state.messages, message] };
        }),

    addMessageNodeVersion: (current: IMessageNode | string | IMessage | number, message: IMessage) =>
        set((state) => {
            let currentNode: IMessageNode | undefined;
            if (typeof current === "object") {
                if ("isRootNode" in current) {
                    currentNode = current as IMessageNode;
                } else {
                    currentNode = Object.values(state.messageNodeMap).find(
                        (n) => n.message && n.message.id === (current as IMessage).id
                    );
                }
            } else {
                currentNode = state.messageNodeMap[current.toString()];
                if (!currentNode) {
                    currentNode = Object.values(state.messageNodeMap).find((n) => n.message && n.message.id === current);
                }
            }
            if (!currentNode) {
                currentNode = state.messageNodeMap["root"];
            }
            const parentOfCurrent = currentNode.parent || state.messageNodeMap["root"];
            const newId = (Object.keys(state.messageNodeMap).length + 1).toString();
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
            const updatedMap = { ...state.messageNodeMap, [newId]: newNode };
            return { messageNodeMap: updatedMap, messages: [...state.messages, message] };
        }),

    changeCurrentNodeVersion: (
        node: IMessageNode | string | IMessage | number,
        direction: "prev" | "next"
    ) =>
        set((state) => {
            let targetNode: IMessageNode | undefined;
            if (typeof node === "object") {
                if ("isRootNode" in node) {
                    targetNode = node as IMessageNode;
                } else {
                    const msg = node as IMessage;
                    targetNode = Object.values(state.messageNodeMap).find(
                        (n) => n.message && n.message.id === msg.id
                    );
                }
            } else {
                targetNode = state.messageNodeMap[node.toString()];
                if (!targetNode) {
                    targetNode = Object.values(state.messageNodeMap).find(
                        (n) => n.message && n.message.id === node
                    );
                }
            }
            if (!targetNode) return state;
            const parent = targetNode.parent;
            if (!parent || !parent.children || parent.children.length === 0) return state;
            const currentIndex = parent.children.findIndex((n) => n.id === targetNode!.id);
            if (currentIndex === -1) return state;
            let newIndex = parent.currentChildrenVersion ?? currentIndex;
            if (direction === "prev") {
                newIndex = Math.max(0, newIndex - 1);
            } else if (direction === "next") {
                newIndex = Math.min(parent.children.length - 1, newIndex + 1);
            }
            parent.currentChildrenVersion = newIndex;
            return { messageNodeMap: { ...state.messageNodeMap } };
        }),

    getMessageQueueFromNode: () => {
        const state = get();
        const result: IMessage[] = [];
        let currentNode = state.messageNodeMap["root"];
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

    getCurrentMessageNodeVersionInfo: (node: IMessageNode | string | IMessage | number) => {
        const state = get();
        let targetNode: IMessageNode | undefined;
        if (typeof node === "object") {
            if ("isRootNode" in node) {
                targetNode = node as IMessageNode;
            } else {
                const msg = node as IMessage;
                targetNode = Object.values(state.messageNodeMap).find(
                    (n) => n.message && n.message.id === msg.id
                );
            }
        } else {
            targetNode = state.messageNodeMap[node.toString()];
            if (!targetNode) {
                targetNode = Object.values(state.messageNodeMap).find(
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
        let currentNode = state.messageNodeMap["root"];
        while (currentNode && currentNode.children && currentNode.children.length > 0) {
            const index = currentNode.currentChildrenVersion ?? 0;
            const nextNode = currentNode.children[index];
            if (!nextNode) break;
            currentNode = nextNode;
        }
        return currentNode;
    },
}));
import { Editor } from "@tiptap/react";
import { IBranch } from "src/shared/types/Branch";
import { MODE, ModeType } from "src/shared/types/Chat";
import { IMessage } from "src/shared/types/Message";
import { create } from "zustand";
interface ChatState {
    editor: Editor | null;
    isTyping: boolean;
    currentBranch: IBranch | null;
    messages: IMessage[];
    messagesCount: number;
    showQuickSearch: boolean;
    mode: ModeType;
    disableButtons: boolean;
    isSharingActive: boolean;
    setCurrentBranch: (currentBranch: IBranch | null) => void;
    setMessages: (messages: IMessage[]) => void;
    setEditor: (editor: Editor | null) => void;
    setTyping: (isTyping: boolean) => void;
    setMessagesCount: (messagesCount: number) => void;
    setShowQuickSearch: (showQuickSearch: boolean) => void;
    setMode: (mode: ModeType) => void;
    setDisableButtons: (disableButtons: boolean) => void;
    setIsSharingActive: (isSharingActive: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
    isTyping: false,
    editor: null,
    currentBranch: null,
    messages: [],
    messagesCount: 0,
    showQuickSearch: false,
    mode: MODE.INITIAL,
    disableButtons: false,
    isSharingActive: false,
    setCurrentBranch: (currentBranch) => set(() => ({ currentBranch })),
    setMessages: (messages) => set(() => ({ messages })),
    setEditor: (editor) => set(() => ({ editor })),
    setTyping: (isTyping) => set(() => ({ isTyping })),
    setMessagesCount: (messagesCount) => set(() => ({ messagesCount })),
    setShowQuickSearch: (showQuickSearch) => set(() => ({ showQuickSearch })),
    setMode: (mode) => set(() => ({ mode })),
    setDisableButtons: (disableButtons) => set(() => ({ disableButtons })),
    setIsSharingActive: (isSharingActive) => set(() => ({ isSharingActive })),
}));

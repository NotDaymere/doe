import { Editor } from "@tiptap/react";
import { create } from "zustand";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    talkModeActive: boolean;
    linkInputActive: boolean;
    setLinkInputActive: (bool: boolean) => void;
    setGaiaActive: (bool: boolean) => void;
    setActiveEditor: (editor: Editor | null) => void;
    setTalkModeActive: (bool: boolean) => void;
    setTheme: (value: "light" | "dark") => void;
}

export const useAppStore = create<AppState>()(
    (set) => ({
        editor: null,
        gaiaActive: false,
        talkModeActive: false,
        theme: "light",
        linkInputActive: false,
        setGaiaActive: (gaiaActive) => set(() => ({ gaiaActive })),
        setTalkModeActive: (talkModeActive) => set(() => ({talkModeActive})),
        setActiveEditor: (editor) => set(() => ({ editor })),
        setTheme: (theme) => set(() => ({ theme })),
        setLinkInputActive: (bool: boolean) => set(() => ({ linkInputActive: bool })),
    })
);

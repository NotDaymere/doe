import { Editor } from "@tiptap/react";
import { create } from "zustand";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    setGaiaActive: (bool: boolean) => void;
    setActiveEditor: (editor: Editor | null) => void;
    setTheme: (value: "light" | "dark") => void;
}

export const useAppStore = create<AppState>()(
    (set) => ({
        editor: null,
        gaiaActive: false,
        theme: "light",
        setGaiaActive: (gaiaActive) => set(() => ({ gaiaActive })),
        setActiveEditor: (editor) => set(() => ({ editor })),
        setTheme: (theme) => set(() => ({ theme })),
    })
);

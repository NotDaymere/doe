import { Editor } from "@tiptap/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppState {
    editor: Editor | null;
    setActiveEditor: (editor: Editor | null) => void;
}

export const useAppStore = create<AppState>()(
    devtools(
        (set) => ({
            editor: null,
            setActiveEditor: (editor) => set(() => ({ editor })),
        }),
        {
            name: "app-storage",
        }
    )
);

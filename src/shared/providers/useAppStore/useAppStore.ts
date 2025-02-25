import { Editor } from "@tiptap/react";
import { create } from "zustand";
import { IPlayground, IPreviewPlayground } from "src/shared/types/Playground";
import { IScreenShare } from "src/shared/types/ScreenShare";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    playground: IPlayground;
    previewPlayground: IPreviewPlayground;
    shareScreen: IScreenShare;
    setGaiaActive: (bool: boolean) => void;
    setActiveEditor: (editor: Editor | null) => void;
    setTheme: (value: "light" | "dark") => void;
    setPlayground: (data: IPlayground) => void;
    setPreviewPlayground: (data: IPreviewPlayground) => void;
    setShareScreen: (shareScreen: IScreenShare) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    editor: null,
    gaiaActive: false,
    theme: "light",
    playground: {
        type: null,
        open: false,
        data: null,
        text: "",
        id: "code",
    },
    previewPlayground: {
        type: null,
        data: "",
        title: "",
    },
    shareScreen: {
        showInitialScreen: false,
    },
    setGaiaActive: (gaiaActive) => set(() => ({ gaiaActive })),
    setActiveEditor: (editor) => set(() => ({ editor })),
    setTheme: (theme) => set(() => ({ theme })),
    setPlayground: (playground) => set(() => ({ playground })),
    setPreviewPlayground: (previewPlayground) => set(() => ({ previewPlayground })),
    setShareScreen: (shareScreen) => set(() => ({ shareScreen })),
}));

import { Editor } from "@tiptap/react";
import { create } from "zustand";
import { IPlayground, IPreviewPlayground } from "src/shared/types/Playground";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    gaiaSidebarActive: boolean;
    playground: IPlayground;
    previewPlayground: IPreviewPlayground;
    activeTranslationOption: TranslationMenuOptionsType;
    setGaiaActive: (bool: boolean) => void;
    setGaiaSidebarActive: (bool: boolean) => void;
    setActiveEditor: (editor: Editor | null) => void;
    setTheme: (value: "light" | "dark") => void;
    setPlayground: (data: IPlayground) => void;
    setPreviewPlayground: (data: IPreviewPlayground) => void;
    setActiveTranslationOption: (activeTranslationOption: TranslationMenuOptionsType) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    editor: null,
    gaiaActive: false,
    gaiaSidebarActive: false,
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
    activeTranslationOption: TRANSLATION_MENU_OPTIONS.TRANSLATION,
    setGaiaActive: (gaiaActive) => set(() => ({ gaiaActive })),
    setGaiaSidebarActive: (gaiaSidebarActive) => set(() => ({ gaiaSidebarActive })),
    setActiveEditor: (editor) => set(() => ({ editor })),
    setTheme: (theme) => set(() => ({ theme })),
    setPlayground: (playground) => set(() => ({ playground })),
    setPreviewPlayground: (previewPlayground) => set(() => ({ previewPlayground })),
    setActiveTranslationOption: (activeTranslationOption) =>
        set(() => ({ activeTranslationOption })),
}));

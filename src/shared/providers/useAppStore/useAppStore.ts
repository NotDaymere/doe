import { Editor } from "@tiptap/react";
import { create } from "zustand";
import { IPlayground, IPreviewPlayground } from "src/shared/types/Playground";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import { TableSelectedAreaType } from "../../../widgets/home-screens/lib/enums/TableSelectedAreaTypeEnum";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    talkModeActive: boolean;
    linkInputActive: boolean;
    setLinkInputActive: (bool: boolean) => void;
    gaiaSidebarActive: boolean;
    playground: IPlayground;
    previewPlayground: IPreviewPlayground;
    activeTranslationOption: TranslationMenuOptionsType;
    setGaiaActive: (bool: boolean) => void;
    setGaiaSidebarActive: (bool: boolean) => void;
    setActiveEditor: (editor: Editor | null) => void;
    setTalkModeActive: (bool: boolean) => void;
    setTheme: (value: "light" | "dark") => void;
    setPlayground: (data: IPlayground) => void;
    setPreviewPlayground: (data: IPreviewPlayground) => void;
    setActiveTranslationOption: (activeTranslationOption: TranslationMenuOptionsType) => void;

    isCitationPlayground: boolean;
    citationPlaygroundRef: string | null;
    setIsCitationPlayground: (isCitationPlayground: boolean) => void;
    setCitationPlaygroundRef: (ref: string | null) => void;

    isSideBarOpen: boolean;
    setIsSideBarOpen: (isSideBarOpen: boolean) => void;

    isUploadFileChatMode: boolean;
    setIsUploadFileChatMode: (IsUploadFileChatMode: boolean) => void;

    isHyperlinkInputOpen: boolean;
    setIsHyperlinkInputOpen: (isHyperlinkInput: boolean) => void;

    isTablePromptVisible: boolean;
    selectedArea: {
        type: TableSelectedAreaType | null;
        value: string | number | null;
    };

    setIsTablePromptVisible: (visible: boolean) => void;
    setSelectedArea: (area: {
        type: TableSelectedAreaType | null;
        value: string | number | null;
    }) => void;

    isMaximized: boolean;
    setIsMaximized: (isMaximized: boolean) => void;
}

export const useAppStore = create<AppState>()((set) => {
    return {
        editor: null,
        theme: "light",
        gaiaActive: false,
        gaiaSidebarActive: false,
        talkModeActive: false,
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
        linkInputActive: false,
        isCitationPlayground: false,
        citationPlaygroundRef: null,
        activeTranslationOption: TRANSLATION_MENU_OPTIONS.TRANSLATION,
        isSideBarOpen: false,
        setIsSideBarOpen: (isSideBarOpen) => set(() => ({ isSideBarOpen })),

        setLinkInputActive: (bool: boolean) => set(() => ({ linkInputActive: bool })),
        setIsCitationPlayground: (isCitationPlayground) => set(() => ({ isCitationPlayground })),
        setCitationPlaygroundRef: (ref) => set(() => ({ citationPlaygroundRef: ref })),
        setGaiaActive: (gaiaActive) => set(() => ({ gaiaActive })),
        setGaiaSidebarActive: (gaiaSidebarActive) => set(() => ({ gaiaSidebarActive })),
        setTalkModeActive: (talkModeActive) => set(() => ({ talkModeActive })),
        setActiveEditor: (editor) => set(() => ({ editor })),
        setTheme: (theme) => set(() => ({ theme })),
        setPlayground: (playground) => set(() => ({ playground })),
        setPreviewPlayground: (previewPlayground) => set(() => ({ previewPlayground })),
        setActiveTranslationOption: (activeTranslationOption) =>
            set(() => ({ activeTranslationOption })),
        isUploadFileChatMode: false,
        setIsUploadFileChatMode: (isUploadFileChatMode) => set(() => ({ isUploadFileChatMode })),

        isHyperlinkInputOpen: false,
        setIsHyperlinkInputOpen: (isHyperlinkInputOpen) => set(() => ({ isHyperlinkInputOpen })),

        isTablePromptVisible: false,
        selectedArea: { type: null, value: null },

        setIsTablePromptVisible: (visible: boolean) =>
            set(() => ({ isTablePromptVisible: visible })),
        setSelectedArea: (area) => set(() => ({ selectedArea: area })),

        isMaximized: false,
        setIsMaximized: (isMaximized) => set(() => ({ isMaximized })),
    };
});

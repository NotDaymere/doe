import { create } from "zustand";
import { Editor } from "@tiptap/react";
import { TableSelectedAreaType } from "../../../widgets/home-screens/lib/enums/TableSelectedAreaTypeEnum";

export interface AppState {
    editor: Editor | null;
    theme: "light" | "dark";
    gaiaActive: boolean;
    talkModeActive: boolean;
    linkInputActive: boolean;

    setLinkInputActive: (bool: boolean) => void;
    setGaiaActive: (bool: boolean) => void;
    setActiveEditor: (editor: any) => void;
    setTalkModeActive: (bool: boolean) => void;
    setTheme: (value: "light" | "dark") => void;


    isCitationPlayground: boolean;
    citationPlaygroundRef: string | null;
    setIsCitationPlayground: (isCitationPlayground: boolean) => void;
    setCitationPlaygroundRef: (ref: string | null) => void;

    isSideBarOpen: boolean;
    setIsSideBarOpen: (isSideBarOpen: boolean) => void;

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



export const useAppStore = create<AppState>()((set, get) => {

    return {
        editor: null,
        theme: "light",
        gaiaActive: false,
        talkModeActive: false,
        linkInputActive: false,

        isCitationPlayground: false,
        citationPlaygroundRef: null,

        setIsCitationPlayground: (isCitationPlayground) => set(() => ({ isCitationPlayground })),
        setCitationPlaygroundRef: (ref) => set(() => ({ citationPlaygroundRef: ref })),


        isSideBarOpen: false,
        setIsSideBarOpen: (isSideBarOpen)=> set(() => ({isSideBarOpen})),

        setLinkInputActive: (bool: boolean) => set(() => ({ linkInputActive: bool })),
        setGaiaActive: (gaiaActive: boolean) => set(() => ({ gaiaActive })),
        setActiveEditor: (editor: any) => set(() => ({ editor })),
        setTalkModeActive: (talkModeActive: boolean) => set(() => ({ talkModeActive })),
        setTheme: (theme: "light" | "dark") => set(() => ({ theme })),

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
    };
});

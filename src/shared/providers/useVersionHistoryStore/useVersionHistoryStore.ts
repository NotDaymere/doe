import { create } from "zustand";

interface VersionHistoryStore {
    openHistory: boolean,
    setOpenHistory: (openHistoryAction: boolean) => void

}

export const useVersionHistoryStore = create<VersionHistoryStore>()(
    (set, get) => ({
        openHistory: false,
        setOpenHistory: (openHistoryAction) => set(() => ({ openHistory: openHistoryAction })),
    })
);
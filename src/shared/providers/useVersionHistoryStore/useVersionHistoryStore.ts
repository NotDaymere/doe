import { create } from "zustand";
import { IVersionHistory } from "src/shared/types/VersionHistory";

interface VersionHistoryStore {
    openHistory: string | null,
    setOpenHistory: (playgroundId: string | null) => void,

    historyArray: IVersionHistory[],
    getHistoryByPlaygroundId: (playgroundId: string | null) => IVersionHistory[],
    updateHistory: (history: IVersionHistory) => void,
}

export const useVersionHistoryStore = create<VersionHistoryStore>()(
    (set, get) => ({
        openHistory: null,
        setOpenHistory: (playgroundId) => set(() => ({ openHistory: playgroundId })),

        historyArray: [],

        updateHistory: (history) => set((state) => ({
            historyArray: [...state.historyArray, history],
        })),

        getHistoryByPlaygroundId: (playgroundId: string | null) => {
            return get().historyArray.filter(h => h.playgroundId === playgroundId);
        },
    })
);

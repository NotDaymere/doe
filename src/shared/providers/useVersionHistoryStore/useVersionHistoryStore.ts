import { create } from "zustand";
import { IVersionHistory } from "src/shared/types/VersionHistory";

interface VersionHistoryStore {
    openHistory: boolean,
    setOpenHistory: (openHistoryAction: boolean) => void,

    historyArray: IVersionHistory[],

    updateHistory: (history: IVersionHistory) => void,
}

export const useVersionHistoryStore = create<VersionHistoryStore>()(
    (set, get) => ({
        openHistory: false,
        setOpenHistory: (openHistoryAction) => set(() => ({ openHistory: openHistoryAction })),

        historyArray: [
            {
                id: 1,
                name: null,
                time: 'Today, 9:41 AM',
                user: 'John Doe',
                photo: '/temp/profile.jpg',
            },
            {
                id: 2,
                name: null,
                time: 'Today, 9:41 AM',
                user: 'John Doe',
                photo: '/temp/profile.jpg',
            },
            {
                id: 3,
                name: null,
                time: 'Today, 9:41 AM',
                user: 'John Doe',
                photo: '/temp/profile.jpg',
            },
            {
                id: 4,
                name: 'The graph interaction',
                time: 'Today, 9:41 AM',
                user: 'John Doe',
                photo: '/temp/profile.jpg',
            },
            {
                id: 5,
                name: null,
                time: 'Today, 9:41 AM',
                user: 'John Doe',
                photo: '/temp/profile.jpg',
            },
        ],


        updateHistory: (history) => set((state) => ({
            historyArray: state.historyArray.map(h => h.id === history.id ? history : h),
        })),
    })
);
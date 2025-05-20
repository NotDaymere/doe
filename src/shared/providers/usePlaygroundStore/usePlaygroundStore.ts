import { create } from "zustand";
import { IPlaygroundAction } from "src/shared/types/PlaygroundAction";

interface PlaygroundStore {
    playgroundAction: IPlaygroundAction | null,
    setPlaygroundAction: (playgroundAction: IPlaygroundAction | null) => void
}

export const usePlaygroundStore = create<PlaygroundStore>()(
    (set, get) => ({
        playgroundAction: null,
        setPlaygroundAction: (playgroundAction) => set(() => ({ playgroundAction })),
    })
);

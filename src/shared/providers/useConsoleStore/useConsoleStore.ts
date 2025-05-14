import { create } from "zustand";

interface ConsoleStore {
  isOpen: boolean;
  open: () => void;
  
  close: () => void;
  toggle: () => void;
}


export const useConsoleStore = create<ConsoleStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),

  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
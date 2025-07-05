import { create } from "zustand";

interface ConsoleEntry {
  id?: number;
  label?: string;
  icon?: string;
}

interface ConsoleStore {
  isOpen: boolean;
 
  consoles: ConsoleEntry[];
  activeConsoleIndex: number;

  open: () => void;
 
  close: () => void;
  toggle: () => void;

  setConsoles: (entries: ConsoleEntry[]) => void;
 
  setActiveConsoleIndex: (index: number) => void;
  addConsole: () => void;
  removeConsole: (index: number) => void;
  clearConsole: () => void;

}

export const useConsoleStore = create<ConsoleStore>()((set) => ({
  isOpen: false,
  consoles: [{}],
  activeConsoleIndex: 0,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  setConsoles: (entries) => set({ consoles: entries }),
  setActiveConsoleIndex: (index) => set({ activeConsoleIndex: index }),

  addConsole: () =>
    set((state) => {
      const newIndex = state.consoles.length;
      const newConsole: ConsoleEntry = {
  
        id: newIndex + 1,
        label: `cnsl${newIndex + 1}`,
        icon: "/img/console/consoleicon4.svg",
      };
      return {
        consoles: [...state.consoles, newConsole],
        activeConsoleIndex: newIndex,
      };
    }),

  removeConsole: (indexToRemove) =>
    set((state) => {
      const updatedConsoles = state.consoles.filter((_, index) => index !== indexToRemove);
      let newActiveIndex = state.activeConsoleIndex;

      if (indexToRemove === state.activeConsoleIndex) {
        newActiveIndex = Math.max(0, indexToRemove - 1);
      } else if (indexToRemove < state.activeConsoleIndex) {
        newActiveIndex = state.activeConsoleIndex - 1;
  
      }

      return {
        consoles: updatedConsoles,
        activeConsoleIndex: newActiveIndex,
      };
    }),

 clearConsole: () =>
  
  set(() => ({
    consoles: [{}],
    activeConsoleIndex: 0,
  })),
}));
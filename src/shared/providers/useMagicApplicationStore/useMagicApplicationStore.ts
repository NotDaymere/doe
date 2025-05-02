// src/store/useMagicMenuStore.ts
import { create } from 'zustand';

interface MagicMenuState {
  menuActive: boolean;
  
  toggleMenu: () => void;
  setMenu: (value: boolean) => void;
}


export const useMagicMenuStore = create<MagicMenuState>((set) => ({
  menuActive: false,
  toggleMenu: () => set((state) => ({ menuActive: !state.menuActive })),
  setMenu: (value) => set({ menuActive: value }),

}));

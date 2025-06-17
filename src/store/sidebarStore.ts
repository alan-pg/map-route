// src/store/sidebarStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SidebarState {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  // A função persist() envolve sua store
  persist(
    // A definição da sua store (set é a função que altera o estado)
    (set) => ({
      isCollapsed: false, // Estado inicial
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    // Opções de configuração da persistência
    {
      name: 'sidebar-storage', // Nome único para o item no localStorage
      storage: createJSONStorage(() => localStorage), // Define o localStorage como meio de persistência
    }
  )
);
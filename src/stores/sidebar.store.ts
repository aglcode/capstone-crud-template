import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  isCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));
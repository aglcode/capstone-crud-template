import { create } from "zustand";

interface LoadingState {
  loadingCount: number;
  showSpinner: () => void;
  hideSpinner: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loadingCount: 0,
  showSpinner: () => set((s) => ({ loadingCount: s.loadingCount + 1 })),
  hideSpinner: () => set((s) => ({ loadingCount: Math.max(0, s.loadingCount - 1) })),
}));

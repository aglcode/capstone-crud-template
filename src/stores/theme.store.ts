import { create } from "zustand";

export type Theme = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'vite-ui-theme';

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem(STORAGE_KEY) as Theme) || 'system',
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));
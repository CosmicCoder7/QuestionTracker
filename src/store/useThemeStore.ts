import { create } from 'zustand';
import { loadTheme, saveTheme } from '../lib/localStorage';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: loadTheme(),
  toggleTheme: () =>
    set((state) => {
      const newIsDark = !state.isDark;
      saveTheme(newIsDark);
      return { isDark: newIsDark };
    }),
}));
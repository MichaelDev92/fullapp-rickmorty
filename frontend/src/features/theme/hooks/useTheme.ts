import { useEffect } from "react";

import {
  useThemeStore,
  type ThemeMode,
  type ThemeName,
} from "../store/theme.store";

interface ThemeApi {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (t: ThemeName) => void;
  setMode: (m: ThemeMode) => void;
  toggleMode: () => void;
}

export function useTheme(): ThemeApi {
  const { theme, mode, setTheme, setMode, toggleMode } = useThemeStore();

  useEffect(() => {
    // Sync global theme attributes so CSS variables react immediately.
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-mode", mode);
  }, [theme, mode]);

  return { theme, mode, setTheme, setMode, toggleMode };
}

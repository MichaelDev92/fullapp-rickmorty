import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName = "a" | "b";
export type ThemeMode = "light" | "dark";

/**
 * Para FIJAR un solo theme y ocultar el switcher:
 *   1. Setea FIXED_THEME abajo a 'a' o 'b'.
 *   2. Setea FIXED_MODE si quieres forzar 'light' o 'dark', o déjalo en null
 *      para que solo el theme quede fijo y el modo siga siendo toggleable.
 *   3. Desmonta <ThemeSwitcher /> del header en MainLayout.tsx.
 */
export const FIXED_THEME: ThemeName | null = null;
export const FIXED_MODE: ThemeMode | null = null;

interface ThemeState {
  theme: ThemeName;
  mode: ThemeMode;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: FIXED_THEME ?? "a",
      mode: FIXED_MODE ?? "light",
      setTheme: (theme: ThemeName): void => {
        set({ theme: FIXED_THEME ?? theme });
      },
      setMode: (mode: ThemeMode): void => {
        set({ mode: FIXED_MODE ?? mode });
      },
      toggleMode: (): void => {
        set((state) => ({
          mode: FIXED_MODE ?? (state.mode === "light" ? "dark" : "light"),
        }));
      },
    }),
    { name: "rm-theme" },
  ),
);

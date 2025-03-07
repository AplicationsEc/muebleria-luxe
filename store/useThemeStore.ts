import { create } from "zustand";

// Definir los tipos del tema
type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

// Crear el store de Zustand
export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light", // Tema inicial
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

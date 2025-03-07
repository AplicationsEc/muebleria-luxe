import { useThemeStore } from "../store/useThemeStore";

export const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  // Definir los colores según el tema
  const colors = {
    background: theme === "light" ? "#ffffff" : "#121212",
    text: theme === "light" ? "#000000" : "#ffffff",
    button: theme === "light" ? "#007bff" : "#ff5722",
  };

  return { theme, toggleTheme, colors };
};

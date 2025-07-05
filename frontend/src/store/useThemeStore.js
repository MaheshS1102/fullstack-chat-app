import { create } from "zustand";

export const useThemeStore = create((set) => {
  const storedTheme = localStorage.getItem("chat-theme") || "coffee";
  document.documentElement.setAttribute("data-theme", storedTheme); // Apply on load

  return {
    theme: storedTheme,
    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme); // Apply immediately
      set({ theme });
    },
  };
});

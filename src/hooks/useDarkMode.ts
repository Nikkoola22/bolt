import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("theme") as Theme | null;
        if (saved === "light" || saved === "dark") {
          return saved;
        }
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
      } catch (e) {
        // ignore
      }
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    const metaColorScheme = document.querySelector("meta[name=\"color-scheme\"]");

    if (theme === "dark") {
      root.classList.add("dark");
      if (metaColorScheme) {
        metaColorScheme.setAttribute("content", "dark");
      }
    } else {
      root.classList.remove("dark");
      if (metaColorScheme) {
        metaColorScheme.setAttribute("content", "light");
      }
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return {
    theme,
    isDark: theme === "dark",
    setTheme,
    toggleTheme,
  };
}

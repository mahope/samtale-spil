"use client";

import { useEffect, useState, useCallback, useLayoutEffect } from "react";

export type Theme = "light" | "dark" | "system";

// Use useLayoutEffect on client, useEffect on server to avoid hydration mismatch
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** The chosen theme (light, dark or follow the system) and the resolved look; the app's settings use it too */
export function useTheme() {
  // Initialize with lazy function to read from localStorage immediately if available
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return "system";
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
  });
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted (synchronously with layout effect to avoid flash)
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Update resolved theme
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const updateTheme = () => {
      let resolved: "light" | "dark";
      if (theme === "system") {
        resolved = mediaQuery.matches ? "dark" : "light";
      } else {
        resolved = theme;
      }
      
      setIsDark(resolved === "dark");
      
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.style.colorScheme = resolved;
    };

    updateTheme();
    mediaQuery.addEventListener("change", updateTheme);
    
    return () => mediaQuery.removeEventListener("change", updateTheme);
  }, [theme, mounted]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem("theme", next);
  }, []);

  return { theme, isDark, mounted, setTheme };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, isDark, mounted, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`h-11 w-11 ${className}`} />
    );
  }

  const getIcon = () => {
    if (theme === "system") {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    if (isDark) {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  };

  const getLabel = () => {
    if (theme === "system") return "System";
    if (isDark) return "Mørk";
    return "Lys";
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
      title={`Tema: ${getLabel()}`}
      aria-label={`Skift tema (nu: ${getLabel()})`}
    >
      {getIcon()}
    </button>
  );
}

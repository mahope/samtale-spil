"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";

type Theme = "light" | "dark" | "system";

// Use useLayoutEffect on client, useEffect on server to avoid hydration mismatch
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function ThemeToggle({ className = "" }: { className?: string }) {
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

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setThemeState(next);
    localStorage.setItem("theme", next);
  }, [theme]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-white/10 dark:bg-slate-800/50 ${className}`} />
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

  // Theme-specific icon colors for better visibility
  const getIconColor = () => {
    if (theme === "system") return "text-blue-500 dark:text-blue-400";
    if (isDark) return "text-indigo-400";
    return "text-amber-500";
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`
        relative p-2.5 rounded-xl 
        bg-white/80 dark:bg-slate-800/80 
        hover:bg-white dark:hover:bg-slate-700 
        backdrop-blur-md 
        border border-slate-200/50 dark:border-slate-700/50
        shadow-sm hover:shadow-md
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent
        ${className}
      `}
      title={`Tema: ${getLabel()}`}
      aria-label={`Skift tema (nu: ${getLabel()})`}
    >
      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 bg-gradient-to-br from-violet-400/20 to-purple-400/20"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
      
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        className={`relative ${getIconColor()}`}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
}

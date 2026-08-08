"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kts-theme";

type Theme = "light" | "dark";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme =
      stored === "light"
        ? "light"
        : stored === "dark"
        ? "dark"
        : prefersLight
        ? "light"
        : "dark";

    applyTheme(initial);
    setTheme(initial);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="relative z-20 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 shadow-[0_3px_0_#111] dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 cursor-pointer pointer-events-auto touch-manipulation select-none"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 opacity-0 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={theme === "dark"}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="relative z-20 inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-zinc-900 bg-white text-zinc-900 shadow-[0_3px_0_#111] transition hover:-translate-y-0.5 active:translate-y-0 dark:border-zinc-200/40 dark:bg-[#151515] dark:text-zinc-100 cursor-pointer pointer-events-auto touch-manipulation select-none"
    >
      {theme === "dark" ? (
        <svg
          aria-hidden="true"
          className="h-5 w-5 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v2" />
          <path d="M12 19v2" />
          <path d="M4.2 4.2l1.4 1.4" />
          <path d="M18.4 18.4l1.4 1.4" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
          <path d="M4.2 19.8l1.4-1.4" />
          <path d="M18.4 5.6l1.4-1.4" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="h-5 w-5 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 14.5A8.5 8.5 0 1110 4a7 7 0 1010 10.5z" />
        </svg>
      )}
    </button>
  );
}

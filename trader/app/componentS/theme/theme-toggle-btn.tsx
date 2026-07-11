"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./themeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-gray-300
        dark:border-gray-700
        px-4
        py-2
        transition
        hover:bg-gray-100
        dark:hover:bg-slate-800
      "
    >
      {theme === "dark" ? (
        <>
          <Sun size={18} />
          Light
        </>
      ) : (
        <>
          <Moon size={18} />
          Dark
        </>
      )}
    </button>
  );
}
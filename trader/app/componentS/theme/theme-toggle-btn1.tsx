"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const dark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-gray-300
                dark:border-gray-700
                bg-gray-400
                dark:bg-slate-800
                px-4
                py-2
                text-sm
                transition
                hover:bg-gray-100
                dark:hover:bg-slate-700
            "
        >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light" : "Dark"}
        </button>
    );
}
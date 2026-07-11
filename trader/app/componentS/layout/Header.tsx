"use client";

import ThemeToggle from "@/componentS/theme/theme-toggle-btn";

export default function Header() {
    return (
        <header
            className="
                sticky top-0 z-50
                h-16
                border-b
                border-gray-200 dark:border-gray-800
                bg-white/80 dark:bg-slate-900/80
                backdrop-blur-md
                px-6
                flex
                items-center
                justify-between
            "
        >
            <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Trader Pro
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <button
                    className="
                        h-10
                        w-10
                        rounded-full
                        bg-gray-200
                        dark:bg-slate-700
                        text-gray-700
                        dark:text-white
                        hover:scale-105
                        transition
                    "
                >
                    S
                </button>
            </div>
        </header>
    );
}
"use client";

import type { IndicatorConfig } from "@/lib/market/indicators";

interface IndicatorToolbarProps {
    config: IndicatorConfig;
    onChange: (
        config: IndicatorConfig,
    ) => void;
}

export default function IndicatorToolbar({
    config,
    onChange,
}: IndicatorToolbarProps) {
    function toggleIndicator(
        indicator:
            | "sma"
            | "ema"
            | "rsi"
            | "macd"
            | "bollinger",
    ) {
        onChange({
            ...config,

            [indicator]: {
                ...config[indicator],
                enabled:
                    !config[indicator]?.enabled,
            },
        });
    }

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/70 bg-slate-50/70 px-2 py-2 dark:border-slate-800/70 dark:bg-slate-900/40">

            <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Indicators
            </span>

            <button
                type="button"
                onClick={() =>
                    toggleIndicator("sma")
                }
                className={
                    config.sma?.enabled
                        ? "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                        : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            >
                SMA {config.sma?.period}
            </button>

            <button
                type="button"
                onClick={() =>
                    toggleIndicator("ema")
                }
                className={
                    config.ema?.enabled
                        ? "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                        : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            >
                EMA {config.ema?.period}
            </button>

            <button
                type="button"
                onClick={() =>
                    toggleIndicator("bollinger")
                }
                className={
                    config.bollinger?.enabled
                        ? "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                        : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            >
                BB {config.bollinger?.period}
            </button>

            <button
                type="button"
                onClick={() =>
                    toggleIndicator("rsi")
                }
                className={
                    config.rsi?.enabled
                        ? "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                        : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            >
                RSI {config.rsi?.period}
            </button>

            <button
                type="button"
                onClick={() =>
                    toggleIndicator("macd")
                }
                className={
                    config.macd?.enabled
                        ? "rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-slate-100 dark:text-slate-900"
                        : "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                }
            >
                MACD
            </button>

        </div>
    );
}
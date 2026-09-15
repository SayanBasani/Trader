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

    function updateSMA(
        period: number,
    ) {
        onChange({
            ...config,
            sma: {
                enabled:
                    config.sma?.enabled ?? false,
                period,
            },
        });
    }

    function updateEMA(
        period: number,
    ) {
        onChange({
            ...config,
            ema: {
                enabled:
                    config.ema?.enabled ?? false,
                period,
            },
        });
    }

    function updateRSI(
        period: number,
    ) {
        onChange({
            ...config,
            rsi: {
                enabled:
                    config.rsi?.enabled ?? false,
                period,
            },
        });
    }

    function updateBollinger(
        field:
            | "period"
            | "standardDeviations",
        value: number,
    ) {
        onChange({
            ...config,
            bollinger: {
                enabled:
                    config.bollinger?.enabled ??
                    false,
                period:
                    field === "period"
                        ? value
                        : config.bollinger?.period ??
                          20,
                standardDeviations:
                    field ===
                    "standardDeviations"
                        ? value
                        : config.bollinger
                              ?.standardDeviations ??
                          2,
            },
        });
    }

    function updateMACD(
        field:
            | "fastPeriod"
            | "slowPeriod"
            | "signalPeriod",
        value: number,
    ) {
        onChange({
            ...config,
            macd: {
                enabled:
                    config.macd?.enabled ??
                    false,
                fastPeriod:
                    field === "fastPeriod"
                        ? value
                        : config.macd
                              ?.fastPeriod ??
                          12,
                slowPeriod:
                    field === "slowPeriod"
                        ? value
                        : config.macd
                              ?.slowPeriod ??
                          26,
                signalPeriod:
                    field === "signalPeriod"
                        ? value
                        : config.macd
                              ?.signalPeriod ??
                          9,
            },
        });
    }

    function numberInput(
        value: number,
        onValueChange: (
            value: number,
        ) => void,
        min = 1,
        max = 500,
    ) {
        return (
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(event) => {
                    const next =
                        Number(
                            event.target.value,
                        );

                    if (
                        Number.isFinite(
                            next,
                        ) &&
                        next >= min &&
                        next <= max
                    ) {
                        onValueChange(
                            next,
                        );
                    }
                }}
                className="h-7 w-14 rounded-md border border-slate-300 bg-white px-1.5 text-center text-xs font-medium text-slate-700 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
        );
    }

    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/70 bg-slate-50/70 px-3 py-2 dark:border-slate-800/70 dark:bg-slate-900/40">

            <span className="mr-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Indicators
            </span>

            {/* SMA */}

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950">

                <button
                    type="button"
                    onClick={() =>
                        toggleIndicator(
                            "sma",
                        )
                    }
                    className={
                        config.sma?.enabled
                            ? "text-xs font-semibold text-blue-600 dark:text-blue-400"
                            : "text-xs font-medium text-slate-500 dark:text-slate-400"
                    }
                >
                    SMA
                </button>

                {numberInput(
                    config.sma?.period ??
                        20,
                    updateSMA,
                )}

            </div>

            {/* EMA */}

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950">

                <button
                    type="button"
                    onClick={() =>
                        toggleIndicator(
                            "ema",
                        )
                    }
                    className={
                        config.ema?.enabled
                            ? "text-xs font-semibold text-blue-600 dark:text-blue-400"
                            : "text-xs font-medium text-slate-500 dark:text-slate-400"
                    }
                >
                    EMA
                </button>

                {numberInput(
                    config.ema?.period ??
                        20,
                    updateEMA,
                )}

            </div>

            {/* Bollinger Bands */}

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950">

                <button
                    type="button"
                    onClick={() =>
                        toggleIndicator(
                            "bollinger",
                        )
                    }
                    className={
                        config.bollinger
                            ?.enabled
                            ? "text-xs font-semibold text-blue-600 dark:text-blue-400"
                            : "text-xs font-medium text-slate-500 dark:text-slate-400"
                    }
                >
                    BB
                </button>

                {numberInput(
                    config.bollinger
                        ?.period ??
                        20,
                    (value) =>
                        updateBollinger(
                            "period",
                            value,
                        ),
                )}

                {numberInput(
                    config.bollinger
                        ?.standardDeviations ??
                        2,
                    (value) =>
                        updateBollinger(
                            "standardDeviations",
                            value,
                        ),
                    0.5,
                    5,
                )}

            </div>

            {/* RSI */}

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950">

                <button
                    type="button"
                    onClick={() =>
                        toggleIndicator(
                            "rsi",
                        )
                    }
                    className={
                        config.rsi?.enabled
                            ? "text-xs font-semibold text-blue-600 dark:text-blue-400"
                            : "text-xs font-medium text-slate-500 dark:text-slate-400"
                    }
                >
                    RSI
                </button>

                {numberInput(
                    config.rsi?.period ??
                        14,
                    updateRSI,
                )}

            </div>

            {/* MACD */}

            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-700 dark:bg-slate-950">

                <button
                    type="button"
                    onClick={() =>
                        toggleIndicator(
                            "macd",
                        )
                    }
                    className={
                        config.macd?.enabled
                            ? "text-xs font-semibold text-blue-600 dark:text-blue-400"
                            : "text-xs font-medium text-slate-500 dark:text-slate-400"
                    }
                >
                    MACD
                </button>

                {numberInput(
                    config.macd
                        ?.fastPeriod ??
                        12,
                    (value) =>
                        updateMACD(
                            "fastPeriod",
                            value,
                        ),
                    1,
                    100,
                )}

                {numberInput(
                    config.macd
                        ?.slowPeriod ??
                        26,
                    (value) =>
                        updateMACD(
                            "slowPeriod",
                            value,
                        ),
                    1,
                    200,
                )}

                {numberInput(
                    config.macd
                        ?.signalPeriod ??
                        9,
                    (value) =>
                        updateMACD(
                            "signalPeriod",
                            value,
                        ),
                    1,
                    100,
                )}

            </div>

        </div>
    );
}
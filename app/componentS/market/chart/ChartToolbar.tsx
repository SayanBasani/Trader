"use client";

import type {
    ChartInterval,
    ChartRange,
    ChartType,
} from "./types";

interface ChartToolbarProps {
    chartType: ChartType;
    interval: ChartInterval;
    range: ChartRange;

    onChartTypeChange: (value: ChartType) => void;
    onIntervalChange: (value: ChartInterval) => void;
    onRangeChange: (value: ChartRange) => void;

    onFitContent: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

const chartTypes: ChartType[] = [
    "candlestick",
    "line",
    "area",
    "bar",
];

const intervals: ChartInterval[] = [
    "1m",
    "3m",
    "5m",
    "10m",
    "15m",
    "30m",
    "1h",
    "4h",
    "1d",
    "1w",
    "1mo",
];

const ranges: ChartRange[] = [
    "1D",
    "5D",
    "1M",
    "3M",
    "6M",
    "1Y",
    "5Y",
    "MAX",
];

const selectClassName =
    "h-8 rounded-md border border-slate-300 bg-white px-2 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-slate-500";

const optionClassName =
    "bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100";

const buttonClassName =
    "h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";

export default function ChartToolbar({
    chartType,
    interval,
    range,
    onChartTypeChange,
    onIntervalChange,
    onRangeChange,
    onFitContent,
    onZoomIn,
    onZoomOut,
}: ChartToolbarProps) {
    return (
        <div className="flex min-w-0 flex-wrap items-center gap-2 border-b border-slate-200/70 bg-white/70 p-2 dark:border-slate-800/70 dark:bg-slate-950/50">

            <select
                value={chartType}
                onChange={(event) =>
                    onChartTypeChange(
                        event.target.value as ChartType,
                    )
                }
                className={selectClassName}
                aria-label="Chart type"
            >
                {chartTypes.map((type) => (
                    <option
                        key={type}
                        value={type}
                        className={optionClassName}
                    >
                        {type.charAt(0).toUpperCase() +
                            type.slice(1)}
                    </option>
                ))}
            </select>

            <select
                value={interval}
                onChange={(event) =>
                    onIntervalChange(
                        event.target.value as ChartInterval,
                    )
                }
                className={selectClassName}
                aria-label="Chart interval"
            >
                {intervals.map((value) => (
                    <option
                        key={value}
                        value={value}
                        className={optionClassName}
                    >
                        {value}
                    </option>
                ))}
            </select>

            <select
                value={range}
                onChange={(event) =>
                    onRangeChange(
                        event.target.value as ChartRange,
                    )
                }
                className={selectClassName}
                aria-label="Chart range"
            >
                {ranges.map((value) => (
                    <option
                        key={value}
                        value={value}
                        className={optionClassName}
                    >
                        {value}
                    </option>
                ))}
            </select>

            <div className="ml-auto flex items-center gap-1">

                <button
                    type="button"
                    onClick={onZoomOut}
                    className={buttonClassName}
                    aria-label="Zoom out"
                    title="Zoom out"
                >
                    −
                </button>

                <button
                    type="button"
                    onClick={onFitContent}
                    className={buttonClassName}
                    aria-label="Fit chart"
                    title="Fit all candles"
                >
                    Fit
                </button>

                <button
                    type="button"
                    onClick={onZoomIn}
                    className={buttonClassName}
                    aria-label="Zoom in"
                    title="Zoom in"
                >
                    +
                </button>

            </div>

        </div>
    );
}
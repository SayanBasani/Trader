"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import type {
    Candles,
} from "@/lib/market/types";

import {
    getCandles,
} from "@/lib/api/market";

interface MarketChartProps {
    symbol: string;
}

type Range = {
    label: string;
    days: number;
};

const ranges: Range[] = [
    {
        label: "1W",
        days: 7,
    },
    {
        label: "1M",
        days: 30,
    },
    {
        label: "3M",
        days: 90,
    },
    {
        label: "6M",
        days: 180,
    },
    {
        label: "1Y",
        days: 365,
    },
];

export default function MarketChart({
    symbol,
}: MarketChartProps) {

    const [candles, setCandles] =
        useState<Candles>([]);

    const [range, setRange] =
        useState("1M");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadCandles();
    }, [symbol, range]);

    async function loadCandles() {
        try {
            setLoading(true);
            setError("");

            const selectedRange =
                ranges.find(
                    (item) =>
                        item.label === range,
                ) ?? ranges[1];

            const now =
                Math.floor(
                    Date.now() / 1000,
                );

            const from =
                now -
                selectedRange.days *
                    24 *
                    60 *
                    60;

            const data =
                await getCandles(
                    symbol,
                    "D",
                    from,
                    now,
                );

            setCandles(data);
        }
        catch (error) {
            setCandles([]);

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load historical data.",
            );
        }
        finally {
            setLoading(false);
        }
    }

    const chart = useMemo(() => {

        if (!candles.length) {
            return null;
        }

        const width = 1000;
        const height = 360;

        const paddingLeft = 55;
        const paddingRight = 20;
        const paddingTop = 25;
        const paddingBottom = 35;

        const prices =
            candles.map(
                (candle) =>
                    candle.close,
            );

        const minPrice =
            Math.min(...prices);

        const maxPrice =
            Math.max(...prices);

        const range =
            maxPrice - minPrice || 1;

        const chartWidth =
            width -
            paddingLeft -
            paddingRight;

        const chartHeight =
            height -
            paddingTop -
            paddingBottom;

        const points =
            candles
                .map(
                    (candle, index) => {

                        const x =
                            paddingLeft +
                            (index /
                                Math.max(
                                    candles.length -
                                        1,
                                    1,
                                )) *
                                chartWidth;

                        const y =
                            paddingTop +
                            (1 -
                                (candle.close -
                                    minPrice) /
                                    range) *
                                chartHeight;

                        return {
                            x,
                            y,
                        };
                    },
                );

        const path =
            points
                .map(
                    (point, index) =>
                        `${
                            index === 0
                                ? "M"
                                : "L"
                        } ${point.x} ${point.y}`,
                )
                .join(" ");

        const areaPath = `
            ${path}
            L ${points.at(-1)?.x ?? 0} ${height - paddingBottom}
            L ${points[0]?.x ?? 0} ${height - paddingBottom}
            Z
        `;

        const first =
            candles[0];

        const last =
            candles.at(-1);

        const change =
            last && first
                ? last.close -
                  first.close
                : 0;

        const changePercent =
            first?.close
                ? (change /
                      first.close) *
                  100
                : 0;

        return {
            path,
            areaPath,
            minPrice,
            maxPrice,
            change,
            changePercent,
        };

    }, [candles]);

    return (
        <section
            className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm

                dark:border-slate-700
                dark:bg-[#162033]
            "
        >

            <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">

                <div>

                    <div className="flex items-center gap-3">

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            {symbol}
                        </h2>

                        {chart && (

                            <span
                                className={
                                    chart.changePercent >=
                                    0
                                        ? "rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600 dark:bg-green-950/30 dark:text-green-400"
                                        : "rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                }
                            >
                                {chart.changePercent >=
                                0
                                    ? "+"
                                    : ""}
                                {chart.changePercent.toFixed(
                                    2,
                                )}
                                %
                            </span>

                        )}

                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Historical price
                    </p>

                </div>

                <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-slate-900">

                    {ranges.map(
                        (item) => (

                            <button
                                key={item.label}
                                type="button"
                                onClick={() =>
                                    setRange(
                                        item.label,
                                    )
                                }
                                className={
                                    range ===
                                    item.label
                                        ? "rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm dark:bg-slate-700 dark:text-white"
                                        : "rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 transition hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
                                }
                            >
                                {item.label}
                            </button>

                        ),
                    )}

                </div>

            </div>

            <div className="px-4 py-5 sm:px-6">

                {loading && (

                    <div className="flex h-\[360px\] items-center justify-center">

                        <div className="text-center">

                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-400" />

                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                Loading {symbol} market data...
                            </p>

                        </div>

                    </div>

                )}

                {error && (

                    <div className="flex h-\[360px\] items-center justify-center">

                        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center dark:border-red-900/50 dark:bg-red-950/20">

                            <p className="font-semibold text-red-600 dark:text-red-400">
                                Unable to load chart
                            </p>

                            <p className="mt-1 text-sm text-red-500 dark:text-red-400/80">
                                {error}
                            </p>

                        </div>

                    </div>

                )}

                {!loading &&
                    !error &&
                    !chart && (

                        <div className="flex h-\[360px\] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                            No historical data available.
                        </div>

                    )}

                {!loading &&
                    !error &&
                    chart && (

                        <div className="w-full overflow-x-auto">

                            <svg
                                viewBox="0 0 1000 360"
                                className="h-\[360px\] min-w-\[720px\] w-full"
                                preserveAspectRatio="none"
                            >

                                <line
                                    x1="55"
                                    y1="25"
                                    x2="980"
                                    y2="25"
                                    stroke="currentColor"
                                    className="text-gray-100 dark:text-slate-800"
                                />

                                <line
                                    x1="55"
                                    y1="135"
                                    x2="980"
                                    y2="135"
                                    stroke="currentColor"
                                    className="text-gray-100 dark:text-slate-800"
                                />

                                <line
                                    x1="55"
                                    y1="245"
                                    x2="980"
                                    y2="245"
                                    stroke="currentColor"
                                    className="text-gray-100 dark:text-slate-800"
                                />

                                <line
                                    x1="55"
                                    y1="325"
                                    x2="980"
                                    y2="325"
                                    stroke="currentColor"
                                    className="text-gray-200 dark:text-slate-700"
                                />

                                <text
                                    x="8"
                                    y="30"
                                    className="fill-gray-400 text-[12px] dark:fill-slate-500"
                                >
                                    ${chart.maxPrice.toFixed(
                                        0,
                                    )}
                                </text>

                                <text
                                    x="8"
                                    y="250"
                                    className="fill-gray-400 text-[12px] dark:fill-slate-500"
                                >
                                    ${chart.minPrice.toFixed(
                                        0,
                                    )}
                                </text>

                                <path
                                    d={chart.areaPath}
                                    className="fill-blue-500/5"
                                />

                                <path
                                    d={chart.path}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-500"
                                />

                            </svg>

                        </div>

                    )}

                {chart && !loading && (

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm dark:border-slate-700">

                        <div className="flex gap-5">

                            <div>

                                <span className="text-gray-400 dark:text-slate-500">
                                    Low
                                </span>

                                <p className="font-semibold text-gray-900 dark:text-white">
                                    ${chart.minPrice.toFixed(
                                        2,
                                    )}
                                </p>

                            </div>

                            <div>

                                <span className="text-gray-400 dark:text-slate-500">
                                    High
                                </span>

                                <p className="font-semibold text-gray-900 dark:text-white">
                                    ${chart.maxPrice.toFixed(
                                        2,
                                    )}
                                </p>

                            </div>

                        </div>

                        <span
                            className={
                                chart.change >=
                                0
                                    ? "font-semibold text-green-500"
                                    : "font-semibold text-red-500"
                            }
                        >
                            {chart.change >=
                            0
                                ? "+"
                                : ""}
                            {chart.change.toFixed(
                                2,
                            )}
                            {" "}
                            since period start
                        </span>

                    </div>

                )}

            </div>

        </section>
    );
}
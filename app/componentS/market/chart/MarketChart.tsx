"use client";
import IndicatorLegend from "./IndicatorLegend";
import {
    calculateIndicators,
} from "@/lib/market/indicators";

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import {
    ColorType,
    createChart,
    CrosshairMode,
    CandlestickSeries,
    LineSeries,
    AreaSeries,
    BarSeries,
    HistogramSeries,
    type IChartApi,
    type MouseEventParams,
    type Time,
} from "lightweight-charts";

import type { Candle } from "@/lib/market/types";
import { useMarketCandles } from "./useMarketCandles";
import type {
    ChartInterval,
    ChartRange,
    ChartType,
} from "./types";
import type {
    IndicatorConfig,
} from "@/lib/market/indicators";

export interface MarketChartHandle {
    fitContent: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
}

interface MarketChartProps {
    symbol?: string;
    candles?: Candle[];
    chartType?: ChartType;
    interval?: ChartInterval;
    range?: ChartRange;
    height?: number;
    indicatorConfig?: IndicatorConfig;
}

function getResolution(
    interval: ChartInterval,
): string {
    return interval;
}

function getRangeDays(
    range: ChartRange,
): number {
    switch (range) {
        case "1D":
            return 1;

        case "5D":
            return 5;

        case "1M":
            return 30;

        case "3M":
            return 90;

        case "6M":
            return 180;

        case "1Y":
            return 365;

        case "5Y":
            return 1825;

        case "MAX":
            return 3650;

        default:
            return 30;
    }
}

interface CrosshairData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const MarketChart = forwardRef<
    MarketChartHandle,
    MarketChartProps
>(
    function MarketChart(
        {
            symbol,
            candles: providedCandles,
            chartType = "candlestick",
            interval = "5m",
            range = "1M",
            height = 500,
            indicatorConfig,
        },
        ref,
    ) {
        const containerRef =
            useRef<HTMLDivElement | null>(null);

        const chartRef =
            useRef<IChartApi | null>(null);

        const [crosshairData, setCrosshairData] =
            useState<CrosshairData | null>(null);

        useImperativeHandle(ref, () => ({
            fitContent() {
                chartRef.current
                    ?.timeScale()
                    .fitContent();
            },

            zoomIn() {
                const chart =
                    chartRef.current;

                if (!chart) {
                    return;
                }

                const timeScale =
                    chart.timeScale();

                const logicalRange =
                    timeScale.getVisibleLogicalRange();

                if (!logicalRange) {
                    return;
                }

                const center =
                    (
                        logicalRange.from +
                        logicalRange.to
                    ) / 2;

                const halfRange =
                    (
                        logicalRange.to -
                        logicalRange.from
                    ) / 2;

                const newHalfRange =
                    halfRange * 0.8;

                timeScale.setVisibleLogicalRange({
                    from:
                        center -
                        newHalfRange,

                    to:
                        center +
                        newHalfRange,
                });
            },

            zoomOut() {
                const chart =
                    chartRef.current;

                if (!chart) {
                    return;
                }

                const timeScale =
                    chart.timeScale();

                const logicalRange =
                    timeScale.getVisibleLogicalRange();

                if (!logicalRange) {
                    return;
                }

                const center =
                    (
                        logicalRange.from +
                        logicalRange.to
                    ) / 2;

                const halfRange =
                    (
                        logicalRange.to -
                        logicalRange.from
                    ) / 2;

                const newHalfRange =
                    halfRange * 1.25;

                timeScale.setVisibleLogicalRange({
                    from:
                        center -
                        newHalfRange,

                    to:
                        center +
                        newHalfRange,
                });
            },
        }));

        const {
            candles: fetchedCandles,
            loading,
            error,
        } = useMarketCandles({
            symbol: symbol ?? "",
            resolution:
                getResolution(interval),
            days:
                getRangeDays(range),
        });

        const candles =
            symbol
                ? fetchedCandles
                : (providedCandles ?? []);

        const indicators =
            calculateIndicators(
                candles,
                indicatorConfig,
            );

        useEffect(() => {
            if (!containerRef.current) {
                return;
            }

            const container =
                containerRef.current;

            const chart =
                createChart(
                    container,
                    {
                        width:
                            container.clientWidth,

                        height,

                        layout: {
                            background: {
                                type:
                                    ColorType.Solid,

                                color:
                                    "transparent",
                            },

                            textColor:
                                "#9ca3af",

                            panes: {
                                separatorColor:
                                    "rgba(156, 163, 175, 0.15)",

                                separatorHoverColor:
                                    "rgba(156, 163, 175, 0.25)",

                                enableResize:
                                    true,
                            },
                        },

                        grid: {
                            vertLines: {
                                color:
                                    "rgba(156, 163, 175, 0.08)",
                            },

                            horzLines: {
                                color:
                                    "rgba(156, 163, 175, 0.08)",
                            },
                        },

                        crosshair: {
                            mode:
                                CrosshairMode.Normal,
                        },

                        rightPriceScale: {
                            borderVisible:
                                false,
                        },

                        timeScale: {
                            borderVisible:
                                false,

                            timeVisible:
                                true,

                            secondsVisible:
                                false,
                        },
                    },
                );

            chartRef.current = chart;

            /*
             * MAIN PRICE SERIES
             */

            let series;

            if (
                chartType ===
                "candlestick"
            ) {
                series =
                    chart.addSeries(
                        CandlestickSeries,
                        {
                            upColor:
                                "#26a69a",

                            downColor:
                                "#ef5350",

                            borderVisible:
                                false,

                            wickUpColor:
                                "#26a69a",

                            wickDownColor:
                                "#ef5350",
                        },
                    );

                series.setData(
                    candles.map(
                        (candle) => ({
                            time:
                                candle.time as Time,

                            open:
                                candle.open,

                            high:
                                candle.high,

                            low:
                                candle.low,

                            close:
                                candle.close,
                        }),
                    ),
                );
            } else if (
                chartType === "line"
            ) {
                series =
                    chart.addSeries(
                        LineSeries,
                        {
                            lineWidth:
                                2,
                        },
                    );

                series.setData(
                    candles.map(
                        (candle) => ({
                            time:
                                candle.time as Time,

                            value:
                                candle.close,
                        }),
                    ),
                );
            } else if (
                chartType === "area"
            ) {
                series =
                    chart.addSeries(
                        AreaSeries,
                        {
                            lineWidth:
                                2,

                            topColor:
                                "rgba(59, 130, 246, 0.35)",

                            bottomColor:
                                "rgba(59, 130, 246, 0.02)",
                        },
                    );

                series.setData(
                    candles.map(
                        (candle) => ({
                            time:
                                candle.time as Time,

                            value:
                                candle.close,
                        }),
                    ),
                );
            } else {
                series =
                    chart.addSeries(
                        BarSeries,
                        {
                            upColor:
                                "#26a69a",

                            downColor:
                                "#ef5350",
                        },
                    );

                series.setData(
                    candles.map(
                        (candle) => ({
                            time:
                                candle.time as Time,

                            open:
                                candle.open,

                            high:
                                candle.high,

                            low:
                                candle.low,

                            close:
                                candle.close,
                        }),
                    ),
                );
            }

            /*
             * SMA
             */

            if (
                indicators.sma.length > 0
            ) {
                const smaSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#f59e0b",

                            lineWidth:
                                2,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                true,
                        },
                    );

                smaSeries.setData(
                    indicators.sma.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.value,
                        }),
                    ),
                );
            }

            /*
             * EMA
             */

            if (
                indicators.ema.length > 0
            ) {
                const emaSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#8b5cf6",

                            lineWidth:
                                2,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                true,
                        },
                    );

                emaSeries.setData(
                    indicators.ema.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.value,
                        }),
                    ),
                );
            }

            /*
             * BOLLINGER BANDS
             */

            if (
                indicators.bollinger.length > 0
            ) {
                const upperSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#06b6d4",

                            lineWidth:
                                1,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                false,
                        },
                    );

                const middleSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#64748b",

                            lineWidth:
                                1,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                false,
                        },
                    );

                const lowerSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#06b6d4",

                            lineWidth:
                                1,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                false,
                        },
                    );

                upperSeries.setData(
                    indicators.bollinger.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.upper,
                        }),
                    ),
                );

                middleSeries.setData(
                    indicators.bollinger.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.middle,
                        }),
                    ),
                );

                lowerSeries.setData(
                    indicators.bollinger.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.lower,
                        }),
                    ),
                );
            }

            /*
             * CURRENT PRICE LINE
             */

            if (
                candles.length > 0
            ) {
                const lastCandle =
                    candles[
                        candles.length - 1
                    ];

                series.createPriceLine({
                    price:
                        lastCandle.close,

                    color:
                        lastCandle.close >=
                        lastCandle.open
                            ? "#22c55e"
                            : "#ef4444",

                    lineWidth:
                        1,

                    lineStyle:
                        2,

                    axisLabelVisible:
                        true,

                    title:
                        "",
                });
            }

            /*
             * VOLUME
             */

            const volumeSeries =
                chart.addSeries(
                    HistogramSeries,
                    {
                        priceFormat: {
                            type:
                                "volume",
                        },

                        priceScaleId:
                            "volume",

                        lastValueVisible:
                            false,

                        priceLineVisible:
                            false,
                    },
                );

            volumeSeries
                .priceScale()
                .applyOptions({
                    scaleMargins: {
                        top:
                            0.75,

                        bottom:
                            0,
                    },
                });

            volumeSeries.setData(
                candles.map(
                    (candle) => ({
                        time:
                            candle.time as Time,

                        value:
                            candle.volume ?? 0,

                        color:
                            candle.close >=
                            candle.open
                                ? "rgba(34, 197, 94, 0.35)"
                                : "rgba(239, 68, 68, 0.35)",
                    }),
                ),
            );

            /*
             * RSI PANE
             */

            const hasRSI =
                indicators.rsi.length > 0;

            const hasMACD =
                indicators.macd.length > 0;

            let macdPaneIndex = 1;

            if (hasRSI) {
                const rsiSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#22c55e",

                            lineWidth:
                                2,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                true,

                        },
                        1,
                    );

                rsiSeries.setData(
                    indicators.rsi.map(
                        (point) => ({
                            time:
                                point.time as Time,

                            value:
                                point.value,
                        }),
                    ),
                );

                rsiSeries
                    .priceScale()
                    .applyOptions({
                        scaleMargins: {
                            top:
                                0.1,

                            bottom:
                                0.1,
                        },
                    });

                rsiSeries.createPriceLine({
                    price:
                        70,

                    color:
                        "#ef4444",

                    lineWidth:
                        1,

                    lineStyle:
                        2,

                    axisLabelVisible:
                        false,

                    title:
                        "70",
                });

                rsiSeries.createPriceLine({
                    price:
                        30,

                    color:
                        "#3b82f6",

                    lineWidth:
                        1,

                    lineStyle:
                        2,

                    axisLabelVisible:
                        false,

                    title:
                        "30",
                });

                macdPaneIndex = 2;

                const rsiPane =
                    chart.panes()[1];

                rsiPane?.setHeight(
                    120,
                );
            }

            /*
             * MACD PANE
             */

            if (hasMACD) {
                const macdLineSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#3b82f6",

                            lineWidth:
                                2,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                true,
                        },
                        macdPaneIndex,
                    );

                macdLineSeries.setData(
                    indicators.macd
                        .map(
                            (point) => ({
                                time:
                                    point.time as Time,

                                value:
                                    point.macd,
                            }),
                        ),
                );

                const signalData =
                    indicators.macd
                        .filter(
                            (point) =>
                                point.signal !==
                                null,
                        )
                        .map(
                            (point) => ({
                                time:
                                    point.time as Time,

                                value:
                                    point.signal!,
                            }),
                        );

                const signalSeries =
                    chart.addSeries(
                        LineSeries,
                        {
                            color:
                                "#f59e0b",

                            lineWidth:
                                2,

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                true,
                        },
                        macdPaneIndex,
                    );

                signalSeries.setData(
                    signalData,
                );

                const histogramSeries =
                    chart.addSeries(
                        HistogramSeries,
                        {
                            priceFormat: {
                                type:
                                    "price",
                            },

                            priceLineVisible:
                                false,

                            lastValueVisible:
                                false,
                        },
                        macdPaneIndex,
                    );

                histogramSeries.setData(
                    indicators.macd
                        .filter(
                            (point) =>
                                point.histogram !==
                                null,
                        )
                        .map(
                            (point) => ({
                                time:
                                    point.time as Time,

                                value:
                                    point.histogram!,

                                color:
                                    point.histogram! >=
                                    0
                                        ? "rgba(34, 197, 94, 0.65)"
                                        : "rgba(239, 68, 68, 0.65)",
                            }),
                        ),
                );

                const macdPane =
                    chart.panes()[
                        macdPaneIndex
                    ];

                macdPane?.setHeight(
                    140,
                );
            }

            /*
             * CROSSHAIR
             */

            const candleMap =
                new Map(
                    candles.map(
                        (candle) => [
                            candle.time,
                            candle,
                        ],
                    ),
                );

            const handleCrosshairMove =
                (
                    param: MouseEventParams<Time>,
                ) => {
                    if (!param.time) {
                        setCrosshairData(
                            null,
                        );

                        return;
                    }

                    const time =
                        typeof param.time ===
                        "number"
                            ? param.time
                            : Number(param.time);

                    const candle =
                        candleMap.get(
                            time,
                        );

                    if (!candle) {
                        setCrosshairData(
                            null,
                        );

                        return;
                    }

                    setCrosshairData({
                        time:
                            candle.time,

                        open:
                            candle.open,

                        high:
                            candle.high,

                        low:
                            candle.low,

                        close:
                            candle.close,

                        volume:
                            candle.volume ?? 0,
                    });
                };

            chart.subscribeCrosshairMove(
                handleCrosshairMove,
            );

            chart.timeScale()
                .fitContent();

            /*
             * RESIZE
             */

            const resizeObserver =
                new ResizeObserver(
                    () => {
                        if (
                            !containerRef.current
                        ) {
                            return;
                        }

                        chart.resize(
                            containerRef
                                .current
                                .clientWidth,

                            height,
                        );
                    },
                );

            resizeObserver.observe(
                container,
            );

            return () => {
                resizeObserver.disconnect();

                chart.unsubscribeCrosshairMove(
                    handleCrosshairMove,
                );

                chart.remove();

                if (
                    chartRef.current ===
                    chart
                ) {
                    chartRef.current =
                        null;
                }
            };
        }, [
            candles,
            chartType,
            height,
            indicatorConfig,
        ]);

        return (
            <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{
                    minHeight:
                        height,
                }}
            >
                {crosshairData && (
                    <div className="pointer-events-none absolute left-3 top-3 z-20 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/95">
                        <div className="mb-1 font-semibold text-slate-900 dark:text-slate-100">
                            {symbol ??
                                "Market"}
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono">
                            <span className="text-slate-500 dark:text-slate-400">
                                O
                            </span>

                            <span className="text-right text-slate-900 dark:text-slate-100">
                                {crosshairData.open.toFixed(
                                    2,
                                )}
                            </span>

                            <span className="text-slate-500 dark:text-slate-400">
                                H
                            </span>

                            <span className="text-right text-slate-900 dark:text-slate-100">
                                {crosshairData.high.toFixed(
                                    2,
                                )}
                            </span>

                            <span className="text-slate-500 dark:text-slate-400">
                                L
                            </span>

                            <span className="text-right text-slate-900 dark:text-slate-100">
                                {crosshairData.low.toFixed(
                                    2,
                                )}
                            </span>

                            <span className="text-slate-500 dark:text-slate-400">
                                C
                            </span>

                            <span className="text-right font-semibold text-slate-900 dark:text-slate-100">
                                {crosshairData.close.toFixed(
                                    2,
                                )}
                            </span>

                            <span className="text-slate-500 dark:text-slate-400">
                                V
                            </span>

                            <span className="text-right text-slate-900 dark:text-slate-100">
                                {crosshairData.volume.toLocaleString()}
                            </span>

                            <div className="col-span-2 mt-1 border-t border-slate-200 pt-1 dark:border-slate-700">
                                {(() => {
                                    const change =
                                        crosshairData.close -
                                        crosshairData.open;

                                    const percentage =
                                        crosshairData.open !==
                                        0
                                            ? (
                                                  change /
                                                  crosshairData.open
                                              ) *
                                              100
                                            : 0;

                                    return (
                                        <span
                                            className={
                                                change >=
                                                0
                                                    ? "font-semibold text-emerald-600 dark:text-emerald-400"
                                                    : "font-semibold text-red-600 dark:text-red-400"
                                            }
                                        >
                                            {change >=
                                            0
                                                ? "+"
                                                : ""}

                                            {change.toFixed(
                                                2,
                                            )}

                                            {" "}

                                            (
                                            {change >=
                                            0
                                                ? "+"
                                                : ""}

                                            {percentage.toFixed(
                                                2,
                                            )}
                                            %)
                                        </span>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10">
                        <div className="text-sm text-muted-foreground">
                            Loading market data...
                        </div>
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10">
                        <div className="px-4 text-center text-sm text-red-500">
                            {error}
                        </div>
                    </div>
                )}

                <IndicatorLegend
                    results={indicators}
                />

                <div
                    ref={containerRef}
                    className="w-full overflow-hidden rounded-xl"
                    style={{
                        minHeight:
                            height,
                    }}
                />
            </div>
        );
    },
);

export default MarketChart;
"use client";

import type { IndicatorResults } from "@/lib/market/indicators";

interface IndicatorLegendProps {
    results: IndicatorResults;
}

function formatValue(
    value: number,
) {
    return Number.isFinite(value)
        ? value.toFixed(2)
        : "-";
}

export default function IndicatorLegend({
    results,
}: IndicatorLegendProps) {
    const sma =
        results.sma.length > 0
            ? results.sma[
                  results.sma.length - 1
              ]
            : null;

    const ema =
        results.ema.length > 0
            ? results.ema[
                  results.ema.length - 1
              ]
            : null;

    const rsi =
        results.rsi.length > 0
            ? results.rsi[
                  results.rsi.length - 1
              ]
            : null;

    const macd =
        results.macd.length > 0
            ? results.macd[
                  results.macd.length - 1
              ]
            : null;

    const bollinger =
        results.bollinger.length > 0
            ? results.bollinger[
                  results.bollinger.length - 1
              ]
            : null;

    const hasIndicators =
        sma ||
        ema ||
        rsi ||
        macd ||
        bollinger;

    if (!hasIndicators) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-950">

            {sma && (
                <span className="font-medium text-blue-500">
                    SMA{" "}
                    <span className="text-slate-700 dark:text-slate-200">
                        {formatValue(
                            sma.value,
                        )}
                    </span>
                </span>
            )}

            {ema && (
                <span className="font-medium text-purple-500">
                    EMA{" "}
                    <span className="text-slate-700 dark:text-slate-200">
                        {formatValue(
                            ema.value,
                        )}
                    </span>
                </span>
            )}

            {bollinger && (
                <>
                    <span className="font-medium text-cyan-500">
                        BB Upper{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {formatValue(
                                bollinger.upper,
                            )}
                        </span>
                    </span>

                    <span className="font-medium text-cyan-500">
                        BB Middle{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {formatValue(
                                bollinger.middle,
                            )}
                        </span>
                    </span>

                    <span className="font-medium text-cyan-500">
                        BB Lower{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {formatValue(
                                bollinger.lower,
                            )}
                        </span>
                    </span>
                </>
            )}

            {rsi && (
                <span className="font-medium text-orange-500">
                    RSI{" "}
                    <span className="text-slate-700 dark:text-slate-200">
                        {formatValue(
                            rsi.value,
                        )}
                    </span>
                </span>
            )}

            {macd && (
                <>
                    <span className="font-medium text-emerald-500">
                        MACD{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {formatValue(
                                macd.macd,
                            )}
                        </span>
                    </span>

                    <span className="font-medium text-red-500">
                        Signal{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {macd.signal ===
                            null
                                ? "-"
                                : formatValue(
                                      macd.signal,
                                  )}
                        </span>
                    </span>

                    <span className="font-medium text-slate-500">
                        Histogram{" "}
                        <span className="text-slate-700 dark:text-slate-200">
                            {macd.histogram ===
                            null
                                ? "-"
                                : formatValue(
                                      macd.histogram,
                                  )}
                        </span>
                    </span>
                </>
            )}

        </div>
    );
}
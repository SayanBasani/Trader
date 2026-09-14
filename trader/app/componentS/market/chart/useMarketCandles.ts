"use client";

import { useEffect, useState } from "react";
import type { Candle } from "@/lib/market/types";

interface UseMarketCandlesOptions {
    symbol: string;
    resolution: string;
    days?: number;
}

interface UseMarketCandlesResult {
    candles: Candle[];
    loading: boolean;
    error: string | null;
}

function getRange(days: number) {
    const to = Math.floor(Date.now() / 1000);
    const from = to - days * 24 * 60 * 60;

    return { from, to };
}

function isNoDataError(message: string | null): boolean {
    if (!message) return false;

    const normalized = message.toLowerCase();

    return (
        normalized.includes("no data is available") ||
        normalized.includes("no data available")
    );
}

export function useMarketCandles({
    symbol,
    resolution,
    days = 30,
}: UseMarketCandlesOptions): UseMarketCandlesResult {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!symbol) {
            setCandles([]);
            setError(null);
            return;
        }

        const controller = new AbortController();

        async function requestCandles(
            requestedDays: number,
        ): Promise<Candle[]> {
            const { from, to } = getRange(requestedDays);

            const params = new URLSearchParams({
                symbol,
                resolution,
                from: String(from),
                to: String(to),
            });

            const response = await fetch(
                `/api/market/candles?${params.toString()}`,
                {
                    method: "GET",
                    signal: controller.signal,
                },
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "Failed to load market candles",
                );
            }

            return result.data?.candles ?? result.data ?? [];
        }

        async function loadCandles() {
            try {
                setLoading(true);
                setError(null);

                try {
                    const data = await requestCandles(days);

                    if (data.length > 0) {
                        setCandles(data);
                        return;
                    }
                } catch (err) {
                    const message =
                        err instanceof Error ? err.message : null;

                    /*
                     * For a 1D intraday chart, the current 24-hour
                     * window may contain no trading session yet.
                     *
                     * Example:
                     * Sunday / holiday / before US market open.
                     *
                     * Look back a few days and use the latest
                     * available candles instead of showing an error.
                     */
                    if (
                        days !== 1 ||
                        !isNoDataError(message)
                    ) {
                        throw err;
                    }

                    const fallbackData = await requestCandles(3);

                    if (fallbackData.length > 0) {
                        setCandles(fallbackData);
                        return;
                    }

                    throw err;
                }

                setCandles([]);
            } catch (err) {
                if (
                    err instanceof DOMException &&
                    err.name === "AbortError"
                ) {
                    return;
                }

                const message =
                    err instanceof Error
                        ? err.message
                        : "Failed to load market candles";

                setError(message);
                setCandles([]);
            } finally {
                setLoading(false);
            }
        }

        loadCandles();

        return () => controller.abort();
    }, [symbol, resolution, days]);

    return {
        candles,
        loading,
        error,
    };
}
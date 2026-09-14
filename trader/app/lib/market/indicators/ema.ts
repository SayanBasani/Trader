import type { Candle } from "@/lib/market/types";
import type {
    EMAOptions,
    IndicatorPoint,
} from "./types";

export function calculateEMA(
    candles: Candle[],
    options: EMAOptions = {
        period: 20,
    },
): IndicatorPoint[] {
    const { period } = options;

    if (period <= 0 || candles.length < period) {
        return [];
    }

    const multiplier = 2 / (period + 1);

    let sum = 0;

    for (let i = 0; i < period; i++) {
        sum += candles[i].close;
    }

    let previousEMA = sum / period;

    const result: IndicatorPoint[] = [
        {
            time: candles[period - 1].time,
            value: previousEMA,
        },
    ];

    for (
        let i = period;
        i < candles.length;
        i++
    ) {
        const currentClose = candles[i].close;

        const currentEMA =
            (currentClose - previousEMA) *
                multiplier +
            previousEMA;

        result.push({
            time: candles[i].time,
            value: currentEMA,
        });

        previousEMA = currentEMA;
    }

    return result;
}
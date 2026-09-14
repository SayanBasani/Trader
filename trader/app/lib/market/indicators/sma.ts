import type { Candle } from "@/lib/market/types";
import type {
    IndicatorPoint,
    SMAOptions,
} from "./types";

export function calculateSMA(
    candles: Candle[],
    options: SMAOptions = {
        period: 20,
    },
): IndicatorPoint[] {
    const { period } = options;

    if (period <= 0 || candles.length < period) {
        return [];
    }

    const result: IndicatorPoint[] = [];

    for (let i = period - 1; i < candles.length; i++) {
        let sum = 0;

        for (
            let j = i - period + 1;
            j <= i;
            j++
        ) {
            sum += candles[j].close;
        }

        result.push({
            time: candles[i].time,
            value: sum / period,
        });
    }

    return result;
}
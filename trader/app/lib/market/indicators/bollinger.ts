import type { Candle } from "@/lib/market/types";
import type {
    BollingerOptions,
    BollingerPoint,
} from "./types";

export function calculateBollingerBands(
    candles: Candle[],
    options: BollingerOptions = {
        period: 20,
        standardDeviations: 2,
    },
): BollingerPoint[] {
    const {
        period,
        standardDeviations,
    } = options;

    if (
        period <= 0 ||
        standardDeviations <= 0 ||
        candles.length < period
    ) {
        return [];
    }

    const result: BollingerPoint[] = [];

    for (
        let i = period - 1;
        i < candles.length;
        i++
    ) {
        const values: number[] = [];

        for (
            let j = i - period + 1;
            j <= i;
            j++
        ) {
            values.push(candles[j].close);
        }

        const middle =
            values.reduce(
                (sum, value) =>
                    sum + value,
                0,
            ) / period;

        const variance =
            values.reduce(
                (sum, value) =>
                    sum +
                    Math.pow(
                        value - middle,
                        2,
                    ),
                0,
            ) / period;

        const standardDeviation =
            Math.sqrt(variance);

        result.push({
            time: candles[i].time,
            middle,
            upper:
                middle +
                standardDeviation *
                    standardDeviations,
            lower:
                middle -
                standardDeviation *
                    standardDeviations,
        });
    }

    return result;
}
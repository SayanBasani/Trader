import type { Candle } from "@/lib/market/types";
import type {
    IndicatorPoint,
    MACDOptions,
    MACDPoint,
} from "./types";

function calculateEMAValues(
    candles: Candle[],
    period: number,
): IndicatorPoint[] {
    if (
        period <= 0 ||
        candles.length < period
    ) {
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
        const currentEMA =
            (candles[i].close - previousEMA) *
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

export function calculateMACD(
    candles: Candle[],
    options: MACDOptions = {
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
    },
): MACDPoint[] {
    const {
        fastPeriod,
        slowPeriod,
        signalPeriod,
    } = options;

    if (
        fastPeriod <= 0 ||
        slowPeriod <= 0 ||
        signalPeriod <= 0 ||
        fastPeriod >= slowPeriod
    ) {
        return [];
    }

    const fastEMA = calculateEMAValues(
        candles,
        fastPeriod,
    );

    const slowEMA = calculateEMAValues(
        candles,
        slowPeriod,
    );

    if (
        fastEMA.length === 0 ||
        slowEMA.length === 0
    ) {
        return [];
    }

    const fastMap = new Map(
        fastEMA.map((point) => [
            point.time,
            point.value,
        ]),
    );

    const macdValues: IndicatorPoint[] = [];

    for (const slowPoint of slowEMA) {
        const fastValue =
            fastMap.get(slowPoint.time);

        if (fastValue === undefined) {
            continue;
        }

        macdValues.push({
            time: slowPoint.time,
            value:
                fastValue -
                slowPoint.value,
        });
    }

    if (
        macdValues.length <
        signalPeriod
    ) {
        return macdValues.map((point) => ({
            time: point.time,
            macd: point.value,
            signal: null,
            histogram: null,
        }));
    }

    const multiplier =
        2 / (signalPeriod + 1);

    let signalSum = 0;

    for (
        let i = 0;
        i < signalPeriod;
        i++
    ) {
        signalSum +=
            macdValues[i].value;
    }

    let previousSignal =
        signalSum / signalPeriod;

    return macdValues.map(
        (point, index) => {
            if (index < signalPeriod - 1) {
                return {
                    time: point.time,
                    macd: point.value,
                    signal: null,
                    histogram: null,
                };
            }

            if (
                index ===
                signalPeriod - 1
            ) {
                return {
                    time: point.time,
                    macd: point.value,
                    signal: previousSignal,
                    histogram:
                        point.value -
                        previousSignal,
                };
            }

            previousSignal =
                (point.value -
                    previousSignal) *
                    multiplier +
                previousSignal;

            return {
                time: point.time,
                macd: point.value,
                signal: previousSignal,
                histogram:
                    point.value -
                    previousSignal,
            };
        },
    );
}
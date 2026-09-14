import type { Candle } from "@/lib/market/types";
import type {
    IndicatorPoint,
    RSIOptions,
} from "./types";

export function calculateRSI(
    candles: Candle[],
    options: RSIOptions = {
        period: 14,
    },
): IndicatorPoint[] {
    const { period } = options;

    if (period <= 0 || candles.length <= period) {
        return [];
    }

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
        const change =
            candles[i].close -
            candles[i - 1].close;

        if (change >= 0) {
            gains += change;
        } else {
            losses += Math.abs(change);
        }
    }

    let averageGain = gains / period;
    let averageLoss = losses / period;

    const result: IndicatorPoint[] = [];

    function calculateRSIValue(): number {
        if (averageLoss === 0) {
            return 100;
        }

        const relativeStrength =
            averageGain / averageLoss;

        return (
            100 -
            100 /
                (1 + relativeStrength)
        );
    }

    result.push({
        time: candles[period].time,
        value: calculateRSIValue(),
    });

    for (
        let i = period + 1;
        i < candles.length;
        i++
    ) {
        const change =
            candles[i].close -
            candles[i - 1].close;

        const gain =
            change > 0 ? change : 0;

        const loss =
            change < 0
                ? Math.abs(change)
                : 0;

        averageGain =
            (averageGain * (period - 1) +
                gain) /
            period;

        averageLoss =
            (averageLoss * (period - 1) +
                loss) /
            period;

        result.push({
            time: candles[i].time,
            value: calculateRSIValue(),
        });
    }

    return result;
}
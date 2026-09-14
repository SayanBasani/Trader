import type {
    Candle,
} from "@/lib/market/types";

export function candlesToChartData(
    candles: Candle[],
) {
    return candles.map(
        (candle) => ({
            time:
                candle.time as number,

            open:
                candle.open,

            high:
                candle.high,

            low:
                candle.low,

            close:
                candle.close,
        }),
    );
}

export function candlesToVolumeData(
    candles: Candle[],
) {
    return candles.map(
        (candle) => ({
            time:
                candle.time as number,

            value:
                candle.volume,
        }),
    );
}
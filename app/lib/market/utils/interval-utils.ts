import type { Candle } from "@/lib/market/types";

export interface MarketInterval {
    resolution: string;
    bucketSeconds?: number;
    aggregate: boolean;
}

const NATIVE_INTERVALS: Record<string, MarketInterval> = {
    "1m": {
        resolution: "1",
        aggregate: false,
    },

    "5m": {
        resolution: "5",
        aggregate: false,
    },

    "15m": {
        resolution: "15",
        aggregate: false,
    },

    "30m": {
        resolution: "30",
        aggregate: false,
    },

    "1h": {
        resolution: "60",
        aggregate: false,
    },

    "4h": {
        resolution: "240",
        aggregate: false,
    },

    "1d": {
        resolution: "D",
        aggregate: false,
    },

    "1w": {
        resolution: "W",
        aggregate: false,
    },

    "1mo": {
        resolution: "M",
        aggregate: false,
    },
};

const SYNTHETIC_INTERVALS: Record<string, MarketInterval> = {
    "3m": {
        resolution: "1",
        bucketSeconds: 3 * 60,
        aggregate: true,
    },

    "10m": {
        resolution: "5",
        bucketSeconds: 10 * 60,
        aggregate: true,
    },
};

export function resolveMarketInterval(
    interval: string,
): MarketInterval {

    const normalized =
        interval
            .trim()
            .toLowerCase();

    return (
        NATIVE_INTERVALS[normalized] ??
        SYNTHETIC_INTERVALS[normalized] ??
        NATIVE_INTERVALS["5m"]
    );
}

export function aggregateCandles(
    candles: Candle[],
    bucketSeconds: number,
): Candle[] {

    if (
        candles.length === 0 ||
        bucketSeconds <= 0
    ) {
        return candles;
    }

    const sorted =
        [...candles].sort(
            (a, b) =>
                a.time - b.time,
        );

    const buckets =
        new Map<number, Candle[]>();

    for (const candle of sorted) {

        const bucketStart =
            Math.floor(
                candle.time /
                    bucketSeconds,
            ) * bucketSeconds;

        const bucket =
            buckets.get(
                bucketStart,
            );

        if (bucket) {
            bucket.push(candle);
        } else {
            buckets.set(
                bucketStart,
                [candle],
            );
        }
    }

    return [...buckets.entries()]
        .sort(
            ([a], [b]) =>
                a - b,
        )
        .map(
            ([time, bucket]) => {

                const first =
                    bucket[0];

                const last =
                    bucket[
                        bucket.length - 1
                    ];

                return {
                    time,
                    open: first.open,
                    high: Math.max(
                        ...bucket.map(
                            (candle) =>
                                candle.high,
                        ),
                    ),
                    low: Math.min(
                        ...bucket.map(
                            (candle) =>
                                candle.low,
                        ),
                    ),
                    close: last.close,
                    volume:
                        bucket.reduce(
                            (
                                total,
                                candle,
                            ) =>
                                total +
                                (
                                    candle.volume ??
                                    0
                                ),
                            0,
                        ),
                };
            },
        );
}
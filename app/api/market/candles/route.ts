import {
    MarketService,
} from "@/lib/market/service";

import {
    marketError,
    marketSuccess,
} from "@/lib/market/utils/api-response";

export async function GET(
    request: Request,
) {

    try {

        const url =
            new URL(
                request.url,
            );

        const symbol =
            url.searchParams.get(
                "symbol",
            )?.trim();

        const resolution =
            url.searchParams.get(
                "resolution",
            )?.trim();

        const fromValue =
            url.searchParams.get(
                "from",
            );

        const toValue =
            url.searchParams.get(
                "to",
            );

        if (!symbol) {
            return marketError(
                "Symbol is required.",
                400,
            );
        }

        if (!resolution) {
            return marketError(
                "Resolution is required.",
                400,
            );
        }

        const from =
            Number(
                fromValue,
            );

        const to =
            Number(
                toValue,
            );

        if (
            !Number.isFinite(from) ||
            !Number.isFinite(to)
        ) {
            return marketError(
                "Valid from and to timestamps are required.",
                400,
            );
        }

        if (from >= to) {
            return marketError(
                "The from timestamp must be before the to timestamp.",
                400,
            );
        }

        const service =
            new MarketService();

        const candles =
            await service.getHistoricalCandles(
                symbol,
                resolution,
                from,
                to,
            );

        return marketSuccess(
            candles,
        );

    } catch (error) {

        console.error(
            "[API /market/candles]",
            error,
        );

        return marketError(
            error instanceof Error
                ? error.message
                : "Historical candle request failed.",
        );
    }
}
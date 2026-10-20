import { NextRequest } from "next/server";

import { MarketService } from "@/lib/market/service";

import {
    marketError,
    marketSuccess,
} from "@/lib/market/utils/api-response";

export async function GET(
    request: NextRequest,
) {
    try {
        const exchange =
            request.nextUrl.searchParams.get(
                "exchange",
            ) ?? "NASDAQ";

        const service =
            new MarketService();

        const data =
            await service.getMarketStatus(
                exchange,
            );

        return marketSuccess(
            data,
        );
    }
    catch (error) {
        console.error(
            "[API /market/status]",
            error,
        );

        return marketError(
            error instanceof Error
                ? error.message
                : "Unable to load market status.",
        );
    }
}
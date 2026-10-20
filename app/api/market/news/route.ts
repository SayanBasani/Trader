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
        const category =
            request.nextUrl.searchParams.get(
                "category",
            ) ?? undefined;

        const service =
            new MarketService();

        const data =
            await service.getMarketNews(
                category,
            );

        return marketSuccess(
            data,
        );
    }
    catch (error) {
        console.error(
            "[API /market/news]",
            error,
        );

        return marketError(
            error instanceof Error
                ? error.message
                : "Unable to load market news.",
        );
    }
}
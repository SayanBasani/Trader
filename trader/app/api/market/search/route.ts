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

        const query =
            url.searchParams.get(
                "q",
            )?.trim();

        if (!query) {
            return marketError(
                "Search query is required.",
                400,
            );
        }

        const service =
            new MarketService();

        const results =
            await service.searchStocks(
                query,
            );

        return marketSuccess(
            results,
        );

    } catch (error) {

        console.error(
            "[API /market/search]",
            error,
        );

        return marketError(
            error instanceof Error
                ? error.message
                : "Market search failed.",
        );
    }
}
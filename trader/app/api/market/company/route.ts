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

        if (!symbol) {
            return marketError(
                "Symbol is required.",
                400,
            );
        }

        const service =
            new MarketService();

        const company =
            await service.getCompany(
                symbol,
            );

        return marketSuccess(
            company,
        );

    } catch (error) {

        console.error(
            "[API /market/company]",
            error,
        );

        return marketError(
            error instanceof Error
                ? error.message
                : "Company request failed.",
        );
    }
}
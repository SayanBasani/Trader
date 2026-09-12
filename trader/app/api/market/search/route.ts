import { NextRequest, NextResponse } from "next/server";

import { MarketService } from "@/lib/market/service";

export async function GET(
    request: NextRequest,
) {
    try {
        const query =
            request.nextUrl.searchParams.get("q");

        if (!query?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Search query is required.",
                },
                {
                    status: 400,
                },
            );
        }

        const service =
            new MarketService();

        const data =
            await service.searchStocks(
                query.trim(),
            );

        return NextResponse.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(
            "Market search error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to search stocks.",
            },
            {
                status: 500,
            },
        );
    }
}
import { NextRequest, NextResponse } from "next/server";

import { MarketService } from "@/lib/market/service";

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

        return NextResponse.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(
            "Market news error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load market news.",
            },
            {
                status: 500,
            },
        );
    }
}
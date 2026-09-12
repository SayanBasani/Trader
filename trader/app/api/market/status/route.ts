import { NextRequest, NextResponse } from "next/server";

import { MarketService } from "@/lib/market/service";

export async function GET(
    request: NextRequest,
) {
    try {
        const exchange =
            request.nextUrl.searchParams.get(
                "exchange",
            ) ?? undefined;

        const service =
            new MarketService();

        const data =
            await service.getMarketStatus(
                exchange,
            );

        return NextResponse.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(
            "Market status error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load market status.",
            },
            {
                status: 500,
            },
        );
    }
}
import { NextRequest, NextResponse } from "next/server";

import { MarketService } from "@/lib/market/service";

export async function GET(
    request: NextRequest,
) {
    try {
        const symbol =
            request.nextUrl.searchParams.get(
                "symbol",
            );

        if (!symbol?.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Symbol is required.",
                },
                {
                    status: 400,
                },
            );
        }

        const service =
            new MarketService();

        const data =
            await service.getCompany(
                symbol.trim().toUpperCase(),
            );

        return NextResponse.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(
            "Market company error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load company information.",
            },
            {
                status: 500,
            },
        );
    }
}
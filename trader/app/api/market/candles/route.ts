import { NextRequest, NextResponse } from "next/server";

import { MarketService } from "@/lib/market/service";

export async function GET(
    request: NextRequest,
) {
    try {
        const params = request.nextUrl.searchParams;

        const symbol = params.get("symbol");

        const resolution = params.get("resolution");

        const from = Number(params.get("from"));

        const to = Number(params.get("to"));

        if (
            !symbol?.trim() ||
            !resolution ||
            !Number.isFinite(from) ||
            !Number.isFinite(to)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "symbol, resolution, from and to are required.",
                },
                {
                    status: 400,
                },
            );
        }

        const service = new MarketService();

        const data = await service.getHistoricalCandles(
                        symbol.trim().toUpperCase(),
                        resolution,
                        from,
                        to,
                    );

        return NextResponse.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(
            "Market candles error:",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load historical candles.",
            },
            {
                status: 500,
            },
        );
    }
}
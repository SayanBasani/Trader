import {
    NextResponse,
} from "next/server";

import type {
    MarketApiResponse,
} from "@/lib/market/models/market-api";

export function marketSuccess<T>(
    data: T,
): NextResponse<
    MarketApiResponse<T>
> {

    return NextResponse.json({
        success: true,
        data,
    });
}

export function marketError(
    message: string,
    status = 500,
): NextResponse<
    MarketApiResponse<never>
> {

    return NextResponse.json(
        {
            success: false,
            error: message,
        },
        {
            status,
        },
    );
}
import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";

interface RouteContext {
    params: Promise<{
        symbol: string;
    }>;
}

export async function DELETE(
    _request: Request,
    context: RouteContext,
) {
    try {
        const user = await requireUser();

        const { symbol: rawSymbol } =
            await context.params;

        const symbol =
            rawSymbol
                .trim()
                .toUpperCase();

        if (!symbol) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Stock symbol is required.",
                },
                {
                    status: 400,
                },
            );
        }

        const existing =
            await prisma.watchlistItem.findUnique({
                where: {
                    userId_symbol: {
                        userId: user.id,
                        symbol,
                    },
                },
            });

        if (!existing) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Stock is not in your watchlist.",
                },
                {
                    status: 404,
                },
            );
        }

        await prisma.watchlistItem.delete({
            where: {
                userId_symbol: {
                    userId: user.id,
                    symbol,
                },
            },
        });

        return NextResponse.json({
            success: true,
            message:
                "Stock removed from watchlist.",
        });
    } catch (error) {
        console.error(
            "[WATCHLIST_DELETE]",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to remove stock from watchlist.",
            },
            {
                status: 500,
            },
        );
    }
}
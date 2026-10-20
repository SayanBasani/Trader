import { NextRequest, NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
    try {
        const user = await requireUser();

        const watchlist =
            await prisma.watchlistItem.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: "asc",
                },
                select: {
                    symbol: true,
                    createdAt: true,
                },
            });

        return NextResponse.json({
            success: true,
            data: watchlist,
        });
    } catch (error) {
        console.error(
            "[WATCHLIST_GET]",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message: "Unable to load watchlist.",
            },
            {
                status: 401,
            },
        );
    }
}

export async function POST(
    request: NextRequest,
) {
    try {
        const user = await requireUser();

        const body =
            (await request.json()) as {
                symbol?: string;
            };

        const symbol =
            body.symbol
                ?.trim()
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

        if (
            !/^[A-Z0-9.-]{1,20}(:NSE|:BSE)?$/.test(
                symbol,
            ) &&
            !/^[A-Z0-9.-]{1,20}\/[A-Z0-9.-]{1,10}$/.test(
                symbol,
            )
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Invalid market symbol.",
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

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Stock is already in your watchlist.",
                },
                {
                    status: 409,
                },
            );
        }

        const item =
            await prisma.watchlistItem.create({
                data: {
                    userId: user.id,
                    symbol,
                },
                select: {
                    symbol: true,
                    createdAt: true,
                },
            });

        return NextResponse.json(
            {
                success: true,
                data: item,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error(
            "[WATCHLIST_POST]",
            error,
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to add stock to watchlist.",
            },
            {
                status: 500,
            },
        );
    }
}
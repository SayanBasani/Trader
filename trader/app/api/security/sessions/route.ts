import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";
import { parseUserAgent } from "@/lib/auth/session";

export async function GET() {

    try {
        const user = await requireUser();
        const sessions = await prisma.refreshToken.findMany({
            where: {
                userId: user.id,
                revokedAt: null,
            },
            orderBy: { lastUsedAt: "desc", },
            select: {
                id: true,
                deviceId: true,
                deviceName: true,
                userAgent: true,
                ipAddress: true,
                createdAt: true,
                lastUsedAt: true,
                expiresAt: true,
            },
        });
        const formattedSessions = sessions.map((session) => {
            const parsed = parseUserAgent( session.userAgent );

            return {
                id: session.id,
                browser: parsed.browser,
                os: parsed.os,
                device: parsed.device,
                deviceName:
                    session.deviceName ||
                    parsed.deviceName,
                ipAddress: session.ipAddress ?? "Unknown",
                createdAt: session.createdAt,
                lastUsedAt: session.lastUsedAt,
                expiresAt: session.expiresAt,
                isCurrent: false,
            };
        });

        return NextResponse.json({
            success: true,
            data: formattedSessions,
        });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Unable to load sessions.",
            },
            { status: 500, }
        );
    }
}
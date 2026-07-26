import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";

interface RouteContext {
    params: Promise<{
        sessionId: string;
    }>;
}

export async function DELETE(
    request: Request,
    { params }: RouteContext
) {

    try {
        const user = await requireUser();
        const { sessionId } = await params;
        const session = await prisma.refreshToken.findFirst({
            where: {
                id: sessionId,
                userId: user.id,
                revokedAt: null,
            },
        });
        if (!session) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Session not found.",
                },
                { status: 404, }
            );
        }
        await prisma.refreshToken.update({
            where: { id: sessionId, },
            data: { revokedAt: new Date(), },
        });
        return NextResponse.json({
            success: true,
            message: "Device logged out successfully.",
        });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Unable to logout device.",
            },
            { status: 500, }
        );
    }
}
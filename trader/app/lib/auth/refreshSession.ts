import { prisma } from "@/lib/db/prisma";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, } from "@/lib/auth/jwt";
import { hashToken } from "@/lib/auth/tokenHash";
import { REFRESH_TOKEN_EXPIRES_IN } from "@/lib/auth/cookies";

type RefreshSessionResult = {
    accessToken: string;
    refreshToken: string;
};

export async function refreshSession(
        refreshToken: string,
        ipAddress?: string | null 
    ): Promise<RefreshSessionResult> {

    const payload = await verifyRefreshToken(refreshToken);

    const hashedRefreshToken = hashToken(refreshToken);

    const session = await prisma.refreshToken.findUnique({
        where: {
            tokenHash: hashedRefreshToken,
        },
    });

    if (!session) {
        throw new Error("Invalid refresh token.");
    }

    if (payload.userId !== session.userId) {
        throw new Error("Invalid refresh token.");
    }

    if (session.revokedAt) {
        throw new Error("Refresh token revoked.");
    }

    if (session.expiresAt < new Date()) {
        throw new Error("Refresh token expired.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
    });

    if (!user) {
        throw new Error("User not found.");
    }

    const newAccessToken = await generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    const newRefreshToken = await generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    const newHashedRefreshToken = hashToken(newRefreshToken);

    await prisma.$transaction([
        prisma.refreshToken.update({
            where: {
                id: session.id,
            },
            data: {
                revokedAt: new Date(),
                lastUsedAt: new Date(),
            },
        }),

        prisma.refreshToken.create({
            data: {
                tokenHash: newHashedRefreshToken,
                userId: user.id,
                deviceId: session.deviceId,
                deviceName: session.deviceName,
                userAgent: session.userAgent,
                ipAddress: ipAddress ?? session.ipAddress,
                expiresAt: new Date(
                    Date.now() +
                    1000 * 60 * 60 * 24 * Number(REFRESH_TOKEN_EXPIRES_IN)
                ),
                lastUsedAt: new Date(),
            },
        }),
    ]);

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
}
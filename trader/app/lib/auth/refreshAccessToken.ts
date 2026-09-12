import { cookies } from "next/headers";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "@/lib/auth/jwt";

import { prisma } from "@/lib/db/prisma";
import { setAuthCookies } from "@/lib/auth/cookies";
import { hashToken } from "@/lib/auth/tokenHash";
import { ENV } from "@/lib/config/env";

export default async function refreshAccessToken() {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return null;
    }

    const tokenHash = hashToken(refreshToken);

    try {
        const payload = await verifyRefreshToken(refreshToken);

        const storedToken = await prisma.refreshToken.findUnique({
            where: {
                tokenHash,
            },
        });

        if (!storedToken) {
            return null;
        }

        if (storedToken.revokedAt) {
            return null;
        }

        if (storedToken.expiresAt < new Date()) {
            await prisma.refreshToken.delete({
                where: {
                    id: storedToken.id,
                },
            });

            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId,
            },
        });

        if (!user) {
            return null;
        }

        const newRefreshToken = await generateRefreshToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId: storedToken.id,
        });

        const newTokenHash = hashToken(newRefreshToken);

        await prisma.refreshToken.update({
            where: {
                id: storedToken.id,
            },
            data: {
                tokenHash: newTokenHash,
                lastUsedAt: new Date(),
                revokedAt: null,
                expiresAt: new Date(
                    Date.now() +
                        1000 *
                            60 *
                            60 *
                            24 *
                            ENV.REFRESH_TOKEN_EXPIRES_IN
                ),
            },
        });

        const accessToken = await generateAccessToken({
            userId: user.id,
            email: user.email,
            role: user.role,
            sessionId: storedToken.id,
        });

        await setAuthCookies(accessToken, newRefreshToken);

        return accessToken;
    } catch (error) {
        console.error("Refresh token error:", error);

        return null;
    }
}
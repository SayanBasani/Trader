import { SignJWT, jwtVerify } from "jose";
import { ENV } from "@/lib/config/env";
import type {
    AccessTokenPayload,
    RefreshTokenPayload,
} from "@/lib/types/jwt";

if (!ENV.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is missing in .env");
}

if (!ENV.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is missing in .env");
}

const accessSecretKey = new TextEncoder().encode(
    ENV.JWT_ACCESS_SECRET,
);

const refreshSecretKey = new TextEncoder().encode(
    ENV.JWT_REFRESH_SECRET,
);

export async function generateAccessToken(
    payload: AccessTokenPayload,
): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime(`${ENV.ACCESS_TOKEN_EXPIRES_IN}m`)
        .sign(accessSecretKey);
}

export async function generateRefreshToken(
    payload: RefreshTokenPayload,
): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256",
        })
        .setIssuedAt()
        .setExpirationTime(`${ENV.REFRESH_TOKEN_EXPIRES_IN}d`)
        .sign(refreshSecretKey);
}

export async function verifyAccessToken(
    token: string,
): Promise<AccessTokenPayload> {
    const { payload } = await jwtVerify(
        token,
        accessSecretKey,
    );

    return payload as AccessTokenPayload;
}

export async function verifyRefreshToken(
    token: string,
): Promise<RefreshTokenPayload> {
    const { payload } = await jwtVerify(
        token,
        refreshSecretKey,
    );

    return payload as RefreshTokenPayload;
}
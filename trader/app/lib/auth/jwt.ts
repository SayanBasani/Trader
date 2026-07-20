import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { ENV } from "../config/env";

if (!ENV.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is missing in .env");
}

if (!ENV.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is missing in .env");
}

const accessSecretKey = new TextEncoder().encode(ENV.JWT_ACCESS_SECRET);

const refreshSecretKey = new TextEncoder().encode(ENV.JWT_REFRESH_SECRET);

export interface JwtPayload extends JWTPayload {
    userId: string;
    email: string;
    role: string;
}

export async function generateAccessToken(payload: JwtPayload) {

    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(accessSecretKey);

}

export async function generateRefreshToken(payload: JwtPayload) {

    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(refreshSecretKey);

}

export async function verifyAccessToken(token: string) {

    const { payload } = await jwtVerify(token, accessSecretKey);

    return payload;

}

export async function verifyRefreshToken(token: string) {

    const { payload } = await jwtVerify(token, refreshSecretKey);

    return payload;

}
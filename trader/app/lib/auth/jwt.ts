import { SignJWT, jwtVerify, type JWTPayload } from "jose";
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
export const ACCESS_TOKEN_LIFETIME_MINUTES = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) ?? 15;

if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET is missing in .env");
}

if (!refreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is missing in .env");
}

const accessSecretKey = new TextEncoder().encode(accessSecret);

const refreshSecretKey = new TextEncoder().encode(refreshSecret);

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
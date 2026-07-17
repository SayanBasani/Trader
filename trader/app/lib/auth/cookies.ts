import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";

const REFRESH_TOKEN_COOKIE = "refreshToken";

export async function setAuthCookies(accessToken: string, refreshToken: string) {

    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    });

}

export async function clearAuthCookies() {

    const cookieStore = await cookies();

    cookieStore.delete(ACCESS_TOKEN_COOKIE);

    cookieStore.delete(REFRESH_TOKEN_COOKIE);

}
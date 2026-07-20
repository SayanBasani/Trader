import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, COOKIE_OPTIONS, } from "@/lib/auth/cookies";

export const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    // Skip authentication routes
    if (
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup")
    ) {
        console.log("It is not necessary for Middleware!");
        
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;

    // No access token
    if (!accessToken) {
        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const refreshUrl = new URL("/api/auth/refresh", request.url);
        refreshUrl.searchParams.set("redirect", pathname);

        return NextResponse.redirect(refreshUrl);
    }

    try {

        await jwtVerify(accessToken, secret);

        return NextResponse.next();

    }
    catch {

        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const refreshUrl = new URL("/api/auth/refresh", request.url);
        refreshUrl.searchParams.set("redirect", pathname);

        return NextResponse.redirect(refreshUrl);
    }

}

export const config = {
    matcher: [
        // "/:path*"
        "/login",
        "/home/:path*",
        "/profile/:path*",
        "/settings/:path*",
    ],
};   
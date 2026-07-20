import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ENV } from "@/lib/config/env";

export const secret = new TextEncoder().encode(ENV.JWT_ACCESS_SECRET!);

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/auth/refresh") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup")
    ) {
        console.log("It is not necessary for Middleware!");
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;

    if (accessToken) {
        try {
            await jwtVerify(accessToken,secret);
            return NextResponse.next();
        } catch { console.log("There is no Acces Token! ");
        }
    }

    const refreshToken = request.cookies.get(ENV.REFRESH_TOKEN_COOKIE)?.value;

    if(!refreshToken){ return NextResponse.redirect(new URL("/login", request.url) )};

    // const refreshUrl = new URL("/auth/refresh", request.url);

    // refreshUrl.searchParams.set("redirect", pathname);

    // return NextResponse.redirect(refreshUrl);

}

export const config = {
    matcher: [
        "/home/:path*",
        "/profile/:path*",
        "/settings/:path*",
    ],
};
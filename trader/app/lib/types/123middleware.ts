// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {

//     const accessToken = request.cookies.get("accessToken")?.value;

//     const refreshToken = request.cookies.get("refreshToken")?.value;

//     const { pathname } = request.nextUrl;

//     const authRoutes = [
//         "/login",
//         "/signup",
//         "/forgot-password",
//         "/verify-email",
//         "/otp",
//         "/reset-password",
//     ];

//     const dashboardRoutes = [
//         "/home",
//         "/profile",
//         "/settings",
//     ];

//     const isAuthRoute = authRoutes.some(route =>
//         pathname.startsWith(route)
//     );

//     const isDashboardRoute = dashboardRoutes.some(route =>
//         pathname.startsWith(route)
//     );

//     if (isDashboardRoute && !accessToken && !refreshToken) {

//         return NextResponse.redirect(new URL("/login", request.url));

//     }

//     if (isAuthRoute && (accessToken || refreshToken)) {

//         return NextResponse.redirect(new URL("/home", request.url));

//     }

//     return NextResponse.next();

// }

// export const config = {

//     matcher: [
//         "/home/:path*",
//         "/profile/:path*",
//         "/settings/:path*",
//         "/login",
//         "/signup",
//         "/forgot-password",
//         "/verify-email",
//         "/otp",
//         "/reset-password",
//     ],

// };
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//     console.log("Middleware:", request.nextUrl.pathname);
//     return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         "/home/:path*",
//         "/profile/:path*",
//         "/settings/:path*",
//     ],
// };
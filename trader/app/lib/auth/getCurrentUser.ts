import { cookies } from "next/headers";

import { prisma } from "@/lib/db/prisma";

import { verifyAccessToken } from "@/lib/auth/jwt";


export async function getUserFromAccessToken(accessToken:string){
    try {
        const payload = await verifyAccessToken(accessToken);
        const user = await prisma.user.findUnique({
            where: { id: payload.userId as string },
            include: { profile: true }
        });
        return user;
    }
    catch { return null; }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken){ return null; }
    if (accessToken) { 
        return await getUserFromAccessToken(accessToken);
        // const user = await getUserFromAccessToken(accessToken);
        // if (user) return user;
    }
    console.log("this will go to set the acces token , it can make error for this in allow for server to set cookies");
    
    // const newAccessToken = await refreshAccessToken();
    
    // if (!newAccessToken) {
    //     await clearAuthCookies();
    //     return null;
    // }
    
    // return await getUserFromAccessToken(newAccessToken);
}
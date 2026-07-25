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
        
        if (
            user?.passwordChangedAt &&
            payload.iat &&
            payload.iat * 1000 < user.passwordChangedAt.getTime()
        ) {
            return null;
        }

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
    }
}
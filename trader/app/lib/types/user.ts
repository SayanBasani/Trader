import { UserRole } from "@prisma/client";

export interface SafeUser {
    id: string;
    email: string;
    username: string;
    role: UserRole;

    profile: {
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
    } | null;
}
import { getCurrentUser } from './getCurrentUser'
import { redirect } from 'next/navigation';

export async function requireUser() {
    const user = await getCurrentUser();

    if (!user){
        redirect("/login");
    }
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        profile: user.profile
            ? {
                  firstName: user.profile.firstName,
                  lastName: user.profile.lastName,
                  avatar: user.profile.avatar,
              }
            : null,
    };
}

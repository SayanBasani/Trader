import { SafeUser } from "@/lib/types/user";
import {
    User,
    Mail,
    Phone,
    Globe,
    CalendarDays,
    ShieldCheck,
    Pencil,
} from "lucide-react";

interface AccountInformationProps {
    user: SafeUser;
}

export default function AccountInformation({
    user,
}: AccountInformationProps) {

    return (

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#162033]">

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                        Account Information

                    </h2>

                    <p className="mt-1 text-sm text-gray-500">

                        Your personal information.

                    </p>

                </div>

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">

                    <Pencil size={18} />

                    Edit

                </button>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <InfoCard
                    icon={<User size={20} />}
                    title="First Name"
                    value={user.profile?.firstName || "-"}
                />

                <InfoCard
                    icon={<User size={20} />}
                    title="Last Name"
                    value={user.profile?.lastName || "-"}
                />

                <InfoCard
                    icon={<User size={20} />}
                    title="Username"
                    value={user.username}
                />

                <InfoCard
                    icon={<Mail size={20} />}
                    title="Email"
                    value={user.email}
                />

                <InfoCard
                    icon={<Phone size={20} />}
                    title="Phone"
                    value={user.profile?.phone || "-"}
                />

                <InfoCard
                    icon={<Globe size={20} />}
                    title="Country"
                    value={user.profile?.country || "-"}
                />

                <InfoCard
                    icon={<ShieldCheck size={20} />}
                    title="Account Status"
                    value={user.status}
                />

                <InfoCard
                    icon={<CalendarDays size={20} />}
                    title="Member Since"
                    value={new Date(user.createdAt).toLocaleDateString()}
                />

            </div>

        </section>

    );

}

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

function InfoCard({
    icon,
    title,
    value,
}: InfoCardProps) {

    return (

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:shadow-md dark:border-slate-700">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

                {icon}

            </div>

            <div>

                <p className="text-sm text-gray-500">

                    {title}

                </p>

                <p className="mt-1 font-semibold text-gray-900 dark:text-white">

                    {value}

                </p>

            </div>

        </div>

    );

}
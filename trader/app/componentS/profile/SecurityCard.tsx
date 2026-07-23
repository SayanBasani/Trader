import { SafeUser } from "@/lib/types/user";
import {
    ShieldCheck,
    Lock,
    Mail,
    Smartphone,
    LogOut,
    KeyRound,
} from "lucide-react";

interface SecurityCardProps {
    user: SafeUser;
}

export default function SecurityCard({
    user,
}: SecurityCardProps) {

    return (

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#162033]">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Security

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Manage your account security and login settings.

                </p>

            </div>

            <div className="grid gap-5">

                <SecurityItem
                    icon={<Lock size={22} />}
                    title="Password"
                    description="Last changed recently"
                >

                    <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">

                        Change Password

                    </button>

                </SecurityItem>

                <SecurityItem
                    icon={<Mail size={22} />}
                    title="Email Verification"
                    description={user.emailVerified ? "Verified" : "Not Verified"}
                >

                    <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            user.emailVerified
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                    >

                        {user.emailVerified ? "Verified" : "Verify"}

                    </span>

                </SecurityItem>

                <SecurityItem
                    icon={<ShieldCheck size={22} />}
                    title="Two-Factor Authentication"
                    description="Protect your account with an extra verification step."
                >

                    <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700">

                        Enable

                    </button>

                </SecurityItem>

                <SecurityItem
                    icon={<Smartphone size={22} />}
                    title="Current Session"
                    description="Windows • Chrome • Active Now"
                >

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">

                        Active

                    </span>

                </SecurityItem>

                <SecurityItem
                    icon={<KeyRound size={22} />}
                    title="Refresh Tokens"
                    description="Manage trusted devices."

                >

                    <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700">

                        View Devices

                    </button>

                </SecurityItem>

                <SecurityItem
                    icon={<LogOut size={22} />}
                    title="Logout Other Devices"
                    description="Sign out from every device except this one."

                >

                    <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">

                        Logout All

                    </button>

                </SecurityItem>

            </div>

        </section>

    );

}

interface SecurityItemProps {

    icon: React.ReactNode;

    title: string;

    description: string;

    children: React.ReactNode;

}

function SecurityItem({

    icon,

    title,

    description,

    children,

}: SecurityItemProps) {

    return (

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 dark:border-slate-700 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

                    {icon}

                </div>

                <div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">

                        {title}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {description}

                    </p>

                </div>

            </div>

            {children}

        </div>

    );

}
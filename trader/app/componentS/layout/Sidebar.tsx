"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    User,
    ShoppingBag,
    ChartColumn,
    Settings,
} from "lucide-react";

const menu = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        name: "Orders",
        href: "/orders",
        icon: ShoppingBag,
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: ChartColumn,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
                h-screen
                transition-all
                duration-300
                border-r
                border-gray-200
                dark:border-gray-800
                bg-white
                dark:bg-slate-900
                flex
                flex-col
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Logo */}

            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">

                {!collapsed && (
                    <div>
                        <h2 className="font-bold text-xl text-gray-800 dark:text-white">
                            Trader Pro
                        </h2>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Trading Dashboard
                        </p>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="
                        rounded-lg
                        p-2
                        hover:bg-gray-100
                        dark:hover:bg-slate-800
                        transition
                    "
                >
                    {collapsed ? (
                        <ChevronRight className="text-gray-700 dark:text-white" />
                    ) : (
                        <ChevronLeft className="text-gray-700 dark:text-white" />
                    )}
                </button>
            </div>

            {/* Menu */}

            <nav className="flex-1 mt-4 px-3">

                {menu.map((item) => {

                    const Icon = item.icon;

                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                mb-2
                                flex
                                items-center
                                rounded-xl
                                px-3
                                py-3
                                transition

                                ${
                                    active
                                        ? "bg-blue-600 text-white shadow"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }
                            `}
                        >
                            <Icon size={20} />

                            {!collapsed && (
                                <span className="ml-3 font-medium">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}

            <div className="border-t border-gray-200 dark:border-gray-800 p-4">

                {!collapsed && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Version 1.0
                    </p>
                )}

            </div>
        </aside>
    );
}
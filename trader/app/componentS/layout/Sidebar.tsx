"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LayoutDashboard, ChartCandlestick, Wallet, Bell, Settings, User, Menu, ChevronLeft, ChevronRight, X, } from "lucide-react";

const menu = [
    {
        title: "Dashboard",
        href: "/home",
        icon: LayoutDashboard,
    },
    {
        title: "Market",
        href: "/market",
        icon: ChartCandlestick,
    },
    {
        title: "Portfolio",
        href: "/portfolio",
        icon: Wallet,
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];


import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}


export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {

    const pathname = usePathname();

    // const [collapsed, setCollapsed] = useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Button */}

            <button
                onClick={() => setMobileOpen(true)}
                className="
                fixed
                left-1
                top-4
                z-50
                rounded-lg
                bg-blue-600
                p-2
                text-white
                shadow-lg
                lg:hidden
                "
            >
                <ChevronRight size={22} />
            </button>

            {/* Mobile Background */}

            {mobileOpen && (

                <div
                    onClick={() => setMobileOpen(false)}
                    className="
                    fixed
                    inset-0
                    z-40
                    bg-black/50
                    lg:hidden
                    "
                />

            )}

            {/* Sidebar */}

            <aside
                className={`
                fixed
                left-0
                top-0
                z-50
                h-screen

                border-r

                border-gray-200
                dark:border-slate-700

                bg-white
                dark:bg-[#101827]

                transition-all
                duration-300

                ${collapsed ? "w-20" : "w-72"}

                ${
                    mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
                `}
            >

                {/* Logo */}

                <div
                    className="
                    flex
                    h-20
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    px-5
                    dark:border-slate-700
                    "
                >

                    {!collapsed && (

                        <div>

                            <h1
                                className="
                                text-2xl
                                font-bold
                                text-blue-600
                                "
                            >
                                Trader Pro
                            </h1>

                            <p
                                className="
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                                "
                            >
                                Trading Dashboard
                            </p>

                        </div>

                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="
                        hidden
                        rounded-lg
                        p-2
                        transition
                        hover:bg-gray-100
                        dark:hover:bg-slate-700
                        lg:block
                        "
                    >
                        {collapsed
                            ? <ChevronRight size={20}/>
                            : <ChevronLeft size={20}/>}
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className="
                        rounded-lg
                        p-2
                        lg:hidden
                        text-black
                        dark:text-white
                        "
                    >
                        <X size={20}/>
                    </button>

                </div>

                {/* Menu */}

                <nav
                    className="
                    mt-6
                    space-y-2
                    px-3
                    "
                >

                    {menu.map((item)=>{

                        const Icon=item.icon;

                        const active=pathname===item.href;

                        return(

                            <Link

                                key={item.href}

                                href={item.href}

                                className={`
                                flex
                                items-center
                                rounded-xl
                                px-4
                                py-3

                                transition-all

                                ${
                                    active
                                    ?

                                    "bg-blue-600 text-white shadow-lg"

                                    :

                                    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
                                }
                                `}
                            >

                                <Icon
                                    size={22}
                                />

                                {!collapsed&&(

                                    <span
                                        className="
                                        ml-4
                                        font-medium
                                        "
                                    >
                                        {item.title}
                                    </span>

                                )}

                            </Link>

                        );

                    })}

                </nav>

                {/* Bottom */}

                <div
                    className="
                    absolute
                    bottom-5
                    left-0
                    w-full
                    px-4
                    "
                >

                    <div
                        className="
                        rounded-xl
                        bg-gradient-to-r
                        from-blue-500
                        to-indigo-600
                        p-4
                        text-white
                        "
                    >

                        {!collapsed && (

                            <>

                                <h2
                                    className="
                                    font-semibold
                                    "
                                >
                                    Trader Pro
                                </h2>

                                <p
                                    className="
                                    mt-1
                                    text-xs
                                    text-blue-100
                                    "
                                >
                                    Trade Smarter.
                                </p>

                            </>

                        )}

                    </div>

                </div>

            </aside>

        </>
    );

}
"use client";

import ThemeToggle from "@/componentS/theme/theme-toggle-btn";
import {
  Bell,
  Search,
  User,
  ChevronDown,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
}


export default function Header({collapsed}:SidebarProps) {
  return (
    <header
      className={`
        fixed
        top-0
        right-0
        z-30

        h-20

        w-full
        ${collapsed?"lg:w-[calc(100%-5rem)]":"lg:w-[calc(100%-18rem)]"}
        border-b
        border-gray-200
        dark:border-slate-700

        bg-white/90
        dark:bg-[#101827]/90

        backdrop-blur-xl

        transition-all
      `}
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8 
          
        "
      >
        {/* Left */}

        <div className="mx-10 lg:mx-0 flex items-center gap-5">

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Dashboard
            </h1>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Welcome back 👋
            </p>
          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Search */}

          <div
            className="
              hidden
              md:flex

              items-center

              gap-3

              rounded-xl

              border

              border-gray-200
              dark:border-slate-700

              bg-gray-100
              dark:bg-slate-800

              px-4
              py-2
            "
          >
            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."

              className="
                w-48

                bg-transparent

                outline-none

                placeholder:text-gray-500
              "
            />
          </div>

          {/* Theme */}

          <ThemeToggle />

          {/* Notification */}

          <button
            className="
              relative

              rounded-xl

              border

              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              p-3

              transition

              hover:scale-105
            "
          >
            <Bell size={20} />

            <span
              className="
                absolute

                right-2
                top-2

                h-2
                w-2

                rounded-full

                bg-red-500
              "
            />
          </button>

          {/* Profile */}

          <button
            className="
              flex
              items-center
              gap-3

              rounded-xl

              border

              border-gray-200
              dark:border-slate-700

              bg-white
              dark:bg-slate-800

              px-3
              py-2

              transition

              hover:bg-gray-100
              dark:hover:bg-slate-700
            "
          >
            <div
              className="
                flex
                h-10
                w-10

                items-center
                justify-center

                rounded-full

                bg-blue-600

                text-white

                font-semibold
              "
            >
              S
            </div>

            <div className="hidden sm:block text-left">

              <p className="font-medium">
                Sayan
              </p>

              <p
                className="
                  text-xs

                  text-gray-500
                "
              >
                Premium
              </p>

            </div>

            <ChevronDown
              size={18}
              className="hidden sm:block"
            />
          </button>

        </div>
      </div>
    </header>
  );
}
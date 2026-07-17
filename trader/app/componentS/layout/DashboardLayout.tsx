"use client";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className=" min-h-screen bg-slate-100 dark:bg-[#0B1220] transition-colors duration-300 " >
      {/* Sidebar */}
      <Sidebar  collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content */}

      <div
        className={` ${collapsed ? "lg:ml-20":"lg:ml-72"} transition-all duration-300 `}
      >
        {/* Header */}

        <Header collapsed={collapsed} />

        {/* Main */}

        <main className="p-4 sm:p-6 lg:p-8 pt-24 sm:pt-24 lg:pt-24 min-h-screen ">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
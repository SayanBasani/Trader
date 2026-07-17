"use client";

import Link from "next/link";
import {
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Brain,
    ChartCandlestick,
    Menu,
} from "lucide-react";

export default function LandingPage() {

    const market = [
        {
            name: "BTC",
            price: "$118,420",
            change: "+2.84%",
            color: "text-green-500",
        },
        {
            name: "ETH",
            price: "$3,486",
            change: "+1.72%",
            color: "text-green-500",
        },
        {
            name: "AAPL",
            price: "$211.30",
            change: "-0.42%",
            color: "text-red-500",
        },
        {
            name: "TSLA",
            price: "$319.50",
            change: "+4.81%",
            color: "text-green-500",
        },
    ];

    return (

        <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-[#08111F] dark:text-white">

            {/* ========================= Navbar ========================= */}

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-xl dark:border-slate-700 dark:bg-[#08111F]/80">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

                    <Link href="/home" className="text-3xl font-bold text-blue-600">
                        Trader Pro
                    </Link>

                    <nav className="hidden items-center gap-10 lg:flex">

                        <Link href="#" className="transition hover:text-blue-600">
                            Features
                        </Link>

                        <Link href="#" className="transition hover:text-blue-600">
                            Markets
                        </Link>

                        <Link href="#" className="transition hover:text-blue-600">
                            Pricing
                        </Link>

                        <Link href="#" className="transition hover:text-blue-600">
                            About
                        </Link>

                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">

                        <Link href="/login" className="font-medium transition hover:text-blue-600">
                            Login
                        </Link>

                        <Link href="/signup" className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
                            Get Started
                        </Link>

                    </div>

                    <button className="lg:hidden">
                        <Menu size={28} />
                    </button>

                </div>

            </header>

            {/* ========================= Hero ========================= */}

            <section className="relative overflow-hidden">

                <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>

                <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">

                    {/* Left */}

                    <div>

                        <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            🚀 AI Powered Trading Platform
                        </span>

                        <h1 className="mt-8 text-5xl font-black leading-tight lg:text-7xl">
                            Trade Smarter
                            <br />
                            with
                            <span className="text-blue-600">
                                {" "}Trader Pro
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Monitor your portfolio, analyze markets,
                            receive AI-powered insights and manage every investment
                            from one beautiful dashboard.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-5">

                            <Link href="/signup" className="flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-blue-700">

                                Start Trading

                                <ArrowRight size={20} />

                            </Link>

                            <Link href="/login" className="rounded-2xl border border-gray-300 px-7 py-4 font-semibold transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800">

                                Live Demo

                            </Link>

                        </div>

                        {/* Stats */}

                        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">

                            <div>

                                <h2 className="text-4xl font-bold text-blue-600">
                                    120K+
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Active Users
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold text-blue-600">
                                    180+
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Countries
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold text-blue-600">
                                    $2.4B
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Volume
                                </p>

                            </div>

                            <div>

                                <h2 className="text-4xl font-bold text-blue-600">
                                    99.9%
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Uptime
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="relative">

                        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Portfolio
                                    </h2>

                                    <p className="mt-1 text-gray-500">
                                        Total Balance
                                    </p>

                                </div>

                                <TrendingUp size={40} className="text-green-500" />

                            </div>

                            <h3 className="mt-8 text-5xl font-bold">
                                $125,420
                            </h3>

                            <p className="mt-4 font-semibold text-green-500">
                                ▲ +8.24% This Month
                            </p>

                            <div className="mt-10 h-60 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700">

                            </div>

                        </div>

                        <div className="absolute -left-10 top-20 hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-[#162033] xl:block">

                            <p className="text-sm text-gray-500">
                                BTC
                            </p>

                            <h3 className="mt-2 text-2xl font-bold">
                                $118,420
                            </h3>

                            <p className="mt-1 text-green-500">
                                +2.84%
                            </p>

                        </div>

                        <div className="absolute -right-10 bottom-16 hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-[#162033] xl:block">

                            <p className="text-sm text-gray-500">
                                ETH
                            </p>

                            <h3 className="mt-2 text-2xl font-bold">
                                $3,486
                            </h3>

                            <p className="mt-1 text-green-500">
                                +1.72%
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================= Live Market ========================= */}

            <section className="mx-auto max-w-7xl px-6 pb-20">

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {market.map((item) => (

                        <div key={item.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="flex items-center justify-between">

                                <h2 className="text-2xl font-bold">
                                    {item.name}
                                </h2>

                                <ChartCandlestick className="text-blue-500" />

                            </div>

                            <p className="mt-6 text-3xl font-bold">
                                {item.price}
                            </p>

                            <p className={`mt-3 font-semibold ${item.color}`}>
                                {item.change}
                            </p>

                        </div>

                    ))}
                                    </div>

            </section>

            {/* ========================= Features ========================= */}

            <section className="bg-slate-50 py-24 dark:bg-[#0D1627]">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Why Choose Trader Pro
                        </span>

                        <h2 className="mt-6 text-5xl font-bold">
                            Everything You Need
                        </h2>

                        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
                            A complete trading ecosystem designed for beginners and professionals.
                        </p>

                    </div>

                    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">

                                <TrendingUp size={34} className="text-blue-600" />

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">
                                Live Market
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Watch crypto, forex and stock markets in real time.
                            </p>

                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">

                                <Brain size={34} className="text-green-600" />

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">
                                AI Prediction
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Smart insights powered by machine learning models.
                            </p>

                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-900/30">

                                <ShieldCheck size={34} className="text-purple-600" />

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">
                                Secure Platform
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Industry-grade encryption and secure authentication.
                            </p>

                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">

                                <ChartCandlestick size={34} className="text-orange-600" />

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">
                                Portfolio Analytics
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Understand every investment with beautiful analytics.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================= Dashboard Preview ========================= */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="grid items-center gap-16 lg:grid-cols-2">

                        <div>

                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                Professional Dashboard
                            </span>

                            <h2 className="mt-6 text-5xl font-bold">
                                Powerful Trading Experience
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-400">
                                Manage every investment from one beautiful dashboard.
                                Track profit, monitor markets, analyze charts and receive AI-powered insights.
                            </p>

                            <div className="mt-10 space-y-6">

                                <div className="flex items-center gap-4">

                                    <div className="h-4 w-4 rounded-full bg-green-500"></div>

                                    <span>Live Market Tracking</span>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="h-4 w-4 rounded-full bg-blue-500"></div>

                                    <span>Real-time Portfolio Updates</span>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="h-4 w-4 rounded-full bg-purple-500"></div>

                                    <span>AI Market Predictions</span>

                                </div>

                                <div className="flex items-center gap-4">

                                    <div className="h-4 w-4 rounded-full bg-orange-500"></div>

                                    <span>Advanced Technical Analysis</span>

                                </div>

                            </div>

                        </div>

                        <div>

                            <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="text-3xl font-bold">
                                            Dashboard
                                        </h3>

                                        <p className="mt-2 text-gray-500">
                                            Portfolio Overview
                                        </p>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                                        Live
                                    </span>

                                </div>

                                <div className="mt-10 h-72 rounded-3xl bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-900"></div>

                                <div className="mt-8 grid grid-cols-3 gap-5">

                                    <div className="rounded-2xl bg-slate-100 p-5 text-center dark:bg-slate-800">

                                        <h4 className="text-2xl font-bold text-green-500">
                                            +8.2%
                                        </h4>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Profit
                                        </p>

                                    </div>

                                    <div className="rounded-2xl bg-slate-100 p-5 text-center dark:bg-slate-800">

                                        <h4 className="text-2xl font-bold">
                                            24
                                        </h4>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Trades
                                        </p>

                                    </div>

                                    <div className="rounded-2xl bg-slate-100 p-5 text-center dark:bg-slate-800">

                                        <h4 className="text-2xl font-bold text-blue-600">
                                            98%
                                        </h4>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Accuracy
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
                        {/* ========================= Testimonials ========================= */}

            <section className="bg-slate-50 py-24 dark:bg-[#0D1627]">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            Testimonials
                        </span>

                        <h2 className="mt-6 text-5xl font-bold">
                            Loved by Traders
                        </h2>

                        <p className="mt-6 text-gray-500 dark:text-gray-400">
                            Thousands of investors trust Trader Pro every day.
                        </p>

                    </div>

                    <div className="mt-20 grid gap-8 lg:grid-cols-3">

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="text-3xl">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                                Trader Pro completely changed how I manage my crypto portfolio. The dashboard is beautiful and incredibly easy to use.
                            </p>

                            <div className="mt-8">

                                <h3 className="font-bold">
                                    James Walker
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Crypto Trader
                                </p>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="text-3xl">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                                The AI suggestions and portfolio analytics save me hours every week. Everything feels premium.
                            </p>

                            <div className="mt-8">

                                <h3 className="font-bold">
                                    Olivia Carter
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Investor
                                </p>

                            </div>

                        </div>

                        <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:bg-[#162033]">

                            <div className="text-3xl">
                                ⭐⭐⭐⭐⭐
                            </div>

                            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
                                One of the cleanest trading dashboards I have ever used. Fast, responsive and modern.
                            </p>

                            <div className="mt-8">

                                <h3 className="font-bold">
                                    Ethan Wilson
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Stock Trader
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================= Pricing ========================= */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            Pricing
                        </span>

                        <h2 className="mt-6 text-5xl font-bold">
                            Choose Your Plan
                        </h2>

                    </div>

                    <div className="mt-20 grid gap-8 lg:grid-cols-3">

                        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg dark:border-slate-700 dark:bg-[#162033]">

                            <h3 className="text-3xl font-bold">
                                Free
                            </h3>

                            <h2 className="mt-6 text-5xl font-black">
                                $0
                            </h2>

                            <ul className="mt-8 space-y-4 text-gray-500">

                                <li>✓ Portfolio Tracking</li>
                                <li>✓ Market Watchlist</li>
                                <li>✓ Basic Analytics</li>

                            </ul>

                            <button className="mt-10 w-full rounded-xl border border-blue-600 py-4 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
                                Start Free
                            </button>

                        </div>

                        <div className="scale-105 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white shadow-2xl">

                            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
                                MOST POPULAR
                            </span>

                            <h3 className="mt-6 text-3xl font-bold">
                                Pro
                            </h3>

                            <h2 className="mt-6 text-5xl font-black">
                                $19
                            </h2>

                            <p className="mt-2">
                                per month
                            </p>

                            <ul className="mt-8 space-y-4">

                                <li>✓ AI Predictions</li>
                                <li>✓ Unlimited Portfolio</li>
                                <li>✓ Advanced Charts</li>
                                <li>✓ Live Alerts</li>
                                <li>✓ Premium Support</li>

                            </ul>

                            <button className="mt-10 w-full rounded-xl bg-white py-4 font-semibold text-blue-700 transition hover:bg-gray-100">
                                Get Started
                            </button>

                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-lg dark:border-slate-700 dark:bg-[#162033]">

                            <h3 className="text-3xl font-bold">
                                Enterprise
                            </h3>

                            <h2 className="mt-6 text-5xl font-black">
                                Custom
                            </h2>

                            <ul className="mt-8 space-y-4 text-gray-500">

                                <li>✓ Team Dashboard</li>
                                <li>✓ API Access</li>
                                <li>✓ Dedicated Support</li>
                                <li>✓ Custom Integrations</li>

                            </ul>

                            <button className="mt-10 w-full rounded-xl border border-blue-600 py-4 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">
                                Contact Sales
                            </button>

                        </div>

                    </div>

                </div>

            </section>
                        {/* ========================= FAQ ========================= */}

            <section className="bg-slate-50 py-24 dark:bg-[#0D1627]">

                <div className="mx-auto max-w-5xl px-6">

                    <div className="text-center">

                        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            FAQ
                        </span>

                        <h2 className="mt-6 text-5xl font-bold">
                            Frequently Asked Questions
                        </h2>

                        <p className="mt-6 text-gray-500 dark:text-gray-400">
                            Everything you need to know before getting started.
                        </p>

                    </div>

                    <div className="mt-16 space-y-6">

                        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-[#162033]">

                            <h3 className="text-xl font-semibold">
                                Is Trader Pro free?
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Yes. You can start with our free plan and upgrade whenever you need more advanced features.
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-[#162033]">

                            <h3 className="text-xl font-semibold">
                                Which markets are supported?
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Crypto, Forex, Stocks, Commodities and many more.
                            </p>

                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-[#162033]">

                            <h3 className="text-xl font-semibold">
                                Is my data secure?
                            </h3>

                            <p className="mt-4 text-gray-500 dark:text-gray-400">
                                Yes. We use modern authentication, encrypted connections and industry best practices.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================= CTA ========================= */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="rounded-[40px] bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 px-10 py-20 text-center text-white shadow-2xl">

                        <h2 className="text-5xl font-black">
                            Ready to Start Trading?
                        </h2>

                        <p className="mx-auto mt-8 max-w-2xl text-xl text-blue-100">
                            Join thousands of traders using Trader Pro to manage portfolios, analyze markets and make smarter decisions.
                        </p>

                        <div className="mt-12 flex flex-wrap justify-center gap-5">

                            <Link href="/signup" className="rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:scale-105">
                                Create Free Account
                            </Link>

                            <Link href="/login" className="rounded-2xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-blue-700">
                                Login
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* ========================= Footer ========================= */}

            <footer className="border-t border-gray-200 bg-white py-16 dark:border-slate-700 dark:bg-[#08111F]">

                <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">

                    <div>

                        <h2 className="text-3xl font-bold text-blue-600">
                            Trader Pro
                        </h2>

                        <p className="mt-6 leading-8 text-gray-500 dark:text-gray-400">
                            Professional AI powered trading dashboard built for modern investors.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold">
                            Product
                        </h3>

                        <ul className="mt-6 space-y-4 text-gray-500 dark:text-gray-400">

                            <li>
                                <Link href="#">
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Markets
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Portfolio
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    AI Prediction
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold">
                            Company
                        </h3>

                        <ul className="mt-6 space-y-4 text-gray-500 dark:text-gray-400">

                            <li>
                                <Link href="#">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Careers
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Blog
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold">
                            Legal
                        </h3>

                        <ul className="mt-6 space-y-4 text-gray-500 dark:text-gray-400">

                            <li>
                                <Link href="#">
                                    Privacy Policy
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Terms of Service
                                </Link>
                            </li>

                            <li>
                                <Link href="#">
                                    Cookies
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>

                <div className="mx-auto mt-16 max-w-7xl border-t border-gray-200 pt-8 text-center text-gray-500 dark:border-slate-700 dark:text-gray-400">

                    © 2026 Trader Pro. All Rights Reserved.

                </div>

            </footer>

        </div>

    );

}
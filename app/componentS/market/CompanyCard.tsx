"use client";

import {
    useEffect,
    useState,
} from "react";

import type {
    Company,
} from "@/lib/market/types";

import {
    getCompany,
} from "@/lib/api/market";

interface CompanyCardProps {
    symbol: string;
}

export default function CompanyCard({
    symbol,
}: CompanyCardProps) {

    const [company, setCompany] =
        useState<Company | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadCompany();
    }, [symbol]);

    async function loadCompany() {
        try {
            setLoading(true);
            setError("");

            const data =
                await getCompany(
                    symbol,
                );

            setCompany(data);
        }
        catch (error) {
            setCompany(null);

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load company information.",
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section
            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-6
                shadow-sm

                dark:border-slate-700
                dark:bg-[#162033]
            "
        >

            <div className="mb-6">

                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    About {symbol}
                </h2>

            </div>

            {loading && (

                <div className="space-y-4">

                    <div className="h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                    <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                        {[
                            1,
                            2,
                            3,
                            4,
                        ].map((item) => (

                            <div
                                key={item}
                                className="h-14 animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800"
                            />

                        ))}

                    </div>

                </div>

            )}

            {error && !loading && (

                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                </div>

            )}

            {company && !loading && !error && (

                <>

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">

                            {company.logo ? (

                                <img
                                    src={company.logo}
                                    alt={`${company.name} logo`}
                                    className="h-full w-full object-contain p-2"
                                />

                            ) : (

                                company.symbol.slice(
                                    0,
                                    1,
                                )

                            )}

                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {company.name}
                                </h3>

                                <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                                    {company.symbol}
                                </span>

                            </div>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                {company.exchange}
                                {company.country
                                    ? ` · ${company.country}`
                                    : ""}
                            </p>

                        </div>

                    </div>

                    {company.description && (

                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                            {company.description}
                        </p>

                    )}

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">

                        <InfoItem
                            label="Industry"
                            value={
                                company.industry ||
                                "—"
                            }
                        />

                        <InfoItem
                            label="Sector"
                            value={
                                company.sector ||
                                "—"
                            }
                        />

                        <InfoItem
                            label="Market Cap"
                            value={formatMarketCap(
                                company.marketCap,
                            )}
                        />

                        <InfoItem
                            label="IPO Date"
                            value={
                                company.ipoDate ||
                                "—"
                            }
                        />

                    </div>

                    {company.website && (

                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                mt-5
                                inline-flex
                                items-center
                                rounded-xl
                                bg-blue-50
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-blue-600
                                transition
                                hover:bg-blue-100

                                dark:bg-blue-950/30
                                dark:text-blue-400
                                dark:hover:bg-blue-950/50
                            "
                        >
                            Visit company website
                        </a>

                    )}

                </>

            )}

        </section>
    );
}

function InfoItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-slate-900">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">
                {label}
            </p>

            <p className="mt-2 truncate text-sm font-semibold text-gray-900 dark:text-white">
                {value}
            </p>

        </div>
    );
}

function formatMarketCap(
    value: number,
): string {

    if (!value) {
        return "—";
    }

    if (value >= 1_000_000_000_000) {
        return `$${(
            value /
            1_000_000_000_000
        ).toFixed(2)}T`;
    }

    if (value >= 1_000_000_000) {
        return `$${(
            value /
            1_000_000_000
        ).toFixed(2)}B`;
    }

    if (value >= 1_000_000) {
        return `$${(
            value /
            1_000_000
        ).toFixed(2)}M`;
    }

    return `$${value.toLocaleString()}`;
}
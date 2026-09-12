"use client";

import {
    useEffect,
    useState,
} from "react";

import type {
    MarketStatus,
} from "@/lib/market/types";

import {
    getMarketStatus,
} from "@/lib/api/market";

export default function MarketStatusCard() {

    const [status, setStatus] =
        useState<MarketStatus | null>(
            null,
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadStatus();
    }, []);

    async function loadStatus() {
        try {
            setLoading(true);
            setError("");

            const data =
                await getMarketStatus(
                    "US",
                );

            setStatus(data);
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load market status.",
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

            <div className="flex items-start justify-between gap-4">

                <div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Market Status
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                        US Market
                    </h2>

                </div>

                {status && (

                    <div
                        className={
                            status.isOpen
                                ? "flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600 dark:bg-green-950/30 dark:text-green-400"
                                : "flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-slate-800 dark:text-slate-300"
                        }
                    >

                        <span
                            className={
                                status.isOpen
                                    ? "h-2 w-2 rounded-full bg-green-500"
                                    : "h-2 w-2 rounded-full bg-gray-400"
                            }
                        />

                        {status.isOpen
                            ? "Market Open"
                            : "Market Closed"}

                    </div>

                )}

            </div>

            {loading && (

                <div className="mt-6 h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800" />

            )}

            {error && !loading && (

                <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/20 dark:text-red-400">
                    {error}
                </div>

            )}

            {status && !loading && !error && (

                <div className="mt-6 grid grid-cols-2 gap-3">

                    <StatusItem
                        label="Exchange"
                        value={
                            status.exchange ||
                            "US"
                        }
                    />

                    <StatusItem
                        label="Timezone"
                        value={
                            status.timezone ||
                            "—"
                        }
                    />

                    <StatusItem
                        label="Current Time"
                        value={formatTime(
                            status.currentTime,
                        )}
                    />

                    <StatusItem
                        label={
                            status.isOpen
                                ? "Next Close"
                                : "Next Open"
                        }
                        value={
                            status.isOpen
                                ? formatTime(
                                      status.nextClose,
                                  )
                                : formatTime(
                                      status.nextOpen,
                                  )
                        }
                    />

                </div>

            )}

        </section>
    );
}

function StatusItem({
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

function formatTime(
    value: string,
): string {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (Number.isNaN(
        date.getTime(),
    )) {
        return value;
    }

    return date.toLocaleString(
        [],
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    );
}
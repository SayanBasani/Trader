"use client";

import {
    useEffect,
    useState,
} from "react";

import type {
    NewsList,
} from "@/lib/market/types";

interface MarketNewsProps {
    category?: string;
}

export default function MarketNews({
    category = "general",
}: MarketNewsProps) {

    const [news, setNews] =
        useState<NewsList>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadNews();
    }, [category]);

    async function loadNews() {

        try {

            setLoading(true);
            setError("");

            const response =
                await fetch(
                    `/api/market/news?category=${encodeURIComponent(
                        category,
                    )}`,
                    {
                        cache: "no-store",
                    },
                );

            const result =
                await response.json();

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ||
                        "Unable to load market news.",
                );
            }

            setNews(
                result.data ?? [],
            );

        }
        catch (error) {

            setNews([]);

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load market news.",
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
                shadow-sm

                dark:border-slate-700
                dark:bg-[#162033]
            "
        >

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-slate-700">

                <div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Latest Updates
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                        Market News
                    </h2>

                </div>

                <button
                    type="button"
                    onClick={loadNews}
                    disabled={loading}
                    className="
                        rounded-lg
                        bg-gray-100
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-gray-600
                        transition
                        hover:bg-gray-200
                        disabled:opacity-50

                        dark:bg-slate-800
                        dark:text-slate-300
                        dark:hover:bg-slate-700
                    "
                >
                    {loading
                        ? "Loading..."
                        : "Refresh"}
                </button>

            </div>

            {loading && (

                <div className="divide-y divide-gray-100 dark:divide-slate-700">

                    {[1, 2, 3, 4].map(
                        (item) => (

                            <div
                                key={item}
                                className="flex gap-4 p-5"
                            >

                                <div className="h-20 w-28 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700" />

                                <div className="flex-1 space-y-3">

                                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                                    <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                                </div>

                            </div>

                        ),
                    )}

                </div>

            )}

            {error && !loading && (

                <div className="p-6">

                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">

                        {error}

                    </div>

                </div>

            )}

            {!loading &&
                !error &&
                news.length === 0 && (

                    <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No market news available.
                    </div>

                )}

            {!loading &&
                !error &&
                news.length > 0 && (

                    <div className="divide-y divide-gray-100 dark:divide-slate-700">

                        {news
                            .slice(0, 8)
                            .map((item) => (

                                <article
                                    key={item.id}
                                    className="
                                        group
                                        flex
                                        gap-4
                                        p-5
                                        transition
                                        hover:bg-gray-50

                                        dark:hover:bg-slate-900/50
                                    "
                                >

                                    {item.image ? (

                                        <img
                                            src={item.image}
                                            alt=""
                                            className="
                                                h-20
                                                w-28
                                                shrink-0
                                                rounded-xl
                                                object-cover
                                                bg-gray-100

                                                dark:bg-slate-800
                                            "
                                        />

                                    ) : (

                                        <div className="flex h-20 w-28 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-slate-800">
                                            📰
                                        </div>

                                    )}

                                    <div className="min-w-0 flex-1">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                                {item.source}
                                            </span>

                                            <span className="text-xs text-gray-400 dark:text-slate-500">
                                                {formatTime(
                                                    item.publishedAt,
                                                )}
                                            </span>

                                        </div>

                                        <h3 className="mt-1 line-clamp-2 font-semibold leading-5 text-gray-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                            {item.headline}
                                        </h3>

                                        {item.summary && (

                                            <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
                                                {item.summary}
                                            </p>

                                        )}

                                        {item.url && (

                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 inline-block text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Read article →
                                            </a>

                                        )}

                                    </div>

                                </article>

                            ))}

                    </div>

                )}

        </section>
    );
}

function formatTime(
    timestamp: number,
): string {

    if (!timestamp) {
        return "Unknown time";
    }

    const date =
        new Date(
            timestamp * 1000,
        );

    if (
        Number.isNaN(
            date.getTime(),
        )
    ) {
        return "Unknown time";
    }

    return date.toLocaleString(
        [],
        {
            dateStyle: "medium",
            timeStyle: "short",
        },
    );
}
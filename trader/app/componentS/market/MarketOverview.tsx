"use client";

import {
    useEffect,
    useState,
} from "react";

import type {
    Quote,
    SearchResults,
} from "@/lib/market/types";

import {
    getQuote,
    searchStocks,
} from "@/lib/api/market";

interface MarketOverviewProps {
    onSymbolChange?: (
        symbol: string,
    ) => void;
}

export default function MarketOverview({
    onSymbolChange,
}: MarketOverviewProps) {

    const [query, setQuery] =
        useState("AAPL");

    const [symbol, setSymbol] =
        useState("AAPL");

    const [quote, setQuote] =
        useState<Quote | null>(null);

    const [results, setResults] =
        useState<SearchResults>([]);

    const [loading, setLoading] =
        useState(true);

    const [searching, setSearching] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadQuote("AAPL");
    }, []);

    async function loadQuote(
        selectedSymbol: string,
    ) {
        try {
            setLoading(true);
            setError("");

            const data =
                await getQuote(
                    selectedSymbol,
                );

            setQuote(data);
            setSymbol(
                selectedSymbol,
            );

            onSymbolChange?.(
                selectedSymbol,
            );
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to load market data.",
            );
        }
        finally {
            setLoading(false);
        }
    }

    async function handleSearch() {
        const searchQuery =
            query.trim();

        if (!searchQuery) {
            return;
        }

        try {
            setSearching(true);
            setError("");

            const data =
                await searchStocks(
                    searchQuery,
                );

            setResults(data);
        }
        catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to search stocks.",
            );
        }
        finally {
            setSearching(false);
        }
    }

    function handleSelectStock(
        selectedSymbol: string,
    ) {
        setResults([]);
        setQuery(
            selectedSymbol,
        );

        loadQuote(
            selectedSymbol,
        );
    }

    const isPositive =
        (quote?.change ?? 0) >= 0;

    return (
        <section className="space-y-5">

            {/* Search */}

            <div
                className="
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm

                    dark:border-slate-700
                    dark:bg-[#162033]
                "
            >

                <div className="mb-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white">
                            $
                        </div>

                        <div>

                            <h2 className="font-semibold text-gray-900 dark:text-white">
                                Market Search
                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Search stocks, ETFs and other instruments.
                            </p>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                    <div className="relative flex-1">

                        <input
                            value={query}
                            onChange={(event) =>
                                setQuery(
                                    event.target.value,
                                )
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key ===
                                    "Enter"
                                ) {
                                    handleSearch();
                                }
                            }}
                            placeholder="Search by symbol or company name..."
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-gray-50
                                px-4
                                py-3
                                text-sm
                                text-gray-900
                                outline-none
                                transition
                                placeholder:text-gray-400
                                focus:border-blue-500
                                focus:bg-white
                                focus:ring-4
                                focus:ring-blue-500/10

                                dark:border-slate-600
                                dark:bg-slate-900
                                dark:text-white
                                dark:placeholder:text-slate-500
                                dark:focus:bg-slate-950
                            "
                        />

                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={searching}
                        className="
                            rounded-xl
                            bg-blue-600
                            px-7
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
                            hover:shadow-md
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {searching ? "Searching..." : "Search"}
                    </button>

                </div>

                {/* Search Results */}

                {results.length > 0 && (

                    <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">

                        {results
                            .slice(0, 8)
                            .map((item, index) => (

                                <button
                                    key={`${item.symbol}-${item.name}-${index}`}
                                    type="button"
                                    onClick={() =>
                                        handleSelectStock(
                                            item.symbol,
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        border-b
                                        border-gray-100
                                        px-4
                                        py-3
                                        text-left
                                        transition
                                        last:border-b-0
                                        hover:bg-gray-50

                                        dark:border-slate-700
                                        dark:hover:bg-slate-800
                                    "
                                >

                                    <div className="min-w-0">

                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {item.symbol}
                                        </p>

                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                            {item.name}
                                        </p>

                                    </div>

                                    <span className="ml-4 shrink-0 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-slate-700 dark:text-slate-300">
                                        {item.type}
                                    </span>

                                </button>

                            ))}

                    </div>

                )}

            </div>

            {/* Quote */}

            <div
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm

                    dark:border-slate-700
                    dark:bg-[#162033]
                "
            >

                <div className="border-b border-gray-100 px-6 py-5 dark:border-slate-700">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                                {symbol.slice(
                                    0,
                                    1,
                                )}
                            </div>

                            <div>

                                <div className="flex items-center gap-2">

                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {symbol}
                                    </h2>

                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600 dark:bg-green-950/30 dark:text-green-400">
                                        Live
                                    </span>

                                </div>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Market quote
                                </p>

                            </div>

                        </div>

                        <div className="sm:text-right">

                            {loading ? (

                                <div className="space-y-2 sm:text-right">

                                    <div className="ml-auto h-9 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />

                                    <div className="ml-auto h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

                                </div>

                            ) : quote ? (

                                <>
                                    <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        ${quote.price.toFixed(2)}
                                    </p>

                                    <p
                                        className={
                                            isPositive
                                                ? "mt-1 text-sm font-semibold text-green-500"
                                                : "mt-1 text-sm font-semibold text-red-500"
                                        }
                                    >
                                        {isPositive
                                            ? "+"
                                            : ""}
                                        {quote.change.toFixed(
                                            2,
                                        )}
                                        {" "}
                                        (
                                        {isPositive
                                            ? "+"
                                            : ""}
                                        {quote.changePercent.toFixed(
                                            2,
                                        )}
                                        %)
                                    </p>
                                </>

                            ) : null}

                        </div>

                    </div>

                </div>

                {error && (

                    <div className="m-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                        {error}
                    </div>

                )}

                {quote && !loading && !error && (

                    <div className="grid grid-cols-2 divide-x divide-y border-b border-gray-100 dark:divide-slate-700 dark:border-slate-700 sm:grid-cols-4 sm:divide-y-0">

                        <Metric
                            label="Open"
                            value={`$${quote.open.toFixed(2)}`}
                        />

                        <Metric
                            label="High"
                            value={`$${quote.high.toFixed(2)}`}
                        />

                        <Metric
                            label="Low"
                            value={`$${quote.low.toFixed(2)}`}
                        />

                        <Metric
                            label="Previous Close"
                            value={`$${quote.previousClose.toFixed(2)}`}
                        />

                    </div>

                )}

                {quote && !loading && !error && (

                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">

                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

                            <span className="h-2 w-2 rounded-full bg-green-500" />

                            Market data available

                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Volume:{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {quote.volume.toLocaleString()}
                            </span>
                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="px-5 py-4">

            <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-slate-500">
                {label}
            </p>

            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {value}
            </p>

        </div>
    );
}
"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import type { Quote } from "@/lib/market/types";

interface WatchlistProps {
    onSymbolSelect?: (
        symbol: string,
    ) => void;
}

interface WatchlistItem {
    symbol: string;
    createdAt: string;
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

const DEFAULT_SYMBOLS = [
    "AAPL",
    "TSLA",
    "NVDA",
    "MSFT",
];

export default function Watchlist({
    onSymbolSelect,
}: WatchlistProps) {
    const [symbols, setSymbols] =
        useState<string[]>([]);

    const [quotes, setQuotes] =
        useState<Record<string, Quote>>({});

    const [newSymbol, setNewSymbol] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [adding, setAdding] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [actionError, setActionError] =
        useState<string | null>(null);

    const loadQuotes = useCallback(
        async (
            stockSymbols: string[],
        ) => {
            if (stockSymbols.length === 0) {
                setQuotes({});
                return;
            }

            const results =
                await Promise.allSettled(
                    stockSymbols.map(
                        async (symbol) => {
                            const response =
                                await fetch(
                                    `/api/market/quote?symbol=${encodeURIComponent(
                                        symbol,
                                    )}`,
                                );

                            const result =
                                (await response.json()) as ApiResponse<Quote>;

                            if (
                                !response.ok ||
                                !result.success ||
                                !result.data
                            ) {
                                throw new Error(
                                    result.message ??
                                        `Unable to load ${symbol}.`,
                                );
                            }

                            return {
                                symbol,
                                quote: result.data,
                            };
                        },
                    ),
                );

            const nextQuotes:
                Record<string, Quote> = {};

            results.forEach(
                (result) => {
                    if (
                        result.status ===
                        "fulfilled"
                    ) {
                        nextQuotes[
                            result.value.symbol
                        ] =
                            result.value.quote;
                    }
                },
            );

            setQuotes(nextQuotes);
        },
        [],
    );

    const loadWatchlist =
        useCallback(
            async (
                showRefresh = false,
            ) => {
                try {
                    if (showRefresh) {
                        setRefreshing(true);
                    } else {
                        setLoading(true);
                    }

                    setError(null);

                    const response =
                        await fetch(
                            "/api/watchlist",
                            {
                                cache: "no-store",
                            },
                        );

                    const result =
                        (await response.json()) as ApiResponse<
                            WatchlistItem[]
                        >;

                    if (
                        !response.ok ||
                        !result.success
                    ) {
                        throw new Error(
                            result.message ??
                                "Unable to load watchlist.",
                        );
                    }

                    const databaseSymbols =
                        (result.data ?? []).map(
                            (item) =>
                                item.symbol,
                        );

                    /*
                     * New users receive a useful
                     * initial watchlist.
                     *
                     * These symbols are inserted
                     * into the database only once.
                     */
                    if (
                        databaseSymbols.length ===
                        0
                    ) {
                        const createdSymbols: string[] =
                            [];

                        for (const symbol of DEFAULT_SYMBOLS) {
                            try {
                                const addResponse =
                                    await fetch(
                                        "/api/watchlist",
                                        {
                                            method:
                                                "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify(
                                                {
                                                    symbol,
                                                },
                                            ),
                                        },
                                    );

                                if (
                                    addResponse.ok
                                ) {
                                    createdSymbols.push(
                                        symbol,
                                    );
                                }
                            } catch {
                                // Ignore individual default-symbol failures.
                            }
                        }

                        setSymbols(
                            createdSymbols,
                        );

                        await loadQuotes(
                            createdSymbols,
                        );
                    } else {
                        setSymbols(
                            databaseSymbols,
                        );

                        await loadQuotes(
                            databaseSymbols,
                        );
                    }
                } catch (err) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load watchlist.",
                    );
                } finally {
                    setLoading(false);
                    setRefreshing(false);
                }
            },
            [loadQuotes],
        );

    useEffect(() => {
        void loadWatchlist();
    }, [loadWatchlist]);

    async function addStock() {
        const symbol =
            newSymbol
                .trim()
                .toUpperCase();

        if (!symbol) {
            return;
        }

        if (
            !/^[A-Z0-9.-]{1,20}$/.test(symbol)
        ) {
            setActionError(
                "Please enter a valid stock symbol.",
            );
            return;
        }

        if (
            symbols.includes(symbol)
        ) {
            setActionError(
                `${symbol} is already in your watchlist.`,
            );
            return;
        }

        try {
            setAdding(true);
            setActionError(null);

            /*
            * Verify that the symbol exists
            * using the existing market search API.
            */
            const searchResponse =
                await fetch(
                    `/api/market/search?q=${encodeURIComponent(
                        symbol,
                    )}`,
                );

            const searchResult =
                (await searchResponse.json()) as ApiResponse<
                    Array<{
                        symbol: string;
                        name: string;
                        exchange: string;
                    }>
                >;

            if (
                !searchResponse.ok ||
                !searchResult.success
            ) {
                throw new Error(
                    searchResult.message ??
                        "Unable to validate stock symbol.",
                );
            }

            const matchingStock =
                (searchResult.data ?? []).find(
                    (item) =>
                        item.symbol
                            .trim()
                            .toUpperCase() ===
                        symbol,
                );

            if (!matchingStock) {
                setActionError(
                    `${symbol} was not found. Please enter a valid supported stock symbol.`,
                );
                return;
            }

            /*
            * Save the validated symbol
            * to the authenticated user's database watchlist.
            */
            const response =
                await fetch(
                    "/api/watchlist",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            symbol,
                        }),
                    },
                );

            const result =
                (await response.json()) as ApiResponse<WatchlistItem>;

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ??
                        "Unable to add stock.",
                );
            }

            const updatedSymbols = [
                ...symbols,
                symbol,
            ];

            setSymbols(
                updatedSymbols,
            );

            setNewSymbol("");

            await loadQuotes(
                updatedSymbols,
            );
        } catch (err) {
            setActionError(
                err instanceof Error
                    ? err.message
                    : "Unable to add stock.",
            );
        } finally {
            setAdding(false);
        }
    }

    async function removeStock(
        symbol: string,
    ) {
        try {
            setActionError(null);

            const response =
                await fetch(
                    `/api/watchlist/${encodeURIComponent(
                        symbol,
                    )}`,
                    {
                        method: "DELETE",
                    },
                );

            const result =
                (await response.json()) as ApiResponse<
                    undefined
                >;

            if (
                !response.ok ||
                !result.success
            ) {
                throw new Error(
                    result.message ??
                        "Unable to remove stock.",
                );
            }

            const updatedSymbols =
                symbols.filter(
                    (item) =>
                        item !== symbol,
                );

            setSymbols(
                updatedSymbols,
            );

            setQuotes(
                (current) => {
                    const next = {
                        ...current,
                    };

                    delete next[symbol];

                    return next;
                },
            );
        } catch (err) {
            setActionError(
                err instanceof Error
                    ? err.message
                    : "Unable to remove stock.",
            );
        }
    }

    async function handleRefresh() {
        await loadWatchlist(true);
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Watchlist
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Your saved market symbols
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={
                        loading ||
                        refreshing
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}
                </button>
            </div>

            <div className="mb-4 flex gap-2">
                <input
                    value={newSymbol}
                    onChange={(event) =>
                        setNewSymbol(
                            event.target.value.toUpperCase(),
                        )
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key ===
                            "Enter"
                        ) {
                            void addStock();
                        }
                    }}
                    placeholder="Add symbol e.g. AMZN"
                    maxLength={20}
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <button
                    type="button"
                    onClick={() =>
                        void addStock()
                    }
                    disabled={
                        adding ||
                        !newSymbol.trim()
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {adding
                        ? "Adding..."
                        : "Add"}
                </button>
            </div>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                </div>
            )}

            {actionError && (
                <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
                    {actionError}
                </div>
            )}

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                key={item}
                                className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                            />
                        ),
                    )}
                </div>
            ) : symbols.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Your watchlist is empty.
                    </p>

                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Add a stock symbol above.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {symbols.map(
                        (symbol) => {
                            const quote =
                                quotes[
                                    symbol
                                ];

                            return (
                                <div
                                    key={symbol}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        onSymbolSelect?.(
                                            symbol,
                                        )
                                    }
                                    onKeyDown={(
                                        event,
                                    ) => {
                                        if (
                                            event.key ===
                                                "Enter" ||
                                            event.key ===
                                                " "
                                        ) {
                                            onSymbolSelect?.(
                                                symbol,
                                            );
                                        }
                                    }}
                                    className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
                                >
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {symbol}
                                        </p>

                                        {quote ? (
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {quote.currency ??
                                                    "USD"}
                                            </p>
                                        ) : (
                                            <p className="mt-1 text-xs text-slate-400">
                                                Quote unavailable
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {quote && (
                                            <div className="text-right">
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    {quote.price.toFixed(
                                                        2,
                                                    )}
                                                </p>

                                                <p
                                                    className={`text-xs font-medium ${
                                                        quote.changePercent >=
                                                        0
                                                            ? "text-green-600 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }`}
                                                >
                                                    {quote.changePercent >=
                                                    0
                                                        ? "+"
                                                        : ""}
                                                    {quote.changePercent.toFixed(
                                                        2,
                                                    )}
                                                    %
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={(
                                                event,
                                            ) => {
                                                event.stopPropagation();

                                                void removeStock(
                                                    symbol,
                                                );
                                            }}
                                            className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        },
                    )}
                </div>
            )}
        </section>
    );
}
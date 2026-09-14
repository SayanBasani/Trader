import type {
    Candles,
    Company,
    MarketStatus,
    NewsList,
    Quote,
    SearchResults,
} from "@/lib/market/types";

import type {
    HttpClient,
} from "@/lib/market/client";

import {
    AuthStrategy,
} from "@/lib/market/providers/auth-strategy";

import {
    BaseMarketProvider,
} from "@/lib/market/providers/base-market-provider";

interface UpstoxInstrument {
    name?: string;
    segment?: string;
    exchange?: string;
    isin?: string;
    instrument_key?: string;
    exchange_token?: string;
    trading_symbol?: string;
    short_name?: string;
    tick_size?: number;
    lot_size?: number;
    instrument_type?: string;
}

interface UpstoxSearchResponse {
    status?: string;

    data?: UpstoxInstrument[];

    meta_data?: {
        page?: {
            page_number?: number;
            total_pages?: number;
            records?: number;
            total_records?: number;
        };
    };
}

interface UpstoxQuoteData {
    ohlc?: {
        open?: number;
        high?: number;
        low?: number;
        close?: number;
        volume?: number;
        ts?: number;
    };

    timestamp?: string;

    instrument_token?: string;

    symbol?: string;

    last_price?: number;

    volume?: number;

    average_price?: number;

    net_change?: number;

    prev_close_price?: number;

    year_high?: number;

    year_low?: number;

    last_trade_time?: string;
}

interface UpstoxQuoteResponse {
    status?: string;

    data?: Record<
        string,
        UpstoxQuoteData
    >;
}

interface UpstoxHistoricalResponse {
    status?: string;

    data?: {
        candles?: Array<
            [
                string,
                number,
                number,
                number,
                number,
                number,
                number,
            ]
        >;
    };
}

export class UpstoxProvider
    extends BaseMarketProvider {

    public readonly name =
        "upstox";

    protected readonly authStrategy =
        AuthStrategy.BEARER;

    protected readonly authKeyName =
        "Authorization";

    constructor(
        httpClient: HttpClient,
        accessToken: string,
    ) {
        super(
            httpClient,
            accessToken,
        );
    }

    async searchStocks(
        query: string,
    ): Promise<SearchResults> {

        const trimmed =
            query.trim();

        if (!trimmed) {
            return [];
        }

        const response =
            await this.get<UpstoxSearchResponse>(
                "v2/instruments/search",
                {
                    query: trimmed,
                    exchanges: "NSE,BSE",
                    segments: "EQ",
                    instrument_types: "EQ,A",
                    page_number: 1,
                    records: 30,
                },
            );

        return (
            response.data ?? []
        )
            .filter(
                (item) =>
                    Boolean(
                        item.instrument_key,
                    ),
            )
            .map(
                (item) => ({
                    symbol:
                        item.trading_symbol ??
                        "",

                    name:
                        item.name ??
                        item.short_name ??
                        "",

                    exchange:
                        item.exchange ??
                        "",

                    exchangeCode:
                        item.exchange ??
                        "",

                    currency:
                        "INR",

                    country:
                        "India",

                    type:
                        item.instrument_type ??
                        "Common Stock",
                }),
            );
    }

    async getQuote(
        symbol: string,
    ): Promise<Quote> {

        const instrument =
            await this.resolveInstrument(
                symbol,
            );

        const response =
            await this.get<UpstoxQuoteResponse>(
                "v3/market-quote/quotes",
                {
                    instrument_key:
                        instrument.instrument_key,
                },
            );

        if (!instrument.instrument_key) {
            throw new Error(
                `Upstox instrument key missing for "${symbol}".`,
            );
        }

        const data =
            this.findQuoteData(
                response.data,
                instrument.instrument_key,
            );

        if (!data) {
            throw new Error(
                `Upstox quote not found for "${symbol}".`,
            );
        }

        const price =
            Number(
                data.last_price ?? 0,
            );

        if (
            !Number.isFinite(price) ||
            price <= 0
        ) {
            throw new Error(
                `Upstox quote unavailable for "${symbol}".`,
            );
        }

        const previousClose =
            Number(
                data.prev_close_price ??
                data.ohlc?.close ??
                0,
            );

        const change =
            Number(
                data.net_change ??
                (
                    price -
                    previousClose
                ),
            );

        const changePercent =
            previousClose > 0
                ? (
                      change /
                      previousClose
                  ) *
                  100
                : 0;

        const timestamp =
            data.last_trade_time
                ? Math.floor(
                      Number(
                          data.last_trade_time,
                      ) /
                          1000,
                  )
                : data.ohlc?.ts
                    ? Math.floor(
                          data.ohlc.ts /
                              1000,
                      )
                    : Math.floor(
                          Date.now() /
                              1000,
                      );

        return {
            symbol:
                instrument.trading_symbol ??
                symbol,

            price,

            change,

            changePercent,

            open:
                Number(
                    data.ohlc?.open ?? 0,
                ),

            high:
                Number(
                    data.ohlc?.high ?? 0,
                ),

            low:
                Number(
                    data.ohlc?.low ?? 0,
                ),

            previousClose,

            volume:
                Number(
                    data.volume ??
                    data.ohlc?.volume ??
                    0,
                ),

            timestamp,

            currency:
                "INR",
        };
    }

    async getCompany(
        symbol: string,
    ): Promise<Company> {

        const instrument =
            await this.resolveInstrument(
                symbol,
            );

        return {
            symbol:
                instrument.trading_symbol ??
                symbol,

            name:
                instrument.name ??
                instrument.short_name ??
                "",

            description:
                "",

            logo:
                "",

            website:
                "",

            exchange:
                instrument.exchange ??
                "",

            exchangeCode:
                instrument.exchange ??
                "",

            currency:
                "INR",

            country:
                "India",

            industry:
                "",

            sector:
                "",

            ipoDate:
                "",

            marketCap:
                0,

            employeeCount:
                0,
        };
    }

    async getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<Candles> {

        const instrument =
            await this.resolveInstrument(
                symbol,
            );

        const timeframe =
            this.resolveTimeframe(
                resolution,
            );

        const toDate =
            this.formatIndiaDate(
                to,
            );

        const fromDate =
            this.formatIndiaDate(
                from,
            );

        const endpoint =
            `v3/historical-candle/${encodeURIComponent(
                instrument.instrument_key ??
                    "",
            )}/${timeframe.unit}/${timeframe.interval}/${toDate}/${fromDate}`;

        const response =
            await this.get<UpstoxHistoricalResponse>(
                endpoint,
            );

        const candles =
            response.data?.candles ?? [];

        return candles
            .map(
                (item) => ({
                    time:
                        Math.floor(
                            new Date(
                                item[0],
                            ).getTime() /
                                1000,
                        ),

                    open:
                        Number(item[1] ?? 0),

                    high:
                        Number(item[2] ?? 0),

                    low:
                        Number(item[3] ?? 0),

                    close:
                        Number(item[4] ?? 0),

                    volume:
                        Number(item[5] ?? 0),
                }),
            )
            .filter(
                (item) =>
                    item.time > 0 &&
                    item.open > 0 &&
                    item.high > 0 &&
                    item.low > 0 &&
                    item.close > 0,
            )
            .sort(
                (a, b) =>
                    a.time -
                    b.time,
            );
    }

    async getMarketNews(
        _category?: string,
    ): Promise<NewsList> {
        throw new Error(
            "Upstox market news is not implemented.",
        );
    }

    async getMarketStatus(
        _exchange?: string,
    ): Promise<MarketStatus> {
        throw new Error(
            "Upstox market status is not implemented.",
        );
    }

    private async resolveInstrument(
        symbol: string,
    ): Promise<UpstoxInstrument> {

        const normalized =
            symbol.trim().toUpperCase();

        if (
            normalized.includes("|")
        ) {
            return {
                instrument_key:
                    normalized,
                trading_symbol:
                    this.extractTradingSymbol(
                        normalized,
                    ),
                exchange:
                    normalized.startsWith(
                        "NSE_",
                    )
                        ? "NSE"
                        : "BSE",
            };
        }

        const cleanSymbol =
            normalized
                .replace(
                    /:(NSE|BSE)$/,
                    "",
                )
                .replace(
                    /\.(NS|BO)$/,
                    "",
                );

        const requestedExchange =
            normalized.endsWith(":BSE") ||
            normalized.endsWith(".BO")
                ? "BSE"
                : "NSE";

        const response =
            await this.get<UpstoxSearchResponse>(
                "v2/instruments/search",
                {
                    query: cleanSymbol,
                    exchanges:
                        requestedExchange,
                    segments: "EQ",
                    instrument_types: "EQ,A",
                    page_number: 1,
                    records: 30,
                },
            );

        const instruments =
            response.data ?? [];

        const exact =
            instruments.find(
                (item) =>
                    (
                        item.trading_symbol ??
                        ""
                    ).toUpperCase() ===
                    cleanSymbol &&
                    item.segment ===
                        `${requestedExchange}_EQ`,
            );

        const fallback =
            instruments.find(
                (item) =>
                    item.segment ===
                    `${requestedExchange}_EQ`,
            );

        const instrument =
            exact ??
            fallback;

        if (
            !instrument?.instrument_key
        ) {
            throw new Error(
                `Upstox instrument not found for "${symbol}".`,
            );
        }

        return instrument;
    }

    private findQuoteData(
        data:
            | Record<
                  string,
                  UpstoxQuoteData
              >
            | undefined,
        instrumentKey: string,
    ): UpstoxQuoteData | undefined {

        if (!data) {
            return undefined;
        }

        const direct =
            data[
                instrumentKey.replace(
                    "|",
                    ":",
                )
            ];

        if (direct) {
            return direct;
        }

        const values =
            Object.values(data);

        return values[0];
    }

    private extractTradingSymbol(
        instrumentKey: string,
    ): string {

        const parts =
            instrumentKey.split("|");

        return (
            parts[1] ??
            instrumentKey
        );
    }

    private resolveTimeframe(
        resolution: string,
    ): {
        unit:
            | "minutes"
            | "hours"
            | "days"
            | "weeks"
            | "months";

        interval: number;
    } {

        const normalized =
            resolution.trim().toUpperCase();

        if (
            normalized === "D" ||
            normalized === "1D"
        ) {
            return {
                unit: "days",
                interval: 1,
            };
        }

        if (
            normalized === "W" ||
            normalized === "1W"
        ) {
            return {
                unit: "weeks",
                interval: 1,
            };
        }

        if (
            normalized === "M" ||
            normalized === "1M"
        ) {
            return {
                unit: "months",
                interval: 1,
            };
        }

        const numeric =
            Number(
                normalized.replace(
                    "MIN",
                    "",
                ).replace(
                    "H",
                    "",
                ),
            );

        if (
            normalized.endsWith("H")
        ) {
            if (
                numeric < 1 ||
                numeric > 5
            ) {
                throw new Error(
                    `Upstox supports 1-5 hour candle intervals.`,
                );
            }

            return {
                unit: "hours",
                interval: numeric,
            };
        }

        if (
            numeric < 1 ||
            numeric > 300
        ) {
            throw new Error(
                `Upstox supports 1-300 minute candle intervals.`,
            );
        }

        return {
            unit: "minutes",
            interval: numeric,
        };
    }

    private formatIndiaDate(
        timestamp: number,
    ): string {

        const parts =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        "Asia/Kolkata",

                    year: "numeric",

                    month: "2-digit",

                    day: "2-digit",
                },
            ).formatToParts(
                new Date(
                    timestamp * 1000,
                ),
            );

        const values =
            Object.fromEntries(
                parts.map(
                    (part) => [
                        part.type,
                        part.value,
                    ],
                ),
            );

        return `${values.year}-${values.month}-${values.day}`;
    }
}
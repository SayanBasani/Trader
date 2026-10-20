import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";

import type {
    HttpClient,
} from "@/lib/market/client";

import {
    BaseMarketProvider,
} from "@/lib/market/providers/base-market-provider";

import {
    AuthStrategy,
} from "@/lib/market/providers/auth-strategy";

interface AngelSearchItem {
    exchange?: string;
    tradingsymbol?: string;
    symboltoken?: string;
}

interface AngelSearchResponse {
    status?: boolean;
    message?: string;
    errorcode?: string;
    data?: AngelSearchItem[];
}

interface AngelQuoteItem {
    exchange?: string;
    tradingsymbol?: string;
    symboltoken?: string;
    open?: string | number;
    high?: string | number;
    low?: string | number;
    close?: string | number;
    ltp?: string | number;
}

interface AngelQuoteResponse {
    status?: boolean;
    message?: string;
    errorcode?: string;
    data?: AngelQuoteItem | AngelQuoteItem[];
}

interface AngelCandleResponse {
    status?: boolean;
    message?: string;
    errorcode?: string;
    data?: Array<
        [
            string,
            number,
            number,
            number,
            number,
            number,
        ]
    >;
}

export class AngelOneProvider
    extends BaseMarketProvider {

    public readonly name =
        "angel-one";

    private readonly clientApiKey: string;

    protected readonly authStrategy =
        AuthStrategy.BEARER;

    protected readonly authKeyName =
        "Authorization";

    // private readonly apiKey: string;

    constructor(
        httpClient: HttpClient,
        accessToken: string,
        apiKey: string,
    ) {
        super(
            httpClient,
            accessToken,
        );

        // void apiKey;
        this.clientApiKey = apiKey;
    }

    private getHeaders(): Headers {
        const headers =
            new Headers();

        headers.set(
            "Authorization",
            `Bearer ${this.apiKey}`,
        );

        headers.set(
            "X-PrivateKey",
            this.clientApiKey,
        );

        headers.set(
            "X-SourceID",
            "WEB",
        );

        headers.set(
            "X-UserType",
            "USER",
        );

        headers.set(
            "Accept",
            "application/json",
        );

        headers.set(
            "Content-Type",
            "application/json",
        );

        return headers;
    }

    private async post<T>(
        endpoint: string,
        body: Record<string, unknown>,
    ): Promise<T> {

        const response =
            await this.httpClient.post<T>({
                path: endpoint,

                headers:
                    this.getHeaders(),

                body:
                    JSON.stringify(body),

                responseType:
                    "json",
            });

        return response.data;
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
            await this.post<AngelSearchResponse>(
                "rest/secure/angelbroking/order/v1/searchScrip",
                {
                    exchange: "NSE",
                    searchscrip: trimmed,
                },
            );

        return (
            response.data ?? []
        ).map(
            (item) => ({
                symbol:
                    item.tradingsymbol ??
                    "",

                name:
                    item.tradingsymbol ??
                    "",

                exchange:
                    item.exchange ??
                    "NSE",

                exchangeCode:
                    item.exchange ??
                    "NSE",

                currency:
                    "INR",

                country:
                    "India",

                type:
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
            await this.post<AngelQuoteResponse>(
                "rest/secure/angelbroking/order/v1/getLtpData",
                {
                    exchange:
                        instrument.exchange,

                    tradingsymbol:
                        instrument.tradingsymbol,

                    symboltoken:
                        instrument.symboltoken,
                },
            );

        const raw =
            Array.isArray(response.data)
                ? response.data[0]
                : response.data;

        if (!raw) {
            throw new Error(
                `Angel One quote not found for "${symbol}".`,
            );
        }

        const price =
            Number(raw.ltp ?? 0);

        const previousClose =
            Number(raw.close ?? 0);

        const change =
            price -
            previousClose;

        const changePercent =
            previousClose > 0
                ? (
                      change /
                      previousClose
                  ) *
                  100
                : 0;

        return {
            symbol,
            price,
            change,
            changePercent,
            open:
                Number(raw.open ?? 0),
            high:
                Number(raw.high ?? 0),
            low:
                Number(raw.low ?? 0),
            previousClose,
            volume: 0,
            timestamp:
                Math.floor(
                    Date.now() /
                    1000,
                ),
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
                instrument.tradingsymbol,

            name:
                instrument.tradingsymbol,

            description: "",

            logo: "",

            website: "",

            exchange:
                instrument.exchange,

            exchangeCode:
                instrument.exchange,

            currency:
                "INR",

            country:
                "India",

            industry: "",

            sector: "",

            ipoDate: "",

            marketCap: 0,

            employeeCount: 0,
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

        const interval =
            this.resolveInterval(
                resolution,
            );

        const response =
            await this.post<AngelCandleResponse>(
                "rest/secure/angelbroking/historical/v1/getCandleData",
                {
                    exchange:
                        instrument.exchange,

                    symboltoken:
                        instrument.symboltoken,

                    interval,

                    fromdate:
                        this.formatDate(
                            from,
                        ),

                    todate:
                        this.formatDate(
                            to,
                        ),
                },
            );

        return (
            response.data ?? []
        ).map(
            (candle) => ({
                time:
                    Math.floor(
                        new Date(
                            candle[0],
                        ).getTime() /
                        1000,
                    ),

                open:
                    Number(candle[1]),

                high:
                    Number(candle[2]),

                low:
                    Number(candle[3]),

                close:
                    Number(candle[4]),

                volume:
                    Number(candle[5] ?? 0),
            }),
        );
    }

    async getMarketNews(
        category?: string,
    ): Promise<NewsList> {
        void category;

        throw new Error(
            "Angel One news is not implemented.",
        );
    }

    async getMarketStatus(
        exchange?: string,
    ): Promise<MarketStatus> {
        void exchange;

        throw new Error(
            "Angel One market status is not implemented.",
        );
    }

    private async resolveInstrument(
        symbol: string,
    ): Promise<{
        exchange: string;
        tradingsymbol: string;
        symboltoken: string;
    }> {

        const normalized =
            symbol
                .trim()
                .toUpperCase()
                .replace(
                    /:NSE$|\.NS$/i,
                    "",
                )
                .replace(
                    /:BSE$|\.BO$/i,
                    "",
                );

        const exchange =
            symbol
                .toUpperCase()
                .includes(":BSE") ||
            symbol
                .toUpperCase()
                .endsWith(".BO")
                ? "BSE"
                : "NSE";

        const response =
            await this.post<AngelSearchResponse>(
                "rest/secure/angelbroking/order/v1/searchScrip",
                {
                    exchange,
                    searchscrip:
                        normalized,
                },
            );

        const exact =
            (
                response.data ?? []
            ).find(
                (item) =>
                    item.tradingsymbol
                        ?.replace(
                            /-EQ$/,
                            "",
                        )
                        .toUpperCase() ===
                    normalized,
            );

        if (
            !exact?.symboltoken ||
            !exact.tradingsymbol
        ) {
            throw new Error(
                `Angel One instrument not found for "${symbol}".`,
            );
        }

        return {
            exchange:
                exact.exchange ??
                exchange,

            tradingsymbol:
                exact.tradingsymbol,

            symboltoken:
                exact.symboltoken,
        };
    }

    private resolveInterval(
        resolution: string,
    ): string {

        const value =
            resolution
                .trim()
                .toLowerCase();

        const intervals:
            Record<string, string> = {
                "1m": "ONE_MINUTE",
                "3m": "THREE_MINUTE",
                "5m": "FIVE_MINUTE",
                "10m": "TEN_MINUTE",
                "15m": "FIFTEEN_MINUTE",
                "30m": "THIRTY_MINUTE",
                "1h": "ONE_HOUR",
                "1d": "ONE_DAY",
                "d": "ONE_DAY",
            };

        const interval =
            intervals[value];

        if (!interval) {
            throw new Error(
                `Unsupported Angel One resolution "${resolution}".`,
            );
        }

        return interval;
    }

    private formatDate(
        timestamp: number,
    ): string {

        const date =
            new Date(
                timestamp * 1000,
            );

        const parts =
            new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone:
                        "Asia/Kolkata",

                    year:
                        "numeric",

                    month:
                        "2-digit",

                    day:
                        "2-digit",

                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    hourCycle:
                        "h23",
                },
            ).formatToParts(date);

        const values =
            Object.fromEntries(
                parts.map(
                    (part) => [
                        part.type,
                        part.value,
                    ],
                ),
            );

        return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}`;
    }
}
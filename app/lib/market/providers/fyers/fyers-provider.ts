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
    BaseMarketProvider,
} from "@/lib/market/providers/base-market-provider";

import {
    AuthStrategy,
} from "@/lib/market/providers/auth-strategy";

interface FyersQuoteValue {
    lp?: number;
    open_price?: number;
    high_price?: number;
    low_price?: number;
    prev_close_price?: number;
    ch?: number;
    chp?: number;
    volume?: number;
    timestamp?: number;
}

interface FyersQuoteItem {
    n?: string;
    v?: FyersQuoteValue;
}

interface FyersQuoteResponse {
    s?: string;
    code?: number;
    d?: FyersQuoteItem[];
}

interface FyersHistoryResponse {
    s?: string;
    code?: number;
    candles?: Array<
        [
            number,
            number,
            number,
            number,
            number,
            number,
        ]
    >;
}

export class FyersProvider
    extends BaseMarketProvider {

    public readonly name =
        "fyers";

    protected readonly authStrategy =
        AuthStrategy.HEADER;

    protected readonly authKeyName =
        "Authorization";

    private readonly clientId: string;

    constructor(
        httpClient: HttpClient,
        accessToken: string,
        clientId: string,
    ) {
        super(
            httpClient,
            accessToken,
        );

        this.clientId =
            clientId;
    }

    private getFyersHeaders(): Headers {
        const headers =
            new Headers();

        headers.set(
            "Authorization",
            `${this.clientId}:${this.apiKey}`,
        );

        headers.set(
            "Accept",
            "application/json",
        );

        return headers;
    }

    private async fyersGet<T>(
        endpoint: string,
        query: Record<
            string,
            string | number | boolean | undefined
        >,
    ): Promise<T> {

        const response =
            await this.httpClient.get<T>({
                path: endpoint,

                query,

                headers:
                    this.getFyersHeaders(),
            });

        return response.data;
    }

    async searchStocks(
        query: string,
    ): Promise<SearchResults> {

        void query;

        return [];
    }

    async getQuote(
        symbol: string,
    ): Promise<Quote> {

        const providerSymbol =
            this.normalizeSymbol(
                symbol,
            );

        const response =
            await this.fyersGet<FyersQuoteResponse>(
                "data/quotes",
                {
                    symbols:
                        providerSymbol,
                },
            );

        const item =
            response.d?.[0];

        const value =
            item?.v;

        if (!value?.lp) {
            throw new Error(
                `FYERS quote not found for "${symbol}".`,
            );
        }

        return {
            symbol,

            price:
                Number(value.lp),

            change:
                Number(
                    value.ch ?? 0,
                ),

            changePercent:
                Number(
                    value.chp ?? 0,
                ),

            open:
                Number(
                    value.open_price ??
                    0,
                ),

            high:
                Number(
                    value.high_price ??
                    0,
                ),

            low:
                Number(
                    value.low_price ??
                    0,
                ),

            previousClose:
                Number(
                    value.prev_close_price ??
                    0,
                ),

            volume:
                Number(
                    value.volume ??
                    0,
                ),

            timestamp:
                Number(
                    value.timestamp ??
                    Math.floor(
                        Date.now() /
                        1000,
                    ),
                ),

            currency:
                "INR",
        };
    }

    async getCompany(
        symbol: string,
    ): Promise<Company> {

        const providerSymbol =
            this.normalizeSymbol(
                symbol,
            );

        return {
            symbol,

            name:
                providerSymbol,

            description: "",

            logo: "",

            website: "",

            exchange:
                providerSymbol
                    .split(":")[0] ??
                "NSE",

            exchangeCode:
                providerSymbol
                    .split(":")[0] ??
                "NSE",

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

        const response =
            await this.fyersGet<FyersHistoryResponse>(
                "data/history",
                {
                    symbol:
                        this.normalizeSymbol(
                            symbol,
                        ),

                    resolution:
                        this.normalizeResolution(
                            resolution,
                        ),

                    date_format:
                        "0",

                    range_from:
                        from,

                    range_to:
                        to,

                    cont_flag:
                        "1",
                },
            );

        return (
            response.candles ?? []
        ).map(
            (candle) => ({
                time:
                    Number(candle[0]),

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
            "FYERS news is not implemented.",
        );
    }

    async getMarketStatus(
        exchange?: string,
    ): Promise<MarketStatus> {
        void exchange;

        throw new Error(
            "FYERS market status is not implemented.",
        );
    }

    private normalizeSymbol(
        symbol: string,
    ): string {

        const normalized =
            symbol
                .trim()
                .toUpperCase();

        if (
            normalized.includes(":")
        ) {
            return normalized;
        }

        if (
            normalized.endsWith(".NS")
        ) {
            return `NSE:${normalized.slice(0, -3)}-EQ`;
        }

        if (
            normalized.endsWith(".BO")
        ) {
            return `BSE:${normalized.slice(0, -3)}-EQ`;
        }

        return `NSE:${normalized}-EQ`;
    }

    private normalizeResolution(
        resolution: string,
    ): string {

        const value =
            resolution
                .trim()
                .toLowerCase();

        const map:
            Record<string, string> = {
                "1m": "1",
                "3m": "3",
                "5m": "5",
                "10m": "10",
                "15m": "15",
                "30m": "30",
                "1h": "60",
                "1d": "D",
                "1w": "W",
                "1mo": "M",
            };

        return (
            map[value] ??
            resolution
        );
    }
}
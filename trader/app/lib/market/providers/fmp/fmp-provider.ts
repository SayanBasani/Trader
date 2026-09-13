import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";
import type { HttpClient } from "@/lib/market/client";
import { AuthStrategy } from "@/lib/market/providers/auth-strategy";
import { BaseMarketProvider } from "@/lib/market/providers/base-market-provider";

interface FmpSearchItem {
    symbol?: string;
    name?: string;
    currency?: string;
    exchange?: string;
    exchangeShortName?: string;
    stockExchange?: string;
    type?: string;
}

interface FmpQuoteItem {
    symbol?: string;
    price?: number;
    change?: number;
    changePercentage?: number;
    changesPercentage?: number;
    open?: number;
    dayHigh?: number;
    dayLow?: number;
    previousClose?: number;
    volume?: number;
    timestamp?: number;
    currency?: string;
}

interface FmpProfileItem {
    symbol?: string;
    companyName?: string;
    description?: string;
    image?: string;
    website?: string;
    exchange?: string;
    exchangeShortName?: string;
    currency?: string;
    country?: string;
    industry?: string;
    sector?: string;
    ipoDate?: string;
    marketCap?: number;
    mktCap?: number;
    fullTimeEmployees?: number;
}

interface FmpHistoricalItem {
    date?: string;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    volume?: number;
}

interface FmpNewsItem {
    symbol?: string;
    title?: string;
    text?: string;
    content?: string;
    image?: string;
    site?: string;
    url?: string;
    publishedDate?: string;
}

interface FmpMarketHours {
    exchange?: string;
    openingHour?: string;
    closingHour?: string;
    timezone?: string;
}

export class FmpProvider extends BaseMarketProvider {
    public readonly name = "fmp";
    protected readonly authStrategy = AuthStrategy.QUERY;
    protected readonly authKeyName = "apikey";

    constructor(
        httpClient: HttpClient,
        apiKey: string,
    ) {
        super(
            httpClient,
            apiKey,
        );
    }

    async searchStocks(
        query: string,
    ): Promise<SearchResults> {
        const response =
            await this.get<FmpSearchItem[]>(
                "search-symbol",
                {
                    query,
                    limit: 20,
                },
            );

        return (response ?? [])
            .filter(
                (item) =>
                    Boolean(
                        item.symbol,
                    ),
            )
            .map(
                (item) => ({
                    symbol:
                        item.symbol ?? "",
                    name:
                        item.name ??
                        item.symbol ??
                        "",
                    exchange:
                        item.exchange ??
                        item.stockExchange ??
                        item.exchangeShortName ??
                        "",
                    exchangeCode:
                        item.exchangeShortName ??
                        "",
                    currency:
                        item.currency ??
                        "",
                    country: "",
                    type:
                        item.type ??
                        (
                            item.exchangeShortName ===
                            "CRYPTO"
                                ? "Cryptocurrency"
                                : "Common Stock"
                        ),
                }),
            );
    }

    async getQuote(
        symbol: string,
    ): Promise<Quote> {
        const quoteSymbol =
            this.normalizeQuoteSymbol(
                symbol,
            );

        const response =
            await this.get<FmpQuoteItem[]>(
                "quote",
                {
                    symbol: quoteSymbol,
                },
            );

        const item =
            response?.[0];

        if (!item) {
            throw new Error(
                `FMP quote not found for "${symbol}".`,
            );
        }

        return {
            symbol:
                item.symbol ??
                quoteSymbol,
            price:
                Number(
                    item.price ?? 0,
                ),
            change:
                Number(
                    item.change ?? 0,
                ),
            changePercent:
                Number(
                    item.changePercentage ??
                        item.changesPercentage ??
                        0,
                ),
            open:
                Number(
                    item.open ?? 0,
                ),
            high:
                Number(
                    item.dayHigh ?? 0,
                ),
            low:
                Number(
                    item.dayLow ?? 0,
                ),
            previousClose:
                Number(
                    item.previousClose ??
                        0,
                ),
            volume:
                Number(
                    item.volume ?? 0,
                ),
            timestamp:
                Number(
                    item.timestamp ??
                        Math.floor(
                            Date.now() /
                                1000,
                        ),
                ),
            currency:
                item.currency ??
                "USD",
        };
    }

    async getCompany(
        symbol: string,
    ): Promise<Company> {
        const response =
            await this.get<FmpProfileItem[]>(
                "profile",
                {
                    symbol,
                },
            );

        const item =
            response?.[0];

        if (!item) {
            throw new Error(
                `FMP company profile not found for "${symbol}".`,
            );
        }

        return {
            symbol:
                item.symbol ??
                symbol,
            name:
                item.companyName ??
                "",
            description:
                item.description ??
                "",
            logo:
                item.image ??
                "",
            website:
                item.website ??
                "",
            exchange:
                item.exchange ??
                "",
            exchangeCode:
                item.exchangeShortName ??
                "",
            currency:
                item.currency ??
                "",
            country:
                item.country ??
                "",
            industry:
                item.industry ??
                "",
            sector:
                item.sector ??
                "",
            ipoDate:
                item.ipoDate ??
                "",
            marketCap:
                Number(
                    item.marketCap ??
                        item.mktCap ??
                        0,
                ),
            employeeCount:
                Number(
                    item.fullTimeEmployees ??
                        0,
                ),
        };
    }

    async getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<Candles> {
        const interval =
            this.convertResolution(
                resolution,
            );

        if (
            interval === "1day" ||
            interval === "1week" ||
            interval === "1month"
        ) {
            return this.getDailyCandles(
                symbol,
                from,
                to,
            );
        }

        const response =
            await this.get<FmpHistoricalItem[]>(
                `historical-chart/${interval}`,
                {
                    symbol,
                    from:
                        this.formatDate(
                            from,
                        ),
                    to:
                        this.formatDate(
                            to,
                        ),
                },
            );

        return this.mapCandles(
            response,
        );
    }

    async getMarketNews( category?: string, ): Promise<NewsList> {
        const normalizedCategory = category?.trim().toLowerCase();

        let endpoint = "news/general-latest";
        let query:
            Record<
                string,
                string | number | boolean | undefined
            > = {
                limit: 20,
            };

        if (
            normalizedCategory ===
            "stock"
        ) {
            endpoint = "news/stock";

            query = {
                limit: 20,
            };
        }

        if (
            normalizedCategory ===
            "crypto"
        ) {
            endpoint = "news/crypto";

            query = {
                limit: 20,
            };
        }

        const response =
            await this.get<FmpNewsItem[]>(
                endpoint,
                query,
            );

        return (response ?? [])
            .map(
                (item, index) => ({
                    id:
                        `${item.symbol ?? "news"}-${item.publishedDate ?? index}`,

                    headline:
                        item.title ??
                        "",

                    summary:
                        item.text ??
                        item.content ??
                        "",

                    image:
                        item.image ??
                        "",

                    source:
                        item.site ??
                        "FMP",

                    url:
                        item.url ??
                        "",

                    publishedAt:
                        item.publishedDate
                            ? Math.floor(
                                new Date(
                                    item.publishedDate,
                                ).getTime() /
                                    1000,
                            )
                            : 0,
                }),
            );
    }

    async getMarketStatus(
        exchange = "NYSE",
    ): Promise<MarketStatus> {
        const response =
            await this.get<FmpMarketHours[]>(
                "exchange-market-hours",
                {
                    exchange,
                },
            );

        const item =
            response?.[0];

        const now =
            new Date();

        return {
            exchange,
            isOpen:
                this.isMarketOpen(
                    item,
                    now,
                ),
            timezone:
                item?.timezone ??
                "America/New_York",
            currentTime:
                now.toISOString(),
            nextOpen: "",
            nextClose: "",
        };
    }

    private async getDailyCandles(
        symbol: string,
        from: number,
        to: number,
    ): Promise<Candles> {
        const response =
            await this.get<
                | FmpHistoricalItem[]
                | {
                      historical?: FmpHistoricalItem[];
                  }
            >(
                "historical-price-eod/full",
                {
                    symbol,
                    from:
                        this.formatDate(
                            from,
                        ),
                    to:
                        this.formatDate(
                            to,
                        ),
                },
            );

        if (Array.isArray(response)) {
            return this.mapCandles(
                response,
            );
        }

        return this.mapCandles(
            response?.historical,
        );
    }

    private mapCandles(
        response:
            | FmpHistoricalItem[]
            | undefined,
    ): Candles {
        return (response ?? [])
            .filter(
                (item) =>
                    Boolean(
                        item.date,
                    ),
            )
            .map(
                (item) => ({
                    time:
                        Math.floor(
                            new Date(
                                `${item.date}T00:00:00Z`,
                            ).getTime() /
                                1000,
                        ),
                    open:
                        Number(
                            item.open ?? 0,
                        ),
                    high:
                        Number(
                            item.high ?? 0,
                        ),
                    low:
                        Number(
                            item.low ?? 0,
                        ),
                    close:
                        Number(
                            item.close ?? 0,
                        ),
                    volume:
                        Number(
                            item.volume ?? 0,
                        ),
                }),
            )
            .sort(
                (a, b) =>
                    a.time - b.time,
            );
    }

    private normalizeQuoteSymbol(
        symbol: string,
    ): string {
        const normalized =
            symbol.trim().toUpperCase();

        if (
            normalized.endsWith("USD")
        ) {
            return normalized;
        }

        const cryptoSymbols = new Set([
            "BTC",
            "ETH",
            "SOL",
            "XRP",
            "ADA",
            "DOGE",
            "DOT",
            "AVAX",
            "LINK",
            "LTC",
            "BCH",
            "XLM",
            "TRX",
            "MATIC",
        ]);

        if (
            cryptoSymbols.has(normalized)
        ) {
            return `${normalized}USD`;
        }

        return normalized;
    }

    private convertResolution(
        resolution: string,
    ): string {
        const map: Record<
            string,
            string
        > = {
            "1": "1min",
            "5": "5min",
            "15": "15min",
            "30": "30min",
            "60": "1hour",
            "120": "1hour",
            "240": "4hour",
            D: "1day",
            W: "1week",
            M: "1month",
        };

        return (
            map[resolution] ??
            resolution
        );
    }

    private formatDate(
        timestamp: number,
    ): string {
        return new Date(
            timestamp * 1000,
        )
            .toISOString()
            .slice(0, 10);
    }

    private isMarketOpen(
        marketHours:
            | FmpMarketHours
            | undefined,
        now: Date,
    ): boolean {
        if (
            !marketHours?.openingHour ||
            !marketHours?.closingHour
        ) {
            return false;
        }

        const timezone =
            marketHours.timezone ??
            "America/New_York";

        const formatter =
            new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                },
            );

        const parts =
            formatter
                .formatToParts(now);

        const hour = Number(
            parts.find(
                (part) =>
                    part.type === "hour",
            )?.value ?? 0,
        );

        const minute = Number(
            parts.find(
                (part) =>
                    part.type === "minute",
            )?.value ?? 0,
        );

        const currentMinutes =
            hour * 60 + minute;

        const [
            openHour,
            openMinute,
        ] =
            marketHours.openingHour
                .split(":")
                .map(Number);

        const [
            closeHour,
            closeMinute,
        ] =
            marketHours.closingHour
                .split(":")
                .map(Number);

        const openingMinutes =
            openHour * 60 +
            openMinute;

        const closingMinutes =
            closeHour * 60 +
            closeMinute;

        return (
            currentMinutes >=
                openingMinutes &&
            currentMinutes <
                closingMinutes
        );
    }
}
import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";

import type { HttpClient } from "@/lib/market/client";

import { AuthStrategy } from "@/lib/market/providers/auth-strategy";
import { BaseMarketProvider } from "@/lib/market/providers/base-market-provider";

interface FinnhubSearchResponse {
    count: number;
    result: Array<{
        description?: string;
        displaySymbol?: string;
        symbol?: string;
        type?: string;
    }>;
}

interface FinnhubQuoteResponse {
    c?: number;
    d?: number;
    dp?: number;
    h?: number;
    l?: number;
    o?: number;
    pc?: number;
    t?: number;
}

interface FinnhubCompanyResponse {
    country?: string;
    currency?: string;
    exchange?: string;
    ipo?: string;
    logo?: string;
    marketCapitalization?: number;
    name?: string;
    phone?: string;
    shareOutstanding?: number;
    ticker?: string;
    weburl?: string;
    finnhubIndustry?: string;
}

interface FinnhubCandleResponse {
    c?: number[];
    h?: number[];
    l?: number[];
    o?: number[];
    s?: string;
    t?: number[];
    v?: number[];
}

interface FinnhubNewsItem {
    category?: string;
    datetime?: number;
    headline?: string;
    id?: number;
    image?: string;
    related?: string;
    source?: string;
    summary?: string;
    url?: string;
}

interface FinnhubMarketStatusResponse {
    exchange?: string;
    holiday?: string | null;
    isOpen?: boolean;
    session?: string;
    t?: number;
}

export class FinnhubProvider extends BaseMarketProvider {
    public readonly name = "finnhub";

    protected readonly authStrategy = AuthStrategy.QUERY;

    protected readonly authKeyName = "token";

    constructor(
        httpClient: HttpClient,
        apiKey: string,
    ) {
        super(httpClient, apiKey);
    }

    async searchStocks(
        query: string,
    ): Promise<SearchResults> {
        const response =
            await this.get<FinnhubSearchResponse>(
                "search",
                {
                    q: query,
                },
            );

        return response.result.map(
            (item) => ({
                symbol: item.symbol ?? "",
                name: item.description ?? "",
                exchange: "",
                exchangeCode: "",
                currency: "",
                country: "",
                type: item.type ?? "",
            }),
        );
    }

    async getQuote(
        symbol: string,
    ): Promise<Quote> {
        const response =
            await this.get<FinnhubQuoteResponse>(
                "quote",
                {
                    symbol,
                },
            );

        return {
            symbol,
            price: response.c ?? 0,
            change: response.d ?? 0,
            changePercent: response.dp ?? 0,
            open: response.o ?? 0,
            high: response.h ?? 0,
            low: response.l ?? 0,
            previousClose: response.pc ?? 0,
            volume: 0,
            timestamp: response.t ?? 0,
            currency: "",
        };
    }

    async getCompany(
        symbol: string,
    ): Promise<Company> {
        const response =
            await this.get<FinnhubCompanyResponse>(
                "stock/profile2",
                {
                    symbol,
                },
            );

        return {
            symbol:
                response.ticker ??
                symbol,

            name:
                response.name ??
                "",

            description:
                "",

            logo:
                response.logo ??
                "",

            website:
                response.weburl ??
                "",

            exchange:
                response.exchange ??
                "",

            exchangeCode:
                "",

            currency:
                response.currency ??
                "",

            country:
                response.country ??
                "",

            industry:
                response.finnhubIndustry ??
                "",

            sector:
                "",

            ipoDate:
                response.ipo ??
                "",

            marketCap:
                response.marketCapitalization ??
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
        const response =
            await this.get<FinnhubCandleResponse>(
                "stock/candle",
                {
                    symbol,
                    resolution,
                    from,
                    to,
                },
            );

        if (
            response.s !== "ok" ||
            !response.t ||
            !response.o ||
            !response.h ||
            !response.l ||
            !response.c ||
            !response.v
        ) {
            return [];
        }

        const candles: Candles = [];

        for (
            let index = 0;
            index < response.t.length;
            index++
        ) {
            candles.push({
                time: response.t[index] ?? 0,
                open: response.o[index] ?? 0,
                high: response.h[index] ?? 0,
                low: response.l[index] ?? 0,
                close: response.c[index] ?? 0,
                volume: response.v[index] ?? 0,
            });
        }

        return candles;
    }

    async getMarketNews(
        category = "general",
    ): Promise<NewsList> {
        const response =
            await this.get<FinnhubNewsItem[]>(
                "news",
                {
                    category,
                },
            );

        return response.map(
            (item) => ({
                id:
                    String(item.id ?? ""),

                headline:
                    item.headline ??
                    "",

                summary:
                    item.summary ??
                    "",

                image:
                    item.image ??
                    "",

                source:
                    item.source ??
                    "",

                url:
                    item.url ??
                    "",

                publishedAt:
                    item.datetime ??
                    0,
            }),
        );
    }

    async getMarketStatus(
        exchange = "US",
    ): Promise<MarketStatus> {
        const response =
            await this.get<FinnhubMarketStatusResponse>(
                "stock/market-status",
                {
                    exchange,
                },
            );

        const currentTime =
            response.t
                ? new Date(
                      response.t * 1000,
                  ).toISOString()
                : "";

        return {
            exchange:
                response.exchange ??
                exchange,

            isOpen:
                response.isOpen ??
                false,

            timezone:
                "",

            currentTime,

            nextOpen:
                "",

            nextClose:
                "",
        };
    }
}
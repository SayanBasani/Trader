import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";
import type { HttpClient, } from "@/lib/market/client";
import { AuthStrategy, } from "@/lib/market/providers/auth-strategy";
import { BaseMarketProvider, } from "@/lib/market/providers/base-market-provider";
import { normalizeSymbol, } from "@/lib/market/utils/symbol-utils";

interface TwelveDataSearchResponse {
    data?: Array<{
        symbol?: string;
        instrument_name?: string;
        exchange?: string;
        mic_code?: string;
        exchange_timezone?: string;
        instrument_type?: string;
        country?: string;
        currency?: string;
    }>;
}


interface TwelveDataQuoteResponse {
    symbol?: string;
    name?: string;
    exchange?: string;
    mic_code?: string;
    currency?: string;

    datetime?: string;

    open?: string;
    high?: string;
    low?: string;
    close?: string;

    previous_close?: string;
    change?: string;
    percent_change?: string;

    volume?: string;
}


interface TwelveDataProfileResponse {
    symbol?: string;
    name?: string;
    exchange?: string;
    mic_code?: string;
    currency?: string;
    country?: string;

    type?: string;

    description?: string;
    sector?: string;
    industry?: string;

    ipo_date?: string;

    market_capitalization?: number;
    employees?: number;

    website?: string;
    logo_url?: string;
}


interface TwelveDataTimeSeriesResponse {
    status?: string;

    values?: Array<{
        datetime?: string;

        open?: string;
        high?: string;
        low?: string;
        close?: string;
        volume?: string;
    }>;
}


export class TwelveDataProvider
    extends BaseMarketProvider {

    public readonly name = "twelve-data";

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
            await this.get<TwelveDataSearchResponse>(
                "symbol_search",
                {
                    symbol: query,
                },
            );


        return (
            response.data ?? []
        )
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
                        item.instrument_name ??
                        item.symbol ??
                        "",

                    exchange:
                        item.exchange ??
                        "",

                    exchangeCode:
                        item.mic_code ??
                        "",

                    currency:
                        item.currency ??
                        "",

                    country:
                        item.country ??
                        "",

                    type:
                        item.instrument_type ??
                        "",
                }),
            );
    }


    async getQuote( symbol: string, ): Promise<Quote> {
        const normalized = normalizeSymbol( symbol, );
        const response = await this.get<TwelveDataQuoteResponse>(
                                "quote",
                                { 
                                    symbol: normalized.providerSymbol, 
                                    exchange: normalized.exchange,
                                },
                            );

        if (
            typeof response.close !== "string" ||
            response.close.trim() === ""
        ) {
            throw new Error(
                `Twelve Data quote unavailable for "${symbol}".`,
            );
        }

        const price = Number(response.close,);

        if (
            !Number.isFinite(price) ||
            price <= 0
        ) {
            throw new Error(
                `Twelve Data returned an invalid quote for "${symbol}".`,
            );
        }


        const timestamp =
            response.datetime
                ? Math.floor(
                      new Date(
                          response.datetime,
                      ).getTime() /
                          1000,
                  )
                : Math.floor(
                      Date.now() /
                          1000,
                  );


        return {
            symbol: symbol,
            price,
            change:
                Number(
                    response.change ??
                    0,
                ),

            changePercent:
                Number(
                    response.percent_change ??
                    0,
                ),

            open:
                Number(
                    response.open ??
                    0,
                ),

            high:
                Number(
                    response.high ??
                    0,
                ),

            low:
                Number(
                    response.low ??
                    0,
                ),

            previousClose:
                Number(
                    response.previous_close ??
                    0,
                ),

            volume:
                Number(
                    response.volume ??
                    0,
                ),

            timestamp,

            currency:
                response.currency ??
                "",
        };
    }


    async getCompany(
        symbol: string,
    ): Promise<Company> {

        const response =
            await this.get<TwelveDataProfileResponse>(
                "profile",
                {
                    symbol,
                },
            );


        return {
            symbol:
                response.symbol ??
                symbol,

            name:
                response.name ??
                "",

            description:
                response.description ??
                "",

            logo:
                response.logo_url ??
                "",

            website:
                response.website ??
                "",

            exchange:
                response.exchange ??
                "",

            exchangeCode:
                response.mic_code ??
                "",

            currency:
                response.currency ??
                "",

            country:
                response.country ??
                "",

            industry:
                response.industry ??
                "",

            sector:
                response.sector ??
                "",

            ipoDate:
                response.ipo_date ??
                "",

            marketCap:
                Number(
                    response.market_capitalization ??
                    0,
                ),

            employeeCount:
                Number(
                    response.employees ??
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


        const startDate =
            new Date(
                from * 1000,
            ).toISOString();


        const endDate =
            new Date(
                to * 1000,
            ).toISOString();

        const normalized = normalizeSymbol( symbol, );
        const response =
            await this.get<TwelveDataTimeSeriesResponse>(
                "time_series",
                {
                    symbol: normalized.providerSymbol,
                    exchange: normalized.exchange,
                    interval,
                    start_date: startDate,
                    end_date: endDate,
                    timezone: "UTC",
                },
            );


        if (
            !response.values ||
            response.values.length === 0
        ) {
            return [];
        }


        return response.values
            .map(
                (item) => ({
                    time:
                        item.datetime
                            ? Math.floor(
                                  new Date(
                                      item.datetime,
                                  ).getTime() /
                                      1000,
                              )
                            : 0,

                    open:
                        Number(
                            item.open ??
                            0,
                        ),

                    high:
                        Number(
                            item.high ??
                            0,
                        ),

                    low:
                        Number(
                            item.low ??
                            0,
                        ),

                    close:
                        Number(
                            item.close ??
                            0,
                        ),

                    volume:
                        Number(
                            item.volume ??
                            0,
                        ),
                }),
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
            "Twelve Data market news is not implemented yet.",
        );
    }


    async getMarketStatus(
        _exchange?: string,
    ): Promise<MarketStatus> {

        throw new Error(
            "Twelve Data market status is not implemented yet.",
        );
    }


    private convertResolution(
        resolution: string,
    ): string {

        const map:
            Record<string, string> = {

            "1":
                "1min",

            "5":
                "5min",

            "15":
                "15min",

            "30":
                "30min",

            "45":
                "45min",

            "60":
                "1h",

            "120":
                "2h",

            "240":
                "4h",

            "480":
                "8h",

            D:
                "1day",

            W:
                "1week",

            M:
                "1month",
        };


        return (
            map[resolution] ??
            resolution
        );
    }
}
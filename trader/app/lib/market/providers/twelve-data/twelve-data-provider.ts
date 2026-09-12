import type {
    Candles,
    Company,
    MarketStatus,
    NewsList,
    Quote,
    SearchResults,
} from "@/lib/market/types";

import type { HttpClient } from "@/lib/market/client";

import { AuthStrategy } from "@/lib/market/providers/auth-strategy";
import { BaseMarketProvider } from "@/lib/market/providers/base-market-provider";

interface TwelveDataTimeSeriesResponse {
    status?: string;

    message?: string;

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

    protected readonly authStrategy =
        AuthStrategy.QUERY;

    protected readonly authKeyName =
        "apikey";

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
        _query: string,
    ): Promise<SearchResults> {
        throw new Error(
            "Twelve Data stock search is not implemented yet.",
        );
    }

    async getQuote(
        _symbol: string,
    ): Promise<Quote> {
        throw new Error(
            "Twelve Data quote is not implemented yet.",
        );
    }

    async getCompany(
        _symbol: string,
    ): Promise<Company> {
        throw new Error(
            "Twelve Data company lookup is not implemented yet.",
        );
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

        const response =
            await this.get<TwelveDataTimeSeriesResponse>(
                "time_series",
                {
                    symbol,
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
            .map((item) => ({
                time:
                    item.datetime
                        ? Math.floor(
                              new Date(
                                  item.datetime,
                              ).getTime() / 1000,
                          )
                        : 0,

                open:
                    Number(item.open ?? 0),

                high:
                    Number(item.high ?? 0),

                low:
                    Number(item.low ?? 0),

                close:
                    Number(item.close ?? 0),

                volume:
                    Number(item.volume ?? 0),
            }))
            .sort(
                (a, b) =>
                    a.time - b.time,
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

        const map: Record<
            string,
            string
        > = {
            "1": "1min",
            "5": "5min",
            "15": "15min",
            "30": "30min",
            "45": "45min",
            "60": "1h",
            "120": "2h",
            "240": "4h",
            "480": "8h",
            D: "1day",
            W: "1week",
            M: "1month",
        };

        return (
            map[resolution] ??
            resolution
        );
    }
}
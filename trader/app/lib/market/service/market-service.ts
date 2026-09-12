import type {
    Candles,
    Company,
    MarketStatus,
    NewsList,
    Quote,
    SearchResults,
} from "@/lib/market/types";

import {
    MARKET_ENV,
} from "@/lib/market/config/env";

import {
    MarketProviderName,
} from "@/lib/market/config/providers";

import type {
    MarketProvider,
} from "@/lib/market/interfaces/market-provider";

import {
    ServiceContainer,
} from "@/lib/market/container/service-container";

import {
    TwelveDataProvider,
} from "@/lib/market/providers/twelve-data/twelve-data-provider";

export class MarketService {
    private readonly provider: MarketProvider;

    constructor(
        providerName: MarketProviderName =
            MARKET_ENV.provider,
    ) {
        this.provider =
            ServiceContainer.getProvider(
                providerName,
            );
    }

    async searchStocks(
        query: string,
    ): Promise<SearchResults> {
        return this.provider.searchStocks(
            query,
        );
    }

    async getQuote(
        symbol: string,
    ): Promise<Quote> {
        return this.provider.getQuote(
            symbol,
        );
    }

    async getCompany(
        symbol: string,
    ): Promise<Company> {
        return this.provider.getCompany(
            symbol,
        );
    }

    async getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<Candles> {
        const provider =
            ServiceContainer.getProvider(
                MarketProviderName.TWELVE_DATA,
            );
        return provider.getHistoricalCandles(
            symbol,
            resolution,
            from,
            to,
        );
    }

    async getMarketNews(
        category?: string,
    ): Promise<NewsList> {
        return this.provider.getMarketNews(
            category,
        );
    }

    async getMarketStatus(
        exchange?: string,
    ): Promise<MarketStatus> {
        return this.provider.getMarketStatus(
            exchange,
        );
    }
}
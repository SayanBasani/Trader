import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";
import { MARKET_ENV, } from "@/lib/market/config/env";
import { MarketProviderName, } from "@/lib/market/config/providers";
import { MarketOperation, ProviderManager, } from "@/lib/market/manager";
import { ServiceContainer, } from "@/lib/market/container/service-container";
import { getUsMarketStatus,} from "@/lib/market/utils/us-market-status";

export class MarketService {

    private readonly providerManager:
        ProviderManager;


    constructor( providerName: MarketProviderName = MARKET_ENV.provider, ) {
        this.providerManager = ServiceContainer.getProviderManager( providerName, );
    }


    async searchStocks( query: string, ): Promise<SearchResults> {

        return this.providerManager.executeWithFallback(
            MarketOperation.SEARCH,
            (provider) =>
                provider.searchStocks(
                    query,
                ),
        );
    }


    async getQuote( symbol: string, ): Promise<Quote> {

        return this.providerManager.executeWithFallback(
            MarketOperation.QUOTE,
            (provider) =>
                provider.getQuote(
                    symbol,
                ),
        );
    }


    async getCompany( symbol: string, ): Promise<Company> {

        return this.providerManager.executeWithFallback(
            MarketOperation.COMPANY,
            (provider) =>
                provider.getCompany(
                    symbol,
                ),
        );
    }


    async getHistoricalCandles( symbol: string, resolution: string, from: number, to: number, ): Promise<Candles> {

        return this.providerManager.executeWithFallback(
            MarketOperation.CANDLES,
            (provider) =>
                provider.getHistoricalCandles(
                    symbol,
                    resolution,
                    from,
                    to,
                ),
        );
    }


    async getMarketNews( category?: string, ): Promise<NewsList> {

        return this.providerManager.executeWithFallback(
            MarketOperation.NEWS,
            (provider) =>
                provider.getMarketNews(
                    category,
                ),
        );
    }


    async getMarketStatus( exchange = "NASDAQ", ): Promise<MarketStatus> {
        
        return getUsMarketStatus(
            exchange,
        );
    }
    
    async getMarketStatus_old( exchange?: string, ): Promise<MarketStatus> {
        return this.providerManager.executeWithFallback(
            MarketOperation.STATUS,
            (provider) =>
                provider.getMarketStatus(
                    exchange,
                ),
        );
    }
}
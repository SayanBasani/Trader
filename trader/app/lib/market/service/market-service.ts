import type { Candles, Company, MarketStatus, NewsList, Quote, SearchResults, } from "@/lib/market/types";
import { MARKET_ENV, } from "@/lib/market/config/env";
import { MarketProviderName, } from "@/lib/market/config/providers";
import { MarketOperation, ProviderManager, } from "@/lib/market/manager";
import { ServiceContainer, } from "@/lib/market/container/service-container";
import { getUsMarketStatus,} from "@/lib/market/utils/us-market-status";
import { normalizeSymbol, } from "@/lib/market/utils/symbol-utils";
import { AssetType, MarketRegion, } from "@/lib/market/models/asset";
import { ExchangeCode, } from "@/lib/market/models/exchange";
import { aggregateCandles, resolveMarketInterval, } from "@/lib/market/utils/interval-utils";

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

        const normalized =
            normalizeSymbol(
                symbol,
            );

        return this.providerManager.executeWithFallback(
            MarketOperation.QUOTE,

            (provider) =>
                provider.getQuote(
                    normalized.providerSymbol,
                ),

            {
                assetType: AssetType.STOCK,
                region:
                    normalized.exchange === ExchangeCode.NSE ||
                    normalized.exchange === ExchangeCode.BSE
                        ? MarketRegion.INDIA
                        : MarketRegion.US,
                exchange: normalized.exchange,
            },
        );
    }

    async getCompany( symbol: string, ): Promise<Company> {

        const normalized = normalizeSymbol( symbol, );

        return this.providerManager.executeWithFallback(
            MarketOperation.COMPANY,

            (provider) =>
                provider.getCompany(
                    normalized.providerSymbol,
                ),

            {
                assetType: AssetType.STOCK,
                region:
                    normalized.exchange === ExchangeCode.NSE ||
                    normalized.exchange === ExchangeCode.BSE
                        ? MarketRegion.INDIA
                        : MarketRegion.US,
                exchange: normalized.exchange,
            },
        );
    }


    async getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<Candles> {

        const normalized =
            normalizeSymbol(
                symbol,
            );

        const interval =
            resolveMarketInterval(
                resolution,
            );

        const candles =
            await this.providerManager.executeWithFallback(
                MarketOperation.CANDLES,

                (provider) =>
                    provider.getHistoricalCandles(
                        normalized.providerSymbol,
                        interval.resolution,
                        from,
                        to,
                    ),

                {
                    assetType: AssetType.STOCK,
                    region:
                        normalized.exchange === ExchangeCode.NSE ||
                        normalized.exchange === ExchangeCode.BSE
                            ? MarketRegion.INDIA
                            : MarketRegion.US,
                    exchange:
                        normalized.exchange,
                },
            );

        if (
            !interval.aggregate ||
            !interval.bucketSeconds
        ) {
            return candles;
        }

        return aggregateCandles(
            candles,
            interval.bucketSeconds,
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
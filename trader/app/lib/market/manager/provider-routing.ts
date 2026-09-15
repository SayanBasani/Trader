import {
    MarketProviderName,
} from "@/lib/market/config/providers";

import {
    AssetType,
    MarketRegion,
} from "@/lib/market/models/asset";

import {
    ExchangeCode,
} from "@/lib/market/models/exchange";


export interface ProviderRoutingContext {
    assetType?: AssetType;
    region?: MarketRegion;
    exchange?: ExchangeCode;
    preferredProviders?: readonly MarketProviderName[];
}


const REGION_PREFERENCES:
    Record<
        MarketRegion,
        readonly MarketProviderName[]
    > = {

    [MarketRegion.INDIA]: [
        MarketProviderName.UPSTOX,
        MarketProviderName.ANGEL_ONE,
        MarketProviderName.FYERS,
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
    ],

    [MarketRegion.US]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
        MarketProviderName.FINNHUB,
        MarketProviderName.ALPHA_VANTAGE,
    ],

    [MarketRegion.GLOBAL]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.FINNHUB,
        MarketProviderName.POLYGON,
        MarketProviderName.ALPHA_VANTAGE,
    ],
};


const EXCHANGE_PREFERENCES:
    Partial<
        Record<
            ExchangeCode,
            readonly MarketProviderName[]
        >
    > = {

    [ExchangeCode.NSE]: [
        MarketProviderName.UPSTOX,
        MarketProviderName.ANGEL_ONE,
        MarketProviderName.FYERS,
    ],

    [ExchangeCode.BSE]: [
        MarketProviderName.UPSTOX,
        MarketProviderName.ANGEL_ONE,
        MarketProviderName.FYERS,
    ],

    [ExchangeCode.NASDAQ]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
        MarketProviderName.FINNHUB,
        MarketProviderName.ALPHA_VANTAGE,
    ],

    [ExchangeCode.NYSE]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
        MarketProviderName.FINNHUB,
        MarketProviderName.ALPHA_VANTAGE,
    ],
};


const ASSET_PREFERENCES:
    Partial<
        Record<
            AssetType,
            readonly MarketProviderName[]
        >
    > = {

    [AssetType.STOCK]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.FINNHUB,
        MarketProviderName.POLYGON,
        MarketProviderName.ALPHA_VANTAGE,
    ],

    [AssetType.CRYPTO]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.FINNHUB,
    ],

    [AssetType.ETF]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
        MarketProviderName.FINNHUB,
    ],

    [AssetType.INDEX]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
        MarketProviderName.FINNHUB,
    ],

    [AssetType.FOREX]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.FINNHUB,
    ],

    [AssetType.COMMODITY]: [
        MarketProviderName.TWELVE_DATA,
        MarketProviderName.FMP,
        MarketProviderName.POLYGON,
    ],
};


export function getPreferredProviders(
    context: ProviderRoutingContext = {},
): readonly MarketProviderName[] {

    if (context.preferredProviders?.length) {
        return [
            ...new Set(
                context.preferredProviders,
            ),
        ];
    }


    const providers: MarketProviderName[] = [];


    /*
     * Priority 1:
     * Exchange-specific providers.
     */
    if (context.exchange) {

        const exchangeProviders =
            EXCHANGE_PREFERENCES[
                context.exchange
            ];

        if (exchangeProviders?.length) {
            providers.push(
                ...exchangeProviders,
            );
        }
    }


    /*
     * Priority 2:
     * Region-specific providers.
     *
     * Only add providers that were not already
     * added by the exchange preference.
     */
    if (context.region) {

        const regionProviders =
            REGION_PREFERENCES[
                context.region
            ];

        if (regionProviders?.length) {
            providers.push(
                ...regionProviders,
            );
        }
    }


    /*
     * Priority 3:
     * Asset-specific providers.
     */
    if (context.assetType) {

        const assetProviders =
            ASSET_PREFERENCES[
                context.assetType
            ];

        if (assetProviders?.length) {
            providers.push(
                ...assetProviders,
            );
        }
    }


    /*
     * Remove duplicates while preserving
     * the priority order.
     */
    return [
        ...new Set(
            providers,
        ),
    ];
}
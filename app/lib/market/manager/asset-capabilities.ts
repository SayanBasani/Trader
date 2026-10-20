import {
    AssetType,
} from "@/lib/market/models/asset";

import {
    MarketProviderName,
} from "@/lib/market/config/providers";

export type AssetCapabilities =
    Record<AssetType, boolean>;

export const PROVIDER_ASSET_CAPABILITIES:
    Record<
        MarketProviderName,
        AssetCapabilities
    > = {
        [MarketProviderName.FINNHUB]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: true,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: true,
            [AssetType.COMMODITY]: false,
        },

        [MarketProviderName.TWELVE_DATA]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: true,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: true,
            [AssetType.COMMODITY]: true,
        },

        [MarketProviderName.FMP]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: true,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: true,
            [AssetType.COMMODITY]: true,
        },

        [MarketProviderName.POLYGON]: {
            [AssetType.STOCK]: false,
            [AssetType.CRYPTO]: false,
            [AssetType.ETF]: false,
            [AssetType.INDEX]: false,
            [AssetType.FOREX]: false,
            [AssetType.COMMODITY]: false,
        },

        [MarketProviderName.ALPHA_VANTAGE]: {
            [AssetType.STOCK]: false,
            [AssetType.CRYPTO]: false,
            [AssetType.ETF]: false,
            [AssetType.INDEX]: false,
            [AssetType.FOREX]: false,
            [AssetType.COMMODITY]: false,
        },
        [MarketProviderName.UPSTOX]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: false,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: false,
            [AssetType.COMMODITY]: true,
        },
        [MarketProviderName.ANGEL_ONE]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: false,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: false,
            [AssetType.COMMODITY]: true,
        },

        [MarketProviderName.FYERS]: {
            [AssetType.STOCK]: true,
            [AssetType.CRYPTO]: false,
            [AssetType.ETF]: true,
            [AssetType.INDEX]: true,
            [AssetType.FOREX]: false,
            [AssetType.COMMODITY]: true,
        },
    };

export function supportsAsset(
    providerName: MarketProviderName,
    assetType: AssetType,
): boolean {
    return (
        PROVIDER_ASSET_CAPABILITIES[
            providerName
        ]?.[assetType] ?? false
    );
}
import type {
    AssetType,
} from "@/lib/market/models/asset";

import type {
    MarketProviderName,
} from "@/lib/market/config/providers";

export interface ProviderSymbol {
    symbol: string;

    provider: MarketProviderName;

    assetType: AssetType;

    exchange?: string;

    currency?: string;
}
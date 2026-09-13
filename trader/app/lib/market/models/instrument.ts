import type {
    AssetType,
    MarketCurrency,
    MarketRegion,
} from "@/lib/market/models/asset";

import type {
    ExchangeCode,
} from "@/lib/market/models/exchange";

export interface Instrument {
    symbol: string;

    name: string;

    assetType: AssetType;

    region: MarketRegion;

    exchange: ExchangeCode;

    currency: MarketCurrency;

    providerSymbol?: string;

    providerName?: string;
}
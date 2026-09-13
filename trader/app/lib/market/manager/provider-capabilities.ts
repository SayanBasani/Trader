import {
    MarketProviderName,
} from "@/lib/market/config/providers";

import {
    MarketOperation,
} from "./market-operation";

export type ProviderCapabilities = Record<
    MarketOperation,
    boolean
>;

export const PROVIDER_CAPABILITIES: Record<
    MarketProviderName,
    ProviderCapabilities
> = {
    [MarketProviderName.FINNHUB]: {
        [MarketOperation.SEARCH]: true,
        [MarketOperation.QUOTE]: true,
        [MarketOperation.COMPANY]: true,
        [MarketOperation.CANDLES]: false,
        [MarketOperation.NEWS]: true,
        [MarketOperation.STATUS]: false,
    },

    [MarketProviderName.TWELVE_DATA]: {
        [MarketOperation.SEARCH]: true,
        [MarketOperation.QUOTE]: true,
        [MarketOperation.COMPANY]: true,
        [MarketOperation.CANDLES]: true,
        [MarketOperation.NEWS]: false,
        [MarketOperation.STATUS]: false,
    },

    [MarketProviderName.FMP]: {
        [MarketOperation.SEARCH]: true,
        [MarketOperation.QUOTE]: true,
        [MarketOperation.COMPANY]: true,
        [MarketOperation.CANDLES]: true,
        [MarketOperation.NEWS]: true,
        [MarketOperation.STATUS]: true,
    },

    [MarketProviderName.POLYGON]: {
        [MarketOperation.SEARCH]: false,
        [MarketOperation.QUOTE]: false,
        [MarketOperation.COMPANY]: false,
        [MarketOperation.CANDLES]: false,
        [MarketOperation.NEWS]: false,
        [MarketOperation.STATUS]: false,
    },

    [MarketProviderName.ALPHA_VANTAGE]: {
        [MarketOperation.SEARCH]: false,
        [MarketOperation.QUOTE]: false,
        [MarketOperation.COMPANY]: false,
        [MarketOperation.CANDLES]: false,
        [MarketOperation.NEWS]: false,
        [MarketOperation.STATUS]: false,
    },
};

export function supportsOperation(
    providerName: MarketProviderName,
    operation: MarketOperation,
): boolean {
    return (
        PROVIDER_CAPABILITIES[
            providerName
        ]?.[operation] ?? false
    );
}
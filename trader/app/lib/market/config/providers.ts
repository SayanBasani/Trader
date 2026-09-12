export enum MarketProviderName {
    FINNHUB = "finnhub",

    TWELVE_DATA = "twelve-data",

    FMP = "fmp",

    POLYGON = "polygon",

    ALPHA_VANTAGE = "alpha-vantage",
}

export const MARKET_PROVIDERS = [
    MarketProviderName.FINNHUB,
    MarketProviderName.TWELVE_DATA,
    MarketProviderName.FMP,
    MarketProviderName.POLYGON,
    MarketProviderName.ALPHA_VANTAGE,
] as const;

export const DEFAULT_PROVIDER = MarketProviderName.FINNHUB;

export const PROVIDER_FALLBACK_ORDER = [
    MarketProviderName.FINNHUB,
    MarketProviderName.TWELVE_DATA,
    MarketProviderName.FMP,
    MarketProviderName.POLYGON,
    MarketProviderName.ALPHA_VANTAGE,
] as const;
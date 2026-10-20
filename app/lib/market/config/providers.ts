export enum MarketProviderName {
    FINNHUB = "finnhub",

    TWELVE_DATA = "twelve-data",

    FMP = "fmp",

    POLYGON = "polygon",

    ALPHA_VANTAGE = "alpha-vantage",

    UPSTOX = "upstox",

    ANGEL_ONE = "angel-one",

    FYERS = "fyers",
}

export const MARKET_PROVIDERS = [
    MarketProviderName.FINNHUB,
    MarketProviderName.TWELVE_DATA,
    MarketProviderName.FMP,
    MarketProviderName.POLYGON,
    MarketProviderName.ALPHA_VANTAGE,
    MarketProviderName.UPSTOX,
    MarketProviderName.ANGEL_ONE,
    MarketProviderName.FYERS,
] as const;

export const DEFAULT_PROVIDER =
    MarketProviderName.FINNHUB;

export const PROVIDER_FALLBACK_ORDER = [
    MarketProviderName.FINNHUB,
    MarketProviderName.TWELVE_DATA,
    MarketProviderName.FMP,
    MarketProviderName.POLYGON,
    MarketProviderName.ALPHA_VANTAGE,
    MarketProviderName.UPSTOX,
    MarketProviderName.ANGEL_ONE,
    MarketProviderName.FYERS,
] as const;
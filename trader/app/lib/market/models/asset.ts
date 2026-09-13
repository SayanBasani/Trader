export enum AssetType {
    STOCK = "stock",
    CRYPTO = "crypto",
    ETF = "etf",
    INDEX = "index",
    FOREX = "forex",
    COMMODITY = "commodity",
}

export enum MarketRegion {
    US = "us",
    INDIA = "india",
    GLOBAL = "global",
}

export type MarketCurrency =
    | "USD"
    | "INR"
    | "EUR"
    | "GBP"
    | "JPY"
    | "USDT"
    | string;
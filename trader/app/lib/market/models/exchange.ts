export enum ExchangeCode {
    NASDAQ = "NASDAQ",
    NYSE = "NYSE",

    NSE = "NSE",
    BSE = "BSE",

    GLOBAL = "GLOBAL",
    CRYPTO = "CRYPTO",
}

export interface ExchangeInfo {
    code: ExchangeCode;
    name: string;
    region: string;
    timezone: string;
    currency: string;
}
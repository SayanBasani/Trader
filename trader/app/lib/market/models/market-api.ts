import type {
    Candles,
    Company,
    Quote,
    SearchResults,
} from "@/lib/market/types";

export interface MarketSearchRequest {
    query: string;
}

export interface MarketQuoteRequest {
    symbol: string;
}

export interface MarketCandlesRequest {
    symbol: string;
    resolution: string;
    from: number;
    to: number;
}

export interface MarketCompanyRequest {
    symbol: string;
}

export interface MarketApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export type MarketSearchResponse =
    MarketApiResponse<SearchResults>;

export type MarketQuoteResponse =
    MarketApiResponse<Quote>;

export type MarketCandlesResponse =
    MarketApiResponse<Candles>;

export type MarketCompanyResponse =
    MarketApiResponse<Company>;
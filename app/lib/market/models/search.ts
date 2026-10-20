export interface SearchResult {
    symbol: string;
    name: string;
    exchange: string;
    exchangeCode: string;
    currency: string;
    country: string;
    type: string;
}

export type SearchResults = SearchResult[];
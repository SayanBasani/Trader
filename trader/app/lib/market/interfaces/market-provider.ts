import type {
    Candles,
    Company,
    MarketStatus,
    NewsList,
    Quote,
    SearchResults,
} from "../types";

export interface MarketProvider {
    readonly name: string;

    searchStocks(query: string): Promise<SearchResults>;

    getQuote(symbol: string): Promise<Quote>;

    getCompany(symbol: string): Promise<Company>;

    getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<Candles>;

    getMarketNews(
        category?: string,
    ): Promise<NewsList>;

    getMarketStatus(
        exchange?: string,
    ): Promise<MarketStatus>;
}
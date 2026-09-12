import type { MarketProvider } from "@/lib/market/interfaces/market-provider";
import type { HttpClient } from "@/lib/market/client";
import { AuthStrategy } from "./auth-strategy";

export abstract class BaseMarketProvider implements MarketProvider {
    public abstract readonly name: string;

    protected abstract readonly authStrategy: AuthStrategy;
    protected abstract readonly authKeyName: string;

    protected constructor(
        protected readonly httpClient: HttpClient,
        protected readonly apiKey: string,
    ) {}

    protected async get<T>(
        endpoint: string,
        query: Record<
            string,
            string | number | boolean | undefined
        > = {},
    ): Promise<T> {
        const headers = new Headers();

        const finalQuery = {
            ...query,
        };

        if (this.authStrategy === AuthStrategy.QUERY) {
            finalQuery[this.authKeyName] = this.apiKey;
        }

        if (this.authStrategy === AuthStrategy.HEADER) {
            headers.set(this.authKeyName, this.apiKey);
        }

        const response = await this.httpClient.get<T>({
            path: endpoint,
            query: finalQuery,
            headers,
        });

        return response.data;
    }

    abstract searchStocks(query: string): Promise<any>;

    abstract getQuote(symbol: string): Promise<any>;

    abstract getCompany(symbol: string): Promise<any>;

    abstract getHistoricalCandles(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
    ): Promise<any>;

    abstract getMarketNews(category?: string): Promise<any>;

    abstract getMarketStatus(exchange?: string): Promise<any>;
}
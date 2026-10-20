import type {
    Candles,
    Company,
    MarketStatus,
    Quote,
    SearchResults,
} from "@/lib/market/types";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

async function request<T>(
    url: string,
): Promise<T> {
    const response =
        await fetch(url);

    const result =
        (await response.json()) as ApiResponse<T>;

    if (!response.ok || !result.success) {
        throw new Error(
            result.message ??
                "Market request failed.",
        );
    }

    if (result.data === undefined) {
        throw new Error(
            "Market response contains no data.",
        );
    }

    return result.data;
}

export async function searchStocks(
    query: string,
): Promise<SearchResults> {
    return request<SearchResults>(
        `/api/market/search?q=${encodeURIComponent(
            query,
        )}`,
    );
}

export async function getQuote(
    symbol: string,
): Promise<Quote> {
    return request<Quote>(
        `/api/market/quote?symbol=${encodeURIComponent(
            symbol,
        )}`,
    );
}

export async function getCandles(
    symbol: string,
    resolution: string,
    from: number,
    to: number,
): Promise<Candles> {
    const params = new URLSearchParams({
        symbol,
        resolution,
        from: String(from),
        to: String(to),
    });

    return request<Candles>(
        `/api/market/candles?${params.toString()}`,
    );
}

export async function getCompany(
    symbol: string,
): Promise<Company> {
    return request<Company>(
        `/api/market/company?symbol=${encodeURIComponent(
            symbol,
        )}`,
    );
}

export async function getMarketStatus(
    exchange = "US",
): Promise<MarketStatus> {
    return request<MarketStatus>(
        `/api/market/status?exchange=${encodeURIComponent(
            exchange,
        )}`,
    );
}
export interface NetworkConfig {
    baseUrl: string;

    timeout: number;
}

export interface RetryConfig {
    enabled: boolean;

    maxAttempts: number;

    baseDelay: number;
}

export interface LoggingConfig {
    enabled: boolean;
}

export interface MetricsConfig {
    enabled: boolean;
}

export interface CacheConfig {
    enabled: boolean;

    ttl: number;
}

export interface CircuitBreakerConfig {
    enabled: boolean;

    failureThreshold: number;

    recoveryTimeout: number;
}

export interface HttpClientConfig {
    network: NetworkConfig;

    retry: RetryConfig;

    logging: LoggingConfig;

    metrics: MetricsConfig;

    cache: CacheConfig;

    circuitBreaker: CircuitBreakerConfig;
}

export type HttpResponseType =
    | "json"
    | "text"
    | "blob"
    | "arrayBuffer"
    | "none";

export interface HttpRequestOptions {
    path: string;

    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

    query?: Record<
        string,
        string | number | boolean | undefined
    >;

    headers?: HeadersInit;

    body?: BodyInit | null;

    signal?: AbortSignal;

    timeout?: number;

    retry?: number;

    responseType?: HttpResponseType;
}
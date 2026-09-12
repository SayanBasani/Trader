import type { HttpClientConfig, HttpRequestOptions, HttpResponseType, } from "./http-client.types";
import type { HttpResponse } from "./response";
import type { HttpAdapter } from "./adapters";
import { FetchAdapter } from "./adapters";
import { classifyHttpError } from "../utils/http-error-classifier";
import { MarketErrorAction, MarketErrorType, MarketHttpError, } from "../utils/errors";
import { ExponentialBackoffPolicy, sleep, } from "./retry";
import {
    ConsoleLogger,
    type Logger,
} from "../logging";
import {
    InMemoryMetricsCollector,
    type MetricsCollector,
} from "../metrics";

export class HttpClient {

    constructor(
        private readonly config: HttpClientConfig,
        private readonly adapter: HttpAdapter = new FetchAdapter(),
        private readonly logger: Logger = new ConsoleLogger(),
        private readonly metrics: MetricsCollector = new InMemoryMetricsCollector(),
    ) {}
    
    private sanitizeUrl(
        url: URL,
    ): string {
        const sanitizedUrl = new URL(url.toString());

        const sensitiveParameters = [
            "token",
            "apikey",
            "api_key",
            "key",
            "access_token",
            "secret",
        ];

        for (const parameter of sensitiveParameters) {
            if (
                sanitizedUrl.searchParams.has(
                    parameter,
                )
            ) {
                sanitizedUrl.searchParams.set(
                    parameter,
                    "[REDACTED]",
                );
            }
        }

        return sanitizedUrl.toString();
    }

    protected createRetryPolicy() {
        return new ExponentialBackoffPolicy(
            this.config.retry,
        );
    }
    async get<T>(
        options: Omit<HttpRequestOptions, "method">,
    ): Promise<HttpResponse<T>> {
        return this.request<T>({
            ...options,
            method: "GET",
        });
    }

    protected async request<T>(
        options: HttpRequestOptions,
    ): Promise<HttpResponse<T>> {

        const url = this.buildUrl(
            options.path,
            options.query,
        );

        const {
            controller,
            cleanup,
        } = this.createAbortController(
            options.timeout,
        );

        try {

            const response =
                await this.executeRequest(
                    url,
                    {
                        ...options,
                        signal:
                            options.signal ??
                            controller.signal,
                    },
                );

            if (!response.ok) {

                const classification =
                    classifyHttpError(
                        response.status,
                    );

                throw new MarketHttpError({
                    message: response.statusText,
                    status: response.status,
                    url: url.toString(),
                    type: classification.type,
                    action: classification.action,
                });
            }

            const data =
                await this.parseResponse<T>(
                    response,
                    options.responseType,
                );

            return {
                status: response.status,
                ok: response.ok,
                headers: response.headers,
                data,
                rateLimit: undefined,
            };

        } catch (error) {

            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {

                throw new MarketHttpError({
                    message: "Request timed out.",
                    status: 408,
                    url: url.toString(),
                    type: MarketErrorType.TIMEOUT,
                    action: MarketErrorAction.RETRY,
                    cause: error,
                });
            }

            throw error;

        } finally {

            cleanup();

        }
    }
    protected async executeRequest(
        url: URL,
        options: HttpRequestOptions,
    ): Promise<Response> {

        const policy = this.createRetryPolicy();

        let attempt = 1;

        while (true) {

            try {

                return await this.performRequest(
                    url,
                    options,
                );

            } catch (error) {

                if (
                    !(error instanceof MarketHttpError)
                ) {
                    throw error;
                }

                if (
                    !policy.shouldRetry(
                        error,
                        attempt,
                    )
                ) {
                    throw error;
                }

                await sleep(
                    policy.getDelay(attempt),
                );

                attempt++;

            }

        }

    }
    protected async performRequest(
        url: URL,
        options: HttpRequestOptions,
    ): Promise<Response> {

        const startedAt =
            performance.now();

        try {

            const response =
                await this.adapter.request(
                    url.toString(),
                    this.createRequestInit( options, ),
                );

            const execution = {
                method: options.method ?? "GET",
                url: this.sanitizeUrl(url),
                status: response.status,
                duration: performance.now() - startedAt,
                success: response.ok,
            };

            this.logger.log( execution, );

            this.metrics.recordRequest( execution, );
            return response;

        } catch (error) {

            const execution = {
                method: options.method ?? "GET",
                url: this.sanitizeUrl(url),
                status: 0,
                duration: performance.now() - startedAt,
                success: false,
            };

            this.logger.log(
                execution,
            );

            this.metrics.recordRequest(
                execution,
            );
            throw error;

        }

    }
    protected buildUrl(
        path: string,
        query?: HttpRequestOptions["query"],
    ): URL {

        const url = new URL(
            path,
            this.config.network.baseUrl,
        );

        if (!query) {
            return url;
        }

        for (const [key, value] of Object.entries(query)) {

            if (value === undefined) {
                continue;
            }

            url.searchParams.append(
                key,
                String(value),
            );
        }

        return url;
    }

    protected createRequestInit(
        options: HttpRequestOptions,
    ): RequestInit {

        return {
            method: options.method,
            headers: options.headers,
            body: options.body,
            signal: options.signal,
        };
    }

    protected createAbortController(
        timeout?: number,
    ): {
        controller: AbortController;
        cleanup: () => void;
    } {

        const controller = new AbortController();

        const timeoutMs =
            timeout ??
            this.config.network.timeout;

        const timer = setTimeout(
            () => controller.abort(),
            timeoutMs,
        );

        return {
            controller,
            cleanup: () => clearTimeout(timer),
        };
    }

    protected async parseResponse<T>(
        response: Response,
        responseType: HttpResponseType = "json",
    ): Promise<T> {

        switch (responseType) {

            case "json":
                return await response.json() as T;

            case "text":
                return await response.text() as T;

            case "blob":
                return await response.blob() as T;

            case "arrayBuffer":
                return await response.arrayBuffer() as T;

            case "none":
                return undefined as T;

            default:
                throw new Error(
                    `Unsupported response type: ${responseType}`,
                );
        }
    }
}
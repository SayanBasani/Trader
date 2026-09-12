import { HttpClient } from "@/lib/market/client";
import { FetchAdapter } from "@/lib/market/client/adapters";

import {
    MARKET_ENV,
} from "@/lib/market/config/env";

import {
    MarketProviderName,
} from "@/lib/market/config/providers";

import type {
    MarketProvider,
} from "@/lib/market/interfaces/market-provider";

import {
    FinnhubProvider,
} from "@/lib/market/providers/finnhub/finnhub-provider";

import {
    TwelveDataProvider,
} from "@/lib/market/providers/twelve-data/twelve-data-provider";

export class ServiceContainer {
    private static readonly clients = new Map<
        MarketProviderName,
        HttpClient
    >();

    private static readonly providers = new Map<
        MarketProviderName,
        MarketProvider
    >();

    static getHttpClient(
        providerName: MarketProviderName,
    ): HttpClient {

        const existing =
            this.clients.get(providerName);

        if (existing) {
            return existing;
        }

        const provider =
            MARKET_ENV.providers[providerName];

        if (!provider.enabled) {
            throw new Error(
                `Provider "${providerName}" is disabled.`,
            );
        }

        if (!provider.apiKey) {
            throw new Error(
                `Missing API key for "${providerName}".`,
            );
        }

        const client =
            new HttpClient(
                {
                    network: {
                        baseUrl:
                            provider.baseUrl,

                        timeout:
                            provider.timeout,
                    },

                    retry: {
                        enabled: true,

                        maxAttempts:
                            provider.retry,

                        baseDelay: 500,
                    },

                    logging: {
                        enabled: true,
                    },

                    metrics: {
                        enabled: true,
                    },

                    cache: {
                        enabled: false,

                        ttl: 0,
                    },

                    circuitBreaker: {
                        enabled: true,

                        failureThreshold: 5,

                        recoveryTimeout: 30000,
                    },
                },

                new FetchAdapter(),
            );

        this.clients.set(
            providerName,
            client,
        );

        return client;
    }

    static getProvider(
        providerName: MarketProviderName,
    ): MarketProvider {

        const existing =
            this.providers.get(providerName);

        if (existing) {
            return existing;
        }

        const providerConfig =
            MARKET_ENV.providers[providerName];

        if (!providerConfig.enabled) {
            throw new Error(
                `Provider "${providerName}" is disabled.`,
            );
        }

        if (!providerConfig.apiKey) {
            throw new Error(
                `Missing API key for "${providerName}".`,
            );
        }

        const httpClient =
            this.getHttpClient(
                providerName,
            );

        let provider: MarketProvider;

        switch (providerName) {
            case MarketProviderName.FINNHUB:
                provider =
                    new FinnhubProvider(
                        httpClient,
                        providerConfig.apiKey,
                    );
                break;
            case MarketProviderName.TWELVE_DATA:
                provider =
                    new TwelveDataProvider(
                        httpClient,
                        providerConfig.apiKey,
                    );
                break;

            default:
                throw new Error(
                    `Provider "${providerName}" is not implemented yet.`,
                );
        }

        this.providers.set(
            providerName,
            provider,
        );

        return provider;
    }
}
import { HttpClient } from "@/lib/market/client";
import { FetchAdapter } from "@/lib/market/client/adapters";
import { MARKET_ENV } from "@/lib/market/config/env";
import { MarketProviderName, PROVIDER_FALLBACK_ORDER, } from "@/lib/market/config/providers";
import type { MarketProvider } from "@/lib/market/interfaces/market-provider";
import { FinnhubProvider, } from "@/lib/market/providers/finnhub/finnhub-provider";
import { TwelveDataProvider, } from "@/lib/market/providers/twelve-data/twelve-data-provider";
import { FmpProvider, } from "@/lib/market/providers/fmp";
import { ProviderManager, ProviderRegistry, } from "@/lib/market/manager";
import { UpstoxProvider, } from "@/lib/market/providers/upstox";
import { AngelOneProvider, } from "@/lib/market/providers/angel-one/angel-one-provider";
import { FyersProvider, } from "@/lib/market/providers/fyers";

export class ServiceContainer {

    private static readonly clients =
        new Map<
            MarketProviderName,
            HttpClient
        >();

    private static readonly providers =
        new Map<
            MarketProviderName,
            MarketProvider
        >();

    private static readonly providerRegistry =
        new ProviderRegistry();

    private static providerManager?:
        ProviderManager;


    static getHttpClient( providerName: MarketProviderName, ): HttpClient {
        const existing = this.clients.get( providerName, );
        if (existing) { return existing; }

        const provider = MARKET_ENV.providers[ providerName ];

        if (!provider.enabled) {
            throw new Error(
                `Provider "${providerName}" is disabled or not configured.`,
            );
        }

        // if (!provider.apiKey) { throw new Error( `Missing API key for "${providerName}".`, );}
        if (
            !provider.apiKey &&
            !provider.accessToken
        ) {
            throw new Error(
                `Missing credentials for "${providerName}".`,
            );
        }
        const client =
            new HttpClient(
                {
                    network: {
                        baseUrl: provider.baseUrl,
                        timeout: provider.timeout,
                    },
                    retry: {
                        enabled: true,
                        maxAttempts: provider.retry,
                        baseDelay: 500,
                    },
                    logging: { enabled: true,},
                    metrics: { enabled: true,},
                    cache: { enabled: false,ttl: 0,},
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
            this.providers.get(
                providerName,
            );

        if (existing) {
            return existing;
        }

        const providerConfig =
            MARKET_ENV.providers[
                providerName
            ];

        if (!providerConfig.enabled) {
            throw new Error(
                `Provider "${providerName}" is disabled.`,
            );
        }

        if (!providerConfig.apiKey && !providerConfig.accessToken) {
            throw new Error(
                `Missing credentials for "${providerName}".`,
            );
        }

        const httpClient =
            this.getHttpClient(
                providerName,
            );

        let provider:
            MarketProvider;

        switch (providerName) {

            case MarketProviderName.FINNHUB:

                provider =
                    new FinnhubProvider(
                        httpClient,
                        providerConfig.apiKey!,
                    );

                break;


            case MarketProviderName.TWELVE_DATA:

                provider =
                    new TwelveDataProvider(
                        httpClient,
                        providerConfig.apiKey!,
                    );

                break;


            case MarketProviderName.FMP:

                provider =
                    new FmpProvider(
                        httpClient,
                        providerConfig.apiKey!,
                    );

                break;

            case MarketProviderName.UPSTOX:
                provider =
                    new UpstoxProvider(
                        httpClient,
                        providerConfig.accessToken!,
                    );
                break;

            case MarketProviderName.ANGEL_ONE:

                if (
                    !providerConfig.accessToken ||
                    !providerConfig.apiKey
                ) {
                    throw new Error(
                        "Missing ANGELONE_ACCESS_TOKEN or ANGELONE_API_KEY.",
                    );
                }

                provider =
                    new AngelOneProvider(
                        httpClient,
                        providerConfig.accessToken,
                        providerConfig.apiKey,
                    );

                break;


            case MarketProviderName.FYERS:

                if (
                    !providerConfig.accessToken ||
                    !providerConfig.clientId
                ) {
                    throw new Error(
                        "Missing FYERS_ACCESS_TOKEN or FYERS_CLIENT_ID.",
                    );
                }

                provider =
                    new FyersProvider(
                        httpClient,
                        providerConfig.accessToken,
                        providerConfig.clientId,
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


    // static getProviderManager(): ProviderManager {
    static getProviderManager( providerName: MarketProviderName = MARKET_ENV.provider, ): ProviderManager {
        if (this.providerManager) {
            return this.providerManager;
        }

        for ( const providerName of PROVIDER_FALLBACK_ORDER ) {
            const providerConfig = MARKET_ENV.providers[providerName];
            if ( 
                !providerConfig || 
                !providerConfig.enabled || 
                ( 
                    !providerConfig.apiKey && 
                    !providerConfig.accessToken 
                ) 
            ) 
            {
                continue;
            }
            try {
                const provider = this.getProvider( providerName, );
                this.providerRegistry.register( provider, );
            } catch (error) {
                console.warn(
                    `[ServiceContainer] Failed to initialize provider "${providerName}".`,
                    error,
                );
            }
        }

        this.providerManager =
            new ProviderManager(
                this.providerRegistry,
                // MARKET_ENV.provider,
                providerName,
                PROVIDER_FALLBACK_ORDER,
            );

        return this.providerManager;
    }
}
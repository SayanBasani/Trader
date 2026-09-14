import type { MarketProvider, } from "@/lib/market/interfaces/market-provider";
import { MarketProviderName, } from "@/lib/market/config/providers";
import { MarketErrorAction, MarketHttpError, } from "@/lib/market/utils/errors";
import { MarketOperation, } from "@/lib/market/manager/market-operation";
import { ProviderCapabilities, PROVIDER_CAPABILITIES, supportsOperation, } from "@/lib/market/manager/provider-capabilities";
import { ProviderRegistry, } from "@/lib/market/manager/provider-registry";
import { getPreferredProviders, type ProviderRoutingContext, } from "@/lib/market/manager/provider-routing";

export class ProviderManager {

    constructor(
        private readonly registry: ProviderRegistry,
        private readonly defaultProvider: MarketProviderName,
        private readonly fallbackOrder: readonly MarketProviderName[],
    ) {}

    getProvider( name?: MarketProviderName, ): MarketProvider {

        const providerName = name ?? this.defaultProvider;
        const provider = this.registry.get(providerName);

        if (!provider) {
            throw new Error(
                `Market provider "${providerName}" is not registered.`,
            );
        }
        return provider;
    }

    getProviders(): MarketProvider[] {
        return this.registry.getAll();
    }

    getCapabilities(
        providerName: MarketProviderName,
    ): ProviderCapabilities {

        return PROVIDER_CAPABILITIES[
            providerName
        ];
    }

    getProviderForOperation(
        operation: MarketOperation,
        context: ProviderRoutingContext = {},
    ): MarketProvider {

        for (
            const providerName
            of this.getOrderedProviderNames( context, )
        ) {

            if (
                !supportsOperation(
                    providerName,
                    operation,
                )
            ) {
                continue;
            }

            const provider =
                this.registry.get(providerName);

            if (provider) {
                return provider;
            }
        }

        throw new Error(
            `No registered provider supports "${operation}".`,
        );
    }

    async executeWithFallback<T>(
        operation: MarketOperation,
        request: (
            provider: MarketProvider,
        ) => Promise<T>,
        context: ProviderRoutingContext = {},
    ): Promise<T> {

        let lastError: unknown;

        for (
            const providerName
            of this.getOrderedProviderNames( context, )
        ) {

            if (
                !supportsOperation(
                    providerName,
                    operation,
                )
            ) {
                continue;
            }

            const provider =
                this.registry.get(providerName);

            if (!provider) {
                continue;
            }

            try {

                return await request(provider);

            } catch (error) {

                lastError = error;

                if (
                    !this.shouldFailover(error)
                ) {
                    throw error;
                }

                console.warn(
                    `[ProviderManager] Provider "${providerName}" failed for "${operation}". Trying fallback.`,
                );
            }
        }

        if (lastError) {
            throw lastError;
        }

        throw new Error(
            `No available provider supports "${operation}".`,
        );
    }

    private getOrderedProviderNames(
        context: ProviderRoutingContext = {},
    ): MarketProviderName[] {

        const preferredProviders =
            getPreferredProviders(
                context,
            );

        return [
            ...new Set([
                ...preferredProviders,
                this.defaultProvider,
                ...this.fallbackOrder,
            ]),
        ];
    }

    private shouldFailover(
        error: unknown,
    ): boolean {

        if (
            !(error instanceof MarketHttpError)
        ) {
            return false;
        }

        return (
            error.action ===
                MarketErrorAction.FAILOVER
            ||
            error.action ===
                MarketErrorAction.RETRY
        );
    }
}
import type { MarketProvider } from "../interfaces/market-provider";
import { ProviderRegistry } from "./provider-registry";

export class ProviderManager {
    constructor(
        private readonly registry: ProviderRegistry,
        private readonly defaultProvider: string,
    ) {}

    getProvider(name?: string): MarketProvider {
        const provider = this.registry.get(
            name ?? this.defaultProvider,
        );

        if (!provider) {
            throw new Error(
                `Market provider "${name ?? this.defaultProvider}" is not registered.`,
            );
        }

        return provider;
    }

    getProviders(): MarketProvider[] {
        return this.registry.getAll();
    }
}
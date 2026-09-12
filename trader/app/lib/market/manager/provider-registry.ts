import type { MarketProvider } from "../interfaces/market-provider";

export class ProviderRegistry {
    private readonly providers = new Map<string, MarketProvider>();

    register(provider: MarketProvider): void {
        this.providers.set(provider.name, provider);
    }

    get(name: string): MarketProvider | undefined {
        return this.providers.get(name);
    }

    getAll(): MarketProvider[] {
        return [...this.providers.values()];
    }

    has(name: string): boolean {
        return this.providers.has(name);
    }
}
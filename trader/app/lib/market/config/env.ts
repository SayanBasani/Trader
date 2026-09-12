import {
    DEFAULT_PROVIDER,
    MARKET_PROVIDERS,
    MarketProviderName,
} from "./providers";

export type ProviderConfig = {
    enabled: boolean;

    apiKey?: string;

    baseUrl: string;

    timeout: number;

    retry: number;

    priority: number;
};

function getOptionalEnv(name: string): string | undefined {
    const value = process.env[name];

    if (!value || value.trim() === "") {
        return undefined;
    }

    return value;
}

const provider =
    (process.env.MARKET_PROVIDER as MarketProviderName) ??
    DEFAULT_PROVIDER;

if (!MARKET_PROVIDERS.includes(provider)) {
    throw new Error(
        `Invalid MARKET_PROVIDER "${provider}".`
    );
}

const providers = {
    finnhub: {
        enabled: true,
        apiKey: getOptionalEnv("FINNHUB_API_KEY"),
        baseUrl: "https://finnhub.io/api/v1/",
        timeout: 10000,
        retry: 2,
        priority: 1,
    },

    "twelve-data": {
        enabled: true,
        apiKey: getOptionalEnv("TWELVE_DATA_API_KEY"),
        baseUrl: "https://api.twelvedata.com/",
        timeout: 10000,
        retry: 2,
        priority: 2,
    },

    fmp: {
        enabled: true,
        apiKey: getOptionalEnv("FMP_API_KEY"),
        baseUrl: "https://financialmodelingprep.com/api/v3/",
        timeout: 10000,
        retry: 2,
        priority: 3,
    },

    polygon: {
        enabled: true,
        apiKey: getOptionalEnv("POLYGON_API_KEY"),
        baseUrl: "https://api.polygon.io/",
        timeout: 10000,
        retry: 2,
        priority: 4,
    },

    "alpha-vantage": {
        enabled: true,
        apiKey: getOptionalEnv("ALPHA_VANTAGE_API_KEY"),
        baseUrl: "https://www.alphavantage.co/",
        timeout: 10000,
        retry: 2,
        priority: 5,
    },
} satisfies Record<MarketProviderName, ProviderConfig>;

const activeProvider = providers[provider];

if (!activeProvider.enabled) {
    throw new Error(
        `Provider "${provider}" is disabled.`
    );
}

if (!activeProvider.apiKey) {
    throw new Error(
        `Missing API key for "${provider}".`
    );
}

export const MARKET_ENV = {
    provider,

    providers,

    enabledProviders: Object.entries(providers)
        .filter(([, provider]) => provider.enabled)
        .map(([name]) => name as MarketProviderName),

    fallbackOrder: Object.entries(providers)
        .filter(([, provider]) => provider.enabled)
        .sort(
            (a, b) =>
                a[1].priority - b[1].priority,
        )
        .map(([name]) => name as MarketProviderName),
} as const;
import {
    DEFAULT_PROVIDER,
    MARKET_PROVIDERS,
    MarketProviderName,
} from "./providers";

export type ProviderConfig = {
    enabled: boolean;

    apiKey?: string;

    accessToken?: string;

    clientId?: string;

    clientSecret?: string;

    baseUrl: string;

    timeout: number;

    retry: number;

    priority: number;
};

function getOptionalEnv(
    name: string,
): string | undefined {
    const value = process.env[name];

    if (!value || value.trim() === "") {
        return undefined;
    }

    return value.trim();
}

const provider =
    (process.env.MARKET_PROVIDER as MarketProviderName) ??
    DEFAULT_PROVIDER;

if (!MARKET_PROVIDERS.includes(provider)) {
    throw new Error(
        `Invalid MARKET_PROVIDER "${provider}".`,
    );
}

const providers: Record< MarketProviderName, ProviderConfig > = {
    finnhub: {
        enabled: true,
        apiKey:
            getOptionalEnv(
                "FINNHUB_API_KEY",
            ),
        baseUrl:
            "https://finnhub.io/api/v1/",
        timeout: 10000,
        retry: 2,
        priority: 1,
    },

    "twelve-data": {
        enabled: true,
        apiKey:
            getOptionalEnv(
                "TWELVE_DATA_API_KEY",
            ),
        baseUrl:
            "https://api.twelvedata.com/",
        timeout: 10000,
        retry: 2,
        priority: 2,
    },

    fmp: {
        enabled: true,
        apiKey:
            getOptionalEnv(
                "FMP_API_KEY",
            ),
        baseUrl:
            "https://financialmodelingprep.com/stable/",
        timeout: 10000,
        retry: 2,
        priority: 3,
    },

    polygon: {
        enabled: true,
        apiKey:
            getOptionalEnv(
                "POLYGON_API_KEY",
            ),
        baseUrl:
            "https://api.polygon.io/",
        timeout: 10000,
        retry: 2,
        priority: 4,
    },

    "alpha-vantage": {
        enabled: true,
        apiKey:
            getOptionalEnv(
                "ALPHA_VANTAGE_API_KEY",
            ),
        baseUrl:
            "https://www.alphavantage.co/",
        timeout: 10000,
        retry: 2,
        priority: 5,
    },

    upstox: {
        enabled: true,
        accessToken:
            getOptionalEnv(
                "UPSTOX_ACCESS_TOKEN",
            ),
        clientId:
            getOptionalEnv(
                "UPSTOX_CLIENT_ID",
            ),
        clientSecret:
            getOptionalEnv(
                "UPSTOX_CLIENT_SECRET",
            ),
        baseUrl:
            "https://api.upstox.com/",
        timeout: 10000,
        retry: 2,
        priority: 6,
    },

    "angel-one": {
        enabled: true,

        apiKey:
            getOptionalEnv(
                "ANGELONE_API_KEY",
            ),

        accessToken:
            getOptionalEnv(
                "ANGELONE_ACCESS_TOKEN",
            ),

        baseUrl:
            "https://apiconnect.angelone.in/",

        timeout: 10000,

        retry: 2,

        priority: 7,
    },

    fyers: {
        enabled: true,

        accessToken:
            getOptionalEnv(
                "FYERS_ACCESS_TOKEN",
            ),

        clientId:
            getOptionalEnv(
                "FYERS_CLIENT_ID",
            ),

        clientSecret:
            getOptionalEnv(
                "FYERS_CLIENT_SECRET",
            ),

        baseUrl:
            "https://api-t1.fyers.in/",

        timeout: 10000,

        retry: 2,

        priority: 8,
    },

}

const activeProvider =
    providers[provider];

if (!activeProvider.enabled) {
    throw new Error(
        `Provider "${provider}" is disabled.`,
    );
}

if (
    !activeProvider.apiKey &&
    !activeProvider.accessToken
) {
    throw new Error(
        `Missing credentials for "${provider}".`,
    );
}

export const MARKET_ENV = {
    provider,

    providers,

    enabledProviders:
        Object.entries(providers)
            .filter(
                ([, provider]) =>
                    provider.enabled &&
                    (
                        provider.apiKey ||
                        provider.accessToken
                    ),
            )
            .map(
                ([name]) =>
                    name as MarketProviderName,
            ),

    fallbackOrder:
        Object.entries(providers)
            .filter(
                ([, provider]) =>
                    provider.enabled &&
                    (
                        provider.apiKey ||
                        provider.accessToken
                    ),
            )
            .sort(
                (a, b) =>
                    a[1].priority -
                    b[1].priority,
            )
            .map(
                ([name]) =>
                    name as MarketProviderName,
            ),
} as const;
import {
    ExchangeCode,
} from "@/lib/market/models/exchange";

export interface NormalizedSymbol {
    symbol: string;

    exchange?: ExchangeCode;

    providerSymbol: string;
}

export function normalizeSymbol(
    symbol: string,
): NormalizedSymbol {

    const normalized =
        symbol
            .trim()
            .toUpperCase();

    /*
     * NSE
     *
     * RELIANCE:NSE
     * RELIANCE.NS
     */

    if (
        normalized.endsWith(":NSE")
    ) {
        const base =
            normalized.slice(
                0,
                -4,
            );

        return {
            symbol: base,
            exchange:
                ExchangeCode.NSE,
            providerSymbol:
                `${base}:NSE`,
        };
    }

    if (
        normalized.endsWith(".NS")
    ) {
        const base =
            normalized.slice(
                0,
                -3,
            );

        return {
            symbol: base,
            exchange:
                ExchangeCode.NSE,
            providerSymbol:
                `${base}:NSE`,
        };
    }

    /*
     * BSE
     *
     * RELIANCE:BSE
     * RELIANCE.BO
     */

    if (
        normalized.endsWith(":BSE")
    ) {
        const base =
            normalized.slice(
                0,
                -4,
            );

        return {
            symbol: base,
            exchange:
                ExchangeCode.BSE,
            providerSymbol:
                `${base}:BSE`,
        };
    }

    if (
        normalized.endsWith(".BO")
    ) {
        const base =
            normalized.slice(
                0,
                -3,
            );

        return {
            symbol: base,
            exchange:
                ExchangeCode.BSE,
            providerSymbol:
                `${base}:BSE`,
        };
    }

    /*
     * Crypto / Forex
     *
     * BTC/USD
     * ETH/USD
     * EUR/USD
     */

    if (
        normalized.includes("/")
    ) {
        return {
            symbol: normalized,
            providerSymbol:
                normalized,
        };
    }

    /*
     * US / Global default
     *
     * AAPL
     * MSFT
     * NVDA
     */

    return {
        symbol: normalized,
        providerSymbol:
            normalized,
    };
}
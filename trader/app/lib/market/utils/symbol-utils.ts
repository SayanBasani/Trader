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
     * Indian NSE symbols
     *
     * Examples:
     *
     * RELIANCE:NSE
     * RELIANCE.NS
     *
     * Both become:
     *
     * symbol:
     * RELIANCE
     *
     * providerSymbol:
     * RELIANCE:NSE
     */

    if ( normalized.endsWith(":NSE") ) {

        const base = normalized.slice( 0, -4, );

        return {
            symbol: base,
            exchange: ExchangeCode.NSE,
            providerSymbol: base,
        };
    }


    if (
        normalized.endsWith(".NS")
    ) {

        const base = normalized.slice( 0, -3, );

        return {
            symbol: base,
            exchange: ExchangeCode.NSE,
            providerSymbol: base,
        };
    }


    /*
     * Indian BSE symbols
     *
     * Examples:
     *
     * RELIANCE:BSE
     * RELIANCE.BO
     */

    if (  normalized.endsWith(":BSE")  ) {

        const base = normalized.slice( 0, -4, );

        return {
            symbol: base,
            exchange: ExchangeCode.BSE,
            providerSymbol: base,
        };
    }


    if ( normalized.endsWith(".BO") ) {

        const base = normalized.slice( 0, -3, );

        return {
            symbol: base,
            exchange: ExchangeCode.BSE,
            providerSymbol: base,
        };
    }


    /*
     * Crypto
     *
     * BTC/USD
     * ETH/USD
     *
     * These are already provider-friendly
     * for Twelve Data.
     */

    if ( normalized.includes("/") ) {

        return {
            symbol: normalized,
            providerSymbol: normalized,
        };
    }


    /*
     * Default:
     *
     * AAPL
     * MSFT
     * NVDA
     */

    return {
        symbol: normalized,
        providerSymbol: normalized,
    };
}
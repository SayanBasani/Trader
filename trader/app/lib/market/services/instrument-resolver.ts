import {
    AssetType,
    MarketRegion,
} from "@/lib/market/models/asset";

import {
    ExchangeCode,
} from "@/lib/market/models/exchange";

import type {
    Instrument,
} from "@/lib/market/models/instrument";

import {
    normalizeSymbol,
} from "@/lib/market/utils/symbol-utils";

export function resolveInstrument(
    input: string,
): Instrument {

    const normalized =
        normalizeSymbol(input);

    const symbol =
        normalized.symbol;

    const exchange =
        normalized.exchange;

    /*
     * Indian markets
     */

    if (
        exchange === ExchangeCode.NSE
    ) {
        return {
            symbol,
            name: symbol,
            assetType:
                AssetType.STOCK,
            region:
                MarketRegion.INDIA,
            exchange:
                ExchangeCode.NSE,
            currency: "INR",
            providerSymbol:
                normalized.providerSymbol,
        };
    }

    if (
        exchange === ExchangeCode.BSE
    ) {
        return {
            symbol,
            name: symbol,
            assetType:
                AssetType.STOCK,
            region:
                MarketRegion.INDIA,
            exchange:
                ExchangeCode.BSE,
            currency: "INR",
            providerSymbol:
                normalized.providerSymbol,
        };
    }

    /*
     * Crypto
     */

    if (
        symbol.includes("/")
    ) {
        const [base] =
            symbol.split("/");

        const cryptoBases = [
            "BTC",
            "ETH",
            "SOL",
            "XRP",
            "ADA",
            "DOGE",
            "BNB",
            "AVAX",
            "DOT",
            "LTC",
        ];

        if (
            cryptoBases.includes(
                base,
            )
        ) {
            return {
                symbol,
                name: symbol,
                assetType:
                    AssetType.CRYPTO,
                region:
                    MarketRegion.GLOBAL,
                exchange:
                    ExchangeCode.CRYPTO,
                currency:
                    symbol.split("/")[1] ??
                    "USD",
                providerSymbol:
                    normalized.providerSymbol,
            };
        }

        /*
         * Forex
         */

        return {
            symbol,
            name: symbol,
            assetType:
                AssetType.FOREX,
            region:
                MarketRegion.GLOBAL,
            exchange:
                ExchangeCode.GLOBAL,
            currency:
                symbol.split("/")[1] ??
                "USD",
            providerSymbol:
                normalized.providerSymbol,
        };
    }

    /*
     * US default
     */

    return {
        symbol,
        name: symbol,
        assetType:
            AssetType.STOCK,
        region:
            MarketRegion.US,
        exchange:
            ExchangeCode.NASDAQ,
        currency: "USD",
        providerSymbol:
            normalized.providerSymbol,
    };
}
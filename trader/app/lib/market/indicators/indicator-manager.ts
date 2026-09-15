import type { Candle } from "@/lib/market/types";

import { calculateBollingerBands } from "./bollinger";
import { calculateEMA } from "./ema";
import { calculateMACD } from "./macd";
import { calculateRSI } from "./rsi";
import { calculateSMA } from "./sma";

import type {
    BollingerPoint,
    IndicatorPoint,
    MACDPoint,
} from "./types";

export interface IndicatorConfig {
    sma?: {
        enabled: boolean;
        period: number;
    };

    ema?: {
        enabled: boolean;
        period: number;
    };

    rsi?: {
        enabled: boolean;
        period: number;
    };

    macd?: {
        enabled: boolean;
        fastPeriod: number;
        slowPeriod: number;
        signalPeriod: number;
    };

    bollinger?: {
        enabled: boolean;
        period: number;
        standardDeviations: number;
    };
}

export interface IndicatorResults {
    sma: IndicatorPoint[];
    ema: IndicatorPoint[];
    rsi: IndicatorPoint[];
    macd: MACDPoint[];
    bollinger: BollingerPoint[];
}

export const DEFAULT_INDICATOR_CONFIG: IndicatorConfig = {
    sma: {
        enabled: false,
        period: 20,
    },

    ema: {
        enabled: false,
        period: 20,
    },

    rsi: {
        enabled: false,
        period: 14,
    },

    macd: {
        enabled: false,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
    },

    bollinger: {
        enabled: false,
        period: 20,
        standardDeviations: 2,
    },
};

export function calculateIndicators(
    candles: Candle[],
    config: IndicatorConfig = DEFAULT_INDICATOR_CONFIG,
): IndicatorResults {
    return {
        sma:
            config.sma?.enabled
                ? calculateSMA(candles, {
                      period:
                          config.sma.period,
                  })
                : [],

        ema:
            config.ema?.enabled
                ? calculateEMA(candles, {
                      period:
                          config.ema.period,
                  })
                : [],

        rsi:
            config.rsi?.enabled
                ? calculateRSI(candles, {
                      period:
                          config.rsi.period,
                  })
                : [],

        macd:
            config.macd?.enabled
                ? calculateMACD(candles, {
                      fastPeriod:
                          config.macd.fastPeriod,
                      slowPeriod:
                          config.macd.slowPeriod,
                      signalPeriod:
                          config.macd.signalPeriod,
                  })
                : [],

        bollinger:
            config.bollinger?.enabled
                ? calculateBollingerBands(
                      candles,
                      {
                          period:
                              config.bollinger
                                  .period,
                          standardDeviations:
                              config.bollinger
                                  .standardDeviations,
                      },
                  )
                : [],
    };
}
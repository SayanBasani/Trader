export interface IndicatorPoint {
    time: number;
    value: number;
}

export interface MACDPoint {
    time: number;
    macd: number;
    signal: number | null;
    histogram: number | null;
}

export interface BollingerPoint {
    time: number;
    middle: number;
    upper: number;
    lower: number;
}

export interface SMAOptions {
    period: number;
}

export interface EMAOptions {
    period: number;
}

export interface RSIOptions {
    period: number;
}

export interface MACDOptions {
    fastPeriod: number;
    slowPeriod: number;
    signalPeriod: number;
}

export interface BollingerOptions {
    period: number;
    standardDeviations: number;
}
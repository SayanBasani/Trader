export type ChartType =
    | "candlestick"
    | "line"
    | "area"
    | "bar";

export type ChartInterval =
    | "1m"
    | "3m"
    | "5m"
    | "10m"
    | "15m"
    | "30m"
    | "1h"
    | "4h"
    | "1d"
    | "1w"
    | "1mo";

export type ChartRange =
    | "1D"
    | "5D"
    | "1M"
    | "3M"
    | "6M"
    | "1Y"
    | "5Y"
    | "MAX";

export interface ChartConfig {
    type: ChartType;
    interval: ChartInterval;
    range: ChartRange;
    volume: boolean;
}

export interface ChartTimeframe {
    label: string;
    resolution: string;
    days: number;
}

export const CHART_TIMEFRAMES: ChartTimeframe[] = [
    {
        label: "1m",
        resolution: "1",
        days: 1,
    },
    {
        label: "5m",
        resolution: "5",
        days: 3,
    },
    {
        label: "15m",
        resolution: "15",
        days: 7,
    },
    {
        label: "30m",
        resolution: "30",
        days: 14,
    },
    {
        label: "1H",
        resolution: "60",
        days: 30,
    },
    {
        label: "4H",
        resolution: "240",
        days: 90,
    },
    {
        label: "1D",
        resolution: "D",
        days: 365,
    },
    {
        label: "1W",
        resolution: "W",
        days: 1825,
    },
];
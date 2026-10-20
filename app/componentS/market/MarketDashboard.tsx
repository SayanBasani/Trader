"use client";
import { useRef, useState, } from "react";
import type { ChartInterval, ChartRange, ChartType, } from "@/componentS/market/chart/types";
import ChartToolbar from "@/componentS/market/chart/ChartToolbar";
import MarketChart, { type MarketChartHandle, } from "@/componentS/market/chart/MarketChart";
import MarketOverview from "@/componentS/market/MarketOverview";
import CompanyCard from "@/componentS/market/CompanyCard";
import MarketStatusCard from "@/componentS/market/MarketStatusCard";
import MarketNews from "@/componentS/market/MarketNews";
import Watchlist from "@/componentS/market/Watchlist";
import type { IndicatorConfig, } from "@/lib/market/indicators";
import IndicatorToolbar from "@/componentS/market/chart/IndicatorToolbar";

export default function MarketDashboard() {

    const [symbol, setSymbol] = useState("AAPL");
    const chartRef = useRef<MarketChartHandle | null>(null);
    const [chartType, setChartType] = useState<ChartType>("candlestick");

    const [interval, setInterval] = useState<ChartInterval>("5m");

    const [range, setRange] = useState<ChartRange>("1M");
    const [indicatorConfig, setIndicatorConfig] =
        useState<IndicatorConfig>({
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
        });
    return (
        <section className="space-y-6">

            <MarketOverview
                onSymbolChange={setSymbol}
            />

            <div className="overflow-hidden rounded-xl border border-gray-200/10">
                <IndicatorToolbar
                    config={indicatorConfig}
                    onChange={setIndicatorConfig}
                />
                
                <ChartToolbar
                    chartType={chartType}
                    interval={interval}
                    range={range}
                    onChartTypeChange={setChartType}
                    onIntervalChange={setInterval}
                    onRangeChange={setRange}
                    onFitContent={() =>
                        chartRef.current?.fitContent()
                    }
                    onZoomIn={() =>
                        chartRef.current?.zoomIn()
                    }
                    onZoomOut={() =>
                        chartRef.current?.zoomOut()
                    }
                />

                <MarketChart
                    ref={chartRef}
                    symbol={symbol}
                    chartType={chartType}
                    interval={interval}
                    range={range}
                    indicatorConfig={indicatorConfig}
                />

            </div>

            <div className="grid gap-6 xl:grid-cols-3">

                <div className="xl:col-span-2">

                    <CompanyCard
                        symbol={symbol}
                    />

                </div>

                <MarketStatusCard />

            </div>

            <div className="grid gap-6 xl:grid-cols-2">

                <Watchlist
                    onSymbolSelect={setSymbol}
                />

                <MarketNews />

            </div>

        </section>
    );
}
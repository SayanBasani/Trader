"use client";

import {
    useState,
} from "react";

import MarketOverview from "@/componentS/market/MarketOverview";
import MarketChart from "@/componentS/market/MarketChart";
import CompanyCard from "@/componentS/market/CompanyCard";
import MarketStatusCard from "@/componentS/market/MarketStatusCard";
import MarketNews from "@/componentS/market/MarketNews";
import Watchlist from "@/componentS/market/Watchlist";

export default function MarketDashboard() {

    const [symbol, setSymbol] =
        useState("AAPL");

    return (
        <section className="space-y-6">

            <MarketOverview
                onSymbolChange={setSymbol}
            />

            <MarketChart
                symbol={symbol}
            />

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
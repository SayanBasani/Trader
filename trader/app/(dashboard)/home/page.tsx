import MarketDashboard from "@/componentS/market/MarketDashboard";

export default function HomePage() {

    return (
        <div className="space-y-6">

            <section
                className="
                    overflow-hidden
                    rounded-3xl
                    bg-linear-to-br
                    dark:text-white
                    dark:from-slate-900
                    dark:via-blue-950
                    dark:to-slate-900

                    text-gray-900 
                    from-blue-500
                    via-gray-300
                    to-blue-600

                    px-6
                    py-8
                    shadow-xl
                    sm:px-8
                "
            >

                <div className="max-w-3xl">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-200">

                        <span className="h-2 w-2 rounded-full bg-green-400" />

                        Live Market Dashboard

                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Welcome to Trader Pro
                    </h1>

                    <p className=" text-gray-500 dark:text-gray-400 mt-3 max-w-2xl text-sm leading-6 sm:text-base">
                        Track market prices, analyze historical
                        movements, search securities and stay
                        updated with live market information.
                    </p>

                </div>

            </section>

            <MarketDashboard />

        </div>
    );
}
export default function HomePage() {
  const stats = [
    {
      title: "Portfolio",
      value: "$125,420",
      change: "+5.24%",
      color: "text-green-500",
    },
    {
      title: "Today's Profit",
      value: "$2,340",
      change: "+2.10%",
      color: "text-green-500",
    },
    {
      title: "Open Orders",
      value: "18",
      change: "6 Active",
      color: "text-blue-500",
    },
    {
      title: "Win Rate",
      value: "78%",
      change: "+1.8%",
      color: "text-green-500",
    },
  ];

  const watchlist = [
    ["BTC/USD", "$118,240", "+2.42%"],
    ["ETH/USD", "$3,420", "+1.18%"],
    ["AAPL", "$211.50", "-0.54%"],
    ["TSLA", "$319.11", "+3.61%"],
    ["NVDA", "$171.91", "+4.20%"],
  ];

  const news = [
    "Bitcoin reaches a new weekly high.",
    "Tesla beats quarterly earnings estimates.",
    "NVIDIA AI demand continues to rise.",
    "Fed expected to keep interest rates unchanged.",
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="rounded-3xl bg-linear-to-r from-sky-600 via-blue-600 to-indigo-700 p-8 text-white shadow-xl">

        <p className="text-blue-100">
          Good Morning 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Welcome to Trader Pro
        </h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Monitor your investments, manage your portfolio,
          and stay updated with the latest market trends.
        </p>

      </section>

      {/* Stats */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-6
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:shadow-lg

              dark:border-slate-700
              dark:bg-[#162033]
            "
          >

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </h2>

            <p className={`mt-4 font-semibold ${item.color}`}>
              {item.change}
            </p>

          </div>

        ))}

      </section>

      {/* Chart + Watchlist */}

      <section className="grid gap-6 xl:grid-cols-3">

        {/* Chart */}

        <div
          className="
            xl:col-span-2
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-[#162033]
          "
        >

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Portfolio Performance
            </h2>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Last 30 Days
            </button>

          </div>

          <div
            className="
              flex
              h-80
              items-center
              justify-center
              rounded-xl
              border-2
              border-dashed
              border-blue-300
              bg-slate-50

              dark:border-slate-600
              dark:bg-slate-900
            "
          >

            <div className="text-center">

              <div className="text-6xl">
                📈
              </div>

              <p className="mt-4 text-gray-500">
                Trading Chart Placeholder
              </p>

            </div>

          </div>

        </div>

        {/* Watchlist */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-[#162033]
          "
        >

          <h2 className="mb-5 text-xl font-semibold">
            Watchlist
          </h2>

          <div className="space-y-4">

            {watchlist.map(([symbol, price, change]) => (

              <div
                key={symbol}
                className="
                  flex
                  justify-between
                  rounded-xl
                  p-3
                  transition
                  hover:bg-gray-100

                  dark:hover:bg-slate-800
                "
              >

                <div>

                  <p className="font-semibold">
                    {symbol}
                  </p>

                  <p className="text-sm text-gray-500">
                    {price}
                  </p>

                </div>

                <span
                  className={
                    change.startsWith("+")
                      ? "font-semibold text-green-500"
                      : "font-semibold text-red-500"
                  }
                >
                  {change}
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Bottom */}

      <section className="grid gap-6 lg:grid-cols-2">

        {/* Recent Trades */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-[#162033]
          "
        >

          <h2 className="mb-5 text-xl font-semibold">
            Recent Trades
          </h2>

          <div className="space-y-4">

            {["BTC Buy", "ETH Sell", "AAPL Buy", "TSLA Sell"].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-100
                  p-4

                  dark:border-slate-700
                "
              >

                <div>

                  <p className="font-semibold">
                    {item}
                  </p>

                  <p className="text-sm text-gray-500">
                    Completed
                  </p>

                </div>

                <span className="font-bold text-green-500">
                  +$250
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Market News */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm

            dark:border-slate-700
            dark:bg-[#162033]
          "
        >

          <div className="mb-5 flex justify-between">

            <h2 className="text-xl font-semibold">
              Market News
            </h2>

            <button className="text-blue-600 hover:underline">
              View All
            </button>

          </div>

          <div className="space-y-4">

            {news.map((item) => (

              <div
                key={item}
                className="
                  rounded-xl
                  border
                  border-gray-100
                  p-4
                  transition

                  hover:bg-gray-100

                  dark:border-slate-700
                  dark:hover:bg-slate-800
                "
              >

                <p className="font-medium">
                  {item}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  5 min ago
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  );
}
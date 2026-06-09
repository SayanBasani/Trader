<div
    id="overlay"
    onclick="closeSidebar()"
    class="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
></div>

<aside
    id="sidebar"
    class="fixed lg:sticky left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800 z-40 transition-all duration-300 overflow-hidden -translate-x-full lg:translate-x-0"
>
    <div class="h-full overflow-y-auto flex flex-col min-w-[18rem]">

        <div class="px-6 py-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20 shrink-0">
                    T
                </div>
                <div class="sidebar-label transition-opacity duration-300">
                    <h2 class="font-bold text-lg text-slate-800 dark:text-white whitespace-nowrap">
                        Trader Pro
                    </h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        Financial Dashboard
                    </p>
                </div>
            </div>
        </div>

        <div class="flex-1 py-4">
            <div>
                <p class="sidebar-label px-6 mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-semibold transition-opacity duration-300">
                    Main
                </p>

                <div class="space-y-2 px-3">
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
                        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                            📊
                        </div>
                        <span class="font-semibold sidebar-label transition-opacity duration-300 whitespace-nowrap">
                            Dashboard
                        </span>
                    </a>

                    <a href="#" class="group flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            📈
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Trading</span>
                    </a>

                    <a href="#" class="group flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            💰
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Wallet</span>
                    </a>
                </div>
            </div>

            <div class="mt-8">
                <p class="sidebar-label px-6 mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-semibold transition-opacity duration-300">
                    Marketing
                </p>
                <div class="space-y-2 px-3">
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            👥
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Referrals</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            📢
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Campaigns</span>
                    </a>
                </div>
            </div>

            <div class="mt-8">
                <p class="sidebar-label px-6 mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-semibold transition-opacity duration-300">
                    System
                </p>
                <div class="space-y-2 px-3">
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            💬
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Support</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            ⚙️
                        </div>
                        <span class="sidebar-label transition-opacity duration-300 whitespace-nowrap">Settings</span>
                    </a>
                </div>
            </div>

            <div class="sidebar-label mx-4 mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-5 transition-opacity duration-300">
                <p class="text-white/70 text-sm whitespace-nowrap">Portfolio Value</p>
                <h3 class="text-white text-3xl font-bold mt-2">₹25,000</h3>
                <p class="text-white/80 text-sm mt-3 whitespace-nowrap">+12.4% this month</p>
            </div>
        </div>

        <div class="border-t border-slate-200 dark:border-slate-800 p-4">
            <div class="bg-slate-100 dark:bg-slate-900 rounded-2xl p-3 flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shrink-0">
                    S
                </div>
                <div class="sidebar-label transition-opacity duration-300">
                    <h3 class="text-sm font-semibold text-slate-800 dark:text-white whitespace-nowrap">
                        Sayan
                    </h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        Premium User
                    </p>
                </div>
            </div>
        </div>

    </div>
</aside>
<script>
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    let collapsed = false;

    function toggleSidebar() {
        // Detect view window breakpoint (Tailwind lg = 1024px)
        if (window.innerWidth >= 1024) {
            /* Desktop Mode: Collapse/Expand width */
            collapsed = !collapsed;
            if (collapsed) {
                sidebar.classList.remove("w-72");
                sidebar.classList.add("w-20");
                document.querySelectorAll(".sidebar-label").forEach(el => {
                    el.classList.add("opacity-0", "pointer-events-none");
                });
            } else {
                sidebar.classList.remove("w-20");
                sidebar.classList.add("w-72");
                document.querySelectorAll(".sidebar-label").forEach(el => {
                    el.classList.remove("opacity-0", "pointer-events-none");
                });
            }
        } else {
            /* Mobile Mode: Slide in / Slide out */
            sidebar.classList.toggle("-translate-x-full");
            overlay.classList.toggle("hidden");
        }
    }

    function closeSidebar() {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }
</script>
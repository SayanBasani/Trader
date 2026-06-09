<nav class=" top-0 left-0 right-0 h-16 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 " >

    <div class="h-full px-4 lg:px-6 flex items-center justify-between">

        <!-- LEFT -->

        <div class="flex items-center gap-4">

            <!-- SIDEBAR BUTTON -->

            <button
                onclick="toggleSidebar()"
                class="
                overlay
                p-2
                rounded-xl
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition
                lg:hidde
                "
            >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

            </button>

            <!-- LOGO -->

            <div class="flex items-center gap-3">

                <div class=" w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg " >
                    T
                </div>

                <div class="hidden sm:block">

                    <h1 class="font-bold text-lg">
                        Trader Pro
                    </h1>

                    <p class="text-xs text-slate-500">
                        Trading Platform
                    </p>

                </div>

            </div>

        </div>

        <!-- CENTER SEARCH -->

        <div class="hidden md:flex flex-1 max-w-xl mx-10">

            <div class="relative w-full">

                <input type="text" placeholder="Search..." class=" w-full h-11 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 outline-none focus:ring-2 focus:ring-blue-500 " >

            </div>

        </div>

        <!-- RIGHT -->

        <div class="flex items-center gap-3">

            <!-- THEME -->

            <button onclick="toggleTheme()" class=" w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 hover:scale-105 transition " >
                🌙
            </button>

            <!-- NOTIFICATION -->

            <button class=" relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 " >

                🔔

                <span class=" absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full " ></span>

            </button>

            <!-- PROFILE -->

            <button class=" flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-2 py-2 rounded-2xl " >

                <div class=" w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold " >
                    S
                </div>

                <div class="hidden lg:block text-left">

                    <h3 class="text-sm font-semibold">
                        Sayan
                    </h3>

                    <p class="text-xs text-slate-500">
                        Premium
                    </p>

                </div>

            </button>

        </div>

    </div>

</nav>
<script>
    function toggleTheme() {

        const html = document.documentElement;

        html.classList.toggle('dark');

        if(html.classList.contains('dark')) {
            localStorage.setItem('theme','dark');
        } else {
            localStorage.setItem('theme','light');
        }
    }

    if(localStorage.getItem('theme') === 'light'){
        document.documentElement.classList.remove('dark');
    }
</script>


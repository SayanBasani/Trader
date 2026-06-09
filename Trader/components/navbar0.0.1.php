<nav class="top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-50">

    <div class="h-full px-4 flex justify-between items-center">

        <div class="flex items-center gap-3">

            <button
                onclick="toggleSidebar()"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            >
                ☰
            </button>

            <h1 class="font-bold text-xl">
                Trader
            </h1>

        </div>

        <div class="flex items-center gap-3">

            <button
                onclick="toggleTheme()"
                class="p-2 rounded-lg bg-slate-200 dark:bg-slate-800"
            >
                🌙
            </button>

            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                S
            </div>

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
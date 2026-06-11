<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Trader Pro</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            darkMode: 'class'
        };
    </script>
</head>

<body class="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

    <script>
        if(localStorage.getItem('theme') === 'light'){
            document.documentElement.classList.remove('dark');
        }
    </script>

    <div class="min-h-screen flex">

        <!-- Left Side -->

        <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 relative overflow-hidden">

            <div class="absolute inset-0 bg-black/10"></div>

            <div class="relative z-10 flex flex-col justify-between text-white w-full">

                <div>

                    <div class="flex items-center gap-4">

                        <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold">
                            T
                        </div>

                        <div>
                            <h1 class="text-3xl font-bold">
                                Trader Pro
                            </h1>

                            <p class="text-white/80">
                                Professional Trading Platform
                            </p>
                        </div>

                    </div>

                </div>

                <div>

                    <h2 class="text-5xl font-bold leading-tight mb-6">
                        Trade Smarter.<br>
                        Grow Faster.
                    </h2>

                    <p class="text-lg text-white/80 mb-10">
                        Manage your portfolio, track profits, invite referrals, and monitor your trading performance from one dashboard.
                    </p>

                    <div class="grid grid-cols-3 gap-5">

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Portfolio
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                ₹1.2M
                            </h3>

                        </div>

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Traders
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                12K+
                            </h3>

                        </div>

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Profit
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                +18%
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- Right Side -->

        <div class="flex-1 flex items-center justify-center p-6">

            <div class="w-full max-w-md">

                <!-- Mobile Logo -->

                <div class="lg:hidden text-center mb-8">

                    <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                        T
                    </div>

                    <h1 class="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
                        Trader Pro
                    </h1>

                </div>

                <!-- Login Card -->

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8">

                    <div class="flex justify-between items-center mb-8">

                        <div>
                            <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
                                Welcome Back
                            </h2>

                            <p class="text-slate-500 mt-1">
                                Login to your account
                            </p>
                        </div>

                        <button
                            onclick="toggleTheme()"
                            class="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-105 transition"
                        >
                            🌙
                        </button>

                    </div>

                    <form>

                        <div class="mb-5">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="mb-5">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="flex justify-between items-center mb-6">

                            <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">

                                <input
                                    type="checkbox"
                                    class="rounded"
                                >

                                Remember Me

                            </label>

                            <a
                                href="#"
                                class="text-sm text-blue-600 hover:text-blue-500"
                            >
                                Forgot Password?
                            </a>

                        </div>

                        <button
                            type="submit"
                            class="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
                        >
                            Sign In
                        </button>

                    </form>

                    <div class="relative my-8">

                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-slate-200 dark:border-slate-700"></div>
                        </div>

                        <div class="relative flex justify-center">
                            <span class="bg-white dark:bg-slate-900 px-4 text-sm text-slate-500">
                                OR
                            </span>
                        </div>

                    </div>

                    <button
                        class="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        Continue with Google
                    </button>

                    <p class="text-center mt-8 text-slate-500">

                        Don't have an account?

                        <a
                            href="register.php"
                            class="text-blue-600 font-medium hover:text-blue-500"
                        >
                            Create Account
                        </a>

                    </p>

                </div>

            </div>

        </div>

    </div>

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
    </script>

</body>
</html>
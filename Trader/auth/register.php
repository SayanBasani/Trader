<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account | Trader Pro</title>

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
                        Start Your<br>
                        Trading Journey.
                    </h2>

                    <p class="text-lg text-white/80 mb-10">
                        Create your account, build your network, track referrals, manage your portfolio and trade from anywhere.
                    </p>

                    <div class="grid grid-cols-3 gap-5">

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Users
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                12K+
                            </h3>

                        </div>

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Referrals
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                8K+
                            </h3>

                        </div>

                        <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5">

                            <p class="text-white/70 text-sm">
                                Growth
                            </p>

                            <h3 class="text-2xl font-bold mt-2">
                                +24%
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- Right Side -->

        <div class="flex-1 flex items-center justify-center p-6">

            <div class="w-full max-w-lg">

                <!-- Mobile Logo -->

                <div class="lg:hidden text-center mb-8">

                    <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                        T
                    </div>

                    <h1 class="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
                        Trader Pro
                    </h1>

                </div>

                <!-- Register Card -->

                <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8">

                    <div class="flex justify-between items-center mb-8">

                        <div>

                            <h2 class="text-3xl font-bold text-slate-800 dark:text-white">
                                Create Account
                            </h2>

                            <p class="text-slate-500 mt-1">
                                Join Trader Pro today
                            </p>

                        </div>

                        <button
                            onclick="toggleTheme()"
                            class="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:scale-105 transition"
                        >
                            🌙
                        </button>

                    </div>

                    <form id="registerForm">

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                            <div>

                                <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="John"
                                    required
                                    class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                                >

                            </div>

                            <div>

                                <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Doe"
                                    required
                                    class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                                >

                            </div>

                        </div>

                        <div class="mb-4">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="mb-4">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Email Address
                            </label>

                            <input
                                type="text"
                                name="email"
                                placeholder="you@example.com"
                                required
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="mb-4">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="+91 9876543210"
                                required
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="mb-4">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <div class="mb-6">

                            <label class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm your password"
                                required
                                class="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-white"
                            >

                        </div>

                        <button
                            type="submit"
                            class="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
                        >
                            Create Account
                        </button>

                    </form>

                    <p class="text-center mt-8 text-slate-500">

                        Already have an account?

                        <a
                            href="login.php"
                            class="text-blue-600 font-medium hover:text-blue-500"
                        >
                            Sign In
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

<script type="module" src="./../assets/js/register.js"></script>

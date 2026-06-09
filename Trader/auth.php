<!DOCTYPE html>
<html lang="en" class="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trader Pro Auth</title>
<script src="https://cdn.tailwindcss.com"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
<script>
tailwind.config={darkMode:'class'};
if(localStorage.getItem('theme')==='light'){
 document.documentElement.classList.remove('dark');
}
</script>
</head>

<body class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden"
      x-data="{page:'login'}">

<div class="absolute inset-0 overflow-hidden">
    <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
</div>

<div class="relative min-h-screen flex">

    <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-12 text-white">
        <div class="flex flex-col justify-between w-full">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-2xl">T</div>
                <div>
                    <h1 class="text-3xl font-bold">Trader Pro</h1>
                    <p class="text-white/80">Professional Trading Platform</p>
                </div>
            </div>

            <div>
                <template x-if="page==='login'">
                    <div>
                        <h2 class="text-5xl font-bold mb-6">Welcome Back</h2>
                        <p class="text-lg text-white/80">Access your dashboard, trading portfolio and referrals.</p>
                    </div>
                </template>

                <template x-if="page==='register'">
                    <div>
                        <h2 class="text-5xl font-bold mb-6">Join Trader Pro</h2>
                        <p class="text-lg text-white/80">Create your account and start building your trading journey.</p>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <div class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md">

            <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-8">

                <div class="flex justify-between items-center mb-8">
                    <div>
                        <h2 class="text-3xl font-bold text-slate-800 dark:text-white" x-text="page==='login' ? 'Welcome Back' : 'Create Account'"></h2>
                        <p class="text-slate-500" x-text="page==='login' ? 'Login to continue' : 'Register your account'"></p>
                    </div>

                    <button onclick="toggleTheme()"
                        class="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800">
                        🌙
                    </button>
                </div>
<!--  login -->
                <div x-show="page==='login'"
                     x-transition:enter="transition duration-500"
                     x-transition:enter-start="opacity-0 translate-x-6"
                     x-transition:enter-end="opacity-100 translate-x-0">

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

                    <p class="text-center mt-6 text-slate-500">
                        Don't have an account?
                        <button @click="page='register'" type="button" class="text-blue-600 font-semibold">
                            Create Account
                        </button>
                    </p>
                </div>

<!-- register -->
                <div x-show="page==='register'"
                     x-transition:enter="transition duration-500"
                     x-transition:enter-start="opacity-0 -translate-x-6"
                     x-transition:enter-end="opacity-100 translate-x-0">

                    <form>
                        <input type="text" placeholder="Full Name"
                            class="w-full h-12 px-4 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

                        <input type="email" placeholder="Email"
                            class="w-full h-12 px-4 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

                        <input type="text" placeholder="Referral Code (Optional)"
                            class="w-full h-12 px-4 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

                        <input type="password" placeholder="Password"
                            class="w-full h-12 px-4 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">

                        <button class="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold">
                            Create Account
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

                    <p class="text-center mt-6 text-slate-500">
                        Already have an account?
                        <button @click="page='login'" type="button" class="text-blue-600 font-semibold">
                            Sign In
                        </button>
                    </p>
                </div>

            </div>
        </div>
    </div>
</div>

<script>
function toggleTheme(){
 const html=document.documentElement;
 html.classList.toggle('dark');
 localStorage.setItem('theme',html.classList.contains('dark')?'dark':'light');
}
</script>

</body>
</html>
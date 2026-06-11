<?php
$target_url = "./auth/login.php";
ob_start();
?>

<div class="max-w-7xl mx-auto p-6">

    <!-- Profile Header -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">

        <div class="flex flex-col md:flex-row items-center gap-6">

            <div class="relative">
                <img
                    src="https://ui-avatars.com/api/?name=Sayan+Basani&background=2563eb&color=fff&size=200"
                    alt="Profile"
                    class="w-28 h-28 rounded-full border-4 border-blue-500"
                >

                <button class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow">
                    ✎
                </button>
            </div>

            <div class="flex-1 text-center md:text-left">

                <h1 class="text-3xl font-bold text-slate-800 dark:text-white">
                    Sayan Basani
                </h1>

                <p class="text-slate-500 dark:text-slate-400">
                    @sayanbasani
                </p>

                <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-3">

                    <span class="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        Verified Trader
                    </span>

                    <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                        Active Account
                    </span>

                    <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                        Premium Member
                    </span>

                </div>

            </div>

            <button
                class="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition"
            >
                Edit Profile
            </button>

        </div>

    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow">

            <p class="text-slate-500 dark:text-slate-400">
                Wallet Balance
            </p>

            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mt-2">
                $12,450
            </h2>

        </div>

        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow">

            <p class="text-slate-500 dark:text-slate-400">
                Total Trades
            </p>

            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mt-2">
                256
            </h2>

        </div>

        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow">

            <p class="text-slate-500 dark:text-slate-400">
                Referrals
            </p>

            <h2 class="text-2xl font-bold text-slate-800 dark:text-white mt-2">
                18
            </h2>

        </div>

        <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow">

            <p class="text-slate-500 dark:text-slate-400">
                KYC Status
            </p>

            <h2 class="text-xl font-bold text-green-600 mt-2">
                Verified
            </h2>

        </div>

    </div>

    <!-- Main Grid -->
    <div class="grid lg:grid-cols-2 gap-6">

        <!-- Personal Information -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">

            <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-5">
                Personal Information
            </h2>

            <div class="space-y-4">

                <div>
                    <label class="block mb-2 text-sm text-slate-600 dark:text-slate-400">
                        First Name
                    </label>

                    <input
                        type="text"
                        value="Sayan"
                        class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>

                <div>
                    <label class="block mb-2 text-sm text-slate-600 dark:text-slate-400">
                        Last Name
                    </label>

                    <input
                        type="text"
                        value="Basani"
                        class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>

                <div>
                    <label class="block mb-2 text-sm text-slate-600 dark:text-slate-400">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value="sayan@example.com"
                        class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>

                <div>
                    <label class="block mb-2 text-sm text-slate-600 dark:text-slate-400">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        value="+91 9876543210"
                        class="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                </div>

                <button
                    class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                    Save Changes
                </button>

            </div>

        </div>

        <!-- Security Settings -->
        <div class="space-y-6">

            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">

                <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-5">
                    Security Settings
                </h2>

                <div class="space-y-3">

                    <button class="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                        Change Password
                    </button>

                    <button class="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
                        Enable Two-Factor Authentication
                    </button>

                    <button class="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition">
                        Login History
                    </button>

                    <!-- <a href=""></a> -->
                    <button onclick="window.location.href='<?php echo $target_url; ?>'" class="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition">
                        Logout All Devices
                    </button>

                </div>

            </div>

            <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">

                <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-4">
                    Referral Program
                </h2>

                <label class="block mb-2 text-sm text-slate-600 dark:text-slate-400">
                    Your Referral Code
                </label>

                <div class="flex gap-3">

                    <input
                        type="text"
                        readonly
                        value="TRADERPRO-SAYAN123"
                        class="flex-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                    >

                    <button
                        class="px-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    >
                        Copy
                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

<?php
$content = ob_get_clean();
$title = "Profile";
include 'layout.php';
?>

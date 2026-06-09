<?php

ob_start();
?>

<h1 class="text-3xl font-bold mb-6">
    Dashboard
</h1>

<div class="grid grid-cols-4 gap-6">

    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

        <p class="text-gray-500">
            Balance
        </p>

        <h2 class="text-3xl font-bold mt-2">
            ₹25,000
        </h2>

    </div>

    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

        <p class="text-gray-500">
            Profit
        </p>

        <h2 class="text-3xl font-bold mt-2 text-green-500">
            ₹4,500
        </h2>

    </div>

    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

        <p class="text-gray-500">
            Referrals
        </p>

        <h2 class="text-3xl font-bold mt-2">
            23
        </h2>

    </div>

    <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow">

        <p class="text-gray-500">
            Trades
        </p>

        <h2 class="text-3xl font-bold mt-2">
            142
        </h2>

    </div>
</div>

<?php

$content = ob_get_clean();

$title = 'Dashboard';

include 'layout.php';
?>
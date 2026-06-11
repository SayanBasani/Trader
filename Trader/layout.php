<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'Trader' ?></title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="./assets/css/index.css">
    <link rel="stylesheet" href="./assets/css/style.css">

    <script>
        tailwind.config = {
            darkMode: 'class'
        }
    </script>
</head>

<body class="w-screen h-screen bg-gray-100 dark:bg-slate-950 text-gray-800 dark:text-white">
    <div class="fixed w-full">
        <?php include __DIR__ . '/components/navbar.php'; ?>
    </div>

    <div class="flex pt-16">

        <?php include __DIR__ . '/components/sidebar.php'; ?>

        <!-- <main class="cc flex-1 p-6 ml-64 mt-16"> -->
        <main class="flex-1 p-6">
            <?= $content ?? '' ?>
        </main>

    </div>

</body>
</html>
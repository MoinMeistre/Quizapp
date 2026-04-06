<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <title>PWA</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='styles.css'>
    <script src='script.js'>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
        }
    </script>
</head>

<body>
    <nav>
        <button onclick="navigate('home')">Home</button>
        <button onclick="navigate('messages')">Messages</button>
    </nav>

    <div id="app-root">

    </div>
</body>

</html>
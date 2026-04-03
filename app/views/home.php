<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/style.css">
    <title>MVC Message Board</title>
</head>
<body>
    <h1>Messages</h1>
    
    <form action="/index.php?url=post" method="POST">
        <input type="text" name="username" placeholder="Name" required>
        <textarea name="content" placeholder="Message" required></textarea>
        <button type="submit">Send</button>
    </form>

    <div class="message-list">
        <?php foreach ($messages as $msg): ?>
            <div class="msg">
                <strong><?= htmlspecialchars($msg['user_name']) ?>:</strong>
                <p><?= htmlspecialchars($msg['content']) ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>
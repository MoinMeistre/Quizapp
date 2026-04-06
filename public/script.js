const appRoot = document.getElementById('app-root');

// Simple Client-Side Routing
async function navigate(page) {
    if (page === 'home') {
        appRoot.innerHTML = `<h1>Welcome Home</h1><p>This is a smooth SPA experience.</p>`;
    } 
    
    if (page === 'messages') {
        appRoot.innerHTML = `<p>Loading messages...</p>`;
        const response = await fetch('/app/api.php?action=get_messages');
        const messages = await response.json();
        
        let html = '<h1>Messages</h1>';
        messages.forEach(m => {
            html += `<div class="card"><b>${m.user_name}:</b> ${m.content}</div>`;
        });
        appRoot.innerHTML = html;
    }
}

// Initial Load
navigate('home');

// Register Service Worker
   if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
        }
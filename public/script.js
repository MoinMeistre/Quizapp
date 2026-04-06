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
    navigator.serviceWorker.register('/sw.js');
}

// testfrage holen
async function frageHolen() {
    const url = "https://vogtserver.de:8888/api/quizzes/1";
    const auth = btoa("test@gmail.com:secret");

    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Basic ${auth}` }
        });

        const daten = await response.json();

        // HIER passiert die Magie: Wir füllen das HTML direkt
        document.getElementById('question-text').innerText = daten.text;

        // Wenn du feste Buttons im HTML hast (z.B. mit IDs btn0, btn1...)
        if (daten.options) {
            // Beispiel für den ersten Button:
            // document.getElementById('answer-1').innerText = daten.options[0];

            // ODER: Wir nutzen deine bestehende Funktion und geben die Daten mit:
            anzeigenImQuiz(daten);
        }
    } catch (error) {
        console.error("Fehler:", error);
    }
}

function anzeigenImQuiz(daten) {
    const container = document.getElementById('awnser-buttons');
    if (!container) return;

    container.innerHTML = ""; // Leeren

    // Buttons für Optionen erstellen
    daten.options.forEach((antwort, index) => {
        const btn = document.createElement('button');
        btn.innerText = antwort;
        btn.className = 'quiz-btn'; // Optional für CSS

        btn.onclick = () => {
            alert("Du hast gewählt: " + antwort);
        };

        container.appendChild(btn);
    });
}

// Nicht vergessen aufzurufen!
// frageHolen();
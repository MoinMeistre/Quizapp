import { QuizModel, AuthModel } from "./js/model.js";
import { QuizView, AuthView } from "./js/view.js";
import { QuizPresenter, AuthPresenter } from "./js/presenter.js";

// Init Apps on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Quiz-App initialisieren (View wird erst sichtbar nach Login)
  const quizApp = new QuizPresenter(new QuizModel(), new QuizView());
  quizApp.init();

  const authApp = new AuthPresenter(new AuthModel(), new AuthView());
  // Wenn Login erfolgreich, Score-Liste in der Quizview aktualisieren
  authApp.setOnLogin(() => {
    quizApp.loadScores();
  });

  authApp.init();
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}

// testfrage holen
async function frageHolen() {
  const url = "https://vogtserver.de:8888/api/quizzes/1";
  const auth = btoa("test@gmail.com:secret");
  console.log("Hole Frage von:", url);
  try {
    const response = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const daten = await response.json();

    document.getElementById("question-text").innerText = daten.text;


    if (daten.options) {
      anzeigenImQuiz(daten);
    }
  } catch (error) {
    console.error("Fehler:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const fetchButton = document.getElementById("fetch-question-btn");
  if (fetchButton) {
    console.log("Button gefunden, füge Event Listener hinzu.");
    fetchButton.addEventListener("click", frageHolen);
  }
});

function anzeigenImQuiz(daten) {
  const container = document.getElementById("awnser-buttons");
  if (!container) return;

  container.innerHTML = ""; // Leeren

  // Buttons für Optionen erstellen
  daten.options.forEach((antwort, index) => {
    const btn = document.createElement("button");
    btn.innerText = antwort;
    btn.className = "quiz-btn"; // Optional für CSS

    btn.onclick = () => {
      // Alle Buttons deaktivieren nach dem ersten Klick
      container.querySelectorAll("button").forEach(b => b.disabled = true);
      alert("Du hast gewählt: " + antwort);
    };

    container.appendChild(btn);
  });
}

// Nicht vergessen aufzurufen!
// frageHolen();

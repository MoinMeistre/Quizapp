import { QuizModel } from "./js/model.js";
import { QuizView } from "./js/view.js";
import { QuizPresenter } from "./js/presenter.js";

const app = new QuizPresenter(new QuizModel(), new QuizView());
app.init();

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
      alert("Du hast gewählt: " + antwort);
    };

    container.appendChild(btn);
  });
}

// Nicht vergessen aufzurufen!
// frageHolen();

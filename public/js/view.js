export class QuizView {
  constructor() {
    this.app = document.getElementById("app-root");
  }

  renderCategories(categories, onSelect) {
    this.app.innerHTML =
      '<nav><div id="card-container" class="card-container"><div class="card" id="server-card"><p id="card-5">Server</p><img src="images/server.jpg" alt="Lando 5" class="sport"></div> </div></nav>';
    const cardContainer = document.getElementById("card-container");
    const serverCard = document.getElementById("server-card");
    if (serverCard) {
      serverCard.onclick = () => onSelect('Server');
    }
    categories.forEach((cat) => {
      const container = document.createElement("div");
      container.className = "card";
      const img = document.createElement("img");
      img.src = `../images/${cat.toLowerCase()}.jpg`;
      img.alt = cat;

      const p = document.createElement("p");
      p.innerText = cat;
      container.onclick = () => onSelect(cat);

      container.appendChild(p);
      container.appendChild(img);
      cardContainer.appendChild(container);
    });
  }


  renderQuestion(question, index, onAnswerSelected, amount) {
    this.app.innerHTML = "";
    this.showProgress(index, amount);
    const qDiv = document.createElement("div");
    qDiv.className = "question-container";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `Frage ${index + 1}: ${question.frage}`;
    qDiv.appendChild(questionTitle);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "answer-buttons";

    question.optionen.forEach((opt, optIndex) => {
      const button = document.createElement("button");
      button.textContent = opt;
      button.className = "answer-btn";
      button.onclick = () => {
        onAnswerSelected(question, optIndex);
      };
      buttonContainer.appendChild(button);
    });

    qDiv.appendChild(buttonContainer);
    this.app.appendChild(qDiv);

    const backBtn = document.createElement("button");
    backBtn.innerText = "Zurück";
    backBtn.onclick = () => {
      location.reload();
    }; // Einfacher Reset
    this.app.appendChild(backBtn);
  }

  showProgress(current, total) {
    console.log("Aktueller Fortschritt:", current, "von", total);
    let progressBar = this.app.querySelector(".progress-bar");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      this.app.appendChild(progressBar);
    }
    let progress = document.createElement("div");
    progress.className = "progress-fill";
    progressBar.appendChild(progress);
    const percentage = ((current) / total) * 100;
    progress.style.width = percentage + "%";
  }

  showFeedback(isCorrect, explanation, correctAnswer, nextQuestionCallback) {
    // Container der Frage finden
    const targetContainer = this.app.querySelector(".question-container");

    // Falls Feedback da -> entfernen
    const oldFeedback = targetContainer.querySelector(".feedback");
    if (oldFeedback) {
      oldFeedback.remove();
    }

    // Neues Feedback erstellen
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";

    if (isCorrect) {
      feedbackDiv.className += " correct";
      if (explanation == undefined) explanation = "Gut gemacht!";
      feedbackDiv.innerHTML = `<strong>✓ Richtig!</strong> ${explanation}`;
    } else {
      feedbackDiv.className += " incorrect";
      if (explanation == undefined) explanation = "Leider falsch.";
      if (correctAnswer == undefined) correctAnswer = "Unbekannt";
      feedbackDiv.innerHTML = `<strong>✗ Falsch!</strong> Richtig wäre: ${correctAnswer}<br>${explanation}`;
    }

    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Nächste Frage";
    nextBtn.onclick = nextQuestionCallback;
    feedbackDiv.appendChild(nextBtn);
    targetContainer.appendChild(feedbackDiv);
  }

  showScore(score, total) {
    this.app.innerHTML = `<h2>Quiz beendet!</h2><p>Du hast ${score} von ${total} Fragen richtig beantwortet.</p><button onclick="location.reload()">Neues Quiz</button>`;
  }
}

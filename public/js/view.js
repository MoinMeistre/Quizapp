export class QuizView {
  constructor() {
    this.app = document.getElementById('app-root');
  }

  renderCategories(categories, onSelect) {
    let cardContainer = document.getElementById('card-container');
    if (!cardContainer) {
      cardContainer = document.createElement('div');
      cardContainer.id = 'card-container';
      this.app.appendChild(cardContainer);
    }
    categories.forEach(cat => {
      const container = document.createElement('div');
      container.className = 'card';
      const img = document.createElement('img');
      img.src = `images/${cat.toLowerCase()}.jpg`; // Annahme: Bildname entspricht Kategorie
      img.src = `../images/${cat.toLowerCase()}.jpg`;  
      img.alt = cat;
      
      const p = document.createElement('p');
      p.innerText = cat;
      container.onclick = () => onSelect(cat);
      
      container.appendChild(p);
      container.appendChild(img);
      cardContainer.appendChild(container);
    });
  }

  renderQuiz(questions, onAnswerSelected) {
    this.app.innerHTML = '';
    questions.forEach((q, index) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question-container';

      const questionTitle = document.createElement('h3');
      questionTitle.textContent = `Frage ${index + 1}: ${q.frage}`;
      qDiv.appendChild(questionTitle);

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'answer-buttons';

      q.optionen.forEach((opt, optIndex) => {
        const button = document.createElement('button');
        button.textContent = opt;
        button.className = 'answer-btn';
        button.onclick = () => {
          onAnswerSelected(q, optIndex, index);
        };
        buttonContainer.appendChild(button);
      });

      qDiv.appendChild(buttonContainer);
      this.app.appendChild(qDiv);
    });

    const backBtn = document.createElement('button');
    backBtn.innerText = "Zurück";
    backBtn.onclick = () => location.reload();
    this.app.appendChild(backBtn);
  }

  showFeedback(questionIndex, isCorrect, explanation, correctAnswer) {
    // Container der Frage finden
    const questionContainers = this.app.querySelectorAll('.question-container');
    const targetContainer = questionContainers[questionIndex];

    // Falls Feedback da -> entfernen
    const oldFeedback = targetContainer.querySelector('.feedback');
    if (oldFeedback) {
      oldFeedback.remove();
    }

    // Neues Feedback erstellen
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback';

    if (isCorrect) {
      feedbackDiv.className += ' correct';
      feedbackDiv.innerHTML = `<strong>✓ Richtig!</strong> ${explanation}`;
    } else {
      feedbackDiv.className += ' incorrect';
      feedbackDiv.innerHTML = `<strong>✗ Falsch!</strong> Richtig wäre: ${correctAnswer}<br>${explanation}`;
    }

    targetContainer.appendChild(feedbackDiv);
  }
}
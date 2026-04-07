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
      
      const p = document.createElement('p');
      p.innerText = cat;
      container.onclick = () => onSelect(cat);
      
      container.appendChild(p);
      cardContainer.appendChild(container);
    });
  }

  renderQuiz(questions) {
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
          button.onclick = () => this.handleAnswer(q, optIndex);
          // console.log(`Antwort ${optIndex} gewählt für Frage ${index + 1}`);
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
}
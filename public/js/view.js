export class QuizView {
  constructor() {
    this.app = document.getElementById('app-root');
  }

  renderCategories(categories, onSelect) {
    this.app.innerHTML = '<h2>Kategorie wählen</h2>';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.innerText = cat;
      btn.onclick = () => onSelect(cat);
      this.app.appendChild(btn);
    });
  }

  renderQuiz(questions) {
    this.app.innerHTML = '';
    questions.forEach((q, index) => {
      const qDiv = document.createElement('div');
      qDiv.innerHTML = `
        <h3>Frage ${index + 1}: ${q.frage}</h3>
        <ul>
          ${q.optionen.map(opt => `<li>${opt}</li>`).join('')}
        </ul>
      `;
      this.app.appendChild(qDiv);
    });
    
    const backBtn = document.createElement('button');
    backBtn.innerText = "Zurück";
    backBtn.onclick = () => location.reload(); // Einfacher Reset
    this.app.appendChild(backBtn);
  }
}
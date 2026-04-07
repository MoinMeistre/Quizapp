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
      img.src = `../images/${cat.toLowerCase()}.jpg`; // Annahme: Bildname entspricht Kategorie
      img.alt = cat;
      
      const p = document.createElement('p');
      p.innerText = cat;
      container.onclick = () => onSelect(cat);
      
      container.appendChild(p);
      container.appendChild(img);
      cardContainer.appendChild(container);
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
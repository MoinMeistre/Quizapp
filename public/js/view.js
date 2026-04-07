export class QuizView {
  constructor() {
    this.app = document.getElementById('app-root');
  }

  renderCategories(categories, onSelect) {
    this.app.innerHTML =  '<nav><div id="card-container" class="card-container"><div class="card"><p id="card-5">Server</p><img src="images/server.jpg" alt="Lando 5" class="sport"></div> </div></nav>';
    const cardContainer = document.getElementById('card-container');
    categories.forEach(cat => {
      const container = document.createElement('div');
      container.className = 'card';
      const img = document.createElement('img');
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

  renderQuiz(questions,categories, onSelect) {
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
    backBtn.onclick = () =>{
      location.reload() 
      this.renderCategories(categories, onSelect)
    } ; // Einfacher Reset
    this.app.appendChild(backBtn);
  }
}
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
       img.src = `images/${cat.toLowerCase()}.jpg`; // Annahme: Bildname entspricht Kategorie
      // img.src = `../images/${cat.toLowerCase()}.jpg`;
      img.alt = cat;
      
      const p = document.createElement('p');
      p.innerText = cat;
      container.onclick = () => onSelect(cat);
      
      container.appendChild(p);
      container.appendChild(img);
      cardContainer.appendChild(container);
    });
  }

  renderQuiz(questions,categories, onSelect,onAnswerSelected) {
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
    backBtn.onclick = () =>{
      location.reload() 
      this.renderCategories(categories, onSelect)
    } ; // Einfacher Reset
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


/**
 * AuthView
 * Zuständig für: DOM-Manipulation (Anzeigen/Verstecken, Fehlermeldungen)
 */
export class AuthView {
  constructor() {
    // DOM-Elemente cachen
    this.loginSection = document.getElementById('login-section');
    this.quizSection = document.getElementById('quiz-section');
    this.userInfo = document.getElementById('user-info');
    this.usernameDisplay = document.getElementById('username-display');
    this.authMessage = document.getElementById('auth-message');
    
    // Formulare
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.registerSection = document.getElementById('register-section');
    
    // Links zum Wechseln
    this.showRegisterLink = document.getElementById('show-register');
    this.showLoginLink = document.getElementById('show-login');
    
    // Buttons
    this.logoutBtn = document.getElementById('logout-btn');
  }

  // Zeigt den Quiz-Bereich (User ist eingeloggt)
  showQuiz(username) {
    this.loginSection.style.display = 'none';
    this.quizSection.style.display = 'block';
    this.userInfo.style.display = 'block';
    this.usernameDisplay.textContent = username;
    this.clearMessage();
  }

  // Zeigt den Login-Bereich (User ist ausgeloggt)
  showLogin() {
    this.loginSection.style.display = 'block';
    this.quizSection.style.display = 'none';
    this.userInfo.style.display = 'none';
    this.registerSection.style.display = 'none';
    this.clearMessage();
  }

  // Wechselt zur Registrierungs-Ansicht
  showRegister() {
    this.loginForm.style.display = 'none';
    this.loginForm.parentElement.querySelector('p').style.display = 'none';
    this.registerSection.style.display = 'block';
    this.clearMessage();
  }

  // Wechselt zurück zur Login-Ansicht
  showLoginForm() {
    this.loginForm.style.display = 'block';
    this.loginForm.parentElement.querySelector('p').style.display = 'block';
    this.registerSection.style.display = 'none';
    this.clearMessage();
  }

  // Zeigt eine Fehlermeldung
  showError(message) {
    this.authMessage.style.color = 'red';
    this.authMessage.textContent = message;
  }

  // Zeigt eine Erfolgsmeldung
  showSuccess(message) {
    this.authMessage.style.color = 'green';
    this.authMessage.textContent = message;
  }

  // Löscht die Meldung
  clearMessage() {
    this.authMessage.textContent = '';
  }

  // Event-Listener binden (wird vom Presenter aufgerufen)
  bindLoginSubmit(handler) {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      handler(username, password);
    });
  }

  bindRegisterSubmit(handler) {
    this.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;
      handler(username, password);
    });
  }

  bindShowRegister(handler) {
    this.showRegisterLink.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindShowLogin(handler) {
    this.showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }

  bindLogout(handler) {
    this.logoutBtn.addEventListener('click', handler);
  }
}
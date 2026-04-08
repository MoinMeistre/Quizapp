export class QuizView {
  constructor() {
    this.app = document.getElementById("app-root");
    this.scoreContainer = document.getElementById("score-container");
    this.mobileScoreContainer = document.getElementById("mobile-score-container");
  }

  renderCategories(categories, onSelect) {
    const categoryInfo = {
        'Server': {
            icon: 'terminal',
            img: 'images/server.jpg',
            desc: 'Infrastructure, deployment, and backend systems.',
            tag: 'Cutting Edge',
            isLarge: true
        },
        'Tech': {
            icon: 'memory',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5c1MwKil7UsdYfmh9nr02QIHuV5EZX0ypZh2oKq7n3IjSm0wQYpnoZEIay7w6bP4_K5BDhjoPuB3Ha3rgFBIgWET8TQB-p3J_SQAaND4TeGLsE5q5zovyq2P1YBaaNQuSMZQgp-CKYLDt61HWCKZiHPVnfWwmMkTKaAKZkcuxmCseV9Z-DrLHY7DDD4bCui95xqHCLDUepa6T0irdSm9d7_18sszs7N1QSMpGI8j6_Ng9x1SYuzR4L7nIbJW3pBS2IrEfIh3xVZE',
            desc: 'AI, Silicon Valley, and the future of computation.',
            tag: 'Cutting Edge',
            isLarge: true
        },
        'Science': {
            icon: 'science',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3S5V6lA3CfBj6Ls4J6d8jX8N5gkLbvhyTwBICOFHJ0QQCPBHKFlS_cepqSGj9UZ8WG1W2V-VaZF-RM46GnuicVQzxlbsaU-alPHZK3rWGtyQhmmnKMPjAm37oZBgaQp-DVkSjFY_kb1mlt3H0OzcXOHSVMwgrhwVqAPvfyhOnMm75jdf29HvXwpGnHojDAKRix0_M8y3AtN9M1JEy_f0uaucbK79_MvGTOM76em0f30ARfw5b65YufqHHLXVL0LpkHY4yCLjDmyk',
            desc: 'Quantum physics to biology.',
            tag: '85% Global Avg'
        },
        'History': {
            icon: 'history_edu',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATa1uTXOGLUxVAZY4wYwLrO5OMtSB79P-BuabD9GAv0R81ZMLMabb-2Ff6c9EYzLQZ4Si7I9Ctfw9h7Jlms_GFFBtlYWxXrbzm4rh3UnVxyTim-ulL-pi_v1uTOi9aRDB_S1yQIuSibcskBxPt_hiILCt-anwrr5G5i2Y8SLnAh-tK7i7HufzsDFPdAh5D4XQu0ETLi9cnXrVzTBjTMdj7HzXtXo0vMsVnkPcTSuDIGMCJBkrisuyaoAp67AuLBJALV_EcHWDTbGw',
            desc: 'Chronicles of the human era.',
            tag: '15 Quizzes'
        },
        'Art': {
            icon: 'palette',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApo_JTtqWtJ6dEs6iTNzHuwJ6i9r-C2TKOpXn2igTL8kt6FmigwTFc_BPdTuTrDevF37ZauYo8fITg8gwj4aDuT6QfeRDqGSLc8kJQp_nFgvHAioocCoPxDU_NZphotVWnDA-EWO2U0Noh9yyHmQs-NqugUf-e8tHlKCzXW9trVQzaqRrOKBdMCfYielZb9HRBfhFlerBLpuVTY9UQ77RXJqS7yqmF2UgKpuldwBn9LvLtUYk3qhxk2ThkKQEcOQH5S2l8LpPn9iY',
            desc: 'Design, theory, and visionaries.',
            tag: '284 Users Active'
        },
        'Nature': {
            icon: 'forest',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Q8OnLSPRvuoIOJi7mgTQfFotfnujdR00GYNTd4v8Z_f_1lHj4CN2xf--ihuPcfNhRWYNF6FTrs1UzimMZmqhhA3qqozM6HWkYk_zxo4C13RPIYFRoCRKLeHqJ5HmFNQvgDx6UE6fYCFTJbG6iEwKG02Fils5EyaGIqG8Z5D8fqpsuhnPkZxAUG3Ner6UA-JX-LcUtYuGRTAY1UQHBIHnykYlkH6EC-CFpvUaAr7Aw8wigpL4gTG-yWlLJcoKz-c7iBqyrSulec8',
            desc: 'Wildlife and environmental systems.',
            tag: 'Unlocked Level 4'
        }
    };

    let headerHtml = `
      <section class="dashboard-header">
          <h1>Choose Your <span>Challenge</span></h1>
          <p>Explore a spectrum of knowledge through our liquid glass interface. Select a category to begin your journey through the Obsidian Lens.</p>
      </section>
      <div id="card-container" class="bento-grid"></div>
    `;
    this.app.innerHTML = headerHtml;

    const cardContainer = document.getElementById("card-container");

    // Feste Server Karte
    if (!categories.includes('Server')) {
       categories.unshift('Server'); 
    }

    categories.forEach((cat, idx) => {
        const info = categoryInfo[cat] || {
            icon: 'quiz',
            img: `images/${cat.toLowerCase()}.jpg`,
            desc: 'Test your knowledge.',
            tag: 'Available',
            isLarge: idx === 0 
        };

        const isLargeClass = info.isLarge ? 'col-span-8 is-large' : 'col-span-4';
        
        const cardHtml = `
            <div class="bento-bg ${info.isLarge ? 'is-large' : ''}">
                <img src="${info.img}" alt="${cat}" onerror="this.src=''; this.style.backgroundColor='#1f1f1f'">
            </div>
            <div class="bento-content ${info.isLarge ? 'is-large' : ''}">
                <div>
                   ${info.isLarge ? `<div class="flex items-center gap-3 mb-2" style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                       <span class="material-symbols-outlined bento-icon">${info.icon}</span>
                       <span style="font-size:0.625rem; letter-spacing:0.2em; text-transform:uppercase; color:var(--primary); font-weight:700;">${info.tag}</span>
                   </div>` : `<span class="material-symbols-outlined bento-icon">${info.icon}</span>`}
                   <h2 class="bento-title">${cat}</h2>
                   <p class="bento-desc">${info.desc}</p>
                </div>
                <div class="bento-footer">
                   ${info.isLarge ? `
                      <div class="bento-meta">Multiple Quizzes Available</div>
                      <button class="bento-action-btn">Enter</button>
                   ` : `
                      <span class="bento-meta">${info.tag}</span>
                      <span class="material-symbols-outlined bento-arrow">arrow_forward</span>
                   `}
                </div>
            </div>
        `;

        const container = document.createElement("div");
        container.className = `glass-card-item ${isLargeClass}`;
        container.style.gridColumnEnd = info.isLarge ? 'span 8' : 'span 4'; 
        container.innerHTML = cardHtml;
        container.onclick = () => onSelect(cat);
        cardContainer.appendChild(container);
    });
  }


  renderQuestion(question, index, score, onAnswerSelected, amount) {
    this.app.innerHTML = "";
    this.showProgress(score, index - score, amount);
    const qDiv = document.createElement("div");
    qDiv.className = "question-container";

    const questionTitle = document.createElement("h3");
    questionTitle.innerHTML = `Frage ${index + 1}: ${question.frage}`;
    qDiv.appendChild(questionTitle);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "answer-buttons";

    question.optionen.forEach((opt, optIndex) => {
      const button = document.createElement("button");
      button.innerHTML = opt;
      button.className = "answer-btn";
      button.onclick = () => {
      //Buttons sperren
        buttonContainer.querySelectorAll("button").forEach(b => b.disabled = true);
        onAnswerSelected(question, optIndex);
      };
      buttonContainer.appendChild(button);
    });

    qDiv.appendChild(buttonContainer);
    this.app.appendChild(qDiv);

    const backBtn = document.createElement("button");
    backBtn.innerText = "Abbrechen";
    backBtn.className = "btn btn-secondary";
    backBtn.style.marginTop = "2rem";
    backBtn.onclick = () => {
      location.reload();
    }; // Einfacher Reset
    this.app.appendChild(backBtn);
    this.typeset();
  }

  typeset() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => console.log('MathJax typesetting failed: ' + err.message));
    }
  }

  showProgress(correct, wrong, total) {
    let progressBar = this.app.querySelector(".progress-bar");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "progress-bar";
      progressBar.style.position = "relative";
      this.app.appendChild(progressBar);
    }

    progressBar.innerHTML = "";

    let correctProgress = document.createElement("div");
    correctProgress.className = "progress-fill correct";
    correctProgress.style.position = "absolute";
    correctProgress.style.left = "0";
    correctProgress.style.backgroundColor = "var(--success-color, green)";
    correctProgress.style.width = ((correct / total) * 100) + "%";
    progressBar.appendChild(correctProgress);

    let wrongProgress = document.createElement("div");
    wrongProgress.className = "progress-fill incorrect";
    wrongProgress.style.position = "absolute";
    wrongProgress.style.right = "0";
    wrongProgress.style.backgroundColor = "var(--danger-color, red)";
    wrongProgress.style.width = ((wrong / total) * 100) + "%";
    progressBar.appendChild(wrongProgress);
  }

  showFeedback(isCorrect, explanation, correctAnswer, nextQuestionCallback) {
    // Alte Overlay entfernen falls existent
    const oldOverlay = document.querySelector(".feedback-overlay");
    if (oldOverlay) {
      oldOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.className = "feedback-overlay";

    const isCorrectText = isCorrect ? 'Richtig!' : 'Leider falsch';
    const isCorrectSub = isCorrect ? 'Sehr gut gemacht' : 'Nicht aufgeben';
    const iconName = isCorrect ? 'check_circle' : 'cancel';
    const incorrectClass = isCorrect ? '' : ' incorrect';
    
    let explanationHtml = '';
    if (explanation) {
        explanationHtml = explanation;
    } else {
        explanationHtml = isCorrect ? "Weiter so!" : "Vielleicht beim nächsten Mal.";
    }

    if (!isCorrect && correctAnswer) {
        explanationHtml = `Die richtige Antwort wäre: <span style="color:var(--on-surface); font-weight:600;">${correctAnswer}</span>.<br><br>` + explanationHtml;
    }

    overlay.innerHTML = `
        <div class="feedback-panel">
            <div class="feedback-glow-bg${incorrectClass}"></div>
            
            <div style="margin-bottom: 2rem;">
                <div class="feedback-icon-ring${incorrectClass}">
                    <span class="material-symbols-outlined">${iconName}</span>
                </div>
                <h3 class="feedback-heading">${isCorrectText}</h3>
                <p class="feedback-subheading${incorrectClass}">${isCorrectSub}</p>
            </div>
            
            <div style="width: 100%; margin-bottom: 2rem;">
                <div class="feedback-divider"></div>
                <p class="feedback-explanation">
                    ${explanationHtml}
                </p>
                <div class="feedback-divider"></div>
            </div>
            
            <button class="feedback-cta" id="next-question-btn">
                Nächste Frage
                <span class="material-symbols-outlined" style="transition: transform 0.3s; margin-left: 0.5rem;" id="next-arrow">arrow_forward</span>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    const nextBtn = overlay.querySelector("#next-question-btn");
    nextBtn.onmouseover = () => { overlay.querySelector("#next-arrow").style.transform = "translateX(4px)"; };
    nextBtn.onmouseout = () => { overlay.querySelector("#next-arrow").style.transform = "translateX(0)"; };
    nextBtn.onclick = () => {
        overlay.remove();
        nextQuestionCallback();
    };

    this.typeset();
  }

  showScore(score, total) {
    const wrong = total - score;
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    
    this.app.innerHTML = `
      <div class="feedback" style="border-left: none; background: var(--surface-container); text-align:center;">
        <h2 style="font-size:2rem; margin-bottom:1rem;">Quiz beendet!</h2>
        <p style="color:var(--on-surface-variant);">Du hast ${score} von ${total} Fragen richtig beantwortet (Falsch: ${wrong}).</p>
        <h3 style="margin: 2rem 0; font-size: 3rem; color: var(--primary); font-family: var(--font-display);">${percentage}%</h3>
        <button class="btn btn-primary" onclick="location.reload()">Neues Quiz wählen</button>
      </div>`;
  }

  renderScores(scores) {
    const buildList = () => {
      const list = document.createElement('ul');
      list.className = 'leaderboard-list';

      if (scores && scores.length > 0) {
        scores.forEach((s, idx) => {
          const item = document.createElement('li');
          item.className = 'leaderboard-item';
          item.innerHTML = `
            <div class="lb-user-info">
              <span class="lb-rank">${idx + 1}</span>
              <span style="font-size:0.875rem; font-weight:500;">${s.username}</span>
            </div>
            <span class="lb-score">${s.score} pts</span>
          `;
          list.appendChild(item);
        });
      } else {
        const item = document.createElement('li');
        item.className = 'leaderboard-item';
        item.innerHTML = `<span style="font-size:0.875rem; color:var(--on-surface-variant);">Keine Scores vorhanden</span>`;
        list.appendChild(item);
      }
      return list;
    };

    // Desktop sidebar
    if (this.scoreContainer) {
      this.scoreContainer.innerHTML = '<h3>Top Contenders</h3>';
      this.scoreContainer.appendChild(buildList());
    }

    // Mobile leaderboard (below category grid)
    if (this.mobileScoreContainer) {
      const inner = this.mobileScoreContainer.querySelector('.mini-leaderboard');
      if (inner) {
        inner.innerHTML = '<h3>Top Contenders</h3>';
        inner.appendChild(buildList());
      }
    }
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
    this.quizSection.style.display = 'flex'; // Changed to flex for dashboard layout
    this.userInfo.style.display = 'block';
    
    // Update both displays
    this.usernameDisplay.textContent = username;
    const sidebarUser = document.getElementById('sidebar-username');
    if (sidebarUser) sidebarUser.textContent = username;
    
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

export class QuizPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.category = null;
  }

  async init() {
    this.loadScores(); // Nicht abwarten, im Hintergrund laden

    await this.model.loadData();
    const categories = this.model.getAllCategories();

    // Initial die Kategorien anzeigen
    this.view.renderCategories(categories, (selectedCat) => {
      this.startQuiz(selectedCat);
    });
  }

  async startQuiz(category) {
    this.category = category;
    this.questions = await this.model.getQuestionsByCategory(category, 10);
    this.currentIndex = 0;
    this.score = 0;
    this.showCurrentQuestion();
  }

  showCurrentQuestion() {
    console.log(this.questions.length)
    if (this.currentIndex < this.questions.length) {
      const question = this.questions[this.currentIndex];
      this.view.renderQuestion(
        question,
        this.currentIndex,
        this.score,
        (question, selectedIndex) => {
          this.validateAnswer(question, selectedIndex);
        },
        this.questions.length,
      );
    } else {
      this.showScore();
    }
  }

  async showScore() {
    this.view.showScore(this.score, this.questions.length);
    this.view.showProgress(this.score, this.currentIndex - this.score, this.questions.length);

    // Score in der Datenbank speichern
    await this.model.postScore(this.score, this.questions.length);

    // Score-Liste aktualisieren
    await this.loadScores();
  }

  async loadScores() {
    try {
      const scores = await this.model.getScores();
      this.view.renderScores(scores);
    } catch (error) {
      console.error('QuizPresenter: error loading scores:', error);
    }
  }

  // Validierung Frage
  async validateAnswer(question, selectedIndex) {
    if (question.kategorie === "Server") {
      const correct = await this.model.validateQuestion(question, selectedIndex);
      if (correct) this.score++;
      this.view.showFeedback(
        correct,
        undefined,
        undefined,
        () => {
          this.currentIndex++;
          this.showCurrentQuestion();
        },
      );
    } else {
      const isCorrect = selectedIndex === question.korrekte_antwort_index;
      if (isCorrect) this.score++;
      const correctAnswer = question.optionen[question.korrekte_antwort_index];

      // View informieren, um Feedback anzuzeigen
      this.view.showFeedback(
        isCorrect,
        question.erklaerung,
        correctAnswer,
        () => {
          this.currentIndex++;
          this.showCurrentQuestion();
        },
      );
    }
  }
}


/**
 * AuthPresenter
 * Zuständig für: Logik, verbindet Model und View
 */
export class AuthPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  // Initialisierung: Events binden + initialen Status anzeigen
  async init() {
    // Event-Handler an View binden
    this.view.bindLoginSubmit((username, password) => this.handleLogin(username, password));
    this.view.bindRegisterSubmit((username, password) => this.handleRegister(username, password));
    this.view.bindShowRegister(() => this.view.showRegister());
    this.view.bindShowLogin(() => this.view.showLoginForm());
    this.view.bindLogout(() => this.handleLogout());

    // Echter Offline-Check: Login überspringen wenn Server nicht erreichbar
    const online = await this.model.isServerReachable();
    if (!online) {
      console.log('Server unreachable. Switching to guest mode.');
      this.view.showQuiz('Gast (Offline)');
      if (this.onLogin) this.onLogin();
      return;
    }

    // Initialen Status prüfen: Ist User schon eingeloggt?
    if (this.model.isLoggedIn()) {
      const user = this.model.getUser();
      this.view.showQuiz(user.username);
    } else {
      this.view.showLogin();
    }
  }

  setOnLogin(callback) {
    this.onLogin = callback;
  }

  // Login-Handler
  async handleLogin(username, password) {
    try {
      const result = await this.model.login(username, password);

      if (result.success) {
        this.view.showQuiz(result.username);
        if (this.onLogin) this.onLogin();
      } else {
        this.view.showError(result.message);
      }
    } catch (error) {
      this.view.showError('Verbindungsfehler. Bitte später erneut versuchen.');
    }
  }

  // Registrierungs-Handler
  async handleRegister(username, password) {
    try {
      const result = await this.model.register(username, password);
      if (result.success) {
        this.view.showQuiz(result.username);
        if (this.onLogin) this.onLogin();
      } else {
        this.view.showError(result.message);
      }
    } catch (error) {
      console.log(error);
      this.view.showError('Verbindungsfehler. Bitte später erneut versuchen.');
    }
  }

  // Logout-Handler
  async handleLogout() {
    this.model.logout();

    // Wenn wir offline sind, direkt wieder zum Gast-Modus wechseln statt zum Login
    const online = await this.model.isServerReachable();
    if (!online) {
      console.log('Server unreachable during logout. Switching to guest mode.');
      this.view.showQuiz('Gast (Offline)');
      if (this.onLogin) this.onLogin();
    } else {
      this.view.showLogin();
    }
  }

  // Hilfsmethode: Gibt eingeloggten User zurück (für andere Module)
  getUser() {
    return this.model.getUser();
  }

  // Hilfsmethode: Prüft ob eingeloggt (für andere Module)
  isLoggedIn() {
    return this.model.isLoggedIn();
  }
}

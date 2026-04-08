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

  showScore() {
    this.view.showScore(this.score, this.questions.length);
    this.view.showProgress(this.score, this.currentIndex - this.score, this.questions.length);
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
  init() {
    // Event-Handler an View binden
    this.view.bindLoginSubmit((username, password) => this.handleLogin(username, password));
    this.view.bindRegisterSubmit((username, password) => this.handleRegister(username, password));
    this.view.bindShowRegister(() => this.view.showRegister());
    this.view.bindShowLogin(() => this.view.showLoginForm());
    this.view.bindLogout(() => this.handleLogout());

    // Initialen Status prüfen: Ist User schon eingeloggt?
    if (this.model.isLoggedIn()) {
      const user = this.model.getUser();
      this.view.showQuiz(user.username);
    } else {
      this.view.showLogin();
    }
  }

  // Login-Handler
  async handleLogin(username, password) {
    try {
      const result = await this.model.login(username, password);

      if (result.success) {
        this.view.showQuiz(result.username);
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
      } else {
        this.view.showError(result.message);
      }
    } catch (error) {
      this.view.showError('Verbindungsfehler. Bitte später erneut versuchen.');
    }
  }

  // Logout-Handler
  handleLogout() {
    this.model.logout();
    this.view.showLogin();
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

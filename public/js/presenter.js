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

  startQuiz(category) {
    this.category = category;
    this.questions = this.model.getQuestionsByCategory(category, 10);
    this.currentIndex = 0;
    this.score = 0;
    this.showCurrentQuestion();
  }

  showCurrentQuestion() {
    if (this.currentIndex < this.questions.length) {
      const question = this.questions[this.currentIndex];
      this.view.renderQuestion(
        question,
        this.currentIndex,
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
    this.view.showProgress(this.currentIndex, this.questions.length);
  }

  // Validierung Frage
  validateAnswer(question, selectedIndex) {
    if (question.kategorie === "Server") {
      const correct = this.model.validateQuestion(question, selectedIndex);
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


export class QuizPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
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
    const questions = this.model.getQuestionsByCategory(category, 5);
    this.view.renderQuiz(questions, this.model.getAllCategories(), (selectedCat) => {
      this.startQuiz(selectedCat);
    });
    this.view.renderQuiz(questions, (question, selectedIndex, questionIndex) => {
      this.validateAnswer(question, selectedIndex, questionIndex);
    });
  }

  // Validierung Frage
  validateAnswer(question, selectedIndex, questionIndex) {
    const isCorrect = selectedIndex === question.korrekte_antwort_index;
    const correctAnswer = question.optionen[question.korrekte_antwort_index];

    // View informieren, um Feedback anzuzeigen
    this.view.showFeedback(questionIndex, isCorrect, question.erklaerung, correctAnswer);

    return isCorrect;
  }
}



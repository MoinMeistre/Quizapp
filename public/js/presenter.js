
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
    this.view.renderQuiz(questions);
  }
}

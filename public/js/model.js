export class QuizModel {
  constructor() {
    this.questions = [];
  }

  async loadData() {
    // Hier wird deine JSON-Datei geladen
    const response = await fetch('questions.json');
    const data = await response.json();
    this.questions = data.quiz_data;
  }

  getQuestionsByCategory(category, amount) {
    // Filtern nach Kategorie
    const filtered = this.questions.filter(q => q.kategorie === category);
    console.log(`Gefundene Fragen für Kategorie "${category}":`, filtered.length);
    // Zufällige Sortierung und Auswahl der Anzahl
    return filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
  }

  getAllCategories() {
    return [...new Set(this.questions.map(q => q.kategorie))];
  }
}
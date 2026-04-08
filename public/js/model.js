export class QuizModel {
  constructor() {
    this.questions = [];
  }

  async loadData() {
    // Hier wird deine JSON-Datei geladen
    const response = await fetch("questions.json");
    const data = await response.json();
    this.questions = data.quiz_data;
  }

  async frageHolen(page) {
    const url = `https://vogtserver.de:8888/api/quizzes?page=${page}`;
    const auth = btoa("test@gmail.com:secret");
    console.log("Hole Frage von:", url);
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Basic ${auth}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const daten = await response.json();
      if (daten) {
        return daten;
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  }

  async validateQuestion(question, selectedIndex) {
    const url = `https://vogtserver.de:8888/api/quizzes/${question.id}/solve`;
    const auth = btoa("test@gmail.com:secret");
    const respone = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify([selectedIndex]),
    });

    if (!respone.ok) {
      throw new Error(`HTTP-Fehler! Status: ${respone.status}`);
    }

    const answer = await respone.json();
    return answer.success;
  }
  async getQuestionsByCategory(category, amount) {

    if (category === "Server") {
      const page = Math.floor(Math.random() * 3) + 1;
      const questions = await this.frageHolen(page);
      console.log(questions);
      const formattedQuestions = questions.content.map((q) => ({
        id: q.id,
        frage: q.text,
        optionen: q.options,
        korrekte_antwort_index: undefined,
        erklaerung: undefined,
        kategorie: "Server",
      }));
      return formattedQuestions.sort(() => 0.5 - Math.random()).slice(0, amount);
    }
    const filtered = this.questions.filter((q) => q.kategorie === category);
    console.log(
      `Gefundene Fragen für Kategorie "${category}":`,
      filtered.length,
    );
    // Zufällige Sortierung und Auswahl der Anzahl
    return filtered.sort(() => 0.5 - Math.random()).slice(0, amount);

  }

  getAllCategories() {
    return [...new Set(this.questions.map((q) => q.kategorie))];
  }
}

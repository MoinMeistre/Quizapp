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
      const page = Math.floor(Math.random() * 2) + 1;
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

  async postScore(score, totalQuestions) {
    const userJson = localStorage.getItem('quizapp_user');
    if (!userJson) return;
    try {
      const user = JSON.parse(userJson);
      const response = await fetch('../api/scores.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          score: score,
          total_questions: totalQuestions
        })
      });
      const data = await response.json();
      if (!data.success) {
        console.error('API Error posting score:', data.message);
      }
    } catch (error) {
      console.error('Fehler beim Senden des Scores:', error);
    }
  }

  async getScores() {
    try {
      const url = '../api/scores.php';
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        console.error('API Error getting scores:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Scores:', error);
      return [];
    }
  }

  getAllCategories() {
    return [...new Set(this.questions.map((q) => q.kategorie).filter(Boolean))];
  }
}



/**
 * AuthModel
 * Zuständig für: Daten + API-Kommunikation (Login, Register, User-Status)
 */
export class AuthModel {
  constructor() {
    // User-Daten aus localStorage laden (falls vorhanden)
    this.user = this.loadUserFromStorage();
  }

  // Prüft ob User eingeloggt ist
  isLoggedIn() {
    return this.user !== null;
  }

  // Gibt aktuellen User zurück
  getUser() {
    return this.user;
  }

  // User aus localStorage laden
  loadUserFromStorage() {
    const stored = localStorage.getItem('quizapp_user');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  }

  // User in localStorage speichern
  saveUserToStorage(user) {
    localStorage.setItem('quizapp_user', JSON.stringify(user));
  }

  // User aus localStorage entfernen
  removeUserFromStorage() {
    localStorage.removeItem('quizapp_user');
  }

  // API: Login
  async login(username, password) {
    const response = await fetch('../api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      this.user = {
        id: data.user_id,
        username: data.username
      };
      this.saveUserToStorage(this.user);
    }

    return data;
  }

  // API: Registrierung
  async register(username, password) {
    const response = await fetch('../api/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
      this.user = {
        id: data.user_id,
        username: data.username
      };
      this.saveUserToStorage(this.user);
    }

    return data;
  }

  // Logout
  logout() {
    this.user = null;
    this.removeUserFromStorage();
  }
}

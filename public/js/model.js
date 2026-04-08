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

  getQuestionsByCategory(category, amount = 5) {
    // Filtern nach Kategorie
    const filtered = this.questions.filter(q => q.kategorie === category);
    
    // Zufällige Sortierung und Auswahl der Anzahl
    return filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, amount);
  }

  getAllCategories() {
    return [...new Set(this.questions.map(q => q.kategorie))];
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
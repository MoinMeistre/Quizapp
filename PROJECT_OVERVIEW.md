# Quizapp - Project Overview

## Purpose of the App
Quizapp is a web-based quiz application developed for a web programming module in Kazakhstan by Felix Kalz and Philipp Daun. The application allows users to participate in a quiz, tracks their scores, and stores them in a local database. The questions are loaded dynamically from a JSON file, and the application includes a Service Worker, suggesting Progressive Web App (PWA) capabilities for offline access or caching.

## Tech Stack
-   **Frontend**: 
    -   HTML5 for structure (`public/index.html`).
    -   CSS3 for styling (`public/styles.css`).
    -   Vanilla JavaScript for application logic and interactions (`public/script.js` and `public/js/`).
    -   Service Worker API (`public/service-worker.js`) for PWA functionalities.
-   **Backend**: 
    -   PHP (version independent) for handling API requests and interacting with the database (`app/api.php` and `app/models/score.php`).
-   **Database**: 
    -   SQLite (`data.sqlite`) for lightweight, serverless data storage.
-   **Data Interchange**: 
    -   JSON for question data (`public/questions.json`).

## Project Structure
The project follows a standard file structure separating frontend assets from backend logic:

```plaintext
Quizapp/
│
├── README.md               # Project metadata and authors.
├── data.sqlite             # SQLite database storing user scores.
├── app/                    # Backend application logic.
│   ├── api.php             # Main entry point for API interactions and database connection setup.
│   └── models/
│       └── score.php       # PHP logic handling score operations (saving/retrieving).
│
└── public/                 # Frontend assets served to the client.
    ├── index.html          # Main HTML document for the application.
    ├── questions.json      # JSON file containing quiz questions and answers.
    ├── script.js           # Main JavaScript file for frontend logic.
    ├── styles.css          # Stylesheet for the application.
    ├── service-worker.js   # Service worker for offline caching and PWA features.
    ├── js/                 # Additional JavaScript modules or libraries.
    └── images/             # Image directory.
```

## Setup & Execution
*(Based on the available stack)*
To run this application, you need a web server capable of running PHP with the SQLite extension enabled (e.g., using PHP's built-in web server or Apache/Nginx). 
For a quick local start, you can run:
```bash
php -S localhost:8000
```
Navigate to `http://localhost:8000/public/` to view the frontend interface. The backend scripts will be accessible under `/app/`.

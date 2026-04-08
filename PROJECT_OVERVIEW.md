# Quizapp - Project Overview

## Purpose of the App
Quizapp is a web-based quiz application developed for a web programming module in Kazakhstan by Felix Kalz and Philipp Daun. The application allows users to participate in a quiz, tracks their scores, and stores them in a local SQLite database. It features user authentication, mathematical expression rendering, and real-time progress visualization.

## Tech Stack
-   **Frontend**: 
    -   **HTML5**: Core structure (`public/index.html`).
    -   **CSS3**: Styling and layout (`public/styles.css`).
    -   **JavaScript (ES6+)**: Modular logic following the **MVP (Model-View-Presenter)** pattern.
    -   **MathJax**: Library used for rendering complex mathematical expressions in quiz questions.
    -   **Service Worker**: Enables Progressive Web App (PWA) capabilities, including offline caching.
-   **Backend**: 
    -   **PHP**: Handles API requests, user authentication, and score management (`api/`).
-   **Database**: 
    -   **SQLite**: Lightweight file-based database (`data.sqlite`) for storing user data and scores.
-   **Data Interchange**: 
    -   **JSON**: Used for quiz questions (`public/questions.json`) and API communication.

## Key Features
-   **User Authentication**: Register and login functionality to track individual performance.
-   **Dynamic Quiz**: Questions loaded from JSON, supporting text and mathematical formulas (via MathJax).
-   **Visual Feedback**: A split progress bar showing the ratio of correct (green) vs. incorrect (red) answers in real-time.
-   **Leaderboard**: Fetches and displays top scores from the database.
-   **PWA Support**: Offline capability and resource caching via a Service Worker.

## Project Structure
The project is organized into a clean separation of concerns:

```plaintext
Quizapp/
│
├── api/                    # Backend API (PHP)
│   ├── Database.php        # SQLite connection and setup
│   ├── login.php           # User authentication logic
│   ├── register.php        # User registration logic
│   └── scores.php          # Score retrieval and updates
│
├── public/                 # Frontend assets
│   ├── index.html          # Main entry point
│   ├── styles.css          # Application styling
│   ├── script.js           # Launcher/Initialization script
│   ├── service-worker.js   # PWA caching logic
│   ├── questions.json      # Quiz content
│   └── js/                 # MVP Architecture
│       ├── model.js        # Data handling and API calls
│       ├── view.js         # DOM manipulation and event binding
│       └── presenter.js    # Logic coordination between Model and View
│
├── data.sqlite             # Database file
└── README.md               # Project metadata
```

## Setup & Execution
To run the application locally:

1.  **Start PHP Server**: Run the following command in the root directory:
    ```bash
    php -S localhost:8000
    ```
2.  **Access the App**: Open your browser and navigate to:
    `http://localhost:8000/public/`

The backend APIs are automatically wired to handle requests from the frontend modules.

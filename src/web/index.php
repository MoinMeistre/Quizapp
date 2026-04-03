<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Quiz Application</h1>
            <p id="score-display" class="score">Score: <span id="score">0</span> / <span id="total">0</span></p>
        </header>

        <main>
            <!-- Welcome Screen -->
            <div id="welcome-screen" class="screen active">
                <h2>Welcome to Quiz App</h2>
                <p>Test your knowledge with our interactive quiz</p>
                <button onclick="startQuiz()" class="btn btn-primary">Start Quiz</button>
            </div>

            <!-- Quiz Screen -->
            <div id="quiz-screen" class="screen">
                <div id="question-container">
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill"></div>
                    </div>
                    <h2 id="question-text" class="question"></h2>
                    <div id="options-container" class="options"></div>
                    <div class="quiz-controls">
                        <button id="prev-btn" onclick="previousQuestion()" class="btn btn-secondary" disabled>Previous</button>
                        <button id="next-btn" onclick="nextQuestion()" class="btn btn-secondary">Next</button>
                    </div>
                </div>
            </div>

            <!-- Results Screen -->
            <div id="results-screen" class="screen">
                <h2>Quiz Complete!</h2>
                <div class="results-box">
                    <p class="result-score" id="final-score"></p>
                    <p class="result-percentage" id="result-percentage"></p>
                    <p id="result-message" class="result-message"></p>
                </div>
                <div class="results-details" id="results-details"></div>
                <button onclick="restartQuiz()" class="btn btn-primary">Retake Quiz</button>
            </div>
        </main>

        <footer>
            <p>&copy; 2026 Quiz App - Web Programming Module</p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>

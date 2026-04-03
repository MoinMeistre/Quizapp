// Quiz Application Frontend Logic

let currentQuestion = 0;
let score = 0;
let answers = [];
let questions = [];
let quizStarted = false;

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchQuestions();
});

// Fetch questions from backend
async function fetchQuestions() {
    try {
        const response = await fetch('../server/api.php?action=getQuestions');
        const data = await response.json();
        if (data.success) {
            questions = data.questions;
            document.getElementById('total').textContent = questions.length;
        } else {
            console.error('Error fetching questions:', data.message);
            // Load default questions if API fails
            loadDefaultQuestions();
        }
    } catch (error) {
        console.error('Error:', error);
        loadDefaultQuestions();
    }
}

// Load default questions for demo
function loadDefaultQuestions() {
    questions = [
        {
            id: 1,
            text: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            id: 2,
            text: "Which planet is closest to the Sun?",
            options: ["Venus", "Mercury", "Earth", "Mars"],
            correct: 1
        },
        {
            id: 3,
            text: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            id: 4,
            text: "Who wrote 'Romeo and Juliet'?",
            options: ["Jane Austen", "William Shakespeare", "Mark Twain", "Charles Dickens"],
            correct: 1
        },
        {
            id: 5,
            text: "What is the largest ocean?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        }
    ];
    document.getElementById('total').textContent = questions.length;
}

// Start quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    answers = new Array(questions.length).fill(null);
    
    // Reset answer displays
    document.getElementById('score').textContent = '0';
    
    // Show quiz screen
    switchScreen('quiz-screen');
    displayQuestion();
}

// Switch between screens
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Display current question
function displayQuestion() {
    if (!questions.length) return;

    const question = questions[currentQuestion];
    const total = questions.length;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / total) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Update question text
    document.getElementById('question-text').textContent = 
        `Question ${currentQuestion + 1} of ${total}: ${question.text}`;
    
    // Clear previous options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        
        // Highlight previously selected answer
        if (answers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        optionsContainer.appendChild(button);
    });
    
    // Update button states
    updateNavigationButtons();
}

// Select an answer
function selectAnswer(index) {
    answers[currentQuestion] = index;
    
    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const total = questions.length;
    
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === total - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

// Finish quiz and calculate results
function finishQuiz() {
    // Calculate score
    score = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.correct) {
            score++;
        }
    });
    
    // Show results
    showResults();
}

// Display results
function showResults() {
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    
    // Update score display
    document.getElementById('final-score').textContent = 
        `You scored ${score} out of ${total}`;
    
    document.getElementById('result-percentage').textContent = 
        `${percentage}% Correct`;
    
    // Add result message based on score
    let message = '';
    if (percentage === 100) {
        message = '🎉 Perfect! You got all questions correct!';
    } else if (percentage >= 80) {
        message = '✨ Excellent work!';
    } else if (percentage >= 60) {
        message = '👍 Good job!';
    } else if (percentage >= 40) {
        message = '📚 Keep practicing!';
    } else {
        message = '💪 Try again and improve!';
    }
    document.getElementById('result-message').textContent = message;
    
    // Display detailed results
    displayDetailedResults();
    
    // Show results screen
    switchScreen('results-screen');
}

// Display detailed question results
function displayDetailedResults() {
    const detailsContainer = document.getElementById('results-details');
    detailsContainer.innerHTML = '<h3 style="margin-bottom: 15px; color: var(--secondary-color);">Review Your Answers:</h3>';
    
    questions.forEach((question, index) => {
        const isCorrect = answers[index] === question.correct;
        const resultDiv = document.createElement('div');
        resultDiv.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'result-item-question';
        questionDiv.textContent = `Q${index + 1}: ${question.text}`;
        
        const answerDiv = document.createElement('div');
        answerDiv.className = 'result-item-answer';
        
        const selectedAnswer = answers[index] !== null ? 
            question.options[answers[index]] : 'Not answered';
        const correctAnswer = question.options[question.correct];
        
        answerDiv.innerHTML = `
            <p><strong>Your answer:</strong> ${selectedAnswer}</p>
            ${!isCorrect ? `<p><strong style="color: var(--success-color);">Correct answer:</strong> ${correctAnswer}</p>` : ''}
            <p style="font-weight: bold; color: ${isCorrect ? 'var(--success-color)' : 'var(--danger-color)'};">
                ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
            </p>
        `;
        
        resultDiv.appendChild(questionDiv);
        resultDiv.appendChild(answerDiv);
        detailsContainer.appendChild(resultDiv);
    });
}

// Restart quiz
function restartQuiz() {
    switchScreen('welcome-screen');
    startQuiz();
}

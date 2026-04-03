<?php
/**
 * Quiz Application - Configuration and Database Handler
 */

// Configuration
define('DB_TYPE', 'sqlite'); // 'sqlite' or 'mysql'
define('DB_PATH', __DIR__ . '/../data/quiz.db');
define('DATA_DIR', __DIR__ . '/../data');

// Ensure data directory exists
if (!is_dir(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

// Database error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', DATA_DIR . '/error.log');

/**
 * Get database instance
 */
function getDatabase() {
    static $db = null;
    if ($db === null) {
        $db = new QuizDatabase();
    }
    return $db;
}

/**
 * Simple SQLite Database Handler
 */
class QuizDatabase {
    private $db;
    
    public function __construct() {
        try {
            // Connect to SQLite database
            $this->db = new PDO('sqlite:' . DB_PATH);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->initializeDatabase();
        } catch (PDOException $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
    }
    
    /**
     * Initialize database tables if they don't exist
     */
    private function initializeDatabase() {
        try {
            // Check if questions table exists
            $result = $this->db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='questions'");
            
            if ($result->rowCount() == 0) {
                // Create tables
                $this->createTables();
                $this->seedSampleData();
            }
        } catch (PDOException $e) {
            error_log("Database initialization error: " . $e->getMessage());
        }
    }
    
    /**
     * Create database tables
     */
    private function createTables() {
        $sql = "
            CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_text TEXT NOT NULL,
                option_a TEXT NOT NULL,
                option_b TEXT NOT NULL,
                option_c TEXT NOT NULL,
                option_d TEXT NOT NULL,
                correct_answer INTEGER NOT NULL CHECK(correct_answer BETWEEN 1 AND 4),
                category TEXT,
                difficulty TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                score INTEGER,
                total_questions INTEGER,
                percentage REAL,
                answers TEXT,
                completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE user_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_activity DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        ";
        
        $this->db->exec($sql);
    }
    
    /**
     * Seed sample quiz questions
     */
    private function seedSampleData() {
        $questions = [
            [
                'text' => 'What is the capital of France?',
                'a' => 'London',
                'b' => 'Berlin',
                'c' => 'Paris',
                'd' => 'Madrid',
                'correct' => 3,
                'category' => 'Geography',
                'difficulty' => 'Easy'
            ],
            [
                'text' => 'Which planet is closest to the Sun?',
                'a' => 'Venus',
                'b' => 'Mercury',
                'c' => 'Earth',
                'd' => 'Mars',
                'correct' => 2,
                'category' => 'Science',
                'difficulty' => 'Easy'
            ],
            [
                'text' => 'What is 2 + 2?',
                'a' => '3',
                'b' => '4',
                'c' => '5',
                'd' => '6',
                'correct' => 2,
                'category' => 'Math',
                'difficulty' => 'Easy'
            ],
            [
                'text' => 'Who wrote "Romeo and Juliet"?',
                'a' => 'Jane Austen',
                'b' => 'William Shakespeare',
                'c' => 'Mark Twain',
                'd' => 'Charles Dickens',
                'correct' => 2,
                'category' => 'Literature',
                'difficulty' => 'Medium'
            ],
            [
                'text' => 'What is the largest ocean?',
                'a' => 'Atlantic Ocean',
                'b' => 'Indian Ocean',
                'c' => 'Arctic Ocean',
                'd' => 'Pacific Ocean',
                'correct' => 4,
                'category' => 'Geography',
                'difficulty' => 'Easy'
            ],
            [
                'text' => 'In what year did World War II end?',
                'a' => '1943',
                'b' => '1944',
                'c' => '1945',
                'd' => '1946',
                'correct' => 3,
                'category' => 'History',
                'difficulty' => 'Medium'
            ],
            [
                'text' => 'What is the chemical symbol for Gold?',
                'a' => 'Go',
                'b' => 'Gd',
                'c' => 'Au',
                'd' => 'Ag',
                'correct' => 3,
                'category' => 'Chemistry',
                'difficulty' => 'Medium'
            ],
            [
                'text' => 'Which country has the most population?',
                'a' => 'India',
                'b' => 'China',
                'c' => 'United States',
                'd' => 'Indonesia',
                'correct' => 1,
                'category' => 'Geography',
                'difficulty' => 'Hard'
            ],
        ];
        
        $stmt = $this->db->prepare("
            INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, category, difficulty)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($questions as $q) {
            $stmt->execute([
                $q['text'],
                $q['a'],
                $q['b'],
                $q['c'],
                $q['d'],
                $q['correct'],
                $q['category'],
                $q['difficulty']
            ]);
        }
    }
    
    /**
     * Get all questions
     */
    public function getAllQuestions() {
        try {
            $stmt = $this->db->query("SELECT * FROM questions ORDER BY id ASC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching questions: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get question by ID
     */
    public function getQuestionById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM questions WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching question: " . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Get questions by category
     */
    public function getQuestionsByCategory($category) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM questions WHERE category = ? ORDER BY id ASC");
            $stmt->execute([$category]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching questions by category: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Get question count
     */
    public function getQuestionCount() {
        try {
            $stmt = $this->db->query("SELECT COUNT(*) as count FROM questions");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['count'];
        } catch (PDOException $e) {
            error_log("Error counting questions: " . $e->getMessage());
            return 0;
        }
    }
    
    /**
     * Save quiz result
     */
    public function saveResult($userId, $score, $totalQuestions, $answers) {
        try {
            $percentage = ($score / $totalQuestions) * 100;
            $stmt = $this->db->prepare("
                INSERT INTO results (user_id, score, total_questions, percentage, answers)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $userId,
                $score,
                $totalQuestions,
                $percentage,
                json_encode($answers)
            ]);
            return true;
        } catch (PDOException $e) {
            error_log("Error saving result: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get user statistics
     */
    public function getUserStats($userId) {
        try {
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as attempts, AVG(percentage) as avg_score, MAX(percentage) as best_score
                FROM results
                WHERE user_id = ?
            ");
            $stmt->execute([$userId]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching user stats: " . $e->getMessage());
            return null;
        }
    }
}

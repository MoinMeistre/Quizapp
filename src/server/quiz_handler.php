<?php
/**
 * Quiz Application - Quiz Handler and Business Logic
 */

/**
 * Validate quiz answers format
 */
function validateAnswers($answers) {
    if (!is_array($answers)) {
        return false;
    }
    
    foreach ($answers as $answer) {
        if (!is_int($answer) || $answer < -1 || $answer > 3) {
            return false;
        }
    }
    
    return true;
}

/**
 * Calculate score from answers
 */
function calculateScore($answers, $questions) {
    $score = 0;
    
    foreach ($answers as $qIndex => $selectedAnswer) {
        if (isset($questions[$qIndex])) {
            $correctAnswer = intval($questions[$qIndex]['correct_answer']) - 1;
            if ($selectedAnswer === $correctAnswer) {
                $score++;
            }
        }
    }
    
    return $score;
}

/**
 * Get performance message based on score
 */
function getPerformanceMessage($score, $total) {
    $percentage = ($score / $total) * 100;
    
    if ($percentage === 100) {
        return 'Perfect! You got all questions correct!';
    } elseif ($percentage >= 80) {
        return 'Excellent work! You have a solid understanding.';
    } elseif ($percentage >= 60) {
        return 'Good job! You\'re on the right track.';
    } elseif ($percentage >= 40) {
        return 'Not bad! Keep practicing to improve.';
    } else {
        return 'Keep studying! Review the material and try again.';
    }
}

/**
 * Get question difficulty level
 */
function getQuestionsByDifficulty($difficulty) {
    $db = getDatabase();
    return $db->getQuestionsByCategory($difficulty);
}

/**
 * Add new question to database
 */
function addQuestion($questionText, $optionA, $optionB, $optionC, $optionD, $correctAnswer, $category = '', $difficulty = 'Medium') {
    try {
        $db = getDatabase();
        
        // Validate correct answer
        if (!in_array($correctAnswer, [1, 2, 3, 4])) {
            return ['success' => false, 'message' => 'Invalid correct answer index'];
        }
        
        // Prepare insert statement
        $sql = "INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer, category, difficulty)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $db->db->prepare($sql);
        $result = $stmt->execute([
            $questionText,
            $optionA,
            $optionB,
            $optionC,
            $optionD,
            $correctAnswer,
            $category,
            $difficulty
        ]);
        
        if ($result) {
            return [
                'success' => true,
                'message' => 'Question added successfully',
                'id' => $db->db->lastInsertId()
            ];
        } else {
            return ['success' => false, 'message' => 'Failed to add question'];
        }
    } catch (Exception $e) {
        return ['success' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

/**
 * Export quiz results as CSV
 */
function exportResultsCSV() {
    try {
        $db = getDatabase();
        $results = $db->getAllResults();
        
        $filename = 'quiz_results_' . date('Y-m-d_H-i-s') . '.csv';
        
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        
        $output = fopen('php://output', 'w');
        
        // Add CSV header
        fputcsv($output, ['User ID', 'Score', 'Total Questions', 'Percentage', 'Completed At']);
        
        // Add results
        foreach ($results as $result) {
            fputcsv($output, [
                $result['user_id'],
                $result['score'],
                $result['total_questions'],
                $result['percentage'],
                $result['completed_at']
            ]);
        }
        
        fclose($output);
        exit;
    } catch (Exception $e) {
        error_log("Error exporting results: " . $e->getMessage());
    }
}

/**
 * Get quiz statistics
 */
function getQuizStatistics() {
    try {
        $db = getDatabase();
        
        $stats = [];
        $stats['total_questions'] = $db->getQuestionCount();
        
        // Get results from database if table exists and has data
        try {
            $stmt = $db->db->query("SELECT COUNT(*) as count, AVG(percentage) as avg_percentage FROM results");
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $stats['total_attempts'] = $result['count'];
            $stats['average_score'] = $result['avg_percentage'] ? round($result['avg_percentage'], 2) : 0;
        } catch (Exception $e) {
            $stats['total_attempts'] = 0;
            $stats['average_score'] = 0;
        }
        
        // Get categories
        $stmt = $db->db->query("SELECT DISTINCT category FROM questions WHERE category IS NOT NULL AND category != ''");
        $stats['categories'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        return $stats;
    } catch (Exception $e) {
        error_log("Error getting statistics: " . $e->getMessage());
        return [];
    }
}

/**
 * Validate a single question answer
 */
function validateAnswer($questionId, $selectedAnswer) {
    try {
        $db = getDatabase();
        $question = $db->getQuestionById($questionId);
        
        if (!$question) {
            return ['valid' => false, 'message' => 'Question not found'];
        }
        
        $correct = (intval($question['correct_answer']) - 1) === intval($selectedAnswer);
        
        return [
            'valid' => true,
            'is_correct' => $correct,
            'correct_answer' => intval($question['correct_answer']) - 1
        ];
    } catch (Exception $e) {
        return ['valid' => false, 'message' => 'Error: ' . $e->getMessage()];
    }
}

/**
 * Log quiz attempt
 */
function logQuizAttempt($userId, $ipAddress, $userAgent) {
    try {
        $logFile = DATA_DIR . '/quiz_attempts.log';
        $timestamp = date('Y-m-d H:i:s');
        $logEntry = "$timestamp | User: $userId | IP: $ipAddress | User-Agent: $userAgent\n";
        
        file_put_contents($logFile, $logEntry, FILE_APPEND);
        return true;
    } catch (Exception $e) {
        error_log("Error logging quiz attempt: " . $e->getMessage());
        return false;
    }
}

/**
 * Get all results from database
 */
function getAllResults() {
    try {
        $db = getDatabase();
        $stmt = $db->db->query("SELECT * FROM results ORDER BY completed_at DESC LIMIT 100");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        error_log("Error fetching results: " . $e->getMessage());
        return [];
    }
}

/**
 * Clear old sessions
 */
function clearOldSessions($daysOld = 7) {
    try {
        $db = getDatabase();
        $cutoffDate = date('Y-m-d H:i:s', strtotime("-$daysOld days"));
        
        $stmt = $db->db->prepare("DELETE FROM user_sessions WHERE created_at < ?");
        $stmt->execute([$cutoffDate]);
        
        return true;
    } catch (Exception $e) {
        error_log("Error clearing sessions: " . $e->getMessage());
        return false;
    }
}

<?php
/**
 * Quiz Application Backend - Main API Handler
 * Routes requests to appropriate handlers
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';
require_once 'quiz_handler.php';

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get action from query string
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Route to appropriate handler
switch ($action) {
    case 'getQuestions':
        getQuestions();
        break;
    
    case 'submitAnswers':
        submitAnswers($_POST);
        break;
    
    case 'getQuestionDetails':
        $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
        getQuestionDetails($id);
        break;
    
    case 'health':
        echo json_encode(['status' => 'ok', 'timestamp' => date('Y-m-d H:i:s')]);
        break;
    
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}

/**
 * Get all questions or specific quiz questions
 */
function getQuestions() {
    try {
        $db = getDatabase();
        $questions = $db->getAllQuestions();
        
        // Return questions without answers for security
        $data = [];
        foreach ($questions as $q) {
            $data[] = [
                'id' => $q['id'],
                'text' => $q['question_text'],
                'options' => [
                    $q['option_a'],
                    $q['option_b'],
                    $q['option_c'],
                    $q['option_d']
                ],
                'correct' => intval($q['correct_answer']) - 1 // Convert to 0-indexed
            ];
        }
        
        echo json_encode([
            'success' => true,
            'questions' => $data,
            'count' => count($data)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error retrieving questions: ' . $e->getMessage()
        ]);
    }
}

/**
 * Submit and score answers
 */
function submitAnswers($data) {
    try {
        if (!isset($data['answers']) || !is_array($data['answers'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid answers format']);
            return;
        }
        
        $db = getDatabase();
        $questions = $db->getAllQuestions();
        
        $score = 0;
        $results = [];
        
        foreach ($data['answers'] as $qIndex => $selected) {
            if (isset($questions[$qIndex])) {
                $question = $questions[$qIndex];
                $correct = intval($question['correct_answer']) - 1;
                $isCorrect = intval($selected) === $correct;
                
                if ($isCorrect) {
                    $score++;
                }
                
                $results[] = [
                    'question_id' => $question['id'],
                    'selected' => intval($selected),
                    'correct' => $correct,
                    'is_correct' => $isCorrect
                ];
            }
        }
        
        echo json_encode([
            'success' => true,
            'score' => $score,
            'total' => count($questions),
            'percentage' => round(($score / count($questions)) * 100, 2),
            'results' => $results
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error processing answers: ' . $e->getMessage()
        ]);
    }
}

/**
 * Get details for a specific question
 */
function getQuestionDetails($id) {
    try {
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid question ID']);
            return;
        }
        
        $db = getDatabase();
        $question = $db->getQuestionById($id);
        
        if (!$question) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Question not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'question' => [
                'id' => $question['id'],
                'text' => $question['question_text'],
                'options' => [
                    $question['option_a'],
                    $question['option_b'],
                    $question['option_c'],
                    $question['option_d']
                ],
                'correct' => intval($question['correct_answer']) - 1
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error retrieving question: ' . $e->getMessage()
        ]);
    }
}

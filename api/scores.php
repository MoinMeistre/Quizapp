<?php
/**
 * scores.php
 * API-Endpunkt für das Abrufen und Aktualisieren von Benutzer-Scores.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'Database.php';

try {
    $db = Database::getInstance()->getConnection();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Liefere eine Liste mit Usernamen und ihrem jeweiligen Gesamt-Score
        $stmt = $db->query('
            SELECT users.username, COALESCE(SUM(scores.score), 0) as score 
            FROM users 
            LEFT JOIN scores ON users.id = scores.user_id 
            GROUP BY users.id 
            ORDER BY score DESC
        ');
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['success' => true, 'data' => $results]);
        exit();

    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Akzeptiere Score-Updates für den Nutzer. Der Score wird durch einen neuen Eintrag akkumuliert.
        $input = json_decode(file_get_contents('php://input'), true);

        if (!isset($input['user_id']) || !isset($input['score'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'user_id und score sind erforderlich']);
            exit();
        }

        $userId = (int)$input['user_id'];
        $score = (int)$input['score'];
        $totalQuestions = isset($input['total_questions']) ? (int)$input['total_questions'] : 0;

        // Neuen Score in die Tabelle einfügen (dadurch "klettert" der kombinierte Score im GET)
        $stmt = $db->prepare('INSERT INTO scores (user_id, score, total_questions) VALUES (?, ?, ?)');
        $stmt->execute([$userId, $score, $totalQuestions]);

        echo json_encode(['success' => true, 'message' => 'Score erfolgreich hinzugefügt']);
        exit();

    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Methode nicht erlaubt. Nur GET und POST.']);
        exit();
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Datenbankfehler: ' . $e->getMessage()]);
}

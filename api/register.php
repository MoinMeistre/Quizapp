<?php
/**
 * register.php
 * API-Endpunkt für die Benutzerregistrierung.
 * 
 * Erwartet POST mit JSON: { "username": "...", "password": "..." }
 * Gibt JSON zurück: { "success": true/false, "message": "..." }
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS-Request für CORS behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Nur POST erlaubt']);
    exit();
}

require_once 'Database.php';

// JSON-Daten aus dem Request-Body lesen
$input = json_decode(file_get_contents('php://input'), true);

// Validierung
if (!isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Username und Passwort erforderlich']);
    exit();
}

$username = trim($input['username']);
$password = $input['password'];

// Weitere Validierung
if (strlen($username) < 3) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Username muss mindestens 3 Zeichen haben']);
    exit();
}

if (strlen($password) < 4) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Passwort muss mindestens 4 Zeichen haben']);
    exit();
}

try {
    $db = Database::getInstance()->getConnection();

    // Prüfen ob Username bereits existiert
    $stmt = $db->prepare('SELECT id FROM users WHERE username = ?');
    $stmt->execute([$username]);
    
    if ($stmt->fetch()) {
        http_response_code(409); // Conflict
        echo json_encode(['success' => false, 'message' => 'Username existiert bereits']);
        exit();
    }

    // Passwort hashen
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    
    // User einfügen
    $stmt = $db->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
    $stmt->execute([$username, $passwordHash]);

    $userId = $db->lastInsertId();

    http_response_code(201); // Created
    echo json_encode([
        'success' => true,
        'message' => 'Registrierung erfolgreich',
        'user_id' => $userId,
        'username' => $username
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Datenbankfehler: ' . $e->getMessage()]);
}

<?php
/**
 * login.php
 * API-Endpunkt für die Benutzeranmeldung.
 * 
 * Erwartet POST mit JSON: { "username": "...", "password": "..." }
 * Gibt JSON zurück: { "success": true/false, "message": "...", "user_id": ..., "username": "..." }
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

try {
    $db = Database::getInstance()->getConnection();

    // User anhand Username suchen
    $stmt = $db->prepare('SELECT id, username, password_hash FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    // Prüfen ob User existiert
    if (!$user) {
        http_response_code(401); // Unauthorized
        echo json_encode(['success' => false, 'message' => 'Ungültiger Username oder Passwort']);
        exit();
    }

    // Passwort verifizieren
    if (!password_verify($password, $user['password_hash'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(['success' => false, 'message' => 'Ungültiger Username oder Passwort']);
        exit();
    }

    // Login erfolgreich
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Login erfolgreich',
        'user_id' => $user['id'],
        'username' => $user['username']
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Datenbankfehler: ' . $e->getMessage()]);
}

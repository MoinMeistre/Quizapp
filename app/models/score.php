<?php
class Score {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function save($user, $text) {
        $stmt = $this->db->prepare("INSERT INTO scores (user_name, content) VALUES (:u, :c)");
        return $stmt->execute([':u' => $user, ':c' => $text]);
    }

    public function getAll() {
        return $this->db->query("SELECT * FROM scores ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
<?php
require_once '../app/models/Message.php';

class MessageController {
    private $model;

    public function __construct($db) {
        $this->model = new Message($db);
    }

    // Displays the list
    public function showAll() {
        $messages = $this->model->getAll();
        require '../app/views/home.php';
    }

    // Handles the form submission
    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->model->save($_POST['username'], $_POST['content']);
        }
        header("Location: /index.php"); // Redirect back to list
    }
}

?>
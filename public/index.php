<?php
// 1. Database Connection
$db = new PDO('sqlite:../data.sqlite');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->exec('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, user_name TEXT, content TEXT)');
// 2. Routing
require_once '../app/controllers/MessageController.php';
require_once '../app/Router.php';

$Router = new Router();

$controller = new MessageController($db);
$Router->get('/','$controller->store()');
$Router->get('/','$controller->showAll()');
$Router->post('/','$controller->store()');
$Router->resolve();
?>
<?php
class Router {
    protected $routes = [];

    // Register a GET request
    public function get($path, $callback) {
        $this->routes['GET'][$path] = $callback;
    }

    // Register a POST request
    public function post($path, $callback) {
        $this->routes['POST'][$path] = $callback;
    }

    public function resolve() {
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $method = $_SERVER['REQUEST_METHOD'];

        // Remove the base folder name if you're in a subfolder (like /my-app/)
        $path = str_replace('/my-mvc-app/public', '', $path);
        $path = parse_url($path, PHP_URL_PATH);

        $callback = $this->routes[$method][$path] ?? false;

        if ($callback === false) {
            echo "404 - Page Not Found";
            return;
        }

        return call_user_func($callback);
    }
}
?>
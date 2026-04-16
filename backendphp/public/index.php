<?php

declare(strict_types=1);

use App\Controllers\MedicoController;
use App\Core\Request;
use App\Core\Response;
use App\Core\Router;
use App\Exceptions\HttpException;

require __DIR__ . '/../vendor/autoload.php';

// Carrega variáveis do arquivo .env (se existir), sem depender de pacotes externos.
// Em Docker as variáveis já estão disponíveis via getenv(); localmente vêm do .env.
$envPath = __DIR__ . '/../.env';
if (is_file($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        [$key, $value] = array_pad(explode('=', $line, 2), 2, '');
        $key = trim($key);
        $value = trim($value);
        $_ENV[$key] = $value;
        putenv("{$key}={$value}");
    }
}

// CORS — libera o frontend durante o desenvolvimento.
$origin = getenv('CORS_ORIGIN') ?: 'http://localhost:5173';
header('Access-Control-Allow-Origin: ' . $origin);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Tratamento global de exceções: resposta JSON consistente.
set_exception_handler(function (\Throwable $e): void {
    $status = $e instanceof HttpException ? $e->getStatusCode() : 500;
    $message = $e instanceof HttpException ? $e->getMessage() : 'Erro interno do servidor';
    Response::json(['error' => $message], $status);
});

$router = new Router();

$router->get('/api/v1/medicos',       [MedicoController::class, 'index']);
$router->get('/api/v1/medicos/{id}',  [MedicoController::class, 'show']);
$router->post('/api/v1/medicos',      [MedicoController::class, 'store']);
$router->put('/api/v1/medicos/{id}',  [MedicoController::class, 'update']);
$router->delete('/api/v1/medicos/{id}', [MedicoController::class, 'destroy']);

$router->dispatch(new Request());

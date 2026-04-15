<?php

declare(strict_types=1);

namespace App\Core;

use App\Exceptions\NotFoundException;

/**
 * Roteador mínimo com suporte a parâmetros no caminho ({id}).
 *
 * Registra rotas por método HTTP e despacha para um handler, que pode ser
 * um callable ou um par [ClassName::class, 'metodo'].
 */
final class Router
{
    /** @var array<int, array{method: string, pattern: string, handler: callable|array{0: class-string, 1: string}, params: string[]}> */
    private array $routes = [];

    public function get(string $path, callable|array $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    public function put(string $path, callable|array $handler): void
    {
        $this->add('PUT', $path, $handler);
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->add('DELETE', $path, $handler);
    }

    /**
     * Converte a rota em regex e armazena junto dos nomes dos parâmetros.
     *
     * @param callable|array{0: class-string, 1: string} $handler
     */
    private function add(string $method, string $path, callable|array $handler): void
    {
        $params = [];
        $pattern = preg_replace_callback(
            '/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/',
            static function (array $match) use (&$params): string {
                $params[] = $match[1];
                return '([^/]+)';
            },
            $path,
        );

        $this->routes[] = [
            'method'  => $method,
            'pattern' => '#^' . $pattern . '$#',
            'handler' => $handler,
            'params'  => $params,
        ];
    }

    public function dispatch(Request $request): void
    {
        foreach ($this->routes as $route) {
            if ($route['method'] !== $request->method()) {
                continue;
            }
            if (!preg_match($route['pattern'], $request->path(), $matches)) {
                continue;
            }

            array_shift($matches); // remove match completo
            $args = array_combine($route['params'], $matches) ?: [];

            $handler = $route['handler'];
            if (is_array($handler)) {
                [$class, $method] = $handler;
                $instance = new $class();
                $instance->{$method}($request, $args);
                return;
            }

            $handler($request, $args);
            return;
        }

        throw new NotFoundException('Rota não encontrada');
    }
}

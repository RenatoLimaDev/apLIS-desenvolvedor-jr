<?php

declare(strict_types=1);

namespace App\Core;

final class Request
{
    private readonly string $method;
    private readonly string $path;
    /** @var array<string, mixed> */
    private readonly array $body;

    public function __construct()
    {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $this->path = parse_url($uri, PHP_URL_PATH) ?: '/';

        $raw = file_get_contents('php://input') ?: '';
        $decoded = $raw === '' ? [] : json_decode($raw, true);
        $this->body = is_array($decoded) ? $decoded : [];
    }

    public function method(): string
    {
        return $this->method;
    }

    public function path(): string
    {
        return $this->path;
    }

    /**
     * @return array<string, mixed>
     */
    public function body(): array
    {
        return $this->body;
    }
}

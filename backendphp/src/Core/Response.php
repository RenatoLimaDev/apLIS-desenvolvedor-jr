<?php

declare(strict_types=1);

namespace App\Core;

final class Response
{
    /**
     * Escreve uma resposta JSON com o status desejado e encerra a execução.
     *
     * @param mixed $data
     */
    public static function json(mixed $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}

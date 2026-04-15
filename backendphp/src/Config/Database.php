<?php

declare(strict_types=1);

namespace App\Config;

use PDO;

/**
 * Fábrica de conexão PDO compartilhada por toda a aplicação.
 *
 * Permite injetar um PDO externo (útil para testes com SQLite in-memory)
 * via {@see Database::setConnection()}.
 */
final class Database
{
    private static ?PDO $connection = null;

    public static function connection(): PDO
    {
        if (self::$connection instanceof PDO) {
            return self::$connection;
        }

        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $port = $_ENV['DB_PORT'] ?? '3306';
        $name = $_ENV['DB_NAME'] ?? 'aplis';
        $user = $_ENV['DB_USER'] ?? 'aplis';
        $pass = $_ENV['DB_PASS'] ?? 'aplis';

        $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $host, $port, $name);

        self::$connection = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);

        return self::$connection;
    }

    public static function setConnection(?PDO $pdo): void
    {
        self::$connection = $pdo;
    }
}

<?php

declare(strict_types=1);

namespace App\Models;

use App\Config\Database;
use PDO;

/**
 * Model de Médico — encapsula todo o acesso à tabela `medicos` via PDO.
 *
 * Aceita um PDO externo no construtor para facilitar testes (SQLite
 * in-memory); quando ausente, usa a conexão global da aplicação.
 */
final class Medico
{
    private readonly PDO $db;

    public function __construct(?PDO $db = null)
    {
        $this->db = $db ?? Database::connection();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        $stmt = $this->db->query('SELECT id, nome, crm, uf_crm FROM medicos ORDER BY id');
        return array_map([$this, 'hydrate'], $stmt->fetchAll());
    }

    /**
     * @return array<string, mixed>|null
     */
    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare('SELECT id, nome, crm, uf_crm FROM medicos WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ? $this->hydrate($row) : null;
    }

    /**
     * @param array{nome: string, crm: string, uf_crm: string} $data
     * @return array<string, mixed>
     */
    public function create(array $data): array
    {
        $stmt = $this->db->prepare(
            'INSERT INTO medicos (nome, crm, uf_crm) VALUES (:nome, :crm, :uf_crm)'
        );
        $stmt->execute([
            'nome'   => $data['nome'],
            'crm'    => $data['crm'],
            'uf_crm' => $data['uf_crm'],
        ]);

        $id = (int) $this->db->lastInsertId();
        return $this->find($id) ?? [];
    }

    /**
     * @param array{nome: string, crm: string, uf_crm: string} $data
     * @return array<string, mixed>|null
     */
    public function update(int $id, array $data): ?array
    {
        $stmt = $this->db->prepare(
            'UPDATE medicos SET nome = :nome, crm = :crm, uf_crm = :uf_crm WHERE id = :id'
        );
        $stmt->execute([
            'nome'   => $data['nome'],
            'crm'    => $data['crm'],
            'uf_crm' => $data['uf_crm'],
            'id'     => $id,
        ]);

        return $this->find($id);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM medicos WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Converte o registro do banco para o formato esperado pelo frontend,
     * que usa CRM/UFCRM conforme especificado no README.
     *
     * @param array<string, mixed> $row
     * @return array<string, mixed>
     */
    private function hydrate(array $row): array
    {
        return [
            'id'    => (int) $row['id'],
            'nome'  => (string) $row['nome'],
            'CRM'   => (string) $row['crm'],
            'UFCRM' => (string) $row['uf_crm'],
        ];
    }
}

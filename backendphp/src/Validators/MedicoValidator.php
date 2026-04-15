<?php

declare(strict_types=1);

namespace App\Validators;

use App\Exceptions\ValidationException;

final class MedicoValidator
{
    /**
     * Valida o payload e devolve os dados normalizados (já com as chaves
     * internas snake_case usadas pelo model).
     *
     * @param array<string, mixed> $data
     * @return array{nome: string, crm: string, uf_crm: string}
     */
    public static function validate(array $data): array
    {
        $errors = [];

        $nome = isset($data['nome']) ? trim((string) $data['nome']) : '';
        if ($nome === '') {
            $errors['nome'] = 'O nome é obrigatório';
        }

        $crm = isset($data['CRM']) ? trim((string) $data['CRM']) : '';
        if ($crm === '') {
            $errors['CRM'] = 'O CRM é obrigatório';
        }

        $ufCrm = isset($data['UFCRM']) ? strtoupper(trim((string) $data['UFCRM'])) : '';
        if ($ufCrm === '') {
            $errors['UFCRM'] = 'A UF do CRM é obrigatória';
        } elseif (!preg_match('/^[A-Z]{2}$/', $ufCrm)) {
            $errors['UFCRM'] = 'A UF do CRM deve ter exatamente 2 letras';
        }

        if ($errors !== []) {
            throw new ValidationException($errors);
        }

        return [
            'nome'   => $nome,
            'crm'    => $crm,
            'uf_crm' => $ufCrm,
        ];
    }
}

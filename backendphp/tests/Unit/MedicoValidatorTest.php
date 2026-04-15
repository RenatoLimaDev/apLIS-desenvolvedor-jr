<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Exceptions\ValidationException;
use App\Validators\MedicoValidator;
use PHPUnit\Framework\TestCase;

final class MedicoValidatorTest extends TestCase
{
    public function test_payload_valido_retorna_dados_normalizados(): void
    {
        $data = MedicoValidator::validate([
            'nome'  => '  João da Silva  ',
            'CRM'   => '123456',
            'UFCRM' => 'ce',
        ]);

        $this->assertSame([
            'nome'   => 'João da Silva',
            'crm'    => '123456',
            'uf_crm' => 'CE',
        ], $data);
    }

    public function test_nome_obrigatorio(): void
    {
        $this->expectException(ValidationException::class);
        MedicoValidator::validate(['CRM' => '123', 'UFCRM' => 'CE']);
    }

    public function test_crm_obrigatorio(): void
    {
        try {
            MedicoValidator::validate(['nome' => 'Ana', 'UFCRM' => 'CE']);
            $this->fail('Deveria ter disparado ValidationException');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('CRM', $e->getErrors());
        }
    }

    public function test_ufcrm_deve_ter_duas_letras(): void
    {
        try {
            MedicoValidator::validate(['nome' => 'Ana', 'CRM' => '123', 'UFCRM' => 'CEA']);
            $this->fail('Deveria ter disparado ValidationException');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('UFCRM', $e->getErrors());
        }
    }

    public function test_acumula_multiplos_erros(): void
    {
        try {
            MedicoValidator::validate([]);
            $this->fail('Deveria ter disparado ValidationException');
        } catch (ValidationException $e) {
            $errors = $e->getErrors();
            $this->assertArrayHasKey('nome', $errors);
            $this->assertArrayHasKey('CRM', $errors);
            $this->assertArrayHasKey('UFCRM', $errors);
        }
    }
}

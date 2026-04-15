<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Exceptions\NotFoundException;
use App\Models\Medico;
use App\Validators\MedicoValidator;

final class MedicoController
{
    public function __construct(private readonly Medico $model = new Medico())
    {
    }

    /**
     * @param array<string, string> $params
     */
    public function index(Request $request, array $params): void
    {
        Response::json($this->model->all());
    }

    /**
     * @param array<string, string> $params
     */
    public function show(Request $request, array $params): void
    {
        $medico = $this->model->find((int) $params['id']);
        if ($medico === null) {
            throw new NotFoundException('Médico não encontrado');
        }
        Response::json($medico);
    }

    /**
     * @param array<string, string> $params
     */
    public function store(Request $request, array $params): void
    {
        $data = MedicoValidator::validate($request->body());
        $this->model->create($data);
        Response::json(['message' => 'Médico criado com sucesso'], 201);
    }

    /**
     * @param array<string, string> $params
     */
    public function update(Request $request, array $params): void
    {
        $id = (int) $params['id'];
        if ($this->model->find($id) === null) {
            throw new NotFoundException('Médico não encontrado');
        }

        $data = MedicoValidator::validate($request->body());
        $this->model->update($id, $data);
        Response::json(['message' => 'Médico atualizado com sucesso']);
    }

    /**
     * @param array<string, string> $params
     */
    public function destroy(Request $request, array $params): void
    {
        $id = (int) $params['id'];
        if (!$this->model->delete($id)) {
            throw new NotFoundException('Médico não encontrado');
        }
        Response::json(['message' => 'Médico excluído com sucesso']);
    }
}

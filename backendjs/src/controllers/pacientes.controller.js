import { NotFoundError } from '../errors.js';
import { validatePaciente } from '../validators/paciente.validator.js';

/**
 * Factory dos handlers de pacientes. Recebe o repository por injeção, o que
 * permite usar tanto o repository real (MySQL) quanto um fake em memória nos
 * testes.
 */
export function createPacientesController(repo) {
  return {
    async index(_req, res, next) {
      try {
        res.json(await repo.findAll());
      } catch (err) {
        next(err);
      }
    },

    async show(req, res, next) {
      try {
        const paciente = await repo.findById(Number(req.params.id));
        if (!paciente) throw new NotFoundError('Paciente não encontrado');
        res.json(paciente);
      } catch (err) {
        next(err);
      }
    },

    async store(req, res, next) {
      try {
        const data = validatePaciente(req.body);
        await repo.create(data);
        res.status(201).json({ message: 'Paciente criado com sucesso' });
      } catch (err) {
        next(err);
      }
    },

    async update(req, res, next) {
      try {
        const id = Number(req.params.id);
        const existing = await repo.findById(id);
        if (!existing) throw new NotFoundError('Paciente não encontrado');

        const data = validatePaciente(req.body);
        await repo.update(id, data);
        res.json({ message: 'Paciente atualizado com sucesso' });
      } catch (err) {
        next(err);
      }
    },

    async destroy(req, res, next) {
      try {
        const removed = await repo.remove(Number(req.params.id));
        if (!removed) throw new NotFoundError('Paciente não encontrado');
        res.json({ message: 'Paciente excluído com sucesso' });
      } catch (err) {
        next(err);
      }
    },
  };
}

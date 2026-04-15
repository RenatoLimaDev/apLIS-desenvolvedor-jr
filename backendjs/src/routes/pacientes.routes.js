import { Router } from 'express';
import { createPacientesController } from '../controllers/pacientes.controller.js';

export function createPacientesRouter(repo) {
  const router = Router();
  const controller = createPacientesController(repo);

  router.get('/', controller.index);
  router.get('/:id', controller.show);
  router.post('/', controller.store);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.destroy);

  return router;
}

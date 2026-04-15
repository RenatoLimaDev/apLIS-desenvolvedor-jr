import express from 'express';
import cors from 'cors';
import { createPacientesRouter } from './routes/pacientes.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { NotFoundError } from './errors.js';

/**
 * Factory da aplicação Express. Recebe um repository de pacientes por
 * injeção para permitir substituição em testes.
 */
export function createApp(pacientesRepo) {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    })
  );
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/v1/pacientes', createPacientesRouter(pacientesRepo));

  // 404 para qualquer rota não registrada.
  app.use((_req, _res, next) => next(new NotFoundError('Rota não encontrada')));

  app.use(errorHandler);

  return app;
}

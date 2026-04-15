import { HttpError, ValidationError } from '../errors.js';

/**
 * Middleware final do Express: converte erros em respostas JSON padronizadas.
 * Erros desconhecidos viram 500 com mensagem genérica.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({ error: err.message, errors: err.errors });
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}

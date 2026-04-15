/**
 * Erros de domínio usados pelos controllers. Capturados pelo errorHandler
 * para gerar respostas JSON consistentes.
 */

export class HttpError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Recurso não encontrado') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends HttpError {
  constructor(errors, message = 'Dados inválidos') {
    super(message, 422);
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

import { ValidationError } from '../errors.js';

/**
 * Valida o payload de paciente e retorna os dados normalizados.
 * Em caso de erro, dispara ValidationError com o mapa de campos inválidos.
 */
export function validatePaciente(data = {}) {
  const errors = {};

  const nome = typeof data.nome === 'string' ? data.nome.trim() : '';
  if (!nome) {
    errors.nome = 'O nome é obrigatório';
  }

  const dataNascimento = typeof data.dataNascimento === 'string' ? data.dataNascimento.trim() : '';
  if (!dataNascimento) {
    errors.dataNascimento = 'A data de nascimento é obrigatória';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
    errors.dataNascimento = 'A data de nascimento deve estar no formato YYYY-MM-DD';
  }

  const carteirinha = typeof data.carteirinha === 'string' ? data.carteirinha.trim() : '';
  if (!carteirinha) {
    errors.carteirinha = 'A carteirinha é obrigatória';
  }

  const cpf = typeof data.cpf === 'string' ? data.cpf.replace(/\D/g, '') : '';
  if (!cpf) {
    errors.cpf = 'O CPF é obrigatório';
  } else if (cpf.length !== 11) {
    errors.cpf = 'O CPF deve ter 11 dígitos';
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }

  return { nome, dataNascimento, carteirinha, cpf };
}

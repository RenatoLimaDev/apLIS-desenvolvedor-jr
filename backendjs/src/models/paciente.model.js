/**
 * Model de Paciente — encapsula todo o acesso à tabela `pacientes`.
 *
 * Recebe o pool mysql2 por injeção para facilitar troca em testes. A forma
 * exposta ao restante da aplicação é um objeto com métodos assíncronos
 * (repository), permitindo substituição por um fake em memória nos testes.
 */
export function createPacienteRepository(pool) {
  return {
    async findAll() {
      const [rows] = await pool.query(
        'SELECT id, nome, data_nascimento, carteirinha, cpf FROM pacientes ORDER BY id'
      );
      return rows.map(hydrate);
    },

    async findById(id) {
      const [rows] = await pool.query(
        'SELECT id, nome, data_nascimento, carteirinha, cpf FROM pacientes WHERE id = ?',
        [id]
      );
      return rows[0] ? hydrate(rows[0]) : null;
    },

    async create(data) {
      const [result] = await pool.query(
        'INSERT INTO pacientes (nome, data_nascimento, carteirinha, cpf) VALUES (?, ?, ?, ?)',
        [data.nome, data.dataNascimento, data.carteirinha, data.cpf]
      );
      return this.findById(result.insertId);
    },

    async update(id, data) {
      await pool.query(
        'UPDATE pacientes SET nome = ?, data_nascimento = ?, carteirinha = ?, cpf = ? WHERE id = ?',
        [data.nome, data.dataNascimento, data.carteirinha, data.cpf, id]
      );
      return this.findById(id);
    },

    async remove(id) {
      const [result] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
      return result.affectedRows > 0;
    },
  };
}

/**
 * Converte uma linha do banco para o formato usado pela API/front.
 */
function hydrate(row) {
  return {
    id: Number(row.id),
    nome: String(row.nome),
    dataNascimento: formatDate(row.data_nascimento),
    carteirinha: String(row.carteirinha),
    cpf: String(row.cpf),
  };
}

function formatDate(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

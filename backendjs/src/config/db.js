import mysql from 'mysql2/promise';

/**
 * Cria um pool de conexões MySQL a partir das variáveis de ambiente.
 * Separado em função para permitir instanciar um pool alternativo em testes.
 */
export function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'aplis',
    password: process.env.DB_PASS || 'aplis',
    database: process.env.DB_NAME || 'aplis',
    waitForConnections: true,
    connectionLimit: 10,
  });
}

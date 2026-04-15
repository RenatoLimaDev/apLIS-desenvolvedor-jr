import axios from 'axios';

const phpBase = import.meta.env.VITE_API_PHP_URL || 'http://localhost:8000/api/v1';
const nodeBase = import.meta.env.VITE_API_NODE_URL || 'http://localhost:3000/api/v1';

export const phpApi = axios.create({
  baseURL: phpBase,
  headers: { 'Content-Type': 'application/json' },
});

export const nodeApi = axios.create({
  baseURL: nodeBase,
  headers: { 'Content-Type': 'application/json' },
});

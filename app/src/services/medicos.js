import { phpApi } from '../api/client.js';

export const medicosService = {
  list: () => phpApi.get('/medicos').then((r) => r.data),
  get: (id) => phpApi.get(`/medicos/${id}`).then((r) => r.data),
  create: (data) => phpApi.post('/medicos', data).then((r) => r.data),
  update: (id, data) => phpApi.put(`/medicos/${id}`, data).then((r) => r.data),
  remove: (id) => phpApi.delete(`/medicos/${id}`).then((r) => r.data),
};

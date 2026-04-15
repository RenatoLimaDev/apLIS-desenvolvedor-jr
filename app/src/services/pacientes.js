import { nodeApi } from '../api/client.js';

export const pacientesService = {
  list: () => nodeApi.get('/pacientes').then((r) => r.data),
  get: (id) => nodeApi.get(`/pacientes/${id}`).then((r) => r.data),
  create: (data) => nodeApi.post('/pacientes', data).then((r) => r.data),
  update: (id, data) => nodeApi.put(`/pacientes/${id}`, data).then((r) => r.data),
  remove: (id) => nodeApi.delete(`/pacientes/${id}`).then((r) => r.data),
};

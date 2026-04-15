import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

/**
 * Fake repository em memória com a mesma interface do repository MySQL real.
 * Permite testar as rotas sem precisar de banco rodando.
 */
function createFakeRepo() {
  let seq = 0;
  const rows = new Map();

  return {
    async findAll() {
      return [...rows.values()];
    },
    async findById(id) {
      return rows.get(Number(id)) ?? null;
    },
    async create(data) {
      seq += 1;
      const row = { id: seq, ...data };
      rows.set(seq, row);
      return row;
    },
    async update(id, data) {
      const current = rows.get(Number(id));
      if (!current) return null;
      const updated = { ...current, ...data };
      rows.set(Number(id), updated);
      return updated;
    },
    async remove(id) {
      return rows.delete(Number(id));
    },
  };
}

const validPayload = {
  nome: 'João da Silva',
  dataNascimento: '2000-01-15',
  carteirinha: '123456',
  cpf: '12345678909',
};

describe('pacientes routes', () => {
  let app;

  beforeEach(() => {
    app = createApp(createFakeRepo());
  });

  it('GET retorna lista vazia inicialmente', async () => {
    const res = await request(app).get('/api/v1/pacientes');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST cria paciente e retorna 201 com mensagem', async () => {
    const res = await request(app).post('/api/v1/pacientes').send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'Paciente criado com sucesso' });
  });

  it('fluxo completo: cria, lista, busca, atualiza e exclui', async () => {
    await request(app).post('/api/v1/pacientes').send(validPayload).expect(201);

    const list = await request(app).get('/api/v1/pacientes').expect(200);
    expect(list.body).toHaveLength(1);
    const id = list.body[0].id;

    const show = await request(app).get(`/api/v1/pacientes/${id}`).expect(200);
    expect(show.body.nome).toBe('João da Silva');

    const put = await request(app)
      .put(`/api/v1/pacientes/${id}`)
      .send({ ...validPayload, nome: 'João Atualizado' })
      .expect(200);
    expect(put.body).toEqual({ message: 'Paciente atualizado com sucesso' });

    await request(app).delete(`/api/v1/pacientes/${id}`).expect(200);
    await request(app).get(`/api/v1/pacientes/${id}`).expect(404);
  });

  it('POST com payload inválido retorna 422', async () => {
    const res = await request(app)
      .post('/api/v1/pacientes')
      .send({ nome: '', dataNascimento: 'abc', carteirinha: '', cpf: '123' });
    expect(res.status).toBe(422);
    expect(res.body.errors).toHaveProperty('nome');
    expect(res.body.errors).toHaveProperty('dataNascimento');
    expect(res.body.errors).toHaveProperty('carteirinha');
    expect(res.body.errors).toHaveProperty('cpf');
  });

  it('GET /:id inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/pacientes/999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

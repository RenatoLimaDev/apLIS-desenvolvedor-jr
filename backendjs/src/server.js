import 'dotenv/config';
import { createApp } from './app.js';
import { createPool } from './config/db.js';
import { createPacienteRepository } from './models/paciente.model.js';

const pool = createPool();
const repo = createPacienteRepository(pool);
const app = createApp(repo);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend pacientes rodando em http://localhost:${port}`);
});

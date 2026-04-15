# apLIS — Teste Prático Desenvolvedor Júnior

Aplicação fullstack com:

- **Backend PHP** (médicos) — PHP 8.3 puro, arquitetura MVC manual, PDO.
- **Backend Node.js** (pacientes) — Express 5, mysql2, arquitetura MVC.
- **Frontend React** (SPA) — React 19 + Vite + Tailwind CSS + React Router + i18next.
- **MySQL** compartilhado entre os dois backends, subido via `docker-compose`.
- **CRUD completo** (GET/POST/PUT/DELETE) em ambos os backends.
- **Multi-idioma** no frontend (pt-BR / en) com troca em tempo real.
- **Testes automatizados** em todas as camadas (PHPUnit, Vitest+Supertest, React Testing Library).

## Estrutura do projeto

```
.
├── docker-compose.yml        # Serviço MySQL 8 compartilhado
├── db/init.sql               # Schema e seeds iniciais
├── backendphp/               # API PHP — /api/v1/medicos
├── backendjs/                # API Node — /api/v1/pacientes
└── app/                      # Frontend React
```

## Pré-requisitos

- Docker e Docker Compose
- PHP 8.3+ e Composer
- Node.js 20+ e npm

## Subindo o projeto

Em **4 terminais**, na raiz do repositório:

### 1. Banco de dados (MySQL via docker-compose)

```bash
docker compose up -d
```

O script `db/init.sql` é executado automaticamente na primeira inicialização, criando as tabelas `medicos` e `pacientes` e inserindo alguns registros de exemplo.

### 2. Backend PHP (porta 8000)

```bash
cd backendphp
cp .env.example .env
composer install
composer serve
# ou: php -S localhost:8000 -t public
```

### 3. Backend Node (porta 3000)

```bash
cd backendjs
cp .env.example .env
npm install
npm run dev
```

### 4. Frontend (porta 5173)

```bash
cd app
cp .env.example .env
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## API

### Médicos — `http://localhost:8000/api/v1/medicos`

| Método | Rota             | Descrição                  |
| ------ | ---------------- | -------------------------- |
| GET    | `/medicos`       | Lista todos os médicos     |
| GET    | `/medicos/{id}`  | Retorna um médico          |
| POST   | `/medicos`       | Cria um novo médico        |
| PUT    | `/medicos/{id}`  | Atualiza um médico         |
| DELETE | `/medicos/{id}`  | Exclui um médico           |

Exemplo:

```bash
curl -X POST http://localhost:8000/api/v1/medicos \
  -H "Content-Type: application/json" \
  -d '{"nome":"João da Silva","CRM":"123456","UFCRM":"CE"}'
# → {"message":"Médico criado com sucesso"}
```

### Pacientes — `http://localhost:3000/api/v1/pacientes`

| Método | Rota                | Descrição                 |
| ------ | ------------------- | ------------------------- |
| GET    | `/pacientes`        | Lista todos os pacientes  |
| GET    | `/pacientes/{id}`   | Retorna um paciente       |
| POST   | `/pacientes`        | Cria um novo paciente     |
| PUT    | `/pacientes/{id}`   | Atualiza um paciente      |
| DELETE | `/pacientes/{id}`   | Exclui um paciente        |

Exemplo:

```bash
curl -X POST http://localhost:3000/api/v1/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","dataNascimento":"1990-05-12","carteirinha":"111222","cpf":"12345678909"}'
# → {"message":"Paciente criado com sucesso"}
```

## Frontend

- Sidebar fixa à esquerda com os itens **Médicos** e **Pacientes**.
- Cada página lista os registros em uma tabela, com botões para **Novo**, **Editar** e **Excluir**.
- Formulários em modal, com validação básica.
- No topo direito há um **seletor de idioma** (Português / Inglês). A escolha é persistida em `localStorage`.

## Arquitetura

### Backend PHP (`backendphp/`)

```
src/
├── Config/Database.php          # PDO singleton
├── Core/{Router,Request,Response}.php   # Núcleo do mini-framework
├── Controllers/MedicoController.php
├── Models/Medico.php
├── Validators/MedicoValidator.php
└── Exceptions/                  # HttpException + NotFound + Validation
public/index.php                 # Front controller (CORS, rotas, error handler)
```

### Backend Node (`backendjs/`)

```
src/
├── server.js                    # Entrypoint (pool MySQL + createApp)
├── app.js                       # Factory do Express (permite injeção de repositório)
├── config/db.js                 # Pool mysql2
├── routes/pacientes.routes.js
├── controllers/pacientes.controller.js
├── models/paciente.model.js     # Repository (findAll, findById, create, update, remove)
├── validators/paciente.validator.js
├── middleware/errorHandler.js
└── errors.js                    # HttpError / NotFoundError / ValidationError
```

### Frontend (`app/`)

```
src/
├── main.jsx                     # BrowserRouter + i18n
├── App.jsx                      # Layout com Sidebar + rotas
├── i18n.js                      # i18next (pt-BR / en)
├── api/client.js                # Axios: phpApi + nodeApi
├── services/{medicos,pacientes}.js
├── components/{Sidebar,LanguageSwitcher,DataTable,Modal}.jsx
├── pages/{Medicos,Pacientes}.jsx
└── locales/{pt-BR,en}.json
```

## Testes

Cada camada tem seu conjunto de testes, executáveis isoladamente:

```bash
# Backend PHP (PHPUnit)
cd backendphp && composer install && composer test

# Backend Node (Vitest + Supertest, com repository fake em memória)
cd backendjs && npm install && npm test

# Frontend (Vitest + React Testing Library)
cd app && npm install && npm test
```

## Enunciado original

O enunciado completo do teste está preservado em [`docs/ENUNCIADO.md`](docs/ENUNCIADO.md).

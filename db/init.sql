-- Schema inicial do banco compartilhado entre os backends PHP e Node.
-- Executado automaticamente pelo container MySQL na primeira inicialização.

CREATE DATABASE IF NOT EXISTS aplis
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aplis;

CREATE TABLE IF NOT EXISTS medicos (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(255) NOT NULL,
  crm        VARCHAR(20)  NOT NULL,
  uf_crm     CHAR(2)      NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_medico_crm_uf (crm, uf_crm)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pacientes (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  nome             VARCHAR(255) NOT NULL,
  data_nascimento  DATE         NOT NULL,
  carteirinha      VARCHAR(50)  NOT NULL,
  cpf              CHAR(11)     NOT NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_paciente_cpf (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seeds mínimos para facilitar a avaliação.
INSERT IGNORE INTO medicos (id, nome, crm, uf_crm) VALUES
  (1, 'João da Silva',      '123456', 'CE'),
  (2, 'Francisco Pereira',  '876543', 'CE');

INSERT IGNORE INTO pacientes (id, nome, data_nascimento, carteirinha, cpf) VALUES
  (1, 'Maria Oliveira', '1990-05-12', '111222', '12345678909'),
  (2, 'Carlos Souza',   '1985-09-23', '333444', '98765432100');

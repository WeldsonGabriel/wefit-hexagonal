-- Criação da base de dados, se necessário
CREATE DATABASE IF NOT EXISTS wefit;
USE wefit;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS User (
    id_usuario VARCHAR(36) NOT NULL PRIMARY KEY,
    name_usuario VARCHAR(255) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    emailConfirmed BOOLEAN NOT NULL DEFAULT FALSE,
    phone VARCHAR(50),
    mobile VARCHAR(50),
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    type ENUM('INDIVIDUAL', 'COMPANY') NOT NULL,
    addressId VARCHAR(36),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Endereços
CREATE TABLE IF NOT EXISTS Address (
    id_Address VARCHAR(36) NOT NULL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    complement VARCHAR(255),
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    isCurrent BOOLEAN NOT NULL DEFAULT TRUE,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela para Pessoa Física (Individual)
CREATE TABLE IF NOT EXISTS Individual (
    id_Individual VARCHAR(36) NOT NULL PRIMARY KEY,
    userId VARCHAR(36) NOT NULL UNIQUE,
    addressId VARCHAR(36),
    CONSTRAINT fk_individual_user FOREIGN KEY (userId) REFERENCES User(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_individual_address FOREIGN KEY (addressId) REFERENCES Address(id_Address)
);

-- Tabela para Empresas (Company)
CREATE TABLE IF NOT EXISTS Company (
    id_Company VARCHAR(36) NOT NULL PRIMARY KEY,
    cnpj VARCHAR(50) NOT NULL UNIQUE,
    responsibleCpf VARCHAR(20) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    addressId VARCHAR(36),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_company_user FOREIGN KEY (userId) REFERENCES User(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_company_address FOREIGN KEY (addressId) REFERENCES Address(id_Address),
    UNIQUE KEY unique_cnpj_responsible (cnpj, responsibleCpf)
);

-- Tabela para Requisições de Alteração de Endereço
CREATE TABLE IF NOT EXISTS AddressRequest (
    id_Request_Address VARCHAR(36) NOT NULL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50) NOT NULL,
    complement VARCHAR(255),
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(100) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_addressRequest_user FOREIGN KEY (userId) REFERENCES User(id_usuario) ON DELETE CASCADE
);

-- Crear la base de datos
CREATE DATABASE TrabajadoresPrueba;
GO

-- Usar la base de datos
USE TrabajadoresPrueba;
GO

-- Crear tabla principal de trabajadores
CREATE TABLE Trabajadores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombres NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100) NOT NULL,
    TipoDocumento NVARCHAR(20) NOT NULL,          -- Ejemplo: DNI, CE, Pasaporte
    NumeroDocumento NVARCHAR(20) NOT NULL UNIQUE,
    Sexo NVARCHAR(10) CHECK (Sexo IN ('Masculino', 'Femenino')) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Foto VARBINARY(MAX),                          -- Guardaremos la imagen en binario (byte[])
    Direccion NVARCHAR(200),
    Estado NVARCHAR(20) CHECK (Estado IN ('Activo', 'Inactivo', 'Vacaciones')) NOT NULL DEFAULT 'Activo',
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE()
);
GO
CREATE TABLE Trabajadores (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombres NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100) NOT NULL,
    TipoDocumento NVARCHAR(20) NOT NULL,
    NumeroDocumento NVARCHAR(20) NOT NULL UNIQUE,
    Sexo NVARCHAR(10) CHECK (Sexo IN ('Masculino', 'Femenino')) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Foto VARBINARY(MAX) NULL,
    Direccion NVARCHAR(200),
    Estado NVARCHAR(20) CHECK (Estado IN ('Activo', 'Inactivo', 'Vacaciones')) NOT NULL DEFAULT 'Activo'
);
GO
# 🦷 Dental-App - Sistema de Gestión Odontológica Multi-Agente

Sistema Fullstack profesional para la gestión de turnos y pacientes, desarrollado mediante una arquitectura de **Orquestación de Agentes de IA** y el protocolo **MCP (Model Context Protocol)**.

## 🤖 Arquitectura de IA y Agentes
Este proyecto no fue desarrollado de forma tradicional. Se utilizó un ecosistema de agentes especializados coordinados por un **Orchestrator**:

* **Orchestrator Agent:** Director de orquesta que valida lógica de negocio y delega tareas.
* **Backend Agent:** Especialista en Java 17, Spring Boot 3 y Spring Security.
* **Frontend Agent:** Experto en React, Vite y Tailwind CSS con enfoque en UX/UI Médica.
* **Database Agent:** Administrador de MySQL encargado de la integridad referencial.
* **Test Agent:** Encargado de QA, JUnit 5 y validación de Edge Cases.

## 🛠️ Stack Tecnológico & Skills de IA
El desarrollo integra **Custom Skills** de OpenCode para asegurar estándares de industria:
- **Frontend Design Skill:** Interfaces de alta fidelidad evitando estéticas genéricas.
- **Vercel React Best Practices:** Optimización de rendimiento y hooks.
- **Java Spring Boot Skill:** Patrones de diseño y arquitectura de capas.
- **MySQL Optimization Skill:** Indexación y tuning de queries.

## 🔌 Conectividad MCP (Model Context Protocol)
Los agentes interactúan con el entorno local mediante servidores MCP:
- **mysql-local:** Conexión directa del LLM con la base de datos para validar esquemas en tiempo real.
- **filesystem:** Acceso controlado de la IA a la estructura de archivos para refactorización precisa.

## 🔐 Seguridad y Credenciales
- El sistema utiliza JWT (JSON Web Tokens) para la seguridad.

Admin Default: admin@dental.com / admin123 (o modificar en bd)

## 🚀 Instalación y Setup

### 1. Requisitos
- Java 24 / Node.js 18+ / MySQL 8.0
- OpenCode / Cursor con soporte MCP

### 2. Configuración de Variables
Copia el archivo de ejemplo y configura tus credenciales:
```bash
cp .env.example .env
## Instalacion

### Base de Datos

Crear base de datos dental_db y ejecutar el script backend/schema.sql

### Backend

cd backend
cp .env.example .env
# Editar .env con tus credenciales
mvn clean install
mvn spring-boot:run

El backend estara disponible en: http://localhost:8080

### 3. Frontend

cd frontend
npm install
npm run dev


El frontend estara disponible en: http://localhost:5173

## Credenciales

| Rol | Email | Contrasena |
|-----|-------|------------|
| Admin | admin@dental.com | admin123 |

## Endpoints API

### Autenticacion
- POST /api/auth/login
- POST /api/auth/register

### Usuarios (Admin)
- GET /api/users
- GET /api/users/{id}
- PUT /api/users/{id}
- DELETE /api/users/{id}

### Pacientes
- GET /api/patients
- POST /api/patients

### Profesionales
- GET /api/professionals
- POST /api/professionals

### Turnos
- GET /api/appointments
- POST /api/appointments
- PUT /api/appointments/{id}
- DELETE /api/appointments/{id}

## Licencia

MIT License

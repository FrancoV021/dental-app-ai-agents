# 🦷 Dental App - Sistema de Gestión de Turnos

Aplicación fullstack para la gestión de turnos odontológicos, desarrollada con arquitectura moderna y asistida por inteligencia artificial mediante agentes especializados.

---

## 🧠 Descripción

Dental App es una aplicación web que permite administrar turnos de pacientes, gestionar usuarios y simular un flujo real de una clínica odontológica.

Este proyecto fue desarrollado utilizando un enfoque moderno basado en:
- Arquitectura desacoplada (frontend + backend)
- Uso de inteligencia artificial con agentes especializados
- Buenas prácticas de desarrollo fullstack

---

## 🏗️ Arquitectura
- frontend/ → Aplicación React
- backend/ → API REST con Spring Boot
- database/ → Configuración de base de datos
- agents/ → Agentes de IA (frontend, backend, db, test)
- skills/ → Definición de habilidades y comportamiento de agentes


---

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

### 🔧 Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (autenticación)

### 🗄️ Base de datos
- MySQL

### 🤖 Inteligencia Artificial
- OpenCode
- Arquitectura multi-agente:
  - Backend Agent
  - Frontend Agent
  - Database Agent
  - Test Agent
  
### 🤖 Arquitectura de IA y Agentes
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

### 🔌 Conectividad MCP (Model Context Protocol)
Los agentes interactúan con el entorno local mediante servidores MCP:

- **mysql-local:** Conexión directa del LLM con la base de datos para validar esquemas en tiempo real.
- **filesystem:** Acceso controlado de la IA a la estructura de archivos para refactorización precisa.

### 🔐 Seguridad y Credenciales
- El sistema utiliza JWT (JSON Web Tokens) para la seguridad.

---

## 🔐 Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación con JWT
- Gestión de turnos
- Comunicación frontend ↔ backend mediante API REST
- Persistencia de datos en base de datos

---

## 🤖 Uso de Inteligencia Artificial

Este proyecto fue desarrollado con soporte de IA utilizando un enfoque basado en agentes.

Cada agente tiene una responsabilidad específica:
- Generación de código backend
- Construcción de interfaz frontend
- Modelado de base de datos
- Testing

Además, se utilizaron archivos `.md` para definir:
- Reglas
- Objetivos
- Estilo de código
- Buenas prácticas

---

## 📦 Instalación y ejecución

### 1. Requisitos
- Java 17+ / Node.js 18+ / MySQL 8.0
- OpenCode / ide con soporte MCP

### 2. Configuración de Variables
- Crea el archivo de .env y configura tus credenciales:

## Instalacion

### Base de Datos

- Crear base de datos dental_db y ejecutar el script backend/schema.sql

###🔹 Backend

```bash
cd backend
mvn spring-boot:run
```
- crea tu .env

El backend estara disponible en: http://localhost:8080

###🔹 Frontend
```bash
cd frontend
npm install
npm run dev
```

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

---

## 🌱 Variables de entorno

Crear archivos .env para separar configuración:
```bash
DB_URL=...
DB_USERNAME=...
DB_PASSWORD=...
JWT_SECRET=...
```

---

## 📈 Mejoras futuras

- Implementación de tests automatizados
- Dockerización del proyecto
- Deploy en la nube (Vercel + Render)
- Manejo global de errores
- Logs y monitoreo

---

## 💡 Aprendizajes

Este proyecto me permitió:

- Trabajar con arquitectura fullstack real
- Integrar inteligencia artificial en el desarrollo
- Comprender la importancia de definir correctamente instrucciones (skills)
- Mejorar la organización y escalabilidad de un sistema

---

## 👨‍💻 Autor

Franco Santacatalina
Desarrollador Full Stack (Junior)

📫 LinkedIn: [linkedin.com/in/franco-santacatalina](https://www.linkedin.com/in/franco-santacatalina-735347244/)  
💻 Portfolio: [portfolio-franhicode.netlify.app](https://portfolio-franhicode.netlify.app/)

---

##⭐ Nota

Este proyecto forma parte de mi proceso de aprendizaje y crecimiento como desarrollador.
Estoy abierto a feedback y oportunidades laborales.


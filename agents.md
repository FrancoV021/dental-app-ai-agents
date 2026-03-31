#  Directorio de Agentes - Dental-App

Este archivo define los roles y la ubicación de los especialistas disponibles para el proyecto. El **Orchestrator** debe consultar este índice para delegar tareas.

---

## Agentes Especialistas

### 1. Frontend Agent
- **Archivo:** `/agents/frontend-agent.md`
- **Especialidad:** React.js, Vite, Tailwind CSS, Lucide Icons, Gestión de Estado (Hooks).
- **Responsabilidad:** Creación de componentes, maquetación del Dashboard, consumo de APIs con Fetch y validaciones de formularios.

### 2. Backend Agent
- **Archivo:** `/agents/backend-agent.md`
- **Especialidad:** Java 17, Spring Boot 3, Spring Security, Maven.
- **Responsabilidad:** Creación de Controllers, Services y Repositories. Manejo de lógica de negocio y seguridad de la API.

### 3. Database Agent (BD Agent)
- **Archivo:** `/agents/bd-agent.md`
- **Especialidad:** MySQL, Modelado de Datos, MCP MySQL Server.
- **Responsabilidad:** Diseñar el esquema de tablas, relaciones (1:N entre Dentistas y Turnos), migraciones y optimización de queries SQL.

### 4. Test Agent
- **Archivo:** `/agents/test-agent.md`
- **Especialidad:** JUnit 5, Mockito, Testing de Integración.
- **Responsabilidad:** Asegurar que el código no tenga bugs, probar los Endpoints de la API y verificar la lógica de los servicios.

---

## Reglas de Derivación para el Orchestrator
1. **Tareas Fullstack:** Si el usuario pide una funcionalidad completa (ej: "Sistema de Login"), el Orchestrator debe activar primero al **BD Agent**, luego al **Backend Agent** y finalmente al **Frontend Agent**.
2. **Prioridad de Contexto:** Siempre que un agente esté activo, debe respetar las reglas globales definidas en `opencode.md`.
3. **Uso de Archivos:** Los agentes solo deben modificar archivos dentro de su área de competencia para evitar conflictos de código.
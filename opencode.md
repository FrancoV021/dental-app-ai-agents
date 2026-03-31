# Estructura sugerida para opencode.md

## Stack Tecnológico

- Backend: Java 17+ con Spring Boot 3.x. 
- Frontend: React 18 con Vite (JS, no TS).
- Estilos: Tailwind CSS.
- DB: MySQL 8.0.

## Arquitectura y Patrones (El "Cómo")


- Patrón: MVC (Model-View-Controller) en el Backend.
- Estructura de Carpetas: Definí que querés carpetas separadas para controller, service, repository y entity.
- API: Uso de @RestController y respuestas en formato JSON.

## Reglas de Comunicación (CORS y Axios)

- CORS: "La configuración de CORS debe permitir peticiones desde http://localhost:5173 (Vite)".
- Axios: "Todas las peticiones del Frontend deben centralizarse en una carpeta services/ usando Axios".

## Convenciones de Código

- Idioma: "Código (clases, variables, métodos) en Inglés. Comentarios y mensajes de error en Español".
-  Nombres: "Clases en PascalCase, variables y métodos en camelCase".
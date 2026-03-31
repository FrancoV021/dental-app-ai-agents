# Role: Frontend Specialist (React + Tailwind)

Eres un experto en desarrollo de interfaces con React y Vite. Tu objetivo es crear componentes modulares y una experiencia de usuario fluida para el sistema dental. que encaje con el backend y la bd

## Detalles
- tene en cuenta las skils de frontend de vercel  y de diseño de interfaz de usuario
- turnos con calendario, formulario
- el admin podra ver los turnos, pacientes y profecionales en una tabla y gestionarlos por separado 
- el admin podra eliminasr, editar o crear turnos, pacientes o profecionales
- login, home admin dashboard, user dashboard, profecional dashboard

## Pasos para iniciar con el frontend
- npm create vite@latest (yo te deje la carpeta creada si la deseas, si no la usas borrala)
- npm install 
- descarga las dependencias que quieras

## Stack Técnico
- **Framework:** React  (Vite).
- **Estilos:** Tailwind CSS (Utility-first).
- **Iconos:** Lucide React.
- **Comunicación:** Axios.

## Reglas de Desarrollo
1. **Componentes:** Crea componentes pequeños y reutilizables en `src/components`.
2. **Estado:** Usa `useState` y `useEffect` de forma eficiente. No sobrecargues el re-renderizado.
3. **Estilos:** Usa clases de Tailwind. Mantén un diseño limpio, profesional y con colores médicos (azules, blancos, grises claros).
4. **Consumo de API:**
   - Centraliza los llamados en `src/services/api.js`.
   - Maneja siempre estados de `loading` y `error`.
   - Usa bloques `try/catch` para cada petición.

## Guía de Diseño
- **Dashboard:** Debe tener una Sidebar para navegación y un área de contenido principal.
- **Formularios:** Usa etiquetas claras y validaciones antes de enviar al backend.
- **Responsividad:** Todo debe verse bien en tablets y móviles (usando `md:`, `lg:` de Tailwind).

## Restricciones
- No uses librerías externas de estado (Redux/Zustand) a menos que sea estrictamente necesario.
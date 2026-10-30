# Declaración de Uso de Inteligencia Artificial

**a. ¿Qué herramientas de IA utilizó (ChatGPT, Claude, Copilot, etc.) y en qué momentos?**
Para el desarrollo de este proyecto utilicé **Gemini**. La herramienta fue empleada en los siguientes momentos clave:
1. **Planificación de la Arquitectura:** Para estructurar correctamente la aplicación utilizando Módulos ES6 (separando la lógica en `app.js`, `api.js`, `storage.js` y `ui.js`).
2. **Lógica de JavaScript:** Como apoyo para construir los métodos de filtrado y ordenamiento de arrays, y la estructura del bloque `try/catch` al consumir la API con `fetch()`.
3. **Estilos Visuales:** Para generar un diseño CSS moderno utilizando variables (`:root`) y Flexbox una vez que la funcionalidad principal ya estaba terminada.

**b. Adjunte al menos 2 prompts (instrucciones) clave que utilizó durante el desarrollo.**
* **Prompt 1:** *"Para el componente de investigación, ayúdame con la Opción A (Arquitectura Modular ES6) y con la estructura de archivos requerida para separar la interfaz visual (DOM), el servicio API y el módulo gestor de localStorage."*
* **Prompt 2:** *"La página se ve así (adjunté captura). La funcionalidad principal ya trabaja a la perfección, ahora ayúdame a mejorar la presentación visual para que luzca como una aplicación profesional."*

**c. ¿Qué partes del código sugerido por la IA contenían errores o requirieron ajustes manuales para integrarse correctamente a su proyecto?**
El código base proporcionado por la IA requirió los siguientes ajustes manuales:
1. **Rutas de importación ES6:** Tuve que asegurarme manualmente de incluir la extensión `.js` en todas las declaraciones de importación (ej. `import { consultarTareasAPI } from './api.js';`), ya que al trabajar con Vanilla JS en el navegador sin un empaquetador (como Webpack o Vite), omitir la extensión generaba errores de carga de módulos (MIME type mismatch).
2. **Integración de CSS:** La IA generó un bloque completo de CSS para mejorar el diseño. Tuve que realizar ajustes manuales para reemplazar cuidadosamente los estilos antiguos dentro de la etiqueta `<style>` de mi archivo `index.html` sin sobreescribir ni romper las clases de notificaciones (`.error`, `.exito`) que ya estaban enlazadas a la lógica de JavaScript.
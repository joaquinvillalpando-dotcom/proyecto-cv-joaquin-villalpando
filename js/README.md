# Módulo JavaScript — Hoja de Vida

Este directorio contiene la lógica en **JavaScript nativo (ES6+)**, sin librerías externas, que da soporte a la interactividad del sitio.

## Archivo

`main.js` — se incluye en las 9 páginas mediante `<script src="js/main.js" defer></script>`, y se ejecuta al disparar `DOMContentLoaded`.

## Funcionalidades implementadas

1. **`init_tema()`** — Alterna entre modo claro (por defecto) y modo oscuro agregando/quitando el atributo `data-theme="dark"` en `<html>`. Persiste la elección en `localStorage` (clave `cv_tema`) y respeta la preferencia del sistema operativo (`prefers-color-scheme`) en la primera visita.
2. **`init_menu_movil()`** — Controla la apertura/cierre del menú de navegación en pantallas pequeñas, actualizando `aria-expanded` para accesibilidad y cerrando el menú automáticamente al elegir una página.
3. **`init_revelado_scroll()`** — Usa `IntersectionObserver` para revelar cada sección con una transición suave cuando entra en el viewport, con respaldo (mostrar todo directo) si el navegador no soporta la API.
4. **`init_dialogo_aviso()`** — Muestra el `<dialog>` del aviso en el aside, lo cierra al hacer clic fuera, y recuerda mediante `localStorage` (clave `cv_aviso_cerrado`) si el usuario ya lo cerró antes para no volver a mostrarlo.
5. **`init_contador_caracteres()`** — Actualiza en vivo el conteo de caracteres del campo de mensaje en el formulario de contacto.
6. **`init_validacion_formulario()`** — Valida cada campo del formulario de contacto usando la **Constraint Validation API** nativa del navegador (`checkValidity()`, `validity`), muestra mensajes de error personalizados en español, y despliega un mensaje de éxito o error general al enviar el formulario (`aria-live="polite"` para lectores de pantalla). Como el formulario no tiene backend real, el envío se simula con `event.preventDefault()`.

## Buenas prácticas aplicadas

- Ejecución diferida con el atributo `defer`.
- Funciones nombradas y documentadas con comentarios JSDoc en español.
- Nomenclatura de funciones, variables y claves de `localStorage` en snake_case.
- Sin dependencias externas ni frameworks.

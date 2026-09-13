# Arquitectura de Hojas de Estilo CSS3 — Hoja de Vida

Este directorio contiene la arquitectura **CSS3 modular** compartida por las 9 páginas del sitio.

## Archivos

| Archivo | Responsabilidad técnica |
| :--- | :--- |
| `variables.css` | Tokens de diseño: paleta de colores (Esmeralda, Amatista, Negro Azabache, Blanco Fantasma, Carbón), tipografía, espaciado, radios y variables de tema claro/oscuro (`[data-theme="dark"]`). |
| `base.css` | Reset moderno, tipografía base y estilos de elementos semánticos (`mark`, `abbr`, `dfn`, `time`, `address`). |
| `layout.css` | Estructura del sitio: encabezado, navegación con menú móvil, `main`, CSS Grid (habilidades, perfil), Flexbox (nav, multimedia, contacto, aside) y `@media queries`. |
| `components.css` | Tarjetas (`details`), tabla de idiomas, formulario de contacto con estados de error/éxito, botones, `progress`, `meter`, `dialog`. |
| `animations.css` | `@keyframes` de entrada del encabezado, revelado por scroll (clases `.revelar`/`.visible` controladas desde `js/main.js`), animación del menú móvil y respeto a `prefers-reduced-motion`. |
| `styles.css` | Punto de entrada único: importa todos los módulos anteriores vía `@import`, en el orden en que deben aplicarse. |

## Convenciones

- Nomenclatura de clases e identificadores en **snake_case**.
- Todos los colores, espaciados y tipografías se definen como variables en `:root` (`variables.css`) y se consumen mediante `var(--nombre_variable)` en el resto de los archivos — ningún valor de color está escrito directamente fuera de ese archivo.
- El tema oscuro se activa agregando el atributo `data-theme="dark"` al elemento `<html>` desde `js/main.js`; el CSS solo reacciona a ese atributo, no contiene lógica de JavaScript.
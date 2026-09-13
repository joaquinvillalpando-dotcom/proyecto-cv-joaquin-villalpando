# Hoja de Vida Interactiva — Joaquin Francisco Villalpando Apaza

Sitio web personal tipo CV interactivo, multipágina, desarrollado con **HTML5 semántico**, **CSS3 moderno** y **JavaScript nativo (ES6+)**, sin frameworks ni librerías externas.

Proyecto correspondiente a la **Primera Evaluación Práctica de la Unidad I** de la asignatura **Tecnologías Web I (SIS-214)**, Universidad Católica Boliviana "San Pablo". Docente: Ing. M.Sc. Miguel Angel Pacheco Arteaga.

**Sitio en vivo:** https://joaquinvillalpando-dotcom.github.io/hoja_vida_joaquin_villalpando_html_css/
**Repositorio:** https://github.com/joaquinvillalpando-dotcom/hoja_vida_joaquin_villalpando_html_css

---

## Estructura del proyecto

```
hoja_vida_joaquin_villalpando_html_css/
├── index.html              # Perfil Profesional (página de inicio)
├── formacion.html          # Formación Académica
├── experiencia.html        # Experiencia de Aprendizaje Práctico
├── habilidades.html        # Habilidades Técnicas y Profesionales
├── certificaciones.html    # Certificaciones, Cursos y Seminarios
├── idiomas.html             # Idiomas
├── proyectos.html          # Proyectos Destacados
├── multimedia.html         # Portafolio Multimedia
├── contacto.html           # Contacto (formulario con validación)
├── css/
│   ├── README.md
│   ├── styles.css          # Punto de entrada unificado (@import)
│   ├── variables.css       # Tokens de diseño y paleta de colores
│   ├── base.css             # Reset y tipografía base
│   ├── layout.css           # Estructura, Flexbox y CSS Grid
│   ├── components.css       # Tarjetas, formulario, tabla, botones
│   └── animations.css       # Keyframes y micro-interacciones
├── js/
│   ├── README.md
│   └── main.js               # Tema, menú móvil, validación, scroll, diálogo
└── assets/
    ├── README.md
    ├── images/
    ├── audio/
    ├── video/
    └── documents/
```

Todas las páginas comparten el mismo `<header>`, `<nav>`, `<aside>` y `<footer>`, repetidos manualmente en cada archivo (sin includes de servidor, según lo permitido en la consigna).

## Paleta de colores

| Nombre | Código | Uso |
| :--- | :--- | :--- |
| Esmeralda | `#23CE6B` | Acento principal, enlaces, botones, barra activa del menú |
| Amatista | `#A846A0` | Acento secundario, citas, énfasis |
| Negro Azabache | `#272D2D` | Texto principal (modo claro) / fondo (modo oscuro) |
| Blanco Fantasma | `#F6F8FF` | Fondo (modo claro) / texto principal (modo oscuro) |
| Carbón | `#50514F` | Texto secundario, bordes |

El sitio inicia en **modo claro** por defecto; el botón de la barra de navegación permite alternar a modo oscuro, con persistencia mediante `localStorage`.

## Características técnicas

- HTML5 semántico: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `details`, `dialog`, `figure`, roles ARIA (`role="banner"`, `role="main"`, `role="contentinfo"`).
- Nomenclatura en **snake_case** en clases, identificadores y claves de `localStorage`.
- CSS Grid en la sección de Habilidades y en la lista de fortalezas del perfil; Flexbox en la navegación, el encabezado, el formulario y la galería multimedia.
- Diseño responsivo con menú de navegación colapsable en móvil.
- JavaScript nativo con manipulación del DOM: tema claro/oscuro, menú móvil, validación de formulario mediante la Constraint Validation API, contador de caracteres, revelado de contenido con `IntersectionObserver` y manejo del `<dialog>` nativo.
- Formulario de contacto con validación nativa (HTML5) **y** validación en JavaScript, con mensajes de error personalizados en español.
- Accesibilidad: enlace de salto al contenido, `aria-current="page"` en el enlace activo del menú, `aria-live` en el mensaje de estado del formulario, foco visible en todos los elementos interactivos.

## Cómo ejecutar el proyecto

No requiere instalación. Basta con abrir `index.html` en cualquier navegador moderno, o usar un servidor local (por ejemplo, la extensión Live Server de VS Code) para una mejor experiencia de desarrollo.

## Autor

**Joaquin Francisco Villalpando Apaza**
Estudiante de Ingeniería de Sistemas — Universidad Católica Boliviana "San Pablo"
La Paz, Bolivia · [joaquin.villalpando@ucb.edu.bo](mailto:joaquin.villalpando@ucb.edu.bo)

document.addEventListener('DOMContentLoaded', () => {
  init_tema();
  init_menu_movil();
  init_revelado_scroll();
  init_dialogo_aviso();
  init_contador_caracteres();
  init_validacion_formulario();
});


// 1. TEMA CLARO / OSCURO CON PERSISTENCIA EN LOCALSTORAGE
function init_tema() {
  const elemento_html = document.documentElement;
  const boton_tema = document.getElementById('boton_tema');
  const icono_tema = document.getElementById('icono_tema');
  const texto_tema = document.getElementById('texto_tema');

  // El tema por defecto del sitio es "claro". Sólo se activa "dark" si el
  // usuario lo guardó antes, o si su sistema operativo lo prefiere y nunca
  // eligió nada manualmente.
  const tema_guardado = localStorage.getItem('cv_tema');
  const prefiere_oscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const tema_inicial = tema_guardado || (prefiere_oscuro ? 'dark' : 'light');

  aplicar_tema(tema_inicial);

  if (boton_tema) {
    boton_tema.addEventListener('click', () => {
      const tema_actual = elemento_html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const tema_nuevo = tema_actual === 'dark' ? 'light' : 'dark';
      aplicar_tema(tema_nuevo);
      localStorage.setItem('cv_tema', tema_nuevo);
    });
  }

  /**
   * Aplica el tema visual al documento y actualiza el ícono/texto del botón.
   * @param {string} tema - 'light' o 'dark'.
   */
  function aplicar_tema(tema) {
    if (tema === 'dark') {
      elemento_html.setAttribute('data-theme', 'dark');
      if (icono_tema) icono_tema.textContent = '\u263C'; // ☼
      if (texto_tema) texto_tema.textContent = 'Modo claro';
    } else {
      elemento_html.removeAttribute('data-theme');
      if (icono_tema) icono_tema.textContent = '\u263D'; // ☽
      if (texto_tema) texto_tema.textContent = 'Modo oscuro';
    }
  }
}

//  2. MENÚ DE NAVEGACIÓN MÓVIL (HAMBURGUESA)
function init_menu_movil() {
  const boton_menu = document.getElementById('boton_menu_movil');
  const menu = document.getElementById('menu_principal');

  if (!boton_menu || !menu) return;

  boton_menu.addEventListener('click', () => {
    const esta_abierto = menu.classList.toggle('menu_abierto');
    boton_menu.setAttribute('aria-expanded', esta_abierto.toString());
    boton_menu.setAttribute('aria-label', esta_abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  });

  // Cerrar el menú automáticamente al elegir una página (mejora en móvil)
  menu.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      menu.classList.remove('menu_abierto');
      boton_menu.setAttribute('aria-expanded', 'false');
    });
  });

  // Si la ventana se agranda y el menú móvil quedó "abierto", se limpia el estado
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720 && menu.classList.contains('menu_abierto')) {
      menu.classList.remove('menu_abierto');
      boton_menu.setAttribute('aria-expanded', 'false');
    }
  });
}

// 3. REVELADO DE CONTENIDO AL HACER SCROLL (IntersectionObserver)
function init_revelado_scroll() {
  const elementos = document.querySelectorAll('main section, aside section');
  if (elementos.length === 0) return;

  // Si el navegador no soporta IntersectionObserver, se muestra todo directo
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }

  elementos.forEach((el) => el.classList.add('revelar'));

  const observador = new IntersectionObserver(
    (entradas, observador_actual) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador_actual.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observador.observe(el));
}

// 4. DIÁLOGO NATIVO DE AVISO (cerrar al hacer clic fuera + recordar cierre)
function init_dialogo_aviso() {
  const dialogo = document.getElementById('dialogo_aviso');
  const tarjeta_aviso = document.getElementById('tarjeta_aviso');
  if (!dialogo || !tarjeta_aviso) return;

  const clave_almacenamiento = 'cv_aviso_cerrado';

  if (localStorage.getItem(clave_almacenamiento) === 'si') {
    tarjeta_aviso.hidden = true;
    return;
  }

  if (typeof dialogo.show === 'function') {
    dialogo.show();
  } else {
    dialogo.setAttribute('open', '');
  }

  dialogo.addEventListener('close', () => {
    localStorage.setItem(clave_almacenamiento, 'si');
    tarjeta_aviso.hidden = true;
  });

  // Cerrar al hacer clic fuera del cuadro de diálogo
  dialogo.addEventListener('click', (evento) => {
    const limites = dialogo.getBoundingClientRect();
    const dentro_del_dialogo =
      evento.clientY >= limites.top && evento.clientY <= limites.bottom &&
      evento.clientX >= limites.left && evento.clientX <= limites.right;
    if (!dentro_del_dialogo) {
      dialogo.close();
    }
  });
}

// 5. CONTADOR DE CARACTERES DEL MENSAJE (página de contacto)
function init_contador_caracteres() {
  const area_mensaje = document.getElementById('txt_mensaje');
  const contador = document.getElementById('contador_caracteres');
  if (!area_mensaje || !contador) return;

  const limite = Number(area_mensaje.getAttribute('maxlength')) || 500;

  function actualizar_contador() {
    contador.textContent = `${area_mensaje.value.length} / ${limite}`;
  }

  area_mensaje.addEventListener('input', actualizar_contador);
  actualizar_contador();
}

// 6. VALIDACIÓN DEL FORMULARIO DE CONTACTO (Constraint Validation API)
function init_validacion_formulario() {
  const formulario = document.getElementById('formulario_contacto');
  if (!formulario) return;

  const mensaje_estado = document.getElementById('mensaje_estado_formulario');
  const campos = Array.from(formulario.querySelectorAll('input, textarea'));

  // Validación individual en tiempo real, mientras el usuario escribe
  campos.forEach((campo) => {
    campo.addEventListener('input', () => validar_campo(campo));
    campo.addEventListener('blur', () => validar_campo(campo));
  });

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let formulario_valido = true;
    campos.forEach((campo) => {
      const campo_valido = validar_campo(campo);
      if (!campo_valido) formulario_valido = false;
    });

    if (formulario_valido) {
      mostrar_mensaje_estado('¡Mensaje enviado con éxito! Gracias por escribir, responderé a la brevedad.', 'exito');
      formulario.reset();
      document.getElementById('contador_caracteres').textContent = '0 / 500';
    } else {
      mostrar_mensaje_estado('Hay campos que necesitan tu atención. Revisa los mensajes marcados en rojo.', 'error');
      // Lleva el foco al primer campo inválido para facilitar la corrección
      const primer_invalido = campos.find((campo) => !campo.checkValidity());
      if (primer_invalido) primer_invalido.focus();
    }
  });

  /**
   * Valida un campo individual usando la Constraint Validation API nativa
   * y muestra/oculta su mensaje de error correspondiente en español.
   * @param {HTMLElement} campo - El input, textarea o checkbox a validar.
   * @returns {boolean} true si el campo es válido.
   */
  function validar_campo(campo) {
    const contenedor_error = document.getElementById(`error_${campo.id}`);
    const es_valido = campo.checkValidity();

    campo.classList.toggle('campo_invalido', !es_valido);

    if (contenedor_error) {
      contenedor_error.textContent = es_valido ? '' : obtener_mensaje_error(campo);
    }
    return es_valido;
  }

  /**
   * Traduce las validaciones nativas del navegador a mensajes en español,
   * más claros que los mensajes por defecto del navegador.
   * @param {HTMLElement} campo
   * @returns {string}
   */
  function obtener_mensaje_error(campo) {
    const validez = campo.validity;
    if (validez.valueMissing) return 'Este campo es obligatorio.';
    if (validez.typeMismatch && campo.type === 'email') return 'Ingresa un correo electrónico válido.';
    if (validez.patternMismatch && campo.id === 'txt_telefono') return 'Ingresa un número boliviano válido (ej. 70000000).';
    if (validez.patternMismatch) return 'El formato ingresado no es válido.';
    if (validez.tooShort) return `Escribe al menos ${campo.minLength} caracteres.`;
    if (validez.tooLong) return `No superes los ${campo.maxLength} caracteres.`;
    return 'Revisa este campo.';
  }

  /**
   * Muestra el mensaje general de estado del formulario (éxito o error).
   * @param {string} texto
   * @param {'exito'|'error'} tipo
   */
  function mostrar_mensaje_estado(texto, tipo) {
    if (!mensaje_estado) return;
    mensaje_estado.textContent = texto;
    mensaje_estado.className = `mensaje_estado ${tipo}`;
    mensaje_estado.hidden = false;
  }
}

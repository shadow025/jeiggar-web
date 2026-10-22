/* JEIGGAR · interacciones del sitio (sin dependencias) */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Tema claro / oscuro ---------- */
  const root = document.documentElement;
  const btnTema = $('#btn-tema');
  const aplicarTema = (t) => {
    if (t === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    if (btnTema) btnTema.setAttribute('aria-label', t === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    try { localStorage.setItem('jeiggar-tema', t); } catch (e) {}
  };
  if (btnTema) {
    btnTema.addEventListener('click', () => aplicarTema(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
    btnTema.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }

  /* ---------- Encabezado con sombra al desplazarse ---------- */
  const encabezado = $('#encabezado');
  const onScroll = () => encabezado && encabezado.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú de servicios (escritorio) ---------- */
  const btnServicios = $('#btn-servicios');
  const menuServicios = $('#menu-servicios');
  const cerrarServicios = () => {
    if (!menuServicios) return;
    menuServicios.classList.remove('is-open');
    btnServicios && btnServicios.setAttribute('aria-expanded', 'false');
  };
  if (btnServicios && menuServicios) {
    btnServicios.addEventListener('click', (e) => {
      e.stopPropagation();
      const abierto = menuServicios.classList.toggle('is-open');
      btnServicios.setAttribute('aria-expanded', String(abierto));
    });
    document.addEventListener('click', (e) => { if (!menuServicios.contains(e.target)) cerrarServicios(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { cerrarServicios(); cerrarMovil(); } });
  }

  /* ---------- Menú móvil ---------- */
  const menuMovil = $('#menu-movil');
  const btnMenu = $('#btn-menu');
  const abrirMovil = () => {
    if (!menuMovil) return;
    menuMovil.classList.add('is-open');
    menuMovil.setAttribute('aria-hidden', 'false');
    btnMenu && btnMenu.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const cerrarMovil = () => {
    if (!menuMovil) return;
    menuMovil.classList.remove('is-open');
    menuMovil.setAttribute('aria-hidden', 'true');
    btnMenu && btnMenu.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  btnMenu && btnMenu.addEventListener('click', abrirMovil);
  const btnCerrar = $('#btn-cerrar-menu');
  btnCerrar && btnCerrar.addEventListener('click', cerrarMovil);
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) cerrarMovil(); });

  /* ---------- Buscador de herramientas (alquiler) ---------- */
  const buscador = $('#buscar-herramienta');
  if (buscador) {
    const tarjetas = $$('.tarjeta-herramienta');
    const vacio = $('#sin-resultados');
    const normalizar = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    buscador.addEventListener('input', () => {
      const q = normalizar(buscador.value.trim());
      let visibles = 0;
      tarjetas.forEach((t) => {
        const ok = !q || normalizar(t.dataset.nombre || '').includes(q);
        t.classList.toggle('is-hidden', !ok);
        if (ok) visibles++;
      });
      vacio && vacio.classList.toggle('oculto', visibles > 0);
    });
  }

  /* ---------- Selector Antes / Después ---------- */
  $$('[data-antes-despues]').forEach((bloque) => {
    $$('button[data-cara]', bloque).forEach((btn) => {
      btn.addEventListener('click', () => {
        bloque.classList.toggle('is-despues', btn.dataset.cara === 'despues');
        $$('button[data-cara]', bloque).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      });
    });
  });

  /* ---------- Formulario de cotización: mostrar campo de equipo ---------- */
  const selServicio = $('#q-servicio');
  const campoEquipo = $('#campo-equipo');
  if (selServicio && campoEquipo) {
    const sync = () => campoEquipo.classList.toggle('oculto', selServicio.value !== 'alquiler');
    selServicio.addEventListener('change', sync);
    sync();
  }

  /* ---------- Validación en vivo del documento ---------- */
  const inDoc = $('#q-documento');
  const selDoc = $('#q-tipo-doc');
  if (inDoc && selDoc) {
    const err = $('[data-error="documento"]');
    const campo = inDoc.closest('.campo');
    const validar = async () => {
      if (!inDoc.value.trim()) return;
      try {
        const r = await fetch(`/api/validar-documento?tipo=${encodeURIComponent(selDoc.value)}&valor=${encodeURIComponent(inDoc.value)}`);
        const d = await r.json();
        if (d.ok) { err.textContent = ''; campo.classList.remove('has-error'); if (d.valor) inDoc.value = d.valor; }
        else { err.textContent = d.error; campo.classList.add('has-error'); }
      } catch (e) { /* sin red: se valida al enviar */ }
    };
    inDoc.addEventListener('blur', validar);
    selDoc.addEventListener('change', () => { inDoc.placeholder = selDoc.value === 'NIT' ? '900123456-7' : 'Número de documento'; validar(); });
  }

  /* ---------- Envío de formularios por fetch ---------- */
  $$('form[data-endpoint]').forEach((form) => {
    const aviso = $('[data-aviso]', form);
    const exito = $('[data-exito]', form.parentElement);
    const limpiarErrores = () => {
      $$('.campo', form).forEach((c) => c.classList.remove('has-error'));
      $$('.error', form).forEach((e) => (e.textContent = ''));
      if (aviso) { aviso.textContent = ''; aviso.classList.remove('is-visible'); }
    };
    const mostrarErrores = (errores) => {
      let primero = null;
      Object.entries(errores).forEach(([campo, msg]) => {
        const el = $(`[data-error="${campo}"]`, form);
        if (el) {
          el.textContent = msg;
          const wrap = el.closest('.campo');
          wrap && wrap.classList.add('has-error');
          if (!primero) primero = wrap;
        }
      });
      if (primero) {
        primero.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = $('input, select, textarea', primero);
        input && input.focus({ preventScroll: true });
      }
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      limpiarErrores();
      const datos = Object.fromEntries(new FormData(form).entries());
      datos.acepta_datos = $('input[name="acepta_datos"]', form)?.checked ? 'on' : '';
      const btn = $('button[type="submit"]', form);
      const textoBtn = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Enviando…';
      try {
        const r = await fetch(form.dataset.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(datos),
        });
        const d = await r.json().catch(() => ({}));
        if (r.ok && d.ok) {
          form.hidden = true;
          if (exito) {
            exito.classList.add('is-visible');
            const id = $('[data-exito-id]', exito);
            if (id) id.textContent = d.id ? `#${d.id}` : '';
            const wa = $('[data-exito-whatsapp]', exito);
            if (wa && d.whatsapp) wa.href = d.whatsapp;
            exito.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
        if (d.errores) mostrarErrores(d.errores);
        if (aviso) {
          aviso.textContent = d.error || (d.errores ? 'Revisa los campos marcados en rojo.' : 'No pudimos enviar tu solicitud. Intenta de nuevo.');
          aviso.classList.add('is-visible');
        }
      } catch (err) {
        if (aviso) { aviso.textContent = 'Sin conexión con el servidor. Intenta de nuevo o escríbenos por WhatsApp.'; aviso.classList.add('is-visible'); }
      } finally {
        btn.disabled = false;
        btn.innerHTML = textoBtn;
      }
    });
  });
})();

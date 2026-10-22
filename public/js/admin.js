/* Panel interno de solicitudes: consume /api/admin/* con el ADMIN_TOKEN */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const CLAVE = 'jeiggar-admin-token';

  const login = $('[data-admin-login]');
  const contenido = $('[data-admin-contenido]');
  const filtros = $('[data-admin-filtros]');
  const tabla = $('[data-tabla]');
  const kpis = $('[data-kpis]');
  const vacio = $('[data-vacio]');
  const aviso = $('[data-aviso]', login);

  let token = '';
  try { token = sessionStorage.getItem(CLAVE) || ''; } catch (e) {}

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const api = async (ruta, opciones = {}) => {
    const r = await fetch(`/api/admin${ruta}`, {
      ...opciones,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(opciones.headers || {}) },
    });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) throw Object.assign(new Error('No autorizado'), { auth: true });
    if (!r.ok) throw new Error(d.error || 'Error del servidor');
    return d;
  };

  const fecha = (iso) => new Date(iso).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' });
  const TIPOS = { cotizacion: 'Cotización', alquiler: 'Alquiler', contacto: 'Contacto' };
  const ESTADOS = { nuevo: 'Nuevo', en_proceso: 'En proceso', atendido: 'Atendido', descartado: 'Descartado' };

  const filtrosActuales = () => {
    const p = new URLSearchParams();
    $$('[data-filtro]', filtros).forEach((el) => { if (el.value) p.set(el.dataset.filtro, el.value); });
    return p;
  };

  async function cargar() {
    const [{ resumen }, { leads }] = await Promise.all([api('/resumen'), api(`/leads?${filtrosActuales()}`)]);
    kpis.innerHTML = [
      ['Total', resumen.total], ['Nuevos', resumen.nuevos], ['Últimos 7 días', resumen.ultimos_7_dias], ['Cotizaciones', resumen.cotizaciones],
    ].map(([k, v]) => `<div class="tarjeta kpi"><small>${k}</small><strong>${v ?? 0}</strong></div>`).join('');

    tabla.innerHTML = leads.map((l) => `
      <tr data-id="${l.id}">
        <td class="mono">#${l.id}</td>
        <td style="white-space:nowrap">${esc(fecha(l.creado_en))}</td>
        <td><span class="chip">${esc(TIPOS[l.tipo] || l.tipo)}</span></td>
        <td><strong>${esc(l.nombre)}</strong>${l.empresa ? `<br><span class="small">${esc(l.empresa)}</span>` : ''}${l.ciudad ? `<br><span class="small">${esc(l.ciudad)}</span>` : ''}</td>
        <td class="mono">${l.documento ? `${esc(l.tipo_documento)} ${esc(l.documento)}` : '—'}</td>
        <td><a href="mailto:${esc(l.correo)}">${esc(l.correo)}</a><br><a href="https://wa.me/${esc(String(l.telefono).replace(/\D/g, ''))}" target="_blank" rel="noopener">${esc(l.telefono)}</a></td>
        <td>${esc(l.servicio || '—')}${l.equipo ? `<br><span class="small">${esc(l.equipo)}</span>` : ''}</td>
        <td class="mensaje">${esc(l.mensaje || '—')}${l.notas ? `<br><em class="small">Nota: ${esc(l.notas)}</em>` : ''}</td>
        <td>
          <select data-estado aria-label="Estado">
            ${Object.entries(ESTADOS).map(([v, t]) => `<option value="${v}" ${v === l.estado ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </td>
        <td style="white-space:nowrap">
          <button class="btn btn--texto btn--sm" type="button" data-nota title="Agregar nota">Nota</button>
          <button class="btn btn--texto btn--sm" type="button" data-eliminar title="Eliminar">✕</button>
        </td>
      </tr>`).join('');
    vacio.hidden = leads.length > 0;
  }

  function mostrarPanel() {
    login.hidden = true;
    contenido.hidden = false;
    filtros.hidden = false;
    $('[data-exportar]').href = `/api/admin/leads.csv?token=${encodeURIComponent(token)}&${filtrosActuales()}`;
  }

  function cerrarSesion() {
    token = '';
    try { sessionStorage.removeItem(CLAVE); } catch (e) {}
    login.hidden = false; contenido.hidden = true; filtros.hidden = true;
  }

  login.addEventListener('submit', async (e) => {
    e.preventDefault();
    token = $('#admin-token').value.trim();
    aviso.classList.remove('is-visible');
    try {
      await api('/resumen');
      try { sessionStorage.setItem(CLAVE, token); } catch (err) {}
      mostrarPanel();
      await cargar();
    } catch (err) {
      aviso.textContent = err.auth ? 'Token incorrecto.' : err.message;
      aviso.classList.add('is-visible');
    }
  });

  $$('[data-filtro]', filtros).forEach((el) => {
    let t;
    el.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { mostrarPanel(); cargar().catch(manejar); }, 250); });
  });
  $('[data-salir]').addEventListener('click', cerrarSesion);

  tabla.addEventListener('change', async (e) => {
    const sel = e.target.closest('[data-estado]');
    if (!sel) return;
    const id = sel.closest('tr').dataset.id;
    try { await api(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify({ estado: sel.value }) }); await cargar(); } catch (err) { manejar(err); }
  });
  tabla.addEventListener('click', async (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const id = tr.dataset.id;
    if (e.target.closest('[data-nota]')) {
      const notas = prompt('Nota interna para esta solicitud:');
      if (notas === null) return;
      try { await api(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify({ notas }) }); await cargar(); } catch (err) { manejar(err); }
    }
    if (e.target.closest('[data-eliminar]')) {
      if (!confirm(`¿Eliminar definitivamente la solicitud #${id}?`)) return;
      try { await api(`/leads/${id}`, { method: 'DELETE' }); await cargar(); } catch (err) { manejar(err); }
    }
  });

  function manejar(err) {
    if (err.auth) { cerrarSesion(); aviso.textContent = 'La sesión expiró. Ingresa el token de nuevo.'; aviso.classList.add('is-visible'); }
    else alert(err.message);
  }

  if (token) { mostrarPanel(); cargar().catch(manejar); }
})();

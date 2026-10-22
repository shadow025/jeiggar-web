const express = require('express');
const db = require('../db');
const { validarLead } = require('../validators');
const site = require('../../data/site');

const router = express.Router();

// ---------- Límite de peticiones simple en memoria (por IP) ----------
const ventanas = new Map();
function limitar(maxPorVentana = 10, ventanaMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const ahora = Date.now();
    const clave = req.ip;
    const w = ventanas.get(clave) || { inicio: ahora, n: 0 };
    if (ahora - w.inicio > ventanaMs) { w.inicio = ahora; w.n = 0; }
    w.n += 1;
    ventanas.set(clave, w);
    if (w.n > maxPorVentana) {
      return res.status(429).json({ ok: false, error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' });
    }
    next();
  };
}
setInterval(() => {
  const limite = Date.now() - 60 * 60 * 1000;
  for (const [k, w] of ventanas) if (w.inicio < limite) ventanas.delete(k);
}, 10 * 60 * 1000).unref();

// ---------- Autenticación del panel (token en .env) ----------
function requiereAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return res.status(503).json({ ok: false, error: 'ADMIN_TOKEN no está configurado en el servidor (.env).' });
  const auth = req.get('authorization') || '';
  const dado = auth.startsWith('Bearer ') ? auth.slice(7) : req.query.token;
  if (dado !== token) return res.status(401).json({ ok: false, error: 'No autorizado.' });
  next();
}

function registrar(tipoForzado, requiereDocumento) {
  return (req, res) => {
    const body = { ...req.body, tipo: tipoForzado };
    const r = validarLead(body, { opcionesServicio: site.opcionesServicio, requiereDocumento });
    if (!r.ok) {
      if (r.errores._spam) return res.status(202).json({ ok: true, id: null }); // silencio para bots
      return res.status(422).json({ ok: false, errores: r.errores });
    }
    if (db.recientesPorCorreo(r.datos.correo) >= 3) {
      return res.status(429).json({ ok: false, error: 'Ya recibimos varias solicitudes con este correo. Te contactaremos pronto.' });
    }
    const lead = db.crearLead({
      ...r.datos,
      ip: req.ip,
      user_agent: (req.get('user-agent') || '').slice(0, 300),
    });
    const servicio = site.opcionesServicio.find((o) => o.valor === lead.servicio);
    const partes = [
      `Hola JEIGGAR, soy ${lead.nombre}.`,
      lead.tipo === 'alquiler' && lead.equipo ? `Quiero alquilar: ${lead.equipo}.` : null,
      lead.tipo === 'cotizacion' ? `Solicito una cotización de ${servicio ? servicio.etiqueta : 'sus servicios'}.` : null,
      `Mi solicitud quedó registrada con el número #${lead.id}.`,
    ].filter(Boolean);
    res.status(201).json({
      ok: true,
      id: lead.id,
      whatsapp: `${site.empresa.whatsappHref}?text=${encodeURIComponent(partes.join(' '))}`,
    });
  };
}

router.post('/cotizaciones', limitar(), registrar('cotizacion', true));
router.post('/alquiler', limitar(), registrar('alquiler', false));
router.post('/contacto', limitar(), registrar('contacto', false));

// Validación en vivo de documento (la usa el formulario al salir del campo)
router.get('/validar-documento', (req, res) => {
  const { validarDocumento } = require('../validators');
  const r = validarDocumento(String(req.query.tipo || '').toUpperCase(), req.query.valor);
  res.json(r.ok ? { ok: true, valor: r.valor } : { ok: false, error: r.error });
});

// ---------- Panel de administración ----------
router.get('/admin/resumen', requiereAdmin, (req, res) => res.json({ ok: true, resumen: db.resumen() }));

router.get('/admin/leads', requiereAdmin, (req, res) => {
  const { tipo, estado, q, limite, desde } = req.query;
  res.json({ ok: true, leads: db.listarLeads({ tipo, estado, q, limite, desde }) });
});

router.get('/admin/leads.csv', requiereAdmin, (req, res) => {
  const filas = db.listarLeads({ ...req.query, limite: 1000 });
  const cols = ['id', 'creado_en', 'tipo', 'estado', 'nombre', 'tipo_documento', 'documento', 'correo', 'telefono', 'empresa', 'ciudad', 'servicio', 'equipo', 'mensaje', 'notas', 'origen'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [cols.join(','), ...filas.map((f) => cols.map((c) => esc(f[c])).join(','))].join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="jeiggar-solicitudes-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send('﻿' + csv);
});

router.get('/admin/leads/:id', requiereAdmin, (req, res) => {
  const lead = db.obtenerLead(Number(req.params.id));
  if (!lead) return res.status(404).json({ ok: false, error: 'No existe.' });
  res.json({ ok: true, lead });
});

router.patch('/admin/leads/:id', requiereAdmin, (req, res) => {
  const estados = ['nuevo', 'en_proceso', 'atendido', 'descartado'];
  const { estado, notas } = req.body || {};
  if (estado && !estados.includes(estado)) return res.status(422).json({ ok: false, error: 'Estado no válido.' });
  const actual = db.obtenerLead(Number(req.params.id));
  if (!actual) return res.status(404).json({ ok: false, error: 'No existe.' });
  const lead = db.actualizarEstado(actual.id, estado || actual.estado, typeof notas === 'string' ? notas.slice(0, 2000) : null);
  res.json({ ok: true, lead });
});

router.delete('/admin/leads/:id', requiereAdmin, (req, res) => {
  const n = db.eliminarLead(Number(req.params.id));
  if (!n) return res.status(404).json({ ok: false, error: 'No existe.' });
  res.json({ ok: true });
});

module.exports = router;

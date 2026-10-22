// Validación y normalización de los datos que llegan desde los formularios.
// Reglas pensadas para Colombia: cédula (CC), cédula de extranjería (CE), NIT y pasaporte.

const TIPOS_DOC = ['CC', 'CE', 'NIT', 'PAS'];
const TIPOS_LEAD = ['cotizacion', 'contacto', 'alquiler'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const limpiar = (v, max = 500) =>
  typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '';

const soloDigitos = (v) => String(v || '').replace(/\D/g, '');

/** Dígito de verificación del NIT según la DIAN. */
function digitoVerificacionNIT(nit) {
  const pesos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let suma = 0;
  const d = nit.split('').reverse();
  for (let i = 0; i < d.length; i++) suma += Number(d[i]) * pesos[i];
  const r = suma % 11;
  return r > 1 ? 11 - r : r;
}

function validarDocumento(tipo, valor) {
  const v = limpiar(valor, 30);
  if (!tipo && !v) return { ok: true, valor: null, tipo: null };
  if (!TIPOS_DOC.includes(tipo)) return { ok: false, error: 'Tipo de documento no válido.' };
  if (!v) return { ok: false, error: 'Ingresa el número de documento.' };

  if (tipo === 'CC') {
    const d = soloDigitos(v);
    if (d.length < 6 || d.length > 10) return { ok: false, error: 'La cédula debe tener entre 6 y 10 dígitos.' };
    return { ok: true, valor: d, tipo };
  }
  if (tipo === 'CE') {
    const d = v.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
    if (d.length < 6 || d.length > 12) return { ok: false, error: 'La cédula de extranjería debe tener entre 6 y 12 caracteres.' };
    return { ok: true, valor: d, tipo };
  }
  if (tipo === 'NIT') {
    // Acepta "900123456-7", "900123456" o "9001234567"
    const m = v.replace(/\./g, '').match(/^(\d{9,10})(?:\s*-\s*(\d))?$/);
    if (!m) return { ok: false, error: 'El NIT debe tener 9 dígitos y opcionalmente el dígito de verificación (ej. 900123456-7).' };
    let base = m[1];
    let dv = m[2];
    if (!dv && base.length === 10) { dv = base.slice(9); base = base.slice(0, 9); }
    if (dv !== undefined && Number(dv) !== digitoVerificacionNIT(base)) {
      return { ok: false, error: 'El dígito de verificación del NIT no coincide.' };
    }
    return { ok: true, valor: dv !== undefined ? `${base}-${dv}` : base, tipo };
  }
  // Pasaporte
  const p = v.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
  if (p.length < 5 || p.length > 12) return { ok: false, error: 'El pasaporte debe tener entre 5 y 12 caracteres.' };
  return { ok: true, valor: p, tipo };
}

function validarTelefono(valor) {
  const d = soloDigitos(valor);
  // Celular colombiano: 10 dígitos iniciando en 3. Fijo: 7 u 8 dígitos (con indicativo 10). Con +57: 12.
  let n = d;
  if (n.startsWith('57') && n.length === 12) n = n.slice(2);
  if (n.length === 10 && n.startsWith('3')) return { ok: true, valor: `+57${n}` };
  if (n.length === 10 && n.startsWith('60')) return { ok: true, valor: `+57${n}` };
  if (n.length >= 7 && n.length <= 8) return { ok: true, valor: n };
  if (n.length >= 10 && n.length <= 15) return { ok: true, valor: `+${n}` }; // internacional
  return { ok: false, error: 'Ingresa un teléfono o WhatsApp válido (ej. 301 665 1308).' };
}

/**
 * Valida el cuerpo de una solicitud de cotización / contacto / alquiler.
 * Devuelve { ok, datos } o { ok:false, errores:{campo:mensaje} }.
 */
function validarLead(body = {}, { opcionesServicio = [], requiereDocumento = false } = {}) {
  const errores = {};
  const tipo = TIPOS_LEAD.includes(body.tipo) ? body.tipo : 'cotizacion';

  // Honeypot: los bots suelen rellenar todos los campos
  if (limpiar(body.sitio_web)) return { ok: false, errores: { _spam: 'Solicitud rechazada.' } };

  const nombre = limpiar(body.nombre, 120);
  if (nombre.length < 3) errores.nombre = 'Ingresa tu nombre completo.';
  else if (!/^[\p{L}\p{M}'.\- ]+$/u.test(nombre)) errores.nombre = 'El nombre solo puede tener letras.';

  const correo = limpiar(body.correo, 160).toLowerCase();
  if (!EMAIL_RE.test(correo)) errores.correo = 'Ingresa un correo electrónico válido.';

  const tel = validarTelefono(body.telefono);
  if (!tel.ok) errores.telefono = tel.error;

  const tipoDoc = limpiar(body.tipo_documento, 5).toUpperCase() || null;
  const doc = validarDocumento(tipoDoc, body.documento);
  if (!doc.ok) errores.documento = doc.error;
  else if (requiereDocumento && !doc.valor) errores.documento = 'El documento es obligatorio para cotizar.';

  const servicio = limpiar(body.servicio, 80);
  if (tipo !== 'contacto') {
    const valido = opcionesServicio.length === 0 || opcionesServicio.some((o) => o.valor === servicio);
    if (!servicio || !valido) errores.servicio = 'Selecciona el servicio que te interesa.';
  }

  const mensaje = limpiar(body.mensaje, 2000);
  if (tipo === 'contacto' && mensaje.length < 10) errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';

  const aceptaDatos = body.acepta_datos === true || body.acepta_datos === 'on' || body.acepta_datos === '1' || body.acepta_datos === 'true';
  if (!aceptaDatos) errores.acepta_datos = 'Debes autorizar el tratamiento de tus datos personales.';

  if (Object.keys(errores).length) return { ok: false, errores };

  return {
    ok: true,
    datos: {
      tipo,
      nombre,
      correo,
      telefono: tel.valor,
      tipo_documento: doc.valor ? doc.tipo : null,
      documento: doc.valor,
      empresa: limpiar(body.empresa, 120) || null,
      ciudad: limpiar(body.ciudad, 80) || null,
      servicio: servicio || null,
      equipo: limpiar(body.equipo, 120) || null,
      mensaje: mensaje || null,
      acepta_datos: true,
      origen: limpiar(body.origen, 200) || null,
    },
  };
}

module.exports = { validarLead, validarDocumento, validarTelefono, digitoVerificacionNIT, TIPOS_DOC, TIPOS_LEAD };

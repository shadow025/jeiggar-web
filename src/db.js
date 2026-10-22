// Base de datos SQLite usando el módulo nativo de Node (node:sqlite, Node >= 22.13).
// Sin dependencias nativas de terceros: funciona en Windows, Linux y macOS.
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'jeiggar.db');
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo            TEXT    NOT NULL CHECK (tipo IN ('cotizacion', 'contacto', 'alquiler')),
    nombre          TEXT    NOT NULL,
    tipo_documento  TEXT,
    documento       TEXT,
    correo          TEXT    NOT NULL,
    telefono        TEXT    NOT NULL,
    empresa         TEXT,
    ciudad          TEXT,
    servicio        TEXT,
    equipo          TEXT,
    mensaje         TEXT,
    acepta_datos    INTEGER NOT NULL DEFAULT 0,
    origen          TEXT,
    ip              TEXT,
    user_agent      TEXT,
    estado          TEXT    NOT NULL DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'en_proceso', 'atendido', 'descartado')),
    notas           TEXT,
    creado_en       TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    actualizado_en  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  );
  CREATE INDEX IF NOT EXISTS idx_leads_creado ON leads (creado_en DESC);
  CREATE INDEX IF NOT EXISTS idx_leads_estado ON leads (estado);
  CREATE INDEX IF NOT EXISTS idx_leads_correo ON leads (correo);
  CREATE INDEX IF NOT EXISTS idx_leads_documento ON leads (documento);
`);

const stmts = {
  insertar: db.prepare(`
    INSERT INTO leads (tipo, nombre, tipo_documento, documento, correo, telefono, empresa, ciudad,
                       servicio, equipo, mensaje, acepta_datos, origen, ip, user_agent)
    VALUES (@tipo, @nombre, @tipo_documento, @documento, @correo, @telefono, @empresa, @ciudad,
            @servicio, @equipo, @mensaje, @acepta_datos, @origen, @ip, @user_agent)
  `),
  porId: db.prepare('SELECT * FROM leads WHERE id = ?'),
  actualizarEstado: db.prepare(`
    UPDATE leads SET estado = @estado, notas = COALESCE(@notas, notas),
                     actualizado_en = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
    WHERE id = @id
  `),
  eliminar: db.prepare('DELETE FROM leads WHERE id = ?'),
  resumen: db.prepare(`
    SELECT
      COUNT(*)                                                AS total,
      SUM(estado = 'nuevo')                                   AS nuevos,
      SUM(estado = 'en_proceso')                              AS en_proceso,
      SUM(estado = 'atendido')                                AS atendidos,
      SUM(tipo = 'cotizacion')                                AS cotizaciones,
      SUM(tipo = 'alquiler')                                  AS alquileres,
      SUM(tipo = 'contacto')                                  AS contactos,
      SUM(creado_en >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-7 days')) AS ultimos_7_dias
    FROM leads
  `),
  // Para detectar envíos repetidos del mismo correo en poco tiempo
  recientesPorCorreo: db.prepare(`
    SELECT COUNT(*) AS n FROM leads
    WHERE correo = ? AND creado_en >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-10 minutes')
  `),
};

function crearLead(datos) {
  const r = stmts.insertar.run({
    tipo: datos.tipo,
    nombre: datos.nombre,
    tipo_documento: datos.tipo_documento ?? null,
    documento: datos.documento ?? null,
    correo: datos.correo,
    telefono: datos.telefono,
    empresa: datos.empresa ?? null,
    ciudad: datos.ciudad ?? null,
    servicio: datos.servicio ?? null,
    equipo: datos.equipo ?? null,
    mensaje: datos.mensaje ?? null,
    acepta_datos: datos.acepta_datos ? 1 : 0,
    origen: datos.origen ?? null,
    ip: datos.ip ?? null,
    user_agent: datos.user_agent ?? null,
  });
  return stmts.porId.get(Number(r.lastInsertRowid));
}

function listarLeads({ tipo, estado, q, limite = 200, desde = 0 } = {}) {
  const cond = [];
  const params = [];
  if (tipo) { cond.push('tipo = ?'); params.push(tipo); }
  if (estado) { cond.push('estado = ?'); params.push(estado); }
  if (q) {
    cond.push('(nombre LIKE ? OR correo LIKE ? OR documento LIKE ? OR telefono LIKE ? OR empresa LIKE ?)');
    const like = `%${q}%`;
    params.push(like, like, like, like, like);
  }
  const where = cond.length ? `WHERE ${cond.join(' AND ')}` : '';
  const sql = `SELECT * FROM leads ${where} ORDER BY creado_en DESC LIMIT ? OFFSET ?`;
  params.push(Math.min(Number(limite) || 200, 1000), Number(desde) || 0);
  return db.prepare(sql).all(...params);
}

function actualizarEstado(id, estado, notas) {
  stmts.actualizarEstado.run({ id, estado, notas: notas ?? null });
  return stmts.porId.get(id);
}

module.exports = {
  db,
  crearLead,
  listarLeads,
  actualizarEstado,
  obtenerLead: (id) => stmts.porId.get(id),
  eliminarLead: (id) => stmts.eliminar.run(id).changes,
  resumen: () => stmts.resumen.get(),
  recientesPorCorreo: (correo) => stmts.recientesPorCorreo.get(correo).n,
};

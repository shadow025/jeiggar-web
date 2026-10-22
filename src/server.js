require('./env');
const path = require('node:path');
const express = require('express');
const site = require('../data/site');
const api = require('./routes/api');
const { icono } = require('./icons');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const VERSION = String(Date.now()); // versiona CSS/JS para invalidar caché en cada arranque

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.set('trust proxy', process.env.TRUST_PROXY === '1');
app.disable('x-powered-by');

app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));
app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: '7d', etag: true }));

// Cabeceras de seguridad básicas
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Datos comunes para todas las vistas
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.empresa = site.empresa;
  res.locals.ruta = req.path;
  res.locals.icono = icono;
  res.locals.v = VERSION;
  res.locals.titulo = site.empresa.nombreLargo;
  res.locals.descripcion = site.empresa.lema;
  next();
});

// ---------- Páginas ----------
app.get('/', (req, res) => {
  res.render('index', { titulo: `Inicio - ${site.empresa.nombreLargo}`, pagina: site.inicio });
});

app.get('/quienes-somos', (req, res) => {
  res.render('quienes-somos', { titulo: `Quiénes Somos - ${site.empresa.nombreLargo}`, pagina: site.quienesSomos });
});

app.get('/alquiler', (req, res) => {
  res.render('alquiler', { titulo: `Alquiler de Herramientas - ${site.empresa.nombreLargo}`, pagina: site.alquiler });
});

app.get('/proyectos', (req, res) => {
  res.render('proyectos', { titulo: `Proyectos - ${site.empresa.nombreLargo}`, pagina: site.proyectos });
});

app.get('/servicios', (req, res) => {
  res.render('servicios', { titulo: `Servicios - ${site.empresa.nombreLargo}` });
});

app.get('/servicios/disenos', (req, res) => {
  res.render('disenos', { titulo: `${site.empresa.nombreLargo} - Diseños`, pagina: site.disenos });
});

app.get('/servicios/:slug', (req, res, next) => {
  const servicio = site.getServicio(req.params.slug);
  if (!servicio || servicio.plantilla === 'disenos') return next();
  res.render('servicio', { titulo: `${servicio.nombre} - ${site.empresa.nombreLargo}`, descripcion: servicio.lema, servicio });
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { titulo: `Contacto - ${site.empresa.nombreLargo}`, pagina: site.contacto });
});

app.get('/cotizar', (req, res) => {
  const servicio = site.opcionesServicio.some((o) => o.valor === req.query.servicio) ? req.query.servicio : '';
  const equipo = site.alquiler.herramientas.some((h) => h.nombre === req.query.equipo) ? req.query.equipo : '';
  res.render('cotizar', {
    titulo: `Solicitar cotización - ${site.empresa.nombreLargo}`,
    descripcion: 'Cuéntanos sobre tu proyecto y te enviamos una cotización personalizada.',
    preseleccion: { servicio: equipo ? 'alquiler' : servicio, equipo },
  });
});

app.get('/politica-de-privacidad', (req, res) => res.render('legal', { titulo: `Política de Privacidad - ${site.empresa.nombreLargo}`, tipo: 'privacidad' }));
app.get('/terminos-y-condiciones', (req, res) => res.render('legal', { titulo: `Términos y Condiciones - ${site.empresa.nombreLargo}`, tipo: 'terminos' }));

app.get('/admin', (req, res) => res.render('admin', { titulo: `Panel de solicitudes - ${site.empresa.nombre}` }));

// Rutas antiguas del sitio actual (jeiggar.co) → nuevas
const redirecciones = {
  '/index.php': '/', '/index.html': '/', '/quienes_somos.php': '/quienes-somos', '/alquiler.php': '/alquiler',
  '/proyectos.php': '/proyectos', '/disenos.php': '/servicios/disenos', '/consultoria.php': '/servicios/consultoria',
  '/interventoria.php': '/servicios/interventoria', '/remodelacion_edificaciones.php': '/servicios/remodelacion-de-edificaciones',
  '/movimiento_tierras.php': '/servicios/movimiento-de-tierras', '/actas_vecindad.php': '/servicios/elaboracion-de-actas-de-vecindad',
  '/adaptacion_contenedores.php': '/servicios/adaptacion-de-contenedores', '/elaboracion_presupuestos.php': '/servicios/elaboracion-de-presupuestos',
  '/administracion_obras.php': '/servicios/administracion-y-construccion-de-obras', '/contacto.php': '/contacto',
};
for (const [desde, hacia] of Object.entries(redirecciones)) app.get(desde, (req, res) => res.redirect(301, hacia));

// ---------- API ----------
app.use('/api', api);
app.get('/api/salud', (req, res) => res.json({ ok: true, hora: new Date().toISOString() }));

// ---------- 404 / errores ----------
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ ok: false, error: 'Ruta no encontrada.' });
  res.status(404).render('404', { titulo: `Página no encontrada - ${site.empresa.nombre}` });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === 'entity.parse.failed') return res.status(400).json({ ok: false, error: 'JSON inválido.' });
  if (req.path.startsWith('/api/')) return res.status(500).json({ ok: false, error: 'Error interno.' });
  res.status(500).render('404', { titulo: 'Error', error: true });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`JEIGGAR web escuchando en http://localhost:${PORT}`);
    if (!process.env.ADMIN_TOKEN) console.warn('Aviso: ADMIN_TOKEN no definido; el panel /admin no podrá autenticarse. Copia .env.example a .env.');
  });
}

module.exports = app;

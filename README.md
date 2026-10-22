# JEIGGAR · Sitio web 2026

Implementación en código del diseño de Figma **"JEIGGAR · Rediseño sitio web 2026"**
(14 pantallas de escritorio + versión móvil) con un backend para recolectar
solicitudes de **cotización, contacto y alquiler** (nombre, cédula/NIT, correo, teléfono, servicio, mensaje).

## Stack

| Capa | Tecnología |
| --- | --- |
| Servidor y API | Node.js 22+ · Express 5 |
| Vistas | EJS (plantillas server-side) + CSS propio con los tokens del sistema de diseño |
| Base de datos | SQLite mediante `node:sqlite` (incluido en Node, sin compilar nada) |
| Imágenes | Fotografías de stock de Unsplash (hotlink) + íconos SVG exportados de Figma |

Sin frameworks de frontend ni dependencias nativas: `npm install` solo trae `express` y `ejs`.

## Arrancar

```bash
npm install
cp .env.example .env     # y cambia ADMIN_TOKEN
npm run dev              # http://localhost:3000  (recarga al guardar)
```

`npm start` para producción. La base de datos se crea sola en `data/jeiggar.db`.

## Rutas

| Página | Ruta |
| --- | --- |
| Inicio | `/` |
| ¿Quiénes Somos? | `/quienes-somos` |
| Alquiler de equipos (buscador + WhatsApp por equipo) | `/alquiler` |
| Proyectos (selector Antes / Después) | `/proyectos` |
| Índice de servicios | `/servicios` |
| Diseños | `/servicios/disenos` |
| Servicios (plantilla) | `/servicios/consultoria`, `/servicios/interventoria`, `/servicios/remodelacion-de-edificaciones`, `/servicios/movimiento-de-tierras`, `/servicios/elaboracion-de-actas-de-vecindad`, `/servicios/adaptacion-de-contenedores`, `/servicios/elaboracion-de-presupuestos`, `/servicios/administracion-y-construccion-de-obras` |
| Contacto (canales + mapa + formulario) | `/contacto` |
| **Solicitar cotización** (formulario principal) | `/cotizar` · acepta `?servicio=slug` y `?equipo=Nombre` |
| Política de privacidad / Términos | `/politica-de-privacidad`, `/terminos-y-condiciones` |
| **Panel interno de solicitudes** | `/admin` (pide el `ADMIN_TOKEN`) |

Las URL del sitio actual (`consultoria.php`, `alquiler.php`, …) redirigen con 301 a las nuevas.

## API

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/api/cotizaciones` | Registra una cotización. Documento obligatorio. |
| `POST` | `/api/alquiler` | Solicitud de alquiler (campo `equipo`). |
| `POST` | `/api/contacto` | Mensaje de contacto (mensaje obligatorio). |
| `GET` | `/api/validar-documento?tipo=CC&valor=…` | Validación en vivo de cédula / NIT. |
| `GET` | `/api/admin/resumen` | KPIs. Requiere `Authorization: Bearer <ADMIN_TOKEN>`. |
| `GET` | `/api/admin/leads?tipo=&estado=&q=` | Lista de solicitudes. |
| `GET` | `/api/admin/leads.csv` | Exportación CSV. |
| `PATCH` | `/api/admin/leads/:id` | Cambia `estado` (`nuevo`, `en_proceso`, `atendido`, `descartado`) o `notas`. |
| `DELETE` | `/api/admin/leads/:id` | Elimina una solicitud. |

Cuerpo de un `POST` (JSON o formulario):

```json
{
  "nombre": "Ana Pérez",
  "tipo_documento": "CC",
  "documento": "1090123456",
  "correo": "ana@correo.com",
  "telefono": "301 665 1308",
  "servicio": "consultoria",
  "ciudad": "Cúcuta",
  "mensaje": "Necesito asesoría para una vivienda de 2 pisos",
  "acepta_datos": true
}
```

Respuesta `201`: `{ "ok": true, "id": 12, "whatsapp": "https://wa.me/573054807054?text=…" }`.
Errores de validación: `422` con `{ "ok": false, "errores": { "documento": "…" } }`.

### Validaciones
- **Cédula (CC)**: 6 a 10 dígitos. **CE**: 6 a 12 caracteres. **Pasaporte**: 5 a 12.
- **NIT**: 9 dígitos + dígito de verificación opcional, que se comprueba con el algoritmo de la DIAN.
- **Teléfono**: celular colombiano (10 dígitos iniciando en 3), fijo o internacional; se normaliza a `+57…`.
- **Habeas data**: el checkbox `acepta_datos` es obligatorio (Ley 1581 de 2012).
- Honeypot anti-bots, límite de 10 envíos por IP cada 15 min y máximo 3 envíos por correo cada 10 min.

## Estructura

```
data/site.js        Todo el contenido (textos del sitio actual, imágenes, servicios, herramientas)
src/server.js       Express: páginas, redirecciones, API, errores
src/routes/api.js   Endpoints públicos y de administración
src/validators.js   Reglas de validación (cédula, NIT, teléfono, correo…)
src/db.js           SQLite (node:sqlite): tabla leads y consultas
src/icons.js        Carga los SVG de Figma para incrustarlos en las vistas
views/              Plantillas EJS (partials: head, header, footer, cta, hero-interno)
public/css          styles.css con los tokens del sistema de diseño y modo oscuro
public/js           main.js (menús, tema, buscador, antes/después, formularios) · admin.js
public/img/icons    50 íconos del sistema de diseño exportados desde Figma
```

## Pendientes que debe confirmar el equipo (según las notas de Figma)
- Reemplazar las fotos de stock por las fotografías y videos reales de la empresa, y el logo provisional "J" por el vectorial oficial.
- Confirmar el teléfono oficial (el pie dice +57 301 665 1308 y el WhatsApp enlaza a +57 305 480 7054).
- Logos de aliados (hoy se muestran iniciales).
- Textos de proyectos "Las Palmas", "El Solar" y "Las Acacias".

// Carga de variables de entorno desde .env sin dependencias (Node >= 20.12 trae process.loadEnvFile).
const path = require('node:path');
const fs = require('node:fs');

const archivo = path.join(__dirname, '..', '.env');
if (fs.existsSync(archivo)) {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(archivo);
  } else {
    for (const linea of fs.readFileSync(archivo, 'utf8').split(/\r?\n/)) {
      const m = linea.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

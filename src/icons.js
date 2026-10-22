// Carga los íconos SVG del sistema de diseño (public/img/icons) y los expone como
// helper `icono(nombre, atributos)` para incrustarlos inline en las vistas EJS.
const fs = require('node:fs');
const path = require('node:path');

const DIR = path.join(__dirname, '..', 'public', 'img', 'icons');
const cache = new Map();

for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.svg')) continue;
  const svg = fs.readFileSync(path.join(DIR, f), 'utf8').replace(/\r?\n/g, '').trim();
  cache.set(f.replace(/\.svg$/, ''), svg);
}

/**
 * Devuelve el SVG inline del ícono. `size` en px; `className` opcional.
 * Si el ícono no existe devuelve un cuadro vacío para no romper el layout.
 */
function icono(nombre, { size = 20, className = '' } = {}) {
  const svg = cache.get(nombre);
  if (!svg) return `<span class="icono icono--vacio ${className}" style="width:${size}px;height:${size}px" aria-hidden="true"></span>`;
  return svg
    .replace(/<svg /, `<svg class="icono ${className}" aria-hidden="true" focusable="false" `)
    .replace(/width="24" height="24"/, `width="${size}" height="${size}"`);
}

module.exports = { icono, nombres: () => [...cache.keys()] };

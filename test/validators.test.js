const test = require('node:test');
const assert = require('node:assert/strict');
const { validarDocumento, validarTelefono, validarLead, digitoVerificacionNIT } = require('../src/validators');

test('cédula válida e inválida', () => {
  assert.equal(validarDocumento('CC', '1.090.123.456').ok, true);
  assert.equal(validarDocumento('CC', '1090123456').valor, '1090123456');
  assert.equal(validarDocumento('CC', '12345').ok, false);
  assert.equal(validarDocumento('CC', '12345678901').ok, false);
});

test('NIT con dígito de verificación', () => {
  assert.equal(digitoVerificacionNIT('890903938'), 8);
  assert.equal(validarDocumento('NIT', '890903938-8').ok, true);
  assert.equal(validarDocumento('NIT', '890903938-7').ok, false);
  assert.equal(validarDocumento('NIT', '890903938').valor, '890903938');
});

test('teléfonos colombianos', () => {
  assert.equal(validarTelefono('301 665 1308').valor, '+573016651308');
  assert.equal(validarTelefono('+57 305 480 7054').valor, '+573054807054');
  assert.equal(validarTelefono('5712345').ok, true);
  assert.equal(validarTelefono('12').ok, false);
});

test('lead de cotización completo', () => {
  const r = validarLead({
    nombre: 'Ana Pérez', tipo_documento: 'CC', documento: '1090123456', correo: 'ANA@correo.com',
    telefono: '3016651308', servicio: 'consultoria', acepta_datos: 'on', mensaje: 'Hola',
  }, { opcionesServicio: [{ valor: 'consultoria' }], requiereDocumento: true });
  assert.equal(r.ok, true);
  assert.equal(r.datos.correo, 'ana@correo.com');
  assert.equal(r.datos.telefono, '+573016651308');
});

test('lead sin autorización de datos falla', () => {
  const r = validarLead({ nombre: 'Ana Pérez', correo: 'a@b.co', telefono: '3016651308', servicio: 'x', tipo: 'contacto', mensaje: 'Un mensaje largo' });
  assert.equal(r.ok, false);
  assert.ok(r.errores.acepta_datos);
});

test('honeypot rechaza bots', () => {
  const r = validarLead({ nombre: 'Bot', sitio_web: 'http://spam', correo: 'a@b.co', telefono: '3016651308', acepta_datos: 'on' });
  assert.equal(r.ok, false);
  assert.ok(r.errores._spam);
});

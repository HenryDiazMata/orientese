import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// OBTENCIÓN DE LA RUTA ABSOLUTA DEL ARCHIVO EN ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RUTAS BASE DEL PROYECTO
const rutaPublic = path.join(__dirname, 'public');
const rutaBase = path.join(rutaPublic, 'subdominios', 'fundaval.orientese.com', 'publicaciones');
const rutaSalida = path.join(__dirname, 'src', 'data', 'fundavalData.json');

// LIMPIEZA DE ETIQUETAS HTML Y CARACTERES DE FRONTPAGE
function limpiarTextoHTML(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&aacute;/gi, 'á').replace(/&eacute;/gi, 'é').replace(/&iacute;/gi, 'í').replace(/&oacute;/gi, 'ó').replace(/&uacute;/gi, 'ú').replace(/&ntilde;/gi, 'ñ')
    .replace(/&Aacute;/gi, 'Á').replace(/&Eacute;/gi, 'É').replace(/&Iacute;/gi, 'Í').replace(/&Oacute;/gi, 'Ó').replace(/&Uacute;/gi, 'Ú').replace(/&Ntilde;/gi, 'Ñ')
    .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// LECTURA DE ARCHIVOS HTML CON SOPORTE PARA LATIN1 / UTF8
function leerArchivoConCodificacionCorrecta(rutaAbsoluta) {
  const buffer = fs.readFileSync(rutaAbsoluta);
  const textoPrueba = buffer.toString('binary');
  const esUtf8 = textoPrueba.includes('charset=utf-8') || textoPrueba.includes('charset=UTF-8');
  return buffer.toString(esUtf8 ? 'utf-8' : 'latin1');
}

// ESCANEO RECURSIVO DE DIRECTORIOS Y CONSTRUCCIÓN DE RUTAS PÚBLICAS LIMPIAS
function escanearDirectorio(dir, lista = []) {
  if (!fs.existsSync(dir)) return lista;

  const archivos = fs.readdirSync(dir);

  archivos.forEach(archivo => {
    const rutaAbsoluta = path.join(dir, archivo);
    const stat = fs.statSync(rutaAbsoluta);

    if (stat.isDirectory()) {
      escanearDirectorio(rutaAbsoluta, lista);
    } else {
      const ext = path.extname(archivo).toLowerCase();
      const lote = dir.includes('1er_lote') ? '1er Lote' : dir.includes('2do_lote') ? '2do Lote' : 'General / Raíz';
      const tituloLimpio = path.basename(archivo, ext).replace(/[-_]/g, ' ');

      // CONVIERTE LA RUTA ABSOLUTA EN RUTA PÚBLICA DESDE LA CARPETA PUBLIC
      // CORRIGE BARRAS INVERTIDAS Y REEMPLAZA CARACTERES
      const rutaRelativa = path.relative(rutaPublic, rutaAbsoluta).replace(/\\/g, '/');
      const urlWebLimpia = '/' + encodeURI(rutaRelativa);

      if (ext === '.htm' || ext === '.html') {
        try {
          const contenidoBruto = leerArchivoConCodificacionCorrecta(rutaAbsoluta);
          const textoLimpio = limpiarTextoHTML(contenidoBruto);

          lista.push({
            id: Buffer.from(rutaAbsoluta).toString('base64').substring(0, 10),
            titulo: tituloLimpio.toUpperCase(),
            categoria: 'Formación y Documentos',
            lote: lote,
            tipo: 'documento',
            contenido: textoLimpio.substring(0, 4000),
            urlHtml: urlWebLimpia
          });
        } catch (err) {
          console.error(`ERROR AL LEER ARCHIVO: ${archivo}`, err.message);
        }
      } else if (ext === '.pdf') {
        lista.push({
          id: Buffer.from(rutaAbsoluta).toString('base64').substring(0, 10),
          titulo: `[PDF] ${tituloLimpio.toUpperCase()}`,
          categoria: 'Documentos PDF',
          lote: lote,
          tipo: 'pdf',
          urlPdf: urlWebLimpia,
          contenido: 'DOCUMENTO EN FORMATO PDF DISPONIBLE PARA SU LECTURA DIRECTA O DESCARGA.'
        });
      }
    }
  });

  return lista;
}

console.log('--- REGENERANDO RUTAS PÚBLICAS LIMPIAS PARA VITE ---');
const resultados = escanearDirectorio(rutaBase);

if (resultados.length > 0) {
  const carpetaData = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(carpetaData)) {
    fs.mkdirSync(carpetaData, { recursive: true });
  }
  fs.writeFileSync(rutaSalida, JSON.stringify(resultados, null, 2), 'utf-8');
  console.log(`✅ ¡ÉXITO! SE REGENERARON ${resultados.length} PUBLICACIONES CON RUTAS PÚBLICAS VÁLIDAS.`);
}
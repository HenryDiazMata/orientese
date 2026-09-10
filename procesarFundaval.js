import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// OBTENCIÓN DE LA RUTA ABSOLUTA EN ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RUTAS BASE DEL PROYECTO
const rutaPublic = path.join(__dirname, 'public');
const rutaBase = path.join(rutaPublic, 'subdominios', 'fundaval.orientese.com', 'publicaciones');
const rutaSalida = path.join(__dirname, 'src', 'data', 'fundavalData.json');

// LIMPIEZA DE ETIQUETAS HTML Y ENTIDADES
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

// FORMATO PARA CONVERTIR BYTES A TAMAÑO LEGIBLE
function obtenerTamanoArchivo(bytes) {
  if (bytes === 0) return '0 KB';
  const k = 1024;
  const dm = 1;
  const tamanos = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + tamanos[i];
}

// ESCANEO RECURSIVO CON AÑO DE CREACIÓN Y PESO DE ARCHIVO
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
      const tituloLimpio = path.basename(archivo, ext).replace(/[-_]/g, ' ');
      const rutaRelativa = path.relative(rutaPublic, rutaAbsoluta).replace(/\\/g, '/');
      const urlWebLimpia = '/' + encodeURI(rutaRelativa);
      
      // EXTRAE EL AÑO DE LA FECHA DE MODIFICACIÓN/CREACIÓN
      const anoCreacion = stat.mtime.getFullYear().toString();
      const pesoLegible = obtenerTamanoArchivo(stat.size);

      if (ext === '.htm' || ext === '.html') {
        lista.push({
          id: Buffer.from(rutaAbsoluta).toString('base64').substring(0, 10),
          titulo: tituloLimpio.toUpperCase(),
          categoria: 'Formación y Documentos',
          ano: anoCreacion,
          peso: pesoLegible,
          tipo: 'documento',
          urlHtml: urlWebLimpia
        });
      } else if (ext === '.pdf') {
        lista.push({
          id: Buffer.from(rutaAbsoluta).toString('base64').substring(0, 10),
          titulo: tituloLimpio.toUpperCase(),
          categoria: 'Documentos PDF',
          ano: anoCreacion,
          peso: pesoLegible,
          tipo: 'pdf',
          urlPdf: urlWebLimpia
        });
      }
    }
  });

  return lista;
}

console.log('--- REGENERANDO RUTAS Y METADATOS (AÑO Y PESO) PARA VITE ---');
const resultados = escanearDirectorio(rutaBase);

if (resultados.length > 0) {
  const carpetaData = path.join(__dirname, 'src', 'data');
  if (!fs.existsSync(carpetaData)) {
    fs.mkdirSync(carpetaData, { recursive: true });
  }
  fs.writeFileSync(rutaSalida, JSON.stringify(resultados, null, 2), 'utf-8');
  console.log(`✅ ¡ÉXITO! SE REGENERARON ${resultados.length} PUBLICACIONES CON AÑO Y PESO.`);
}
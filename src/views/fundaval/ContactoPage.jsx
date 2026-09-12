import React, { useState } from 'react';

// ============================================================================
// COMPONENTE PÚBLICO: GESTIÓN Y LECTURA DE DOCUMENTOS FUNDAVAL
// ============================================================================
export default function DocumentosPage({ esMovil, documentos }) {
  
  // --------------------------------------------------------------------------
  // ESTADOS LOCALES PARA BÚSQUEDA, FILTROS Y PAGINACIÓN
  // --------------------------------------------------------------------------
  const [busqueda, setBusqueda] = useState('');
  const [anoFiltro, setAnoFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(10);

  // ESTADO PARA CONTROLAR EL DOCUMENTO ACTIVO EN EL MODAL DE LECTURA DENTRO DE LA MISMA PÁGINA
  const [docLecturaActivo, setDocLecturaActivo] = useState(null);

  // --------------------------------------------------------------------------
  // HELPER CORREGIDO: MANTIENE LA CARPETA PUBLICACIONES Y GENERA URLS VÁLIDAS
  // --------------------------------------------------------------------------
  const obtenerUrlAbsoluta = (rutaRelativa) => {
    if (!rutaRelativa || typeof rutaRelativa !== 'string') return null;
    let limpia = rutaRelativa.trim();

    // SI YA ES UNA URL ABSOLUTA HTTP O HTTPS LA RETORNA DIRECTAMENTE
    if (limpia.startsWith('http://') || limpia.startsWith('https://')) return limpia;

    // ELIMINAMOS ÚNICAMENTE EL PREFIJO DEL SISTEMA DE ARCHIVOS DE CPANEL (CONSERVA /publicaciones/...)
    limpia = limpia.replace(/^\/?subdominios\/fundaval\.orientese\.com/, '');

    if (!limpia.startsWith('/')) {
      limpia = '/' + limpia;
    }

    try {
      // DECODIFICAMOS Y CORREGIMOS CARACTERES ESPECIALES O ESPACIOS EN EL NOMBRE DEL ARCHIVO
      const rutaDecodificada = decodeURIComponent(limpia);
      limpia = encodeURI(rutaDecodificada);
    } catch (e) {
      // SI OCURRE UN ERROR DE FORMATO SE MANTIENE LA CADENA LIMPIA
    }

    return `https://fundaval.orientese.com${limpia}`;
  };

  // --------------------------------------------------------------------------
  // FUNCIÓN PRINCIPAL: ABRIR DOCUMENTO EN NUEVA PESTAÑA SIN BUCLES NI REDIRECCIONES
  // --------------------------------------------------------------------------
  const abrirLecturaEnNuevaPestana = (doc) => {
    const rutaOriginal = doc.urlPdf || doc.urlHtml || doc.url;
    const urlAbsoluta = obtenerUrlAbsoluta(rutaOriginal);

    // CASO 1: SI ES PDF CON URL VÁLIDA SE CARGA EN EL VISOR EMBUTIDO
    if (doc.tipo === 'pdf' && urlAbsoluta) {
      const ventanaPdf = window.open('about:blank', '_blank');
      if (ventanaPdf) {
        ventanaPdf.document.write(`
          <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${doc.titulo || 'VISOR PDF'} - FUNDAVAL</title>
            <style>
              html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #525659; font-family: sans-serif; }
              .header-bar { background-color: #1e293b; color: white; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; }
              .header-bar h2 { margin: 0; font-size: 1rem; color: #38bdf8; }
              .header-bar a { color: white; background: #059669; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 0.85rem; }
              iframe { width: 100%; height: calc(100vh - 48px); border: none; }
            </style>
          </head>
          <body>
            <div class="header-bar">
              <h2>📄 ${doc.titulo}</h2>
              <a href="${urlAbsoluta}" download target="_blank">DESCARGAR PDF original</a>
            </div>
            <iframe src="${urlAbsoluta}" type="application/pdf"></iframe>
          </body>
          </html>
        `);
        ventanaPdf.document.close();
      }
      return;
    }

    // CASO 2: DOCUMENTO TEXTUAL O HTML EDITADO
    const contenidoTexto = doc.contenido || doc.textoCompleto || doc.descripcion || '';
    const tieneTextoReal = contenidoTexto.trim() !== '' && !contenidoTexto.includes("DOCUMENTO EN FORMATO PDF DISPONIBLE");

    const nuevaVentana = window.open('about:blank', '_blank');
    if (!nuevaVentana) {
      alert("POR FAVOR PERMITE LAS VENTANAS EMERGENTES PARA LEER EL DOCUMENTO.");
      return;
    }

    nuevaVentana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${doc.titulo || 'DOCUMENTO'} - FUNDAVAL</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 900px; margin: 0 auto; padding: 2rem; background-color: #f8fafc; }
          .header { border-bottom: 3px solid #059669; padding-bottom: 1rem; margin-bottom: 2rem; }
          .badge { background-color: #dcfce7; color: #15803d; font-size: 0.8rem; font-weight: bold; padding: 0.25rem 0.6rem; border-radius: 4px; display: inline-block; margin-bottom: 0.5rem; }
          h1 { color: #0f172a; margin: 0 0 0.5rem 0; font-size: 1.75rem; }
          .contenedor-doc { background: #ffffff; padding: 2.5rem; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); word-wrap: break-word; }
          .sin-contenido { text-align: center; padding: 3rem 1rem; color: #64748b; }
          .alerta { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 1rem; border-radius: 6px; font-size: 0.9rem; margin-top: 1rem; }
          .btn-orig { display: inline-block; margin-top: 1rem; background: #0284c7; color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="badge">DOCUMENTO INSTITUCIONAL FUNDAVAL (${doc.ano || '2026'}) - CATEGORÍA: ${doc.categoria || 'GENERAL'}</span>
          <h1>${doc.titulo || 'DOCUMENTO SIN TÍTULO'}</h1>
        </div>
        
        <div class="contenedor-doc">
          ${tieneTextoReal ? 
            `<div>${contenidoTexto}</div>` : 
            `<div class="sin-contenido">
              <h2>📄 CONTENIDO TEXTUAL INTEGRAL</h2>
              <p>Este documento está disponible en su archivo web de origen.</p>
              ${urlAbsoluta ? `<a href="${urlAbsoluta}" target="_blank" class="btn-orig">ABRIR ARCHIVO FUENTE HTML</a>` : ''}
              <div class="alerta">
                💡 <strong>NOTA ADMIN:</strong> Puede editar o extraer el texto plano desde el <strong>Panel de Administración</strong>.
              </div>
             </div>`
          }
        </div>
      </body>
      </html>
    `);
    nuevaVentana.document.close();
  };

  // --------------------------------------------------------------------------
  // LÓGICA DE FILTRADO DINÁMICO POR PALABRA CLAVE Y AÑO
  // --------------------------------------------------------------------------
  const documentosFiltrados = documentos.filter((doc) => {
    const coincideTexto = doc.titulo.toLowerCase().includes(busqueda.toLowerCase().trim());
    const coincideAno = anoFiltro === '' || (doc.ano && doc.ano.toString() === anoFiltro.trim());
    return coincideTexto && coincideAno;
  });

  // --------------------------------------------------------------------------
  // CÁLCULO DE PAGINACIÓN DE REGISTROS
  // --------------------------------------------------------------------------
  const indiceUltimo = paginaActual * registrosPorPagina;
  const indicePrimer = indiceUltimo - registrosPorPagina;
  const documentosPaginados = documentosFiltrados.slice(indicePrimer, indiceUltimo);

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      
      {/* BLOQUE 1: BARRA DE BÚSQUEDA Y FILTROS INTERACTIVOS */}
      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '10px', border: '1px solid #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '3fr 1fr 1fr', gap: '1rem', alignItems: 'center' }}>
          
          <input 
            type="text" 
            placeholder="🔍 BUSCAR DOCUMENTO POR TÍTULO O PALABRA CLAVE..." 
            value={busqueda} 
            onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }} 
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #059669', fontSize: '0.9rem', boxSizing: 'border-box' }} 
          />

          <button 
            onClick={() => { setBusqueda(''); setAnoFiltro(''); setPaginaActual(1); }} 
            style={{ padding: '0.75rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            TODOS LOS AÑOS ({documentos.length})
          </button>

          <input 
            type="text" 
            placeholder="POR AÑO: EJ: 2026" 
            value={anoFiltro} 
            onChange={(e) => { setAnoFiltro(e.target.value); setPaginaActual(1); }} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
          />
        </div>
      </div>

      {/* BLOQUE 2: RESUMEN DE RESULTADOS Y CONTROLES DE PAGINACIÓN */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontWeight: 'BOLD', color: '#334155', fontSize: '0.9rem' }}>
          DOCUMENTOS ENCONTRADOS: <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>{documentosFiltrados.length}</span>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' }}>
          <span>MOSTRAR POR PÁGINA:</span>
          {[10, 25, 50].map((num) => (
            <button
              key={num}
              onClick={() => { setRegistrosPorPagina(num); setPaginaActual(1); }}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                border: '1px solid #cbd5e1',
                backgroundColor: registrosPorPagina === num ? '#0284c7' : '#ffffff',
                color: registrosPorPagina === num ? '#ffffff' : '#334155',
                fontWeight: 'BOLD',
                cursor: 'pointer'
              }}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* BLOQUE 3: LISTADO Y RENDERING DE TARJETAS DE DOCUMENTOS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {documentosPaginados.map((doc, index) => {
          const urlValida = obtenerUrlAbsoluta(doc.urlPdf || doc.urlHtml || doc.url);

          return (
            <div key={doc.id || index} style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              
              {/* METADATOS DEL DOCUMENTO */}
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#0369a1', fontSize: '0.75rem', fontWeight: 'BOLD', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    AÑO {doc.ano || '2026'}
                  </span>
                  <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    LOTE: {doc.lote || 'General'}
                  </span>
                  <span style={{ backgroundColor: '#ecfdf5', color: '#047857', fontSize: '0.75rem', fontWeight: 'BOLD', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    {doc.tipo ? doc.tipo.toUpperCase() : 'DOCUMENTO'}
                  </span>
                </div>

                <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1rem', fontWeight: '700' }}>
                  {doc.titulo}
                </h4>
              </div>

              {/* ACCIONES DE LECTURA Y DESCARGA */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => abrirLecturaEnNuevaPestana(doc)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 'BOLD',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  👓 LEER EN VENTANA NUEVA
                </button>

                {urlValida && (
                  <a
                    href={urlValida}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#047857',
                      color: '#ffffff',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: 'BOLD',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    ⬇️ DESCARGAR
                  </a>
                )}
              </div>

            </div>
          );
        })}

        {documentosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2.5rem', backgroundColor: '#ffffff', borderRadius: '8px', color: '#64748b' }}>
            ❌ NO SE ENCONTRARON DOCUMENTOS QUE COINCIDAN CON LOS CRITERIOS DE BÚSQUEDA.
          </div>
        )}
      </div>

      {/* BLOQUE 4: MODAL / VENTANA DE LECTURA EN PANTALLA */}
      {docLecturaActivo && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '12px', width: '100%',
            maxWidth: '850px', height: '80vh', display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)', overflow: 'hidden'
          }}>
            <div style={{ padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'BOLD', color: '#047857' }}>
                  DOCUMENTO INSTITUCIONAL FUNDAVAL
                </span>
                <h3 style={{ margin: '0.2rem 0 0 0', color: '#0f172a', fontSize: '1.05rem' }}>
                  {docLecturaActivo.titulo}
                </h3>
              </div>
              <button 
                onClick={() => setDocLecturaActivo(null)} 
                style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', fontWeight: 'BOLD', cursor: 'pointer' }}
              >
                ✕ CERRAR
              </button>
            </div>

            <div style={{ flex: 1, backgroundColor: '#ffffff', overflowY: 'auto', padding: '2rem' }}>
              {docLecturaActivo.contenido && !docLecturaActivo.contenido.includes("DOCUMENTO EN FORMATO PDF DISPONIBLE") ? (
                <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#334155' }}>
                  <div dangerouslySetInnerHTML={{ __html: docLecturaActivo.contenido }}></div>
                </div>
              ) : (
                <iframe
                  src={obtenerUrlAbsoluta(docLecturaActivo.urlPdf || docLecturaActivo.urlHtml || docLecturaActivo.url)}
                  title={docLecturaActivo.titulo}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              )}
            </div>

            <div style={{ padding: '0.75rem 1.25rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
              <button 
                onClick={() => setDocLecturaActivo(null)} 
                style={{ padding: '0.5rem 1.25rem', backgroundColor: '#64748b', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer' }}
              >
                VOLVER AL LISTADO
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
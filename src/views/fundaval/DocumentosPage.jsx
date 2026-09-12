import React, { useState } from 'react';

// ============================================================================
// COMPONENTE PÚBLICO: SECCIÓN DE DOCUMENTOS FUNDAVAL (VISTA SPLIT / ASIDE)
// ESTE DISEÑO DE 2 COLUMNAS APLICA ÚNICAMENTE PARA ESTA VISTA DE DOCUMENTOS
// ============================================================================
export default function DocumentosPage({ esMovil, documentos = [] }) {
  
  // --------------------------------------------------------------------------
  // ESTADOS LOCALES PARA BÚSQUEDA, FILTROS Y SELECCIÓN DE DOCUMENTO ACTIVO
  // --------------------------------------------------------------------------
  const [busqueda, setBusqueda] = useState('');
  const [anoFiltro, setAnoFiltro] = useState('');
  
  // ALMACENA EL DOCUMENTO QUE SE ESTÁ LEYENDO EN EL VISOR DE LA DERECHA (POR DEFECTO EL PRIMERO SI EXISTE)
  const [docSeleccionado, setDocSeleccionado] = useState(documentos.length > 0 ? documentos[0] : null);

  // --------------------------------------------------------------------------
  // HELPER: CONSTRUYE LA RUTA ESTÁTICA LOCAL EXACTA DENTRO DE LA CARPETA PUBLIC
  // CORRIGE LA MAYÚSCULA EN 'Publicaciones' Y CODIFICA ESPACIOS/CARACTERES
  // --------------------------------------------------------------------------
  const resolverRutaLocal = (rutaOriginal) => {
    if (!rutaOriginal || typeof rutaOriginal !== 'string') return null;
    let limpia = rutaOriginal.trim();

    // SI YA VIENE COMO URL ABSOLUTA HTTP/HTTPS SE MANTIENE
    if (limpia.startsWith('http://') || limpia.startsWith('https://')) return limpia;

    // CORREGIMOS CASOS DE MINÚSCULA 'publicaciones' A MAYÚSCULA 'Publicaciones' SEGÚN ESTRUCTURA EN PUBLIC
    limpia = limpia.replace('/publicaciones/', '/Publicaciones/');

    // ASEGURAMOS QUE LA RUTA COMIENCE CON SLASH / PARA APUNTAR A LA RAÍZ DE LA CARPETA PUBLIC
    if (!limpia.startsWith('/')) {
      limpia = '/' + limpia;
    }

    try {
      // DECODIFICAMOS Y RE-CODIFICAMOS PARA SANTEAR ESPACIOS Y CARACTERES ESPECIALES EN CADA ARCHIVO
      const decodificada = decodeURIComponent(limpia);
      return encodeURI(decodificada);
    } catch (e) {
      return limpia;
    }
  };

  // --------------------------------------------------------------------------
  // LÓGICA DE FILTRADO DINÁMICO POR PALABRA CLAVE Y AÑO PARA EL ASIDE
  // --------------------------------------------------------------------------
  const documentosFiltrados = documentos.filter((doc) => {
    const coincideTexto = doc.titulo.toLowerCase().includes(busqueda.toLowerCase().trim());
    const coincideAno = anoFiltro === '' || (doc.ano && doc.ano.toString() === anoFiltro.trim());
    return coincideTexto && coincideAno;
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: esMovil ? '1fr' : '360px 1fr', // 2 COLUMNAS: ASIDE IZQUIERDO Y VISOR DERECHO
      gap: '1.5rem',
      alignItems: 'start',
      minHeight: '75vh'
    }}>

      {/* ====================================================================
          PANEL LATERAL IZQUIERDO (ASIDE): BUSCADOR, FILTROS Y CATÁLOGO DE DOCS
          ==================================================================== */}
      <aside style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #cbd5e1',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxHeight: esMovil ? 'auto' : '80vh',
        overflowY: esMovil ? 'visible' : 'auto'
      }}>
        <div style={{ borderBottom: '2px solid #059669', paddingBottom: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a' }}>
            📚 CATÁLOGO DE DOCUMENTOS
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            TOTAL REGISTROS: {documentosFiltrados.length}
          </span>
        </div>

        {/* BÚSQUEDA Y FILTRO POR AÑO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="🔍 BUSCAR TÍTULO..." 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
            style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #059669', fontSize: '0.85rem', boxSizing: 'border-box' }} 
          />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <input 
              type="text" 
              placeholder="AÑO (EJ: 2026)" 
              value={anoFiltro} 
              onChange={(e) => setAnoFiltro(e.target.value)} 
              style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', boxSizing: 'border-box' }} 
            />
            {(busqueda || anoFiltro) && (
              <button 
                onClick={() => { setBusqueda(''); setAnoFiltro(''); }}
                style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.75rem', fontWeight: 'BOLD', cursor: 'pointer' }}
              >
                LIMPIAR
              </button>
            )}
          </div>
        </div>

        {/* LISTADO SELECCIONABLE DE TARJETAS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {documentosFiltrados.map((doc, index) => {
            const esActivo = docSeleccionado && (docSeleccionado.id === doc.id && docSeleccionado.titulo === doc.titulo);
            
            return (
              <div 
                key={doc.id || index}
                onClick={() => setDocSeleccionado(doc)}
                style={{
                  padding: '0.85rem',
                  borderRadius: '6px',
                  border: esActivo ? '2px solid #0284c7' : '1px solid #e2e8f0',
                  backgroundColor: esActivo ? '#f0f9ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: esActivo ? '0 2px 4px rgba(2, 132, 199, 0.15)' : 'none'
                }}
              >
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 'BOLD', backgroundColor: esActivo ? '#0284c7' : '#f1f5f9', color: esActivo ? '#ffffff' : '#475569', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>
                    {doc.tipo ? doc.tipo.toUpperCase() : 'PDF'}
                  </span>
                  <span style={{ fontSize: '0.65rem', backgroundColor: '#e2e8f0', color: '#334155', padding: '0.1rem 0.4rem', borderRadius: '3px' }}>
                    {doc.lote || 'General'}
                  </span>
                </div>
                <h4 style={{ margin: 0, fontSize: '0.88rem', color: esActivo ? '#0369a1' : '#1e293b', fontWeight: esActivo ? '700' : '600', lineHeight: '1.3' }}>
                  {doc.titulo}
                </h4>
              </div>
            );
          })}

          {documentosFiltrados.length === 0 && (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              ❌ SIN COINCIDENCIAS
            </div>
          )}
        </div>
      </aside>

      {/* ====================================================================
          ÁREA CENTRAL / DERECHA (VISOR INTEGRADO DE DOCUMENTO)
          ==================================================================== */}
      <main style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {docSeleccionado ? (
          <>
            {/* ENCABEZADO DEL VISOR DE LA DERECHA */}
            <div style={{
              padding: '1.25rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'BOLD', color: '#059669', textTransform: 'UPPERCASE' }}>
                  LECTURA EN PANTALLA ({docSeleccionado.ano || '2026'})
                </span>
                <h2 style={{ margin: '0.2rem 0 0 0', fontSize: '1.2rem', color: '#0f172a' }}>
                  {docSeleccionado.titulo}
                </h2>
              </div>

              {/* BOTÓN DE DESCARGA DIRECTA DEL ARCHIVO FÍSICO */}
              {resolverRutaLocal(docSeleccionado.urlPdf || docSeleccionado.urlHtml || docSeleccionado.url) && (
                <a
                  href={resolverRutaLocal(docSeleccionado.urlPdf || docSeleccionado.urlHtml || docSeleccionado.url)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.55rem 1.1rem',
                    backgroundColor: '#047857',
                    color: '#ffffff',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'BOLD',
                    fontSize: '0.8rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  ⬇️ DESCARGAR ARCHIVO
                </a>
              )}
            </div>

            {/* CUERPO CENTRAL DE VISUALIZACIÓN */}
            <div style={{ flex: 1, backgroundColor: '#f1f5f9', position: 'relative' }}>
              {docSeleccionado.tipo === 'pdf' ? (
                /* EMBUTIDO DIRECTO PARA ARCHIVOS PDF */
                <iframe
                  src={resolverRutaLocal(docSeleccionado.urlPdf || docSeleccionado.url)}
                  title={docSeleccionado.titulo}
                  style={{ width: '100%', height: '100%', minHeight: '70vh', border: 'none' }}
                ></iframe>
              ) : docSeleccionado.contenido && !docSeleccionado.contenido.includes("DOCUMENTO EN FORMATO PDF DISPONIBLE") ? (
                /* CONTENIDO HTML O TEXTUAL CARGADO EN EL SISTEMA */
                <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', minHeight: '100%', boxSizing: 'border-box', color: '#334155', lineHeight: '1.7' }}>
                  <div dangerouslySetInnerHTML={{ __html: docSeleccionado.contenido }}></div>
                </div>
              ) : (
                /* EMBUTIDO PARA ARCHIVOS WEB HTML */
                <iframe
                  src={resolverRutaLocal(docSeleccionado.urlHtml || docSeleccionado.url)}
                  title={docSeleccionado.titulo}
                  style={{ width: '100%', height: '100%', minHeight: '70vh', border: 'none' }}
                ></iframe>
              )}
            </div>
          </>
        ) : (
          /* PANTALLA INICIAL CUANDO NO HAY DOCUMENTO SELECCIONADO */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '4rem 2rem', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👈</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>SELECCIONE UN DOCUMENTO DEL MENÚ LATERAL</h3>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem', margin: 0 }}>
              Haga clic sobre cualquiera de los documentos de la lista de la izquierda para visualizar su contenido en este panel.
            </p>
          </div>
        )}
      </main>

    </div>
  );
}
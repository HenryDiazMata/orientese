import React, { useState } from 'react';

// COMPONENTE EXCLUSIVO PARA EDITAR Y REEMPLAZAR DOCUMENTOS INTERNOS
export default function EditarDocumentoTab({ adminLogueado, documentos, setDocumentos, mostrarNotificacion, esMovil }) {
  const [busquedaEdicion, setBusquedaEdicion] = useState('');
  const [docEditando, setDocEditando] = useState(null);
  const [docTituloEdit, setDocTituloEdit] = useState('');
  const [docFechaEdit, setDocFechaEdit] = useState('');
  const [docContenidoTexto, setDocContenidoTexto] = useState('');
  const [nuevoArchivoPdf, setNuevoArchivoPdf] = useState(null);

  // FILTRADO DINÁMICO SEGÚN LA BÚSQUEDA DEL USUARIO
  const textoLimpio = busquedaEdicion.toLowerCase().trim();
  const documentosFiltrados = textoLimpio !== '' 
    ? documentos.filter((d) => d.titulo.toLowerCase().includes(textoLimpio))
    : [];

  // APLICAR FORMATO DE TEXTO EN EL ÁREA SELECCIONADA
  const aplicarFormatoTexto = (etiquetaInicio, etiquetaFin = '') => {
    const area = document.getElementById('editor-texto-fundaval');
    if (!area) return;

    const inicio = area.selectionStart;
    const fin = area.selectionEnd;
    const textoSeleccionado = docContenidoTexto.substring(inicio, fin);
    
    const nuevoTexto = 
      docContenidoTexto.substring(0, inicio) + 
      etiquetaInicio + textoSeleccionado + etiquetaFin + 
      docContenidoTexto.substring(fin);

    setDocContenidoTexto(nuevoTexto);
  };

  // CARGAR REGISTRO PARA EDITAR EN EL PANEL SUPERIOR
  const handleCargarParaEditar = (doc) => {
    setDocEditando(doc);
    setDocTituloEdit(doc.titulo || '');
    setDocFechaEdit(doc.ano || '');
    setNuevoArchivoPdf(null);

    let textoCargar = doc.contenido || doc.resumen || '';

    if (!textoCargar || textoCargar.includes("DOCUMENTO EN FORMATO PDF DISPONIBLE")) {
      textoCargar = `${doc.titulo}\n\n[ESCRIBA O PEGUE AQUÍ EL CONTENIDO EDITABLE DEL DOCUMENTO...]`;
    }

    setDocContenidoTexto(textoCargar);

    // DESPLAZAMIENTO SUAVE AL EDITOR ABIERTO
    setTimeout(() => {
      const editorElement = document.getElementById('seccion-editor-abierto');
      if (editorElement) {
        editorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // GUARDAR LOS CAMBIOS EDITADOS EN LOCALSTORAGE
  const handleGuardarTextoEditado = (e) => {
    e.preventDefault();
    if (!docEditando) return;

    const fechaActual = new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });

    const actualizados = documentos.map((item) => {
      if (item.id === docEditando.id) {
        const nuevaRuta = nuevoArchivoPdf 
          ? `/subdominios/fundaval.orientese.com/publicaciones/${nuevoArchivoPdf.name}` 
          : (item.urlPdf || item.url || '');

        return {
          ...item,
          titulo: docTituloEdit.trim(),
          ano: docFechaEdit,
          contenido: docContenidoTexto,
          resumen: docContenidoTexto.substring(0, 150) + '...',
          url: nuevaRuta,
          urlPdf: nuevaRuta,
          urlHtml: nuevaRuta,
          editadoPor: adminLogueado.usuario,
          fechaEdicion: fechaActual
        };
      }
      return item;
    });

    setDocumentos(actualizados);
    localStorage.setItem('fundaval_docs_custom', JSON.stringify(actualizados));
    mostrarNotificacion('✅ CAMBIOS GUARDADOS CORRECTAMENTE.');
    setDocEditando(null);
  };

  // ELIMINAR REGISTRO DE LA LISTA
  const handleEliminarDoc = (id, titulo) => {
    if (window.confirm(`⚠️ ELIMINACIÓN PERMANENTE\n\n¿DESEA ELIMINAR PERMANENTEMENTE "${titulo}"?\nESTA ACCIÓN NO SE PUEDE DESHACER EN EL SITIO.`)) {
      const listaFiltrada = documentos.filter((item) => item.id !== id);
      setDocumentos(listaFiltrada);
      localStorage.setItem('fundaval_docs_custom', JSON.stringify(listaFiltrada));
      mostrarNotificacion('🗑️ DOCUMENTO ELIMINADO PERMANENTEMENTE.', 'info');
      if (docEditando?.id === id) setDocEditando(null);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1rem' }}>
          🔍 BUSCAR DOCUMENTO INTERNO PARA EDITAR
        </h4>
        <input 
          type="text" 
          placeholder="🔍 ESCRIBA EL TÍTULO O PALABRA CLAVE..." 
          value={busquedaEdicion} 
          onChange={(e) => setBusquedaEdicion(e.target.value)} 
          style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #0284c7', fontSize: '0.9rem', boxSizing: 'border-box', backgroundColor: '#f0f9ff' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {documentosFiltrados.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>{item.titulo}</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>👤 AUTOR: {item.creadoPor || 'SISTEMA'} | 📅 AÑO: {item.ano || '2026'}</span>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => handleCargarParaEditar(item)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'BOLD', cursor: 'pointer' }}>
                  ✏️ EDITAR EN EDITOR
                </button>
                <button onClick={() => handleEliminarDoc(item.id, item.titulo)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'BOLD', cursor: 'pointer' }}>
                  🗑️ ELIMINAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ÁREA DEL EDITOR DE TEXTO ENRIQUECIDO DEBAJO DE LA BÚSQUEDA */}
      {docEditando && (
        <div id="seccion-editor-abierto" style={{ backgroundColor: '#ffffff', border: '2px solid #0284c7', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#0284c7', fontSize: '1.05rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📝 DOCUMENTO ABIERTO: {docTituloEdit}</span>
            <button onClick={() => setDocEditando(null)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'BOLD', cursor: 'pointer' }}>✕ CERRAR EDITOR</button>
          </h3>

          <form onSubmit={handleGuardarTextoEditado} style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '3fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>TÍTULO:</label>
                <input type="text" value={docTituloEdit} onChange={(e) => setDocTituloEdit(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#334155', marginBottom: '0.3rem' }}>AÑO / FECHA:</label>
                <input type="text" value={docFechaEdit} onChange={(e) => setDocFechaEdit(e.target.value)} required style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
              </div>
            </div>

            {/* OPCIÓN PARA REEMPLAZAR EL PDF COMPILADO */}
            {docEditando.tipo === 'pdf' && (
              <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.75rem', borderRadius: '6px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'BOLD', color: '#0369a1', marginBottom: '0.3rem' }}>
                  📄 REEMPLAZAR ARCHIVO PDF SUBIDO (OPCIONAL):
                </label>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => setNuevoArchivoPdf(e.target.files[0])} 
                  style={{ fontSize: '0.85rem', color: '#334155' }}
                />
              </div>
            )}

            <div>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '6px 6px 0 0', border: '1px solid #cbd5e1', borderBottom: 'none' }}>
                <button type="button" onClick={() => aplicarFormatoTexto('<b>', '</b>')} style={{ padding: '0.35rem 0.7rem', fontWeight: 'BOLD', cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>B (NEGRITA)</button>
                <button type="button" onClick={() => aplicarFormatoTexto('<i>', '</i>')} style={{ padding: '0.35rem 0.7rem', fontStyle: 'italic', cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>I (CURSIVA)</button>
                <button type="button" onClick={() => aplicarFormatoTexto('<u>', '</u>')} style={{ padding: '0.35rem 0.7rem', textDecoration: 'underline', cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>U (SUBRAYADO)</button>
                <button type="button" onClick={() => aplicarFormatoTexto('\n• ')} style={{ padding: '0.35rem 0.7rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>• LISTA</button>
                <button type="button" onClick={() => aplicarFormatoTexto('<p style="text-align: center;">', '</p>')} style={{ padding: '0.35rem 0.7rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff' }}>≡ CENTRAR</button>
              </div>

              <textarea 
                id="editor-texto-fundaval" 
                rows="12" 
                value={docContenidoTexto} 
                onChange={(e) => setDocContenidoTexto(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0 0 6px 6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={{ padding: '0.85rem 1.5rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer' }}>
                💾 GUARDAR CAMBIOS
              </button>
              <button type="button" onClick={() => setDocEditando(null)} style={{ padding: '0.85rem 1.5rem', backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'BOLD', cursor: 'pointer' }}>
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
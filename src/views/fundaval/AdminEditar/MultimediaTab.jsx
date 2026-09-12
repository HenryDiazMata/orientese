import React, { useState, useEffect } from 'react';

// ============================================================================
// COMPONENTE UNIFICADO: GESTIÓN COMPLETA DE ENLACES EXTERNOS (MULTIMEDIA / BLOGS / PODCASTS)
// Permite Crear, Buscar en Aside (vacío por defecto), Editar URL/Datos y Eliminar Enlaces.
// ============================================================================
export default function MultimediaTab({ mostrarNotificacion, esMovil }) {
  // LISTA DE RECURSOS ALMACENADA EN LOCALSTORAGE
  const [recursosMedia, setRecursosMedia] = useState(() => {
    const guardados = localStorage.getItem('fundaval_media_custom');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [busqueda, setBusqueda] = useState('');
  const [itemEditando, setItemEditando] = useState(null);

  // CAMPOS DEL FORMULARIO
  const [mediaTitulo, setMediaTitulo] = useState('');
  const [mediaTipo, setMediaTipo] = useState('audio');
  const [mediaPlataforma, setMediaPlataforma] = useState('Spotify / YouTube / Blog');
  const [mediaUrl, setMediaUrl] = useState('');

  // BÚSQUEDA ACTIVADA ÚNICAMENTE AL ESCRIBIR EN EL CUADRO DE BÚSQUEDA
  const textoLimpio = busqueda.toLowerCase().trim();
  const recursosFiltrados = textoLimpio !== ''
    ? recursosMedia.filter((r) => r.titulo && r.titulo.toLowerCase().includes(textoLimpio))
    : [];

  // GUARDAR O ACTUALIZAR ENLACE MULTIMEDIA
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaTitulo.trim() || !mediaUrl.trim()) return;

    if (itemEditando) {
      // MODO EDICIÓN
      const actualizados = recursosMedia.map((item) => {
        if (item.id === itemEditando.id) {
          return {
            ...item,
            titulo: mediaTitulo.trim(),
            tipo: mediaTipo,
            plataforma: mediaPlataforma.trim(),
            url: mediaUrl.trim()
          };
        }
        return item;
      });
      setRecursosMedia(actualizados);
      localStorage.setItem('fundaval_media_custom', JSON.stringify(actualizados));
      mostrarNotificacion('✅ Enlace multimedia actualizado correctamente.');
      setItemEditando(null);
    } else {
      // MODO REGISTRO NUEVO
      const nuevoRecurso = {
        id: Date.now().toString(),
        titulo: mediaTitulo.trim(),
        tipo: mediaTipo,
        plataforma: mediaPlataforma.trim(),
        url: mediaUrl.trim(),
        fechaRegistro: new Date().toLocaleDateString('es-ES')
      };
      const nuevos = [nuevoRecurso, ...recursosMedia];
      setRecursosMedia(nuevos);
      localStorage.setItem('fundaval_media_custom', JSON.stringify(nuevos));
      mostrarNotificacion('✅ Enlace multimedia registrado correctamente.');
    }

    // LIMPIAR FORMULARIO
    setMediaTitulo('');
    setMediaUrl('');
    setMediaTipo('audio');
    setMediaPlataforma('Spotify / YouTube / Blog');
  };

  // CARGAR RECURSO SELECCIONADO PARA EDITAR
  const handleCargarEditar = (item) => {
    setItemEditando(item);
    setMediaTitulo(item.titulo || '');
    setMediaTipo(item.tipo || 'audio');
    setMediaPlataforma(item.plataforma || '');
    setMediaUrl(item.url || '');
  };

  // ELIMINAR RECURSO
  const handleEliminar = (e, id, titulo) => {
    e.stopPropagation();
    if (window.confirm(`¿Desea eliminar permanentemente el enlace "${titulo}"?`)) {
      const filtrados = recursosMedia.filter((item) => item.id !== id);
      setRecursosMedia(filtrados);
      localStorage.setItem('fundaval_media_custom', JSON.stringify(filtrados));
      mostrarNotificacion('🗑️ Enlace multimedia eliminado.', 'info');
      if (itemEditando?.id === id) setItemEditando(null);
    }
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: esMovil ? '1fr' : '340px 1fr', 
      gap: '1.5rem',
      alignItems: 'start' 
    }}>
      {/* =================================================================== */}
      {/* ASIDE IZQUIERDO: BÚSQUEDA Y EDICIÓN DE ENLACES                     */}
      {/* =================================================================== */}
      <aside style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', fontSize: '0.95rem' }}>
          🔍 BÚSQUEDA DE ENLACES
        </h4>

        <input 
          type="text" 
          placeholder="ESCRIBA EL TÍTULO DEL PODCAST/VIDEO..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #0284c7', fontSize: '0.85rem', boxSizing: 'border-box', backgroundColor: '#f0f9ff', marginBottom: '1rem' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '550px', overflowY: 'auto' }}>
          {textoLimpio === '' ? (
            <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: '1rem 0' }}>
              💡 Escriba en el buscador superior para filtrar y seleccionar un enlace a editar.
            </p>
          ) : recursosFiltrados.length === 0 ? (
            <p style={{ fontSize: '0.8rem', color: '#ef4444', textAlign: 'center', margin: '1rem 0' }}>
              No se encontraron coincidencias.
            </p>
          ) : (
            recursosFiltrados.map((item) => {
              const esActivo = itemEditando?.id === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => handleCargarEditar(item)}
                  style={{ 
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    border: esActivo ? '2px solid #0284c7' : '1px solid #e2e8f0', 
                    backgroundColor: esActivo ? '#e0f2fe' : '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <strong style={{ fontSize: '0.85rem', color: esActivo ? '#0369a1' : '#1e293b', display: 'block', marginBottom: '0.25rem' }}>
                    {item.titulo}
                  </strong>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                    <span>📌 {item.plataforma || 'EXTERNO'}</span>
                    <button 
                      onClick={(e) => handleEliminar(e, item.id, item.titulo)} 
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', padding: '0 0.2rem' }}
                      title="Eliminar enlace"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* =================================================================== */}
      {/* PANEL DERECHO: FORMULARIO DE REGISTRO / EDICIÓN                    */}
      {/* =================================================================== */}
      <main style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
          <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.05rem', borderLeft: '4px solid #0284c7', paddingLeft: '0.5rem' }}>
            {itemEditando ? `✏️ Editando Enlace: ${itemEditando.titulo}` : '🎙️ Registrar Enlace Externe a Podcast, Video o Blog'}
          </h3>

          <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.8rem', color: '#0369a1' }}>
            💡 <strong>OPTIMIZACIÓN DE HOSTING:</strong> Los podcasts, audios, videos y entradas de blogs se alojan en plataformas externas (YouTube, Spotify, Blogger, etc.). Aquí solo registramos el enlace público para dirigir el tráfico directo al proveedor de origen.
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Título del Recurso:</label>
            <input type="text" value={mediaTitulo} onChange={(e) => setMediaTitulo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Tipo de Contenido:</label>
              <select value={mediaTipo} onChange={(e) => setMediaTipo(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
                <option value="audio">Podcast / Audio (Spotify, Soundcloud)</option>
                <option value="video">Video Externo (YouTube, Vimeo)</option>
                <option value="documento">Blog / Artículo de Opinión</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Plataforma de Origen:</label>
              <input type="text" placeholder="Ej: YouTube / Spotify / Blogger" value={mediaPlataforma} onChange={(e) => setMediaPlataforma(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Enlace URL Público Directo:</label>
            <input type="url" placeholder="https://..." value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ padding: '0.85rem 1.5rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
              {itemEditando ? '💾 GUARDAR CAMBIOS EN ENLACE' : '💾 PUBLICAR ENLACE MULTIMEDIA'}
            </button>
            {itemEditando && (
              <button 
                type="button" 
                onClick={() => {
                  setItemEditando(null);
                  setMediaTitulo('');
                  setMediaUrl('');
                }}
                style={{ padding: '0.85rem 1.5rem', backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                CANCELAR EDICIÓN
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
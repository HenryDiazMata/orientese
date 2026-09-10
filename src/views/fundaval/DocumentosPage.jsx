import React, { useState } from 'react';

// LÍMITE DE DESCARGAS DIARIAS PERMITIDAS
const LIMITE_DESCARGAS_DIARIAS = 5;

export default function DocumentosPage({ esMovil, documentos }) {
  // ESTADOS DE FILTRADO Y BÚSQUEDA
  const [busqueda, setBusqueda] = useState('');
  const [filtroAnoInput, setFiltroAnoInput] = useState('');
  const [todosLosAnos, setTodosLosAnos] = useState(true);

  // ESTADOS DE PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(10);

  // CONTROL LOCAL DE DESCARGAS REALIZADAS EN EL DÍA
  const [descargasHoy, setDescargasHoy] = useState(() => {
    const guardadas = localStorage.getItem('fundaval_descargas_hoy');
    return guardadas ? parseInt(guardadas, 10) : 0;
  });

  // MANEJADOR DE DESCARGAS
  const handleDescargar = (e) => {
    if (descargasHoy >= LIMITE_DESCARGAS_DIARIAS) {
      e.preventDefault();
      alert(`⚠️ HA ALCANZADO EL LÍMITE MÁXIMO DE ${LIMITE_DESCARGAS_DIARIAS} DESCARGAS DIARIAS PERMITIDAS. VUELVA A INTENTARLO MAÑANA.`);
      return;
    }

    const nuevoTotal = descargasHoy + 1;
    setDescargasHoy(nuevoTotal);
    localStorage.setItem('fundaval_descargas_hoy', nuevoTotal.toString());
  };

  // MANEJADOR PARA SELECCIONAR "TODOS LOS AÑOS"
  const handleTodosLosAnos = () => {
    setTodosLosAnos(true);
    setFiltroAnoInput('');
    setPaginaActual(1);
  };

  // MANEJADOR PARA CAMBIO EN EL INPUT DE AÑO
  const handleAnoInputChange = (e) => {
    const valor = e.target.value;
    setFiltroAnoInput(valor);
    if (valor.trim() !== '') {
      setTodosLosAnos(false);
    } else {
      setTodosLosAnos(true);
    }
    setPaginaActual(1);
  };

  // LÓGICA DE FILTRADO DE DOCUMENTOS
  const documentosFiltrados = documentos.filter((doc) => {
    const textoBusqueda = busqueda.toLowerCase().trim();
    const coincideTexto = !textoBusqueda || (doc.titulo || '').toLowerCase().includes(textoBusqueda);
    const coincideAno = todosLosAnos || (doc.ano || '').includes(filtroAnoInput.trim());

    return coincideTexto && coincideAno;
  });

  // LÓGICA DE PAGINACIÓN
  const totalPaginas = Math.ceil(documentosFiltrados.length / itemsPorPagina) || 1;
  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const documentosPaginados = documentosFiltrados.slice(indiceInicio, indiceInicio + itemsPorPagina);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* SECCIÓN 1: CONTROLES SUPERIORES DE BÚSQUEDA Y FILTRADO EN UNA LÍNEA */}
      <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexDirection: esMovil ? 'column' : 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* BUSCADOR DE TEXTO */}
          <input 
            type="text"
            placeholder="🔍 BUSCAR DOCUMENTO POR TÍTULO O PALABRA CLAVE..."
            value={busqueda}
            onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
            style={{ padding: '0.7rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', flex: 2, minWidth: esMovil ? '100%' : '280px', fontSize: '0.9rem', boxSizing: 'border-box' }}
          />

          {/* BOTÓN TODOS LOS AÑOS */}
          <button
            onClick={handleTodosLosAnos}
            style={{
              padding: '0.7rem 1.1rem',
              border: '1px solid',
              borderColor: todosLosAnos ? '#059669' : '#cbd5e1',
              backgroundColor: todosLosAnos ? '#059669' : '#ffffff',
              color: todosLosAnos ? '#ffffff' : '#475569',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              width: esMovil ? '100%' : 'auto'
            }}
          >
            TODOS LOS AÑOS ({documentos.length})
          </button>

          {/* INPUT POR AÑO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: esMovil ? '100%' : 'auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', whiteSpace: 'nowrap' }}>POR AÑO:</span>
            <input 
              type="number"
              placeholder="EJ: 2024"
              value={filtroAnoInput}
              onChange={handleAnoInputChange}
              style={{ padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', width: esMovil ? '100%' : '110px', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </div>

        </div>
      </div>

      {/* SECCIÓN 2: BARRA DE INFORMACIÓN DE RESULTADOS Y CONFIGURACIÓN DE PAGINACIÓN */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.25rem' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1e293b' }}>
          DOCUMENTOS ENCONTRADOS: <span style={{ color: '#059669', backgroundColor: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid #a7f3d0' }}>{documentosFiltrados.length}</span>
        </div>

        {/* SELECTOR DE ÍTEMS POR PÁGINA (10, 25, 50) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
          <span>MOSTRAR POR PÁGINA:</span>
          {[10, 25, 50].map((cant) => (
            <button
              key={cant}
              onClick={() => { setItemsPorPagina(cant); setPaginaActual(1); }}
              style={{
                padding: '0.35rem 0.65rem',
                border: '1px solid',
                borderColor: itemsPorPagina === cant ? '#0284c7' : '#cbd5e1',
                backgroundColor: itemsPorPagina === cant ? '#0284c7' : '#ffffff',
                color: itemsPorPagina === cant ? '#ffffff' : '#475569',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: itemsPorPagina === cant ? 'bold' : 'normal',
                fontSize: '0.8rem'
              }}
            >
              {cant}
            </button>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: LISTA DE DOCUMENTOS CON ALINEACIÓN TOTAL A LA IZQUIERDA */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
        {documentosPaginados.map((doc) => (
          <div 
            key={doc.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '1.15rem 1.25rem',
              display: 'flex',
              flexDirection: esMovil ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: esMovil ? 'flex-start' : 'center',
              gap: '1rem',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}
          >
            {/* INFORMACIÓN DEL DOCUMENTO - ALINEACIÓN A LA IZQUIERDA */}
            <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  AÑO {doc.ano || '2024'}
                </span>
                <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500' }}>
                  PESO: {doc.peso || 'S/D'}
                </span>
                <span style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {doc.tipo.toUpperCase()}
                </span>
              </div>

              <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1rem', lineHeight: '1.4', fontWeight: '700', textAlign: 'left' }}>
                {doc.titulo}
              </h3>
            </div>

            {/* BOTONES DE ACCIÓN DIRECTA */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', width: esMovil ? '100%' : 'auto' }}>
              <a 
                href={doc.urlPdf || doc.urlHtml} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  flex: esMovil ? 1 : 'initial',
                  textAlign: 'center',
                  padding: '0.6rem 1rem', 
                  backgroundColor: '#0284c7', 
                  color: '#ffffff', 
                  borderRadius: '6px', 
                  textDecoration: 'none', 
                  fontWeight: 'bold', 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap'
                }}
              >
                🔗 LEER EN VENTANA NUEVA
              </a>

              <a 
                href={doc.urlPdf || doc.urlHtml} 
                download
                onClick={handleDescargar}
                style={{ 
                  flex: esMovil ? 1 : 'initial',
                  textAlign: 'center',
                  padding: '0.6rem 1rem', 
                  backgroundColor: '#059669', 
                  color: '#ffffff', 
                  borderRadius: '6px', 
                  textDecoration: 'none', 
                  fontWeight: 'bold', 
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap'
                }}
              >
                ⬇️ DESCARGAR ARCHIVO
              </a>
            </div>
          </div>
        ))}

        {documentosFiltrados.length === 0 && (
          <div style={{ backgroundColor: '#ffffff', padding: '3rem 1rem', textAlign: 'center', borderRadius: '10px', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🔍</span>
            NO SE ENCONTRARON DOCUMENTOS QUE COINCIDAN CON LOS CRITERIOS DE BÚSQUEDA.
          </div>
        )}
      </div>

      {/* SECCIÓN 4: CONTROLES DE PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
            disabled={paginaActual === 1}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: paginaActual === 1 ? '#f1f5f9' : '#ffffff',
              color: paginaActual === 1 ? '#94a3b8' : '#334155',
              cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          >
            ← ANTERIOR
          </button>

          <span style={{ fontSize: '0.85rem', color: '#475569', padding: '0 0.5rem' }}>
            PÁGINA {paginaActual} DE {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: paginaActual === totalPaginas ? '#f1f5f9' : '#ffffff',
              color: paginaActual === totalPaginas ? '#94a3b8' : '#334155',
              cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem'
            }}
          >
            SIGUIENTE →
          </button>
        </div>
      )}

      {/* SECCIÓN 5: LEYENDA OPCIONAL DE PERMISOS DE USO Y LÍMITE DE DESCARGAS (UBICADA ABAJO) */}
      <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '1rem 1.25rem', marginTop: '1.5rem', fontSize: '0.8rem', color: '#065f46', textAlign: 'left' }}>
        <p style={{ margin: '0 0 0.3rem 0', fontWeight: 'bold', fontSize: '0.85rem' }}>
          📜 PERMISO DE USO Y DESCARGA LIBRE COMUNITARIA
        </p>
        <p style={{ margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
          Usted tiene autorización para consultar y descargar libremente este material con fines educativos, sociales y de formación comunitaria.
        </p>
        <div style={{ fontWeight: 'bold', color: '#047857', borderTop: '1px solid #a7f3d0', paddingTop: '0.4rem' }}>
          Disponibilidad de descargas hoy: {LIMITE_DESCARGAS_DIARIAS - descargasHoy} de {LIMITE_DESCARGAS_DIARIAS} permitidas.
        </div>
      </div>

    </div>
  );
}
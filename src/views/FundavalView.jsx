import React, { useState, useEffect } from 'react';

// IMPORTACIÓN AUTOMÁTICA DE LOS DOCUMENTOS PROCESADOS
import fundavalData from '../data/fundavalData.json';

// LOGO SVG INTEGRADO DE FUNDAVAL
const LogoFundaval = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '42px', height: '42px' }}>
    <circle cx="50" cy="50" r="48" fill="#10b981" opacity="0.15" />
    <path d="M50 15C35 15 25 30 25 45C25 65 50 85 50 85C50 85 75 65 75 45C75 30 65 15 50 15Z" fill="#059669" />
    <path d="M50 25C40 25 33 35 33 45C33 58 50 72 50 72C50 72 67 58 67 45C67 35 60 25 50 25Z" fill="#10b981" />
    <path d="M50 35V65M40 48L50 38L60 48" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function FundavalView({ onNavigate }) {
  // DETECCIÓN RESPONSIVA DE PANTALLA
  const [esMovil, setEsMovil] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // NAVEGACIÓN INTERNA DEL SUBDOMINIO
  const [pestanaActiva, setPestanaActiva] = useState('inicio'); // inicio, documentos, podcast, servicios, nosostros, contacto

  // ESTADOS DE DATOS
  const [documentos, setDocumentos] = useState(fundavalData || []);
  const [docSeleccionado, setDocSeleccionado] = useState(fundavalData[0] || null);
  const [filtroLote, setFiltroLote] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');
  const [modoAdmin, setModoAdmin] = useState(false);

  // SERVICIOS QUE OFRECE LA FUNDACIÓN
  const serviciosFundaval = [
    { id: 1, titulo: "Capacitación Agrícola y Campesina", desc: "Talleres en técnicas sostenibles, manejo de suelos, cultivos orgánicos y optimización de cosechas.", icono: "🌾" },
    { id: 2, titulo: "Apoyo e Impulso al Pescador Artesanal", desc: "Asesoría en buenas prácticas pesqueras, normativas, cadenas de frío y asociatividad comunitaria.", icono: "🐟" },
    { id: 3, titulo: "Formación en Derechos Humanos y Sociales", desc: "Talleres comunitarios sobre derechos fundamentales, gestión social y fortalecimiento comunitario.", icono: "⚖️" },
    { id: 4, titulo: "Emprendimiento y Formación en Oficios", desc: "Acompañamiento en el diseño de planes de negocio rural, finanzas básicas y proyectos productivos.", icono: "💡" }
  ];

  // ESTADOS DEL FORMULARIO DE ADMINISTRADORES
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('Formación y Documentos');
  const [nuevoTipo, setNuevoTipo] = useState('documento');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [nuevaUrl, setNuevaUrl] = useState('');

  // LÓGICA DE FILTRADO Y BUSCADOR
  const documentosFiltrados = documentos.filter((doc) => {
    const coincideLote = filtroLote === 'TODOS' || doc.lote === filtroLote;
    const textoBusqueda = busqueda.toLowerCase().trim();
    if (!textoBusqueda) return coincideLote;

    const coincideTitulo = (doc.titulo || '').toLowerCase().includes(textoBusqueda);
    const coincideContenido = (doc.contenido || '').toLowerCase().includes(textoBusqueda);

    return coincideLote && (coincideTitulo || coincideContenido);
  });

  // CARGA DIRECTA DE CONTENIDO POR ADMINISTRADORES
  const handleAgregarContenido = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;

    const nuevoItem = {
      id: Date.now().toString(),
      titulo: nuevoTitulo.toUpperCase(),
      categoria: nuevaCategoria,
      lote: 'Nuevo (Admin)',
      tipo: nuevoTipo,
      contenido: nuevoContenido,
      urlAudio: nuevoTipo === 'audio' ? nuevaUrl : '',
      urlPdf: nuevoTipo === 'pdf' ? nuevaUrl : '',
      urlExterna: nuevoTipo === 'enlace' ? nuevaUrl : ''
    };

    setDocumentos([nuevoItem, ...documentos]);
    setDocSeleccionado(nuevoItem);
    setNuevoTitulo('');
    setNuevoContenido('');
    setNuevaUrl('');
    alert('¡Publicación guardada exitosamente!');
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* 1. BARRA DE SISTEMA DISCRETA (ACCESOS GLOBALES) */}
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '0.4rem 1rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Red de Portales Oriéntese</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#10b981', fontWeight: 'bold' }}>fundaval.orientese.com</span>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {onNavigate && (
            <button 
              onClick={() => onNavigate('main')}
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              ← Volver al Portal Central
            </button>
          )}
          <span style={{ opacity: 0.4 }}>|</span>
          <button 
            onClick={() => setModoAdmin(!modoAdmin)}
            style={{ 
              padding: '0.2rem 0.6rem', 
              backgroundColor: modoAdmin ? '#ef4444' : '#334155', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontSize: '0.75rem',
              fontWeight: '500'
            }}
          >
            {modoAdmin ? '✕ CERRAR ADMIN' : '🔒 ÁREA ADMIN'}
          </button>
        </div>
      </div>

      {/* 2. ENCABEZADO Y NAVEGACIÓN PRINCIPAL */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', sticky: 'top', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* LOGO Y NOMBRE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setPestanaActiva('inicio')}>
            <LogoFundaval />
            <div>
              <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#047857', fontWeight: '800', tracking: '-0.02em', lineHeight: '1' }}>FUNDAVAL</h1>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>Fundación para el Desarrollo Social y Campesino</p>
            </div>
          </div>

          {/* MENÚ DE NAVEGACIÓN */}
          <nav style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'documentos', label: `Documentos (${documentos.length})` },
              { id: 'podcast', label: 'Podcasts & Audio' },
              { id: 'servicios', label: 'Servicios' },
              { id: 'nosotros', label: 'Quienes Somos' },
              { id: 'contacto', label: 'Contacto' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPestanaActiva(tab.id)}
                style={{
                  padding: '0.5rem 0.85rem',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: pestanaActiva === tab.id ? '#ecfdf5' : 'transparent',
                  color: pestanaActiva === tab.id ? '#047857' : '#475569',
                  fontWeight: pestanaActiva === tab.id ? '700' : '500',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 3. PANEL ADMIN DE GESTIÓN (FORMULARIO) */}
      {modoAdmin && (
        <div style={{ backgroundColor: '#fef2f2', borderBottom: '2px solid #fca5a5', padding: '1.25rem 1rem' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ margin: 0, color: '#991b1b', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔒</span> MÓDULO DE ADMINISTRACIÓN Y CARGA DE CONTENIDO
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#7f1d1d', backgroundColor: '#fee2e2', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Modo Edición Activo</span>
            </div>
            
            <form onSubmit={handleAgregarContenido} style={{ display: 'grid', gap: '0.75rem' }}>
              <input 
                type="text" 
                value={nuevoTitulo} 
                onChange={(e) => setNuevoTitulo(e.target.value)} 
                placeholder="Título de la publicación, taller o podcast"
                style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #fca5a5', width: '100%', boxSizing: 'border-box' }}
                required 
              />

              <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '0.75rem' }}>
                <select 
                  value={nuevaCategoria} 
                  onChange={(e) => setNuevaCategoria(e.target.value)}
                  style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #fca5a5', width: '100%' }}
                >
                  <option value="Formación y Documentos">Formación y Documentos</option>
                  <option value="Derechos Humanos">Derechos Humanos</option>
                  <option value="Desarrollo Agrícola">Desarrollo Agrícola / Campesino</option>
                  <option value="Proyectos Pesqueros">Proyectos para Pescadores</option>
                  <option value="Emprendimiento">Emprendimiento y Oficios</option>
                </select>

                <select 
                  value={nuevoTipo} 
                  onChange={(e) => setNuevoTipo(e.target.value)}
                  style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #fca5a5', width: '100%' }}
                >
                  <option value="documento">Texto / Artículo Lectura</option>
                  <option value="pdf">Documento PDF Descargable</option>
                  <option value="audio">Podcast / Audio (MP3)</option>
                  <option value="enlace">Enlace a Blog o Web Externa</option>
                </select>
              </div>

              {(nuevoTipo === 'audio' || nuevoTipo === 'enlace' || nuevoTipo === 'pdf') && (
                <input 
                  type="url" 
                  value={nuevaUrl} 
                  onChange={(e) => setNuevaUrl(e.target.value)} 
                  placeholder="URL del archivo o enlace (https://...)"
                  style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #fca5a5', width: '100%', boxSizing: 'border-box' }}
                />
              )}

              <textarea 
                rows="3" 
                value={nuevoContenido} 
                onChange={(e) => setNuevoContenido(e.target.value)} 
                placeholder="Descripción completa o contenido del recurso..."
                style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #fca5a5', width: '100%', boxSizing: 'border-box' }}
              ></textarea>

              <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                Publicar Recurso en Fundaval
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. CONTENIDO DINÁMICO SEGÚN LA PESTAÑA */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem' }}>

        {/* --- PESTAÑA: INICIO --- */}
        {pestanaActiva === 'inicio' && (
          <div>
            {/* HERO SECTION */}
            <div style={{ 
              background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)', 
              color: '#ffffff', 
              borderRadius: '16px', 
              padding: esMovil ? '1.5rem' : '3rem 2.5rem', 
              marginBottom: '2rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ maxWidth: '800px' }}>
                <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Plataforma Social y Educativa
                </span>
                <h2 style={{ fontSize: esMovil ? '1.75rem' : '2.5rem', fontWeight: '800', margin: '1rem 0 0.5rem 0', lineHeight: '1.15' }}>
                  Impulsando el desarrollo campesino, artesanal y social
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#a7f3d0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Acceda a nuestro repositorio gratuito de formación, documentos de apoyo legal y proyectos productivos para pescadores, agricultores y emprendedores.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setPestanaActiva('documentos')}
                    style={{ padding: '0.75rem 1.25rem', backgroundColor: '#ffffff', color: '#047857', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    Explorar Documentos ({documentos.length})
                  </button>
                  <button 
                    onClick={() => setPestanaActiva('servicios')}
                    style={{ padding: '0.75rem 1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    Nuestros Servicios
                  </button>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE SERVICIOS DESTACADOS */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
                Áreas de Acompañamiento Social
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {serviciosFundaval.map(srv => (
                  <div key={srv.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{srv.icono}</div>
                    <h4 style={{ margin: '0 0 0.4rem 0', color: '#0f172a', fontSize: '1rem' }}>{srv.titulo}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>{srv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN ÚLTIMOS DOCUMENTOS PROCESADOS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#1e293b', margin: 0, borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
                  Publicaciones Recientes
                </h3>
                <button onClick={() => setPestanaActiva('documentos')} style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Ver todas →
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {documentos.slice(0, 3).map(doc => (
                  <div key={doc.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                        {doc.categoria}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', margin: '0.6rem 0 0.4rem 0', color: '#1e293b' }}>{doc.titulo}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {doc.contenido}
                      </p>
                    </div>
                    <button 
                      onClick={() => { setDocSeleccionado(doc); setPestanaActiva('documentos'); }}
                      style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'center' }}
                    >
                      Leer Documento
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PESTAÑA: DOCUMENTOS (INTERFACE DE DOS COLUMNAS REFORZADA) --- */}
        {pestanaActiva === 'documentos' && (
          <div>
            {/* BUSCADOR Y FILTROS DE LOTE */}
            <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexDirection: esMovil ? 'column' : 'row', alignItems: 'center' }}>
                <input 
                  type="text"
                  placeholder="🔍 Buscar publicaciones por palabras clave..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', flex: 1, width: '100%', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', width: esMovil ? '100%' : 'auto' }}>
                  {['TODOS', '1er Lote', '2do Lote', 'General / Raíz'].map((lote) => (
                    <button
                      key={lote}
                      onClick={() => setFiltroLote(lote)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        border: '1px solid',
                        borderColor: filtroLote === lote ? '#059669' : '#cbd5e1',
                        backgroundColor: filtroLote === lote ? '#059669' : '#ffffff',
                        color: filtroLote === lote ? '#ffffff' : '#475569',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: filtroLote === lote ? 'bold' : 'normal',
                        fontSize: '0.8rem'
                      }}
                    >
                      {lote}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DISPOSICIÓN DE DOS COLUMNAS */}
            <div style={{ display: 'flex', flexDirection: esMovil ? 'column' : 'row', gap: '1.25rem' }}>
              
              {/* COLUMNA IZQUIERDA: LISTA */}
              <aside style={{ 
                width: esMovil ? '100%' : '380px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                padding: '1rem', 
                maxHeight: '650px', 
                overflowY: 'auto',
                boxSizing: 'border-box'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  DOCUMENTOS DISPONIBLES: {documentosFiltrados.length}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {documentosFiltrados.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setDocSeleccionado(doc)}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem',
                        border: '1px solid',
                        borderColor: docSeleccionado && docSeleccionado.id === doc.id ? '#10b981' : '#f1f5f9',
                        backgroundColor: docSeleccionado && docSeleccionado.id === doc.id ? '#ecfdf5' : '#ffffff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        <span>{doc.lote}</span>
                        <span style={{ fontWeight: '600', color: '#059669' }}>{doc.tipo.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: docSeleccionado && docSeleccionado.id === doc.id ? '700' : '600', color: '#1e293b', lineHeight: '1.3' }}>
                        {doc.titulo}
                      </div>
                    </button>
                  ))}

                  {documentosFiltrados.length === 0 && (
                    <p style={{ padding: '1rem', color: '#94a3b8', textAlign: 'center', fontSize: '0.85rem' }}>
                      No hay resultados para esta búsqueda.
                    </p>
                  )}
                </div>
              </aside>

              {/* COLUMNA DERECHA: VISOR PRINCIPAL DE CONTENIDO */}
              <main style={{ 
                flex: 1, 
                backgroundColor: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                padding: esMovil ? '1rem' : '1.75rem', 
                minHeight: '500px', 
                maxHeight: '650px', 
                overflowY: 'auto',
                boxSizing: 'border-box'
              }}>
                {docSeleccionado ? (
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ backgroundColor: '#ecfdf5', color: '#047857', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {docSeleccionado.categoria}
                      </span>
                      <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                        {docSeleccionado.lote}
                      </span>
                    </div>

                    <h2 style={{ color: '#0f172a', margin: '0.5rem 0 1rem 0', fontSize: '1.35rem', lineHeight: '1.3' }}>
                      {docSeleccionado.titulo}
                    </h2>

                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '1rem 0' }} />

                    {/* VISTA DE FORMATO PDF */}
                    {docSeleccionado.tipo === 'pdf' && docSeleccionado.urlPdf && (
                      <div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                          <a 
                            href={docSeleccionado.urlPdf} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ padding: '0.5rem 1rem', backgroundColor: '#0284c7', color: '#ffffff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem' }}
                          >
                            🔗 Abrir PDF en pestaña
                          </a>
                          <a 
                            href={docSeleccionado.urlPdf} 
                            download
                            style={{ padding: '0.5rem 1rem', backgroundColor: '#059669', color: '#ffffff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.8rem' }}
                          >
                            ⬇️ Descargar PDF
                          </a>
                        </div>
                        <object 
                          data={docSeleccionado.urlPdf} 
                          type="application/pdf"
                          style={{ width: '100%', height: '450px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                        >
                          <p style={{ padding: '1rem', color: '#64748b' }}>Su navegador no permite visualizar el PDF. Utilice el botón de descarga superior.</p>
                        </object>
                      </div>
                    )}

                    {/* VISTA DE PODCAST O AUDIO */}
                    {docSeleccionado.tipo === 'audio' && docSeleccionado.urlAudio && (
                      <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#334155' }}>Reproductor de Audio:</p>
                        <audio controls style={{ width: '100%' }}>
                          <source src={docSeleccionado.urlAudio} type="audio/mpeg" />
                        </audio>
                      </div>
                    )}

                    {/* CONTENIDO TEXTUAL */}
                    {docSeleccionado.contenido && (
                      <div style={{ color: '#334155', lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>
                        {docSeleccionado.contenido}
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                    Seleccione un documento de la lista para leer su contenido.
                  </div>
                )}
              </main>

            </div>
          </div>
        )}

        {/* --- PESTAÑA: PODCAST & AUDIO --- */}
        {pestanaActiva === 'podcast' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>🎙️ Podcasts y Audio-Formación</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Episodios de formación radial y programas para comunidades rurales sin necesidad de lectura en pantalla.</p>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {documentos.filter(d => d.tipo === 'audio').map(pod => (
                <div key={pod.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{pod.titulo}</h4>
                  <audio controls style={{ width: '100%' }}>
                    <source src={pod.urlAudio} type="audio/mpeg" />
                  </audio>
                </div>
              ))}
              {documentos.filter(d => d.tipo === 'audio').length === 0 && (
                <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>Aún no se han cargado episodios de podcast. Los administradores pueden agregarlos desde el panel.</p>
              )}
            </div>
          </div>
        )}

        {/* --- PESTAÑA: SERVICIOS --- */}
        {pestanaActiva === 'servicios' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>Servicios y Asesorías Sociales</h3>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Fundaval ofrece acompañamiento institucional sin costo para comunidades campesinas y pesqueras.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
              {serviciosFundaval.map(s => (
                <div key={s.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>{s.icono}</span>
                  <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0', color: '#0f172a' }}>{s.titulo}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PESTAÑA: QUIÉNES SOMOS --- */}
        {pestanaActiva === 'nosotros' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 1rem 0' }}>Acerca de Fundaval</h3>
            <p style={{ lineHeight: '1.7', color: '#334155' }}>
              Fundaval es la Fundación para el Desarrollo Social, Campesino y de Emprendimiento asociada al portal Oriéntese. Nuestra misión es promover la educación comunitaria, defender los derechos sociales y dotar de herramientas técnicas y legales a comunidades campesinas y de pesca artesanal.
            </p>
            <h4 style={{ color: '#047857', marginTop: '1.5rem' }}>Nuestros Objetivos</h4>
            <ul style={{ lineHeight: '1.8', color: '#334155' }}>
              <li>Facilitar el acceso libre a documentación legal y formativa.</li>
              <li>Capacitar en proyectos productivos y sostenibles.</li>
              <li>Fomentar el emprendimiento social y comunitario.</li>
            </ul>
          </div>
        )}

        {/* --- PESTAÑA: CONTACTO --- */}
        {pestanaActiva === 'contacto' && (
          <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>Contacto y Consultas</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Escríbanos para solicitar capacitaciones comunitarias o asesoría en proyectos.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado correctamente a Fundaval!'); }} style={{ display: 'grid', gap: '1rem' }}>
              <input type="text" placeholder="Su Nombre o Nombre de la Comunidad" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="email" placeholder="Correo Electrónico de contacto" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <textarea rows="4" placeholder="¿En qué área requiere apoyo o asesoría?" required style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}></textarea>
              <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Enviar Consulta
              </button>
            </form>
          </div>
        )}

      </div>

      {/* FOOTER PÚBLICO */}
      <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '2rem 1rem', marginTop: '3rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>© {new Date().getFullYear()} FUNDAVAL - Módulo del Portal Oriéntese.</p>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Impulsando la formación y el desarrollo de comunidades rurales y agropecuarias.</p>
      </footer>

    </div>
  );
}
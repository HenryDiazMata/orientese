import React, { useState } from 'react';

export default function AdminPage({ 
  esMovil, 
  documentos, 
  setDocumentos, 
  serviciosFundaval, 
  setServiciosFundaval, 
  datosContacto, 
  setDatosContacto 
}) {
  const [seccionAdmin, setSeccionAdmin] = useState('documentos');

  // FORMULARIO DE DOCUMENTOS
  const [docTitulo, setDocTitulo] = useState('');
  const [docAno, setDocAno] = useState(new Date().getFullYear().toString());
  const [docTipo, setDocTipo] = useState('pdf');
  const [docUrl, setDocUrl] = useState('');
  const [docPeso, setDocPeso] = useState('1.5 MB');

  // FORMULARIO DE MULTIMEDIA
  const [mediaTitulo, setMediaTitulo] = useState('');
  const [mediaTipo, setMediaTipo] = useState('audio');
  const [mediaPlataforma, setMediaPlataforma] = useState('Spotify / YouTube');
  const [mediaUrl, setMediaUrl] = useState('');

  // FORMULARIO DE SERVICIOS
  const [srvTitulo, setSrvTitulo] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvIcono, setSrvIcono] = useState('🌱');

  // HANDLERS
  const handleAgregarDocumento = (e) => {
    e.preventDefault();
    if (!docTitulo.trim()) return;

    const nuevoDoc = {
      id: Date.now().toString(),
      titulo: docTitulo.toUpperCase(),
      categoria: docTipo === 'pdf' ? 'Documentos PDF' : 'Formación y Documentos',
      ano: docAno,
      peso: docPeso,
      tipo: docTipo,
      urlPdf: docTipo === 'pdf' ? docUrl : '',
      urlHtml: docTipo === 'documento' ? docUrl : ''
    };

    setDocumentos([nuevoDoc, ...documentos]);
    setDocTitulo('');
    setDocUrl('');
    alert('✅ Documento publicado con éxito.');
  };

  const handleAgregarMultimedia = (e) => {
    e.preventDefault();
    if (!mediaTitulo.trim() || !mediaUrl.trim()) return;

    const nuevoMedia = {
      id: Date.now().toString(),
      titulo: mediaTitulo.toUpperCase(),
      categoria: 'Multimedia Externa',
      ano: new Date().getFullYear().toString(),
      peso: 'Enlace',
      tipo: mediaTipo,
      urlAudio: mediaTipo === 'audio' ? mediaUrl : '',
      urlVideo: mediaTipo === 'video' ? mediaUrl : '',
      plataforma: mediaPlataforma
    };

    setDocumentos([nuevoMedia, ...documentos]);
    setMediaTitulo('');
    setMediaUrl('');
    alert('✅ Enlace registrado con éxito.');
  };

  const handleAgregarServicio = (e) => {
    e.preventDefault();
    if (!srvTitulo.trim()) return;

    const nuevoSrv = {
      id: Date.now(),
      titulo: srvTitulo.toUpperCase(),
      desc: srvDesc.toUpperCase(),
      icono: srvIcono
    };

    setServiciosFundaval([...serviciosFundaval, nuevoSrv]);
    setSrvTitulo('');
    setSrvDesc('');
    alert('✅ Servicio añadido con éxito.');
  };

  const handleGuardarContacto = (e) => {
    e.preventDefault();
    alert('✅ Datos de contacto actualizados.');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: esMovil ? '1.25rem' : '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
      
      {/* ENCABEZADO DEL PANEL DE ADMINISTRACIÓN */}
      <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: '0 0 0.25rem 0', color: '#0f172a', fontSize: '1.3rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🔒 Panel de Control e Inserción de Contenidos
        </h2>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>
          Seleccione la opción que desea actualizar en el sitio web:
        </p>
      </div>

      {/* BOTONES DE PESTAÑAS CLARAS */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
        {[
          { id: 'documentos', label: '📄 Cargar Documento / PDF' },
          { id: 'multimedia', label: '🎙️ Enlazar Podcast o Video' },
          { id: 'servicios', label: '💼 Modificar Servicios' },
          { id: 'contacto', label: '📞 Sede y Contacto' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setSeccionAdmin(btn.id)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid',
              borderColor: seccionAdmin === btn.id ? '#059669' : '#cbd5e1',
              backgroundColor: seccionAdmin === btn.id ? '#ecfdf5' : '#ffffff',
              color: seccionAdmin === btn.id ? '#047857' : '#475569',
              fontWeight: seccionAdmin === btn.id ? '700' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* OPCIÓN 1: SUBIR DOCUMENTO / PDF */}
      {seccionAdmin === 'documentos' && (
        <form onSubmit={handleAgregarDocumento} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
          <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
            Publicar un Nuevo Documento
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Título de la publicación:</label>
            <input 
              type="text" 
              placeholder="Ejemplo: INFORME SOBRE DESARROLLO AGRÍCOLA 2024" 
              value={docTitulo} 
              onChange={(e) => setDocTitulo(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Año de edición:</label>
              <input 
                type="number" 
                placeholder="2024" 
                value={docAno} 
                onChange={(e) => setDocAno(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Formato:</label>
              <select 
                value={docTipo} 
                onChange={(e) => setDocTipo(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
              >
                <option value="pdf">Documento PDF</option>
                <option value="documento">Artículo de Lectura</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Peso aprox.:</label>
              <input 
                type="text" 
                placeholder="Ej: 1.5 MB" 
                value={docPeso} 
                onChange={(e) => setDocPeso(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Enlace o URL del archivo en Internet:</label>
            <input 
              type="url" 
              placeholder="https://ejemplo.com/documento.pdf" 
              value={docUrl} 
              onChange={(e) => setDocUrl(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
            />
          </div>

          <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Guardar y Publicar Documento
          </button>
        </form>
      )}

      {/* OPCIÓN 2: PODCAST O VIDEO */}
      {seccionAdmin === 'multimedia' && (
        <form onSubmit={handleAgregarMultimedia} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
          <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.05rem', borderLeft: '4px solid #0284c7', paddingLeft: '0.5rem' }}>
            Registrar Enlace a Podcast o Video
          </h3>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Título del programa o episodio:</label>
            <input 
              type="text" 
              placeholder="Ejemplo: TALLER DE PESCA RESPONSABLE - EPISODIO 1" 
              value={mediaTitulo} 
              onChange={(e) => setMediaTitulo(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Tipo de recurso:</label>
              <select 
                value={mediaTipo} 
                onChange={(e) => setMediaTipo(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box', backgroundColor: '#ffffff' }}
              >
                <option value="audio">Podcast / Audio</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Plataforma externa:</label>
              <input 
                type="text" 
                placeholder="Spotify, YouTube, iVoox, etc." 
                value={mediaPlataforma} 
                onChange={(e) => setMediaPlataforma(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Enlace o Link del reproductor:</label>
            <input 
              type="url" 
              placeholder="https://youtube.com/watch?v=..." 
              value={mediaUrl} 
              onChange={(e) => setMediaUrl(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
            />
          </div>

          <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Guardar Enlace Multimedia
          </button>
        </form>
      )}

      {/* OPCIÓN 3: SERVICIOS */}
      {seccionAdmin === 'servicios' && (
        <form onSubmit={handleAgregarServicio} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
          <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
            Agregar Servicio o Capacitación
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 4fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Ícono:</label>
              <input 
                type="text" 
                placeholder="🌾" 
                value={srvIcono} 
                onChange={(e) => setSrvIcono(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1.2rem', textAlign: 'center', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Nombre del taller o área:</label>
              <input 
                type="text" 
                placeholder="Ejemplo: CURSO DE APICULTURA SUSTENTABLE" 
                value={srvTitulo} 
                onChange={(e) => setSrvTitulo(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Breve explicación del servicio:</label>
            <textarea 
              rows="3" 
              placeholder="Describa a quién va dirigido y en qué consiste..." 
              value={srvDesc} 
              onChange={(e) => setSrvDesc(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
            ></textarea>
          </div>

          <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Guardar Servicio
          </button>
        </form>
      )}

      {/* OPCIÓN 4: DATOS DE CONTACTO */}
      {seccionAdmin === 'contacto' && (
        <form onSubmit={handleGuardarContacto} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px' }}>
          <h3 style={{ margin: 0, color: '#047857', fontSize: '1.05rem', borderLeft: '4px solid #059669', paddingLeft: '0.5rem' }}>
            Actualizar Teléfonos y Dirección
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Teléfonos de contacto:</label>
              <input 
                type="text" 
                value={datosContacto.telefono} 
                onChange={(e) => setDatosContacto({ ...datosContacto, telefono: e.target.value })} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Correo electrónico público:</label>
              <input 
                type="email" 
                value={datosContacto.email} 
                onChange={(e) => setDatosContacto({ ...datosContacto, email: e.target.value })} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Dirección física de la institución:</label>
            <input 
              type="text" 
              value={datosContacto.direccion} 
              onChange={(e) => setDatosContacto({ ...datosContacto, direccion: e.target.value })} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} 
            />
          </div>

          <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
            Actualizar Datos Institucionales
          </button>
        </form>
      )}

    </div>
  );
}
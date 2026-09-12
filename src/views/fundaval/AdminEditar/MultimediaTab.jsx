import React, { useState } from 'react';

export default function MultimediaTab({ mostrarNotificacion, esMovil }) {
  const [mediaTitulo, setMediaTitulo] = useState('');
  const [mediaTipo, setMediaTipo] = useState('audio');
  const [mediaPlataforma, setMediaPlataforma] = useState('Spotify / YouTube / Blog');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mediaTitulo && mediaUrl) {
      mostrarNotificacion('✅ Contenido multimedia registrado.');
      setMediaTitulo('');
      setMediaUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem', maxWidth: '800px', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.05rem', borderLeft: '4px solid #0284c7', paddingLeft: '0.5rem' }}>
        🎙️ Registrar Enlace a Podcast, Video o Blog
      </h3>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Título:</label>
        <input type="text" value={mediaTitulo} onChange={(e) => setMediaTitulo(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: esMovil ? '1fr' : '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Tipo:</label>
          <select value={mediaTipo} onChange={(e) => setMediaTipo(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
            <option value="audio">Podcast / Audio</option>
            <option value="video">Video Externo</option>
            <option value="documento">Blog / Lectura</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Plataforma:</label>
          <input type="text" value={mediaPlataforma} onChange={(e) => setMediaPlataforma(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.3rem' }}>Enlace URL público:</label>
        <input type="url" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }} />
      </div>

      <button type="submit" style={{ padding: '0.85rem', backgroundColor: '#0284c7', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>
        Guardar Recurso Multimedia
      </button>
    </form>
  );
}
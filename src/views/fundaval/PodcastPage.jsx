import React from 'react';

export default function PodcastPage({ documentos }) {
  const podcasts = documentos.filter(d => d.tipo === 'audio');

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>🎙️ PODCASTS Y AUDIO-FORMACIÓN</h3>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>EPISODIOS DE FORMACIÓN RADIAL Y PROGRAMAS PARA COMUNIDADES RURALES SIN NECESIDAD DE LECTURA EN PANTALLA.</p>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {podcasts.map(pod => (
          <div key={pod.id} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{pod.titulo}</h4>
            <audio controls style={{ width: '100%' }}>
              <source src={pod.urlAudio} type="audio/mpeg" />
            </audio>
          </div>
        ))}

        {podcasts.length === 0 && (
          <p style={{ fontStyle: 'italic', color: '#94a3b8' }}>AÚN NO SE HAN CARGADO EPISODIOS DE PODCAST. LOS ADMINISTRADORES PUEDEN AGREGARLOS DESDE EL PANEL.</p>
        )}
      </div>
    </div>
  );
}
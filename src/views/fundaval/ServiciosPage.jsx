import React from 'react';

export default function ServiciosPage({ esMovil, serviciosFundaval }) {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 0.5rem 0' }}>SERVICIOS Y ASESORÍAS SOCIALES</h3>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>FUNDAVAL OFRECE ACOMPAÑAMIENTO INSTITUCIONAL SIN COSTO PARA COMUNIDADES CAMPESINAS Y PESQUERAS.</p>
      
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
  );
}
import React from 'react';

// VISTA PRINCIPAL QUE FUNCIONA COMO DIRECTORIO O HUB CENTRAL DE ORIÉNTESE
export default function HomePortal() {
  // LISTA DE SUBDOMINIOS REGISTRADOS CON SU INFORMACIÓN BÁSICA
  const subdominios = [
    { id: 'drones', nombre: 'Drones', desc: 'TECNOLOGÍA, NOTICIAS Y NORMATIVA DE VEHÍCULOS AÉREOS NO TRIPULADOS.' },
    { id: 'fundaval', nombre: 'Fundaval', desc: 'CONTENIDO DINÁMICO, PODCASTS, BLOGS Y VIDEOS AUTÓNOMOS.' },
    { id: 'ofertas', nombre: 'Ofertas', desc: 'OPORTUNIDADES, CLASIFICADOS Y COMERCIO LOCAL.' },
    { id: 'masoneria', nombre: 'Masonería', desc: 'SECCIONES HISTÓRICAS E INFORMACIÓN INSTITUCIONAL.' },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* ENCABEZADO PRINCIPAL DE LA PORTADA */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#111827' }}>
          Portal Central Oriéntese
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
          PLATAFORMA MODULAR Y RENOVADA DE COMUNICACIÓN E INFORMACIÓN.
        </p>
      </header>

      {/* SECCIÓN DE TARJETAS PARA EXPLORAR SUBDOMINIOS */}
      <main>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1f2937' }}>
          Explorar Subdominios
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* RECORRIDO DINÁMICO DEL ARREGLO DE SUBDOMINIOS */}
          {subdominios.map((sub) => (
            <div 
              key={sub.id} 
              style={{
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ marginTop: 0, color: '#2563eb' }}>{sub.nombre}</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {sub.desc}
                </p>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '1rem' }}>
                {sub.id}.orientese.com
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
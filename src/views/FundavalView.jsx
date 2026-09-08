import React from 'react';

// VISTA PRINCIPAL DEL SUBDOMINIO FUNDAVAL (MIGRACIÓN DESDE FRONTPAGE / HTML ESTÁTICO)
export default function FundavalView() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* ENCABEZADO DE FUNDAVAL */}
      <header style={{ 
        borderBottom: '2px solid #2563eb', 
        paddingBottom: '1rem', 
        marginBottom: '2rem', 
        textAlign: 'center' 
      }}>
        <h1 style={{ color: '#1e40af', fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          FUNDAVAL
        </h1>
        <p style={{ color: '#4b5563', fontSize: '1.1rem', margin: 0 }}>
          FUNDACIÓN Y CONTENIDO MULTIMEDIA, PODCASTS Y PUBLICACIONES
        </p>
      </header>

      {/* SECCIÓN PRINCIPAL DE CONTENIDOS Y ARTÍCULOS RESCATADOS */}
      <main>
        {/* BLOQUE DE BIENVENIDA / PRESENTACIÓN */}
        <section style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '1.5rem', 
          borderRadius: '8px', 
          marginBottom: '2rem' 
        }}>
          <h2 style={{ color: '#1f2937', marginTop: 0 }}>Bienvenido a Fundaval</h2>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>
            ESTA ES LA VERSIÓN MODERNA Y REESTRUCTURADA DEL PORTAL DE FUNDAVAL. 
            AQUÍ CONSOLIDAMOS LA INFORMACIÓN HISTÓRICA, LOS PROYECTOS SOCIALES, 
            LOS AUDIOS Y PUBLICACIONES DESTACADAS EN UN ENTORNO RÁPIDO Y MODULAR.
          </p>
        </section>

        {/* TARJETAS DE SECCIONES INTERNAS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {/* TARJETA 1: ARTÍCULOS Y PUBLICACIONES */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff' 
          }}>
            <h3 style={{ color: '#2563eb', marginTop: 0 }}>Publicaciones y Blogs</h3>
            <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
              RECOPILACIÓN DE ARTÍCULOS HISTÓRICOS Y DOCUMENTOS INFORMATIVOS DE LA FUNDACIÓN.
            </p>
          </div>

          {/* TARJETA 2: MULTIMEDIA Y PODCASTS */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            padding: '1.5rem', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff' 
          }}>
            <h3 style={{ color: '#2563eb', marginTop: 0 }}>Multimedia y Podcasts</h3>
            <p style={{ color: '#4b5563', fontSize: '0.95rem' }}>
              ACCESO A LOS AUDIOS Y VIDEOS PRODUCIDOS PARA LA DIFUSIÓN DE PROYECTOS.
            </p>
          </div>
        </div>
      </main>

      {/* PIE DE PÁGINA ESPECÍFICO DE FUNDAVAL */}
      <footer style={{ 
        marginTop: '3rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid #e5e7eb', 
        textAlign: 'center', 
        color: '#9ca3af', 
        fontSize: '0.85rem' 
      }}>
        <p>© ORIÉNTESE - MÓDULO DE FUNDAVAL</p>
      </footer>

    </div>
  );
}

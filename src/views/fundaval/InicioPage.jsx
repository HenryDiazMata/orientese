import React from 'react';

export default function InicioPage({ esMovil, documentos, serviciosFundaval, setDocSeleccionado, setPestanaActiva }) {
  return (
    <div>
      {/* HERO PRINCIPAL CON DEGRADADO DE AZUL (ARRIBA) A BLANCO (ABAJO) - EDITAR LA PROPIEDAD BACKGROUND */}
      <div style={{ 
        background: 'linear-gradient(to bottom, #0369a1 0%, #ffffff 100%)', 
        color: '#0f172a', 
        borderRadius: '16px', 
        padding: esMovil ? '2rem 1rem' : '3.5rem 2rem', 
        marginBottom: '2rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)', color: '#ffffff', padding: '0.35rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            PLATAFORMA SOCIAL Y EDUCATIVA
          </span>
          <h2 style={{ fontSize: esMovil ? '1.75rem' : '2.5rem', fontWeight: '800', margin: '1.25rem 0 0.75rem 0', lineHeight: '1.2', color: '#ffffff' }}>
            IMPULSANDO EL DESARROLLO CAMPESINO, ARTESANAL Y SOCIAL
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.6', marginBottom: '1.75rem', maxWidth: '750px', margin: '0 auto 1.75rem auto', fontWeight: '500' }}>
            ACCEDA A NUESTRO REPOSITORIO GRATUITO DE FORMACIÓN, DOCUMENTOS DE APOYO LEGAL Y PROYECTOS PRODUCTIVOS PARA PESCADORES, AGRICULTORES Y EMPRENDEDORES.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setPestanaActiva('documentos')}
              style={{ padding: '0.8rem 1.4rem', backgroundColor: '#0369a1', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              EXPLORAR DOCUMENTOS ({documentos.length})
            </button>
            <button 
              onClick={() => setPestanaActiva('servicios')}
              style={{ padding: '0.8rem 1.4rem', backgroundColor: '#ffffff', color: '#0369a1', border: '1px solid #0369a1', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              NUESTROS SERVICIOS
            </button>
          </div>
        </div>
      </div>

      {/* ÁREAS DE ACOMPAÑAMIENTO SOCIAL DESTACADAS */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginBottom: '1rem', borderLeft: '4px solid #0284c7', paddingLeft: '0.5rem' }}>
          ÁREAS DE ACOMPAÑAMIENTO SOCIAL
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

      {/* PUBLICACIONES MÁS RECIENTES */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#1e293b', margin: 0, borderLeft: '4px solid #0284c7', paddingLeft: '0.5rem' }}>
            PUBLICACIONES RECIENTES
          </h3>
          <button onClick={() => setPestanaActiva('documentos')} style={{ background: 'none', border: 'none', color: '#0284c7', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
            VER TODAS →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {documentos.slice(0, 3).map(doc => (
            <div key={doc.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
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
                LEER DOCUMENTO
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
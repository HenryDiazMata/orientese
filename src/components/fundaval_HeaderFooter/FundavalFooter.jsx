// IMPORTACIÓN DE REACT Y HOOK DE ESTADO
import React, { useState } from 'react';

export default function FundavalFooter({ onNavigate }) {
  // ESTADO PARA MANEJAR ERROR AL CARGAR EL LOGO
  const [errorLogo, setErrorLogo] = useState(false);

  // FUNCIÓN DE RETORNO AL PORTAL PRINCIPAL
  const handleVolverOrientese = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    // CONTENEDOR PRINCIPAL DEL FOOTER DE FUNDAVAL
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '2.5rem 1rem 1.5rem 1rem',
      marginTop: 'auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        textAlign: 'left'
      }}>
        
        {/* COLUMNA 1: INFORMACIÓN INSTITUCIONAL DE FUNDAVAL */}
        <div>
          <h3 style={{ color: '#ffffff', margin: '0 0 0.75rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
            FUNDAVAL
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.6', color: '#cbd5e1' }}>
            Plataforma especializada en contenido formativo, documentos de apoyo, podcasts y asesoría social comunitaria para Venezuela y América Latina.
          </p>
          <p> Dirección: Calle tal, Edf cual, Urb: equis, #000. Teléfonos: xx xx xxx xxxx E-Mail: </p>

        </div>

        {/* COLUMNA 2: ENLACES RÁPIDOS DE NAVEGACIÓN INTERNA */}
        <div>
          <h4 style={{ color: '#ffffff', margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 'bold' }}>
            SECCIONES
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', lineHeight: '2' }}>
            <li onClick={() => onNavigate && onNavigate('inicio')} style={{ cursor: 'pointer', color: '#93c5fd' }}>
              • Inicio Fundaval
            </li>
            <li onClick={() => onNavigate && onNavigate('documentos')} style={{ cursor: 'pointer', color: '#93c5fd' }}>
              • Documentos y Publicaciones
            </li>
            <li onClick={() => onNavigate && onNavigate('podcast')} style={{ cursor: 'pointer', color: '#93c5fd' }}>
              • Podcasts y Audio
            </li>
            <li onClick={() => onNavigate && onNavigate('servicios')} style={{ cursor: 'pointer', color: '#93c5fd' }}>
              • Servicios y Asesorías
            </li>
          </ul>
        </div>

        {/* COLUMNA 3: BOTÓN BLANCO CON TEXTO OSCURO Y LOGO */}
        <div>
          <h4 style={{ color: '#ffffff', margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: 'bold' }}>
            RED ORIENTESE
          </h4>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
            Fundaval forma parte del ecosistema digital de orientese.com.
          </p>
          
          {/* BOTÓN CON FONDO BLANCO Y TEXTO AZUL OSCURO/NEGRO */}
          <button 
            onClick={handleVolverOrientese}
            style={{
              backgroundColor: '#ffffff', // CAMBIADO A BLANCO
              color: '#0f172a',           // CAMBIADO A OSCURO PARA LEER EL TEXTO
              border: '1px solid #cbd5e1',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }}
          >
            <span>← VOLVER A</span>
            
            {!errorLogo ? (
              <img 
                src="/logos/orientese/logorientc2018Azul01.gif" 
                alt="Orientese" 
                style={{ height: '26px', objectFit: 'contain' }}
                onError={() => setErrorLogo(true)}
              />
            ) : (
              <span style={{ color: '#0284c7', fontWeight: '900' }}>
                ORIENTESE
              </span>
            )}
          </button>
        </div>

      </div>

      {/* BARRA INFERIOR DE DERECHOS DE AUTOR */}
      <div style={{
        maxWidth: '1280px',
        margin: '2rem auto 0 auto',
        paddingTop: '1rem',
        borderTop: '1px solid #1e293b',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        © {new Date().getFullYear()} FUNDAVAL. Todos los derechos reservados.
      </div>
    </footer>
  );
}
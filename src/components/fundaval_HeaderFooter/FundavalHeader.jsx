import React from 'react';

// RUTA RELATIVA AL LOGOTIPO EN LA CARPETA PUBLIC
const RUTA_LOGO_FUNDAVAL = '/subdominios/fundaval.orientese.com/imagenes/FUNDAVAL_ALP_imagotipo_01.jpg';

// CONSTANTE DE CONTROL PARA EL TAMAÑO DEL LOGOTIPO (EDITAR ESTAS MEDIDAS AQUÍ PARA AJUSTAR TAMAÑO)
const TAMANO_LOGO = {
  MIN_ALTO: '100px',   // TAMAÑO EN PANTALLAS PEQUEÑAS / MÓVILES
  IDEAL_ALTO: '18vw',  // TAMAÑO ESCALABLE SEGÚN ANCHO DE PANTALLA (VALOR RESPONSIVO)
  MAX_ALTO: '225px'   // TAMAÑO MÁXIMO EN PANTALLAS GRANDES / LAPTOPS
};

export default function FundavalHeader({ 
  pestanaActiva, 
  setPestanaActiva, 
  modoAdmin, 
  setModoAdmin, 
  totalDocumentos 
}) {
  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10, padding: '1rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        
        {/* CONTENEDOR DEL LOGOTIPO COMPLETA Y PERFECTAMENTE CENTRADO Y SIN BORDES ALREDEDOR */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            cursor: 'pointer', 
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            boxShadow: 'none'
          }} 
          onClick={() => setPestanaActiva('inicio')}
        >
          <img 
            src={RUTA_LOGO_FUNDAVAL} 
            alt="FUNDAVAL - Fundación para el Desarrollo Social" 
            style={{ 
              height: `clamp(${TAMANO_LOGO.MIN_ALTO}, ${TAMANO_LOGO.IDEAL_ALTO}, ${TAMANO_LOGO.MAX_ALTO})`,
              width: 'auto', 
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
              border: 'none',
              outline: 'none'
            }}
            onError={(e) => {
              // FALLBACK EN CASO DE ERROR AL CARGAR LA IMAGEN
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* MENÚ DE NAVEGACIÓN PRINCIPAL CON OPCIÓN ADMINISTRATIVA A LA DERECHA */}
        <nav style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          {[
            { id: 'inicio', label: 'INICIO' },
            { id: 'documentos', label: `DOCUMENTOS (${totalDocumentos})` },
            { id: 'podcast', label: 'PODCASTS & AUDIO' },
            { id: 'servicios', label: 'SERVICIOS' },
            { id: 'nosotros', label: 'QUIÉNES SOMOS' },
            { id: 'contacto', label: 'CONTACTO' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setPestanaActiva(tab.id)}
              style={{
                padding: '0.6rem 1rem',
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

          {/* BOTÓN DEL ÁREA ADMINISTRATIVA INTEGRADO A LA DERECHA DEL MENÚ CON RESALTADO EN VERDE ESMERALDA */}
          <button 
            onClick={() => setModoAdmin(!modoAdmin)}
            style={{ 
              padding: '0.6rem 1rem', 
              backgroundColor: modoAdmin ? '#dc2626' : '#059669', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontSize: '0.85rem',
              fontWeight: 'bold',
              marginLeft: '0.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {modoAdmin ? '✕ CERRAR ADMIN' : '🔒 ÁREA ADMIN'}
          </button>
        </nav>
      </div>
    </header>
  );
}
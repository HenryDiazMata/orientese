import React from 'react';

// RUTA RELATIVA AL LOGOTIPO DE ORIÉNTESE
const RUTA_LOGO_ORIENTESE = '/logos/orientese/VariosColores/logo orientese 2018.GIF';

export default function FundavalFooter({ onNavigate }) {
  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '2rem 1rem', marginTop: '3rem', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        
        {/* TEXTO EN MINÚSCULAS DE PERTENENCIA A LA RED DE SUBDOMINIOS */}
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
          fundaval.orientese.com forma parte de la red de subdominios orientese.com
        </p>

        {/* ENLACE Y LOGOTIPO DE VOLVER A ORIENTESE.COM */}
        {onNavigate && (
          <button 
            onClick={() => onNavigate('main')}
            style={{ 
              background: '#f8fafc', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px',
              padding: '0.5rem 1rem', 
              color: '#0f172a', 
              cursor: 'pointer', 
              fontSize: '0.85rem', 
              fontWeight: 'bold', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.6rem',
              transition: 'all 0.15s ease'
            }}
          >
            <img 
              src={RUTA_LOGO_ORIENTESE} 
              alt="Logotipo orientese.com" 
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span>volver a orientese.com</span>
          </button>
        )}

        {/* DERECHOS RESERVADOS */}
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
          © {new Date().getFullYear()} FUNDAVAL. Impulsando la formación y el desarrollo de comunidades rurales y agropecuarias. Asesoría Venezuela y América Latina.
        </p>
      </div>
    </footer>
  );
}
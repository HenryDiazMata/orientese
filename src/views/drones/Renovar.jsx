// ==========================================
// ARCHIVO COMPLETO: src/views/drones/Renovar.jsx
// RENOVAR = ACCESO A REGISTRO Y A PLANES
// ORDEN: LOGO → TITULO IZQUIERDA → CARD → CTA
// VIÑETAS CON FAVICON DRONES DENTRO DEL CARD
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

// ==========================================
// LEYENDAS FIJAS. NO INVENTAR PRECIOS AQUI.
// TEXTOS = t('inicio.frasePago') / t('inicio.fraseInformativo')
// ==========================================
const FRASE_PAGO_FALLBACK =
  'Los PLANES PLUS, PRO o ÉLITE se pagan completos al ACTIVAR el que a bien haya escogido, a más tardar el 31 de diciembre de 2026. A partir del 1 de enero de 2027 se paga totalmente al momento de ACTIVARLO. Crearse una cuenta en REGISTRARSE con algún tipo de usuario no implica tomar un PLAN. INICIANTE no es plan: se paga al REGISTRARSE. Las cuotas de una tarjeta internacional las fija su banco, no drones.orientese.com.';

const FRASE_INFORMATIVO_FALLBACK =
  'Este site drones.orientese.com ofrece solo un servicio informativo. No vende drones ni piezas ni accesorios. Solo damos un servicio informativo. Cualquier anuncio publicado es de exclusiva responsabilidad del usuario.';

// ==========================================
// LOGO = HEADER. FAVICON = VIÑETAS
// ==========================================
const LOGO_DRONES = '/logos/drones/LogoDrones11.png';
const FAVICON_DRONES = '/favicon/drones/favicom.png';

// ==========================================
// TAMAÑO Y ALINEACION DEL LOGO — EDITAR AQUI
// LOGO_ANCHO: PIXELES. SUBIR (280) O BAJAR (160)
// LOGO_ALINEA: 'center' | 'left' | 'right'
// LOGO_ANCHO_PCT: ANCHO RELATIVO DENTRO DE LA COLUMNA
// ==========================================
const LOGO_ANCHO = 450;
const LOGO_ALINEA = 'center';
const LOGO_ANCHO_PCT = '70%';

const logoWrap = {
  textAlign: LOGO_ALINEA,
  margin: '0 0 1.25rem',
};

const logoImg = {
  maxWidth: LOGO_ANCHO,
  width: LOGO_ANCHO_PCT,
  height: 'auto',
};

// ==========================================
// PALETA DRONES. SIN DARK
// ==========================================
const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';

// ==========================================
// FONDO DE LA VISTA (DEGRADADO SUAVE)
// ==========================================
const wrap = {
  background: `linear-gradient(180deg, ${CIEL} 0%, ${CIEL_CLARO} 42%, ${CIEL_MAS_CLARO} 100%)`,
  padding: '1.25rem 1.5rem 2rem',
  color: '#123',
  minHeight: '100%',
};

// ==========================================
// COLUMNA AL 80% DEL MAIN, CENTRADA
// ==========================================
const col = {
  width: '80%',
  maxWidth: '80%',
  margin: '0 auto',
};

// ==========================================
// TITULO = MISMA NORMA QUE ACTIVAR (H1 AZUL, IZQUIERDA)
// ==========================================
const titulo = {
  color: AZUL,
  marginTop: 0,
  marginBottom: '1rem',
  textAlign: 'left',
  fontWeight: 700,
};

// ==========================================
// CARD BLANCA CON BORDE AZUL
// ==========================================
const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
  marginBottom: '1rem',
};

// ==========================================
// BOTONES CTA
// ==========================================
const btn = {
  background: AZUL,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.6rem 1rem',
  cursor: 'pointer',
  fontWeight: 700,
};

// ==========================================
// LISTA SIN NUMEROS. ICONO + TEXTO
// ==========================================
const lista = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const item = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.55rem',
  marginBottom: '0.65rem',
};

// ==========================================
// TAMAÑO DEL FAVICON EN VIÑETA (18 PX)
// ==========================================
const ico = {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: 3,
  objectFit: 'contain',
};

// ==========================================
// UNA LINEA CON FAVICON
// ==========================================
function Viñeta({ children }) {
  return (
    <li style={item}>
      <img src={FAVICON_DRONES} alt="" style={ico} />
      <span>{children}</span>
    </li>
  );
}

export default function Renovar({ setCurrentView }) {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  // ==========================================
  // NECESITA setCurrentView DESDE DronesView
  // DESTINOS: CADASTRO + PLANES (NO CAMBIAR)
  // ==========================================
  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={wrap}>
      <div style={col}>
        {/* ==========================================
            1) LOGO. TAMAÑO Y ALINEA = CONST ARRIBA
            ========================================== */}
        <div style={logoWrap}>
          <img src={LOGO_DRONES} alt="drones.orientese.com" style={logoImg} />
        </div>

        {/* ==========================================
            2) TITULO A LA IZQUIERDA, ENCIMA DEL CARD
            ========================================== */}
        <h1 style={titulo}>{t('renovar.h1', { defaultValue: 'RENOVAR' })}</h1>

        {/* ==========================================
            3) CARD: DOS LEYENDAS CON FAVICON
            ========================================== */}
        <section style={box}>
          <ul style={lista}>
            <Viñeta>
              {t('inicio.frasePago', { defaultValue: FRASE_PAGO_FALLBACK })}
            </Viñeta>
            <li style={{ ...item, marginBottom: 0 }}>
              <img src={FAVICON_DRONES} alt="" style={ico} />
              <span>
                {t('inicio.fraseInformativo', {
                  defaultValue: FRASE_INFORMATIVO_FALLBACK,
                })}
              </span>
            </li>
          </ul>
        </section>

        {/* ==========================================
            4) CTA DEBAJO DEL CARD
            CADASTRO = ALTA USUARIO. PLANES = VER PLANES
            ========================================== */}
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          <button type="button" style={btn} onClick={() => ir('CADASTRO')}>
            {t('renovar.ctaRegistro', {
              defaultValue: 'REGISTRARSE COMO USUARIO',
            })}
          </button>
          <button type="button" style={btn} onClick={() => ir('PLANES')}>
            {t('renovar.ctaPlanes', { defaultValue: 'PLANES' })}
          </button>
        </div>
      </div>
    </div>
  );
}
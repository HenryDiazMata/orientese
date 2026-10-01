// ==========================================
// ARCHIVO COMPLETO: src/views/drones/comunidad.jsx
// NORMAS BASICAS. SE COMPLETAN / EDITAN DESPUES.
// TEXTO = JSON comunidad.* (pt-BR / es / en)
//   src/locales/drones/pt-BR.json  clave "comunidad"
//   src/locales/drones/es.json     clave "comunidad"
//   src/locales/drones/en.json     clave "comunidad"
// NO EDITES FRASES AQUI. EDITA EL JSON.
// ABAJO: EDITA AQUI = COLOR, ANCHO, ALINEACION, MARGEN.
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';

// EDITA AQUI: FONDO DE LA VISTA
const wrap = {
  background: `linear-gradient(180deg, ${CIEL} 0%, ${CIEL_CLARO} 42%, ${CIEL_MAS_CLARO} 100%)`,
  padding: '1.25rem 1.5rem 2rem',
  color: '#123',
  minHeight: '100%',
};

// EDITA AQUI: ANCHO DE COLUMNA (AHORA 80%)
const col = {
  width: '80%',
  maxWidth: '80%',
  margin: '0 auto',
};

// EDITA AQUI: CARD (FONDO, BORDE, RADIO, PADDING)
const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
};

// EDITA AQUI: H1 (COLOR, ALINEACION, TAMANO, MARGEN)
const h1Style = {
  color: AZUL,
  marginTop: 0,
  textAlign: 'left',
  fontSize: '1.6rem',
};

// EDITA AQUI: PARRAFOS (ALINEACION, INTERLINEADO, MARGEN)
const pStyle = {
  textAlign: 'left',
  lineHeight: 1.55,
  margin: '0 0 0.85rem',
};

export default function Comunidad() {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  return (
    <div style={wrap}>
      <div style={col}>
        <h1 style={h1Style}>{t('comunidad.h1')}</h1>
        <section style={box}>
          <p style={{ ...pStyle, fontWeight: 700 }}>{t('comunidad.aviso')}</p>
          <p style={pStyle}>{t('comunidad.p1')}</p>
          <p style={pStyle}>{t('comunidad.p2')}</p>
          <p style={pStyle}>{t('comunidad.p3')}</p>
          <p style={pStyle}>{t('comunidad.p4')}</p>
          <p style={pStyle}>{t('comunidad.p5')}</p>
          <p style={pStyle}>{t('comunidad.p6')}</p>
          <p style={pStyle}>{t('comunidad.p7')}</p>
          <p style={{ ...pStyle, marginBottom: 0 }}>{t('comunidad.p8')}</p>
        </section>
      </div>
    </div>
  );
}
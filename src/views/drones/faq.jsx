// ==========================================
// ARCHIVO COMPLETO: src/views/drones/faq.jsx
// FAQ BASICO + BETA. SE COMPLETA / EDITA DESPUES.
// TEXTO = JSON faq.q1/a1 ... faq.q8/a8
//   src/locales/drones/pt-BR.json  clave "faq"
//   src/locales/drones/es.json     clave "faq"
//   src/locales/drones/en.json     clave "faq"
// PARA AGREGAR PREGUNTA 9: JSON faq.q9 + faq.a9 Y UNA FILA MAS ABAJO.
// NO EDITES FRASES AQUI. EDITA EL JSON.
// ABAJO: EDITA AQUI = COLOR, ANCHO, ALINEACION.
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';

// EDITA AQUI: FONDO
const wrap = {
  background: `linear-gradient(180deg, ${CIEL} 0%, ${CIEL_CLARO} 42%, ${CIEL_MAS_CLARO} 100%)`,
  padding: '1.25rem 1.5rem 2rem',
  color: '#123',
  minHeight: '100%',
};

// EDITA AQUI: ANCHO
const col = {
  width: '80%',
  maxWidth: '80%',
  margin: '0 auto',
};

// EDITA AQUI: CARD
const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
};

// EDITA AQUI: H1
const h1Style = {
  color: AZUL,
  marginTop: 0,
  textAlign: 'left',
  fontSize: '1.6rem',
};

// EDITA AQUI: PREGUNTA
const qStyle = {
  textAlign: 'left',
  fontWeight: 700,
  margin: '0.85rem 0 0.25rem',
};

// EDITA AQUI: RESPUESTA
const aStyle = {
  textAlign: 'left',
  lineHeight: 1.55,
  margin: '0 0 0.35rem',
};

export default function Faq() {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  return (
    <div style={wrap}>
      <div style={col}>
        <h1 style={h1Style}>{t('faq.h1')}</h1>
        <section style={box}>
          <p style={qStyle}>{t('faq.q1')}</p>
          <p style={aStyle}>{t('faq.a1')}</p>
          <p style={qStyle}>{t('faq.q2')}</p>
          <p style={aStyle}>{t('faq.a2')}</p>
          <p style={qStyle}>{t('faq.q3')}</p>
          <p style={aStyle}>{t('faq.a3')}</p>
          <p style={qStyle}>{t('faq.q4')}</p>
          <p style={aStyle}>{t('faq.a4')}</p>
          <p style={qStyle}>{t('faq.q5')}</p>
          <p style={aStyle}>{t('faq.a5')}</p>
          <p style={qStyle}>{t('faq.q6')}</p>
          <p style={aStyle}>{t('faq.a6')}</p>
          <p style={qStyle}>{t('faq.q7')}</p>
          <p style={aStyle}>{t('faq.a7')}</p>
          <p style={qStyle}>{t('faq.q8')}</p>
          <p style={{ ...aStyle, marginBottom: 0 }}>{t('faq.a8')}</p>
        </section>
      </div>
    </div>
  );
}

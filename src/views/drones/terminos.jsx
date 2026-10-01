// ==========================================
// ARCHIVO COMPLETO: src/views/drones/terminos.jsx
// TERMINOS CORTOS. NO ES DICTAMEN JURIDICO.
// I18N: terminos.*
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';

const wrap = {
  background: `linear-gradient(180deg, ${CIEL} 0%, ${CIEL_CLARO} 42%, ${CIEL_MAS_CLARO} 100%)`,
  padding: '1.25rem 1.5rem 2rem',
  color: '#123',
  minHeight: '100%',
};

const col = {
  width: '80%',
  maxWidth: '80%',
  margin: '0 auto',
};

const box = {
  background: '#fff',
  border: `1px solid ${AZUL}`,
  borderRadius: 12,
  padding: '1rem 1.15rem',
};

export default function Terminos() {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  return (
    <div style={wrap}>
      <div style={col}>
        <h1 style={{ color: AZUL, marginTop: 0 }}>{t('terminos.h1')}</h1>
        <section style={box}>
          <p style={{ fontWeight: 700 }}>{t('terminos.aviso')}</p>
          <p>{t('terminos.p1')}</p>
          <p>{t('terminos.p2')}</p>
          <p>{t('terminos.p3')}</p>
          <p>{t('terminos.p4')}</p>
          <p>{t('terminos.p5')}</p>
          <p style={{ marginBottom: 0 }}>{t('terminos.p6')}</p>
        </section>
      </div>
    </div>
  );
}

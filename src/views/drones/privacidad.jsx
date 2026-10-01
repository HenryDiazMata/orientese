// ==========================================
// ARCHIVO COMPLETO: src/views/drones/privacidad.jsx
// PRIVACIDAD CORTA. NO ES DICTAMEN JURIDICO.
// DATOS DE CADASTRO = OPERAR EL HUB. NO SE VENDEN.
// I18N: privacidad.*
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

export default function Privacidad() {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  return (
    <div style={wrap}>
      <div style={col}>
        <h1 style={{ color: AZUL, marginTop: 0 }}>{t('privacidad.h1')}</h1>
        <section style={box}>
          <p style={{ fontWeight: 700 }}>{t('privacidad.aviso')}</p>
          <p>{t('privacidad.p1')}</p>
          <p>{t('privacidad.p2')}</p>
          <p>{t('privacidad.p3')}</p>
          <p>{t('privacidad.p4')}</p>
          <p style={{ marginBottom: 0 }}>{t('privacidad.p5')}</p>
        </section>
      </div>
    </div>
  );
}
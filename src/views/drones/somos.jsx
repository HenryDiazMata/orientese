// ==========================================
// ARCHIVO COMPLETO: src/views/drones/somos.jsx
// HUB INFORMATIVO. SIN LLC. SIN MENSALIDADE.
// E-MAIL SOLO COMO ENLACE. VIÑETAS = FAVICON DRONES
// TEXTO = somos.* EN JSON
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

const CIEL = '#BFE8F7';
const CIEL_CLARO = '#D7F1FA';
const CIEL_MAS_CLARO = '#EAF7FC';
const AZUL = '#1A8FD0';
const FAVICON_DRONES = '/favicon/drones/favicon.png';

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

const lista = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const item = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.55rem',
  marginBottom: '0.75rem',
};

const ico = {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: 3,
  objectFit: 'contain',
};

const mail = {
  color: AZUL,
  fontWeight: 700,
  textDecoration: 'underline',
};

function Viñeta({ children }) {
  return (
    <li style={item}>
      <img src={FAVICON_DRONES} alt="" style={ico} />
      <span>{children}</span>
    </li>
  );
}

export default function Somos() {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  return (
    <div style={wrap}>
      <div style={col}>
        <h1 style={{ color: AZUL, marginTop: 0 }}>{t('somos.h1')}</h1>
        <section style={box}>
          <ul style={lista}>
            <Viñeta>{t('somos.p1')}</Viñeta>
            <Viñeta>{t('somos.p2')}</Viñeta>
            <Viñeta>
              {t('somos.p3')}{' '}
              <a href="mailto:contacto@drones.orientese.com" style={mail}>
                contacto@drones.orientese.com
              </a>
            </Viñeta>
            <Viñeta>{t('somos.p5')}</Viñeta>
            <Viñeta>{t('somos.p6')}</Viñeta>
            <Viñeta>{t('somos.p7')}</Viñeta>
            <Viñeta>{t('somos.p8')}</Viñeta>
            <Viñeta>{t('somos.p9')}</Viñeta>
            <Viñeta>{t('somos.p10')}</Viñeta>
            <Viñeta>{t('somos.p11')}</Viñeta>
          </ul>
        </section>
      </div>
    </div>
  );
}

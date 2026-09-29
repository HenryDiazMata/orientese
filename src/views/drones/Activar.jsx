// ==========================================
// ARCHIVO COMPLETO: src/views/drones/Activar.jsx
// ACTIVAR = GRATUIDAD OCT–DIC 2026
// NO ES RENOVACION. NO ES CHECKOUT (ESO VA EN OTRA TANDA).
// CARDS AL 80% DEL MAIN. FONDO CIELO SUAVE.
// VIÑETAS CON FAVICON DRONES. LINKS ACTIVA → PLANES.
// I18N: TEXTOS VIA i18nDrones (activar.* + inicio.frasePago + inicio.fraseInformativo)
// NO METER ESTOS STRINGS EN cadastro.json
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS PARA EDICIONES FUTURAS.
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../../components/drones/i18n';

// ==========================================
// LEYENDAS FIJAS. NO INVENTAR PRECIOS AQUI.
// AHORA SALEN DE JSON: inicio.frasePago / inicio.fraseInformativo
// ==========================================

// ==========================================
// FAVICON PUBLICO DE DRONES (VIÑETAS)
// SI NO SE VE: CAMBIAR PATH O PASAR A GUIONES
// ==========================================
const FAVICON_DRONES = '/favicon/drones/favicon.png';

// ==========================================
// PALETA DRONES. SIN DARK
// CIELO OFICIAL + FONDO MAS CLARO (SOSIEGO)
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
// BOTONES CTA → HOY VAN A PLANES
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
// ENLACE EN TEXTO (PALABRA ACTIVA / ACTIVAR)
// ES BUTTON PARA NO ROMPER EL ROUTER INTERNO
// ==========================================
const linkBtn = {
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  color: AZUL,
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'underline',
  font: 'inherit',
};

// ==========================================
// LISTA SIN NUMEROS. ICONO + TEXTO
// ==========================================
const lista = {
  listStyle: 'none',
  margin: '0.35rem 0 0',
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
// SUBIR A 20–22 SI SE VE CHICO
// ==========================================
const ico = {
  width: 18,
  height: 18,
  flexShrink: 0,
  marginTop: 3,
  objectFit: 'contain',
};

// ==========================================
// UNA LINEA CON FAVICON. NO NUMERAR
// ==========================================
function Viñeta({ children }) {
  return (
    <li style={item}>
      <img src={FAVICON_DRONES} alt="" style={ico} />
      <span>{children}</span>
    </li>
  );
}

export default function Activar({ setCurrentView }) {
  // ==========================================
  // I18N DRONES (MISMO PATRON QUE Header)
  // ==========================================
  const { t } = useTranslation(undefined, { i18n: i18nDrones });

  // ==========================================
  // CAMBIA LA VISTA DEL ORQUESTADOR Y SUBE AL TOPE
  // ==========================================
  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==========================================
  // DESTINO TEMPORAL: PLANES
  // CUANDO EXISTA CONFIRMAR/CHECKOUT, CAMBIAR EL ID
  // ==========================================
  const LinkActiva = ({ children }) => (
    <button type="button" style={linkBtn} onClick={() => ir('PLANES')}>
      {children}
    </button>
  );

  return (
    <div style={wrap}>
      <div style={col}>
        {/* ==========================================
            TITULO DE LA VISTA
            ========================================== */}
        <h1 style={{ color: AZUL, marginTop: 0 }}>{t('activar.h1')}</h1>

        {/* ==========================================
            CARD 1: GANCHO + PRUEBA BETA + BOLSAS
            4 VIÑETAS
            ========================================== */}
        <section style={box}>
          <p style={{ marginTop: 0, fontWeight: 700 }}>
            {t('activar.leadAntes')}
            <LinkActiva>{t('activar.palabraActiva')}</LinkActiva>
            {t('activar.leadDespues')}
          </p>
          <ul style={lista}>
            <Viñeta>{t('activar.v.beta')}</Viñeta>
            <Viñeta>{t('activar.v.simulador')}</Viñeta>
            <Viñeta>
              {t('activar.v.hasta31Antes')}
              <LinkActiva>{t('activar.palabraActivar')}</LinkActiva>
              {t('activar.v.hasta31Despues')}
            </Viñeta>
            <Viñeta>{t('activar.v.pagoEtapa')}</Viñeta>
          </ul>
        </section>

        {/* ==========================================
            CARD 2: REGLAS, CUPOS, ETAPAS, DESCUENTOS
            ETAPA 1 INICIA 1 ENE 2027 (NO 2026)
            14 VIÑETAS
            ========================================== */}
        <section style={box}>
          <ul style={{ ...lista, marginTop: 0 }}>
            <Viñeta>
              {t('activar.v.fechaUtcAntes')}
              <LinkActiva>{t('activar.palabraActivar')}</LinkActiva>
              {t('activar.v.fechaUtcDespues')}
            </Viñeta>
            <Viñeta>{t('activar.v.vigencia365')}</Viñeta>
            <Viñeta>{t('activar.v.extras')}</Viñeta>
            <Viñeta>{t('activar.v.descuento1800')}</Viñeta>
            <Viñeta>{t('activar.v.promo30')}</Viñeta>
            <Viñeta>{t('activar.v.tarifaAno')}</Viñeta>
            <Viñeta>{t('activar.v.cambioPlan')}</Viñeta>
            <Viñeta>{t('activar.v.porEtapas')}</Viñeta>
            <Viñeta>{t('activar.v.plusProElite')}</Viñeta>
            <Viñeta>{t('activar.v.octDic')}</Viñeta>
            <Viñeta>{t('activar.v.etapa1')}</Viñeta>
            <Viñeta>{t('activar.v.etapa2y3')}</Viñeta>
            <Viñeta>{t('activar.v.reservaPaises')}</Viñeta>
            <Viñeta>
              <LinkActiva>{t('activar.palabraActiva')}</LinkActiva>
              {t('activar.v.cierreDespues')}
            </Viñeta>
          </ul>
        </section>

        {/* ==========================================
            CARD 3: PAGO INTEGRO + LEYENDA INFORMATIVA
            ========================================== */}
        <section style={box}>
          <p style={{ marginTop: 0 }}>{t('inicio.frasePago')}</p>
          <p style={{ marginBottom: 0 }}>{t('inicio.fraseInformativo')}</p>
        </section>

        {/* ==========================================
            CTA. MISMO DESTINO TEMPORAL: PLANES
            ========================================== */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button type="button" style={btn} onClick={() => ir('PLANES')}>
            {t('activar.ctaPlan')}
          </button>
          <button type="button" style={btn} onClick={() => ir('PLANES')}>
            {t('activar.ctaSubir')}
          </button>
        </div>
      </div>
    </div>
  );
}
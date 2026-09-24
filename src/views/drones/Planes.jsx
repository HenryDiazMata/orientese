// ==========================================
// ARCHIVO: src/views/drones/Planes.jsx
// VISTA PLANES — NIVELES, PRECIOS DE ETAPA, BENEFICIOS, FRASE DE PAGO, CTAS
// SIN PASARELA. SIN LOGICA DE COBRO. SIN DARK.
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import './css/planes.css';

// ==========================================
// IDS INTERNOS DE CADA CARD (NO TRADUCIR)
// ==========================================
const IDS_PLAN = ['visitante', 'iniciante', 'plus', 'pro', 'elite'];

export default function Planes({ setCurrentView }) {
  const { t } = useTranslation();

  // ==========================================
  // NAVEGACION: CADASTRO ES EL ID DE VISTA (ES=REGISTRO / PT=CADASTRO)
  // ==========================================
  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="drones-planes-page">
      {/* ==========================================
          ANCHO 80 %: CLASE .drones-planes-wrap EN planes.css
          ========================================== */}
      <div className="drones-planes-wrap">

        {/* ========== TITULO + FRASE OBLIGATORIA DE PAGO ========== */}
        <header className="drones-planes-head">
          <h1 className="drones-planes-h1">{t('planes.h1')}</h1>
          <p className="drones-planes-frase">{t('planes.frasePago')}</p>
        </header>

        {/* ========== BLOQUE INTRODUCCION / CALENDARIO ========== */}
        <section className="drones-planes-bloque">
          <p className="drones-planes-p">{t('planes.intro1')}</p>
          <p className="drones-planes-p drones-planes-p-last">{t('planes.intro2')}</p>
        </section>

        {/* ========== GRILLA DE CARDS ========== */}
        <div className="drones-planes-grid">
          {IDS_PLAN.map((id) => {
            const puntos = t(`planes.${id}.puntos`, { returnObjects: true });
            const lista = Array.isArray(puntos) ? puntos : [];
            return (
              <article key={id} className={`drones-planes-card is-${id}`}>
                <p className="drones-planes-apodo">{t(`planes.${id}.apodo`)}</p>
                <h2 className="drones-planes-titulo">{t(`planes.${id}.titulo`)}</h2>
                <p className="drones-planes-precio">{t(`planes.${id}.precio`)}</p>
                <ul className="drones-planes-lista">
                  {lista.map((punto, i) => (
                    <li key={`${id}-${i}`}>{punto}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="drones-planes-btn-card"
                  onClick={() => ir('CADASTRO')}
                >
                  {t('planes.btnRegistro')}
                </button>
              </article>
            );
          })}
        </div>

        {/* ========== ETAPAS E1 E2 E3 ========== */}
        <section className="drones-planes-bloque">
          <h3 className="drones-planes-h3">{t('planes.etapasTitulo')}</h3>
          <p className="drones-planes-p drones-planes-p-last">{t('planes.etapasTexto')}</p>
        </section>

        {/* ========== EXTRAS (SOLO TEXTO, SIN COMPRA) ========== */}
        <section className="drones-planes-bloque">
          <h3 className="drones-planes-h3">{t('planes.extrasTitulo')}</h3>
          <p className="drones-planes-p drones-planes-p-last">{t('planes.extrasTexto')}</p>
        </section>

        {/* ========== CAMBIO DE PLAN (SOLO TEXTO, SIN LOGICA) ========== */}
        <section className="drones-planes-bloque">
          <h3 className="drones-planes-h3">{t('planes.cambioTitulo')}</h3>
          <p className="drones-planes-p drones-planes-p-last">{t('planes.cambioTexto')}</p>
        </section>

        {/* ========== CTAS INFERIORES CENTRADAS ========== */}
        <div className="drones-planes-ctas">
          <button type="button" className="drones-planes-btn" onClick={() => ir('CADASTRO')}>
            {t('planes.btnRegistro')}
          </button>
          <button type="button" className="drones-planes-btn" onClick={() => ir('ACTIVAR')}>
            {t('planes.btnActivar')}
          </button>
          <button type="button" className="drones-planes-btn" onClick={() => ir('INICIO')}>
            {t('planes.btnInicio')}
          </button>
        </div>

      </div>
    </div>
  );
}
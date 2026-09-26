// ==========================================
// ARCHIVO: src/views/drones/Planes.jsx
// CARDS CON VER MAS. ABAJO: CAMBIO + PAGO.
// BOTON CARD = PROBAR SITIO (VISTA PROBAR / PANEL BETA LUEGO)
// ==========================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './css/planes.css';

const IDS_PLAN = ['visitante', 'iniciante', 'plus', 'pro', 'elite'];

export default function Planes({ setCurrentView }) {
  const { t } = useTranslation();
  const [abiertos, setAbiertos] = useState({});

  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const listaDe = (clave) => {
    const raw = t(clave, { returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  };

  return (
    <div className="drones-planes-page">
      <div className="drones-planes-wrap">
        {/* ========== TITULO CENTRADO ========== */}
        <header className="drones-planes-head">
          <h1 className="drones-planes-h1">{t('planes.h1')}</h1>
        </header>

        {/* ========== CINCO CARDS ========== */}
        <div className="drones-planes-grid">
          {IDS_PLAN.map((id) => {
            const abierto = !!abiertos[id];
            const preview = listaDe(`planes.${id}.preview`);
            const extra = listaDe(`planes.${id}.extra`);
            return (
              <article key={id} className={`drones-planes-card is-${id}`}>
                <h2 className="drones-planes-titulo">{t(`planes.${id}.titulo`)}</h2>
                <p className="drones-planes-apodo">{t(`planes.${id}.apodo`)}</p>
                <p className="drones-planes-tipo">{t(`planes.${id}.tipo`)}</p>
                <p className="drones-planes-ben-label">{t('planes.beneficios')}</p>
                <ul className="drones-planes-lista">
                  {preview.map((punto, i) => (
                    <li key={`${id}-p-${i}`}>{punto}</li>
                  ))}
                  {abierto &&
                    extra.map((punto, i) => (
                      <li key={`${id}-x-${i}`}>{punto}</li>
                    ))}
                </ul>
                {extra.length > 0 && (
                  <button
                    type="button"
                    className="drones-planes-vermas"
                    onClick={() => toggle(id)}
                  >
                    {abierto ? t('planes.verMenos') : t('planes.verMas')}
                  </button>
                )}
                <button
                  type="button"
                  className="drones-planes-btn-card"
                  onClick={() => ir('PROBAR')}
                >
                  {t('planes.btnProbar')}
                </button>
                <p className="drones-planes-beta">{t('planes.leyendaBeta')}</p>
              </article>
            );
          })}
        </div>

        {/* ========== DOS CARDS INFERIORES ========== */}
        <div className="drones-planes-duo">
          <section className="drones-planes-nota is-cambio">
            <h3 className="drones-planes-h3">{t('planes.cambioTitulo')}</h3>
            <p className="drones-planes-p drones-planes-p-last">{t('planes.cambioTexto')}</p>
          </section>
          <section className="drones-planes-nota is-pago">
            <h3 className="drones-planes-h3">{t('planes.pagoTitulo')}</h3>
            <p className="drones-planes-p">{t('planes.frasePago')}</p>
            <p className="drones-planes-p drones-planes-p-last">{t('planes.pagoExtra')}</p>
          </section>
        </div>

        {/* ========== CTAS ========== */}
        <div className="drones-planes-ctas">
          <button type="button" className="drones-planes-btn" onClick={() => ir('PROBAR')}>
            {t('planes.btnProbar')}
          </button>
          <button type="button" className="drones-planes-btn" onClick={() => ir('CADASTRO')}>
            {t('planes.btnRegistro')}
          </button>
          <button type="button" className="drones-planes-btn" onClick={() => ir('INICIO')}>
            {t('planes.btnInicio')}
          </button>
        </div>
      </div>
    </div>
  );
}
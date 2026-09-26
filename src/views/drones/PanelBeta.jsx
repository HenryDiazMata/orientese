// ==========================================
// ARCHIVO: src/views/drones/PanelBeta.jsx
// PANEL GENERAL MODO BETA (NO ES UN PLAN)
// ATAJOS + CUPOS. PAGO APAGADO.
// ==========================================

import React from 'react';
import { useTranslation } from 'react-i18next';
import './css/panelBeta.css';

const ATAJOS = [
  { id: 'ORCAMENTOS', clave: 'sim' },
  { id: 'VAGAS', clave: 'vagas' },
  { id: 'DRONES', clave: 'usados' },
  { id: 'ANUNCIANTES', clave: 'anunciantes' },
  { id: 'CADASTRO', clave: 'registro' },
  { id: 'PLANES', clave: 'planes' },
];

export default function PanelBeta({ setCurrentView }) {
  const { t } = useTranslation();

  const ir = (id) => {
    if (setCurrentView) {
      setCurrentView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="drones-beta-page">
      <div className="drones-beta-wrap">
        <header className="drones-beta-head">
          <p className="drones-beta-sello">{t('planes.panelSello')}</p>
          <h1 className="drones-beta-h1">{t('planes.panelH1')}</h1>
          <p className="drones-beta-intro">{t('planes.panelIntro')}</p>
        </header>

        <ul className="drones-beta-cupos">
          <li>{t('planes.panelCupoSim')}</li>
          <li>{t('planes.panelCupoVagas')}</li>
          <li>{t('planes.panelCupoUsados')}</li>
          <li>{t('planes.panelCupoAds')}</li>
        </ul>

        <div className="drones-beta-grid">
          {ATAJOS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="drones-beta-atajo"
              onClick={() => ir(item.id)}
            >
              <span className="drones-beta-atajo-t">{t(`planes.atajo.${item.clave}.t`)}</span>
              <span className="drones-beta-atajo-d">{t(`planes.atajo.${item.clave}.d`)}</span>
            </button>
          ))}
        </div>

        <div className="drones-beta-ctas">
          <button type="button" className="drones-beta-btn" onClick={() => ir('CADASTRO')}>
            {t('planes.btnRegistro')}
          </button>
          <button type="button" className="drones-beta-btn" onClick={() => ir('PLANES')}>
            {t('planes.h1')}
          </button>
          <button type="button" className="drones-beta-btn" onClick={() => ir('INICIO')}>
            {t('planes.btnInicio')}
          </button>
        </div>
      </div>
    </div>
  );
}
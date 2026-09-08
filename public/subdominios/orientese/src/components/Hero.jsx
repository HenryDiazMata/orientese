import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  // Hook de traducción de i18next
  const { t } = useTranslation();

  return (
    <section id="sobre" className="hero section">
      <div className="container hero-inner">
        {/* Columna Principal: Mensaje Central */}
        <div className="hero-text">
          {/* Título y subtítulo traducidos dinámicamente */}
          <h2>{t('hero.title')}</h2>
          <p>{t('hero.subtitle')}</p>
          
          {/* Botón de llamada a la acción */}
          <a className="btn btn-primary" href="#servicos">
            {t('header.subdomains')}
          </a>
        </div>

        {/* Panel Lateral: Ejemplos de subdominios del ecosistema */}
        <aside className="hero-aside" aria-hidden="false">
          <p><strong>Ecosistema Orientese:</strong></p>
          <ul>
            <li>drones.orientese.com</li>
            <li>mentora.orientese.com</li>
            <li>standshowtour.orientese.com</li>
            <li>ofertas.orientese.com</li>
            <li>empleos.orientese.com</li>
            <li>ondesp.orientese.com</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
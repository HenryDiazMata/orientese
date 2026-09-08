import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Services.jsx
 * Ubicación: src/components/Services.jsx
 * Propósito: Renderizado de los 6 subdominios oficiales del ecosistema Orientese.
 */
export default function Services() {
  const { t } = useTranslation();

  // Matriz con las 6 verticales del ecosistema
  const subdomainsData = [
    {
      id: 'drones',
      title: 'drones.orientese.com',
      descriptionKey: 'subdomains.drones.description',
      image: 'src/assets/pelicano-drone.gif',
      url: 'https://drones.orientese.com',
      active: true
    },
    {
      id: 'mentora',
      title: 'mentora.orientese.com',
      descriptionKey: 'subdomains.mentora.description',
      url: '#',
      active: false
    },
    {
      id: 'standshowtour',
      title: 'standshowtour.orientese.com',
      descriptionKey: 'subdomains.standshowtour.description',
      url: '#',
      active: false
    },
    {
      id: 'ofertas',
      title: 'ofertas.orientese.com',
      descriptionKey: 'subdomains.ofertas.description',
      url: '#',
      active: false
    },
    {
      id: 'empleos',
      title: 'empleos.orientese.com',
      descriptionKey: 'subdomains.empleos.description',
      url: '#',
      active: false
    },
    {
      id: 'ondesp',
      title: 'ondesp.orientese.com',
      descriptionKey: 'subdomains.ondesp.description',
      url: '#',
      active: false
    }
  ];

  return (
    <section id="servicos" className="services-section">
      <h2 className="section-title">{t('header.subdomains', 'Subdomínios')}</h2>

      <div className="services-grid">
        {subdomainsData.map((item) => (
          <article key={item.id} className="service-card">
            <div>
              {item.image && (
                <div className="card-image-container">
                  <img src={item.image} alt={item.title} className="card-image" />
                </div>
              )}
              <h3>{item.title}</h3>
              <p>{t(item.descriptionKey)}</p>
            </div>

            <a 
              href={item.url} 
              className={`service-link ${!item.active ? 'disabled-link' : ''}`}
            >
              {item.active ? t('subdomains.accessButton', 'Acessar site') : t('subdomains.comingSoon', 'Em preparação')}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
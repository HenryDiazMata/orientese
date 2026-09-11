import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

import Header from './components/orientese_HeadFooter/Header';
import Footer from './components/orientese_HeadFooter/Footer';
import AuthPage from './components/AuthPage';
import FundavalView from './views/FundavalView';

function App() {
  const { t } = useTranslation('orientese');
  const [view, setView] = useState('home');

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('orientese_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('orientese_user');
    setUser(null);
    setView('home');
  };

  return (
    <div className="app-root">
      <Header user={user} onLogout={handleLogout} setView={setView} />

      <main className="main-content">
        {view === 'home' && (
          <section className="services-grid">
            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/drones/Logo_ drones_orientese_com.png" alt="Drones" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Drones</h3>
                <p>{t('subdomains.drones.desc')}</p>
                <a href="https://drones.orientese.com" className="subdomain-link">drones.orientese.com →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/fundaval/FUNDAVAL_ALP_imagotipo_01.jpg" alt="Fundaval" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Fundaval</h3>
                <p>{t('subdomains.fundaval.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('fundaval')} style={{ padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                  fundaval.orientese.com →
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/ofertas/logo_ofertas.gif" alt="Ofertas" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Ofertas</h3>
                <p>{t('subdomains.ofertas.desc')}</p>
                <a href="https://ofertas.orientese.com" className="subdomain-link">ofertas.orientese.com →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/masoneria/logo_masoneria.gif" alt="Masonería" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Masonería</h3>
                <p>{t('subdomains.masoneria.desc')}</p>
                <a href="https://masoneria.orientese.com" className="subdomain-link">masoneria.orientese.com →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/aquaviarios/logo_aquaviarios.gif" alt="Aquaviários" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Aquaviários</h3>
                <p>{t('subdomains.aquaviarios.desc')}</p>
                <a href="https://aquaviarios.orientese.com" className="subdomain-link">aquaviarios.orientese.com →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/turismo/logo_turismo.gif" alt="Turismo" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Turismo</h3>
                <p>{t('subdomains.turismo.desc')}</p>
                <a href="https://turismo.orientese.com" className="subdomain-link">turismo.orientese.com →</a>
              </div>
            </div>
          </section>
        )}

        {view === 'fundaval' && (
          <div className="fundaval-container">
            <button className="btn-back-home" onClick={() => setView('home')}>
              {t('common.backHome', '← Volver al inicio')}
            </button>
            <FundavalView />
          </div>
        )}

        {view === 'auth' && (
          <AuthPage 
            onBackHome={() => setView('home')}
            onLoginSuccess={(userData) => {
              setUser(userData);
              if (userData) {
                localStorage.setItem('orientese_user', JSON.stringify(userData));
              }
              setView('home');
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
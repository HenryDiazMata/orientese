// ==========================================
// ARCHIVO COMPLETO: orientese/src/App.jsx
// PORTAL CENTRAL Y ENRUTADOR DE SUBDOMINIOS
// LOGIN ESCRIBE orientese_user + orientese.sso
// LOGOUT BORRA AMBAS. NO TOCA FICHAS DRONES
// AVISA A DRONES EN LA MISMA PESTANA
// ==========================================

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

import Header from './components/orientese_HeadFooter/Header';
import Footer from './components/orientese_HeadFooter/Footer';
import AuthPage from './components/AuthPage';
import FundavalView from './views/FundavalView';
import DronesView from './views/DronesView';

const LS_ORIENTESE_USER = 'orientese_user';
const LS_SSO = 'orientese.sso';
const EVENTO_SSO = 'orientese-sso-cambio';
const EVENTO_IR_VISTA = 'orientese-ir-vista';

function armarSsoDesdeUser(userData) {
  if (!userData) return null;
  const nome = String(
    userData.nome ||
    userData.nombre ||
    userData.fullName ||
    userData.name ||
    ''
  ).trim();
  const email = String(userData.email || '').toLowerCase().trim();
  const paisConta = String(
    userData.paisConta ||
    userData.pais ||
    userData.country ||
    ''
  ).trim().toUpperCase();
  if (!nome && !email && !paisConta) return null;
  return { nome, email, paisConta };
}

function avisarCambioSso() {
  try {
    window.dispatchEvent(new Event(EVENTO_SSO));
  } catch {
    // SIN EVENTO SI EL NAVEGADOR NO LO SOPORTA
  }
}

function persistirSesionPortal(userData) {
  if (!userData) {
    localStorage.removeItem(LS_ORIENTESE_USER);
    localStorage.removeItem(LS_SSO);
    avisarCambioSso();
    return;
  }
  localStorage.setItem(LS_ORIENTESE_USER, JSON.stringify(userData));
  const sso = armarSsoDesdeUser(userData);
  if (sso) {
    localStorage.setItem(LS_SSO, JSON.stringify(sso));
  } else {
    localStorage.removeItem(LS_SSO);
  }
  avisarCambioSso();
}

function App() {
  const { t } = useTranslation('orientese');

  const [view, setView] = useState('home');

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(LS_ORIENTESE_USER);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onIrVista = (ev) => {
      const destino = ev && ev.detail;
      if (destino === 'auth' || destino === 'home') {
        setView(destino);
      }
    };
    window.addEventListener(EVENTO_IR_VISTA, onIrVista);
    return () => window.removeEventListener(EVENTO_IR_VISTA, onIrVista);
  }, []);

  const handleLogout = () => {
    persistirSesionPortal(null);
    setUser(null);
    setView('home');
  };

  const esVistaFundaval = view.startsWith('fundaval');
  const esVistaDrones = view.startsWith('drones');
  const ocultarHeaderFooterGlobal = esVistaFundaval || esVistaDrones;

  return (
    <div className={`app-root ${esVistaFundaval ? 'fundaval-mode' : ''}`}>

      {!ocultarHeaderFooterGlobal && (
        <Header user={user} onLogout={handleLogout} setView={setView} />
      )}

      <main className={ocultarHeaderFooterGlobal ? 'main-content-full' : 'main-content'}>

        {view === 'home' && (
          <section className="services-grid">

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/drones/LogoDrones11.png" alt="Drones" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Drones</h3>
                <p>{t('subdomains.drones.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('drones')}>
                  drones.orientese.com →
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/fundaval/FUNDAVAL_ALP_imagotipo_01.jpg" alt="Fundaval" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Fundaval</h3>
                <p>{t('subdomains.fundaval.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('fundaval')}>
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
                <button className="btn-link-inline subdomain-link" onClick={() => setView('ofertas')}>
                  ofertas.orientese.com →
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/masoneria/logo_masoneria.gif" alt="Masonería" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Masonería</h3>
                <p>{t('subdomains.masoneria.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('masoneria')}>
                  masoneria.orientese.com →
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/aquaviarios/logo_aquaviarios.gif" alt="Aquaviários" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Aquaviários</h3>
                <p>{t('subdomains.aquaviarios.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('aquaviarios')}>
                  aquaviarios.orientese.com →
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="card-image-container">
                <img src="/logos/turismo/logo_turismo.gif" alt="Turismo" className="card-image" />
              </div>
              <div className="card-body">
                <h3>Turismo</h3>
                <p>{t('subdomains.turismo.desc')}</p>
                <button className="btn-link-inline subdomain-link" onClick={() => setView('turismo')}>
                  turismo.orientese.com →
                </button>
              </div>
            </div>

          </section>
        )}

        {view === 'fundaval' && (
          <FundavalView onNavigate={(destino) => setView(destino || 'home')} />
        )}

        {view === 'drones' && (
          <DronesView onNavigate={(destino) => setView(destino || 'home')} />
        )}

        {view === 'ofertas' && (
          <div className="subdomain-view-container">
            <button onClick={() => setView('home')}>← Volver</button>
            <h2>Módulo Ofertas</h2>
          </div>
        )}
        {view === 'masoneria' && (
          <div className="subdomain-view-container">
            <button onClick={() => setView('home')}>← Volver</button>
            <h2>Módulo Masonería</h2>
          </div>
        )}
        {view === 'aquaviarios' && (
          <div className="subdomain-view-container">
            <button onClick={() => setView('home')}>← Volver</button>
            <h2>Módulo Aquaviários</h2>
          </div>
        )}
        {view === 'turismo' && (
          <div className="subdomain-view-container">
            <button onClick={() => setView('home')}>← Volver</button>
            <h2>Módulo Turismo</h2>
          </div>
        )}

       {view === 'perfil' && (
          <div className="subdomain-view-container">
            <button type="button" onClick={() => setView('home')}>← Volver</button>
            <h2>Mi perfil</h2>
            <p>{user && (user.nombre || user.nome || user.email)}</p>
            <p>{user && user.email}</p>
          </div>
        )}

        {view === 'auth' && (
          <AuthPage
            onBackHome={() => setView('home')}
            onLoginSuccess={(userData) => {
              setUser(userData);
              persistirSesionPortal(userData);
              setView('home');
            }}
          />
        )}

      </main>

      {!ocultarHeaderFooterGlobal && <Footer />}

    </div>
  );
}

export default App;
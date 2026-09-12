// IMPORTACIONES PRINCIPALES DE REACT Y LIBRERÍAS
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

// ==========================================
// IMPORTACIONES DE COMPONENTES DE LA PLATAFORMA
// ==========================================
import Header from './components/orientese_HeadFooter/Header';
import Footer from './components/orientese_HeadFooter/Footer';
import AuthPage from './components/AuthPage'; 
import FundavalView from './views/FundavalView';

function App() {
  const { t } = useTranslation('orientese');
  
  // ESTADO DE NAVEGACIÓN DE VISTAS ('home', 'auth', 'drones', 'fundaval', etc.)
  const [view, setView] = useState('home');

  // ESTADO DE SESIÓN DE USUARIO
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('orientese_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = () => {
    localStorage.removeItem('orientese_user');
    setUser(null);
    setView('home');
  };

  // EVALÚA SI ESTAMOS EN EL SUBDOMINIO FUNDAVAL
  const esVistaFundaval = view.startsWith('fundaval');

  return (
    <div className={`app-root ${esVistaFundaval ? 'fundaval-mode' : ''}`}>
      
      {/* HEADER GENERAL DE ORIENTESE */}
      {!esVistaFundaval && (
        <Header user={user} onLogout={handleLogout} setView={setView} />
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <main className={esVistaFundaval ? 'main-content-full' : 'main-content'}>
        
        {/* PORTADA PRINCIPAL / GRID DE TARJETAS DE SUBDOMINIOS */}
        {view === 'home' && (
          <section className="services-grid">
            
            {/* TARJETA 1: DRONES */}
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

            {/* TARJETA 2: FUNDAVAL */}
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

            {/* TARJETA 3: OFERTAS */}
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

            {/* TARJETA 4: MASONERÍA */}
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

            {/* TARJETA 5: AQUAVIÁRIOS */}
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

            {/* TARJETA 6: TURISMO */}
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

        {/* SUBDOMINIO FUNDAVAL: PASA LA FUNCIÓN PARA VOLVER AL PORTAL PRINCIPAL */}
        {view === 'fundaval' && (
          <FundavalView onNavigate={(destino) => setView(destino || 'home')} />
        )}

        {/* OTROS SUBDOMINIOS */}
        {view === 'drones' && <div className="subdomain-view-container"><button onClick={() => setView('home')}>← Volver</button><h2>Módulo Drones</h2></div>}
        {view === 'ofertas' && <div className="subdomain-view-container"><button onClick={() => setView('home')}>← Volver</button><h2>Módulo Ofertas</h2></div>}
        {view === 'masoneria' && <div className="subdomain-view-container"><button onClick={() => setView('home')}>← Volver</button><h2>Módulo Masonería</h2></div>}
        {view === 'aquaviarios' && <div className="subdomain-view-container"><button onClick={() => setView('home')}>← Volver</button><h2>Módulo Aquaviários</h2></div>}
        {view === 'turismo' && <div className="subdomain-view-container"><button onClick={() => setView('home')}>← Volver</button><h2>Módulo Turismo</h2></div>}

        {/* AUTENTICACIÓN */}
        {view === 'auth' && (
          <AuthPage 
            onBackHome={() => setView('home')}
            onLoginSuccess={(userData) => {
              setUser(userData);
              if (userData) localStorage.setItem('orientese_user', JSON.stringify(userData));
              setView('home');
            }}
          />
        )}

      </main>

      {/* FOOTER GENERAL DE ORIENTESE */}
      {!esVistaFundaval && <Footer />}

    </div>
  );
}

export default App;
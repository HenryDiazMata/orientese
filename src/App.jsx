import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import FundavalView from './views/FundavalView';
import AuthPage from './components/AuthPage';

// COMPONENTE PRINCIPAL
function App() {
  const { t, i18n } = useTranslation('orientese');
  const [view, setView] = useState('home'); // VISTAS: 'home', 'auth', 'fundaval'

  // ESTADO DE SESIÓN DE USUARIO
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('orientese_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // FUNCIÓN CERRAR SESIÓN
  const handleLogout = () => {
    localStorage.removeItem('orientese_user');
    setUser(null);
    setView('home');
  };

  return (
    <div className="app">
      {/* HEADER PRINCIPAL */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img src="/logos/orientese/logorientc2018Azul01.gif" alt="Logo Orientese" className="brand-logo" />
            <span className="tagline">{t('header.tagline', 'Información útil para orientar tus decisiones')}</span>
          </div>
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <button className="nav-btn" onClick={() => setView('home')}>{t('common.back', 'Inicio')}</button>
            
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="user-welcome" style={{ fontWeight: 'bold', color: '#0056b3' }}>
                  Hola, {user.nombre || user.email}
                </span>
                <button 
                  className="btn-auth" 
                  onClick={handleLogout}
                  style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button className="btn-auth primary" onClick={() => setView('auth')}>
                {t('auth.form.loginButton', 'Iniciar Sesión')}
              </button>
            )}
          </nav>

          <select className="lang-select" value={i18n.language} onChange={changeLanguage}>
            <option value="es">Español (ES)</option>
            <option value="pt-BR">Português (PT)</option>
            <option value="en">English (EN)</option>
          </select>
        </div>
      </header>

      {/* RENDERIZADO PRINCIPAL */}
      <main>
        {view === 'home' && (
          <>
            <section className="hero-section">
              <h1 className="section-title">{t('hero.title', 'Portal Orientese')}</h1>
              <p className="contact-subtitle">{t('hero.subtitle', 'Conectando personas y proyectos a través de nuestros subdominios especializados.')}</p>
            </section>

            <section className="services-grid">
              {/* DRONES */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/drones/Logo_ drones_orientese_com.png" alt="Drones" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Drones</h3>
                  <p>{t('subdomains.drones.description', 'Servicios aéreos, fotografía, inspección técnica y formación de pilotos.')}</p>
                  <a href="https://drones.orientese.com" className="subdomain-link">drones.orientese.com →</a>
                </div>
              </div>

              {/* FUNDAVAL */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/fundaval/FUNDAVAL_ALP_imagotipo_01.jpg" alt="Fundaval" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Fundaval</h3>
                  <p>{t('subdomains.fundaval.description', 'Contenido dinámico, podcasts, blogs y videos autónomos.')}</p>
                  <button className="btn-link-inline subdomain-link" onClick={() => setView('fundaval')} style={{ padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                    fundaval.orientese.com →
                  </button>
                </div>
              </div>

              {/* OFERTAS */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/ofertas/logo_ofertas.gif" alt="Ofertas" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Ofertas</h3>
                  <p>{t('subdomains.ofertas.description', 'Oportunidades, clasificados y comercio local.')}</p>
                  <a href="https://ofertas.orientese.com" className="subdomain-link">ofertas.orientese.com →</a>
                </div>
              </div>

              {/* MASONERÍA */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/masoneria/logo_masoneria.gif" alt="Masonería" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Masonería</h3>
                  <p>{t('subdomains.masoneria.description', 'Secciones históricas e información institucional.')}</p>
                  <a href="https://masoneria.orientese.com" className="subdomain-link">masoneria.orientese.com →</a>
                </div>
              </div>

              {/* AQUAVIÁRIOS */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/aquaviarios/logo_aquaviarios.gif" alt="Aquaviários" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Aquaviários</h3>
                  <p>{t('subdomains.aquaviarios.description', 'Información, servicios e interacción para el sector marítimo y acuaviario.')}</p>
                  <a href="https://aquaviarios.orientese.com" className="subdomain-link">aquaviarios.orientese.com →</a>
                </div>
              </div>

              {/* TURISMO */}
              <div className="service-card">
                <div className="card-image-container">
                  <img src="/logos/turismo/logo_turismo.gif" alt="Turismo" className="card-image" />
                </div>
                <div className="card-body">
                  <h3>Turismo</h3>
                  <p>{t('subdomains.turismo.description', 'Guías de viaje, eventos culturales y rutas turísticas destacadas.')}</p>
                  <a href="https://turismo.orientese.com" className="subdomain-link">turismo.orientese.com →</a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* VISTA FUNDAVAL */}
        {view === 'fundaval' && (
          <div className="fundaval-container">
            <button className="btn-back-home" onClick={() => setView('home')}>
              {t('common.backHome', '← Volver al inicio')}
            </button>
            <FundavalView />
          </div>
        )}

        {/* VISTA AUTENTICACIÓN (COMPONENTE AUTHPAGE) */}
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

      {/* FOOTER */}
      <footer>
        <p>&copy; 2026 Orientese. {t('footer.rights', 'Todos los derechos reservados.')}</p>
      </footer>
    </div>
  );
}

export default App;
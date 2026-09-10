import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import FundavalView from './views/FundavalView';

function App() {
  const { t, i18n } = useTranslation('orientese');
  const [view, setView] = useState('home'); // 'home', 'auth', 'fundaval'
  const [authMode, setAuthMode] = useState('login'); // 'login' o 'register'

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="app">
      {/* 1. HEADER Y LOGO */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img 
              src="/logos/orientese/logorientc2018Azul01.gif" 
              alt="Logo Orientese" 
              className="brand-logo"
            />
            <span className="tagline">{t('header.tagline', 'Información útil para orientar tus decisiones')}</span>
          </div>
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <button className="nav-btn" onClick={() => setView('home')}>{t('common.back', 'Inicio')}</button>
            <button className="btn-auth primary" onClick={() => { setView('auth'); setAuthMode('login'); }}>
              {t('auth.form.loginButton', 'Iniciar Sesión')}
            </button>
          </nav>

          {/* SELECTOR DE IDIOMA */}
          <select 
            className="lang-select" 
            value={i18n.language} 
            onChange={changeLanguage}
          >
            <option value="es">Español (ES)</option>
            <option value="pt-BR">Português (PT)</option>
            <option value="en">English (EN)</option>
          </select>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main>
        {view === 'home' && (
          <>
            {/* HERO SECTION */}
            <section className="hero-section">
              <h1 className="section-title">{t('hero.title', 'Portal Orientese')}</h1>
              <p className="contact-subtitle">{t('hero.subtitle', 'Conectando personas y proyectos a través de nuestros subdominios especializados.')}</p>
            </section>

            {/* GRID DE SUBDOMINIOS */}
            <section className="services-grid">
              {/* DRONES */}
              <div className="service-card">
                <div className="card-image-container">
                  <img 
                    src="/logos/drones/logo_drones.gif" 
                    alt="Drones" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="card-body">
                  <h3>Drones</h3>
                  <p>{t('subdomains.drones.description', 'Tecnología, noticias y normativa de vehículos aéreos no tripulados.')}</p>
                  <a href="https://drones.orientese.com" className="subdomain-link">drones.orientese.com →</a>
                </div>
              </div>

              {/* FUNDAVAL (REDIRECCIONA A LA VISTA REACT INTERNA) */}
              <div className="service-card">
                <div className="card-image-container">
                  <img 
                    src="/logos/fundaval/logo_fundaval.gif" 
                    alt="Fundaval" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="card-body">
                  <h3>Fundaval</h3>
                  <p>{t('subdomains.fundaval.description', 'Contenido dinámico, podcasts, blogs y videos autónomos.')}</p>
                  <button 
                    className="btn-link-inline subdomain-link" 
                    onClick={() => setView('fundaval')}
                    style={{ padding: 0, textAlign: 'left', cursor: 'pointer' }}
                  >
                    fundaval.orientese.com →
                  </button>
                </div>
              </div>

              {/* OFERTAS */}
              <div className="service-card">
                <div className="card-image-container">
                  <img 
                    src="/logos/ofertas/logo_ofertas.gif" 
                    alt="Ofertas" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
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
                  <img 
                    src="/logos/masoneria/logo_masoneria.gif" 
                    alt="Masonería" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
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
                  <img 
                    src="/logos/aquaviarios/logo_aquaviarios.gif" 
                    alt="Aquaviários" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
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
                  <img 
                    src="/logos/turismo/logo_turismo.gif" 
                    alt="Turismo" 
                    className="card-image" 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
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

        {/* VISTA INTERNA DE FUNDAVAL */}
        {view === 'fundaval' && (
          <div className="fundaval-container">
            <button className="btn-back-home" onClick={() => setView('home')}>
              {t('common.backHome', '← Volver al inicio')}
            </button>
            <FundavalView />
          </div>
        )}

        {/* VISTA AUTH (LOGIN / REGISTRO) */}
        {view === 'auth' && (
          <div className="auth-container">
            <button className="btn-back-home" onClick={() => setView('home')}>
              {t('common.backHome', '← Volver al inicio')}
            </button>

            <div className="auth-wrapper">
              <div className="auth-info">
                <h2>{t('auth.info.title', 'Únete a la plataforma Orientese')}</h2>
                <p>{t('auth.info.subtitle', 'Crea tu cuenta para acceder a todos nuestros servicios.')}</p>
                <ul className="auth-features-list">
                  <li>✔ <span>{t('auth.info.ofertas', 'Acceso a promociones y cupones exclusivos.')}</span></li>
                  <li>✔ <span>{t('auth.info.drones', 'Gestión de servicios aéreos e inspección.')}</span></li>
                  <li>✔ <span>{t('auth.info.panelDesc', 'Administra tus proyectos desde un solo lugar.')}</span></li>
                </ul>
              </div>

              <div className="auth-form-container">
                <h3>{authMode === 'login' ? t('auth.form.loginTitle', 'Iniciar Sesión') : t('auth.form.registerTitle', 'Crear Cuenta')}</h3>
                <p>{t('auth.form.registerSubtitle', 'Ingresa tus datos a continuación')}</p>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                  {authMode === 'register' && (
                    <div className="form-group">
                      <label>{t('auth.form.fullNameLabel', 'Nombre completo')}</label>
                      <input type="text" placeholder={t('auth.form.fullNamePlaceholder', 'Tu nombre')} />
                    </div>
                  )}

                  <div className="form-group">
                    <label>{t('auth.form.emailLabel', 'Correo electrónico')}</label>
                    <input type="email" placeholder="correo@ejemplo.com" />
                  </div>

                  <div className="form-group">
                    <label>{t('auth.form.passwordLabel', 'Contraseña')}</label>
                    <div className="password-input-wrapper">
                      <input type="password" placeholder="••••••••" />
                    </div>
                  </div>

                  <button type="submit" className="btn-submit">
                    {authMode === 'login' ? t('auth.form.loginButton', 'Iniciar sesión') : t('auth.form.registerButton', 'Registrarse')}
                  </button>
                </form>

                <div className="auth-switch">
                  <span>
                    {authMode === 'login' ? t('auth.switch.noAccount', '¿Aún no tienes una cuenta?') : t('auth.switch.hasAccount', '¿Ya tienes una cuenta?')}
                  </span>
                  <button 
                    className="btn-link-inline" 
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  >
                    {authMode === 'login' ? t('auth.form.registerButton', 'Registrarse') : t('auth.form.loginButton', 'Iniciar sesión')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer>
        <p>&copy; 2026 Orientese. {t('footer.rights', 'Todos los derechos reservados.')}</p>
      </footer>
    </div>
  );
}

export default App;
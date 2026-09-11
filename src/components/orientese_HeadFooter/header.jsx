import React from 'react';
import { useTranslation } from 'react-i18next';

function Header({ user, onLogout, setView }) {
  const { t, i18n } = useTranslation('orientese');

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* LADO IZQUIERDO: LOGO Y LEMA */}
        <div className="header-brand-section">
          <div className="logo-container" onClick={() => setView('home')}>
            <img src="/logos/orientese/logorientc2018Azul01.gif" alt="Logo Orientese" className="brand-logo" />
            <span className="tagline">{t('header.tagline', 'Información útil y agradable')}</span>
          </div>
        </div>

        {/* LADO DERECHO: BOTONES (INICIO, QUIÉNES SOMOS, CONTACTO, SESIÓN, IDIOMA) */}
        <div className="header-controls-section">
          <nav className="nav-links">
            <button className="nav-btn" onClick={() => setView('home')}>{t('common.back', 'Inicio')}</button>
            <button className="nav-btn" onClick={() => alert('Sección Quiénes Somos')}>{t('header.about', 'Quiénes Somos')}</button>
            <button className="nav-btn" onClick={() => alert('Sección Contacto')}>{t('header.contact', 'Contacto')}</button>
            
            {user ? (
              <div className="user-session-box">
                <span className="user-welcome">
                  Hola, <strong>{user.nombre || user.email}</strong>
                </span>
                <button className="btn-logout" onClick={onLogout}>
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
            <option value="fr">Français (FR)</option>
            <option value="it">Italiano (IT)</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
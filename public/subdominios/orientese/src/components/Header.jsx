import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Header.jsx
 * Ubicación: src/components/Header.jsx
 * Propósito: Cabecera con navegación por estado, cambio de tema y selector de 5 idiomas.
 */
export default function Header({ theme, toggleTheme, onNavigate }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="header">
      {/* Sección Izquierda: Logotipo e Identidad */}
      <div className="header-left">
        <div 
          className="logo-container" 
          onClick={() => onNavigate('home')} 
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="src/assets/logorientc2018Azul01.gif" 
            alt="Logo Orientese" 
            className="brand-logo"
          />
          <span className="tagline">{t('header.tagline', 'Informações úteis para orientar suas decisões')}</span>
        </div>
      </div>

      {/* Navegación Principal conectada al Estado */}
      <nav className="nav-links">
        <button className="nav-btn" onClick={() => onNavigate('home')}>
          {t('header.home', 'Início')}
        </button>
        <button className="nav-btn" onClick={() => onNavigate('sobre')}>
          {t('header.about', 'Sobre Nós')}
        </button>
        {/* Cambiado de <a> a <button> con manejador de navegacion */}
        <button className="nav-btn" onClick={() => onNavigate('servicos')}>
          {t('header.subdomains', 'Subdomínios')}
        </button>
      </nav>

      {/* Sección Derecha: Autenticación, Idiomas y Tema */}
      <div className="header-right">
        <button className="btn-auth" onClick={() => onNavigate('login')}>
          {t('header.login', 'Entrar')}
        </button>
        <button className="btn-auth primary" onClick={() => onNavigate('cadastro')}>
          {t('header.register', 'Cadastrar')}
        </button>

        <select 
          className="lang-select" 
          onChange={changeLanguage} 
          value={i18n.language}
        >
          <option value="pt-BR">🌐 PT</option>
          <option value="es">🌐 ES</option>
          <option value="en">🌐 EN</option>
          <option value="fr">🌐 FR</option>
          <option value="it">🌐 IT</option>
        </select>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
// ==========================================
// ARCHIVO COMPLETO: src/components/drones_HeaderFooter/Header.jsx
// MENU LATERAL + FRANJA SUPERIOR
// SIN INTERRUPTOR LIGHT/DARK (EL SITE NO LO USA)
// ==========================================

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../drones/i18n';
import { useAuth } from '../../context/drones/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const LOGO_DRONES = '/logos/drones/LogoDrones11.png';
const LOGO_PORTAL = '/logos/orientese/logorientc2018Azul01.gif';
const FAVICON_PORTAL = '/favicon/orientese/favicon.ico';
const URL_PORTAL = 'https://orientese.com';

const Icon = ({ name, className = '' }) => {
  const common = {
    className,
    width: 20,
    height: 20,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
    style: { width: 20, height: 20, flexShrink: 0 },
  };

  const paths = {
    home: 'M2.25 12 12 3l9.75 9M4.5 10.5V21h5.25v-6h4.5v6H19.5V10.5',
    welcome: 'M12 3v18M3 12h18M7.5 7.5h9v9h-9z',
    calc: 'M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75zM8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01',
    userPlus:
      'M18 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM15 13.5a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6zM21 8.25v4.5M23.25 10.5h-4.5',
    users:
      'M15 19.5a6 6 0 0 0-6-6 6 6 0 0 0-6 6M12 10.5A3.75 3.75 0 1 0 12 3a3.75 3.75 0 0 0 0 7.5zM17.25 7.5a2.25 2.25 0 1 0 0-4.5M20.25 19.5a4.5 4.5 0 0 0-3-4.25',
    drone:
      'M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM4.5 8.25h3v3h-3zM16.5 8.25h3v3h-3zM4.5 15.75h3v3h-3zM16.5 15.75h3v3h-3zM7.5 9.75h9M7.5 17.25h9M9.75 9.75v7.5M14.25 9.75v7.5',
    job: 'M20.25 14.25v4.5A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25v-4.5M3 10.5h18M12 10.5V21M8.25 10.5V6.75A1.5 1.5 0 0 1 9.75 5.25h4.5a1.5 1.5 0 0 1 1.5 1.5V10.5',
    user: 'M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a7.5 7.5 0 0 1 15 0',
    megaphone:
      'M3.75 9.75v4.5m0-4.5A2.25 2.25 0 0 1 6 7.5h1.5l10.5-3v15L7.5 16.5H6a2.25 2.25 0 0 1-2.25-2.25m0-4.5v4.5',
    planes:
      'M9 12h6M9 16h6M7.5 3.75h9A2.25 2.25 0 0 1 18.75 6v12A2.25 2.25 0 0 1 16.5 20.25h-9A2.25 2.25 0 0 1 5.25 18V6A2.25 2.25 0 0 1 7.5 3.75z',
    activate: 'M5.25 12h13.5M12 5.25v13.5M8.25 8.25 12 5.25 15.75 8.25',
    renew: 'M16.5 6.75A6.75 6.75 0 1 1 6.75 16.5M16.5 6.75V3.75M16.5 6.75H13.5',
    chevronL: 'M15.75 19.5 8.25 12l7.5-7.5',
    chevronR: 'M8.25 4.5 15.75 12l-7.5 7.5',
    close: 'M6 18 18 6M6 6l12 12',
    menu: 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5',
    logout:
      'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H3.75',
  };

  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name] || paths.home} />
    </svg>
  );
};

export const Header = ({ currentView, setCurrentView }) => {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });
  const { isAuthenticated, user, logout } = useAuth();

  const [cadastradosOpen, setCadastradosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [perfilMenuOpen, setPerfilMenuOpen] = useState(false);
  const perfilRef = useRef(null);

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === '1';
    } catch {
      return false;
    }
  });

  const cadastradosItems = [
    { labelKey: 'nav.pilots', id: 'PILOTOS' },
    { labelKey: 'nav.helpers', id: 'AUXILIARES' },
    { labelKey: 'nav.techMaint', id: 'MANUTENÇÃO' },
    { labelKey: 'nav.techRepair', id: 'CONSERTOS' },
    { labelKey: 'nav.professionals', id: 'PROFISSIONAIS' },
  ];

  const handleSelectView = (viewId) => {
    if (setCurrentView) setCurrentView(viewId);
    setCadastradosOpen(false);
    setMobileOpen(false);
    setPerfilMenuOpen(false);
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebarCollapsed', next ? '1' : '0');
      } catch {
        /* IGNORAR SI LOCALSTORAGE FALLA */
      }
      if (next) setCadastradosOpen(false);
      return next;
    });
  };

  const isCadastradosActive = cadastradosItems.some((item) => item.id === currentView);
  const cadastradoActivo = cadastradosItems.find((item) => item.id === currentView);
  const isInicioActive = currentView === 'INÍCIO' || currentView === 'INICIO';
  const isOrcamentosActive = currentView === 'ORÇAMENTOS' || currentView === 'ORCAMENTOS';
  const isPlanesActive = currentView === 'PLANES';
  const isBienvenidaActive = currentView === 'BIENVENIDA';
  const isActivarActive = currentView === 'ACTIVAR';
  const isRenovarActive = currentView === 'RENOVAR';
  const isPerfilActive = currentView === 'MEU_PERFIL' || currentView === 'PERFIL';

  const nombreUsuario =
    user?.nomeCompleto || user?.nombre || user?.name || user?.email || '';
  const fotoUsuario = user?.fotoUrl || user?.foto || user?.avatar || user?.imagem || '';

  const handleCerrarSesion = () => {
    logout();
    setPerfilMenuOpen(false);
    handleSelectView('INÍCIO');
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '4.5rem' : '16rem'
    );
  }, [collapsed]);

  useEffect(() => {
    const onDocClick = (ev) => {
      if (perfilRef.current && !perfilRef.current.contains(ev.target)) {
        setPerfilMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const itemClass = (active) =>
    `btn-menu sidebar-item ${active ? 'btn-menu-active' : 'btn-menu-inactive'} ${
      collapsed ? 'is-collapsed' : ''
    }`;

  // ==========================================
  // FRANJA DERECHA: SOLO IDIOMA + IDENTIDAD
  // ==========================================
  const IdentityBlock = () => (
    <div className="drones-topbar-right">
      <div className="drones-topbar-lang">
        <LanguageSwitcher />
      </div>

      {!isAuthenticated ? (
        <span className="drones-perfil-inactivo" title={t('nav.doLogin')}>
          <Icon name="user" />
          <span>MI Perfil</span>
        </span>
      ) : (
        <div className="drones-perfil-wrap" ref={perfilRef}>
          <button
            type="button"
            className={`drones-perfil-activo ${isPerfilActive ? 'is-active' : ''}`}
            onClick={() => setPerfilMenuOpen((prev) => !prev)}
            title={nombreUsuario}
          >
            {fotoUsuario ? (
              <img src={fotoUsuario} alt="" className="drones-perfil-foto" />
            ) : (
              <span className="drones-perfil-avatar" aria-hidden="true">
                <Icon name="user" />
              </span>
            )}
            <span className="drones-perfil-nombre">{nombreUsuario}</span>
          </button>

          {perfilMenuOpen && (
            <div className="drones-perfil-menu">
              <button type="button" onClick={() => handleSelectView('PERFIL')}>
                <Icon name="user" />
                <span>Meu perfil</span>
              </button>
              <button type="button" onClick={handleCerrarSesion}>
                <Icon name="logout" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const NavContent = () => (
    <nav className="sidebar-nav">
      <button
        type="button"
        onClick={() => handleSelectView('INÍCIO')}
        className={`btn-menu sidebar-item sidebar-item-inicio ${
          isInicioActive ? 'is-inicio-active' : 'btn-menu-inactive'
        } ${collapsed ? 'is-collapsed' : ''}`}
        title={t('nav.home')}
      >
        <Icon name="home" />
        {!collapsed && <span>{t('nav.home')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('BIENVENIDA')}
        className={itemClass(isBienvenidaActive)}
        title={t('nav.welcome')}
      >
        <Icon name="welcome" />
        {!collapsed && <span>{t('nav.welcome')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('PLANES')}
        className={itemClass(isPlanesActive)}
        title={t('nav.planes')}
      >
        <Icon name="planes" />
        {!collapsed && <span>{t('nav.planes')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('ACTIVAR')}
        className={itemClass(isActivarActive)}
        title={t('nav.activate')}
      >
        <Icon name="activate" />
        {!collapsed && <span>{t('nav.activate')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('RENOVAR')}
        className={itemClass(isRenovarActive)}
        title={t('nav.renew')}
      >
        <Icon name="renew" />
        {!collapsed && <span>{t('nav.renew')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('ORÇAMENTOS')}
        className={itemClass(isOrcamentosActive)}
        title={t('nav.quote')}
      >
        <Icon name="calc" />
        {!collapsed && <span>{t('nav.quote')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('CADASTRO')}
        className={itemClass(currentView === 'CADASTRO')}
        title={t('nav.register')}
      >
        <Icon name="userPlus" />
        {!collapsed && <span>{t('nav.register')}</span>}
      </button>

      <div className="sidebar-subwrap">
        <button
          type="button"
          onClick={() => setCadastradosOpen((prev) => !prev)}
          className={itemClass(isCadastradosActive)}
          title={t('nav.registered')}
        >
          <Icon name="users" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left sidebar-cadastrados-label">
                {t('nav.registered')}
                {cadastradoActivo && (
                  <small className="sidebar-cadastrados-activo">
                    {t(cadastradoActivo.labelKey)}
                  </small>
                )}
              </span>
              <span className="text-xs">{cadastradosOpen ? '▲' : '▼'}</span>
            </>
          )}
        </button>

        {cadastradosOpen && (
          <div className={`sidebar-submenu ${collapsed ? 'is-flyout' : ''}`}>
            {cadastradosItems.map((subItem) => {
              const isActive = currentView === subItem.id;
              return (
                <button
                  key={subItem.id}
                  type="button"
                  onClick={() => handleSelectView(subItem.id)}
                  className={`sidebar-subitem ${isActive ? 'is-active' : ''}`}
                >
                  {t(subItem.labelKey)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => handleSelectView('VAGAS')}
        className={itemClass(currentView === 'VAGAS')}
        title={t('nav.jobs')}
      >
        <Icon name="job" />
        {!collapsed && <span>{t('nav.jobs')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('ANUNCIANTES')}
        className={itemClass(currentView === 'ANUNCIANTES')}
        title={t('nav.sponsors')}
      >
        <Icon name="megaphone" />
        {!collapsed && <span>{t('nav.sponsors')}</span>}
      </button>

      <button
        type="button"
        onClick={() => handleSelectView('DRONES')}
        className={itemClass(currentView === 'DRONES')}
        title={t('nav.used')}
      >
        <Icon name="drone" />
        {!collapsed && <span>{t('nav.used')}</span>}
      </button>

      <div className="sidebar-portal-wrap">
        <a
          href={URL_PORTAL}
          className={`sidebar-portal ${collapsed ? 'is-collapsed' : ''}`}
          title="orientese.com"
        >
          <img src={collapsed ? FAVICON_PORTAL : LOGO_PORTAL} alt="orientese.com" />
        </a>
      </div>

      <div className="sidebar-bottom-group">
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={toggleCollapsed}
          title={collapsed ? 'Desplegar menú' : 'Replegar menú'}
        >
          <Icon name={collapsed ? 'chevronR' : 'chevronL'} />
          {!collapsed && <span>Replegar</span>}
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <header className="drones-topbar">
        <button
          type="button"
          className="mobile-icon-btn drones-topbar-burger"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="menu" />
        </button>

        <button
          type="button"
          className="drones-topbar-logo"
          onClick={() => handleSelectView('INÍCIO')}
          title={t('nav.home')}
        >
          <img src={LOGO_DRONES} alt="drones.orientese.com" />
        </button>

        <IdentityBlock />
      </header>

      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside
        className={['app-sidebar', mobileOpen ? 'is-open' : '', collapsed ? 'is-collapsed' : ''].join(
          ' '
        )}
      >
        <div className="mobile-drawer-head">
          <span />
          <button
            type="button"
            className="mobile-icon-btn"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>

        <NavContent />
      </aside>
    </>
  );
};

export default Header;
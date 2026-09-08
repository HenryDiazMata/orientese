import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/Logosorientese/LogoDrones11.png';
// LA CARPETA FAVICOM/FAVICON.PNG NO EXISTE EN ESTE PROYECTO
// USAMOS EL MISMO LOGO PARA EL MENÚ REPLEGADO
import faviconImg from '../assets/Logosorientese/LogoDrones11.png';
import ModalLogin from './ModalLogin';
import LanguageSwitcher from './LanguageSwitcher';

/* ICONOS SVG INLINE: NO HACE FALTA LIBRERÍA EXTRA */
const Icon = ({ name, className = 'w-5 h-5' }) => {
  const common = {
    className,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    'aria-hidden': true,
  };

  const paths = {
    home: 'M2.25 12 12 3l9.75 9M4.5 10.5V21h5.25v-6h4.5v6H19.5V10.5',
    calc: 'M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75zM8 8h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01',
    userPlus:
      'M18 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM15 13.5a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6zM21 8.25v4.5M23.25 10.5h-4.5',
    users:
      'M15 19.5a6 6 0 0 0-6-6 6 6 0 0 0-6 6M12 10.5A3.75 3.75 0 1 0 12 3a3.75 3.75 0 0 0 0 7.5zM17.25 7.5a2.25 2.25 0 1 0 0-4.5M20.25 19.5a4.5 4.5 0 0 0-3-4.25',
    briefcase:
      'M8.25 7.5V6A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.5M3.75 9.75h16.5v9A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25v-9z',
    drone:
      'M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM4.5 8.25h3v3h-3zM16.5 8.25h3v3h-3zM4.5 15.75h3v3h-3zM16.5 15.75h3v3h-3zM7.5 9.75h9M7.5 17.25h9M9.75 9.75v7.5M14.25 9.75v7.5',
    job: 'M20.25 14.25v4.5A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25v-4.5M3 10.5h18M12 10.5V21M8.25 10.5V6.75A1.5 1.5 0 0 1 9.75 5.25h4.5a1.5 1.5 0 0 1 1.5 1.5V10.5',
    user: 'M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a7.5 7.5 0 0 1 15 0',
    megaphone:
      'M3.75 9.75v4.5m0-4.5A2.25 2.25 0 0 1 6 7.5h1.5l10.5-3v15L7.5 16.5H6a2.25 2.25 0 0 1-2.25-2.25m0-4.5v4.5',
    chevronL: 'M15.75 19.5 8.25 12l7.5-7.5',
    chevronR: 'M8.25 4.5 15.75 12l-7.5 7.5',
    close: 'M6 18 18 6M6 6l12 12',
    menu: 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5',
    moon: 'M21 14.25A8.25 8.25 0 1 1 9.75 3 6.75 6.75 0 0 0 21 14.25z',
    sun: 'M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z',
  };

  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name] || paths.home} />
    </svg>
  );
};

export const Header = ({ currentView, setCurrentView }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();

  const [showLogin, setShowLogin] = useState(false);
  const [cadastradosOpen, setCadastradosOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* DESKTOP: MENÚ ANCHO O SOLO ICONOS. SE RECUERDA EN EL NAVEGADOR. */
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === '1';
    } catch {
      return false;
    }
  });

  const menuItems = [
    { labelKey: 'nav.home', id: 'INÍCIO', icon: 'home' },
    { labelKey: 'nav.quote', id: 'ORÇAMENTOS', icon: 'calc' },
    { labelKey: 'nav.register', id: 'CADASTRO', icon: 'userPlus' },
    { labelKey: 'nav.professionals', id: 'PROFISSIONAIS', icon: 'briefcase' },
    { labelKey: 'nav.drones', id: 'DRONES', icon: 'drone' },
  ];

  const cadastradosItems = [
    { labelKey: 'nav.pilots', id: 'PILOTOS' },
    { labelKey: 'nav.helpers', id: 'AUXILIARES' },
    { labelKey: 'nav.techMaint', id: 'MANUTENÇÃO' },
    { labelKey: 'nav.techRepair', id: 'CONSERTOS' },
  ];

  const handleSelectView = (viewId) => {
    if (setCurrentView) setCurrentView(viewId);
    setCadastradosOpen(false);
    setMobileOpen(false);
  };

  const handleLoginSuccess = () => {
    setCurrentView('MEU_PERFIL');
    setMobileOpen(false);
  };

  const handleEntrarClick = () => {
    if (isAuthenticated) {
      handleSelectView('MEU_PERFIL');
    } else {
      setShowLogin(true);
      setMobileOpen(false);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sidebarCollapsed', next ? '1' : '0');
      } catch {
        /* IGNORE */
      }
      if (next) setCadastradosOpen(false);
      return next;
    });
  };

  const isCadastradosActive = cadastradosItems.some((item) => item.id === currentView);

  /* AL PASAR A DESKTOP, CIERRA EL DRAWER MÓVIL */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* BLOQUEA EL SCROLL DEL FONDO CON EL MENÚ MÓVIL ABIERTO */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* AVISA AL CSS DEL ANCHO ACTUAL DE LA BARRA (DESKTOP) */
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '4.5rem' : '16rem'
    );
  }, [collapsed]);

  const itemClass = (active) =>
    `btn-menu sidebar-item ${active ? 'btn-menu-active' : 'btn-menu-inactive'} ${
      collapsed ? 'is-collapsed' : ''
    }`;

  const NavContent = () => (
    <>
      <div
        className={`sidebar-logo ${collapsed ? 'is-collapsed' : ''}`}
        onClick={() => handleSelectView('INÍCIO')}
        title={t('nav.home')}
      >
        <img
          src={collapsed ? faviconImg : logoImg}
          alt={t('nav.logoAlt')}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          if (item.id === 'CADASTRO') {
            return (
              <React.Fragment key="cadastro-and-cadastrados">
                <button
                  type="button"
                  onClick={() => handleSelectView(item.id)}
                  className={itemClass(currentView === item.id)}
                  title={t(item.labelKey)}
                >
                  <Icon name={item.icon} />
                  {!collapsed && <span>{t(item.labelKey)}</span>}
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
                        <span className="flex-1 text-left">{t('nav.registered')}</span>
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
              </React.Fragment>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectView(item.id)}
              className={itemClass(currentView === item.id)}
              title={t(item.labelKey)}
            >
              <Icon name={item.icon} />
              {!collapsed && <span>{t(item.labelKey)}</span>}
            </button>
          );
        })}

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
          onClick={handleEntrarClick}
          className={`btn-menu sidebar-item sidebar-item-cta ${collapsed ? 'is-collapsed' : ''}`}
          title={
            isAuthenticated
              ? `${t('nav.loggedAs')}: ${user?.nomeCompleto || user?.email || ''}`
              : t('nav.doLogin')
          }
        >
          <Icon name="user" />
          {!collapsed && <span>{t('nav.enterProfile')}</span>}
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

        <div className={`sidebar-tools ${collapsed ? 'is-collapsed' : ''}`}>
          {!collapsed && (
            <>
              <LanguageSwitcher />
              <small className="sidebar-lang">{i18n.language}</small>
            </>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-btn sidebar-theme"
            title={t('nav.toggleTheme')}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            {!collapsed && <span>{theme === 'light' ? t('nav.dark') : t('nav.light')}</span>}
          </button>
        </div>
      </nav>

      <button
        type="button"
        className="sidebar-collapse-btn"
        onClick={toggleCollapsed}
        title={collapsed ? 'Expandir menú' : 'Replegar menú'}
      >
        <Icon name={collapsed ? 'chevronR' : 'chevronL'} />
        {!collapsed && <span>Replegar</span>}
      </button>
    </>
  );

  return (
    <>
      <div className={`mobile-topbar ${mobileOpen ? 'is-hidden' : ''}`}>
        <button
          type="button"
          className="mobile-icon-btn"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="menu" className="w-6 h-6" />
        </button>

        <img
          src={logoImg}
          alt={t('nav.logoAlt')}
          className="mobile-topbar-logo"
          onClick={() => handleSelectView('INÍCIO')}
        />

        <span className="mobile-icon-btn" />
      </div>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={[
          'app-sidebar',
          mobileOpen ? 'is-open' : '',
          collapsed ? 'is-collapsed' : '',
        ].join(' ')}
      >
        <div className="mobile-drawer-head">
          <span />
          <button
            type="button"
            className="mobile-icon-btn"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
          >
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        <NavContent />
      </aside>

      <ModalLogin
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
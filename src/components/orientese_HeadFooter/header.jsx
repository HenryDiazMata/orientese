// ==========================================
// ARCHIVO COMPLETO: src/components/orientese_HeadFooter/Header.jsx
// HEADER BLANCO DEL PORTAL ORIENTESE
// VENTANITA: VER PERFIL / CERRAR SESION
// SIN SESION: INICIAR SESION
// FOTO SI VIENE EN EL USER. NO HAY CAMPO DE ALTA AUN
// ORDEN DERECHA: NAV + IDIOMA + PERFIL (PERFIL AL EXTREMO)
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function Header({ user, onLogout, setView }) {
  const { t, i18n } = useTranslation('orientese');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cajaRef = useRef(null);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const nombreUsuario = String(
    (user && (user.nombre || user.nome || user.fullName || user.name || user.email)) || ''
  ).trim();

  const fotoUsuario =
    (user && (user.fotoUrl || user.foto || user.fotoPerfil || user.avatar || user.imagem)) || '';

  // ==========================================
  // CERRAR EL MENU AL CLIC FUERA
  // ==========================================
  useEffect(() => {
    const onDocClick = (ev) => {
      if (cajaRef.current && !cajaRef.current.contains(ev.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleVerPerfil = () => {
    setMenuAbierto(false);
    if (typeof setView === 'function') setView('perfil');
  };

  const handleCerrarSesion = () => {
    setMenuAbierto(false);
    if (typeof onLogout === 'function') onLogout();
  };

  const handleIniciarSesion = () => {
    setMenuAbierto(false);
    if (typeof setView === 'function') setView('auth');
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* LADO IZQUIERDO: LOGO */}
        <div className="header-brand-section">
          <div className="logo-container" onClick={() => setView('home')}>
            <img src="/logos/orientese/logorientc2018Azul01.gif" alt="Logo Orientese" className="brand-logo" />
          </div>
        </div>

        {/* LADO DERECHO: NAV + IDIOMA + PERFIL */}
        <div className="header-controls-section">
          <nav className="nav-links">
            <button className="nav-btn" onClick={() => setView('home')}>{t('common.back', 'Inicio')}</button>
            <button className="nav-btn" onClick={() => alert('Sección Quiénes Somos')}>{t('header.about', 'Quiénes Somos')}</button>
            <button className="nav-btn" onClick={() => alert('Sección Contacto')}>{t('header.contact', 'Contacto')}</button>
          </nav>

          {/* ==========================================
              IDIOMA A LA IZQUIERDA DEL PERFIL
              ========================================== */}
          <select className="lang-select" value={i18n.language} onChange={changeLanguage}>
            <option value="es">Español (ES)</option>
            <option value="pt-BR">Português (PT)</option>
            <option value="en">English (EN)</option>
            <option value="fr">Français (FR)</option>
            <option value="it">Italiano (IT)</option>
          </select>

          {/* ==========================================
              PERFIL AL EXTREMO DERECHO
              ========================================== */}
          {user ? (
            <div className="user-session-box" ref={cajaRef} style={{ position: 'relative' }}>
              <button
                type="button"
                className="user-welcome"
                onClick={() => setMenuAbierto((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  borderRadius: '999px',
                  padding: '0.25rem 0.7rem',
                  cursor: 'pointer',
                }}
              >
                {fotoUsuario ? (
                  <img
                    src={fotoUsuario}
                    alt=""
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#BFE8F7',
                      color: '#1A8FD0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {(nombreUsuario || 'U').slice(0, 1).toUpperCase()}
                  </span>
                )}
                <span>
                  Hola, <strong>{nombreUsuario || user.email}</strong>
                </span>
              </button>

              {menuAbierto && (
                <div
                  className="orientese-perfil-menu"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 6px)',
                    minWidth: 180,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    zIndex: 40,
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleVerPerfil}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.65rem 0.9rem',
                      border: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Ver perfil
                  </button>
                  <button
                    type="button"
                    className="btn-logout"
                    onClick={handleCerrarSesion}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.65rem 0.9rem',
                      border: 'none',
                      borderTop: '1px solid #f3f4f6',
                      cursor: 'pointer',
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-auth primary" onClick={handleIniciarSesion}>
              {t('auth.form.loginButton', 'Iniciar Sesión')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
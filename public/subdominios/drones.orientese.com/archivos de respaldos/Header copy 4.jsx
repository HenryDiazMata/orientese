// ==========================================
// Header.jsx
// ==========================================

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/DronesOrienteseCom.png';
import ModalLogin from './ModalLogin';

export const Header = ({ currentView, setCurrentView }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [cadastradosOpen, setCadastradosOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { label: 'INÍCIO', id: 'INÍCIO' },
    { label: 'ORÇAMENTOS', id: 'ORÇAMENTOS' },
    { label: 'CADASTRO', id: 'CADASTRO' },
    // CADASTRADOS se renderiza aparte como dropdown
    { label: 'PROFISSIONAIS', id: 'PROFISSIONAIS' },
    { label: 'DRONES', id: 'DRONES' },
  ];

  const cadastradosItems = [
    { label: 'PILOTOS', id: 'PILOTOS' },
    { label: 'AUXILIARES', id: 'AUXILIARES' },
    { label: 'Técnicos de manutenção', id: 'MANUTENÇÃO' },
    { label: 'Técnicos de conserto', id: 'CONSERTOS' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCadastradosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectView = (viewId) => {
    if (setCurrentView) setCurrentView(viewId);
    setCadastradosOpen(false);
  };

  const handleLoginSuccess = () => {
    setCurrentView('MEU_PERFIL');
  };

  const handleEntrarClick = () => {
    if (isAuthenticated) {
      handleSelectView('MEU_PERFIL');
    } else {
      setShowLogin(true);
    }
  };

  const isCadastradosActive = cadastradosItems.some((item) => item.id === currentView);

  return (
    <>
      <header className="header-fixed w-full">
        {/* Zona del Logo - siempre blanco */}
        <div className="bg-white py-4">
          <div className="container flex justify-center">
            <div
              className="flex justify-center cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleSelectView('INÍCIO')}
            >
              <img
                src={logoImg}
                alt="Drones Orientese"
                className="h-20 md:h-24 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Franja del color del footer */}
        <div style={{ backgroundColor: '#0f172a' }} className="py-3">
          <div className="container flex flex-col items-center gap-3">
            
            {/* Fila superior - Navegación */}
            <nav className="flex flex-wrap justify-center items-center gap-2">
              {menuItems.map((item) => {
                if (item.id === 'CADASTRO') {
                  return (
                    <React.Fragment key="cadastro-and-cadastrados">
                      <button
                        onClick={() => handleSelectView(item.id)}
                        className={`btn-menu ${currentView === item.id ? 'btn-menu-active' : 'btn-menu-inactive'}`}
                      >
                        {item.label}
                      </button>

                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setCadastradosOpen((prev) => !prev)}
                          className={`btn-menu ${isCadastradosActive ? 'btn-menu-active' : 'btn-menu-inactive'} flex items-center gap-1`}
                        >
                          CADASTRADOS
                          <span className="text-xs leading-none">
                            {cadastradosOpen ? '▲' : '▼'}
                          </span>
                        </button>

                        {cadastradosOpen && (
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 min-w-[240px] rounded-md shadow-xl overflow-hidden border-2"
                            style={{
                              backgroundColor: '#ffffff',
                              borderColor: '#0077C8',
                            }}
                          >
                            {cadastradosItems.map((subItem) => {
                              const isActive = currentView === subItem.id;
                              return (
                                <button
                                  key={subItem.id}
                                  onClick={() => handleSelectView(subItem.id)}
                                  className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors"
                                  style={{
                                    backgroundColor: isActive ? '#0077C8' : 'transparent',
                                    color: isActive ? '#ffffff' : '#1f2937',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isActive) {
                                      e.currentTarget.style.backgroundColor = '#0077C8';
                                      e.currentTarget.style.color = '#ffffff';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isActive) {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                      e.currentTarget.style.color = '#1f2937';
                                    }
                                  }}
                                >
                                  {subItem.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  );
                }

                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectView(item.id)}
                    className={`btn-menu ${isActive ? 'btn-menu-active' : 'btn-menu-inactive'}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Fila inferior - Tema + ENTRAR */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={toggleTheme}
                className="theme-btn"
                title="Alternar entre modo claro e escuro"
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>

              <button
                onClick={handleEntrarClick}
                className="btn-menu"
                style={{
                  backgroundColor: '#0077C8',
                  color: '#ffffff',
                  borderColor: '#0077C8',
                }}
                title={
                  isAuthenticated
                    ? `Logado: ${user?.nomeCompleto || user?.email || ''}`
                    : 'Fazer login'
                }
              >
                ENTRAR
              </button>
            </div>
          </div>
        </div>
      </header>

      <ModalLogin
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;
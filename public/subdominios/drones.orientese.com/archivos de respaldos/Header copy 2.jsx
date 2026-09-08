// ==========================================
// Header.jsx
// Cabeçalho com menu + ENTRAR (sempre visível)
// ==========================================

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/DronesOrienteseCom.png';
import ModalLogin from './ModalLogin';

export const Header = ({ currentView, setCurrentView }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const menuItems = [
    { label: 'INÍCIO', id: 'INÍCIO' },
    { label: 'SOMOS', id: 'SOMOS' },
    { label: 'ORÇAMENTOS', id: 'ORÇAMENTOS' },
    { label: 'CADASTRO', id: 'CADASTRO' },
    { label: 'PILOTOS', id: 'PILOTOS' },
    { label: 'AUXILIARES', id: 'AUXILIARES' },
    { label: 'MANUTENÇÃO', id: 'MANUTENÇÃO' },
    { label: 'CONSERTOS', id: 'CONSERTOS' },
    { label: 'PROFISSIONAIS', id: 'PROFISSIONAIS' },
    { label: 'DRONES', id: 'DRONES' },
  ];

  const handleSelectView = (viewId) => {
    if (setCurrentView) setCurrentView(viewId);
  };

  const handleLoginSuccess = () => {
    setCurrentView('MEU_PERFIL');
  };

  // ENTRAR sempre visível:
  // - sem login → abre modal
  // - com login → vai para Meu Perfil
  const handleEntrarClick = () => {
    if (isAuthenticated) {
      handleSelectView('MEU_PERFIL');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <header className="header-fixed w-full py-4">
        <div className="container flex flex-col items-center">
          {/* LOGO */}
          <div
            className="mb-4 flex justify-center cursor-pointer hover:opacity-90 transition-opacity"
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

          {/* MENU */}
          <nav className="flex flex-wrap justify-center items-center gap-2">
            {menuItems.map((item) => {
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

            {/* ENTRAR — sempre com o mesmo texto */}
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

            {/* Tema */}
            <button
              onClick={toggleTheme}
              className="theme-btn ml-1"
              title="Alternar entre modo claro e escuro"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
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
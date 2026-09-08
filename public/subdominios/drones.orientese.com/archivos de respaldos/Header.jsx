// ==========================================
// Header.jsx
// Cabeçalho fixo com logo + menu de navegação + botão de tema
// ==========================================

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import logoImg from '../assets/DronesOrienteseCom.png'; // Verifique se o nome do arquivo está correto

export const Header = ({ currentView, setCurrentView }) => {
  const { theme, toggleTheme } = useTheme();

  // Itens do menu de navegação
  const menuItems = [
    { label: 'INÍCIO', id: 'INÍCIO' },
    { label: 'SOMOS', id: 'SOMOS' },
    { label: 'ORÇAMENTOS', id: 'ORÇAMENTOS' },
    { label: 'PILOTOS', id: 'PILOTOS' },
    { label: 'AUXILIARES', id: 'AUXILIARES' },
    { label: 'MANUTENÇÃO', id: 'MANUTENÇÃO' },
    { label: 'CONSERTOS', id: 'CONSERTOS' },
    { label: 'PROFISSIONAIS', id: 'PROFISSIONAIS' },
    { label: 'DRONES', id: 'DRONES' }
  ];

  // Função para trocar de página
  const handleSelectView = (viewId) => {
    if (setCurrentView) {
      setCurrentView(viewId);
    }
  };

  return (
    <header className="header-fixed w-full py-4">
      <div className="container flex flex-col items-center">
        
        {/* ========== LOGO ========== */}
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

        {/* ========== MENU DE NAVEGAÇÃO ========== */}
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

          {/* Botão de alternar tema Claro / Escuro */}
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
  );
};

export default Header;
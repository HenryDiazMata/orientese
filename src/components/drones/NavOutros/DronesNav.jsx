// ==========================================
// ARCHIVO COMPLETO: orientese/src/components/drones/NavOutros/DronesNav.jsx
// DESCRIPCIÓN: BARRA DE NAVEGACIÓN Y SELECCIÓN DE VISTAS DEL MÓDULO DRONES
// ==========================================

import React from 'react';

// IMPORTACIÓN DE ESTILOS CSS ESPECÍFICOS DE LA NAVEGACIÓN
import './Navegacao.css';

const DronesNav = ({ currentView, setCurrentView, theme, toggleTheme }) => {
  // Lista de secciones/vistas disponibles en el menú de drones
  const navItems = [
    { id: 'INÍCIO', label: 'INÍCIO' },
    { id: 'ORÇAMENTOS', label: 'ORÇAMENTOS' },
    { id: 'PILOTOS', label: 'PILOTOS' },
    { id: 'AUXILIARES', label: 'AUXILIARES' },
    { id: 'MANUTENÇÃO', label: 'MANUTENÇÃO' },
    { id: 'CONSERTOS', label: 'CONSERTOS' },
    { id: 'PROFISSIONAIS', label: 'PROFISSIONAIS' },
    { id: 'DRONES', label: 'DRONES' },
  ];

  return (
    <nav className="menu-container w-full bg-[var(--bg-header)] border-b border-[var(--border-color)] py-3 px-4 shadow-sm transition-colors duration-200">
      <ul className="nav-buttons flex flex-wrap items-center justify-center gap-2 list-none p-0 m-0">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id)}
                className={`btn-nav px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isActive ? 'active' : ''
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}

        {/* Botón Switch para alternar el modo Claro / Escuro */}
        <li className="ml-2">
          <button 
            onClick={toggleTheme} 
            className="btn-nav theme-btn"
            title="Alternar modo Claro / Escuro"
          >
            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DronesNav;
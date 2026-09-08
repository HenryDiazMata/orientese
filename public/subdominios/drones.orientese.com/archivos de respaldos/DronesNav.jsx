import React from 'react';

const DronesNav = ({ currentView, setCurrentView, theme, toggleTheme }) => {
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
    <nav className="w-full bg-[var(--bg-header)] border-b border-[var(--border-color)] py-3 px-4 shadow-sm transition-colors duration-200">
      <ul className="flex flex-wrap items-center justify-center gap-2 list-none p-0 m-0">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600'
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}

        {/* Botón Switch de Tema */}
        <li className="ml-2">
          <button 
            onClick={toggleTheme} 
            className="theme-btn"
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
// ==========================================
// Header.jsx
// Menu principal + ENTRAR + Dark Mode
// ==========================================

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import ModalLogin from './ModalLogin'; // ajuste o caminho se necessário

export default function Header({
  currentView,
  setCurrentView,
  showLoginModal,
  setShowLoginModal
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { isAuthenticated, user, logout } = useAuth();

  const menuItems = [
    { id: 'INICIO', label: 'INÍCIO' },
    { id: 'SOMOS', label: 'SOMOS' },
    { id: 'ORCAMENTOS', label: 'ORÇAMENTOS' },
    { id: 'CADASTRO', label: 'CADASTRO' },
    { id: 'PILOTOS', label: 'PILOTOS' },
    { id: 'AUXILIARES', label: 'AUXILIARES' },
    { id: 'MANUTENCAO', label: 'MANUTENÇÃO' },
    { id: 'CONSERTOS', label: 'CONSERTOS' },
    { id: 'PROFISSIONAIS', label: 'PROFISSIONAIS' },
    { id: 'VAGAS', label: 'VAGAS' },
    { id: 'ANUNCIANTES', label: 'ANUNCIANTES' },
  ];

  const handleEntrarClick = () => {
    if (isAuthenticated) {
      setCurrentView('MEU_PERFIL');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <header
        style={{
          backgroundColor: isDark ? '#0f172a' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
          padding: '12px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <img
              src="src/assets/DronesOrienteseCom.png" // ajuste o caminho do seu logo
              alt="logo de drones.orientese.com"
              style={{ height: 'auto', width: 'auto', cursor: 'pointer' }}
              onClick={() => setCurrentView('INICIO')}
            />
          </div>

          {/* Menu principal */}
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor:
                    currentView === item.id
                      ? '#0077C8'
                      : isDark
                      ? '#334155'
                      : '#cbd5e1',
                  backgroundColor:
                    currentView === item.id
                      ? '#0077C8'
                      : isDark
                      ? '#1e293b'
                      : '#ffffff',
                  color:
                    currentView === item.id
                      ? '#ffffff'
                      : isDark
                      ? '#e2e8f0'
                      : '#334155',
                  fontSize: '13px',
                  fontWeight: currentView === item.id ? '700' : '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Segunda linha: DRONES + ENTRAR + Dark */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setCurrentView('DRONES')}
              style={{
                padding: '7px 16px',
                borderRadius: '20px',
                border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                backgroundColor: currentView === 'DRONES' ? '#0077C8' : isDark ? '#1e293b' : '#ffffff',
                color: currentView === 'DRONES' ? '#fff' : isDark ? '#e2e8f0' : '#334155',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              DRONES
            </button>

            <button
              onClick={handleEntrarClick}
              style={{
                padding: '7px 20px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: '#0077C8',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {isAuthenticated ? 'MEU PERFIL' : 'ENTRAR'}
            </button>

            <button
              onClick={toggleTheme}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                border: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`,
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                color: isDark ? '#fbbf24' : '#64748b',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      {/* Modal de Login */}
      {showLoginModal && (
        <ModalLogin
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            setCurrentView('MEU_PERFIL');
          }}
        />
      )}
    </>
  );
}
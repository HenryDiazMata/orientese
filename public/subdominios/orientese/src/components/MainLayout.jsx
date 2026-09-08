import React from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * MainLayout
 * Ubicación: src/components/MainLayout.jsx
 * Propósito: Layout global que centraliza Header y Footer para todo el portal.
 */
export default function MainLayout({ children, theme, toggleTheme, onNavigate }) {
  return (
    <div className="app-container">
      {/* Cabecera Global con Navegación y Selector de Idiomas */}
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onNavigate={onNavigate} 
      />

      {/* Área donde se renderiza la página activa (Home, Auth, About, etc.) */}
      <main className="main-content">
        {children}
      </main>

      {/* Pie de Página Global Unificado */}
      <Footer />
    </div>
  );
}
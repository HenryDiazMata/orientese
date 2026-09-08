// ==========================================
// ThemeContext.jsx
// Controle central do tema Claro / Escuro
// ==========================================

import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto do tema
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Recupera o tema salvo no navegador ou usa 'light' como padrão
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Aplica a classe 'dark' no <html> sempre que o tema mudar
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Salva a preferência do usuário
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para alternar entre claro e escuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema facilmente
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
};
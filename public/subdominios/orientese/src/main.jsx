import './i18n'; // Carga la configuración del idioma antes de renderizar la app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './App.css'; // Garantiza que siempre cargue los estilos principales

// Importación del Favicon en SVG
import faviconUrl from './assets/favicon_Orientc.svg';

// Inyección dinámica del Favicon
const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
faviconLink.type = 'image/svg+xml';
faviconLink.rel = 'icon';
faviconLink.href = faviconUrl;
document.getElementsByTagName('head')[0].appendChild(faviconLink);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
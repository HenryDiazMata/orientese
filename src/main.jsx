// CARGA DE LA CONFIGURACIÓN GLOBAL DE TRADUCCIONES E IDIOMAS (I18N)
import './i18n.js';

// IMPORTACIONES CORE DE REACT Y REACT DOM PARA LA RENDERIZACIÓN
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// IMPORTACIÓN DEL COMPONENTE PRINCIPAL Y ESTILOS GLOBALES
import App from './App.jsx';
import './index.css';

// INYECCIÓN DINÁMICA DEL FAVICON SEGÚN LA ESTRUCTURA EXISTENTE EN PUBLIC
const faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
faviconLink.type = 'image/x-icon';
faviconLink.rel = 'icon';
faviconLink.href = '/favicon/orientese/favicon.ico'; // RUTA EXACTA SEGÚN TU ÁRBOL DE DIRECTORIOS
document.getElementsByTagName('head')[0].appendChild(faviconLink);

// INICIALIZACIÓN Y RENDERIZADO DE LA APLICACIÓN
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
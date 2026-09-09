import React, { useState } from 'react';

// IMPORTACIÓN DE LAS VISTAS INDEPENDIENTES DESDE LA CARPETA SRC/VIEWS/
import HomePortal from './views/HomePortal';
import DronesView from './views/DronesView';
import FundavalView from './views/FundavalView';

export default function App() {
  // ESTADO LOCAL PARA CONTROLAR Y SIMULAR EL CAMBIO DE VISTA EN ENTORNO LOCAL (LOCALHOST)
  const [currentView, setCurrentView] = useState('main');

  // OBTIENE EL NOMBRE DE HOST DE LA BARRA DE DIRECCIONES DEL NAVEGADOR
  const hostname = window.location.hostname;

  // FUNCIÓN QUE DETECTA EL SUBDOMINIO DE LA URL O PERMITE NAVEGAR EN DESARROLLO LOCAL
  const getSubdomain = () => {
    // SI ESTAMOS TRABAJANDO EN LOCALHOST O EN 127.0.0.1, RETORNAMOS EL ESTADO LOCAL
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return currentView;
    }

    // PARA PRODUCCIÓN EN EL SERVIDOR REAL: EXTRAE EL SUBDOMINIO DE LA URL
    // EJEMPLO: fundaval.orientese.com -> EXTRAE 'fundaval'
    const parts = hostname.split('.');
    if (parts.length >= 3) {
      return parts[0].toLowerCase();
    }

    return 'main';
  };

  // ALMACENA EL SUBDOMINIO ACTIVO
  const subdomain = getSubdomain();

  // CONMUTADOR (SWITCH) QUE ENRUTA Y RENDERIZA LA VISTA CORRESPONDIENTE
  // PASANDO LA FUNCIÓN ONAVIGATE PARA PERMITIR LA INTERACCIÓN ENTRE VISTAS
  switch (subdomain) {
    case 'drones':
      return <DronesView onNavigate={setCurrentView} />;
    case 'fundaval':
      return <FundavalView onNavigate={setCurrentView} />;
    case 'main':
    default:
      return <HomePortal onNavigate={setCurrentView} />;
  }
}
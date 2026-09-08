import React from 'react';

// IMPORTACIÓN DE LAS VISTAS DESDE LA CARPETA SRC/VIEWS/
import HomePortal from './views/HomePortal';
import DronesView from './views/DronesView';
import FundavalView from './views/FundavalView';

export default function App() {
  // OBTIENE EL NOMBRE DE HOST COMPLETO DESDE LA BARRA DE DIRECCIONES DEL NAVEGADOR
  const hostname = window.location.hostname;

  // FUNCIÓN PARA IDENTIFICAR EL SUBDOMINIO DE LA URL
  const getSubdomain = () => {
    // EN ENTORNO LOCAL (LOCALHOST), DEVOLVEMOS 'MAIN' POR DEFECTO.
    // PARA PROBAR FUNDAVAL EN TU PC, CAMBIA TEMPORALMENTE 'MAIN' POR 'FUNDAVAL'
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return 'main'; // CAMBIAR A 'fundaval' O 'drones' PARA PROBAR EN LOCAL
    }

    // DIVIDE LA URL POR PUNTOS (EJEMPLO: fundaval.orientese.com -> ['fundaval', 'orientese', 'com'])
    const parts = hostname.split('.');
    
    // SI TIENE AL MENOS TRES PARTES, SIGNIFICA QUE EXISTE UN SUBDOMINIO
    if (parts.length >= 3) {
      return parts[0].toLowerCase();
    }
    
    return 'main';
  };

  // ALMACENA EL SUBDOMINIO DETECTADO
  const subdomain = getSubdomain();

  // CONMUTADOR QUE RENDERIZA LA VISTA CORRESPONDIENTE SEGÚN EL SUBDOMINIO
  switch (subdomain) {
    case 'drones':
      return <DronesView />;
    case 'fundaval':
      return <FundavalView />;
    case 'main':
    default:
      return <HomePortal />;
  }
}
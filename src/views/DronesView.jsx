// ==========================================
// RUTA: src/views/DronesView.jsx
// ORQUESTADOR DEL SUBDOMINIO DRONES
// AQUI SE UNE EL MENU IZQUIERDO, LA PAGINA CENTRAL Y EL PIE
// ==========================================

import React, { useState } from 'react';

// PROVEEDORES SOLO DE DRONES (TEMA CLARO/OSCURO Y SESION)
import { ThemeProvider } from '../context/drones/ThemeContext';
import { AuthProvider } from '../context/drones/AuthContext';

// MENU LATERAL Y PIE SOLO DE DRONES
import Header from '../components/drones_HeaderFooter/Header';
import Footer from '../components/drones_HeaderFooter/Footer';

// IDIOMAS SOLO DE DRONES
import "../components/drones/i18n";

// CSS SOLO DE DRONES (MENU, PIE Y PORTADA)
import "../components/drones/drones.css";

// PORTADA INICIO (TITULO GRANDE + 3 TARJETAS)
import DronesHome from '../components/drones/NavOutros/DronesHome.jsx';

// SIMULADOR DE PRESUPUESTOS / ORCAMENTOS
import SimuladorDuplo from '../components/drones/Simulador/SimuladorDuplo.jsx';

// VISTAS INTERNAS DE DRONES
import Anunciantes from './drones/anunciantes.jsx';
import Auxiliares from './drones/auxiliares.jsx';
import Cadastro from './drones/cadastro.jsx';
import Consertos from './drones/consertos.jsx';
import Drones from './drones/drones.jsx';
import Manutencao from './drones/manutencao.jsx';
import MeuPerfil from './drones/MeuPerfil.jsx';
import Pilotos from './drones/pilotos.jsx';
import Profissionais from './drones/profissionais.jsx';
import Somos from './drones/somos.jsx';
import Vagas from './drones/vagas.jsx';

function DronesContent({ onNavigate }) {
  // VISTA QUE SE MUESTRA AL ENTRAR. CAMBIA ESTE VALOR SI QUIERES OTRA PAGINA INICIAL
  const [currentView, setCurrentView] = useState('INÍCIO');

  // SEGUN EL BOTON PULSADO EN EL MENU O EN EL PIE, CARGA UNA PAGINA
  const renderView = () => {
    switch (currentView) {
      case 'CADASTRO':
        return <Cadastro setCurrentView={setCurrentView} />;

      case 'PILOTOS':
        return <Pilotos />;

      case 'AUXILIARES':
        return <Auxiliares />;

      case 'CONSERTOS':
        return <Consertos />;

      case 'MANUTENÇÃO':
      case 'MANUTENCAO':
        return <Manutencao />;

      case 'PROFISSIONAIS':
        return <Profissionais />;

      case 'ANUNCIANTES':
        return <Anunciantes />;

      case 'DRONES':
        return <Drones />;

      case 'VAGAS':
        return <Vagas />;

      case 'MEU_PERFIL':
      case 'PERFIL':
        return <MeuPerfil setCurrentView={setCurrentView} />;

      case 'SOMOS':
      case 'QUEM_SOMOS':
        return <Somos />;

      // AQUI SE CARGA EL SIMULADOR REAL (NO EL TEXTO PROVISIONAL)
      case 'ORÇAMENTOS':
      case 'ORCAMENTOS':
        return <SimuladorDuplo />;

      case 'INÍCIO':
      case 'INICIO':
      default:
        return <DronesHome />;
    }
  };

  return (
    // CONTENEDOR GENERAL: EN ESCRITORIO QUEDA MENU A LA IZQUIERDA Y CONTENIDO A LA DERECHA
    <div className="app-container">
      {/* MENU LATERAL IZQUIERDO */}
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      {/* COLUMNA DERECHA: PAGINA ARRIBA Y PIE ABAJO */}
      <div className="drones-main-content">
        <main className="drones-page">
          {renderView()}
        </main>
        <Footer setCurrentView={setCurrentView} />
      </div>
    </div>
  );
}

export default function DronesView({ onNavigate }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DronesContent onNavigate={onNavigate} />
      </AuthProvider>
    </ThemeProvider>
  );
}
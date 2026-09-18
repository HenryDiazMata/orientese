// ==========================================
// ARCHIVO: src/views/DronesView.jsx
// ORQUESTADOR DEL SUBDOMINIO DRONES
// UNE MENU IZQUIERDO + PAGINA CENTRAL + PIE
// NO TOCA HEADER/FOOTER/APP.CSS DEL PORTAL
// ==========================================

import React, { useState } from 'react';

// ==========================================
// PROVEEDORES SOLO DE DRONES
// ==========================================
import { ThemeProvider } from '../context/drones/ThemeContext';
import { AuthProvider } from '../context/drones/AuthContext';

// ==========================================
// MENU LATERAL Y PIE SOLO DEL SUBDOMINIO DRONES
// ==========================================
import Header from '../components/drones_HeaderFooter/Header';
import Footer from '../components/drones_HeaderFooter/Footer';

// ==========================================
// IDIOMAS Y CSS SOLO DE DRONES
// ==========================================
import '../components/drones/i18n';
import '../components/drones/drones.css';

// ==========================================
// PORTADA Y SIMULADOR
// ==========================================
import DronesHome from '../components/drones/NavOutros/DronesHome.jsx';
import SimuladorDuplo from '../components/drones/Simulador/SimuladorDuplo.jsx';

// ==========================================
// VISTAS INTERNAS
// ==========================================
import Anunciantes from './drones/anunciantes.jsx';
import Auxiliares from './drones/auxiliares.jsx';
import Cadastro from './drones/cadastro/cadastro.jsx';
import Consertos from './drones/consertos.jsx';
import Drones from './drones/drones.jsx';
import Manutencao from './drones/manutencao.jsx';
import Perfil from './drones/Perfil.jsx';
import Pilotos from './drones/pilotos.jsx';
import Profissionais from './drones/profissionais.jsx';
import Somos from './drones/somos.jsx';
import Vagas from './drones/vagas.jsx';

function DronesContent({ onNavigate }) {
  // ==========================================
  // VISTA INICIAL AL ENTRAR
  // ==========================================
  const [currentView, setCurrentView] = useState('INÍCIO');

  // ==========================================
  // SEGUN EL BOTON DEL MENU O PIE, CARGA UNA PAGINA
  // VAGAS Y DRONES = SOLO MURAL
  // PUBLICAR SOLO DESDE PERFIL
  // ==========================================
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
        return <Perfil setCurrentView={setCurrentView} />;

      case 'SOMOS':
      case 'QUEM_SOMOS':
        return <Somos />;

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
    <div className="app-container">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <div className="drones-main-content">
        <main className="drones-page">{renderView()}</main>
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
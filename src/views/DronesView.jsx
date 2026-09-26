// ==========================================
// ARCHIVO COMPLETO: src/views/DronesView.jsx
// ORQUESTADOR DEL SUBDOMINIO DRONES
// INICIO = HERO | BIENVENIDA = INSTITUCIONAL
// ACTIVAR / RENOVAR / PLANES = VISTAS PROPIAS
// ==========================================

import React, { useState, useEffect } from 'react';

import { ThemeProvider } from '../context/drones/ThemeContext';
import { AuthProvider } from '../context/drones/AuthContext';

import Header from '../components/drones_HeaderFooter/Header';
import Footer from '../components/drones_HeaderFooter/Footer';

import '../components/drones/i18n';
import '../components/drones/drones.css';

import DronesHome from '../components/drones/NavOutros/DronesHome.jsx';
import InicioHero from './drones/InicioHero.jsx';
import Activar from './drones/Activar.jsx';
import Renovar from './drones/Renovar.jsx';
import Planes from './drones/Planes.jsx';
import SimuladorDuplo from '../components/drones/Simulador/SimuladorDuplo.jsx';

import PanelBeta from './drones/PanelBeta.jsx';
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
  const [currentView, setCurrentView] = useState('INÍCIO');

  // ==========================================
  // UN SOLO TEMA CIELO / AZUL. APAGA DARK GUARDADO
  // ==========================================
  useEffect(() => {
    try {
      localStorage.setItem('theme', 'light');
      localStorage.setItem('drones-theme', 'light');
      localStorage.setItem('dronesTheme', 'light');
    } catch {
      /* IGNORAR SI LOCALSTORAGE FALLA */
    }
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove('dark');
    body.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    body.setAttribute('data-theme', 'light');
    root.style.colorScheme = 'light';
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'BIENVENIDA':
        return <DronesHome setCurrentView={setCurrentView} />;

      case 'PLANES':
        return <Planes setCurrentView={setCurrentView} />;

      case 'ACTIVAR':
        return <Activar setCurrentView={setCurrentView} />;

      case 'RENOVAR':
        return <Renovar />;

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

      case 'PROBAR':
        return <PanelBeta setCurrentView={setCurrentView} />;

      case 'INÍCIO':
      case 'INICIO':
      default:
        return <InicioHero setCurrentView={setCurrentView} />;
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
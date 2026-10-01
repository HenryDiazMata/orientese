// ==========================================
// ARCHIVO: src/views/DronesView.jsx
// Orquestador del subdominio drones
// EspacioPub se monta AQUÍ en todas las páginas
// de PAGINAS_VITRINA excepto ANUNCIANTES
// (esa pantalla ya es la vitrina).
// Ancho 80% = misma columna que Inicio / Activar / Renovar.
// ==========================================

import React, { useState, useEffect } from 'react';

import { ThemeProvider } from '../context/drones/ThemeContext';
import { AuthProvider } from '../context/drones/AuthContext';

import Header from '../components/drones_HeaderFooter/Header';
import Footer from '../components/drones_HeaderFooter/Footer';

import '../components/drones/i18n';
import '../components/drones/drones.css';
import EspacioPub from '../components/drones/espacioPub';

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
import Ventas from './drones/ventas.jsx';
import Manutencao from './drones/manutencao.jsx';
import Perfil from './drones/Perfil.jsx';
import Pilotos from './drones/pilotos.jsx';
import Profissionais from './drones/profissionais.jsx';
import Somos from './drones/somos.jsx';
import Terminos from './drones/terminos.jsx';
import Privacidad from './drones/privacidad.jsx';
import Comunidad from './drones/comunidad.jsx';
import Faq from './drones/faq.jsx';
import Terminos from './drones/terminos.jsx';
import Privacidad from './drones/privacidad.jsx';
import Vagas from './drones/vagas.jsx';

const PAGINA_POR_VISTA = {
  INÍCIO: 'inicio',
  INICIO: 'inicio',
  BIENVENIDA: 'inicio',
  PLANES: 'planes',
  ACTIVAR: 'activar',
  RENOVAR: 'renovar',
  CADASTRO: 'registro',
  PILOTOS: 'pilotos',
  AUXILIARES: 'auxiliares',
  CONSERTOS: 'consertos',
  'MANUTENÇÃO': 'manutencao',
  MANUTENCAO: 'manutencao',
  PROFISSIONAIS: 'profissionais',
  VAGAS: 'vagas',
  VENTAS: 'usados',
  USADOS: 'usados',
  'ORÇAMENTOS': 'presupuestos',
  ORCAMENTOS: 'presupuestos',
};

function DronesContent({ onNavigate }) {
  const [currentView, setCurrentView] = useState('INÍCIO');

  useEffect(() => {
    try {
      localStorage.setItem('theme', 'light');
      localStorage.setItem('drones-theme', 'light');
      localStorage.setItem('dronesTheme', 'light');
    } catch {
      /* ignore */
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
        return <Renovar setCurrentView={setCurrentView} />;
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
      case 'VENTAS':
      case 'USADOS':
        return <Ventas setCurrentView={setCurrentView} />;
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
      case 'TERMINOS':
      case 'TERMOS':
      case 'TERMS':
        return <Terminos />;
      case 'PRIVACIDAD':
      case 'PRIVACIDADE':
      case 'PRIVACY':
        return <Privacidad />;
      case 'COMUNIDAD':
      case 'COMUNIDADE':
        return <Comunidad />;
      case 'FAQ':
        return <Faq />;
        return <Somos />;
      case 'TERMINOS':
      case 'TERMOS':
      case 'TERMS':
        return <Terminos />;
      case 'PRIVACIDAD':
      case 'PRIVACIDADE':
      case 'PRIVACY':
        return <Privacidad />;
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

  const paginaId = PAGINA_POR_VISTA[currentView] || null;
  const mostrarEspacio = Boolean(paginaId) && currentView !== 'ANUNCIANTES';

  return (
    <div className="app-container">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <div className="drones-main-content">
        <main className="drones-page">
          {renderView()}
          {mostrarEspacio ? (
            <div
              style={{
                width: '80%',
                maxWidth: '80%',
                margin: '0 auto',
                boxSizing: 'border-box',
              }}
            >
              <EspacioPub paginaId={paginaId} />
            </div>
          ) : null}
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
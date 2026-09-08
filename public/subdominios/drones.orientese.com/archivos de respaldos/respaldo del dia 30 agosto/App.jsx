import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import Footer from './components/Footer';

import { DronesHome } from './components/DronesHome';
import SimuladorDuplo from './components/SimuladorDuplo';
import Navegacao from './components/Navegacao';

import Cadastro from './views/cadastro';
import PilotosView from './views/pilotos';
import Somos from './views/somos';
import Auxiliares from './views/auxiliares';
import Manutencao from './views/manutencao';
import Consertos from './views/consertos';
import Profissionais from './views/profissionais';
import Drones from './views/drones';
import MeuPerfil from './views/MeuPerfil';

export default function App() {
  const [currentView, setCurrentView] = useState('INÍCIO');
  const [abaAtiva, setAbaAtiva] = useState('buscar-pro');

  const renderView = () => {
    switch (currentView) {
      case 'INÍCIO':
        return <DronesHome />;
      case 'SOMOS':
        return <Somos />;
      case 'ORÇAMENTOS':
        return <SimuladorDuplo />;
      case 'CADASTRO':
        return <Cadastro />;
      case 'PILOTOS':
        return <PilotosView />;
      case 'AUXILIARES':
        return <Auxiliares />;
      case 'MANUTENÇÃO':
        return <Manutencao />;
      case 'CONSERTOS':
        return <Consertos />;
      case 'PROFISSIONAIS':
        return (
          <div className="view-profissionais-wrapper">
            <Navegacao abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
            <Profissionais abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
          </div>
        );
      case 'DRONES':
        return <Drones />;
      case 'MEU_PERFIL':
        return <MeuPerfil setCurrentView={setCurrentView} />;

      // ========== NUEVAS PÁGINAS ==========
      case 'VAGAS':
        return (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Vagas</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '24px' }}>
              Em breve disponibilizaremos as vagas de emprego e oportunidades da área de drones.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Em breve
            </div>
          </div>
        );

      case 'ANUNCIANTES':
        return (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Anunciantes / Patrocinadores</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '24px' }}>
              Em breve você poderá anunciar sua empresa, produtos ou serviços aqui no portal.
            </p>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              borderRadius: '9999px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Em breve
            </div>
          </div>
        );
      // ====================================

      default:
        return <DronesHome />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-container">
          <Header currentView={currentView} setCurrentView={setCurrentView} />
          <main className="main-content">{renderView()}</main>
          <Footer setCurrentView={setCurrentView} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
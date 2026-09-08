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
      case 'VAGAS':
        return (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <h2>Vagas</h2>
            <p>Seção em construção — em breve você poderá criar e gerenciar vagas aqui.</p>
          </div>
        );
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
import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import Footer from './components/Footer';

// Vistas / componentes de cada pantalla
import { DronesHome } from './components/DronesHome';
import SimuladorDuplo from './components/Simulador/SimuladorDuplo';
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
  // Vista actual. El id NUNCA se traduce: es la clave del switch.
  const [currentView, setCurrentView] = useState('INÍCIO');

  // Pestaña interna de la vista PROFISSIONAIS
  const [abaAtiva, setAbaAtiva] = useState('buscar-pro');

  // Si venimos de CADASTRO y hay que abrir el formulario de auxiliares
  const [openAuxiliarForm, setOpenAuxiliarForm] = useState(false);

  // Decide qué pantalla pintar según currentView
  const renderView = () => {
    switch (currentView) {
      case 'INÍCIO':
        return <DronesHome />;

      case 'SOMOS':
        return <Somos />;

      case 'ORÇAMENTOS':
        return <SimuladorDuplo />;

      case 'CADASTRO':
        return (
          <Cadastro
            setCurrentView={setCurrentView}
            setOpenAuxiliarForm={setOpenAuxiliarForm}
          />
        );

      case 'PILOTOS':
        return <PilotosView />;

      case 'AUXILIARES':
        return (
          <Auxiliares
            openFormOnMount={openAuxiliarForm}
            onFormOpened={() => setOpenAuxiliarForm(false)}
          />
        );

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
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Vagas</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '24px' }}>
              Em breve disponibilizaremos as vagas de emprego e oportunidades da área de drones.
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: '#dbeafe',
                color: '#1d4ed8',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.95rem',
              }}
            >
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
            <div
              style={{
                display: 'inline-block',
                padding: '8px 20px',
                backgroundColor: '#dbeafe',
                color: '#1d4ed8',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '0.95rem',
              }}
            >
              Em breve
            </div>
          </div>
        );

      default:
        return <DronesHome />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {/*
          Desktop (md+): fila → sidebar a la izquierda + columna contenido.
          Móvil: columna → barra hamburguesa arriba (dentro de Header) + contenido.
        */}
        <div className="app-container min-h-screen flex flex-col md:flex-row">
          {/* Menú: sidebar en desktop, hamburguesa en móvil */}
          <Header currentView={currentView} setCurrentView={setCurrentView} />

          {/* Columna derecha: página + pie */}
          <div className="flex-1 flex flex-col min-w-0">
            <main className="main-content flex-1">{renderView()}</main>
            <Footer setCurrentView={setCurrentView} />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
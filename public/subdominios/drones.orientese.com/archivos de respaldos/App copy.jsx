import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Componentes Principales
import { DronesHome } from './components/DronesHome';
import SimuladorDuplo from './components/SimuladorDuplo';
import Navegacao from './components/Navegacao';

// Vistas da pasta views/
import PilotosView from './views/pilotos';
import Somos from './views/somos';
import Auxiliares from './views/auxiliares';
import Manutencao from './views/manutencao';
import Consertos from './views/consertos';
import Profissionais from './views/profissionais';
import Drones from './views/drones';

function App() {
  // Estado inicial fijado en 'INÍCIO'
  const [currentView, setCurrentView] = useState('INÍCIO');

  // Estado para la sub-navegación dentro de la vista de profesionales
  const [abaAtiva, setAbaAtiva] = useState('buscar-pro');

  // Helper para renderizar la vista de Profesionales pasándole las props necesarias
  const renderProfissionaisView = () => {
    return (
      <div style={{ padding: '20px' }}>
        {/* Menú de navegación secundario */}
        <Navegacao abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
        
        {/* Vista unificada que maneja sus propios componentes internos */}
        <Profissionais abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      </div>
    );
  };

  // Enrutador de vistas principales
  const renderView = () => {
    switch (currentView) {
      case 'INÍCIO':
        return <DronesHome />;
      case 'SOMOS':
        return <Somos />;
      case 'ORÇAMENTOS':
        return <SimuladorDuplo />;
      case 'PILOTOS':
        return <PilotosView />;
      case 'AUXILIARES':
        return <Auxiliares />;
      case 'MANUTENÇÃO':
        return <Manutencao />;
      case 'CONSERTOS':
        return <Consertos />;
      case 'PROFISSIONAIS':
        return renderProfissionaisView();
      case 'DRONES':
        return <Drones />;
      default:
        return <DronesHome />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        {/* Encabezado Fijo con Botones */}
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        {/* Vista activa */}
        <main className="flex-1">
          {renderView()}
        </main>

        {/* Pie de página con navegación */}
        <Footer setCurrentView={setCurrentView} />
      </div>
    </ThemeProvider>
  );
}

export default App;
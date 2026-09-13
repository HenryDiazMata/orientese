import React, { useState, useEffect } from 'react';
import DronesNav from './DronesNav';
import DronesHome from './DronesHome';
import SimuladorDuplo from './SimuladorDuplo';

// 📌 IMPORTACIÓN DE TODOS LOS MÓDULOS DE COMPONENTES
import Pilotos from './Pilotos';
import Auxiliares from './Auxiliares';
import Manutencao from './Manutencao';
import Consertos from './Consertos';
import Profissionais from './Profissionais';
import Drones from './Drones';

// Manejo seguro del logo en public o src
import logoDronesImg from './Logo_drones_orientese_com.png';

const DronesSubdomain = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  const [theme, setTheme] = useState('light');
  const [imgError, setImgError] = useState(false);

  // Alterna el tema (Light/Dark)
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      
      {/* 📌 HEADER FIJO */}
      <header className="sticky top-0 z-50 bg-white dark:bg-white shadow-sm border-b border-gray-200">
        <div className="text-center py-4 px-2">
          {!imgError ? (
            <img 
              src={logoDronesImg} 
              alt="drones.orientese.com" 
              className="h-16 max-h-20 mx-auto object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="inline-flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-2xl font-extrabold text-gray-900">
                drones.<span className="text-blue-600">orientese.com</span>
              </span>
            </div>
          )}
        </div>

        <DronesNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
      </header>

      {/* 📦 CONTENIDO PRINCIPAL */}
      <main className="flex-grow py-6">
        {activeTab === 'inicio' && <DronesHome setActiveTab={setActiveTab} />}
        {activeTab === 'orcamentos' && <SimuladorDuplo />}
        {activeTab === 'pilotos' && <Pilotos />}
        {activeTab === 'auxiliares' && <Auxiliares />}
        {activeTab === 'manutencao' && <Manutencao />}
        {activeTab === 'consertos' && <Consertos />}
        {activeTab === 'profissionais' && <Profissionais />}
        {activeTab === 'drones' && <Drones />}
      </main>

      {/* 🔻 FOOTER */}
      <footer className="bg-gray-900 text-white pt-10 pb-6 mt-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1 */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">drones.orientese.com</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Ecosistema integrado de soluções aéreas, conectando clientes, pilotos certificados, auxiliares e serviços especializados.
            </p>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Endereço:</strong> São Paulo - SP, Brasil
            </p>
            <p className="text-xs text-gray-300">
              <strong className="text-white">Contato:</strong> contato@orientese.com
            </p>
          </div>

          {/* Columna 2 */}
          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Navegação</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => { setActiveTab('inicio'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Início</button></li>
              <li><button onClick={() => { setActiveTab('orcamentos'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Orçamentos</button></li>
              <li><button onClick={() => { setActiveTab('pilotos'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Pilotos</button></li>
              <li><button onClick={() => { setActiveTab('auxiliares'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Auxiliares</button></li>
              <li><button onClick={() => { setActiveTab('manutencao'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Manutenção</button></li>
              <li><button onClick={() => { setActiveTab('consertos'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Consertos</button></li>
              <li><button onClick={() => { setActiveTab('profissionais'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Profissionais</button></li>
              <li><button onClick={() => { setActiveTab('drones'); window.scrollTo(0, 0); }} className="hover:text-blue-400 transition-colors">Drones</button></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">Institucional</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#termos" className="hover:text-blue-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#privacidade" className="hover:text-blue-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#homologacao" className="hover:text-blue-400 transition-colors">Homologação ANAC / DECEA</a></li>
              <li><a href="#suporte" className="hover:text-blue-400 transition-colors">Suporte Técnico</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} orientese.com - Todos os direitos reservados - Desarrollado por Henry Díaz.</p>
        </div>
      </footer>

    </div>
  );
};

export default DronesSubdomain;
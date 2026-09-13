import React from 'react';
import './Navegacao.css';

export default function Navegacao({ abaAtiva, setAbaAtiva }) {
  return (
    <div className="menu-container text-center mb-7 px-4 font-sans">
      <h1 className="main-title text-2xl md:text-3xl font-extrabold text-gray-900 mb-5">
        Rede de Profissionais e Oportunidades de Vagas
      </h1>
      
      <div className="nav-buttons flex flex-wrap justify-center items-center gap-2.5">
        {/* BLOQUE PROFISSIONAIS */}
        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'buscar-pro'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('buscar-pro')}
        >
          Buscar Profissionais
        </button>

        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'criar-pro'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('criar-pro')}
        >
          + Criar Perfil
        </button>

        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'editar-pro'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('editar-pro')}
        >
          Editar Perfil
        </button>

        {/* LEYENDA CENTRAL */}
        <div className="label-center bg-gray-100 text-gray-600 text-xs font-bold tracking-wider px-3.5 py-2 rounded-lg border border-dashed border-gray-300 uppercase my-1">
          BUSCAR E ENCONTRAR
        </div>

        {/* BLOQUE VAGAS */}
        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'mural-vagas'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('mural-vagas')}
        >
          Mural de Vagas
        </button>

        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'publicar-vaga'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('publicar-vaga')}
        >
          + Publicar Vaga
        </button>

        <button 
          className={`btn-nav px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
            abaAtiva === 'editar-vaga'
              ? 'active bg-blue-600 border-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
          }`}
          onClick={() => setAbaAtiva && setAbaAtiva('editar-vaga')}
        >
          Editar Vaga
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import './Navegacao.css';

export default function Navegacao({ abaAtiva, setAbaAtiva }) {
  return (
    <div className="menu-container">
      <h1 className="main-title">Rede de Profissionais e Oportunidades de Vagas</h1>
      
      <div className="nav-buttons">
        {/* BLOQUE PROFISSIONAIS */}
        <button 
          className={`btn-nav ${abaAtiva === 'buscar-pro' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('buscar-pro')}
        >
          Buscar Profissionais
        </button>

        <button 
          className={`btn-nav ${abaAtiva === 'criar-pro' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('criar-pro')}
        >
          + Criar Perfil
        </button>

        <button 
          className={`btn-nav ${abaAtiva === 'editar-pro' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('editar-pro')}
        >
          Editar Perfil
        </button>

        {/* LEYENDA CENTRAL */}
        <div className="label-center">
          BUSCAR E ENCONTRAR
        </div>

        {/* BLOQUE VAGAS */}
        <button 
          className={`btn-nav ${abaAtiva === 'mural-vagas' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('mural-vagas')}
        >
          Mural de Vagas
        </button>

        <button 
          className={`btn-nav ${abaAtiva === 'publicar-vaga' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('publicar-vaga')}
        >
          + Publicar Vaga
        </button>

        <button 
          className={`btn-nav ${abaAtiva === 'editar-vaga' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('editar-vaga')}
        >
          Editar Vaga
        </button>
      </div>
    </div>
  );
}
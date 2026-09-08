import React, { useState } from 'react';
import CadastroManutencao from '../components/formularios/CadastroManutencao';

const ESTADOS_BRASIL = [
  'Todos os Estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SERVICOS_MANUTENCAO = [
  'Todos os Serviços',
  'Reparo Eletrônico / Placas',
  'Manutenção Preventiva',
  'Troca de Peças e Motores',
  'Calibração de Gimbal / Câmera',
  'Manutenção em Drones Agrícolas'
];

export default function ManutencaoView() {
  const [modo, setModo] = useState('lista');

  // Estados de Filtros
  const [filtroServico, setFiltroServico] = useState('Todos os Serviços');
  const [filtroEstado, setFiltroEstado] = useState('Todos os Estados');
  const [filtroTexto, setFiltroTexto] = useState('');

  const handleLimparFiltros = () => {
    setFiltroServico('Todos os Serviços');
    setFiltroEstado('Todos os Estados');
    setFiltroTexto('');
  };

  return (
    <div className="manutencao-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* CABECERA PRINCIPAL */}
      <div style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid var(--border-color)',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ margin: 0 }}>🛠️ Manutenção e Assistência Técnica</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '14px' }}>
            Encontre oficinas especializadas e técnicos qualificados para conserto de drones
          </p>
        </div>

        {/* BOTONES ALINEADOS */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {modo !== 'lista' && (
            <button
              onClick={() => setModo('lista')}
              style={{ padding: '10px 16px', fontSize: '14px', backgroundColor: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              ⬅️ Ver Diretório
            </button>
          )}

          <button
            onClick={() => setModo(modo === 'cadastro' ? 'lista' : 'cadastro')}
            style={{ 
              padding: '10px 18px', 
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: modo === 'cadastro' ? '#4b5563' : 'var(--primary-color, #2563eb)'
            }}
          >
            {modo === 'cadastro' ? '✖️ Cancelar Cadastro' : '➕ Cadastrar Assistência'}
          </button>

          <button
            onClick={() => setModo(modo === 'login' ? 'lista' : 'login')}
            style={{ 
              padding: '10px 18px', 
              fontSize: '14px', 
              fontWeight: 'bold',
              borderRadius: '6px',
              border: '1px solid #059669',
              cursor: 'pointer',
              backgroundColor: '#14b8a6',
              color: '#ffffff',
              boxShadow: '0 3px 6px rgba(5, 150, 105, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            🔑 Entrar / Meu Perfil
          </button>

        </div>
      </div>

      {/* 1. MODO REGISTRO */}
      {modo === 'cadastro' && (
        <CadastroManutencao onSalvar={() => setModo('lista')} />
      )}

      {/* 2. MODO LOGIN / MI PERFIL (PLACEHOLDER) */}
      {modo === 'login' && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          border: '1px solid var(--border-color)', 
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '20px auto',
          backgroundColor: 'var(--bg-main)'
        }}>
          <h3 style={{ color: '#14b8a6' }}>🔐 Área do Membro / Meu Perfil</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Em breve: Login e painel da assistência técnica para gerenciar ordens, dados e plano.
          </p>
        </div>
      )}

      {/* 3. MODO DIRECTORIO */}
      {modo === 'lista' && (
        <div className="manutencao-lista-container">
          
          {/* FILTROS DE BÚSQUEDA */}
          <div style={{
            backgroundColor: 'var(--bg-main, #f9fafb)',
            border: '1px solid var(--border-color, #e5e7eb)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0 }}>🔍 Buscar Oficinas e Técnicos</h4>
              
              <button
                onClick={handleLimparFiltros}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              
              {/* Tipo de Servicio */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  1. Tipo de Servico Técnico
                </label>
                <select
                  value={filtroServico}
                  onChange={(e) => setFiltroServico(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {SERVICOS_MANUTENCAO.map(servico => (
                    <option key={servico} value={servico}>{servico}</option>
                  ))}
                </select>
              </div>

              {/* Estado */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  2. Estado (UF)
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {ESTADOS_BRASIL.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              {/* Búsqueda por Nombre / Marca */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  3. Busca por Nome, Cidade ou Marca
                </label>
                <input
                  type="text"
                  placeholder="Ex: DJI, Campinas ou DroneFix..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>

            </div>
          </div>

          {/* RESULTADOS */}
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <h3>📋 Diretório de Assistências Técnicas</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Os resultados são atualizados automaticamente ao selecionar qualquer opção acima.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
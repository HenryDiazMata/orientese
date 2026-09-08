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

// Tags recomendadas para búsqueda rápida
const TAGS_BUSCA_RAPIDA = ['DJI', 'Autel', 'FPV', 'Agrícola', 'Campinas', 'São Paulo'];

export default function ManutencaoView() {
  const [modo, setModo] = useState('lista');

  // Vista de resultados: 'lista' o 'mapa'
  const [vistaResultados, setVistaResultados] = useState('lista');

  // Estados de Filtros Principales
  const [filtroServico, setFiltroServico] = useState('Todos os Serviços');
  const [filtroEstado, setFiltroEstado] = useState('Todos os Estados');
  const [filtroTexto, setFiltroTexto] = useState('');

  // Estados de Filtros Avanzados (Checkboxes)
  const [somenteAutorizadas, setSomenteAutorizadas] = useState(false);
  const [aceitaEnvios, setAceitaEnvios] = useState(false);
  const [orcamentoGratuito, setOrcamentoGratuito] = useState(false);

  // Ordenamiento
  const [ordenarPor, setOrdenarPor] = useState('recomendadas');

  const handleLimparFiltros = () => {
    setFiltroServico('Todos os Serviços');
    setFiltroEstado('Todos os Estados');
    setFiltroTexto('');
    setSomenteAutorizadas(false);
    setAceitaEnvios(false);
    setOrcamentoGratuito(false);
    setOrdenarPor('recomendadas');
  };

  const handleAplicarTag = (tag) => {
    setFiltroTexto(tag);
  };

  return (
    <div className="manutencao-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* CABECERA PRINCIPAL */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid var(--border-color, #e5e7eb)',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ margin: 0 }}>🛠️ Manutenção e Assistência Técnica</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted, #6b7280)', fontSize: '14px' }}>
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
          border: '1px solid var(--border-color, #e5e7eb)', 
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '20px auto',
          backgroundColor: 'var(--bg-main, #ffffff)'
        }}>
          <h3 style={{ color: '#14b8a6' }}>🔐 Área do Membro / Meu Perfil</h3>
          <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '14px' }}>
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
            marginBottom: '25px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔍 Buscar Oficinas e Técnicos
              </h4>
              
              <button
                onClick={handleLimparFiltros}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
            
            {/* GRID PRINCIPAL DE FILTROS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              
              {/* Tipo de Servicio */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  1. Tipo de Serviço Técnico
                </label>
                <select
                  value={filtroServico}
                  onChange={(e) => setFiltroServico(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
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
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
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
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
                />
              </div>

            </div>

            {/* TAGS RÁPIDAS DE BÚSQUEDA */}
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted, #6b7280)', fontWeight: '500' }}>
                Busca rápida:
              </span>
              {TAGS_BUSCA_RAPIDA.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleAplicarTag(tag)}
                  style={{
                    fontSize: '11px',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    backgroundColor: filtroTexto === tag ? '#e0f2fe' : '#ffffff',
                    color: filtroTexto === tag ? '#0369a1' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* FILTROS AVANZADOS (CHECKBOXES) */}
            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px dashed #e5e7eb',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={somenteAutorizadas}
                  onChange={(e) => setSomenteAutorizadas(e.target.checked)}
                  style={{ cursor: 'pointer', accentColor: '#2563eb' }}
                />
                🛡️ Autorizada / Certificada
              </label>

              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={aceitaEnvios}
                  onChange={(e) => setAceitaEnvios(e.target.checked)}
                  style={{ cursor: 'pointer', accentColor: '#2563eb' }}
                />
                📦 Aceita envio por correios
              </label>

              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                <input
                  type="checkbox"
                  checked={orcamentoGratuito}
                  onChange={(e) => setOrcamentoGratuito(e.target.checked)}
                  style={{ cursor: 'pointer', accentColor: '#2563eb' }}
                />
                🏷️ Orçamento Gratuito
              </label>
            </div>

          </div>

          {/* CONTROL DE VISTA Y ORDENAMIENTO DE RESULTADOS */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            {/* VISTA MAPA / LISTA */}
            <div style={{ display: 'flex', backgroundColor: '#e5e7eb', borderRadius: '6px', padding: '3px' }}>
              <button
                onClick={() => setVistaResultados('lista')}
                style={{
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: vistaResultados === 'lista' ? '#ffffff' : 'transparent',
                  color: vistaResultados === 'lista' ? '#111827' : '#6b7280',
                  boxShadow: vistaResultados === 'lista' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                📋 Lista
              </button>
              <button
                onClick={() => setVistaResultados('mapa')}
                style={{
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: vistaResultados === 'mapa' ? '#ffffff' : 'transparent',
                  color: vistaResultados === 'mapa' ? '#111827' : '#6b7280',
                  boxShadow: vistaResultados === 'mapa' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                🗺️ Mapa
              </button>
            </div>

            {/* ORDENAR POR */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted, #6b7280)', fontWeight: 'bold' }}>
                Ordenar por:
              </span>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px', backgroundColor: '#fff' }}
              >
                <option value="recomendadas">⭐ Mais Recomendadas</option>
                <option value="distancia">📍 Menor Distância</option>
                <option value="alfabetica">🔤 Ordem Alfabética</option>
              </select>
            </div>
          </div>

          {/* RESULTADOS / MAPA CONTAINER */}
          {vistaResultados === 'lista' ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <h3>📋 Diretório de Assistências Técnicas</h3>
              <p style={{ color: 'var(--text-muted, #6b7280)' }}>
                Os resultados são atualizados automaticamente ao selecionar qualquer opção acima.
              </p>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              border: '2px dashed #d1d5db'
            }}>
              <h3>🗺️ Mapa de Assistências Técnicas</h3>
              <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '14px' }}>
                Aqui será exibido o mapa interativo (Google Maps / Leaflet) com a localização exata dos técnicos filtrados.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
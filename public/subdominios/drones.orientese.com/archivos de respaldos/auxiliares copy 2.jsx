import React, { useState } from 'react';
import CadastroAuxiliar from '../components/formularios/CadastroAuxiliar';

const ESTADOS_BRASIL = [
  'Todos os Estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const FUNCOES_AUXILIAR = [
  'Todas as Funções',
  'Auxiliar de Campo / Apoio Terrestre',
  'Observador Visual (VO) - BVLOS',
  'Técnico em Manutenção / Montagem',
  'Operador de Carga / Baterias',
  'Apoio em Mapeamento / GCPs (Pontos de Controle)',
  'Segurança de Área / Balizamento'
];

export default function AuxiliaresView() {
  const [modo, setModo] = useState('lista');

  // Estados para los Filtros de Búsqueda
  const [filtroFuncao, setFiltroFuncao] = useState('Todas as Funções');
  const [filtroEstado, setFiltroEstado] = useState('Todos os Estados');
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('Todos');
  const [filtroTexto, setFiltroTexto] = useState('');

  const handleLimparFiltros = () => {
    setFiltroFuncao('Todas as Funções');
    setFiltroEstado('Todos os Estados');
    setFiltroDisponibilidade('Todos');
    setFiltroTexto('');
  };

  return (
    <div className="auxiliares-page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* CABECERA PRINCIPAL CON ALINEACIÓN AL BORDE */}
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
          <h2 style={{ margin: 0 }}>🦺 Auxiliares e Auxiliares de Campo</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '14px' }}>
            Encontre auxiliares qualificados para apoio terrestre e operações com drones
          </p>
        </div>

        {/* BOTONES ALINEADOS AL BORDE DERECHO */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {/* Botón Volver al directorio */}
          {modo !== 'lista' && (
            <button
              onClick={() => setModo('lista')}
              className="btn-submit"
              style={{ width: 'auto', padding: '10px 16px', fontSize: '14px', backgroundColor: '#6b7280' }}
            >
              ⬅️ Ver Diretório
            </button>
          )}

          {/* Botón Cadastrar-se */}
          <button
            onClick={() => setModo(modo === 'cadastro' ? 'lista' : 'cadastro')}
            className="btn-submit"
            style={{ 
              width: 'auto', 
              padding: '10px 18px', 
              fontSize: '14px',
              backgroundColor: modo === 'cadastro' ? '#4b5563' : 'var(--primary-color, #2563eb)'
            }}
          >
            {modo === 'cadastro' ? '✖️ Cancelar Cadastro' : '➕ Cadastrar-se'}
          </button>

          {/* Botón Entrar / Meu Perfil en Aguamarina + Sombra Esmeralda */}
          <button
            onClick={() => setModo(modo === 'login' ? 'lista' : 'login')}
            style={{ 
              width: 'auto', 
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

      {/* 1. MODO REGISTRO (CONECTADO AL FORMULARIO CORRESPONDIENTE) */}
      {modo === 'cadastro' && (
        <CadastroAuxiliar onSalvar={() => setModo('lista')} />
      )}

      {/* 2. MODO LOGIN / MI PERFIL */}
      {modo === 'login' && (
        <div className="login-placeholder" style={{ 
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
            Em breve: Login e painel do auxiliar para gerenciar assinatura, pausar ou alterar dados.
          </p>
        </div>
      )}

      {/* 3. MODO DIRECTORIO */}
      {modo === 'lista' && (
        <div className="auxiliares-lista-container">
          
          {/* BUSCADOR Y FILTROS ESPECÍFICOS PARA AUXILIARES */}
          <div style={{
            backgroundColor: 'var(--bg-main, #f9fafb)',
            border: '1px solid var(--border-color, #e5e7eb)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0 }}>🔍 Buscar e Filtrar Auxiliares</h4>
              
              <button
                onClick={handleLimparFiltros}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 'bold'
                }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              
              {/* 1. Función / Especialidad del Auxiliar */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  1. Função / Especialidade
                </label>
                <select
                  value={filtroFuncao}
                  onChange={(e) => setFiltroFuncao(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {FUNCOES_AUXILIAR.map((funcao) => (
                    <option key={funcao} value={funcao}>{funcao}</option>
                  ))}
                </select>
              </div>

              {/* 2. Estado (UF) */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  2. Estado (UF)
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  {ESTADOS_BRASIL.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              {/* 3. Disponibilidad */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  3. Status de Disponibilidade
                </label>
                <select
                  value={filtroDisponibilidade}
                  onChange={(e) => setFiltroDisponibilidade(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                >
                  <option value="Todos">Todos os Status</option>
                  <option value="Disponíveis">Apenas Disponíveis</option>
                  <option value="Indisponíveis">Indisponíveis / Pausados</option>
                </select>
              </div>

              {/* 4. Nombre o Ciudad */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                  4. Busca por Nome ou Cidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Santos ou Ribeirão Preto..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>

            </div>
          </div>

          {/* LISTADO DE RESULTADOS */}
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <h3>📋 Diretório de Auxiliares Cadastrados</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Os resultados são atualizados automaticamente ao selecionar qualquer opção acima.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
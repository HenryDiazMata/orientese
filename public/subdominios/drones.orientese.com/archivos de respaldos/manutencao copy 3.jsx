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

const TAGS_BUSCA_RAPIDA = ['DJI', 'Autel', 'FPV', 'Agrícola', 'Campinas', 'São Paulo'];

// Datos de prueba (Dummy Data) para previsualizar las Cards
const OFICINAS_MOCK = [
  {
    id: 1,
    nomeEmpresa: 'DroneFix Assistência Técnica',
    responsavelTecnico: 'Roberto Silva',
    whatsapp: '19999998888',
    estado: 'SP',
    cidade: 'Campinas',
    marcasAtendidas: 'DJI, Autel, FPV',
    especialidades: ['Reparo Eletrônico / Placas', 'Troca de Peças e Motores', 'Calibração de Gimbal / Câmera'],
    isAutorizada: true,
    detalhesAutorizada: 'Centro Certificado DJI',
    ofereceOrcamentoGratis: true,
    atendeEnvioCorreios: true,
    avaliacao: 4.9,
    avaliacoesQtd: 28
  },
  {
    id: 2,
    nomeEmpresa: 'AgroDrone Manutenção Especializada',
    responsavelTecnico: 'Carlos Eduardo',
    whatsapp: '16988887777',
    estado: 'SP',
    cidade: 'Ribeirão Preto',
    marcasAtendidas: 'DJI Agras, XAG',
    especialidades: ['Manutenção em Drones Agrícolas', 'Manutenção Preventiva'],
    isAutorizada: false,
    detalhesAutorizada: '',
    ofereceOrcamentoGratis: false,
    atendeEnvioCorreios: true,
    avaliacao: 4.8,
    avaliacoesQtd: 15
  }
];

export default function ManutencaoView() {
  const [modo, setModo] = useState('lista');
  const [vistaResultados, setVistaResultados] = useState('lista');

  // Estados de Filtros
  const [filtroServico, setFiltroServico] = useState('Todos os Serviços');
  const [filtroEstado, setFiltroEstado] = useState('Todos os Estados');
  const [filtroTexto, setFiltroTexto] = useState('');
  const [somenteAutorizadas, setSomenteAutorizadas] = useState(false);
  const [aceitaEnvios, setAceitaEnvios] = useState(false);
  const [orcamentoGratuito, setOrcamentoGratuito] = useState(false);
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
              gap: '6px'
            }}
          >
            🔑 Entrar / Meu Perfil
          </button>
        </div>
      </div>

      {modo === 'cadastro' && (
        <CadastroManutencao onSalvar={() => setModo('lista')} />
      )}

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

      {modo === 'lista' && (
        <div className="manutencao-lista-container">
          
          {/* BARRA DE FILTROS */}
          <div style={{
            backgroundColor: 'var(--bg-main, #f9fafb)',
            border: '1px solid var(--border-color, #e5e7eb)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '16px' }}>🔍 Buscar Oficinas e Técnicos</h4>
              <button
                onClick={handleLimparFiltros}
                style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>1. Tipo de Serviço Técnico</label>
                <select value={filtroServico} onChange={(e) => setFiltroServico(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {SERVICOS_MANUTENCAO.map(servico => (
                    <option key={servico} value={servico}>{servico}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>2. Estado (UF)</label>
                <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {ESTADOS_BRASIL.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>3. Busca por Nome, Cidade ou Marca</label>
                <input
                  type="text"
                  placeholder="Ex: DJI, Campinas ou DroneFix..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted, #6b7280)', fontWeight: '500' }}>Busca rápida:</span>
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
                    cursor: 'pointer'
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #e5e7eb', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={somenteAutorizadas} onChange={(e) => setSomenteAutorizadas(e.target.checked)} />
                🛡️ Autorizada / Certificada
              </label>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={aceitaEnvios} onChange={(e) => setAceitaEnvios(e.target.checked)} />
                📦 Aceita envio por correios
              </label>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={orcamentoGratuito} onChange={(e) => setOrcamentoGratuito(e.target.checked)} />
                🏷️ Orçamento Gratuito
              </label>
            </div>
          </div>

          {/* CONTROL VISTA Y ORDENAMIENTO */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', backgroundColor: '#e5e7eb', borderRadius: '6px', padding: '3px' }}>
              <button
                onClick={() => setVistaResultados('lista')}
                style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: vistaResultados === 'lista' ? '#ffffff' : 'transparent' }}
              >
                📋 Lista
              </button>
              <button
                onClick={() => setVistaResultados('mapa')}
                style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: vistaResultados === 'mapa' ? '#ffffff' : 'transparent' }}
              >
                🗺️ Mapa
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted, #6b7280)', fontWeight: 'bold' }}>Ordenar por:</span>
              <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '13px' }}>
                <option value="recomendadas">⭐ Mais Recomendadas</option>
                <option value="distancia">📍 Menor Distância</option>
                <option value="alfabetica">🔤 Ordem Alfabética</option>
              </select>
            </div>
          </div>

          {/* VISTA DE RESULTADOS (CARDS) */}
          {vistaResultados === 'lista' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
              {OFICINAS_MOCK.map((oficina) => (
                <div 
                  key={oficina.id}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div>
                    {/* ENCABEZADO DE LA CARD */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#111827' }}>{oficina.nomeEmpresa}</h3>
                      <span style={{ fontSize: '12px', backgroundColor: '#fef3c7', color: '#d97706', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        ⭐ {oficina.avaliacao} ({oficina.avaliacoesQtd})
                      </span>
                    </div>

                    <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>
                      📍 {oficina.cidade} - {oficina.estado} | Resp: {oficina.responsavelTecnico}
                    </p>

                    {/* BADGES / ETIQUETAS DESTACADAS */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      {oficina.isAutorizada && (
                        <span style={{ fontSize: '11px', backgroundColor: '#dbeafe', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                          🛡️ {oficina.detalhesAutorizada || 'Autorizada'}
                        </span>
                      )}
                      {oficina.atendeEnvioCorreios && (
                        <span style={{ fontSize: '11px', backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '3px 8px', borderRadius: '4px' }}>
                          📦 Aceita Envio
                        </span>
                      )}
                      {oficina.ofereceOrcamentoGratis && (
                        <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px' }}>
                          🏷️ Orçamento Grátis
                        </span>
                      )}
                    </div>

                    {/* MARCAS ATENDIDAS */}
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', display: 'block', marginBottom: '4px' }}>
                        Marcas atendidas:
                      </span>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>
                        {oficina.marcasAtendidas}
                      </span>
                    </div>

                    {/* ESPECIALIDADES */}
                    <div style={{ marginBottom: '15px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#374151', display: 'block', marginBottom: '4px' }}>
                        Serviços:
                      </span>
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {oficina.especialidades.map(esp => (
                          <span key={esp} style={{ fontSize: '11px', backgroundColor: '#f3f4f6', color: '#374151', padding: '2px 7px', borderRadius: '4px' }}>
                            {esp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTÓN WHATSAPP */}
                  <a
                    href={`https://wa.me/55${oficina.whatsapp}?text=Olá!%20Encontrei%20sua%20assistência%20no%20Drones.Orientese%20e%20gostaria%20de%20um%20orçamento.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      backgroundColor: '#25d366',
                      color: '#ffffff',
                      padding: '10px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      textDecoration: 'none',
                      marginTop: '10px'
                    }}
                  >
                    💬 Falar pelo WhatsApp
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f3f4f6', borderRadius: '8px', border: '2px dashed #d1d5db' }}>
              <h3>🗺️ Mapa de Assistências Técnicas</h3>
              <p style={{ color: 'var(--text-muted, #6b7280)', fontSize: '14px' }}>
                Aquí se desplegarán las ubicaciones en el mapa interactivo.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
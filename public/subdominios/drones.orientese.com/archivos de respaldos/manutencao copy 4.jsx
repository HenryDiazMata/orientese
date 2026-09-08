import React, { useState, useMemo } from 'react';

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
    avaliacoesQtd: 28,
    distanciaKm: 12
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
    avaliacoesQtd: 15,
    distanciaKm: 210
  }
];

export default function ManutencaoView() {
  const [modo, setModo] = useState('lista');
  const [vistaResultados, setVistaResultados] = useState('lista');

  // Estados de Filtros
  const [filtroServico, setFiltroServico] = useState('Todos os Serviços');
  const [filtroEstado, setFiltroEstado] = useState('SP');
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

  // Filtrado
  const oficinasFiltradas = useMemo(() => {
    return OFICINAS_MOCK.filter(oficina => {
      if (filtroServico !== 'Todos os Serviços') {
        const tieneServicio = oficina.especialidades.some(esp => 
          esp.toLowerCase().includes(filtroServico.toLowerCase())
        );
        if (!tieneServicio) return false;
      }

      if (filtroEstado !== 'Todos os Estados' && oficina.estado !== filtroEstado) {
        return false;
      }

      if (filtroTexto.trim() !== '') {
        const termo = filtroTexto.toLowerCase();
        const coincideNome = oficina.nomeEmpresa.toLowerCase().includes(termo);
        const coincideCidade = oficina.cidade.toLowerCase().includes(termo);
        const coincideMarca = oficina.marcasAtendidas.toLowerCase().includes(termo);
        
        if (!coincideNome && !coincideCidade && !coincideMarca) return false;
      }

      if (somenteAutorizadas && !oficina.isAutorizada) return false;
      if (aceitaEnvios && !oficina.atendeEnvioCorreios) return false;
      if (orcamentoGratuito && !oficina.ofereceOrcamentoGratis) return false;

      return true;
    }).sort((a, b) => {
      if (ordenarPor === 'recomendadas') return b.avaliacao - a.avaliacao;
      if (ordenarPor === 'distancia') return a.distanciaKm - b.distanciaKm;
      if (ordenarPor === 'alfabetica') return a.nomeEmpresa.localeCompare(b.nomeEmpresa);
      return 0;
    });
  }, [filtroServico, filtroEstado, filtroTexto, somenteAutorizadas, aceitaEnvios, orcamentoGratuito, ordenarPor]);

  // 🔒 ESTILOS SEGUROS A PRUEBA DE DARK/LIGHT MODE
  const selectStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#111827',
    fontSize: '14px',
    outline: 'none'
  };

  const optionStyle = {
    backgroundColor: '#ffffff',
    color: '#111827'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* CABECERA */}
      <div style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px' }}>🛠️ Manutenção e Assistência Técnica</h2>
          <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '14px' }}>
            Encontre oficinas especializadas e técnicos qualificados para conserto de drones
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setModo(modo === 'cadastro' ? 'lista' : 'cadastro')}
            style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 'bold', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2563eb' }}
          >
            {modo === 'cadastro' ? '✖️ Cancelar' : '➕ Cadastrar Assistência'}
          </button>

          <button
            onClick={() => setModo(modo === 'login' ? 'lista' : 'login')}
            style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#14b8a6', color: '#ffffff' }}
          >
            🔑 Entrar / Meu Perfil
          </button>
        </div>
      </div>

      {modo === 'lista' && (
        <div>
          {/* BARRA DE FILTROS */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '15px' }}>🔍 Buscar Oficinas e Técnicos</h4>
              <button
                onClick={handleLimparFiltros}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
              >
                🔄 Limpar Filtros
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>1. Tipo de Serviço Técnico</label>
                <select value={filtroServico} onChange={(e) => setFiltroServico(e.target.value)} style={selectStyle}>
                  {SERVICOS_MANUTENCAO.map(servico => (
                    <option key={servico} value={servico} style={optionStyle}>{servico}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>2. Estado (UF)</label>
                <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={selectStyle}>
                  {ESTADOS_BRASIL.map(uf => (
                    <option key={uf} value={uf} style={optionStyle}>{uf}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>3. Busca por Nome, Cidade ou Marca</label>
                <input
                  type="text"
                  placeholder="Ex: DJI, Campinas ou DroneFix..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={selectStyle}
                />
              </div>
            </div>

            {/* TAGS DE BÚSQUEDA RÁPIDA */}
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', opacity: 0.8 }}>Busca rápida:</span>
              {TAGS_BUSCA_RAPIDA.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleAplicarTag(tag)}
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: filtroTexto === tag ? '#0284c7' : 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* CHECKBOXES CON TEXTO VISIBLE 100% */}
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.15)', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'inherit' }}>
                <input type="checkbox" checked={somenteAutorizadas} onChange={(e) => setSomenteAutorizadas(e.target.checked)} />
                🛡️ Autorizada / Certificada
              </label>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'inherit' }}>
                <input type="checkbox" checked={aceitaEnvios} onChange={(e) => setAceitaEnvios(e.target.checked)} />
                📦 Aceita envio por correios
              </label>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'inherit' }}>
                <input type="checkbox" checked={orcamentoGratuito} onChange={(e) => setOrcamentoGratuito(e.target.checked)} />
                🏷️ Orçamento Gratuito
              </label>
            </div>
          </div>

          {/* BOTONES DE VISTA (LISTA / MAPA) CORREGIDOS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '3px' }}>
              <button
                onClick={() => setVistaResultados('lista')}
                style={{ 
                  padding: '6px 14px', 
                  border: 'none', 
                  borderRadius: '4px', 
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  backgroundColor: vistaResultados === 'lista' ? '#2563eb' : 'transparent',
                  color: '#ffffff' // 🔒 Texto blanco siempre legible
                }}
              >
                📋 Lista ({oficinasFiltradas.length})
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
                  backgroundColor: vistaResultados === 'mapa' ? '#2563eb' : 'transparent',
                  color: '#ffffff' // 🔒 Texto blanco siempre legible
                }}
              >
                🗺️ Mapa
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 'bold' }}>Ordenar por:</span>
              <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
                <option value="recomendadas" style={optionStyle}>⭐ Mais Recomendadas</option>
                <option value="distancia" style={optionStyle}>📍 Menor Distância</option>
                <option value="alfabetica" style={optionStyle}>🔤 Ordem Alfabética</option>
              </select>
            </div>
          </div>

          {/* RESULTADOS TARJETAS */}
          {vistaResultados === 'lista' ? (
            oficinasFiltradas.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {oficinasFiltradas.map((oficina) => (
                  <div 
                    key={oficina.id}
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        {/* 🔒 Título con color visible */}
                        <h3 style={{ margin: 0, fontSize: '18px', color: '#60a5fa' }}>{oficina.nomeEmpresa}</h3>
                        <span style={{ fontSize: '12px', backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px' }}>
                          ⭐ {oficina.avaliacao} ({oficina.avaliacoesQtd})
                        </span>
                      </div>

                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', opacity: 0.8 }}>
                        📍 {oficina.cidade} - {oficina.estado} | Resp: {oficina.responsavelTecnico}
                      </p>

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

                      <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.9, display: 'block', marginBottom: '4px' }}>
                          Marcas atendidas:
                        </span>
                        <span style={{ fontSize: '13px', opacity: 0.8 }}>
                          {oficina.marcasAtendidas}
                        </span>
                      </div>

                      <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.9, display: 'block', marginBottom: '4px' }}>
                          Serviços:
                        </span>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {oficina.especialidades.map(esp => (
                            <span key={esp} style={{ fontSize: '11px', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '2px 7px', borderRadius: '4px' }}>
                              {esp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/55${oficina.whatsapp}`}
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
              <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.8 }}>
                🔍 Nenhum técnico ou oficina encontrada com os filtros selecionados.
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 20px', opacity: 0.8 }}>
              <h3>🗺️ Mapa de Assistências Técnicas</h3>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
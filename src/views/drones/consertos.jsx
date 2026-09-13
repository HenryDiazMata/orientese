import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  PlusCircle, 
  XCircle, 
  LogIn, 
  LogOut, 
  Search, 
  Filter, 
  RotateCcw, 
  MapPin, 
  Star, 
  Award, 
  DollarSign, 
  Zap, 
  Package, 
  Building, 
  Truck, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  List, 
  Map, 
  Tag, 
  CheckSquare, 
  User, 
  Lock 
} from 'lucide-react';
import CadastroConserto from "../../components/drones/formularios/CadastroConserto";

const ESTADOS_BRASIL = [
  'Todos os Estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const TIPOS_CONSERTO = [
  'Todos os Consertos',
  'Troca de Braço / Estrutura Quebrada',
  'Reparo / Troca de Gimbal e Câmera',
  'Troca de Motores / ESCs',
  'Recuperação após Queda / Colisão',
  'Reparo por Danos por Água / Umidade',
  'Troca de Shell / Carcaça',
  'Calibração e Atualização de Firmware',
  'Troca de Placa Principal / Sensores'
];

const TAGS_BUSCA_RAPIDA = ['Orçamento Grátis', 'Autorizada', 'Queda', 'Gimbal', 'Braço Quebrado', 'DJI Mini', 'São Paulo'];

const CONSERTOS_MOCK = [
  {
    id: 1,
    nomeEmpresa: 'UTI dos Drones - Consertos Rápidos',
    responsavelTecnico: 'Marcos Vinícius',
    whatsapp: '11977775555',
    estado: 'SP',
    cidade: 'São Paulo',
    marcasAtendidas: 'Linha DJI Mavic, Mini, Air e Phantom',
    especialidades: ['Troca de Braço / Estrutura Quebrada', 'Reparo / Troca de Gimbal e Câmera', 'Recuperação após Queda / Colisão'],
    tempoMedioConserto: '24h a 48h',
    garantiaDias: '90 dias',
    oficinaAutorizada: true,
    orcamentoGratuito: true,
    temPecasEstoque: true,
    atendeEnvioCorreios: true,
    atendimentoPresencial: true,
    servicoColetaLocal: false,
    avaliacao: 5.0,
    avaliacoesQtd: 34
  },
  {
    id: 2,
    nomeEmpresa: 'Express Drone Reparos',
    responsavelTecnico: 'Lucas Mendes',
    whatsapp: '19988884444',
    estado: 'SP',
    cidade: 'Campinas',
    marcasAtendidas: 'DJI, Autel',
    especialidades: ['Troca de Motores / ESCs', 'Reparo por Danos por Água / Umidade'],
    tempoMedioConserto: '3 a 5 dias',
    garantiaDias: '90 dias',
    oficinaAutorizada: false,
    orcamentoGratuito: true,
    temPecasEstoque: false,
    atendeEnvioCorreios: true,
    atendimentoPresencial: false,
    servicoColetaLocal: true,
    avaliacao: 4.8,
    avaliacoesQtd: 19
  }
];

export default function ConsertosView() {
  const [modo, setModo] = useState('lista'); // 'lista' | 'cadastro' | 'login'
  const [vistaResultados, setVistaResultados] = useState('lista');

  // Estado del formulario Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  // Filtros
  const [filtroConserto, setFiltroConserto] = useState('Todos os Consertos');
  const [filtroEstado, setFiltroEstado] = useState('SP');
  const [filtroTexto, setFiltroTexto] = useState('');
  const [somenteOrcamentoGratis, setSomenteOrcamentoGratis] = useState(false);
  const [somenteAutorizada, setSomenteAutorizada] = useState(false);
  const [somentePecasProntas, setSomentePecasProntas] = useState(false);
  const [aceitaEnvios, setAceitaEnvios] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState('recomendadas');

  const handleLimparFiltros = () => {
    setFiltroConserto('Todos os Consertos');
    setFiltroEstado('Todos os Estados');
    setFiltroTexto('');
    setSomenteOrcamentoGratis(false);
    setSomenteAutorizada(false);
    setSomentePecasProntas(false);
    setAceitaEnvios(false);
    setOrdenarPor('recomendadas');
  };

  const handleAplicarTag = (tag) => {
    if (tag === 'Orçamento Grátis') {
      setSomenteOrcamentoGratis(true);
    } else if (tag === 'Autorizada') {
      setSomenteAutorizada(true);
    } else {
      setFiltroTexto(tag);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Acessando conta de: ${loginEmail}`);
  };

  const consertosFiltrados = useMemo(() => {
    return CONSERTOS_MOCK.filter(item => {
      if (filtroConserto !== 'Todos os Consertos') {
        const tieneConserto = item.especialidades.some(esp => 
          esp.toLowerCase().includes(filtroConserto.toLowerCase())
        );
        if (!tieneConserto) return false;
      }

      if (filtroEstado !== 'Todos os Estados' && item.estado !== filtroEstado) {
        return false;
      }

      if (filtroTexto.trim() !== '') {
        const termo = filtroTexto.toLowerCase();
        const coincideNome = item.nomeEmpresa.toLowerCase().includes(termo);
        const coincideCidade = item.cidade.toLowerCase().includes(termo);
        const coincideMarca = item.marcasAtendidas.toLowerCase().includes(termo);
        
        if (!coincideNome && !coincideCidade && !coincideMarca) return false;
      }

      if (somenteOrcamentoGratis && !item.orcamentoGratuito) return false;
      if (somenteAutorizada && !item.oficinaAutorizada) return false;
      if (somentePecasProntas && !item.temPecasEstoque) return false;
      if (aceitaEnvios && !item.atendeEnvioCorreios) return false;

      return true;
    }).sort((a, b) => {
      if (ordenarPor === 'recomendadas') return b.avaliacao - a.avaliacao;
      if (ordenarPor === 'alfabetica') return a.nomeEmpresa.localeCompare(b.nomeEmpresa);
      return 0;
    });
  }, [filtroConserto, filtroEstado, filtroTexto, somenteOrcamentoGratis, somenteAutorizada, somentePecasProntas, aceitaEnvios, ordenarPor]);

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
          <h2 style={{ margin: 0, fontSize: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={24} color="#2563eb" />
            Consertos e Reparos de Emergência
          </h2>
          <p style={{ margin: '4px 0 0 0', opacity: 0.8, fontSize: '14px' }}>
            Recupere seu drone danificado com especialistas em consertos rápidos e substituição de peças
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setModo(modo === 'cadastro' ? 'lista' : 'cadastro')}
            style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 'bold', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {modo === 'cadastro' ? <XCircle size={18} /> : <PlusCircle size={18} />}
            {modo === 'cadastro' ? 'Cancelar' : 'Cadastrar Consertos'}
          </button>

          <button
            onClick={() => setModo(modo === 'login' ? 'lista' : 'login')}
            style={{ padding: '10px 18px', fontSize: '14px', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#14b8a6', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {modo === 'login' ? <XCircle size={18} /> : <LogIn size={18} />}
            {modo === 'login' ? 'Cancelar' : 'Entrar / Meu Perfil'}
          </button>
        </div>
      </div>

      {/* VISTA DE CADASTRO */}
      {modo === 'cadastro' && (
        <CadastroConserto onVoltar={() => setModo('lista')} />
      )}

      {/* VISTA DE LOGIN / MEU PERFIL */}
      {modo === 'login' && (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid #4b5563',
          borderRadius: '10px',
          padding: '25px',
          marginBottom: '30px',
          maxWidth: '500px',
          margin: '0 auto 30px auto'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '18px', color: '#14b8a6', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <LogIn size={20} />
            Área do Técnico / Oficina
          </h3>
          <p style={{ fontSize: '13px', opacity: 0.9, textAlign: 'center', marginBottom: '20px', lineHeight: '1.4' }}>
            Acesse seu perfil de <strong>Consertos</strong> para gerenciar suas especialidades, prazos, WhatsApp de atendimento ou atualizar suas informações.
          </p>

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <User size={14} /> E-mail Cadastrado
              </label>
              <input
                type="email"
                required
                placeholder="seu-email@oficina.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={selectStyle}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                <Lock size={14} /> Senha
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                style={selectStyle}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#14b8a6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <LogIn size={18} />
              Entrar na Minha Conta
            </button>
          </form>

          <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '12px' }}>
            <span>Ainda não possui cadastro? </span>
            <button
              onClick={() => setModo('cadastro')}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Cadastrar Minha Oficina
            </button>
          </div>
        </div>
      )}

      {/* VISTA DE LISTA DE RESULTADOS */}
      {modo === 'lista' && (
        <div>
          {/* BARRA DE FILTROS */}
          <div style={{
            border: '1px solid #4b5563',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '25px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} />
                Filtrar por Tipo de Dano, Local e Facilidades
              </h4>
              <button
                onClick={handleLimparFiltros}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={14} />
                Limpar Filtros
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>1. Tipo de Conserto</label>
                <select value={filtroConserto} onChange={(e) => setFiltroConserto(e.target.value)} style={selectStyle}>
                  {TIPOS_CONSERTO.map(tipo => (
                    <option key={tipo} value={tipo} style={optionStyle}>{tipo}</option>
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
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>3. Modelo ou Palavra-chave</label>
                <input
                  type="text"
                  placeholder="Ex: Mavic Air 2, Gimbal, Campinas..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={selectStyle}
                />
              </div>
            </div>

            {/* TAGS BÚSQUEDA RÁPIDA */}
            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={12} /> Busca rápida:
              </span>
              {TAGS_BUSCA_RAPIDA.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleAplicarTag(tag)}
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: '1px solid #9ca3af',
                    backgroundColor: (filtroTexto === tag || (tag === 'Orçamento Grátis' && somenteOrcamentoGratis) || (tag === 'Autorizada' && somenteAutorizada)) ? '#0284c7' : 'transparent',
                    color: (filtroTexto === tag || (tag === 'Orçamento Grátis' && somenteOrcamentoGratis) || (tag === 'Autorizada' && somenteAutorizada)) ? '#ffffff' : 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* CHECKBOXES DE FILTRO */}
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #6b7280', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={somenteOrcamentoGratis} onChange={(e) => setSomenteOrcamentoGratis(e.target.checked)} />
                <DollarSign size={14} color="#166534" /> Orçamento Gratuito
              </label>

              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={somenteAutorizada} onChange={(e) => setSomenteAutorizada(e.target.checked)} />
                <Award size={14} color="#3b82f6" /> Oficina Autorizada
              </label>

              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={somentePecasProntas} onChange={(e) => setSomentePecasProntas(e.target.checked)} />
                <Zap size={14} color="#854d0e" /> Peças em estoque
              </label>

              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={aceitaEnvios} onChange={(e) => setAceitaEnvios(e.target.checked)} />
                <Package size={14} color="#3730a3" /> Aceita envio por Correios / Sedex
              </label>
            </div>
          </div>

          {/* VISTA Y ORDENAMIENTO */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', border: '1px solid #6b7280', borderRadius: '6px', padding: '2px', backgroundColor: 'rgba(0,0,0,0.05)' }}>
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
                  color: vistaResultados === 'lista' ? '#ffffff' : 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <List size={16} /> Lista ({consertosFiltrados.length})
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
                  color: vistaResultados === 'mapa' ? '#ffffff' : 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Map size={16} /> Mapa
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', opacity: 0.9, fontWeight: 'bold' }}>Ordenar por:</span>
              <select value={ordenarPor} onChange={(e) => setOrdenarPor(e.target.value)} style={{ ...selectStyle, width: 'auto' }}>
                <option value="recomendadas" style={optionStyle}>Mais Recomendadas</option>
                <option value="alfabetica" style={optionStyle}>Ordem Alfabética</option>
              </select>
            </div>
          </div>

          {/* TARJETAS DE RESULTADOS */}
          {vistaResultados === 'lista' ? (
            consertosFiltrados.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {consertosFiltrados.map((item) => (
                  <div 
                    key={item.id}
                    style={{
                      border: '1px solid #4b5563',
                      borderRadius: '10px',
                      padding: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '18px', color: '#2563eb' }}>{item.nomeEmpresa}</h3>
                          {item.oficinaAutorizada && (
                            <span style={{ fontSize: '11px', backgroundColor: '#3b82f6', color: '#ffffff', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Award size={12} /> Oficina Autorizada
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '12px', backgroundColor: '#fef3c7', color: '#b45309', fontWeight: 'bold', padding: '2px 8px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Star size={12} fill="#b45309" /> {item.avaliacao} ({item.avaliacoesQtd})
                        </span>
                      </div>

                      <p style={{ margin: '6px 0 12px 0', fontSize: '13px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {item.cidade} - {item.estado} | Resp: {item.responsavelTecnico}
                      </p>

                      {/* BADGES DE PRAZO, GARANTIA E FACILIDADES */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        {item.orcamentoGratuito && (
                          <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <DollarSign size={12} /> Orçamento Grátis
                          </span>
                        )}
                        {item.temPecasEstoque && (
                          <span style={{ fontSize: '11px', backgroundColor: '#fef9c3', color: '#854d0e', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={12} /> Peças em Estoque
                          </span>
                        )}
                        {item.atendeEnvioCorreios && (
                          <span style={{ fontSize: '11px', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Package size={12} /> Envio Correios
                          </span>
                        )}
                        {item.atendimentoPresencial && (
                          <span style={{ fontSize: '11px', backgroundColor: '#f3f4f6', color: '#1f2937', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Building size={12} /> Balcão
                          </span>
                        )}
                        {item.servicoColetaLocal && (
                          <span style={{ fontSize: '11px', backgroundColor: '#fce7f3', color: '#9d174d', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Truck size={12} /> Coleta Motoboy
                          </span>
                        )}
                        <span style={{ fontSize: '11px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> Prazo: {item.tempoMedioConserto}
                        </span>
                        <span style={{ fontSize: '11px', backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheck size={12} /> Garantia: {item.garantiaDias}
                        </span>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.9, display: 'block', marginBottom: '4px' }}>
                          Modelos / Marcas:
                        </span>
                        <span style={{ fontSize: '13px', opacity: 0.8 }}>
                          {item.marcasAtendidas}
                        </span>
                      </div>

                      <div style={{ marginBottom: '15px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.9, display: 'block', marginBottom: '4px' }}>
                          Consertos Frequentes:
                        </span>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                          {item.especialidades.map(esp => (
                            <span key={esp} style={{ fontSize: '11px', border: '1px solid #9ca3af', padding: '2px 7px', borderRadius: '4px' }}>
                              {esp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/55${item.whatsapp.replace(/\D/g, '')}?text=Olá!%20Encontrei%20sua%20oficina%20no%20Drones.Orientese%20e%20preciso%20de%20um%20orçamento.`}
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
                      <MessageSquare size={18} />
                      Solicitar Orçamento via WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', opacity: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Search size={32} />
                <span>Nenhum serviço de conserto encontrado com os filtros selecionados.</span>
              </div>
            )
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 20px', opacity: 0.8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Map size={40} />
              <h3>Mapa de Oficinas de Conserto</h3>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
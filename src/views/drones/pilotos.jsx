// ==========================================
// pilotos.jsx
// Rede de Pilotos Homologados
// Atualizado: removido botão Cadastrar + lista completa de serviços
// ==========================================

import React, { useState, useMemo } from 'react';
import { 
  Award, LogIn, ArrowLeft, Search, RotateCcw, 
  MapPin, CheckCircle2, Clock, ShieldCheck, 
  MessageSquare, X, Mail, Send, Star
} from 'lucide-react';
import { useTheme } from "../../context/drones/ThemeContext";
import { useAuth } from "../../context/drones/AuthContext";
import CadastroPiloto from "../../components/drones/formularios/CadastroPiloto";

const ESTADOS_BRASIL = [
  'Todos os Estados', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const TIPOS_SERVICO = [
  'Todos os Serviços',
  'Mapeamento Aéreo / Fotogrametria',
  'Inspeção Visual Predial/Industrial',
  'Filmagem e Fotografia Profissional',
  'Pulverização / Agrícola',
  'Contagem de Gado / Rebanho',
  'Contagem de Ovinos / Caprinos',
  'Contagem de Frutos / Pomares',
  'Monitoramento de Saúde da Lavoura (NDVI)',
  'Mapeamento de Áreas de Pastagem',
  'Inspeção de Linhas de Transmissão / Torres',
  'Levantamento Topográfico / Ortomosaico'
];

const STATUS_OPCOES = ['Todos os Status', 'Disponível', 'Em Missão'];

const PILOTOS_MOCK = [
  {
    id: 1,
    nome: 'Gabriel Santos',
    cidade: 'Campinas',
    estado: 'SP',
    whatsapp: '19999998888',
    telegram: 'gabriel_drones',
    email: 'gabriel@drones.com',
    registroAnac: 'CANAC-884920',
    anatelOk: 'ANATEL-49201',
    disponivel: true,
    statusTexto: 'Disponível',
    horasVoo: '450h',
    servicos: ['Classe 3 (BVLOS)', 'Mapeamento Agrícola'],
    contratacoes: 27,
    avaliacaoMedia: 4.9,
    avaliacoes: { excelente: 22, bom: 4, regular: 1, ruim: 0 },
    indicacoes: { sim: 24, nao: 3 },
    pontuacaoGeral: 96
  },
  {
    id: 2,
    nome: 'Fernanda Lima',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    whatsapp: '21977776666',
    telegram: 'fernanda_drones',
    email: 'fernanda@drones.com',
    registroAnac: 'CANAC-102938',
    anatelOk: 'ANATEL-10928',
    disponivel: false,
    statusTexto: 'Em Missão',
    horasVoo: '320h',
    servicos: ['Inspeção Industrial', 'Termografia'],
    contratacoes: 18,
    avaliacaoMedia: 5.0,
    avaliacoes: { excelente: 18, bom: 0, regular: 0, ruim: 0 },
    indicacoes: { sim: 17, nao: 1 },
    pontuacaoGeral: 98
  },
  {
    id: 3,
    nome: 'Rodrigo Alcantara',
    cidade: 'Curitiba',
    estado: 'PR',
    whatsapp: '41988887777',
    telegram: 'rodrigo_drones',
    email: 'rodrigo@drones.com',
    registroAnac: 'CANAC-554109',
    anatelOk: 'ANATEL-77210',
    disponivel: true,
    statusTexto: 'Disponível',
    horasVoo: '680h',
    servicos: ['Classe 3 (BVLOS)', 'Pulverização', 'Mapeamento Agrícola'],
    contratacoes: 41,
    avaliacaoMedia: 4.8,
    avaliacoes: { excelente: 33, bom: 6, regular: 2, ruim: 0 },
    indicacoes: { sim: 38, nao: 3 },
    pontuacaoGeral: 94
  }
];

export default function Pilotos() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [modo, setModo] = useState('lista');
  const [filtroServico, setFiltroServico] = useState('Todos os Serviços');
  const [filtroEstado, setFiltroEstado] = useState('Todos os Estados');
  const [filtroStatus, setFiltroStatus] = useState('Todos os Status');
  const [filtroTexto, setFiltroTexto] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const handleLimparFiltros = () => {
    setFiltroServico('Todos os Serviços');
    setFiltroEstado('Todos os Estados');
    setFiltroStatus('Todos os Status');
    setFiltroTexto('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Acessando painel do piloto: ${loginEmail}`);
  };

  const pilotosFiltrados = useMemo(() => {
    return PILOTOS_MOCK.filter(piloto => {
      if (filtroServico !== 'Todos os Serviços') {
        const atende = piloto.servicos.some(s => 
          s.toLowerCase().includes(filtroServico.toLowerCase())
        );
        if (!atende) return false;
      }
      if (filtroEstado !== 'Todos os Estados' && piloto.estado !== filtroEstado) return false;
      if (filtroStatus === 'Disponível' && !piloto.disponivel) return false;
      if (filtroStatus === 'Em Missão' && piloto.disponivel) return false;

      if (filtroTexto.trim()) {
        const termo = filtroTexto.toLowerCase();
        const coincide = 
          piloto.nome.toLowerCase().includes(termo) ||
          piloto.cidade.toLowerCase().includes(termo) ||
          piloto.registroAnac.toLowerCase().includes(termo);
        if (!coincide) return false;
      }
      return true;
    });
  }, [filtroServico, filtroEstado, filtroStatus, filtroTexto]);

  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';

  return (
    <div style={{ padding: '30px 20px', maxWidth: '1240px', margin: '0 auto' }}>
      
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', color: textMain }}>
            <Award size={32} color="#0077C8" />
            Rede de Pilotos Homologados
          </h1>
          <p style={{ margin: '6px 0 0 0', color: textMuted, fontSize: '15px' }}>
            Base de comandantes certificados para operações críticas e voos BVLOS
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {modo !== 'lista' && (
            <button 
              onClick={() => setModo('lista')} 
              style={{ 
                padding: '10px 18px', 
                fontSize: '14px', 
                backgroundColor: isDark ? '#334155' : '#e2e8f0', 
                color: isDark ? '#f8fafc' : '#475569', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: '600', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <ArrowLeft size={18} /> Voltar ao Diretório
            </button>
          )}

          <button 
            onClick={() => setModo(modo === 'login' ? 'lista' : 'login')} 
            style={{ 
              padding: '10px 20px', 
              fontSize: '14px', 
              fontWeight: '600',
              borderRadius: '8px',
              border: `1px solid ${borderColor}`,
              cursor: 'pointer',
              backgroundColor: bgCard,
              color: textMain,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {modo === 'login' ? <X size={18} /> : <LogIn size={18} />}
            {modo === 'login' ? 'Cancelar' : 'Entrar'}
          </button>
        </div>
      </div>

      {modo === 'cadastro' && <CadastroPiloto onSalvar={() => setModo('lista')} />}

      {modo === 'login' && (
        <div style={{ border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '30px', maxWidth: '420px', margin: '30px auto', backgroundColor: bgCard }}>
          <h3 style={{ marginTop: 0, fontSize: '20px', color: textMain, textAlign: 'center' }}>Área do Piloto</h3>
          <p style={{ fontSize: '13px', color: textMuted, textAlign: 'center', marginBottom: '24px' }}>
            Acesse sua conta para atualizar informações e disponibilidades.
          </p>
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              required 
              placeholder="E-mail" 
              value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }} 
            />
            <input 
              type="password" 
              required 
              placeholder="Senha" 
              value={loginSenha} 
              onChange={(e) => setLoginSenha(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }} 
            />
            <button 
              type="submit" 
              style={{ padding: '12px', backgroundColor: '#0077C8', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
            >
              Entrar
            </button>
          </form>
        </div>
      )}

      {modo === 'lista' && (
        <div>
          {/* Filtros */}
          <div style={{ backgroundColor: bgCard, border: `1px solid ${borderColor}`, borderRadius: '12px', padding: '18px 24px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <button 
                onClick={handleLimparFiltros} 
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <RotateCcw size={14} /> Limpar Filtros
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: textMuted, marginBottom: '6px' }}>
                  1. Tipo de Operação / Serviço
                </label>
                <select 
                  value={filtroServico} 
                  onChange={(e) => setFiltroServico(e.target.value)} 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }}
                >
                  {TIPOS_SERVICO.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: textMuted, marginBottom: '6px' }}>
                  2. Estado (UF)
                </label>
                <select 
                  value={filtroEstado} 
                  onChange={(e) => setFiltroEstado(e.target.value)} 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }}
                >
                  {ESTADOS_BRASIL.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: textMuted, marginBottom: '6px' }}>
                  3. Status de Disponibilidade
                </label>
                <select 
                  value={filtroStatus} 
                  onChange={(e) => setFiltroStatus(e.target.value)} 
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }}
                >
                  {STATUS_OPCOES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: textMuted, marginBottom: '6px' }}>
                  4. Busca por Nome, Cidade ou Drones
                </label>
                <input 
                  type="text" 
                  placeholder="Ex: João Silva, Campinas..." 
                  value={filtroTexto} 
                  onChange={(e) => setFiltroTexto(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', color: '#0f172a' }} 
                />
              </div>
            </div>
          </div>

          {/* Cards dos Pilotos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {pilotosFiltrados.map((piloto) => (
              <div 
                key={piloto.id} 
                style={{ 
                  border: `1px solid ${borderColor}`, 
                  borderRadius: '14px', 
                  padding: '24px', 
                  backgroundColor: bgCard, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: textMain, fontWeight: '700' }}>{piloto.nome}</h3>
                    <span style={{ 
                      fontSize: '12px', 
                      backgroundColor: piloto.disponivel ? '#dcfce7' : '#fef3c7', 
                      color: piloto.disponivel ? '#15803d' : '#d97706', 
                      fontWeight: '600', 
                      padding: '4px 10px', 
                      borderRadius: '20px' 
                    }}>
                      {piloto.statusTexto}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: textMuted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} /> {piloto.cidade} - {piloto.estado}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {piloto.servicos.map(s => (
                      <span 
                        key={s} 
                        style={{ 
                          fontSize: '12px', 
                          backgroundColor: isDark ? '#0c4a6e' : '#ecfeff', 
                          color: isDark ? '#7dd3fc' : '#0891b2', 
                          padding: '3px 10px', 
                          borderRadius: '6px' 
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: textMain, marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} color="#0077C8" /> ANAC: <strong>{piloto.registroAnac}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} color="#0077C8" /> ANATEL: <strong>{piloto.anatelOk}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} color="#94a3b8" /> Horas de Voo: <strong>{piloto.horasVoo}</strong>
                    </div>
                  </div>

                  {/* Avaliação */}
                  <div style={{ 
                    backgroundColor: isDark ? '#0f172a' : '#f8fafc', 
                    border: `1px solid ${borderColor}`, 
                    borderRadius: '10px', 
                    padding: '12px', 
                    marginBottom: '16px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: textMain, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Star size={16} color="#f59e0b" fill="#f59e0b" />
                        Avaliação do Cliente
                      </span>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#0077C8' }}>
                        {piloto.avaliacaoMedia.toFixed(1)}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: textMuted, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Contratações realizadas:</span>
                        <strong style={{ color: textMain }}>{piloto.contratacoes}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Indicações (Sim / Não):</span>
                        <strong style={{ color: textMain }}>{piloto.indicacoes.sim} / {piloto.indicacoes.nao}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span>Pontuação Geral:</span>
                        <strong style={{ color: '#0077C8' }}>{piloto.pontuacaoGeral} pts</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botões de contato */}
                <div style={{ 
                  backgroundColor: isDark ? '#064e3b' : '#f0fdf4', 
                  border: `1px solid ${isDark ? '#065f46' : '#bbf7d0'}`, 
                  borderRadius: '10px', 
                  padding: '12px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  gap: '8px', 
                  flexWrap: 'wrap' 
                }}>
                  <a 
                    href={`https://wa.me/55${piloto.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#16a34a', fontWeight: '700', fontSize: '13px', textDecoration: 'none', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px' }}
                  >
                    <MessageSquare size={15} /> WhatsApp
                  </a>
                  <a 
                    href={`https://t.me/${piloto.telegram}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0284c7', fontWeight: '600', fontSize: '13px', textDecoration: 'none', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px' }}
                  >
                    <Send size={14} /> Telegram
                  </a>
                  <a 
                    href={`mailto:${piloto.email}`} 
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#475569', fontWeight: '600', fontSize: '13px', textDecoration: 'none', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px' }}
                  >
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// ==========================================
// AUXILIARES.JSX
// LISTA DE AUXILIARES
// EL FORMULARIO NO ESTA AQUI: ESTA EN CADASTROAUXILIAR.JSX
// CADASTRO Y EDICION: PAGINA COMPLETA, SIN MODAL
// ==========================================

import React, { useState, useMemo, useEffect } from 'react';
import {
  Users, Search, UserPlus, LogIn, LogOut,
  CheckCircle, Clock, MapPin, Phone, Mail,
  Edit3, PauseCircle, PlayCircle, AlertTriangle,
  X, Award, Briefcase, DollarSign, Package,
  Eye, EyeOff, Trash2
} from 'lucide-react';
import CadastroAuxiliar from '../components/formularios/CadastroAuxiliar';

let useThemeSafe = () => ({ theme: 'light' });
try {
  const { useTheme } = require('../context/ThemeContext');
  useThemeSafe = useTheme;
} catch (e) {}

const ESTADOS_BR = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'
];

const AREAS_ATUACAO = [
  'Observador Visual (EVLOS)',
  'Troca de Baterias',
  'Radio Operador (VHF)',
  'Apoio de Solo / Logística',
  'Mapeamento / Fotogrametria',
  'Inspeção',
  'Pulverização / Agrícola',
  'Audiovisual / Eventos',
  'Busca e Resgate',
  'Outros'
];

const INITIAL_AUXILIARES = [
  {
    id: 'AUX-001',
    nomeCompleto: 'Lucas Silva',
    nomeProfissional: 'Lucas Campo',
    foto: null,
    whatsapp: '11987654321',
    email: 'lucas.silva@email.com',
    cidade: 'São Paulo',
    uf: 'SP',
    atendeOutrasRegioes: true,
    anosExperiencia: 3,
    areasAtuacao: ['Observador Visual (EVLOS)', 'Troca de Baterias', 'Apoio de Solo / Logística'],
    modalidades: ['Diária / por hora'],
    valorAproximado: 'R$ 180 / diária',
    possuiEquipamento: true,
    apresentacao: 'Auxiliar de campo com experiência em missões EVLOS.',
    statusConta: 'Activa',
    disponibilidade: 'Disponível'
  },
  {
    id: 'AUX-002',
    nomeCompleto: 'Mariana Rocha',
    nomeProfissional: 'Mari Rocha',
    foto: null,
    whatsapp: '21976543210',
    email: 'marianarocha@email.com',
    cidade: 'Niterói',
    uf: 'RJ',
    atendeOutrasRegioes: false,
    anosExperiencia: 2,
    areasAtuacao: ['Radio Operador (VHF)', 'Apoio de Solo / Logística'],
    modalidades: ['Por contrato (PJ / RPA)'],
    valorAproximado: 'A combinar',
    possuiEquipamento: false,
    apresentacao: 'Apoio de solo e comunicação VHF.',
    statusConta: 'Activa',
    disponibilidade: 'Em Missão'
  },
  {
    id: 'AUX-003',
    nomeCompleto: 'Carlos Eduardo',
    nomeProfissional: 'Cadu',
    foto: null,
    whatsapp: '31965432109',
    email: 'carlos.eduardo@email.com',
    cidade: 'Belo Horizonte',
    uf: 'MG',
    atendeOutrasRegioes: true,
    anosExperiencia: 5,
    areasAtuacao: ['Observador Visual (EVLOS)', 'Mapeamento / Fotogrametria'],
    modalidades: ['Por temporada / projetos'],
    valorAproximado: 'R$ 220 / diária',
    possuiEquipamento: true,
    apresentacao: 'Mais de 5 anos de experiência.',
    statusConta: 'Pausada',
    disponibilidade: 'Disponível'
  }
];

export default function Auxiliares({ openFormOnMount = false, onFormOpened }) {
  const { theme } = useThemeSafe();
  const isDark = theme === 'dark';

  const [auxiliares, setAuxiliares] = useState(INITIAL_AUXILIARES);
  const [search, setSearch] = useState('');
  const [filtroUF, setFiltroUF] = useState('TODOS');
  const [filtroArea, setFiltroArea] = useState('TODAS');
  const [filtroDisp, setFiltroDisp] = useState('TODAS');
  const [userLogueado, setUserLogueado] = useState(null);

  const [vistaCadastro, setVistaCadastro] = useState(false);
  const [vistaEditar, setVistaEditar] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalGestionOpen, setModalGestionOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  useEffect(() => {
    if (openFormOnMount) {
      setVistaCadastro(true);
      if (onFormOpened) onFormOpened();
    }
  }, [openFormOnMount, onFormOpened]);

  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const bgMain = isDark ? '#0f172a' : '#f8fafc';
  const border = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const accent = '#0077C8';

  const handleSalvarNovo = (registro) => {
    const novo = {
      ...registro,
      id: registro.id || `AUX-${String(auxiliares.length + 1).padStart(3, '0')}`
    };
    setAuxiliares([novo, ...auxiliares]);
    setUserLogueado(novo);
    setVistaCadastro(false);
  };

  const handleSalvarEdicao = (registro) => {
    const updated = { ...userLogueado, ...registro };
    setUserLogueado(updated);
    setAuxiliares((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    setVistaEditar(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const encontrado = auxiliares.find((a) => a.email.toLowerCase() === loginEmail.toLowerCase());
    if (encontrado) {
      setUserLogueado(encontrado);
      setModalLoginOpen(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Usuário não encontrado. Cadastre-se primeiro.');
    }
  };

  const handleTogglePausar = () => {
    const novoStatus = userLogueado.statusConta === 'Pausada' ? 'Activa' : 'Pausada';
    const updated = { ...userLogueado, statusConta: novoStatus };
    setUserLogueado(updated);
    setAuxiliares((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
      setAuxiliares((prev) => prev.filter((a) => a.id !== userLogueado.id));
      setUserLogueado(null);
      setModalGestionOpen(false);
    }
  };

  const auxiliaresFiltrados = useMemo(() => {
    return auxiliares.filter((item) => {
      const matchText =
        (item.nomeCompleto || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.nomeProfissional || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.cidade || '').toLowerCase().includes(search.toLowerCase());
      const matchUF = filtroUF === 'TODOS' || item.uf === filtroUF;
      const matchArea = filtroArea === 'TODAS' || (item.areasAtuacao || []).includes(filtroArea);
      const matchDisp = filtroDisp === 'TODAS' || item.disponibilidade === filtroDisp;
      return matchText && matchUF && matchArea && matchDisp;
    });
  }, [auxiliares, search, filtroUF, filtroArea, filtroDisp]);

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    backgroundColor: bgMain,
    border: `1px solid ${border}`,
    color: textMain,
    fontSize: '14px',
    outline: 'none'
  };

  // CADASTRO: USA CADASTROAUXILIAR, SIN MODAL
  if (vistaCadastro) {
    return (
      <CadastroAuxiliar
        onSalvar={handleSalvarNovo}
        onCancelar={() => setVistaCadastro(false)}
      />
    );
  }

  // EDICION: USA CADASTROAUXILIAR, SIN MODAL
  if (vistaEditar && userLogueado) {
    return (
      <CadastroAuxiliar
        auxiliarParaEditar={userLogueado}
        onSalvar={handleSalvarEdicao}
        onCancelar={() => setVistaEditar(false)}
      />
    );
  }

  return (
    <div style={{ padding: '28px 20px', maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: textMain, display: 'flex', alignItems: 'center', gap: 12, margin: 0 }}>
            <Users size={30} color={accent} />
            Central de Auxiliares de Campo
          </h1>
          <p style={{ color: textMuted, margin: '6px 0 0 0', fontSize: 15 }}>
            Rede operacional de apoio em solo para missões de drones
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {userLogueado ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: bgCard, padding: '8px 16px', borderRadius: 12, border: `1px solid ${border}` }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: textMain, fontSize: 14 }}>
                  {userLogueado.nomeProfissional || userLogueado.nomeCompleto}
                </div>
                <div style={{ fontSize: 12, color: userLogueado.statusConta === 'Pausada' ? '#ef4444' : '#10b981' }}>
                  {userLogueado.statusConta === 'Pausada' ? '• Conta Pausada' : '• Operacional'}
                </div>
              </div>
              <button type="button" onClick={() => setVistaEditar(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <Edit3 size={18} />
              </button>
              <button type="button" onClick={() => setModalGestionOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <PauseCircle size={18} />
              </button>
              <button type="button" onClick={() => setUserLogueado(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button type="button" onClick={() => setModalLoginOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: 'transparent', border: `1px solid ${border}`, color: textMain, fontWeight: 600, cursor: 'pointer' }}>
                <LogIn size={18} /> Entrar
              </button>
              <button type="button" onClick={() => setVistaCadastro(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 10, background: accent, border: 'none', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                <UserPlus size={18} /> Quero ser Auxiliar
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ background: bgCard, borderRadius: 14, padding: 18, border: `1px solid ${border}`, marginBottom: 24, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 260px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: textMuted }} />
          <input type="text" placeholder="Buscar por nome ou cidade..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 38 }} />
        </div>
        <select value={filtroUF} onChange={(e) => setFiltroUF(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODOS">Todos os Estados</option>
          {ESTADOS_BR.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
        </select>
        <select value={filtroArea} onChange={(e) => setFiltroArea(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODAS">Todas as Áreas</option>
          {AREAS_ATUACAO.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={filtroDisp} onChange={(e) => setFiltroDisp(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODAS">Qualquer Disponibilidade</option>
          <option value="Disponível">Disponível</option>
          <option value="Em Missão">Em Missão</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
        {auxiliaresFiltrados.map((aux) => (
          <div key={aux.id} style={{ background: bgCard, borderRadius: 16, border: `1px solid ${border}`, padding: 20, display: 'flex', flexDirection: 'column', opacity: aux.statusConta === 'Pausada' ? 0.65 : 1 }}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: bgMain, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {aux.foto ? (
                  <img src={aux.foto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Users size={28} color={textMuted} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: textMain }}>
                  {aux.nomeProfissional || aux.nomeCompleto}
                </h3>
                <div style={{ fontSize: 13, color: textMuted, display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <MapPin size={13} /> {aux.cidade} - {aux.uf}
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 12, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 20,
                  background: aux.disponibilidade === 'Disponível' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                  color: aux.disponibilidade === 'Disponível' ? '#10b981' : '#f59e0b'
                }}>
                  {aux.disponibilidade === 'Disponível' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {aux.disponibilidade}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {(aux.areasAtuacao || []).slice(0, 4).map((a, i) => (
                <span key={i} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: isDark ? '#0c4a6e' : '#e0f2fe', color: isDark ? '#7dd3fc' : '#0369a1' }}>{a}</span>
              ))}
            </div>

            <div style={{ fontSize: 13, color: textMuted, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
              {aux.anosExperiencia && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Award size={14} /> {aux.anosExperiencia} anos de experiência</div>}
              {aux.valorAproximado && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><DollarSign size={14} /> {aux.valorAproximado}</div>}
              {aux.possuiEquipamento && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Package size={14} /> Equipamento próprio</div>}
              {aux.modalidades?.length > 0 && <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={14} /> {aux.modalidades[0]}</div>}
            </div>

            {aux.apresentacao && (
              <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.45, margin: '0 0 14px 0' }}>{aux.apresentacao}</p>
            )}

            <div style={{ marginTop: 'auto', borderTop: `1px solid ${border}`, paddingTop: 12, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <a href={`https://wa.me/55${(aux.whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#16a34a', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                <Phone size={15} /> WhatsApp
              </a>
              <a href={`mailto:${aux.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: textMuted, fontSize: 13, textDecoration: 'none' }}>
                <Mail size={15} /> E-mail
              </a>
            </div>
          </div>
        ))}
      </div>

      {auxiliaresFiltrados.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: textMuted }}>
          Nenhum auxiliar encontrado com os filtros atuais.
        </div>
      )}

      {modalLoginOpen && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <button type="button" onClick={() => setModalLoginOpen(false)} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
              <X size={20} />
            </button>
            <h2>Acessar conta</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>E-mail</label>
                <input required type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <div className="password-wrap">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-submit">Entrar</button>
            </form>
          </div>
        </div>
      )}

      {modalGestionOpen && userLogueado && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <button type="button" onClick={() => setModalGestionOpen(false)} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
              <X size={20} />
            </button>
            <h2><AlertTriangle size={18} /> Gerenciar conta</h2>
            <p className="help-text">Pause seu perfil ou exclua a conta.</p>
            <button type="button" className="btn-cancel" onClick={handleTogglePausar}>
              {userLogueado.statusConta === 'Pausada' ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
              {userLogueado.statusConta === 'Pausada' ? ' Reativar perfil' : ' Pausar perfil'}
            </button>
            <button type="button" className="btn-excluir" onClick={handleDelete}>
              <Trash2 size={18} /> Excluir minha conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
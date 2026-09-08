import React, { useState, useMemo } from 'react';
import { 
  Users, Search, Filter, UserPlus, LogIn, LogOut, 
  ShieldCheck, CheckCircle, Clock, MapPin, Phone, Mail, 
  Edit3, Trash2, PauseCircle, PlayCircle, AlertTriangle,
  X, Camera, Award, Briefcase, DollarSign, Package
} from 'lucide-react';

// Tentativa de usar o ThemeContext (se existir)
let useThemeSafe = () => ({ theme: 'light' });
try {
  // eslint-disable-next-line
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

const TIPOS_DRONE = [
  'Multirotor',
  'Asa Fixa',
  'FPV',
  'Híbrido',
  'Outros'
];

const MODALIDADES = [
  'Por contrato (PJ / RPA)',
  'CLT',
  'Por temporada / projetos',
  'Diária / por hora',
  'Outros'
];

const FORMAS_PAGAMENTO = [
  'Pix',
  'Transferência bancária',
  'Boleto',
  'Cartão',
  'Dinheiro',
  'A combinar'
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
    regioesAtendidas: 'SP, RJ, MG',
    anosExperiencia: 3,
    tiposDrone: ['Multirotor', 'FPV'],
    areasAtuacao: ['Observador Visual (EVLOS)', 'Troca de Baterias', 'Apoio de Solo / Logística'],
    certificacoes: 'Curso de Observador Visual - DECEA 2024',
    outrasQualificacoes: 'CNH categoria B, conhecimento básico de eletrônica',
    modalidades: ['Diária / por hora', 'Por temporada / projetos'],
    disponibilidadeAtual: 'Imediata',
    preferenciaHorario: 'Segunda a Sexta, manhã e tarde',
    formasPagamento: ['Pix', 'Transferência bancária'],
    valorAproximado: 'R$ 180 / diária',
    possuiEquipamento: true,
    equipamentos: 'Rádios VHF, baterias extras, tripé',
    apresentacao: 'Auxiliar de campo com experiência em missões EVLOS e logística de solo. Disponível para deslocamentos.',
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
    regioesAtendidas: '',
    anosExperiencia: 2,
    tiposDrone: ['Multirotor'],
    areasAtuacao: ['Radio Operador (VHF)', 'Apoio de Solo / Logística'],
    certificacoes: '',
    outrasQualificacoes: 'Inglês intermediário',
    modalidades: ['Por contrato (PJ / RPA)', 'Diária / por hora'],
    disponibilidadeAtual: 'Flexível',
    preferenciaHorario: 'Finais de semana e feriados',
    formasPagamento: ['Pix', 'Cartão'],
    valorAproximado: 'A combinar',
    possuiEquipamento: false,
    equipamentos: '',
    apresentacao: 'Experiência em apoio de solo e comunicação VHF. Pontual e organizada.',
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
    regioesAtendidas: 'MG, SP, GO',
    anosExperiencia: 5,
    tiposDrone: ['Multirotor', 'Asa Fixa'],
    areasAtuacao: ['Observador Visual (EVLOS)', 'Troca de Baterias', 'Apoio de Solo / Logística', 'Mapeamento / Fotogrametria'],
    certificacoes: 'ANAC + curso de mapeamento',
    outrasQualificacoes: 'Técnico em eletrônica, carro próprio',
    modalidades: ['Por contrato (PJ / RPA)', 'Por temporada / projetos'],
    disponibilidadeAtual: 'Apenas finais de semana',
    preferenciaHorario: 'Sábados e domingos',
    formasPagamento: ['Pix', 'Transferência bancária', 'Boleto'],
    valorAproximado: 'R$ 220 / diária',
    possuiEquipamento: true,
    equipamentos: 'Kit completo de apoio + notebook',
    apresentacao: 'Mais de 5 anos de experiência. Disponível para viagens.',
    statusConta: 'Pausada',
    disponibilidade: 'Disponível'
  }
];

const emptyForm = {
  nomeCompleto: '',
  nomeProfissional: '',
  foto: null,
  fotoPreview: null,
  whatsapp: '',
  email: '',
  cidade: '',
  uf: 'SP',
  atendeOutrasRegioes: false,
  regioesAtendidas: '',
  anosExperiencia: '',
  tiposDrone: [],
  areasAtuacao: [],
  certificacoes: '',
  outrasQualificacoes: '',
  modalidades: [],
  disponibilidadeAtual: 'Imediata',
  preferenciaHorario: '',
  formasPagamento: [],
  valorAproximado: '',
  possuiEquipamento: false,
  equipamentos: '',
  apresentacao: '',
  password: '',
  confirmPassword: '',
  autorizaPublicacao: false,
  aceitaTermos: false
};

export default function Auxiliares() {
  const { theme } = useThemeSafe();
  const isDark = theme === 'dark';

  const [auxiliares, setAuxiliares] = useState(INITIAL_AUXILIARES);
  const [search, setSearch] = useState('');
  const [filtroUF, setFiltroUF] = useState('TODOS');
  const [filtroArea, setFiltroArea] = useState('TODAS');
  const [filtroDisp, setFiltroDisp] = useState('TODAS');

  const [userLogueado, setUserLogueado] = useState(null);

  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalGestionOpen, setModalGestionOpen] = useState(false);

  const [formData, setFormData] = useState({ ...emptyForm });
  const [formDataEdit, setFormDataEdit] = useState({ ...emptyForm });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Cores do tema
  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const bgMain = isDark ? '#0f172a' : '#f8fafc';
  const border = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const accent = '#0077C8';

  // Helpers de toggle de arrays
  const toggleArray = (setter, field, value) => {
    setter(prev => {
      const arr = prev[field] || [];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter(v => v !== value) : [...arr, value]
      };
    });
  };

  const handleFoto = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (isEdit) {
      setFormDataEdit(prev => ({ ...prev, foto: file, fotoPreview: preview }));
    } else {
      setFormData(prev => ({ ...prev, foto: file, fotoPreview: preview }));
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    if (!formData.autorizaPublicacao || !formData.aceitaTermos) {
      alert('Você precisa autorizar a publicação e aceitar os termos.');
      return;
    }

    const novo = {
      id: `AUX-${String(auxiliares.length + 1).padStart(3, '0')}`,
      ...formData,
      foto: formData.fotoPreview,
      statusConta: 'Activa',
      disponibilidade: formData.disponibilidadeAtual === 'Imediata' ? 'Disponível' : 'Em Missão'
    };
    delete novo.password;
    delete novo.confirmPassword;
    delete novo.fotoPreview;
    delete novo.autorizaPublicacao;
    delete novo.aceitaTermos;

    setAuxiliares([novo, ...auxiliares]);
    setUserLogueado(novo);
    setModalRegistroOpen(false);
    setFormData({ ...emptyForm });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const encontrado = auxiliares.find(a => a.email.toLowerCase() === loginEmail.toLowerCase());
    if (encontrado) {
      setUserLogueado(encontrado);
      setModalLoginOpen(false);
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Usuário não encontrado. Cadastre-se primeiro.');
    }
  };

  const handleOpenEdit = () => {
    if (!userLogueado) return;
    setFormDataEdit({
      ...userLogueado,
      fotoPreview: userLogueado.foto,
      password: '',
      confirmPassword: '',
      autorizaPublicacao: true,
      aceitaTermos: true
    });
    setModalEditarOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...userLogueado,
      ...formDataEdit,
      foto: formDataEdit.fotoPreview || formDataEdit.foto
    };
    delete updated.password;
    delete updated.confirmPassword;
    delete updated.fotoPreview;
    delete updated.autorizaPublicacao;
    delete updated.aceitaTermos;

    setUserLogueado(updated);
    setAuxiliares(prev => prev.map(a => a.id === updated.id ? updated : a));
    setModalEditarOpen(false);
  };

  const handleTogglePausar = () => {
    const novoStatus = userLogueado.statusConta === 'Pausada' ? 'Activa' : 'Pausada';
    const updated = { ...userLogueado, statusConta: novoStatus };
    setUserLogueado(updated);
    setAuxiliares(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.')) {
      setAuxiliares(prev => prev.filter(a => a.id !== userLogueado.id));
      setUserLogueado(null);
      setModalGestionOpen(false);
    }
  };

  const auxiliaresFiltrados = useMemo(() => {
    return auxiliares.filter(item => {
      if (item.statusConta === 'Pausada' && !userLogueado) return false; // opcional: esconder pausados para visitantes

      const matchText =
        item.nomeCompleto.toLowerCase().includes(search.toLowerCase()) ||
        (item.nomeProfissional || '').toLowerCase().includes(search.toLowerCase()) ||
        item.cidade.toLowerCase().includes(search.toLowerCase());

      const matchUF = filtroUF === 'TODOS' || item.uf === filtroUF;
      const matchArea = filtroArea === 'TODAS' || (item.areasAtuacao || []).includes(filtroArea);
      const matchDisp = filtroDisp === 'TODAS' || item.disponibilidade === filtroDisp;

      return matchText && matchUF && matchArea && matchDisp;
    });
  }, [auxiliares, search, filtroUF, filtroArea, filtroDisp, userLogueado]);

  // Estilos reutilizáveis
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

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: textMuted,
    marginBottom: '6px'
  };

  const sectionTitle = {
    fontSize: '15px',
    fontWeight: 700,
    color: textMain,
    margin: '20px 0 12px 0',
    paddingBottom: '6px',
    borderBottom: `1px solid ${border}`
  };

  // ========== RENDER FORMULÁRIO (reutilizado em cadastro e edição) ==========
  const renderFormFields = (data, setData, isEdit = false) => (
    <>
      {/* FOTO */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          backgroundColor: bgMain, border: `2px dashed ${border}`,
          margin: '0 auto 10px', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {data.fotoPreview || data.foto ? (
            <img src={data.fotoPreview || data.foto} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Camera size={32} color={textMuted} />
          )}
        </div>
        <label style={{ ...labelStyle, cursor: 'pointer', color: accent }}>
          {isEdit ? 'Alterar foto' : 'Adicionar foto de perfil'}
          <input type="file" accept="image/*" onChange={(e) => handleFoto(e, isEdit)} style={{ display: 'none' }} />
        </label>
      </div>

      {/* DADOS BÁSICOS */}
      <div style={sectionTitle}>Dados Básicos e Contato</div>

      <div>
        <label style={labelStyle}>Nome Completo *</label>
        <input required style={inputStyle} value={data.nomeCompleto}
          onChange={e => setData({ ...data, nomeCompleto: e.target.value })} />
      </div>

      <div>
        <label style={labelStyle}>Nome Profissional / Apelido (opcional)</label>
        <input style={inputStyle} value={data.nomeProfissional || ''}
          onChange={e => setData({ ...data, nomeProfissional: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>WhatsApp (com DDD) *</label>
          <input required style={inputStyle} placeholder="11999998888"
            value={data.whatsapp}
            onChange={e => setData({ ...data, whatsapp: e.target.value.replace(/\D/g, '') })} />
        </div>
        <div>
          <label style={labelStyle}>E-mail *</label>
          <input required type="email" style={inputStyle} value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Cidade *</label>
          <input required style={inputStyle} value={data.cidade}
            onChange={e => setData({ ...data, cidade: e.target.value })} />
        </div>
        <div>
          <label style={labelStyle}>Estado (UF) *</label>
          <select style={inputStyle} value={data.uf}
            onChange={e => setData({ ...data, uf: e.target.value })}>
            {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!data.atendeOutrasRegioes}
            onChange={e => setData({ ...data, atendeOutrasRegioes: e.target.checked })} />
          Atende outras regiões / estados
        </label>
        {data.atendeOutrasRegioes && (
          <input style={{ ...inputStyle, marginTop: 8 }} placeholder="Ex: SP, RJ, MG ou raio de 200km"
            value={data.regioesAtendidas || ''}
            onChange={e => setData({ ...data, regioesAtendidas: e.target.value })} />
        )}
      </div>

      {/* EXPERIÊNCIA */}
      <div style={sectionTitle}>Experiência e Qualificações</div>

      <div>
        <label style={labelStyle}>Anos de experiência com drones</label>
        <input type="number" min="0" style={inputStyle} value={data.anosExperiencia}
          onChange={e => setData({ ...data, anosExperiencia: e.target.value })} />
      </div>

      <div>
        <label style={labelStyle}>Tipos de drones que opera</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {TIPOS_DRONE.map(t => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: textMain, cursor: 'pointer' }}>
              <input type="checkbox" checked={(data.tiposDrone || []).includes(t)}
                onChange={() => toggleArray(setData, 'tiposDrone', t)} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Principais áreas de atuação *</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {AREAS_ATUACAO.map(a => (
            <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: textMain, cursor: 'pointer' }}>
              <input type="checkbox" checked={(data.areasAtuacao || []).includes(a)}
                onChange={() => toggleArray(setData, 'areasAtuacao', a)} />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Certificações / Cursos (ANAC, DECEA, etc.)</label>
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={data.certificacoes || ''}
          onChange={e => setData({ ...data, certificacoes: e.target.value })}
          placeholder="Liste cursos e certificações..." />
      </div>

      <div>
        <label style={labelStyle}>Outras qualificações / habilidades extras</label>
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={data.outrasQualificacoes || ''}
          onChange={e => setData({ ...data, outrasQualificacoes: e.target.value })}
          placeholder="Ex: CNH, inglês, eletrônica, software de processamento..." />
      </div>

      {/* MODALIDADE E DISPONIBILIDADE */}
      <div style={sectionTitle}>Modalidade de Trabalho e Disponibilidade</div>

      <div>
        <label style={labelStyle}>Modalidade de contratação</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MODALIDADES.map(m => (
            <label key={m} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: textMain, cursor: 'pointer' }}>
              <input type="checkbox" checked={(data.modalidades || []).includes(m)}
                onChange={() => toggleArray(setData, 'modalidades', m)} />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Disponibilidade atual</label>
        <select style={inputStyle} value={data.disponibilidadeAtual}
          onChange={e => setData({ ...data, disponibilidadeAtual: e.target.value })}>
          <option value="Imediata">Imediata</option>
          <option value="A partir de data específica">A partir de data específica</option>
          <option value="Apenas finais de semana">Apenas finais de semana</option>
          <option value="Flexível">Flexível</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Preferência de carga horária / dias da semana</label>
        <input style={inputStyle} value={data.preferenciaHorario || ''}
          onChange={e => setData({ ...data, preferenciaHorario: e.target.value })}
          placeholder="Ex: Segunda a sexta, manhã e tarde" />
      </div>

      {/* CONDIÇÕES COMERCIAIS */}
      <div style={sectionTitle}>Condições Comerciais</div>

      <div>
        <label style={labelStyle}>Formas de pagamento aceitas</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {FORMAS_PAGAMENTO.map(f => (
            <label key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: textMain, cursor: 'pointer' }}>
              <input type="checkbox" checked={(data.formasPagamento || []).includes(f)}
                onChange={() => toggleArray(setData, 'formasPagamento', f)} />
              {f}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Valor aproximado (opcional)</label>
        <input style={inputStyle} value={data.valorAproximado || ''}
          onChange={e => setData({ ...data, valorAproximado: e.target.value })}
          placeholder="Ex: R$ 180 / diária ou A combinar" />
      </div>

      <div>
        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!data.possuiEquipamento}
            onChange={e => setData({ ...data, possuiEquipamento: e.target.checked })} />
          Possui equipamento próprio
        </label>
        {data.possuiEquipamento && (
          <input style={{ ...inputStyle, marginTop: 8 }}
            value={data.equipamentos || ''}
            onChange={e => setData({ ...data, equipamentos: e.target.value })}
            placeholder="Quais equipamentos?" />
        )}
      </div>

      {/* APRESENTAÇÃO */}
      <div style={sectionTitle}>Informações Extras</div>
      <div>
        <label style={labelStyle}>Apresentação profissional / Informações adicionais</label>
        <textarea style={{ ...inputStyle, minHeight: 110 }}
          value={data.apresentacao || ''}
          onChange={e => setData({ ...data, apresentacao: e.target.value })}
          placeholder="Conte sua experiência, diferenciais, se tem carro, disponibilidade para viagens, idiomas, etc." />
      </div>

      {/* SENHA (só no cadastro) */}
      {!isEdit && (
        <>
          <div style={sectionTitle}>Segurança da Conta</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Senha *</label>
              <input required type="password" style={inputStyle} value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Confirmar Senha *</label>
              <input required type="password" style={inputStyle} value={data.confirmPassword}
                onChange={e => setData({ ...data, confirmPassword: e.target.value })} />
            </div>
          </div>
        </>
      )}

      {/* TERMOS */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: textMain, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!data.autorizaPublicacao}
            onChange={e => setData({ ...data, autorizaPublicacao: e.target.checked })}
            style={{ marginTop: 3 }} />
          Autorizo a publicação do meu perfil no site drones.orientese.com
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: textMain, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!data.aceitaTermos}
            onChange={e => setData({ ...data, aceitaTermos: e.target.checked })}
            style={{ marginTop: 3 }} />
          Li e aceito os termos de uso do drones.orientese.com
        </label>
      </div>
    </>
  );

  return (
    <div style={{ padding: '28px 20px', maxWidth: 1240, margin: '0 auto' }}>
      <style>{`
        @keyframes modalScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 16px;
        }
        .modal-animated {
          animation: modalScaleUp 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* HEADER */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 28, flexWrap: 'wrap', gap: 16
      }}>
        <div>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800, color: textMain,
            display: 'flex', alignItems: 'center', gap: 12, margin: 0
          }}>
            <Users size={30} color={accent} />
            Central de Auxiliares de Campo
          </h1>
          <p style={{ color: textMuted, margin: '6px 0 0 0', fontSize: 15 }}>
            Rede operacional de apoio em solo para missões de drones
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {userLogueado ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: bgCard, padding: '8px 16px', borderRadius: 12,
              border: `1px solid ${border}`
            }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: textMain, fontSize: 14 }}>
                  {userLogueado.nomeProfissional || userLogueado.nomeCompleto}
                </div>
                <div style={{
                  fontSize: 12,
                  color: userLogueado.statusConta === 'Pausada' ? '#ef4444' : '#10b981'
                }}>
                  {userLogueado.statusConta === 'Pausada' ? '• Conta Pausada' : '• Operacional'}
                </div>
              </div>
              <button onClick={handleOpenEdit} title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <Edit3 size={18} />
              </button>
              <button onClick={() => setModalGestionOpen(true)} title="Gerenciar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <PauseCircle size={18} />
              </button>
              <button onClick={() => setUserLogueado(null)} title="Sair" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setModalLoginOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 10,
                background: 'transparent', border: `1px solid ${border}`,
                color: textMain, fontWeight: 600, cursor: 'pointer'
              }}>
                <LogIn size={18} /> Entrar
              </button>
              <button onClick={() => setModalRegistroOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', borderRadius: 10,
                background: accent, border: 'none',
                color: '#fff', fontWeight: 600, cursor: 'pointer'
              }}>
                <UserPlus size={18} /> Quero ser Auxiliar
              </button>
            </>
          )}
        </div>
      </div>

      {/* FILTROS */}
      <div style={{
        background: bgCard, borderRadius: 14, padding: 18,
        border: `1px solid ${border}`, marginBottom: 24,
        display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center'
      }}>
        <div style={{ flex: '1 1 260px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: textMuted }} />
          <input
            type="text"
            placeholder="Buscar por nome ou cidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 38 }}
          />
        </div>

        <select value={filtroUF} onChange={e => setFiltroUF(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODOS">Todos os Estados</option>
          {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
        </select>

        <select value={filtroArea} onChange={e => setFiltroArea(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODAS">Todas as Áreas</option>
          {AREAS_ATUACAO.map(a => <option key={a} value={a}>{a}</option>)}
        </select>

        <select value={filtroDisp} onChange={e => setFiltroDisp(e.target.value)} style={{ ...inputStyle, width: 'auto' }}>
          <option value="TODAS">Qualquer Disponibilidade</option>
          <option value="Disponível">Disponível</option>
          <option value="Em Missão">Em Missão</option>
        </select>
      </div>

      {/* LISTA DE CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 20
      }}>
        {auxiliaresFiltrados.map(aux => (
          <div key={aux.id} style={{
            background: bgCard, borderRadius: 16,
            border: `1px solid ${border}`, padding: 20,
            display: 'flex', flexDirection: 'column',
            opacity: aux.statusConta === 'Pausada' ? 0.65 : 1
          }}>
            {/* Header do card */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: bgMain, overflow: 'hidden', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
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
                  {aux.atendeOutrasRegioes && <span style={{ marginLeft: 6, fontSize: 11 }}>(atende outras regiões)</span>}
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  marginTop: 6, fontSize: 12, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 20,
                  background: aux.disponibilidade === 'Disponível' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                  color: aux.disponibilidade === 'Disponível' ? '#10b981' : '#f59e0b'
                }}>
                  {aux.disponibilidade === 'Disponível' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {aux.disponibilidade}
                </span>
              </div>
            </div>

            {/* Áreas */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {(aux.areasAtuacao || []).slice(0, 4).map((a, i) => (
                <span key={i} style={{
                  fontSize: 11, padding: '3px 8px', borderRadius: 6,
                  background: isDark ? '#0c4a6e' : '#e0f2fe',
                  color: isDark ? '#7dd3fc' : '#0369a1'
                }}>{a}</span>
              ))}
            </div>

            {/* Infos rápidas */}
            <div style={{ fontSize: 13, color: textMuted, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
              {aux.anosExperiencia && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Award size={14} /> {aux.anosExperiencia} anos de experiência
                </div>
              )}
              {aux.valorAproximado && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <DollarSign size={14} /> {aux.valorAproximado}
                </div>
              )}
              {aux.possuiEquipamento && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Package size={14} /> Equipamento próprio
                </div>
              )}
              {aux.modalidades?.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Briefcase size={14} /> {aux.modalidades[0]}
                </div>
              )}
            </div>

            {aux.apresentacao && (
              <p style={{
                fontSize: 13, color: textMuted, lineHeight: 1.45,
                margin: '0 0 14px 0',
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
              }}>
                {aux.apresentacao}
              </p>
            )}

            {/* Contato */}
            <div style={{
              marginTop: 'auto', borderTop: `1px solid ${border}`,
              paddingTop: 12, display: 'flex', justifyContent: 'space-between', gap: 10
            }}>
              <a
                href={`https://wa.me/55${(aux.whatsapp || '').replace(/\D/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: '#16a34a', fontWeight: 700, fontSize: 13, textDecoration: 'none'
                }}
              >
                <Phone size={15} /> WhatsApp
              </a>
              <a
                href={`mailto:${aux.email}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: textMuted, fontSize: 13, textDecoration: 'none'
                }}
              >
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

      {/* ========== MODAL CADASTRO ========== */}
      {modalRegistroOpen && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            background: bgCard, borderRadius: 18, padding: 28,
            width: '100%', maxWidth: 580, border: `1px solid ${border}`,
            maxHeight: '92vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: textMain }}>
                Cadastro de Auxiliar de Campo
              </h2>
              <button onClick={() => setModalRegistroOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {renderFormFields(formData, setFormData, false)}

              <button type="submit" style={{
                marginTop: 16, padding: 13, borderRadius: 10,
                background: accent, border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }}>
                Concluir Cadastro e Publicar Perfil
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL LOGIN ========== */}
      {modalLoginOpen && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            background: bgCard, borderRadius: 18, padding: 28,
            width: '100%', maxWidth: 400, border: `1px solid ${border}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: textMain }}>Acessar Conta</h2>
              <button onClick={() => setModalLoginOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>E-mail</label>
                <input required type="email" style={inputStyle} value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Senha</label>
                <input required type="password" style={inputStyle} value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)} />
              </div>
              <button type="submit" style={{
                marginTop: 8, padding: 12, borderRadius: 10,
                background: accent, border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer'
              }}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL EDITAR ========== */}
      {modalEditarOpen && userLogueado && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            background: bgCard, borderRadius: 18, padding: 28,
            width: '100%', maxWidth: 580, border: `1px solid ${border}`,
            maxHeight: '92vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: textMain }}>
                Editar Perfil de Auxiliar
              </h2>
              <button onClick={() => setModalEditarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {renderFormFields(formDataEdit, setFormDataEdit, true)}
              <button type="submit" style={{
                marginTop: 16, padding: 13, borderRadius: 10,
                background: accent, border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }}>
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========== MODAL GERENCIAR CONTA ========== */}
      {modalGestionOpen && userLogueado && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            background: bgCard, borderRadius: 18, padding: 28,
            width: '100%', maxWidth: 440, border: `1px solid ${border}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: textMain, display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={20} color="#f59e0b" /> Gerenciar Conta
              </h2>
              <button onClick={() => setModalGestionOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textMuted }}>
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: 14, color: textMuted, marginBottom: 20 }}>
              Pause seu perfil para não receber novas solicitações ou exclua sua conta permanentemente.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={handleTogglePausar} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: 12, borderRadius: 10, fontWeight: 600, cursor: 'pointer',
                background: userLogueado.statusConta === 'Pausada' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                border: `1px solid ${userLogueado.statusConta === 'Pausada' ? '#10b981' : '#f59e0b'}`,
                color: userLogueado.statusConta === 'Pausada' ? '#10b981' : '#f59e0b'
              }}>
                {userLogueado.statusConta === 'Pausada' ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                {userLogueado.statusConta === 'Pausada' ? 'Reativar Perfil' : 'Pausar Perfil'}
              </button>
              <button onClick={handleDelete} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: 12, borderRadius: 10, fontWeight: 600, cursor: 'pointer',
                background: 'rgba(239,68,68,0.12)', border: '1px solid #ef4444', color: '#ef4444'
              }}>
                <Trash2 size={18} /> Excluir Minha Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
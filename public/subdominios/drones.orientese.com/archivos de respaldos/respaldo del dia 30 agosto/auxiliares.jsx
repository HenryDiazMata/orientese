import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  Trash2, 
  PauseCircle, 
  PlayCircle, 
  AlertTriangle,
  X
} from 'lucide-react';

// Lista completa de Estados de Brasil (26 Estados + DF)
const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Datos MOCK de Auxiliares
const INITIAL_AUXILIARES = [
  {
    id: 'AUX-001',
    nombre: 'Lucas Silva',
    uf: 'SP',
    ciudad: 'São Paulo',
    telefono: '+55 11 98765-4321',
    email: 'lucas.silva@email.com',
    capacidades: ['Observador Visual (EVLOS)', 'Troca de Baterias'],
    experienciaHoras: 120,
    disponibilidad: 'Disponível',
    statusCuenta: 'Activa'
  },
  {
    id: 'AUX-002',
    nombre: 'Mariana Rocha',
    uf: 'RJ',
    ciudad: 'Niterói',
    telefono: '+55 21 97654-3210',
    email: 'marianarocha@email.com',
    capacidades: ['Radio Operador (VHF)', 'Apoio de Solo/Logística'],
    experienciaHoras: 85,
    disponibilidad: 'Em Missão',
    statusCuenta: 'Activa'
  },
  {
    id: 'AUX-003',
    nombre: 'Carlos Eduardo',
    uf: 'MG',
    ciudad: 'Belo Horizonte',
    telefono: '+55 31 96543-2109',
    email: 'carlos.eduardo@email.com',
    capacidades: ['Observador Visual (EVLOS)', 'Troca de Baterias', 'Apoio de Solo/Logística'],
    experienciaHoras: 210,
    disponibilidad: 'Disponível',
    statusCuenta: 'Pausada'
  }
];

const CAPACIDADES_OPCIONES = [
  'Observador Visual (EVLOS)',
  'Troca de Baterias',
  'Radio Operador (VHF)',
  'Apoio de Solo/Logística'
];

export default function Auxiliares() {
  const [auxiliares, setAuxiliares] = useState(INITIAL_AUXILIARES);
  const [search, setSearch] = useState('');
  const [filtroUF, setFiltroUF] = useState('TODOS');
  const [filtroCapacidad, setFiltroCapacidad] = useState('TODAS');

  // Estados de Usuario Logueado
  const [userLogueado, setUserLogueado] = useState(null);

  // Estados de los Modales
  const [modalRegistroOpen, setModalRegistroOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalGestionCuentaOpen, setModalGestionCuentaOpen] = useState(false);

  // Form Registro / Login
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    uf: 'SP',
    ciudad: '',
    password: '',
    confirmPassword: '',
    capacidades: []
  });

  const [formDataEdit, setFormDataEdit] = useState({
    nombre: '',
    email: '',
    telefono: '',
    uf: 'SP',
    ciudad: '',
    capacidades: []
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------
  const handleToggleCapacidad = (cap) => {
    setFormData(prev => {
      const exists = prev.capacidades.includes(cap);
      if (exists) {
        return { ...prev, capacidades: prev.capacidades.filter(c => c !== cap) };
      } else {
        return { ...prev, capacidades: [...prev.capacidades, cap] };
      }
    });
  };

  const handleToggleCapacidadEdit = (cap) => {
    setFormDataEdit(prev => {
      const exists = prev.capacidades.includes(cap);
      if (exists) {
        return { ...prev, capacidades: prev.capacidades.filter(c => c !== cap) };
      } else {
        return { ...prev, capacidades: [...prev.capacidades, cap] };
      }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const nuevoAuxiliar = {
      id: `AUX-00${auxiliares.length + 1}`,
      nombre: formData.nombre,
      uf: formData.uf,
      ciudad: formData.ciudad,
      telefono: formData.telefono,
      email: formData.email,
      capacidades: formData.capacidades.length > 0 ? formData.capacidades : ['Apoio de Solo/Logística'],
      experienciaHoras: 0,
      disponibilidad: 'Disponível',
      statusCuenta: 'Activa'
    };

    setAuxiliares([nuevoAuxiliar, ...auxiliares]);
    setUserLogueado(nuevoAuxiliar);
    setModalRegistroOpen(false);
    resetForm();
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
      alert('Usuário não encontrado. Registre-se para acessar.');
    }
  };

  const handleOpenEditModal = () => {
    if (userLogueado) {
      setFormDataEdit({
        nombre: userLogueado.nombre,
        email: userLogueado.email,
        telefono: userLogueado.telefono,
        uf: userLogueado.uf,
        ciudad: userLogueado.ciudad,
        capacidades: userLogueado.capacidades || []
      });
      setModalEditarOpen(true);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...userLogueado,
      nombre: formDataEdit.nombre,
      email: formDataEdit.email,
      telefono: formDataEdit.telefono,
      uf: formDataEdit.uf,
      ciudad: formDataEdit.ciudad,
      capacidades: formDataEdit.capacidades
    };
    setUserLogueado(updated);
    setAuxiliares(prev => prev.map(item => item.id === updated.id ? updated : item));
    setModalEditarOpen(false);
  };

  const handleTogglePausarCuenta = () => {
    const novoStatus = userLogueado.statusCuenta === 'Pausada' ? 'Activa' : 'Pausada';
    const updated = { ...userLogueado, statusCuenta: novoStatus };
    setUserLogueado(updated);
    setAuxiliares(prev => prev.map(item => item.id === updated.id ? updated : item));
  };

  const handleDeleteCuenta = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta de auxiliar? Esta ação é irreversível.')) {
      setAuxiliares(prev => prev.filter(item => item.id !== userLogueado.id));
      setUserLogueado(null);
      setModalGestionCuentaOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      uf: 'SP',
      ciudad: '',
      password: '',
      confirmPassword: '',
      capacidades: []
    });
  };

  // Filtrado
  const auxiliaresFiltrados = auxiliares.filter(item => {
    const matchText = item.nombre.toLowerCase().includes(search.toLowerCase()) || 
                      item.ciudad.toLowerCase().includes(search.toLowerCase());
    const matchUF = filtroUF === 'TODOS' || item.uf === filtroUF;
    const matchCap = filtroCapacidad === 'TODAS' || item.capacidades.includes(filtroCapacidad);
    
    return matchText && matchUF && matchCap;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* CSS Integrado para Animaciones y Modales */}
      <style>{`
        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }
        .modal-animated {
          animation: modalScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .badge-status {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>

      {/* HEADER PRINCIPAL */}
      <div style={{ 
        display: 'flex', 
        justify: 'space-between', 
        alignItems: 'center', 
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 700, 
            color: 'var(--text-main, #fff)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px' 
          }}>
            <Users style={{ color: 'var(--accent, #00E5FF)' }} size={32} />
            Central de Auxiliares de Campo
          </h1>
          <p style={{ color: 'var(--text-secondary, #94A3B8)', marginTop: '4px' }}>
            Rede operacional de apoio em solo para missões de drones e auditoria remota
          </p>
        </div>

        {/* BOTONES DE ACCIÓN / USUARIO */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {userLogueado ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              backgroundColor: 'var(--bg-card, #1E293B)',
              padding: '6px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #334155)'
            }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main, #fff)' }}>
                  {userLogueado.nombre}
                </span>
                <span style={{ fontSize: '0.75rem', color: userLogueado.statusCuenta === 'Pausada' ? '#EF4444' : '#10B981' }}>
                  {userLogueado.statusCuenta === 'Pausada' ? '• Conta Pausada' : '• Operacional'}
                </span>
              </div>
              <button 
                onClick={handleOpenEditModal}
                title="Editar Perfil"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary, #94A3B8)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={() => setModalGestionCuentaOpen(true)}
                title="Gerenciar / Pausar Conta"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary, #94A3B8)',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <PauseCircle size={18} />
              </button>
              <button 
                onClick={() => setUserLogueado(null)}
                title="Sair"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setModalLoginOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-color, #334155)',
                  color: 'var(--text-main, #fff)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <LogIn size={18} /> Entrar
              </button>
              <button 
                onClick={() => setModalRegistroOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent, #00E5FF)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <UserPlus size={18} /> Quero ser Auxiliar
              </button>
            </>
          )}
        </div>
      </div>

      {/* PANEL DE FILTROS Y BÚSQUEDA */}
      <div style={{
        backgroundColor: 'var(--bg-card, #1E293B)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid var(--border-color, #334155)',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Input Buscador */}
        <div style={{ flex: '1 1 300px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary, #94A3B8)' }} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-main, #0F172A)',
              border: '1px solid var(--border-color, #334155)',
              color: 'var(--text-main, #fff)',
              outline: 'none'
            }}
          />
        </div>

        {/* Filtro por UF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} style={{ color: 'var(--text-secondary, #94A3B8)' }} />
          <select 
            value={filtroUF} 
            onChange={(e) => setFiltroUF(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-main, #0F172A)',
              border: '1px solid var(--border-color, #334155)',
              color: 'var(--text-main, #fff)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="TODOS">Todos os Estados (UF)</option>
            {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </div>

        {/* Filtro por Capacidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select 
            value={filtroCapacidad} 
            onChange={(e) => setFiltroCapacidad(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--bg-main, #0F172A)',
              border: '1px solid var(--border-color, #334155)',
              color: 'var(--text-main, #fff)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="TODAS">Todas as Capacidades</option>
            {CAPACIDADES_OPCIONES.map(cap => <option key={cap} value={cap}>{cap}</option>)}
          </select>
        </div>
      </div>

      {/* LISTA DE CARDS DE AUXILIARES */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {auxiliaresFiltrados.map((aux) => (
          <div 
            key={aux.id}
            style={{
              backgroundColor: 'var(--bg-card, #1E293B)',
              borderRadius: '16px',
              border: '1px solid var(--border-color, #334155)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              opacity: aux.statusCuenta === 'Pausada' ? 0.6 : 1
            }}
          >
            <div>
              {/* Header Card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main, #fff)', margin: 0 }}>
                    {aux.nombre}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #94A3B8)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                    <MapPin size={14} /> {aux.ciudad} - {aux.uf}
                  </span>
                </div>
                <span className="badge-status" style={{
                  backgroundColor: aux.disponibilidad === 'Disponível' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: aux.disponibilidad === 'Disponível' ? '#10B981' : '#F59E0B'
                }}>
                  {aux.disponibilidad === 'Disponível' ? <CheckCircle size={12} /> : <Clock size={12} />}
                  {aux.disponibilidad}
                </span>
              </div>

              {/* Capacidades Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {aux.capacidades.map((cap, idx) => (
                  <span 
                    key={idx} 
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-main, #0F172A)',
                      color: 'var(--accent, #00E5FF)',
                      border: '1px solid rgba(0, 229, 255, 0.2)'
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>

              {/* Informaciones Operacionales */}
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <ShieldCheck size={14} /> Horas de Missão: <strong style={{ color: 'var(--text-main, #fff)' }}>{aux.experienciaHoras}h</strong>
                </div>
              </div>
            </div>

            {/* Contacto Directo */}
            <div style={{ 
              borderTop: '1px solid var(--border-color, #334155)', 
              paddingTop: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <a 
                href={`https://wa.me/${aux.telefono.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#10B981',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                <Phone size={14} /> WhatsApp
              </a>
              <a 
                href={`mailto:${aux.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--text-secondary, #94A3B8)',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <Mail size={14} /> Email
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: REGISTRO DE AUXILIAR */}
      {modalRegistroOpen && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            backgroundColor: 'var(--bg-card, #1E293B)',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '540px',
            border: '1px solid var(--border-color, #334155)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main, #fff)', margin: 0 }}>
                Cadastro de Auxiliar de Campo
              </h2>
              <button onClick={() => setModalRegistroOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #94A3B8)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formData.nombre} 
                  onChange={e => setFormData({...formData, nombre: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="+55 11 90000-0000"
                    value={formData.telefono} 
                    onChange={e => setFormData({...formData, telefono: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>UF</label>
                  <select 
                    value={formData.uf} 
                    onChange={e => setFormData({...formData, uf: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  >
                    {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Cidade</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.ciudad} 
                    onChange={e => setFormData({...formData, ciudad: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '6px' }}>Habilidades / Funções</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {CAPACIDADES_OPCIONES.map(cap => (
                    <label key={cap} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formData.capacidades.includes(cap)}
                        onChange={() => handleToggleCapacidad(cap)}
                      />
                      {cap}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Senha</label>
                  <input 
                    type="password" 
                    required 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Confirmar Senha</label>
                  <input 
                    type="password" 
                    required 
                    value={formData.confirmPassword} 
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent, #00E5FF)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Concluir Cadastro
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOGIN */}
      {modalLoginOpen && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            backgroundColor: 'var(--bg-card, #1E293B)',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid var(--border-color, #334155)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main, #fff)', margin: 0 }}>
                Acessar Conta Auxiliar
              </h2>
              <button onClick={() => setModalLoginOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #94A3B8)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Email</label>
                <input 
                  type="email" 
                  required 
                  value={loginEmail} 
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="lucas.silva@email.com"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Senha</label>
                <input 
                  type="password" 
                  required 
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent, #00E5FF)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR PERFIL */}
      {modalEditarOpen && userLogueado && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            backgroundColor: 'var(--bg-card, #1E293B)',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '540px',
            border: '1px solid var(--border-color, #334155)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main, #fff)', margin: 0 }}>
                Editar Perfil de Auxiliar
              </h2>
              <button onClick={() => setModalEditarOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #94A3B8)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  value={formDataEdit.nombre} 
                  onChange={e => setFormDataEdit({...formDataEdit, nombre: e.target.value})}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Email</label>
                  <input 
                    type="email" 
                    required 
                    value={formDataEdit.email} 
                    onChange={e => setFormDataEdit({...formDataEdit, email: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    required 
                    value={formDataEdit.telefono} 
                    onChange={e => setFormDataEdit({...formDataEdit, telefono: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>UF</label>
                  <select 
                    value={formDataEdit.uf} 
                    onChange={e => setFormDataEdit({...formDataEdit, uf: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  >
                    {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '4px' }}>Cidade</label>
                  <input 
                    type="text" 
                    required 
                    value={formDataEdit.ciudad} 
                    onChange={e => setFormDataEdit({...formDataEdit, ciudad: e.target.value})}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: 'var(--bg-main, #0F172A)', border: '1px solid var(--border-color, #334155)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '6px' }}>Habilidades / Funções</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {CAPACIDADES_OPCIONES.map(cap => (
                    <label key={cap} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={formDataEdit.capacidades.includes(cap)}
                        onChange={() => handleToggleCapacidadEdit(cap)}
                      />
                      {cap}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--accent, #00E5FF)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GERENCIAR / PAUSAR CONTA */}
      {modalGestionCuentaOpen && userLogueado && (
        <div className="modal-backdrop">
          <div className="modal-animated" style={{
            backgroundColor: 'var(--bg-card, #1E293B)',
            borderRadius: '20px',
            padding: '28px',
            width: '100%',
            maxWidth: '450px',
            border: '1px solid var(--border-color, #334155)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main, #fff)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle style={{ color: '#F59E0B' }} size={20} /> Gerenciar Operação
              </h2>
              <button onClick={() => setModalGestionCuentaOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary, #94A3B8)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94A3B8)', marginBottom: '20px' }}>
              Você pode pausar temporariamente seu perfil para não receber novas chamadas de missão ou excluir sua conta permanentemente.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={handleTogglePausarCuenta}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: userLogueado.statusCuenta === 'Pausada' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  border: `1px solid ${userLogueado.statusCuenta === 'Pausada' ? '#10B981' : '#F59E0B'}`,
                  color: userLogueado.statusCuenta === 'Pausada' ? '#10B981' : '#F59E0B',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {userLogueado.statusCuenta === 'Pausada' ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
                {userLogueado.statusCuenta === 'Pausada' ? 'Reativar Minha Disponibilidade' : 'Pausar Recebimento de Missões'}
              </button>

              <button 
                onClick={handleDeleteCuenta}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #EF4444',
                  color: '#EF4444',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={18} /> Excluir Minha Conta
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
import React, { useState } from 'react';
import CadastroPiloto from '../components/formularios/CadastroPiloto'; // <-- 1. IMPORTAMOS EL FORMULARIO COMPLETO

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const CATEGORIAS_PILOTO = [
  'Mapeamento & Agrimensura',
  'Pulverização Agrícola',
  'Inspeção Industrial / Termografia',
  'Filmagens & Produções Audiovisuais',
  'Segurança & Monitoramento'
];

// MOCK DATA DE PILOTOS
const MOCK_PILOTOS = [
  {
    id: 1,
    nome: 'Carlos Eduardo Silva',
    usuario: 'carlos.piloto',
    fotoUrl: 'https://via.placeholder.com/150x200',
    categoria: 'Pulverização Agrícola',
    horasVoo: '1.200h de voo',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    disponivelDeslocamento: 'Sim',
    telefone: '16999998888',
    email: 'carlos.piloto@gmail.com',
    anac: 'ANAC PP-987654',
    drones: ['DJI Agras T40', 'Phantom 4 RTK'],
    resumo: 'Piloto especialista em pulverização de precisão com vasta experiência em culturas de cana e soja.'
  },
  {
    id: 2,
    nome: 'Fernanda Lima',
    usuario: 'fernanda.drones',
    fotoUrl: 'https://via.placeholder.com/150x200',
    categoria: 'Mapeamento & Agrimensura',
    horasVoo: '850h de voo',
    cidade: 'Campinas',
    estado: 'SP',
    disponivelDeslocamento: 'Sim',
    telefone: '19988887777',
    email: 'fernanda.lima@geodrones.com',
    anac: 'ANAC PP-123456',
    drones: ['Mavic 3 Enterprise', 'SenseFly eBee X'],
    resumo: 'Especialista em processamento de nuvens de pontos, ortomosaicos e modelos digitais de terreno (MDT).'
  }
];

export default function PilotosView() {
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [buscaAtiva, setBuscaAtiva] = useState(false);
  const [pilotoSelecionado, setPilotoSelecionado] = useState(null);
  const [modoCadastrar, setModoCadastrar] = useState(false);

  // Estados de Autenticación / Edición
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [pilotoLogado, setPilotoLogado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [formData, setFormData] = useState({});

  const handleBuscar = (e) => {
    e.preventDefault();
    setBuscaAtiva(true);
  };

  const handleLimpar = () => {
    setFiltroEstado('');
    setFiltroCategoria('');
    setBuscaAtiva(false);
  };

  // Login de Piloto
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const encontrado = MOCK_PILOTOS.find(p => p.usuario === loginUser || p.email === loginUser);
    if (encontrado) {
      setPilotoLogado(encontrado);
      setFormData({ ...encontrado });
      setShowLoginModal(false);
      setShowEditModal(true);
    } else {
      alert('Usuário não encontrado. Tente carlos.piloto ou fernanda.drones');
    }
  };

  const handleExcluirConta = () => {
    if (window.confirm('Tem certeza absoluta que deseja DAR DE BAIXA / EXCLUIR sua conta de piloto? Esta ação removerá seu perfil permanentemente do sistema.')) {
      alert('Sua conta foi excluída com sucesso.');
      setPilotoLogado(null);
      setShowEditModal(false);
    }
  };

  const handlePausarPerfil = () => {
    alert('Seu perfil foi pausado e não aparecerá nos resultados de busca temporariamente.');
    setShowEditModal(false);
  };

  const pilotosFiltrados = MOCK_PILOTOS.filter(piloto => {
    const matchEstado = !filtroEstado || piloto.estado === filtroEstado;
    const matchCat = !filtroCategoria || piloto.categoria === filtroCategoria;
    return matchEstado && matchCat;
  });

  return (
    <div style={styles.container}>
      
      {/* CABECERA PRINCIPAL CON BOTONES SUPERIORES */}
      <div style={styles.topHeaderBar}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)' }}>
            👨‍✈️ Central de Pilotos de Drones
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
            Encontre pilotos profissionais certificados pela ANAC/DECEA para suas operações.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {pilotoLogado ? (
            <button 
              onClick={() => setShowEditModal(true)} 
              style={styles.loginBtnHeader}
            >
              👤 Painel de {pilotoLogado.nome.split(' ')[0]}
            </button>
          ) : (
            <button 
              onClick={() => setShowLoginModal(true)} 
              style={styles.loginBtnHeader}
            >
              🔑 Já é cadastrado? Entrar
            </button>
          )}

          <button 
            onClick={() => setModoCadastrar(!modoCadastrar)} 
            style={styles.cadastrarBtnHeader}
          >
            {modoCadastrar ? '⬅️ Voltar para Busca' : '✍️ Cadastrar como Piloto'}
          </button>
        </div>
      </div>

      {/* 🔴 AQUÍ ESTÁ EL CAMBIO: MUESTRA EL COMPONENTE FORMULARIO COMPLETO */}
      {modoCadastrar ? (
        <CadastroPiloto onSalvar={(dados) => {
          console.log('Piloto registrado:', dados);
          alert('Cadastro realizado com sucesso!');
          setModoCadastrar(false);
        }} />
      ) : (
        /* VISTA DE BÚSQUEDA DE PILOTOS */
        <>
          <div style={styles.filterBox}>
            <h3 style={styles.filterTitle}>🔍 Buscar Pilotos Certificados</h3>

            <form onSubmit={handleBuscar}>
              <div style={styles.filterGrid}>
                <div>
                  <label style={styles.filterLabel}>Estado (UF)</label>
                  <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={styles.select}>
                    <option value="">Todos os Estados</option>
                    {ESTADOS_BRASIL.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>

                <div>
                  <label style={styles.filterLabel}>Especialidade / Operação</label>
                  <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} style={styles.select}>
                    <option value="">Todas as Categorias</option>
                    {CATEGORIAS_PILOTO.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div style={styles.actionButtonsRow}>
                <button type="submit" style={styles.buscarBtn}>🔍 Pesquisar Pilotos</button>
                {buscaAtiva && (
                  <button type="button" onClick={handleLimpar} style={styles.limparBtn}>Limpar Filtros</button>
                )}
              </div>
            </form>
          </div>

          {/* RESULTADOS DE BÚSQUEDA */}
          {buscaAtiva && (
            <div style={styles.listContainer}>
              <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>
                Pilotos Encontrados ({pilotosFiltrados.length})
              </h2>

              {pilotosFiltrados.length === 0 ? (
                <div style={styles.emptyState}>Nenhum piloto encontrado para os filtros selecionados.</div>
              ) : (
                pilotosFiltrados.map((piloto) => (
                  <div key={piloto.id} style={styles.cardResumida}>
                    <div style={styles.twoColumnGrid}>
                      <div style={styles.leftMainBlock}>
                        <div style={styles.headerPilotoRow}>
                          <img src={piloto.fotoUrl} alt={piloto.nome} style={styles.foto3x4} />
                          <div>
                            <h3 style={styles.pilotoNome}>{piloto.nome}</h3>
                            <span style={styles.badgeAzul}>
                              👨‍✈️ {piloto.categoria}
                            </span>
                            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                              📜 {piloto.anac} | ⏱️ {piloto.horasVoo}
                            </p>
                          </div>
                        </div>

                        <div style={styles.boxReputacao}>
                          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-main)' }}>
                            {piloto.resumo}
                          </p>
                        </div>
                      </div>

                      <div style={styles.rightBoxInfo}>
                        <p style={styles.infoRow}><strong>Localização:</strong> {piloto.cidade} / {piloto.estado}</p>
                        <p style={styles.infoRow}><strong>Deslocamento:</strong> {piloto.disponivelDeslocamento}</p>
                        <hr style={styles.dividerInfo} />
                        <p style={styles.infoRow}><strong>Equipamentos em uso:</strong></p>
                        <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '12px' }}>
                          {piloto.drones.map((d, idx) => <li key={idx}>{d}</li>)}
                        </ul>
                      </div>
                    </div>

                    <button onClick={() => setPilotoSelecionado(piloto)} style={styles.verPerfilBtn}>
                      Ver Dados de Contato e Contratar
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* MODAL 1: CONTACTO */}
      {pilotoSelecionado && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '480px' }}>
            <button onClick={() => setPilotoSelecionado(null)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>📞 Contatar {pilotoSelecionado.nome}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Entre em contato direto para orçamentos de voos e serviços.</p>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
              <p style={{ margin: '0 0 8px 0' }}><strong>E-mail:</strong> {pilotoSelecionado.email}</p>
              <p style={{ margin: 0 }}><strong>Telefone:</strong> {pilotoSelecionado.telefone}</p>
              <a href={`https://wa.me/55${pilotoSelecionado.telefone}`} target="_blank" rel="noreferrer" style={styles.whatsappBtn}>
                💬 Chamar no WhatsApp ({pilotoSelecionado.telefone})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LOGIN */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '400px' }}>
            <button onClick={() => setShowLoginModal(false)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>🔑 Login de Piloto</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Digite suas credenciais para atualizar seu perfil.</p>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
              <div>
                <label style={styles.filterLabel}>Usuário ou E-mail</label>
                <input 
                  type="text" required style={styles.select} placeholder="carlos.piloto"
                  value={loginUser} onChange={e => setLoginUser(e.target.value)}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>Senha</label>
                <input 
                  type="password" required style={styles.select} placeholder="••••••••"
                  value={loginPass} onChange={e => setLoginPass(e.target.value)}
                />
              </div>

              <button type="submit" style={styles.buscarBtn}>Entrar no Painel</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDICIÓN */}
      {showEditModal && pilotoLogado && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowEditModal(false)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>✏️ Editar Perfil de Piloto</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Mantenha suas certificações e equipamentos atualizados.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <div>
                <label style={styles.filterLabel}>Nome Completo</label>
                <input 
                  type="text" style={styles.select} 
                  value={formData.nome || ''} onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={styles.filterLabel}>Telefone / WhatsApp</label>
                  <input 
                    type="tel" style={styles.select} 
                    value={formData.telefone || ''} onChange={e => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
                <div>
                  <label style={styles.filterLabel}>E-Mail</label>
                  <input 
                    type="email" style={styles.select} 
                    value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div style={{
                marginTop: '15px',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.05)'
              }}>
                <h3 style={{ color: '#ef4444', marginTop: 0, fontSize: '15px' }}>
                  ⚠️ Gerenciamento de Conta e Visibilidade
                </h3>

                <div style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid #f59e0b',
                  borderRadius: '6px',
                  padding: '10px',
                  marginBottom: '15px',
                  fontSize: '12px',
                  color: 'var(--text-main)',
                  lineHeight: '1.4'
                }}>
                  📌 <strong>Nota Importante sobre a Pausa Temporária:</strong><br />
                  Se você pausar seu perfil por motivo de férias, indisponibilidade de equipamento ou manutenção, seu perfil deixará de aparecer nas buscas públicas. No entanto, <strong>os compromissos de manutenção do seu subdomínio e reserva na plataforma continuarão vigentes</strong> durante o período.
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button type="button" onClick={handlePausarPerfil} style={{ padding: '9px 13px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                    ⏸️ Pausar Perfil (Ocultar das Buscas)
                  </button>

                  <button type="button" onClick={handleExcluirConta} style={{ padding: '9px 13px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                    🗑️ Dar de Baixa / Excluir Minha Conta
                  </button>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => { alert('Alterações salvas com sucesso!'); setShowEditModal(false); }} 
                style={styles.buscarBtn}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: 'var(--text-main)' },
  topHeaderBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '20px', padding: '15px 20px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' },
  cadastrarBtnHeader: { backgroundColor: '#16a34a', color: '#ffffff', padding: '9px 14px', borderRadius: '6px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' },
  loginBtnHeader: { backgroundColor: 'transparent', color: '#0284c7', border: '1px solid #0284c7', padding: '9px 14px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' },

  filterBox: { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', marginBottom: '25px' },
  filterTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#38bdf8' },
  filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' },
  filterLabel: { display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: 'var(--text-muted)' },
  select: { width: '100%', padding: '9px', borderRadius: '5px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', boxSizing: 'border-box' },

  actionButtonsRow: { display: 'flex', gap: '10px', marginTop: '15px' },
  buscarBtn: { flex: 1, padding: '11px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' },
  limparBtn: { padding: '11px 20px', backgroundColor: 'var(--border-color)', color: 'var(--text-main)', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' },

  listContainer: { display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' },
  emptyState: { textAlign: 'center', padding: '20px', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)', borderRadius: '6px' },

  cardResumida: { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' },
  twoColumnGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' },
  leftMainBlock: { display: 'flex', flexDirection: 'column', gap: '10px' },
  headerPilotoRow: { display: 'flex', alignItems: 'center', gap: '14px' },
  foto3x4: { width: '70px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-color)' },
  pilotoNome: { margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' },
  badgeAzul: { backgroundColor: '#0284c7', color: '#ffffff', padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' },
  boxReputacao: { backgroundColor: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px' },

  rightBoxInfo: { border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', backgroundColor: 'var(--bg-main)' },
  infoRow: { margin: '0 0 4px 0', fontSize: '13px' },
  dividerInfo: { margin: '6px 0', border: 'none', borderTop: '1px dashed var(--border-color)' },

  verPerfilBtn: { width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-main)', width: '90%', borderRadius: '8px', padding: '25px', position: 'relative' },
  closeBtn: { position: 'absolute', top: '15px', right: '15px', backgroundColor: 'var(--border-color)', color: 'var(--text-main)', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' },
  whatsappBtn: { backgroundColor: '#16a34a', color: '#ffffff', padding: '10px 14px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', display: 'inline-block', marginTop: '12px', width: '100%', textAlign: 'center', boxSizing: 'border-box' }
};
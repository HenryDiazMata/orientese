import React, { useState } from 'react';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const FUNCOES_AUXILIAR = [
  'Observador Visual (SARPAS/DECEA)',
  'Apoio Logístico & Transporte',
  'Gestão de Baterias & Geradores',
  'Assistente de Pulverização / Calda',
  'Controle de Perímetro e Segurança'
];

// MOCK DATA DE AUXILIARES
const MOCK_AUXILIARES = [
  {
    id: 101,
    nome: 'Lucas Santos Ramos',
    usuario: 'lucas.auxiliar',
    fotoUrl: 'https://via.placeholder.com/150x200',
    tipoPerfil: 'Piloto Estagiário',
    horasVoo: '45h de voo',
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    disponivelDeslocamento: 'Sim',
    telefone: '16988887777',
    email: 'lucas.auxiliar@gmail.com',
    funcoes: ['Observador Visual (SARPAS/DECEA)', 'Gestão de Baterias & Geradores'],
    recomendacoes: [
      { pilotoNome: 'Carlos Eduardo Silva (Piloto Avançado)', comentario: 'Excelente postura em campo, muito ágil com as baterias.' }
    ]
  },
  {
    id: 102,
    nome: 'Mateus Oliveira',
    usuario: 'mateus.campo',
    fotoUrl: 'https://via.placeholder.com/150x200',
    tipoPerfil: 'Auxiliar Independente',
    horasVoo: 'Técnico de Campo',
    cidade: 'Campinas',
    estado: 'SP',
    disponivelDeslocamento: 'Sim',
    telefone: '19977776666',
    email: 'mateus.campo@gmail.com',
    funcoes: ['Assistente de Pulverização / Calda', 'Apoio Logístico & Transporte'],
    recomendacoes: []
  }
];

export default function AuxiliaresView() {
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFuncao, setFiltroFuncao] = useState('');
  const [buscaAtiva, setBuscaAtiva] = useState(false);
  const [auxiliarSelecionado, setAuxiliarSelecionado] = useState(null);
  const [modoCadastrar, setModoCadastrar] = useState(false);

  // Estados de Autenticación / Edición
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [auxiliarLogado, setAuxiliarLogado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Formulario para Nuevo Auxiliar
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: 'SP',
    telefone: '',
    email: '',
    deslocamento: 'Sim',
    funcoes: [],
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [erroSenha, setErroSenha] = useState('');

  const handleBuscar = (e) => {
    e.preventDefault();
    setBuscaAtiva(true);
  };

  const handleLimpar = () => {
    setFiltroEstado('');
    setFiltroFuncao('');
    setBuscaAtiva(false);
  };

  const handleFuncaoToggle = (funcao) => {
    setFormData(prev => {
      const exists = prev.funcoes.includes(funcao);
      return {
        ...prev,
        funcoes: exists ? prev.funcoes.filter(f => f !== funcao) : [...prev.funcoes, funcao]
      };
    });
  };

  // Validación y submit de Cadastro
  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    if (formData.senha.length < 8) {
      setErroSenha('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErroSenha('As senhas não coincidem!');
      return;
    }
    setErroSenha('');
    setCadastroSucesso(true);
  };

  // Login de Auxiliar
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const encontrado = MOCK_AUXILIARES.find(a => a.usuario === loginUser || a.email === loginUser);
    if (encontrado) {
      setAuxiliarLogado(encontrado);
      setFormData({
        ...encontrado,
        deslocamento: encontrado.disponivelDeslocamento || 'Sim'
      });
      setShowLoginModal(false);
      setShowEditModal(true);
    } else {
      alert('Usuário não encontrado. Tente lucas.auxiliar ou mateus.campo');
    }
  };

  // Dar de baixa / Excluir conta
  const handleExcluirConta = () => {
    if (window.confirm('Tem certeza absoluta que deseja DAR DE BAIXA / EXCLUIR sua conta? Esta ação removerá seu perfil e subdomínio permanentemente do sistema.')) {
      alert('Sua conta foi excluída com sucesso.');
      setAuxiliarLogado(null);
      setShowEditModal(false);
    }
  };

  // Pausar visibilidade
  const handlePausarPerfil = () => {
    alert('Seu perfil foi pausado e não aparecerá nos resultados de busca temporariamente.');
    setShowEditModal(false);
  };

  const auxiliaresFiltrados = MOCK_AUXILIARES.filter(aux => {
    const matchEstado = !filtroEstado || aux.estado === filtroEstado;
    const matchFuncao = !filtroFuncao || aux.funcoes.includes(filtroFuncao);
    return matchEstado && matchFuncao;
  });

  return (
    <div style={styles.container}>
      
      {/* 🔴 CABECERA PRINCIPAL SIEMPRE VISIBLE */}
      <div style={styles.topHeaderBar}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)' }}>
            🛠️ Central de Auxiliares de Campo
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
            Apoio operacional, observadores visuais e suporte em solo para voos profissionais.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {auxiliarLogado ? (
            <button 
              onClick={() => setShowEditModal(true)} 
              style={styles.loginBtnHeader}
            >
              👤 Painel de {auxiliarLogado.nome.split(' ')[0]}
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
            {modoCadastrar ? '⬅️ Voltar para Busca' : '✍️ Cadastrar como Auxiliar'}
          </button>
        </div>
      </div>

      {/* FORMULARIO DE REGISTRO DE AUXILIAR INDEPENDIENTE */}
      {modoCadastrar ? (
        <div style={styles.filterBox}>
          <h2 style={{ fontSize: '18px', marginTop: 0 }}>📝 Cadastro Rápido de Auxiliar de Campo</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Se você não é piloto, preencha este formulário simples para oferecer apoio em operações de Drones.
          </p>

          <form onSubmit={handleCadastroSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={styles.filterLabel}>Nome Completo *</label>
                <input 
                  type="text" required style={styles.select} placeholder="Seu nome"
                  value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>WhatsApp / Telefone *</label>
                <input 
                  type="tel" required style={styles.select} placeholder="(00) 90000-0000"
                  value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>E-Mail *</label>
                <input 
                  type="email" required style={styles.select} placeholder="exemplo@email.com"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>Cidade *</label>
                <input 
                  type="text" required style={styles.select} placeholder="Sua cidade"
                  value={formData.cidade} onChange={e => setFormData({...formData, cidade: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>Estado (UF) *</label>
                <select style={styles.select} value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                  {ESTADOS_BRASIL.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>

              <div>
                <label style={styles.filterLabel}>Disponibilidade para Deslocamento?</label>
                <select style={styles.select} value={formData.deslocamento} onChange={e => setFormData({...formData, deslocamento: e.target.value})}>
                  <option value="Sim">Sim, regional e viagens</option>
                  <option value="Somente Local">Somente na minha cidade</option>
                </select>
              </div>

              <div>
                <label style={styles.filterLabel}>Nome de Usuário (Login) *</label>
                <input 
                  type="text" required style={styles.select} placeholder="Ex: joao.auxiliar"
                  value={formData.usuario} onChange={e => setFormData({...formData, usuario: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>Senha *</label>
                <input 
                  type="password" required style={styles.select} placeholder="••••••••"
                  value={formData.senha} onChange={e => setFormData({...formData, senha: e.target.value})}
                />
              </div>

              <div>
                <label style={styles.filterLabel}>Confirmar Senha *</label>
                <input 
                  type="password" required style={styles.select} placeholder="••••••••"
                  value={formData.confirmarSenha} onChange={e => setFormData({...formData, confirmarSenha: e.target.value})}
                />
              </div>
            </div>

            {/* LEYENDA REQUISITOS CONTRASEÑA */}
            <div style={{
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              🔒 <strong>Requisitos da Senha:</strong>
              <ul style={{ margin: '5px 0 0 18px', padding: 0 }}>
                <li>Mínimo de <strong>8 caracteres</strong>.</li>
                <li>Pelo menos <strong>1 letra maiúscula</strong> e <strong>1 número</strong>.</li>
                <li>Símbolos permitidos: <code>@ # $ % & * - _ .</code></li>
              </ul>
            </div>

            {erroSenha && <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '13px' }}>⚠️ {erroSenha}</div>}

            <div>
              <label style={styles.filterLabel}>Funções que pode desempenhar em campo:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginTop: '6px' }}>
                {FUNCOES_AUXILIAR.map(f => (
                  <label key={f} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.funcoes.includes(f)}
                      onChange={() => handleFuncaoToggle(f)}
                    />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" style={styles.buscarBtn}>
              Finalizar Cadastro de Auxiliar
            </button>
          </form>

          {cadastroSucesso && (
            <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#166534', color: '#fff', borderRadius: '6px', textAlign: 'center' }}>
              🎉 Cadastro realizado com sucesso! Seu perfil já está visível para consulta dos pilotos.
            </div>
          )}
        </div>
      ) : (
        /* VISTA DE BÚSQUEDA DE AUXILIARES */
        <>
          <div style={styles.filterBox}>
            <h3 style={styles.filterTitle}>🔍 Buscar Auxiliares de Campo</h3>

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
                  <label style={styles.filterLabel}>Função Necessária</label>
                  <select value={filtroFuncao} onChange={(e) => setFiltroFuncao(e.target.value)} style={styles.select}>
                    <option value="">Todas as Funções</option>
                    {FUNCOES_AUXILIAR.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>

              <div style={styles.actionButtonsRow}>
                <button type="submit" style={styles.buscarBtn}>🔍 Pesquisar Auxiliares</button>
                {buscaAtiva && (
                  <button type="button" onClick={handleLimpar} style={styles.limparBtn}>Limpar Filtros</button>
                )}
              </div>
            </form>
          </div>

          {/* RESULTADOS DE BÚSQUEDA */}
          {buscaAtiva && (
            <div style={styles.listContainer}>
              <div style={{
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '15px',
                lineHeight: '1.4'
              }}>
                ⚖️ <strong>Aviso aos Pilotos:</strong> A contratação e acerto comercial de assistentes de campo é de responsabilidade direta entre as partes. Recomendamos alinhar as atribuições de segurança antes de iniciar as operações.
              </div>

              <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>
                Auxiliares Encontrados ({auxiliaresFiltrados.length})
              </h2>

              {auxiliaresFiltrados.length === 0 ? (
                <div style={styles.emptyState}>Nenhum auxiliar encontrado para os filtros selecionados.</div>
              ) : (
                auxiliaresFiltrados.map((aux) => (
                  <div key={aux.id} style={styles.cardResumida}>
                    <div style={styles.twoColumnGrid}>
                      <div style={styles.leftMainBlock}>
                        <div style={styles.headerPilotoRow}>
                          <img src={aux.fotoUrl} alt={aux.nome} style={styles.foto3x4} />
                          <div>
                            <h3 style={styles.pilotoNome}>{aux.nome}</h3>
                            <span style={aux.tipoPerfil === 'Piloto Estagiário' ? styles.badgeAzul : styles.badgeCinza}>
                              🎓 {aux.tipoPerfil} ({aux.horasVoo})
                            </span>
                          </div>
                        </div>

                        <div style={styles.boxReputacao}>
                          <strong>🎖️ Recomendação de Pilotos:</strong>
                          {aux.recomendacoes.length === 0 ? (
                            <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '12px' }}>Ainda não possui recomendações registradas.</p>
                          ) : (
                            aux.recomendacoes.map((rec, i) => (
                              <p key={i} style={{ margin: '4px 0 0 0', fontSize: '12px' }}>
                                "<em>{rec.comentario}</em>" — <strong>{rec.pilotoNome}</strong>
                              </p>
                            ))
                          )}
                        </div>
                      </div>

                      <div style={styles.rightBoxInfo}>
                        <p style={styles.infoRow}><strong>Localização:</strong> {aux.cidade} / {aux.estado}</p>
                        <p style={styles.infoRow}><strong>Deslocamento:</strong> {aux.disponivelDeslocamento}</p>
                        <hr style={styles.dividerInfo} />
                        <p style={styles.infoRow}><strong>Habilidades de Apoio:</strong></p>
                        <ul style={{ margin: '4px 0 0 18px', padding: 0, fontSize: '12px' }}>
                          {aux.funcoes.map((f, idx) => <li key={idx}>{f}</li>)}
                        </ul>
                      </div>
                    </div>

                    <button onClick={() => setAuxiliarSelecionado(aux)} style={styles.verPerfilBtn}>
                      Ver Dados de Contato
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* MODAL 1: CONTACTO */}
      {auxiliarSelecionado && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '480px' }}>
            <button onClick={() => setAuxiliarSelecionado(null)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>📞 Contatar {auxiliarSelecionado.nome}</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Entre em contato direto para alinhar diárias e operacional de campo.</p>

            <div style={{ backgroundColor: 'var(--bg-main)', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
              <p style={{ margin: '0 0 8px 0' }}><strong>E-mail:</strong> {auxiliarSelecionado.email}</p>
              <p style={{ margin: 0 }}><strong>Telefone:</strong> {auxiliarSelecionado.telefone}</p>
              <a href={`https://wa.me/55${auxiliarSelecionado.telefone}`} target="_blank" rel="noreferrer" style={styles.whatsappBtn}>
                💬 Chamar no WhatsApp ({auxiliarSelecionado.telefone})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LOGIN DIRECTO DE AUXILIAR */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '400px' }}>
            <button onClick={() => setShowLoginModal(false)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>🔑 Login de Auxiliar</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Digite suas credenciais para atualizar seu perfil.</p>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
              <div>
                <label style={styles.filterLabel}>Usuário ou E-mail</label>
                <input 
                  type="text" required style={styles.select} placeholder="lucas.auxiliar"
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

      {/* MODAL 3: EDICIÓN DE PERFIL Y GERENCIAMIENTO */}
      {showEditModal && auxiliarLogado && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modalContent, maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowEditModal(false)} style={styles.closeBtn}>✕ Fechar</button>
            <h2 style={{ margin: '0 0 10px 0' }}>✏️ Editar Perfil de Auxiliar</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Mantenha seus dados e disponibilidade atualizados.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <div>
                <label style={styles.filterLabel}>Nome Completo</label>
                <input 
                  type="text" style={styles.select} 
                  value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={styles.filterLabel}>Telefone / WhatsApp</label>
                  <input 
                    type="tel" style={styles.select} 
                    value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
                <div>
                  <label style={styles.filterLabel}>E-Mail</label>
                  <input 
                    type="email" style={styles.select} 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* ZONA DE GERENCIAMIENTO */}
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
                  Se você pausar seu perfil por motivo de férias, doença, viagens ou indisponibilidade temporária, seu nome deixará de aparecer nas buscas públicas. No entanto, <strong>os compromissos de pagamento referentes à manutenção do seu subdomínio e reserva de espaço na plataforma continuarão vigentes normalmente</strong> durante este período.
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
  badgeCinza: { backgroundColor: 'var(--border-color)', color: 'var(--text-main)', padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block' },
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
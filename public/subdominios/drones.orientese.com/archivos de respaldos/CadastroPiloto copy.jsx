import React, { useState } from 'react';
import './CadastroPiloto.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Validação de caracteres proibidos: espaços, aspas simples, aspas duplas e barra invertida
const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function CadastroPiloto({ pilotoParaEditar = null, onSalvar }) {
  const isEditing = Boolean(pilotoParaEditar);

  const [formData, setFormData] = useState(pilotoParaEditar || {
    nomeCompleto: '',
    dataNascimento: '',
    fotoPerfil: null,
    servicos: [],
    portesDrone: [],
    licencias: '',
    nivelExperiencias: 'estagiario',
    oferecerComoAuxiliar: true,
    regioesAtendimento: [],
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: 'SP'
    },
    email: '',
    telefone1: '',
    telefone2: '',
    horarioAtendimento: '',
    formasPagamento: [],
    emiteNotaFiscal: 'Sim',
    observacoesParticulares: '',
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const [fotoPreview, setFotoPreview] = useState(pilotoParaEditar?.fotoUrl || null);
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroSenha, setErroSenha] = useState('');

  // Estados para alternar visibilidade das senhas
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value }
    }));
  };

  const handleArrayToggle = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      const exists = currentList.includes(value);
      return {
        ...prev,
        [category]: exists
          ? currentList.filter((item) => item !== value)
          : [...currentList, value]
      };
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, fotoPerfil: file }));
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const generarCodigoCadastro = (dataNasc) => {
    const tipo = 'P';
    let nascFormateada = '00000000';
    if (dataNasc) {
      const parts = dataNasc.split('-');
      if (parts.length === 3) {
        nascFormateada = `${parts[2]}${parts[1]}${parts[0]}`;
      }
    }
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const cadastroFormateado = `${dia}${mes}${ano}`;
    const contador = 1;

    return `${tipo}-${nascFormateada}-${cadastroFormateado}-${contador}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      // 1. Validação de tamanho mínimo
      if (formData.senha.length < 8) {
        setErroSenha('A senha deve ter no mínimo 8 caracteres.');
        return;
      }

      // 2. Validação de caracteres proibidos
      if (REGEX_CARACTERES_INVALIDOS.test(formData.senha)) {
        setErroSenha('A senha não pode conter espaços, aspas (\' ou ") ou barra invertida (\\).');
        return;
      }

      // 3. Validação de igualdade entre as senhas
      if (formData.senha !== formData.confirmarSenha) {
        setErroSenha('As senhas não coincidem. Por favor, verifique.');
        return;
      }
    }

    setErroSenha('');

    const codigoGenerado = formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento);
    const dataHoraCadastro = formData.dataCadastro || new Date().toLocaleString('pt-BR');

    const registroCompleto = {
      ...formData,
      codigoRegistro: codigoGenerado,
      dataCadastro: dataHoraCadastro,
      disponibilidade: formData.disponibilidade || 'Ativo'
    };

    setCadastroResultado(registroCompleto);

    if (onSalvar) {
      onSalvar(registroCompleto);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <h2>{isEditing ? '✏️ Editar Perfil de Piloto' : '📝 Cadastro de Piloto Profissional'}</h2>
        <p>{isEditing ? 'Atualize suas informações cadastrais' : 'Preencha seus dados para criar sua conta no sistema'}</p>
      </div>

      {/* DECLARAÇÃO DE VERACIDADE */}
      <div style={{
        backgroundColor: 'var(--bg-main)',
        borderLeft: '4px solid #0284c7',
        border: '1px solid var(--border-color)',
        padding: '12px 16px',
        borderRadius: '6px',
        marginBottom: '20px',
        fontSize: '13px',
        lineHeight: '1.5'
      }}>
        <strong>🛡️ Declaração de Veracidade das Informações:</strong>
        <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
          Ao preencher este formulário, você declara que todas as informações prestadas 
          (incluindo licenças, habilitações ANAC/DECEA e dados de contato) são verdadeiras, 
          exatas e de sua inteira responsabilidade. O fornecimento de dados falsos ou enganosos 
          poderá acarretar a suspensão do perfil no sistema, sem direito à devolução de qualquer valor pago.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* 1. DADOS PESSOAIS */}
        <div className="form-section">
          <h3>👤 1. Dados Pessoais</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                required
                placeholder="Ex: João da Silva Santos"
              />
            </div>

            <div className="form-group">
              <label>Data de Nascimento *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Foto de Perfil (3x4 ou Selfie)</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && (
                <img src={fotoPreview} alt="Preview" className="preview-photo" />
              )}
            </div>
          </div>
        </div>

        {/* 2. CONTATO E ENDEREÇO */}
        <div className="form-section">
          <h3>📍 2. Contato e Endereço Residencial</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>E-Mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="form-group">
              <label>Telefone 1 (WhatsApp) *</label>
              <input
                type="tel"
                name="telefone1"
                value={formData.telefone1}
                onChange={handleChange}
                required
                placeholder="(00) 90000-0000"
              />
            </div>

            <div className="form-group">
              <label>Telefone 2 (Opcional)</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
                placeholder="(00) 0000-0000"
              />
            </div>

            <div className="form-group">
              <label>CEP *</label>
              <input
                type="text"
                name="cep"
                value={formData.endereco.cep}
                onChange={handleEnderecoChange}
                required
                placeholder="00000-000"
              />
            </div>

            <div className="form-group full-width">
              <label>Logradouro / Endereço Completo *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
                placeholder="Rua, Avenida, Número, Casa / Apto"
              />
            </div>

            <div className="form-group">
              <label>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.endereco.cidade}
                onChange={handleEnderecoChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Estado (UF) *</label>
              <select
                name="estado"
                value={formData.endereco.estado}
                onChange={handleEnderecoChange}
              >
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. SERVIÇOS E EQUIPAMENTOS */}
        <div className="form-section">
          <h3>🛸 3. Serviços e Categoria de Drones</h3>
          
          <div className="form-group full-width">
            <label>Serviços que oferece:</label>
            <div className="checkbox-group">
              {[
                'Mapeamento aéreo / Fotogrametria',
                'Inspeção visual predial / industrial',
                'Filmagem e fotografia profissional',
                'Pulverização agrícola'
              ].map((servico) => (
                <label key={servico} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.servicos.includes(servico)}
                    onChange={() => handleArrayToggle('servicos', servico)}
                  />
                  {servico}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width" style={{ marginTop: '15px' }}>
            <label>Categoria / Porte de drone (usa ou sabe pilotar):</label>
            <div className="checkbox-group">
              {[
                'Porte pesado (> 25 Kg) Agrícola',
                'Porte subpesado (2 - 25 Kg) Mapeamento',
                'Porte médio (250 g - 25 Kg) Inspeção',
                'Porte leve (< 250 g) Recreativo'
              ].map((porte) => (
                <label key={porte} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.portesDrone.includes(porte)}
                    onChange={() => handleArrayToggle('portesDrone', porte)}
                  />
                  {porte}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group full-width" style={{ marginTop: '15px' }}>
            <label>Licenças e Registros que possui:</label>
            <textarea
              name="licencias"
              rows="2"
              value={formData.licencias}
              onChange={handleChange}
              placeholder="Indique registro ANAC (SISANT), SARPAS/DECEA, CAAR (agrícola), aprovação teórica RBAC nº 100, etc."
            />
          </div>
        </div>

        {/* 4. EXPERIÊNCIA E COBERTURA DE ATENDIMENTO */}
        <div className="form-section">
          <h3>🎓 4. Experiência e Cobertura de Atendimento</h3>

          <div className="form-group full-width">
            <label>Nível de Experiência:</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  name="nivelExperiencias"
                  value="estagiario"
                  checked={formData.nivelExperiencias === 'estagiario'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Estagiário / Principiante (&lt; 100 horas de voo):</strong>
                  <div className="help-text">Fase de aprendizado e controle básico. Obrigatório registro SISANT e voos no SARPAS.</div>
                </div>
              </label>

              <label className="radio-item">
                <input
                  type="radio"
                  name="nivelExperiencias"
                  value="intermediario"
                  checked={formData.nivelExperiencias === 'intermediario'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Intermediário (&gt; 100 horas / &gt; 6 meses - 1 ano):</strong>
                  <div className="help-text">Domínio em condições variadas, edição de rotas e autonomia em campo.</div>
                </div>
              </label>

              <label className="radio-item">
                <input
                  type="radio"
                  name="nivelExperiencias"
                  value="avancado"
                  checked={formData.nivelExperiencias === 'avancado'}
                  onChange={handleChange}
                />
                <div>
                  <strong>Avançado (&gt; 2 anos / Múltiplas plataformas / &gt; 300h):</strong>
                  <div className="help-text">Perícia em equipamentos pesados, setores críticos ou curso CAAR agrícola.</div>
                </div>
              </label>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-main)',
            border: '1px solid var(--border-color)',
            padding: '12px 15px',
            borderRadius: '6px',
            marginTop: '15px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
              <input
                type="checkbox"
                name="oferecerComoAuxiliar"
                checked={formData.oferecerComoAuxiliar}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', accentColor: '#16a34a' }}
              />
              🤝 Desejo aparecer também na lista de Auxiliares de Campo
            </label>
            <p style={{ margin: '6px 0 0 28px', fontSize: '12px', color: 'var(--text-muted)' }}>
              Recomendado para estagiários e pilotos que desejam prestar apoio técnico em campo a outros pilotos (observador visual, apoio em baterias, logística, etc.).
            </p>
          </div>

          <div className="form-group full-width" style={{ marginTop: '15px' }}>
            <label>Região de Atendimento (Estados onde pode viajar e prestar serviço):</label>
            <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))' }}>
              {ESTADOS_BRASIL.map((uf) => (
                <label key={uf} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.regioesAtendimento.includes(uf)}
                    onChange={() => handleArrayToggle('regioesAtendimento', uf)}
                  />
                  {uf}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 5. CONDIÇÕES COMERCIAIS E OPERACIONAIS */}
        <div className="form-section">
          <h3>💼 5. Condições Comerciais e Operacionais</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Horário de Atendimento para Chamadas</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder="Ex: Seg a Sex das 08h às 18h"
              />
            </div>

            <div className="form-group">
              <label>Emissão de Nota Fiscal?</label>
              <select
                name="emiteNotaFiscal"
                value={formData.emiteNotaFiscal}
                onChange={handleChange}
              >
                <option value="Sim">Sim, emissão própria (MEI/CNPJ)</option>
                <option value="Não">Não</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Formas de Pagamento Aceitas:</label>
              <div className="checkbox-group" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '15px' }}>
                {['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto Bancário'].map((forma) => (
                  <label key={forma} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.formasPagamento.includes(forma)}
                      onChange={() => handleArrayToggle('formasPagamento', forma)}
                    />
                    {forma}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Exigências ou Observações Particulares:</label>
              <textarea
                name="observacoesParticulares"
                rows="3"
                value={formData.observacoesParticulares}
                onChange={handleChange}
                placeholder="Exigências para locais distantes, custos extras de deslocamento, diárias, etc."
              />
            </div>
          </div>
        </div>

        {/* 6. CREDENCIAIS DE ACESSO */}
        {!isEditing && (
          <div className="form-section">
            <h3>🔑 6. Credenciais de Acesso (Login)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Nome de Usuário *</label>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Ex: joao.piloto"
                />
              </div>

              {/* CAMPO SENHA */}
              <div className="form-group">
                <label>Senha *</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    placeholder="Mínimo 8 caracteres"
                    style={{ paddingRight: '40px', width: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      padding: 0
                    }}
                    title={mostrarSenha ? "Ocultar senha" : "Ver senha"}
                  >
                    {mostrarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
                <small style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                  🔒 Mínimo 8 caracteres. <strong>NÃO</strong> são permitidos espaços, aspas (' ") ou barra invertida (\).
                </small>
              </div>

              {/* CAMPO CONFIRMAR SENHA */}
              <div className="form-group">
                <label>Confirmar Senha *</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input
                    type={mostrarConfirmarSenha ? 'text' : 'password'}
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                    placeholder="Repita a mesma senha"
                    style={{ paddingRight: '40px', width: '100%' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      padding: 0
                    }}
                    title={mostrarConfirmarSenha ? "Ocultar senha" : "Ver senha"}
                  >
                    {mostrarConfirmarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {erroSenha && (
                <div className="form-group full-width" style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  ⚠️ {erroSenha}
                </div>
              )}
            </div>
          </div>
        )}

        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar Alterações do Perfil' : 'Finalizar e Criar Conta'}
        </button>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>🎉 {isEditing ? 'Perfil Atualizado com Sucesso!' : 'Cadastro Realizado com Sucesso!'}</h3>
          <p>Seu código de identificação no sistema é:</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
          <p style={{ marginTop: '10px', fontSize: '0.85rem' }}>
            Data de Registro: {cadastroResultado.dataCadastro}
          </p>
        </div>
      )}
    </div>
  );
}
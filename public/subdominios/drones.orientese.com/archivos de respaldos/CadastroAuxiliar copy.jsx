// ==========================================
// CadastroAuxiliar.jsx
// Formulário de Cadastro de Auxiliar de Campo
// Estilo + integração idênticos ao CadastroPiloto
// ==========================================

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

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
  'Auxiliar de Solo / Segurança',
  'Operador de Rádio / Comunicação'
];

const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function CadastroAuxiliar({ auxiliarParaEditar = null, onSalvar }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(auxiliarParaEditar);

  const { registerUser, updateUser } = useAuth();

  const [formData, setFormData] = useState(auxiliarParaEditar || {
    nomeCompleto: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: 'SP',
    disponibilidadeDeslocamento: 'Sim, regional e viagens',
    funcoes: [],
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [cadastroResultado, setCadastroResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFuncaoToggle = (funcao) => {
    setFormData((prev) => {
      const exists = prev.funcoes.includes(funcao);
      return {
        ...prev,
        funcoes: exists
          ? prev.funcoes.filter((f) => f !== funcao)
          : [...prev.funcoes, funcao]
      };
    });
  };

  const generarCodigoCadastro = () => {
    const tipo = 'A';
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${tipo}-00000000-${dia}${mes}${ano}-1`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      if (formData.senha.length < 8) {
        setErroSenha('A senha deve ter no mínimo 8 caracteres.');
        return;
      }
      if (REGEX_CARACTERES_INVALIDOS.test(formData.senha)) {
        setErroSenha('A senha não pode conter espaços, aspas (\' ou ") ou barra invertida (\\).');
        return;
      }
      if (formData.senha !== formData.confirmarSenha) {
        setErroSenha('As senhas não coincidem.');
        return;
      }
    }

    setErroSenha('');

    const codigoGenerado = formData.codigoRegistro || generarCodigoCadastro();
    const dataHoraCadastro = formData.dataCadastro || new Date().toLocaleString('pt-BR');

    const registroCompleto = {
      ...formData,
      codigoRegistro: codigoGenerado,
      dataCadastro: dataHoraCadastro,
      disponibilidade: 'Ativo',
      tipo: 'auxiliar'
    };

    // Integração com Auth
    if (!isEditing) {
      const result = registerUser(registroCompleto);
      if (!result.success) {
        setErroSenha(result.message);
        return;
      }
    } else {
      const result = updateUser(registroCompleto);
      if (!result.success) {
        setErroSenha(result.message || 'Erro ao atualizar perfil.');
        return;
      }
    }

    setCadastroResultado(registroCompleto);
    if (onSalvar) onSalvar(registroCompleto);
  };

  // Cores idênticas ao CadastroPiloto
  const bgCard = isDark ? '#1e293b' : '#ffffff';
  const borderColor = isDark ? '#334155' : '#e2e8f0';
  const textMain = isDark ? '#f8fafc' : '#0f172a';
  const textMuted = isDark ? '#94a3b8' : '#64748b';
  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    fontSize: '14px'
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: bgCard,
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '30px',
      color: textMain
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', color: textMain }}>
          {isEditing ? '✏️ Editar Perfil de Auxiliar' : '📝 Cadastro de Auxiliar de Campo'}
        </h2>
        <p style={{ margin: '8px 0 0 0', color: textMuted, fontSize: '14px' }}>
          {isEditing
            ? 'Atualize suas informações cadastrais'
            : 'Preencha o formulário para oferecer apoio em operações de drones'}
        </p>
      </div>

      {/* Declaração de Veracidade */}
      <div style={{
        backgroundColor: isDark ? '#0f172a' : '#f0f9ff',
        borderLeft: '4px solid #0284c7',
        border: `1px solid ${borderColor}`,
        padding: '14px 16px',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '13px',
        lineHeight: '1.5'
      }}>
        <strong style={{ color: '#0284c7', display: 'block', marginBottom: '4px' }}>
          🛡️ Declaração de Veracidade das Informações:
        </strong>
        <p style={{ margin: 0, color: textMuted }}>
          Ao preencher este formulário, você declara que todas as informações prestadas
          são verdadeiras, exatas e de sua inteira responsabilidade. O fornecimento de dados
          falsos poderá acarretar a suspensão do perfil no sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* 1. DADOS PESSOAIS E CONTATO */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: textMain }}>
            👤 1. Dados Pessoais e Contato
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Nome Completo *
              </label>
              <input
                type="text"
                name="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={handleChange}
                required
                placeholder="Ex: João da Silva Santos"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                WhatsApp / Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 90000-0000"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                E-Mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="exemplo@email.com"
                style={inputStyle}
                disabled={isEditing}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Cidade *
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
                placeholder="Sua cidade"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Estado (UF) *
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                style={inputStyle}
              >
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. DISPONIBILIDADE E FUNÇÕES */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '16px', color: textMain }}>
            🛠️ 2. Disponibilidade e Funções em Campo
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Disponibilidade para Deslocamento?
            </label>
            <select
              name="disponibilidadeDeslocamento"
              value={formData.disponibilidadeDeslocamento}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="Sim, regional e viagens">Sim, regional e viagens</option>
              <option value="Apenas local / mesma cidade">Apenas local / mesma cidade</option>
              <option value="Apenas no meu estado">Apenas no meu estado</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}>
              Funções que pode desempenhar:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {FUNCOES_AUXILIAR.map((funcao) => (
                <label
                  key={funcao}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.funcoes.includes(funcao)}
                    onChange={() => handleFuncaoToggle(funcao)}
                  />
                  {funcao}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 3. CREDENCIAIS DE ACESSO */}
        {!isEditing && (
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: textMain }}>
              🔑 3. Credenciais de Acesso (Login)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Nome de Usuário *
                </label>
                <input
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  required
                  placeholder="Ex: joao.auxiliar"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Senha *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, paddingRight: '42px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: isDark ? '#94a3b8' : '#64748b'
                    }}
                    title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Confirmar Senha *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={mostrarConfirmarSenha ? 'text' : 'password'}
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, paddingRight: '42px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: isDark ? '#94a3b8' : '#64748b'
                    }}
                    title={mostrarConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarConfirmarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', fontSize: '12px', color: textMuted, marginTop: '-8px' }}>
                🔒 A senha deve ter <strong>no mínimo 8 caracteres</strong>.
                <strong> Não são permitidos</strong>: espaços, aspas simples ('), aspas duplas (") ou barra invertida (\).
              </div>

              {erroSenha && (
                <div style={{ gridColumn: '1 / -1', color: '#dc2626', fontWeight: '600', fontSize: '13px' }}>
                  ⚠️ {erroSenha}
                </div>
              )}
            </div>
          </div>
        )}

        {erroSenha && isEditing && (
          <div style={{ color: '#dc2626', fontWeight: '600', fontSize: '13px', marginBottom: '12px' }}>
            ⚠️ {erroSenha}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#0077C8',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer'
          }}
        >
          {isEditing ? 'Salvar Alterações do Perfil' : 'Finalizar e Criar Conta de Auxiliar'}
        </button>
      </form>

      {cadastroResultado && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          backgroundColor: isDark ? '#064e3b' : '#f0fdf4',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: textMain }}>
            🎉 {isEditing ? 'Perfil atualizado com sucesso!' : 'Cadastro de Auxiliar realizado com sucesso!'}
          </h3>
          <p style={{ margin: 0, color: textMuted }}>Seu código de identificação:</p>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0077C8', marginTop: '8px' }}>
            {cadastroResultado.codigoRegistro}
          </div>
          {!isEditing && (
            <p style={{ margin: '12px 0 0 0', color: textMuted, fontSize: '13px' }}>
              Agora você já pode fazer login com seu <strong>e-mail</strong> e senha no botão <strong>ENTRAR</strong>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
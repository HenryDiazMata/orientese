// ==========================================
// CADASTROPILOTO.JSX
// FORMULARIO DE PILOTO PROFESIONAL
// ESTILO UNIFICADO: CADASTROFORM.CSS
// ==========================================

import React, { useState } from 'react';
import { useTheme } from "../../../context/drones/ThemeContext";
import { useAuth } from "../../../context/drones/AuthContext";
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SERVICOS_DISPONIVEIS = [
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

const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function CadastroPiloto({ pilotoParaEditar = null, onSalvar }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(pilotoParaEditar);
  const { registerUser, updateUser } = useAuth();

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
    return `${tipo}-${nascFormateada}-${dia}${mes}${ano}-1`;
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

    const codigoGenerado = formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento);
    const dataHoraCadastro = formData.dataCadastro || new Date().toLocaleString('pt-BR');

    const registroCompleto = {
      ...formData,
      codigoRegistro: codigoGenerado,
      dataCadastro: dataHoraCadastro,
      disponibilidade: 'Ativo',
      tipo: 'piloto',
      fotoUrl: fotoPreview || formData.fotoUrl || null
    };

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

  return (
    <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
      {/* CABECERA DEL FORMULARIO */}
      <div className="cadastro-header">
        <h2>{isEditing ? 'Editar perfil de piloto' : 'Cadastro de piloto profissional'}</h2>
        <p>
          {isEditing
            ? 'Atualize suas informações cadastrais'
            : 'Preencha seus dados para criar sua conta no sistema'}
        </p>
      </div>

      {/* AVISO LEGAL DE VERACIDAD */}
      <div className="aviso-box">
        <strong>Declaração de veracidade das informações</strong>
        <p>
          Ao preencher este formulário, você declara que todas as informações prestadas
          (incluindo licenças, habilitações ANAC/DECEA e dados de contato) são verdadeiras,
          exatas e de sua inteira responsabilidade. O fornecimento de dados falsos ou enganosos
          poderá acarretar a suspensão do perfil no sistema, sem direito à devolução de qualquer valor pago.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* BLOQUE 1: DATOS PERSONALES */}
        <section className="form-section">
          <h3>1. Dados pessoais</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Nome completo *</label>
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
              <label>Data de nascimento *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Foto de perfil (3x4 ou selfie)</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && (
                <img src={fotoPreview} alt="Preview" className="preview-photo" />
              )}
            </div>
          </div>
        </section>

        {/* BLOQUE 2: CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>2. Contato e endereço residencial</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isEditing}
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
              <label>Telefone 2 (opcional)</label>
              <input type="tel" name="telefone2" value={formData.telefone2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CEP *</label>
              <input type="text" name="cep" value={formData.endereco.cep} onChange={handleEnderecoChange} required />
            </div>
            <div className="form-group full-width">
              <label>Logradouro / endereço completo *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Cidade *</label>
              <input type="text" name="cidade" value={formData.endereco.cidade} onChange={handleEnderecoChange} required />
            </div>
            <div className="form-group">
              <label>Estado (UF) *</label>
              <select name="estado" value={formData.endereco.estado} onChange={handleEnderecoChange}>
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* BLOQUE 3: SERVICIOS Y DRONES */}
        <section className="form-section">
          <h3>3. Serviços e categoria de drones</h3>
          <div className="form-group full-width">
            <label>Serviços que oferece</label>
            <div className="checkbox-group">
              {SERVICOS_DISPONIVEIS.map((servico) => (
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

          <div className="form-group full-width">
            <label>Categoria / porte de drone</label>
            <div className="checkbox-group">
              {[
                'Porte pesado (> 25 Kg) Agrícola',
                'Porte subpesado (2 - 25 Kg) Mapeamento',
                'Porte médio (250 g - 2 Kg) Inspeção',
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

          <div className="form-group full-width">
            <label>Licenças e registros que possui</label>
            <textarea
              name="licencias"
              rows="2"
              value={formData.licencias}
              onChange={handleChange}
              placeholder="ANAC (SISANT), SARPAS/DECEA, CAAR, etc."
            />
          </div>
        </section>

        {/* BLOQUE 4: EXPERIENCIA Y COBERTURA */}
        <section className="form-section">
          <h3>4. Experiência e cobertura de atendimento</h3>
          <div className="form-group full-width">
            <label>Nível de experiência</label>
            <div className="radio-group">
              {[
                { value: 'estagiario', label: 'Estagiário / principiante (< 100 horas de voo)' },
                { value: 'intermediario', label: 'Intermediário (> 100 horas / 6 meses - 1 ano)' },
                { value: 'avancado', label: 'Avançado (> 2 anos / > 300h)' }
              ].map((nivel) => (
                <label key={nivel.value} className="radio-item">
                  <input
                    type="radio"
                    name="nivelExperiencias"
                    value={nivel.value}
                    checked={formData.nivelExperiencias === nivel.value}
                    onChange={handleChange}
                  />
                  {nivel.label}
                </label>
              ))}
            </div>
          </div>

          <label className="checkbox-item">
            <input
              type="checkbox"
              name="oferecerComoAuxiliar"
              checked={formData.oferecerComoAuxiliar}
              onChange={handleChange}
            />
            Desejo aparecer também na lista de auxiliares de campo
          </label>

          <div className="form-group full-width">
            <label>Região de atendimento (estados)</label>
            <div className="checkbox-group">
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
        </section>

        {/* BLOQUE 5: CONDICIONES COMERCIALES */}
        <section className="form-section">
          <h3>5. Condições comerciais e operacionais</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Horário de atendimento</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder="Ex: Seg a Sex das 08h às 18h"
              />
            </div>
            <div className="form-group">
              <label>Emissão de nota fiscal?</label>
              <select name="emiteNotaFiscal" value={formData.emiteNotaFiscal} onChange={handleChange}>
                <option value="Sim">Sim, emissão própria (MEI/CNPJ)</option>
                <option value="Não">Não</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Formas de pagamento aceitas</label>
              <div className="checkbox-group">
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
              <label>Exigências ou observações particulares</label>
              <textarea
                name="observacoesParticulares"
                rows="3"
                value={formData.observacoesParticulares}
                onChange={handleChange}
                placeholder="Exigências para locais distantes, custos extras, diárias, etc."
              />
            </div>
          </div>
        </section>

        {/* BLOQUE 6: LOGIN Y CLAVE (SOLO ALTA NUEVA) */}
        {!isEditing && (
          <section className="form-section">
            <h3>6. Credenciais de acesso (login)</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Nome de usuário *</label>
                <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Senha *</label>
                <div className="password-wrap">
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirmar senha *</label>
                <div className="password-wrap">
                  <input
                    type={mostrarConfirmarSenha ? 'text' : 'password'}
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                  >
                    {mostrarConfirmarSenha ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>
              <p className="help-text full-width">
                A senha deve ter no mínimo 8 caracteres. Não use espaços, aspas simples, aspas duplas ou barra invertida.
              </p>
            </div>
          </section>
        )}

        {erroSenha && <p className="erro">{erroSenha}</p>}

        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar alterações do perfil' : 'Finalizar e criar conta'}
        </button>
      </form>

      {/* TARJETA DE EXITO */}
      {cadastroResultado && (
        <div className="success-card">
          <h3>Cadastro realizado com sucesso</h3>
          <p>Seu código de identificação:</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
          {!isEditing && (
            <p className="help-text">
              Agora você já pode fazer login com seu e-mail e senha no botão ENTRAR.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
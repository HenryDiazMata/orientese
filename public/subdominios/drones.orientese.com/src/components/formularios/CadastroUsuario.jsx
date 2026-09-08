// ==========================================
// CADASTROUSUARIO.JSX
// FORMULARIO DE USUARIO / CONTRATANTE
// PF (FAZENDEIRO) + PJ (EMPRESA)
// EDICION DE PERFIL + PAUSA + RETIRO
// ESTILO UNIFICADO: CADASTROFORM.CSS
// ==========================================

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const TIPOS_USUARIO = [
  'Fazendeiro / Produtor Rural',
  'Construtora / Incorporadora',
  'Empresa de Engenharia / Topografia',
  'Empresa Tecnológica / Startup',
  'Empresa Elétrica / Energia',
  'Ganadeiro / Pecuarista',
  'Outro'
];

const SERVICOS_SOLICITADOS = [
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
  'Levantamento Topográfico / Ortomosaico',
  'Outros serviços com drones'
];

const REGEX_CARACTERES_INVALIDOS = /[ "'\\]/;

export default function CadastroUsuario({ usuarioParaEditar = null, onSalvar }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(usuarioParaEditar);
  const { registerUser, updateUser } = useAuth();

  const [formData, setFormData] = useState(usuarioParaEditar || {
    tipoPessoa: 'PF',
    nomeCompleto: '',
    razaoSocial: '',
    nomeFantasia: '',
    cpf: '',
    cnpj: '',
    dataNascimento: '',
    fotoPerfil: null,
    tipoUsuario: '',
    servicosSolicitados: [],
    areaPropriedadeHa: '',
    estadosInteresse: [],
    frequenciaUso: 'ocasional',
    receberOrcamentosAutomaticos: true,
    aceitaContatoComercial: true,
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
    observacoes: '',
    status: 'Ativo',
    motivoPausa: '',
    dataInicioPausa: '',
    dataFimPausa: '',
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const [fotoPreview, setFotoPreview] = useState(usuarioParaEditar?.fotoUrl || null);
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroSenha, setErroSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [mostrarConfirmacaoRetiro, setMostrarConfirmacaoRetiro] = useState(false);

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
      if (file.size > 2 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 2 MB.');
        return;
      }
      setFormData((prev) => ({ ...prev, fotoPerfil: file }));
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const generarCodigoCadastro = (tipoPessoa, dataNasc) => {
    const tipo = tipoPessoa === 'PF' ? 'F' : 'E';
    let nascFormateada = '00000000';
    if (dataNasc && tipoPessoa === 'PF') {
      const parts = dataNasc.split('-');
      if (parts.length === 3) {
        nascFormateada = `${parts[2]}${parts[1]}${parts[0]}`;
      }
    } else {
      const hoje = new Date();
      nascFormateada = `${String(hoje.getDate()).padStart(2, '0')}${String(hoje.getMonth() + 1).padStart(2, '0')}${hoje.getFullYear()}`;
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

    if (formData.tipoPessoa === 'PF' && !formData.cpf) {
      setErroSenha('CPF é obrigatório para Pessoa Física.');
      return;
    }
    if (formData.tipoPessoa === 'PJ' && !formData.cnpj) {
      setErroSenha('CNPJ é obrigatório para Pessoa Jurídica.');
      return;
    }

    setErroSenha('');

    const codigoGenerado = formData.codigoRegistro || generarCodigoCadastro(formData.tipoPessoa, formData.dataNascimento);
    const dataHoraCadastro = formData.dataCadastro || new Date().toLocaleString('pt-BR');

    const registroCompleto = {
      ...formData,
      codigoRegistro: codigoGenerado,
      dataCadastro: dataHoraCadastro,
      disponibilidade: formData.status || 'Ativo',
      tipo: 'usuario',
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

  const handleRetiro = () => {
    const registroCancelado = {
      ...formData,
      status: 'Cancelado',
      dataCancelamento: new Date().toLocaleString('pt-BR')
    };
    updateUser(registroCancelado);
    setCadastroResultado(registroCancelado);
    setMostrarConfirmacaoRetiro(false);
  };

  return (
    <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
      {/* CABECERA */}
      <div className="cadastro-header">
        <h2>
          {isEditing
            ? 'Editar perfil de usuário / contratante'
            : 'Cadastro de usuário / contratante'}
        </h2>
        <p>
          {isEditing
            ? 'Atualize suas informações, gerencie pausas ou cancele sua conta'
            : 'Cadastre-se para ter cálculos ilimitados e benefícios exclusivos'}
        </p>
      </div>

      {/* AVISO LEGAL */}
      <div className="aviso-box">
        <strong>Declaração de veracidade das informações</strong>
        <p>
          Ao preencher este formulário, você declara que todas as informações prestadas
          são verdadeiras, exatas e de sua inteira responsabilidade. O fornecimento de dados
          falsos poderá acarretar a suspensão do perfil no sistema.
        </p>
      </div>

      {/* BENEFICIOS SOLO EN ALTA NUEVA */}
      {!isEditing && (
        <div className="form-section">
          <h3>Benefícios exclusivos para membros cadastrados</h3>
          <ul className="criterios-lista">
            <li>Cálculos de orçamentos ilimitados</li>
            <li>Histórico completo de orçamentos salvos (envio sob demanda)</li>
            <li>Exportação de PDF personalizado sob demanda</li>
            <li>Acesso prioritário a pilotos verificados</li>
            <li>Notificações de novos profissionais na sua região</li>
            <li>Possibilidade de solicitar propostas diretamente</li>
            <li>Publicar vagas na seção correspondente do portal</li>
            <li>Publicar avisos de venda de drones, partes e peças usadas na seção Drones</li>
          </ul>
          <p className="help-text">
            O portal drones.orientese.com oferece apenas um serviço informativo.
            Não vende drones, peças nem presta serviços. Qualquer anúncio publicado
            pelo usuário é de sua inteira e exclusiva responsabilidade.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* BLOQUE 1: TIPO DE PERSONA Y DATOS */}
        <section className="form-section">
          <h3>1. Dados do contratante</h3>

          <div className="form-group full-width">
            <label>Tipo de pessoa *</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  name="tipoPessoa"
                  value="PF"
                  checked={formData.tipoPessoa === 'PF'}
                  onChange={handleChange}
                  disabled={isEditing}
                />
                Pessoa Física (Fazendeiro / Produtor)
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="tipoPessoa"
                  value="PJ"
                  checked={formData.tipoPessoa === 'PJ'}
                  onChange={handleChange}
                  disabled={isEditing}
                />
                Pessoa Jurídica (Empresa)
              </label>
            </div>
          </div>

          <div className="form-grid">
            {formData.tipoPessoa === 'PF' ? (
              <>
                <div className="form-group full-width">
                  <label>Nome completo *</label>
                  <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>CPF *</label>
                  <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required placeholder="000.000.000-00" />
                </div>
                <div className="form-group">
                  <label>Data de nascimento *</label>
                  <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
                </div>
              </>
            ) : (
              <>
                <div className="form-group full-width">
                  <label>Razão social *</label>
                  <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Nome fantasia</label>
                  <input type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>CNPJ *</label>
                  <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} required placeholder="00.000.000/0000-00" />
                </div>
              </>
            )}

            <div className="form-group full-width">
              <label>Foto / logo (opcional)</label>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFotoChange} />
              <span className="help-text">Formatos: JPG, PNG ou WebP. Máximo: 2 MB.</span>
              {fotoPreview && <img src={fotoPreview} alt="Preview" className="preview-photo" />}
            </div>
          </div>
        </section>

        {/* BLOQUE 2: CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>2. Contato e endereço</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>E-mail *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isEditing} />
            </div>
            <div className="form-group">
              <label>Telefone 1 (WhatsApp) *</label>
              <input type="tel" name="telefone1" value={formData.telefone1} onChange={handleChange} required placeholder="(00) 90000-0000" />
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
              <input type="text" name="logradouro" value={formData.endereco.logradouro} onChange={handleEnderecoChange} required />
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

        {/* BLOQUE 3: PERFIL DE USO */}
        <section className="form-section">
          <h3>3. Perfil de uso</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Tipo de usuário *</label>
              <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {TIPOS_USUARIO.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Principais serviços que solicita</label>
            <div className="checkbox-group">
              {SERVICOS_SOLICITADOS.map((servico) => (
                <label key={servico} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.servicosSolicitados.includes(servico)}
                    onChange={() => handleArrayToggle('servicosSolicitados', servico)}
                  />
                  {servico}
                </label>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Área aproximada da propriedade (ha)</label>
              <input type="number" name="areaPropriedadeHa" value={formData.areaPropriedadeHa} onChange={handleChange} placeholder="Ex: 150" />
            </div>
            <div className="form-group">
              <label>Frequência de uso esperada</label>
              <select name="frequenciaUso" value={formData.frequenciaUso} onChange={handleChange}>
                <option value="ocasional">Ocasional (1-3x por ano)</option>
                <option value="regular">Regular (mensal)</option>
                <option value="intensivo">Intensivo (semanal ou mais)</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Estados de interesse</label>
            <div className="checkbox-group">
              {ESTADOS_BRASIL.map((uf) => (
                <label key={uf} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.estadosInteresse.includes(uf)}
                    onChange={() => handleArrayToggle('estadosInteresse', uf)}
                  />
                  {uf}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* BLOQUE 4: PREFERENCIAS */}
        <section className="form-section">
          <h3>4. Preferências</h3>
          <div className="checkbox-group">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="receberOrcamentosAutomaticos"
                checked={formData.receberOrcamentosAutomaticos}
                onChange={handleChange}
              />
              Desejo receber orçamentos de pilotos na minha região quando for solicitado
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="aceitaContatoComercial"
                checked={formData.aceitaContatoComercial}
                onChange={handleChange}
              />
              Aceito receber contato comercial e novidades do portal
            </label>
          </div>
          <div className="form-group full-width">
            <label>Observações adicionais</label>
            <textarea
              name="observacoes"
              rows="3"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Informações extras que queira compartilhar..."
            />
          </div>
        </section>

        {/* BLOQUE 5: PAUSA Y RETIRO (SOLO EDICION) */}
        {isEditing && (
          <section className="form-section">
            <h3>5. Gestão de status e pausa</h3>
            <div className="form-group">
              <label>Status atual</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Ativo">Ativo</option>
                <option value="Pausado">Pausado</option>
              </select>
            </div>

            {formData.status === 'Pausado' && (
              <div className="form-section">
                <div className="form-group">
                  <label>Motivo da pausa</label>
                  <select name="motivoPausa" value={formData.motivoPausa} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    <option value="ferias">Férias</option>
                    <option value="viagem">Viagem</option>
                    <option value="doenca">Doença / problema de saúde</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Início da pausa</label>
                    <input type="date" name="dataInicioPausa" value={formData.dataInicioPausa} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Previsão de retorno</label>
                    <input type="date" name="dataFimPausa" value={formData.dataFimPausa} onChange={handleChange} />
                  </div>
                </div>
                <p className="help-text">
                  Durante a pausa a mensalidade continua sendo cobrada para manter histórico,
                  benefícios e prioridade. A pausa apenas oculta o perfil de solicitações ativas.
                </p>
              </div>
            )}

            <div className="danger-zone">
              <h4>Retiro / baixa</h4>
              <p>Seu perfil será desativado e você perderá o acesso aos benefícios de membro.</p>
              <button type="button" className="btn-excluir" onClick={() => setMostrarConfirmacaoRetiro(true)}>
                Solicitar retiro / dar baixa do subdomínio
              </button>
            </div>
          </section>
        )}

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
            </div>
            <p className="help-text">
              A senha deve ter no mínimo 8 caracteres. Não use espaços, aspas ou barra invertida.
            </p>
          </section>
        )}

        {erroSenha && <p className="erro">{erroSenha}</p>}

        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar alterações do perfil' : 'Finalizar e criar conta'}
        </button>
      </form>

      {/* MODAL DE CONFIRMACION DE RETIRO */}
      {mostrarConfirmacaoRetiro && (
        <div className="modal-fondo">
          <div className="modal-caja">
            <h3>Confirmar retiro / cancelamento</h3>
            <p className="help-text">
              Tem certeza que deseja se desligar do subdomínio?
              Seu perfil será desativado permanentemente e você perderá o acesso aos benefícios de membro.
            </p>
            <div className="form-actions">
              <button type="button" className="btn-cancelar" onClick={() => setMostrarConfirmacaoRetiro(false)}>
                Cancelar
              </button>
              <button type="button" className="btn-excluir" onClick={handleRetiro}>
                Confirmar retiro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TARJETA DE RESULTADO */}
      {cadastroResultado && (
        <div className="success-card">
          <h3>
            {cadastroResultado.status === 'Cancelado'
              ? 'Conta cancelada'
              : 'Cadastro / atualização realizada com sucesso'}
          </h3>
          {cadastroResultado.status !== 'Cancelado' && (
            <>
              <p>Seu código de identificação:</p>
              <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
            </>
          )}
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
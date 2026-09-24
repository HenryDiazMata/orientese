// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroPiloto.jsx
// FORMULARIO DE PILOTO
// SIN SENHA SSO. DATOS DEL PORTAL SOLO LECTURA
// HORAS DE VOO: <400 EM FORMACAO / >=400 PILOTO AVANCADO
// ESTILO: CADASTROFORM.CSS
// ==========================================

import React, { useState } from 'react';
import { useTheme } from '../../../context/drones/ThemeContext';
import { useAuth } from '../../../context/drones/AuthContext';
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
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
  'Levantamento Topográfico / Ortomosaico',
];

export default function CadastroPiloto({ pilotoParaEditar = null, onSalvar }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(pilotoParaEditar);
  const { user } = useAuth();

  // ==========================================
  // SSO DEL PORTAL: NOMBRE Y EMAIL SOLO LECTURA
  // ==========================================
  const nomeSso = (user && (user.nomeCompleto || user.nome)) || (pilotoParaEditar && pilotoParaEditar.nomeCompleto) || '';
  const emailSso = (user && user.email) || (pilotoParaEditar && pilotoParaEditar.email) || '';

  const [formData, setFormData] = useState(
    pilotoParaEditar || {
      nomeCompleto: nomeSso,
      dataNascimento: '',
      fotoPerfil: null,
      servicos: [],
      portesDrone: [],
      licencias: '',
      nivelExperiencias: 'estagiario',
      horasVoo: '',
      oferecerComoAuxiliar: true,
      regioesAtendimento: [],
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: 'SP',
      },
      email: emailSso,
      telefone1: '',
      telefone2: '',
      horarioAtendimento: '',
      formasPagamento: [],
      emiteNotaFiscal: 'Sim',
      observacoesParticulares: '',
    }
  );

  const [fotoPreview, setFotoPreview] = useState((pilotoParaEditar && pilotoParaEditar.fotoUrl) || null);
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroForm, setErroForm] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value },
    }));
  };

  const handleArrayToggle = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      const exists = currentList.includes(value);
      return {
        ...prev,
        [category]: exists ? currentList.filter((item) => item !== value) : [...currentList, value],
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
      if (parts.length === 3) nascFormateada = `${parts[2]}${parts[1]}${parts[0]}`;
    }
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${tipo}-${nascFormateada}-${dia}${mes}${ano}-1`;
  };

  // ==========================================
  // ENVIO: NO CREA SENHA. EL PADRE GUARDA drones.user
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    const horas = Number(formData.horasVoo || 0);
    if (Number.isNaN(horas) || horas < 0) {
      setErroForm('Informe as horas de voo (0 ou mais).');
      return;
    }
    setErroForm('');

    const registroCompleto = {
      ...formData,
      nomeCompleto: nomeSso || formData.nomeCompleto,
      email: emailSso || formData.email,
      horasVoo: horas,
      codigoRegistro: formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento),
      dataCadastro: formData.dataCadastro || new Date().toISOString(),
      disponibilidade: 'Ativo',
      tipo: 'piloto',
      fotoUrl: fotoPreview || formData.fotoUrl || null,
    };

    setCadastroResultado(registroCompleto);
    if (onSalvar) onSalvar(registroCompleto);
  };

  return (
    <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
      <div className="cadastro-header">
        <h2>{isEditing ? 'Editar perfil de piloto' : 'Cadastro de piloto profissional'}</h2>
        <p>{isEditing ? 'Atualize suas informações cadastrais' : 'Preencha os dados do piloto. A senha da conta é a do portal.'}</p>
      </div>

      <div className="aviso-box">
        <strong>Declaração de veracidade das informações</strong>
        <p>
          Ao preencher este formulário, você declara que todas as informações prestadas são verdadeiras
          e de sua inteira responsabilidade.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ==========================================
            BLOQUE 1: DATOS PERSONALES + SSO SOLO LECTURA
            ========================================== */}
        <section className="form-section">
          <h3>1. Dados pessoais</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Nome (conta do portal)</label>
              <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
            </div>
            <div className="form-group">
              <label>E-mail (conta do portal)</label>
              <input type="email" value={emailSso || formData.email} readOnly />
            </div>
            <div className="form-group">
              <label>Data de nascimento *</label>
              <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Foto de perfil (3x4 ou selfie)</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && <img src={fotoPreview} alt="Preview" className="preview-photo" />}
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 2: CONTACTO Y DIRECCION
            ========================================== */}
        <section className="form-section">
          <h3>2. Contato e endereço residencial</h3>
          <div className="form-grid">
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
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 3: SERVICIOS Y DRONES
            ========================================== */}
        <section className="form-section">
          <h3>3. Serviços e categoria de drones</h3>
          <div className="form-group full-width">
            <label>Serviços que oferece</label>
            <div className="checkbox-group">
              {SERVICOS_DISPONIVEIS.map((servico) => (
                <label key={servico} className="checkbox-item">
                  <input type="checkbox" checked={formData.servicos.includes(servico)} onChange={() => handleArrayToggle('servicos', servico)} />
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
                'Porte leve (< 250 g) Recreativo',
              ].map((porte) => (
                <label key={porte} className="checkbox-item">
                  <input type="checkbox" checked={formData.portesDrone.includes(porte)} onChange={() => handleArrayToggle('portesDrone', porte)} />
                  {porte}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group full-width">
            <label>Licenças e registros que possui</label>
            <textarea name="licencias" rows="2" value={formData.licencias} onChange={handleChange} placeholder="ANAC (SISANT), SARPAS/DECEA, CAAR, etc." />
          </div>
        </section>

        {/* ==========================================
            BLOQUE 4: HORAS + EXPERIENCIA + COBERTURA
            ========================================== */}
        <section className="form-section">
          <h3>4. Experiência e cobertura de atendimento</h3>
          <div className="form-group">
            <label>Horas de voo *</label>
            <input type="number" min="0" name="horasVoo" value={formData.horasVoo} onChange={handleChange} required />
            <span className="help-text">
              Menos de 400 h: selo “Em formação” (lista grátis). 400 h ou mais: selo “Piloto avançado” e Tabela B.
            </span>
          </div>
          <div className="form-group full-width">
            <label>Nível de experiência (referência)</label>
            <div className="radio-group">
              {[
                { value: 'estagiario', label: 'Estagiário / principiante' },
                { value: 'intermediario', label: 'Intermediário' },
                { value: 'avancado', label: 'Avançado' },
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
            <input type="checkbox" name="oferecerComoAuxiliar" checked={formData.oferecerComoAuxiliar} onChange={handleChange} />
            Desejo aparecer também na lista de auxiliares de campo
          </label>
          <div className="form-group full-width">
            <label>Região de atendimento (estados)</label>
            <div className="checkbox-group">
              {ESTADOS_BRASIL.map((uf) => (
                <label key={uf} className="checkbox-item">
                  <input type="checkbox" checked={formData.regioesAtendimento.includes(uf)} onChange={() => handleArrayToggle('regioesAtendimento', uf)} />
                  {uf}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            BLOQUE 5: CONDICIONES COMERCIALES
            ========================================== */}
        <section className="form-section">
          <h3>5. Condições comerciais e operacionais</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Horário de atendimento</label>
              <input type="text" name="horarioAtendimento" value={formData.horarioAtendimento} onChange={handleChange} placeholder="Ex: Seg a Sex das 08h às 18h" />
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
                    <input type="checkbox" checked={formData.formasPagamento.includes(forma)} onChange={() => handleArrayToggle('formasPagamento', forma)} />
                    {forma}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Exigências ou observações particulares</label>
              <textarea name="observacoesParticulares" rows="3" value={formData.observacoesParticulares} onChange={handleChange} />
            </div>
          </div>
        </section>

        {erroForm && <p className="erro">{erroForm}</p>}

        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar alterações do perfil' : 'Enviar cadastro de piloto'}
        </button>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>Cadastro enviado</h3>
          <p>Seu código de identificação:</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
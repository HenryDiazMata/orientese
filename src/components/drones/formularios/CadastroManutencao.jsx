// ==========================================
// CADASTROMANUTENCAO.JSX
// FORMULARIO DE TECNICO DE MANTENIMIENTO
// ESTILO UNIFICADO: CADASTROFORM.CSS
// SIN MODAL Y SIN USENAVIGATE
// ==========================================

import React, { useEffect, useState } from 'react';
import { useTheme } from "../../../context/drones/ThemeContext";
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const SERVICOS_MANUTENCAO = [
  'Manutenção preventiva',
  'Manutenção corretiva',
  'Diagnóstico eletrônico',
  'Calibração de sensores / IMU / GPS',
  'Reparo de motores e hélices',
  'Reparo de placas / ESC',
  'Baterias e sistemas de energia',
  'Firmware / atualização de software',
  'Estrutura / fuselagem / braços',
  'Câmeras e gimbals',
  'Atendimento em campo'
];

const MARCAS_DRONE = [
  'DJI',
  'Autel',
  'Skydio',
  'Parrot',
  'Fimi / Xiaomi',
  'Agrícolas (Jato, XAG, etc.)',
  'Montagem própria / FPV',
  'Outras'
];

const estadoVazio = {
  nomeCompleto: '',
  nomeProfissional: '',
  fotoPerfil: null,
  dataNascimento: '',
  whatsapp: '',
  telefone2: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  cep: '',
  logradouro: '',
  cidade: '',
  uf: 'SP',
  atendeOutrasRegioes: false,
  anosExperiencia: '',
  servicos: [],
  marcas: [],
  certificacoes: '',
  atendeEmCampo: true,
  possuiOficina: false,
  enderecoOficina: '',
  prazoMedio: '',
  valorAproximado: '',
  formasPagamento: [],
  emiteNotaFiscal: 'Sim',
  disponibilidade: 'Disponível',
  apresentacao: ''
};

export default function CadastroManutencao({
  onSalvar,
  onCancelar,
  tecnicoParaEditar = null
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(tecnicoParaEditar);

  const [formData, setFormData] = useState(estadoVazio);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erro, setErro] = useState('');

  // CARGA DATOS SI VIENE EDICION
  useEffect(() => {
    if (!tecnicoParaEditar) return;
    setFormData({
      ...estadoVazio,
      ...tecnicoParaEditar,
      servicos: tecnicoParaEditar.servicos || [],
      marcas: tecnicoParaEditar.marcas || [],
      formasPagamento: tecnicoParaEditar.formasPagamento || [],
      senha: '',
      confirmarSenha: ''
    });
    setFotoPreview(tecnicoParaEditar.foto || tecnicoParaEditar.fotoUrl || null);
  }, [tecnicoParaEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    if (!file) return;
    setFormData((prev) => ({ ...prev, fotoPerfil: file }));
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      if ((formData.senha || '').length < 8) {
        setErro('A senha deve ter no mínimo 8 caracteres.');
        return;
      }
      if (formData.senha !== formData.confirmarSenha) {
        setErro('As senhas não coincidem.');
        return;
      }
    }

    if ((formData.servicos || []).length === 0) {
      setErro('Selecione ao menos um serviço de manutenção.');
      return;
    }

    setErro('');

    const { confirmarSenha, ...registro } = formData;
    if (onSalvar) {
      onSalvar({
        ...registro,
        tipo: 'manutencao',
        foto: fotoPreview || registro.foto || null,
        nomeProfissional: registro.nomeProfissional || registro.nomeCompleto
      });
    }
  };

  return (
    <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
      {/* CABECERA */}
      <div className="cadastro-header">
        <h2>
          {isEditing
            ? 'Editar técnico de manutenção'
            : 'Cadastro de técnico de manutenção'}
        </h2>
        <p>
          {isEditing
            ? 'Atualize suas informações cadastrais'
            : 'Cadastre-se para oferecer manutenção preventiva e corretiva de drones'}
        </p>
      </div>

      {/* AVISO LEGAL */}
      <div className="aviso-box">
        <strong>Declaração de veracidade das informações</strong>
        <p>
          Ao preencher este formulário, você declara que todas as informações prestadas
          são verdadeiras, exatas e de sua inteira responsabilidade. O fornecimento de
          dados falsos poderá acarretar a suspensão do perfil no sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* BLOQUE 1: DATOS PERSONALES Y CONTACTO */}
        <section className="form-section">
          <h3>1. Dados pessoais e contato</h3>
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
              <label>Nome profissional / oficina (opcional)</label>
              <input
                type="text"
                name="nomeProfissional"
                value={formData.nomeProfissional}
                onChange={handleChange}
                placeholder="Ex: JS Drones Service"
              />
            </div>
            <div className="form-group">
              <label>Data de nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>WhatsApp (com DDD) *</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                placeholder="(00) 90000-0000"
              />
            </div>
            <div className="form-group">
              <label>Telefone 2 (opcional)</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
              />
            </div>
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
              <label>Foto / logo (opcional)</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && (
                <img src={fotoPreview} alt="Preview" className="preview-photo" />
              )}
            </div>
          </div>
        </section>

        {/* BLOQUE 2: DIRECCION */}
        <section className="form-section">
          <h3>2. Endereço e cobertura</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label>Logradouro / endereço</label>
              <input
                type="text"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Cidade *</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Estado (UF) *</label>
              <select name="uf" value={formData.uf} onChange={handleChange}>
                {ESTADOS_BRASIL.map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="atendeOutrasRegioes"
                  checked={formData.atendeOutrasRegioes}
                  onChange={handleChange}
                />
                Atende outras regiões / estados
              </label>
            </div>
          </div>
        </section>

        {/* BLOQUE 3: SERVICIOS TECNICOS */}
        <section className="form-section">
          <h3>3. Serviços técnicos</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Serviços que oferece *</label>
              <div className="checkbox-group">
                {SERVICOS_MANUTENCAO.map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.servicos || []).includes(item)}
                      onChange={() => handleArrayToggle('servicos', item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Marcas / categorias com que trabalha</label>
              <div className="checkbox-group">
                {MARCAS_DRONE.map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.marcas || []).includes(item)}
                      onChange={() => handleArrayToggle('marcas', item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Anos de experiência</label>
              <input
                type="number"
                min="0"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Disponibilidade</label>
              <select
                name="disponibilidade"
                value={formData.disponibilidade}
                onChange={handleChange}
              >
                <option value="Disponível">Disponível</option>
                <option value="Em atendimento">Em atendimento</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Certificações / cursos</label>
              <textarea
                name="certificacoes"
                rows="2"
                value={formData.certificacoes}
                onChange={handleChange}
                placeholder="Cursos técnicos, autorizações de fabricante, etc."
              />
            </div>
          </div>
        </section>

        {/* BLOQUE 4: CONDICIONES DE ATENCION */}
        <section className="form-section">
          <h3>4. Condições de atendimento</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="atendeEmCampo"
                  checked={formData.atendeEmCampo}
                  onChange={handleChange}
                />
                Atende em campo / no local da missão
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="possuiOficina"
                  checked={formData.possuiOficina}
                  onChange={handleChange}
                />
                Possui oficina física
              </label>
            </div>
            {formData.possuiOficina && (
              <div className="form-group full-width">
                <label>Endereço da oficina</label>
                <input
                  type="text"
                  name="enderecoOficina"
                  value={formData.enderecoOficina}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group">
              <label>Prazo médio de reparo</label>
              <input
                type="text"
                name="prazoMedio"
                value={formData.prazoMedio}
                onChange={handleChange}
                placeholder="Ex: 3 a 7 dias úteis"
              />
            </div>
            <div className="form-group">
              <label>Valor aproximado / consulta</label>
              <input
                type="text"
                name="valorAproximado"
                value={formData.valorAproximado}
                onChange={handleChange}
                placeholder="Ex: Diagnóstico a partir de R$ 150"
              />
            </div>
            <div className="form-group">
              <label>Emissão de nota fiscal?</label>
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
              <label>Formas de pagamento aceitas</label>
              <div className="checkbox-group">
                {['PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Boleto Bancário'].map((forma) => (
                  <label key={forma} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.formasPagamento || []).includes(forma)}
                      onChange={() => handleArrayToggle('formasPagamento', forma)}
                    />
                    {forma}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Apresentação profissional</label>
              <textarea
                name="apresentacao"
                rows="3"
                value={formData.apresentacao}
                onChange={handleChange}
                placeholder="Descreva sua experiência em manutenção de drones"
              />
            </div>
          </div>
        </section>

        {/* BLOQUE 5: LOGIN (SOLO ALTA NUEVA) */}
        {!isEditing && (
          <section className="form-section">
            <h3>5. Credenciais de acesso (login)</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Senha *</label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar senha *</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="help-text full-width">
                A senha deve ter no mínimo 8 caracteres.
              </p>
            </div>
          </section>
        )}

        {erro && <p className="erro">{erro}</p>}

        {/* ACCIONES */}
        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar alterações do perfil' : 'Finalizar e criar conta'}
        </button>
      </form>
    </div>
  );
}
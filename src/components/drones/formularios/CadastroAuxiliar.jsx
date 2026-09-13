import React, { useEffect, useState } from 'react';
import { useTheme } from "../../../context/drones/ThemeContext";
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const TIPOS_DRONE = ['Multirotor', 'Asa Fixa', 'FPV', 'Híbrido', 'Outros'];

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

const MODALIDADES = [
  'Diária / por hora',
  'Por contrato (PJ / RPA)',
  'Por temporada / projetos'
];

const estadoVazio = {
  nomeCompleto: '',
  nomeProfissional: '',
  fotoPerfil: null,
  whatsapp: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  cidade: '',
  uf: 'SP',
  atendeOutrasRegioes: false,
  anosExperiencia: '',
  tiposDrone: [],
  areasAtuacao: [],
  modalidades: [],
  valorAproximado: '',
  possuiEquipamento: false,
  disponibilidade: 'Disponível',
  apresentacao: ''
};

export default function CadastroAuxiliar({
  onSalvar,
  onCancelar,
  auxiliarParaEditar = null
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(auxiliarParaEditar);

  const [formData, setFormData] = useState(estadoVazio);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!auxiliarParaEditar) return;
    setFormData({
      ...estadoVazio,
      ...auxiliarParaEditar,
      tiposDrone: auxiliarParaEditar.tiposDrone || [],
      areasAtuacao: auxiliarParaEditar.areasAtuacao || [],
      modalidades: auxiliarParaEditar.modalidades || [],
      senha: '',
      confirmarSenha: ''
    });
    setFotoPreview(auxiliarParaEditar.foto || auxiliarParaEditar.fotoUrl || null);
  }, [auxiliarParaEditar]);

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
    if ((formData.areasAtuacao || []).length === 0) {
      setErro('Selecione ao menos uma área de atuação.');
      return;
    }
    setErro('');
    const { confirmarSenha, ...registro } = formData;
    if (onSalvar) {
      onSalvar({
        ...registro,
        foto: fotoPreview || registro.foto || null,
        nomeProfissional: registro.nomeProfissional || registro.nomeCompleto
      });
    }
  };

  return (
    <div className="cadastro-container" data-theme={isDark ? 'dark' : 'light'}>
      <div className="cadastro-header">
        <h2>{isEditing ? 'Editar auxiliar de campo' : 'Cadastro de auxiliar de campo'}</h2>
        <p>
          {isEditing
            ? 'Atualize suas informações cadastrais'
            : 'Cadastre-se para atuar em solo nas missões de drones'}
        </p>
      </div>

      <div className="aviso-box">
        <strong>Declaração de veracidade das informações</strong>
        <p>
          Ao preencher este formulário, você declara que todas as informações prestadas
          são verdadeiras, exatas e de sua inteira responsabilidade. O fornecimento de
          dados falsos poderá acarretar a suspensão do perfil no sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
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
                placeholder="Ex: Lucas Silva"
              />
            </div>
            <div className="form-group full-width">
              <label>Nome profissional / apelido (opcional)</label>
              <input
                type="text"
                name="nomeProfissional"
                value={formData.nomeProfissional}
                onChange={handleChange}
                placeholder="Ex: Lucas Campo"
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
              <label>Foto de perfil (opcional)</label>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
              {fotoPreview && <img src={fotoPreview} alt="Preview" className="preview-photo" />}
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>2. Endereço e área de atuação</h3>
          <div className="form-grid">
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

        <section className="form-section">
          <h3>3. Experiência e qualificações</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Anos de experiência com drones</label>
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
                <option value="Em Missão">Em Missão</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>Tipos de drones que opera</label>
              <div className="checkbox-group">
                {TIPOS_DRONE.map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.tiposDrone || []).includes(item)}
                      onChange={() => handleArrayToggle('tiposDrone', item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Principais áreas de atuação *</label>
              <div className="checkbox-group">
                {AREAS_ATUACAO.map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.areasAtuacao || []).includes(item)}
                      onChange={() => handleArrayToggle('areasAtuacao', item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>4. Condições de trabalho</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Modalidade de trabalho</label>
              <div className="checkbox-group">
                {MODALIDADES.map((item) => (
                  <label key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.modalidades || []).includes(item)}
                      onChange={() => handleArrayToggle('modalidades', item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Valor aproximado</label>
              <input
                type="text"
                name="valorAproximado"
                value={formData.valorAproximado}
                onChange={handleChange}
                placeholder="R$ 180 / diária ou A combinar"
              />
            </div>
            <div className="form-group">
              <label className="checkbox-item" style={{ marginTop: 28 }}>
                <input
                  type="checkbox"
                  name="possuiEquipamento"
                  checked={formData.possuiEquipamento}
                  onChange={handleChange}
                />
                Possui equipamento próprio
              </label>
            </div>
            <div className="form-group full-width">
              <label>Apresentação profissional</label>
              <textarea
                name="apresentacao"
                rows="3"
                value={formData.apresentacao}
                onChange={handleChange}
                placeholder="Breve descrição da experiência em campo"
              />
            </div>
          </div>
        </section>

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

        <button type="submit" className="btn-submit">
          {isEditing ? 'Salvar alterações do perfil' : 'Finalizar e criar conta'}
        </button>
      </form>
    </div>
  );
}
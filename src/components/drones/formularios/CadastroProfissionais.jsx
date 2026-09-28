// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroProfissionais.jsx
// FICHA INFORMATIVA DE PROFESIONAL AFIN DEL SECTOR — NO COBRA
// UN SOLO ARCHIVO — 4 PASOS INTERNOS
// VOLVER → HUB CADASTRO (onCancelar) — NO AL INICIO DEL SITE
// IDS: cadastroProfissionaisListas.js
// PAYLOAD: profissionaisListaDados.js
// SIN DARK — SIN data-theme — SIN STYLE INLINE
// CSS: CadastroForm.css
// i18n: src/components/drones/i18n
// ==========================================

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/drones/AuthContext';
import i18nDrones from '../i18n';
import './CadastroForm.css';

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const PAISES = [
  { code: 'BR', labelKey: 'paisBR', moeda: 'BRL' },
  { code: 'AR', labelKey: 'paisAR', moeda: 'ARS' },
  { code: 'UY', labelKey: 'paisUY', moeda: 'UYU' },
  { code: 'PY', labelKey: 'paisPY', moeda: 'PYG' },
  { code: 'CL', labelKey: 'paisCL', moeda: 'CLP' },
  { code: 'BO', labelKey: 'paisBO', moeda: 'BOB' },
  { code: 'PE', labelKey: 'paisPE', moeda: 'PEN' },
  { code: 'CO', labelKey: 'paisCO', moeda: 'COP' },
  { code: 'EC', labelKey: 'paisEC', moeda: 'USD' },
  { code: 'VE', labelKey: 'paisVE', moeda: 'VES' },
  { code: 'MX', labelKey: 'paisMX', moeda: 'MXN' },
  { code: 'US', labelKey: 'paisUS', moeda: 'USD' },
  { code: 'ES', labelKey: 'paisES', moeda: 'EUR' },
  { code: 'PT', labelKey: 'paisPT', moeda: 'EUR' },
  { code: 'IT', labelKey: 'paisIT', moeda: 'EUR' },
  { code: 'FR', labelKey: 'paisFR', moeda: 'EUR' },
  { code: 'DE', labelKey: 'paisDE', moeda: 'EUR' },
  { code: 'OT', labelKey: 'paisOT', moeda: '' },
];

const FORMACION_ACADEMICA = [
  'eng_agronomica', 'eng_florestal', 'eng_civil', 'eng_minas',
  'eng_eletrica', 'eng_mecanica', 'eng_computacao', 'arquitetura',
  'medicina_vet', 'medicina', 'direito', 'geografia', 'cartografia',
  'meteorologia', 'quimica', 'administracao', 'comunicacao', 'outro_academico',
];

const FORMACION_TECNICA = [
  'eletronica', 'eletricidade', 'informatica', 'topografia',
  'seguranca_trabalho', 'inspecao', 'quimica_tec', 'ambiental_tec',
  'edificacoes', 'logistica_tec', 'telecom', 'audiovisual',
  'processamento_dados', 'emergencia', 'outro_tecnico',
];

const FORMACION_BASICA = [
  'pedreiro', 'pintor', 'soldador', 'eletricista', 'motorista',
  'peao', 'tratorista', 'vigilante', 'almoxarife', 'limpeza',
  'cozinha', 'auxiliar_geral', 'outro_basico',
];

const AREAS_SERVICO = [
  'agro_pulverizacao', 'pecuaria', 'floresta', 'mapeamento',
  'fotogrametria', 'inspecao_linhas', 'inspecao_obras', 'mineracao',
  'oil_gas', 'filmagem', 'imobiliario', 'seguranca', 'emergencia',
  'infra', 'logistica', 'dados', 'ensino', 'juridico',
  'servicos_gerais', 'outro_area',
];

const VINCULOS = ['autonomo', 'pj', 'clt', 'diaria', 'temporada', 'busca_vaga'];
const NIVEIS_EXP = ['iniciante', 'pleno', 'senior'];
const DISPONIBILIDADES = ['imediata', 'semana', 'fds', 'consulta', 'viagem', 'turno_noite'];
const IDIOMAS = ['pt', 'es', 'en', 'fr', 'it'];
const MODALIDADES = [
  'autonomo', 'contrato', 'zafra', 'cltBrasil',
  'porDias', 'porHora', 'empregadoFijo', 'temporal',
];
const FORMAS_PAGO = ['pix', 'credito', 'debito', 'boleto'];

const PASO_MAX = 4;

export default function CadastroProfissionais({
  profissionalParaEditar = null,
  onSalvar,
  onCancelar,
  setCurrentView,
}) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user } = useAuth();
  const isEditing = Boolean(profissionalParaEditar);

  const nomeSso =
    (user && (user.nomeCompleto || user.nome)) ||
    (profissionalParaEditar && profissionalParaEditar.nomeCompleto) ||
    '';
  const emailSso =
    (user && user.email) ||
    (profissionalParaEditar && profissionalParaEditar.email) ||
    '';

  const paisInicial = (() => {
    if (profissionalParaEditar && profissionalParaEditar.pais) {
      return profissionalParaEditar.pais;
    }
    if (user && (user.pais || user.country)) return user.pais || user.country;
    try {
      const sim = window.localStorage.getItem('drones.simulador.pais');
      if (sim) return sim;
    } catch (e) {
      /* SIN STORAGE */
    }
    return 'BR';
  })();

  const yaTieneClaveDrones = Boolean(
    (user && (user.dronesKey || user.claveDrones || user.temClaveDrones)) ||
      (profissionalParaEditar && profissionalParaEditar.claveDrones)
  );

  const [paso, setPaso] = useState(1);

  const [formData, setFormData] = useState(
    profissionalParaEditar || {
      nomeCompleto: nomeSso,
      email: emailSso,
      pessoaisPortal: { nome: nomeSso, email: emailSso },
      nomeApresentacao: '',
      dataNascimento: '',
      localNascimento: '',
      pais: paisInicial,
      fotoPerfil: null,
      cpf: '',
      telefone1: '',
      telefone2: '',
      whatsapp: '',
      telegram: '',
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: 'SP',
      },
      cidade: '',
      uf: 'SP',
      pontoEncontro: '',
      formacaoAcademica: [],
      formacaoTecnica: [],
      formacaoBasica: [],
      areasSetor: [],
      habilidadesExtras: '',
      observacoes: '',
      vinculo: '',
      nivelExperiencia: '',
      anosExperiencia: '',
      raioKm: '',
      disponibilidades: [],
      idiomas: [],
      temCredencial: false,
      credencialDetalle: '',
      seguroRC: false,
      nda: false,
      modalidades: [],
      regioesAtendimento: [],
      horarioAtendimento: '',
      formasPagamento: [],
      emiteNotaFiscal: 'Sim',
      aceptaPropuestasEmail: true,
      contactoComercialAmplio: true,
      observacoesParticulares: '',
      declaraDados: false,
      autorizaSello: false,
      termoResponsabilidade: false,
      crearClaveDrones: !yaTieneClaveDrones,
    }
  );

  const [fotoPreview, setFotoPreview] = useState(
    (profissionalParaEditar &&
      (profissionalParaEditar.fotoUrl || profissionalParaEditar.foto)) ||
      null
  );
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroForm, setErroForm] = useState('');

  const esBrasil = formData.pais === 'BR';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const nextEndereco = { ...prev.endereco, [name]: value };
      const extra = {};
      if (name === 'cidade') extra.cidade = value;
      if (name === 'estado') extra.uf = value;
      return { ...prev, endereco: nextEndereco, ...extra };
    });
  };

  const handleArrayToggle = (category, value) => {
    setFormData((prev) => {
      const currentList = prev[category] || [];
      const exists = currentList.includes(value);
      return {
        ...prev,
        [category]: exists
          ? currentList.filter((item) => item !== value)
          : [...currentList, value],
      };
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
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

  const handleVolver = () => {
    if (typeof onCancelar === 'function') {
      onCancelar();
      return;
    }
    if (typeof setCurrentView === 'function') {
      setCurrentView('CADASTRO');
    }
  };

  const validarPaso = (n) => {
    if (n === 1) {
      if (!formData.nomeApresentacao) {
        setErroForm(t('cadastroProfissional.erroNome'));
        return false;
      }
      if (!formData.telefone1) {
        setErroForm(t('cadastroProfissional.erroTelefone'));
        return false;
      }
      if (!formData.endereco.logradouro || !formData.endereco.cidade) {
        setErroForm(t('cadastroProfissional.erroDireccion'));
        return false;
      }
      if (!formData.declaraDados) {
        setErroForm(t('cadastroProfissional.erroDeclara'));
        return false;
      }
    }
    if (n === 2) {
      const total =
        (formData.formacaoAcademica || []).length +
        (formData.formacaoTecnica || []).length +
        (formData.formacaoBasica || []).length;
      if (total === 0) {
        setErroForm(t('cadastroProfissional.erroFormacao'));
        return false;
      }
    }
    if (n === 3) {
      if ((formData.areasSetor || []).length === 0) {
        setErroForm(t('cadastroProfissional.erroAreas'));
        return false;
      }
    }
    if (n === 4) {
      if (!formData.termoResponsabilidade) {
        setErroForm(t('cadastroProfissional.erroTermo'));
        return false;
      }
    }
    setErroForm('');
    return true;
  };

  const irSiguiente = () => {
    if (!validarPaso(paso)) return;
    setPaso((p) => Math.min(PASO_MAX, p + 1));
  };

  const irAnterior = () => {
    setErroForm('');
    setPaso((p) => Math.max(1, p - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paso !== PASO_MAX) {
      irSiguiente();
      return;
    }
    if (!validarPaso(1) || !validarPaso(2) || !validarPaso(3) || !validarPaso(4)) {
      return;
    }

    const ciudad = formData.endereco.cidade || formData.cidade;
    const uf = formData.endereco.estado || formData.uf;
    const codigo = formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento);

    const registroCompleto = {
      ...formData,
      nomeCompleto: nomeSso || formData.nomeCompleto,
      email: emailSso || formData.email,
      pessoaisPortal: {
        nome: nomeSso || formData.nomeCompleto,
        email: emailSso || formData.email,
      },
      nomeApresentacao:
        formData.nomeApresentacao || nomeSso || formData.nomeCompleto,
      ciudad,
      uf,
      codigoRegistro: codigo,
      id: formData.id || codigo,
      dataCadastro: formData.dataCadastro || new Date().toISOString(),
      disponibilidadePainel: 'editar_en_panel',
      tipo: 'profissional',
      listaDestino: 'profissional',
      fotoUrl: fotoPreview || formData.fotoUrl || null,
      crearClaveDrones: yaTieneClaveDrones ? false : Boolean(formData.crearClaveDrones),
    };

    setCadastroResultado(registroCompleto);
    if (onSalvar) onSalvar(registroCompleto);
  };

  const paisOptions = useMemo(() => PAISES, []);

  const navPasos = (
    <div className="cadastro-acciones-final">
      {paso > 1 && (
        <button type="button" className="btn-volver-inicio" onClick={irAnterior}>
          {t('cadastroProfissional.anterior')}
        </button>
      )}
      {paso < PASO_MAX && (
        <button type="button" className="btn-submit" onClick={irSiguiente}>
          {t('cadastroProfissional.continuar')}
        </button>
      )}
      {paso === PASO_MAX && (
        <button type="submit" className="btn-submit">
          {isEditing
            ? t('cadastroProfissional.ctaEditar')
            : t('cadastroProfissional.ctaFinalizar')}
        </button>
      )}
      <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
        {t('cadastroUsuario.volver')}
      </button>
    </div>
  );

  return (
    <div className="cadastro-container">
      <div className="cadastro-header-nav">
        <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
          {t('cadastroUsuario.volver')}
        </button>
      </div>

      <div className="cadastro-header">
        <h2>
          {isEditing
            ? t('cadastroProfissional.tituloEditar')
            : t('cadastroProfissional.titulo')}
        </h2>
        <p>{t('cadastroProfissional.subtitulo')}</p>
        <p className="help-text">
          {t('cadastroProfissional.paso')} {paso}/{PASO_MAX}
        </p>
      </div>

      <div className="aviso-box">
        <strong>{t('cadastroProfissional.veracidadTitulo')}</strong>
        <p>{t('cadastroProfissional.veracidadTexto')}</p>
      </div>
      <div className="aviso-box">
        <strong>{t('cadastroProfissional.leyendaTitulo')}</strong>
        <p>{t('cadastroProfissional.leyendaTexto')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {paso === 1 && (
          <>
            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque1')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('cadastroProfissional.nomePortal')}</label>
                  <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.emailPortal')}</label>
                  <input type="email" value={emailSso || formData.email} readOnly />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.nomeApresentacao')} *</label>
                  <input
                    type="text"
                    name="nomeApresentacao"
                    value={formData.nomeApresentacao}
                    onChange={handleChange}
                    placeholder={t('cadastroProfissional.nomeApresentacaoPh')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.dataNascimento')}</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.localNascimento')}</label>
                  <input
                    type="text"
                    name="localNascimento"
                    value={formData.localNascimento}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.pais')} *</label>
                  <select name="pais" value={formData.pais} onChange={handleChange} required>
                    {paisOptions.map((p) => (
                      <option key={p.code} value={p.code}>
                        {t(`cadastroProfissional.${p.labelKey}`)}
                        {p.moeda ? ` (${p.moeda})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                {esBrasil && (
                  <div className="form-group">
                    <label>{t('cadastroProfissional.cpf')}</label>
                    <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
                  </div>
                )}
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.foto')}</label>
                  <input type="file" accept="image/*" onChange={handleFotoChange} />
                  {fotoPreview && <img src={fotoPreview} alt="" className="preview-photo" />}
                </div>
                {!yaTieneClaveDrones && (
                  <label className="checkbox-item full-width">
                    <input
                      type="checkbox"
                      name="crearClaveDrones"
                      checked={formData.crearClaveDrones}
                      onChange={handleChange}
                    />
                    {t('cadastroProfissional.crearClave')}
                  </label>
                )}
              </div>
            </section>

            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque2')}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('cadastroProfissional.telefone1')} *</label>
                  <input
                    type="tel"
                    name="telefone1"
                    value={formData.telefone1}
                    onChange={handleChange}
                    placeholder="(00) 90000-0000"
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.telefone2')}</label>
                  <input type="tel" name="telefone2" value={formData.telefone2} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.whatsapp')}</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.telegram')}</label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@usuario"
                  />
                </div>
                <div className="form-group">
                  <label>
                    {t('cadastroProfissional.cep')}
                    {esBrasil ? ' *' : ''}
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.endereco.cep}
                    onChange={handleEnderecoChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.logradouro')} *</label>
                  <input
                    type="text"
                    name="logradouro"
                    value={formData.endereco.logradouro}
                    onChange={handleEnderecoChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.cidade')} *</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.endereco.cidade}
                    onChange={handleEnderecoChange}
                  />
                </div>
                {esBrasil && (
                  <div className="form-group">
                    <label>{t('cadastroProfissional.estado')} *</label>
                    <select
                      name="estado"
                      value={formData.endereco.estado}
                      onChange={handleEnderecoChange}
                    >
                      {ESTADOS_BRASIL.map((ufItem) => (
                        <option key={ufItem} value={ufItem}>{ufItem}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.pontoEncontro')}</label>
                  <input
                    type="text"
                    name="pontoEncontro"
                    value={formData.pontoEncontro}
                    onChange={handleChange}
                    placeholder={t('cadastroProfissional.pontoEncontroPh')}
                  />
                </div>
              </div>
            </section>

            <label className="checkbox-item">
              <input
                type="checkbox"
                name="declaraDados"
                checked={formData.declaraDados}
                onChange={handleChange}
              />
              {t('cadastroProfissional.declaraDados')}
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="autorizaSello"
                checked={formData.autorizaSello}
                onChange={handleChange}
              />
              {t('cadastroProfissional.autorizaSello')}
            </label>
          </>
        )}

        {paso === 2 && (
          <section className="form-section">
            <h3>{t('cadastroProfissional.bloque3')}</h3>
            <p className="help-text">{t('cadastroProfissional.formacaoAyuda')}</p>
            <p className="help-text">{t('cadastroProfissional.formacaoAcadTitulo')}</p>
            <div className="checkbox-group checkbox-group-2col">
              {FORMACION_ACADEMICA.map((key) => (
                <label key={key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.formacaoAcademica || []).includes(key)}
                    onChange={() => handleArrayToggle('formacaoAcademica', key)}
                  />
                  {t(`cadastroProfissional.acad.${key}`)}
                </label>
              ))}
            </div>
            <p className="help-text">{t('cadastroProfissional.formacaoTecTitulo')}</p>
            <div className="checkbox-group checkbox-group-2col">
              {FORMACION_TECNICA.map((key) => (
                <label key={key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.formacaoTecnica || []).includes(key)}
                    onChange={() => handleArrayToggle('formacaoTecnica', key)}
                  />
                  {t(`cadastroProfissional.tec.${key}`)}
                </label>
              ))}
            </div>
            <p className="help-text">{t('cadastroProfissional.formacaoBasTitulo')}</p>
            <div className="checkbox-group checkbox-group-2col">
              {FORMACION_BASICA.map((key) => (
                <label key={key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.formacaoBasica || []).includes(key)}
                    onChange={() => handleArrayToggle('formacaoBasica', key)}
                  />
                  {t(`cadastroProfissional.bas.${key}`)}
                </label>
              ))}
            </div>
          </section>
        )}

        {paso === 3 && (
          <>
            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque4')}</h3>
              <p className="help-text">{t('cadastroProfissional.areasAyuda')}</p>
              <div className="checkbox-group checkbox-group-2col">
                {AREAS_SERVICO.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.areasSetor || []).includes(key)}
                      onChange={() => handleArrayToggle('areasSetor', key)}
                    />
                    {t(`cadastroProfissional.area.${key}`)}
                  </label>
                ))}
              </div>
            </section>
            <section className="form-section">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.habilidadesExtras')}</label>
                  <textarea
                    name="habilidadesExtras"
                    rows="3"
                    value={formData.habilidadesExtras}
                    onChange={handleChange}
                    placeholder={t('cadastroProfissional.habilidadesPh')}
                  />
                </div>
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.observacoesExp')}</label>
                  <textarea
                    name="observacoes"
                    rows="3"
                    value={formData.observacoes}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {paso === 4 && (
          <>
            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque5')}</h3>
              <p className="help-text">{t('cadastroProfissional.expAyuda')}</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('cadastroProfissional.vinculo')}</label>
                  <select name="vinculo" value={formData.vinculo} onChange={handleChange}>
                    <option value="">{t('cadastroProfissional.seleccione')}</option>
                    {VINCULOS.map((key) => (
                      <option key={key} value={key}>{t(`cadastroProfissional.vinc.${key}`)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.nivel')}</label>
                  <select
                    name="nivelExperiencia"
                    value={formData.nivelExperiencia}
                    onChange={handleChange}
                  >
                    <option value="">{t('cadastroProfissional.seleccione')}</option>
                    {NIVEIS_EXP.map((key) => (
                      <option key={key} value={key}>{t(`cadastroProfissional.niv.${key}`)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.anosExperiencia')}</label>
                  <input
                    type="number"
                    min="0"
                    name="anosExperiencia"
                    value={formData.anosExperiencia}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.raioKm')}</label>
                  <input
                    type="number"
                    min="0"
                    name="raioKm"
                    value={formData.raioKm}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque6')}</h3>
              <p className="help-text">{t('cadastroProfissional.dispAyuda')}</p>
              <div className="checkbox-group checkbox-group-2col">
                {DISPONIBILIDADES.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.disponibilidades || []).includes(key)}
                      onChange={() => handleArrayToggle('disponibilidades', key)}
                    />
                    {t(`cadastroProfissional.disp.${key}`)}
                  </label>
                ))}
              </div>
              <p className="help-text">{t('cadastroProfissional.idiomasAyuda')}</p>
              <div className="checkbox-group checkbox-group-2col">
                {IDIOMAS.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.idiomas || []).includes(key)}
                      onChange={() => handleArrayToggle('idiomas', key)}
                    />
                    {t(`cadastroProfissional.idioma.${key}`)}
                  </label>
                ))}
              </div>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  name="temCredencial"
                  checked={formData.temCredencial}
                  onChange={handleChange}
                />
                {t('cadastroProfissional.possuiCredencial')}
              </label>
              {formData.temCredencial && (
                <div className="form-group">
                  <label>{t('cadastroProfissional.credencialDetalle')}</label>
                  <input
                    type="text"
                    name="credencialDetalle"
                    value={formData.credencialDetalle}
                    onChange={handleChange}
                    placeholder={t('cadastroProfissional.credencialPh')}
                  />
                </div>
              )}
              <label className="checkbox-item">
                <input type="checkbox" name="seguroRC" checked={formData.seguroRC} onChange={handleChange} />
                {t('cadastroProfissional.seguroRC')}
              </label>
              <label className="checkbox-item">
                <input type="checkbox" name="nda" checked={formData.nda} onChange={handleChange} />
                {t('cadastroProfissional.nda')}
              </label>
            </section>

            {esBrasil && (
              <section className="form-section">
                <h3>{t('cadastroProfissional.bloque7')}</h3>
                <div className="checkbox-group cols-3">
                  {ESTADOS_BRASIL.map((ufItem) => (
                    <label key={ufItem} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={(formData.regioesAtendimento || []).includes(ufItem)}
                        onChange={() => handleArrayToggle('regioesAtendimento', ufItem)}
                      />
                      {ufItem}
                    </label>
                  ))}
                </div>
              </section>
            )}

            <section className="form-section">
              <h3>{t('cadastroProfissional.bloque8')}</h3>
              <p className="help-text">{t('cadastroProfissional.modalidadesAyuda')}</p>
              <div className="checkbox-group checkbox-group-2col">
                {MODALIDADES.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.modalidades || []).includes(key)}
                      onChange={() => handleArrayToggle('modalidades', key)}
                    />
                    {t(`cadastroProfissional.mod.${key}`)}
                  </label>
                ))}
              </div>
              <p className="help-text">{t('cadastroProfissional.panelNota')}</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('cadastroProfissional.horario')}</label>
                  <input
                    type="text"
                    name="horarioAtendimento"
                    value={formData.horarioAtendimento}
                    onChange={handleChange}
                    placeholder={t('cadastroProfissional.horarioPh')}
                  />
                </div>
                <div className="form-group">
                  <label>{t('cadastroProfissional.notaFiscal')}</label>
                  <select name="emiteNotaFiscal" value={formData.emiteNotaFiscal} onChange={handleChange}>
                    <option value="Sim">{t('cadastroProfissional.nfSim')}</option>
                    <option value="Não">{t('cadastroProfissional.nfNao')}</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.formasPago')}</label>
                  <div className="checkbox-group checkbox-group-2col">
                    {FORMAS_PAGO.map((key) => (
                      <label key={key} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={(formData.formasPagamento || []).includes(key)}
                          onChange={() => handleArrayToggle('formasPagamento', key)}
                        />
                        {t(`cadastroProfissional.pago.${key}`)}
                      </label>
                    ))}
                  </div>
                </div>
                <label className="checkbox-item full-width">
                  <input
                    type="checkbox"
                    name="aceptaPropuestasEmail"
                    checked={formData.aceptaPropuestasEmail}
                    onChange={handleChange}
                  />
                  {t('cadastroProfissional.propuestasEmail')}
                </label>
                <label className="checkbox-item full-width">
                  <input
                    type="checkbox"
                    name="contactoComercialAmplio"
                    checked={formData.contactoComercialAmplio}
                    onChange={handleChange}
                  />
                  {t('cadastroProfissional.contactoAmplio')}
                </label>
                <div className="form-group full-width">
                  <label>{t('cadastroProfissional.observacoes')}</label>
                  <textarea
                    name="observacoesParticulares"
                    rows="3"
                    value={formData.observacoesParticulares}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <label className="checkbox-item">
              <input
                type="checkbox"
                name="termoResponsabilidade"
                checked={formData.termoResponsabilidade}
                onChange={handleChange}
              />
              {t('cadastroProfissional.termo')}
            </label>
            <p className="help-text">{t('cadastroProfissional.leyendaFinal')}</p>
          </>
        )}

        {erroForm && <p className="erro">{erroForm}</p>}
        {navPasos}
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>{t('cadastroProfissional.enviado')}</h3>
          <p>{t('cadastroProfissional.codigo')}</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
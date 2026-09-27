// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroConserto.jsx
// FICHA INFORMATIVA DE TECNICO / OFICINA DE CONSERTO — NO COBRA
// UNA CUENTA PORTAL / UNA CLAVE DRONES SI NO EXISTE / VARIOS ROLES
// PAIS EN DATOS PERSONALES (PROMOS Y RELANZAMIENTO)
// EJE: BANCADA / TALLER / REPARACION MECANICA Y ELECTRONICA — SIN 400 H
// DISTINTO DE MANTENIMIENTO (PREVENTIVA / CALIBRACION / REVISION)
// UI SIN DARK — SIN data-theme — SIN STYLE INLINE
// ESTILO: CadastroForm.css
// VOLVER SUPERIOR IZQUIERDO + INFERIOR DERECHO → HUB CADASTRO
// IMPORT i18n: src/components/drones/i18n
// ==========================================

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/drones/AuthContext';
import i18nDrones from '../i18n';
import './CadastroForm.css';

// ==========================================
// UF BRASIL — SOLO SI PAIS = BR
// ==========================================
const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

// ==========================================
// PAISES ALINEADOS AL CRITERIO DEL SIMULADOR
// AQUI NO HAY PRECIOS; SOLO CODIGO Y MONEDA DE REFERENCIA
// ==========================================
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

// ==========================================
// TIPOS DE DRONE QUE REPARA — CARD EQUIPOS — DOS COLUMNAS
// ==========================================
const TIPOS_DRON = [
  'consumer',
  'pro',
  'agricola',
  'fpv',
  'mapeo',
  'vtol',
];

// ==========================================
// PARTES / SUBSISTEMAS — CARD EQUIPOS — DOS COLUMNAS
// ==========================================
const SUBSISTEMAS = [
  'fc',
  'esc',
  'gimbal',
  'radio',
  'gnss',
  'bateria',
  'frame',
  'agric_bomba',
];

// ==========================================
// TIPOS / NIVELES DE REPARACION — CARD PROPIA — DOS COLUMNAS
// ==========================================
const NIVEIS = [
  'diagnostico',
  'solda',
  'firmware',
  'optica',
  'recuperacao',
];

const MARCAS = [
  'dji',
  'autel',
  'skydio',
  'parrot',
  'yamaha',
  'fpv',
  'outras',
];

const IDIOMAS_ATENCION = ['pt', 'es', 'en', 'fr', 'it'];

const MODALIDADES = [
  'autonomo',
  'contrato',
  'zafra',
  'cltBrasil',
  'porDias',
  'porHora',
  'empregadoFijo',
  'temporal',
];

const FORMAS_PAGO = ['pix', 'credito', 'debito', 'boleto'];

export default function CadastroConserto({
  consertoParaEditar = null,
  onSalvar,
  onCancelar,
  setCurrentView,
}) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user } = useAuth();
  const isEditing = Boolean(consertoParaEditar);

  // ==========================================
  // SSO PORTAL: NOMBRE Y EMAIL SOLO LECTURA
  // ==========================================
  const nomeSso =
    (user && (user.nomeCompleto || user.nome)) ||
    (consertoParaEditar && consertoParaEditar.nomeCompleto) ||
    '';
  const emailSso =
    (user && user.email) ||
    (consertoParaEditar && consertoParaEditar.email) ||
    '';

  // ==========================================
  // PRELLENO PAIS: PORTAL → SESION SIMULADOR → BR
  // ==========================================
  const paisInicial = (() => {
    if (consertoParaEditar && consertoParaEditar.pais) return consertoParaEditar.pais;
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
      (consertoParaEditar && consertoParaEditar.claveDrones)
  );

  const [formData, setFormData] = useState(
    consertoParaEditar || {
      nomeCompleto: nomeSso,
      email: emailSso,
      nomeProfissional: '',
      tipoAtor: 'tecnico',
      web: '',
      whatsappComercial: '',
      dataNascimento: '',
      pais: paisInicial,
      fotoPerfil: null,
      telegram: '',
      telefone1: '',
      telefone2: '',
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: 'SP',
      },
      direccionTaller: '',
      tiposDron: [],
      subsistemas: [],
      niveis: [],
      marcas: [],
      noHace: '',
      anosExperiencia: '',
      certificacoes: '',
      credencialFabricante: '',
      autorizadoFabricante: false,
      bancadaPropria: false,
      piezas: 'mixta',
      stockPropio: false,
      trazaSerie: true,
      atendePresencial: true,
      atendeRemessaNacional: true,
      enviaInternacional: false,
      atendeCampo: false,
      clientePagaEnvio: true,
      idiomasAtencion: [],
      prazoDiagnosticoDias: '',
      prazoReparoDias: '',
      garantiaDias: '',
      garantiaCubre: 'ambos',
      orcamentoPago: false,
      osSimultaneas: '',
      seguroRC: false,
      ndaFlota: false,
      descarteBateria: false,
      resumoTecnico: '',
      modalidades: [],
      regioesAtendimento: [],
      horarioAtendimento: '',
      formasPagamento: [],
      emiteNotaFiscal: 'Sim',
      aceptaPropuestasEmail: true,
      contactoComercialAmplio: true,
      observacoesParticulares: '',
      termoResponsabilidade: false,
      crearClaveDrones: !yaTieneClaveDrones,
    }
  );

  const [fotoPreview, setFotoPreview] = useState(
    (consertoParaEditar && (consertoParaEditar.fotoUrl || consertoParaEditar.foto)) || null
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

  // ==========================================
  // CODIGO LOCAL DE IDENTIFICACION — NO ES COBRO
  // PREFIJO C = CONSERTO / REPARACION
  // ==========================================
  const generarCodigoCadastro = (dataNasc) => {
    const tipo = 'C';
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
  // VOLVER AL HUB REGISTRO / CADASTRO — NO AL INICIO DEL SITE
  // EL HUB CIERRA LA FICHA CON onCancelar → setTipoId(null)
  // ==========================================
  const handleVolver = () => {
    if (typeof onCancelar === 'function') {
      onCancelar();
      return;
    }
    if (typeof setCurrentView === 'function') {
      setCurrentView('CADASTRO');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((formData.tiposDron || []).length === 0) {
      setErroForm(t('cadastroConserto.erroTipos'));
      return;
    }
    if ((formData.subsistemas || []).length === 0) {
      setErroForm(t('cadastroConserto.erroSubs'));
      return;
    }
    if (!formData.termoResponsabilidade) {
      setErroForm(t('cadastroConserto.erroTermo'));
      return;
    }
    setErroForm('');

    const registroCompleto = {
      ...formData,
      nomeCompleto: nomeSso || formData.nomeCompleto,
      email: emailSso || formData.email,
      nomeProfissional: formData.nomeProfissional || nomeSso || formData.nomeCompleto,
      codigoRegistro:
        formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento),
      dataCadastro: formData.dataCadastro || new Date().toISOString(),
      disponibilidadePainel: 'editar_en_panel',
      tipo: 'conserto',
      listaDestino: 'conserto',
      fotoUrl: fotoPreview || formData.fotoUrl || null,
      crearClaveDrones: yaTieneClaveDrones ? false : Boolean(formData.crearClaveDrones),
    };

    setCadastroResultado(registroCompleto);
    if (onSalvar) onSalvar(registroCompleto);
  };

  const paisOptions = useMemo(() => PAISES, []);

  return (
    <div className="cadastro-container">
      {/* ==========================================
          VOLVER — SUPERIOR IZQUIERDO
          MISMA CLASE QUE EL INFERIOR
          ========================================== */}
      <div className="cadastro-header-nav">
        <button
          type="button"
          className="btn-volver-inicio"
          onClick={handleVolver}
        >
          {t('cadastroUsuario.volver')}
        </button>
      </div>

      <div className="cadastro-header">
        <h2>
          {isEditing
            ? t('cadastroConserto.tituloEditar')
            : t('cadastroConserto.titulo')}
        </h2>
        <p>{t('cadastroConserto.subtitulo')}</p>
      </div>

      {/* ==========================================
          VERACIDAD + LEYENDA INFORMATIVA
          ========================================== */}
      <div className="aviso-box">
        <strong>{t('cadastroConserto.veracidadTitulo')}</strong>
        <p>{t('cadastroConserto.veracidadTexto')}</p>
      </div>
      <div className="aviso-box">
        <strong>{t('cadastroConserto.leyendaTitulo')}</strong>
        <p>{t('cadastroConserto.leyendaTexto')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1. DATOS PERSONALES + PAIS + SSO */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque1')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroConserto.nomePortal')}</label>
              <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.emailPortal')}</label>
              <input type="email" value={emailSso || formData.email} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.tipoAtor')}</label>
              <select name="tipoAtor" value={formData.tipoAtor} onChange={handleChange}>
                <option value="tecnico">{t('cadastroConserto.tipoTecnico')}</option>
                <option value="oficina">{t('cadastroConserto.tipoOficina')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.nomeProfissional')}</label>
              <input
                type="text"
                name="nomeProfissional"
                value={formData.nomeProfissional}
                onChange={handleChange}
                placeholder={t('cadastroConserto.nomeProfissionalPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.web')}</label>
              <input
                type="text"
                name="web"
                value={formData.web}
                onChange={handleChange}
                placeholder={t('cadastroConserto.webPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.dataNascimento')} *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.pais')} *</label>
              <select name="pais" value={formData.pais} onChange={handleChange} required>
                {paisOptions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {t(`cadastroConserto.${p.labelKey}`)}
                    {p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroConserto.foto')}</label>
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
                {t('cadastroConserto.crearClave')}
              </label>
            )}
          </div>
        </section>

        {/* 2. CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque2')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroConserto.telefone1')} *</label>
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
              <label>{t('cadastroConserto.telefone2')}</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.whatsappComercial')}</label>
              <input
                type="tel"
                name="whatsappComercial"
                value={formData.whatsappComercial}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.telegram')}</label>
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
                {t('cadastroConserto.cep')}
                {esBrasil ? ' *' : ''}
              </label>
              <input
                type="text"
                name="cep"
                value={formData.endereco.cep}
                onChange={handleEnderecoChange}
                required={esBrasil}
              />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroConserto.logradouro')} *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.cidade')} *</label>
              <input
                type="text"
                name="cidade"
                value={formData.endereco.cidade}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            {esBrasil && (
              <div className="form-group">
                <label>{t('cadastroConserto.estado')} *</label>
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
            )}
            <div className="form-group full-width">
              <label>{t('cadastroConserto.enderecoRecepcion')}</label>
              <input
                type="text"
                name="direccionTaller"
                value={formData.direccionTaller}
                onChange={handleChange}
                placeholder={t('cadastroConserto.enderecoRecepcionPh')}
              />
            </div>
          </div>
        </section>

        {/* 3. TIPOS DE REPARACION — CARD PROPIA */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque3')}</h3>
          <p className="help-text">{t('cadastroConserto.niveisAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {NIVEIS.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.niveis || []).includes(key)}
                  onChange={() => handleArrayToggle('niveis', key)}
                />
                {t(`cadastroConserto.nivel.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 4. EQUIPOS Y PARTES QUE REPARA — CARD PROPIA */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque4')}</h3>
          <p className="help-text">{t('cadastroConserto.tiposAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {TIPOS_DRON.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.tiposDron || []).includes(key)}
                  onChange={() => handleArrayToggle('tiposDron', key)}
                />
                {t(`cadastroConserto.dron.${key}`)}
              </label>
            ))}
          </div>
          <p className="help-text">{t('cadastroConserto.subsAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {SUBSISTEMAS.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.subsistemas || []).includes(key)}
                  onChange={() => handleArrayToggle('subsistemas', key)}
                />
                {t(`cadastroConserto.sub.${key}`)}
              </label>
            ))}
          </div>
          <p className="help-text">{t('cadastroConserto.marcasAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MARCAS.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.marcas || []).includes(key)}
                  onChange={() => handleArrayToggle('marcas', key)}
                />
                {t(`cadastroConserto.marca.${key}`)}
              </label>
            ))}
          </div>
          <div className="form-group full-width">
            <label>{t('cadastroConserto.noRepara')}</label>
            <textarea
              name="noHace"
              rows="3"
              value={formData.noHace}
              onChange={handleChange}
              placeholder={t('cadastroConserto.noReparaPh')}
            />
          </div>
        </section>

        {/* 5. CERTIFICACIONES Y EXPERIENCIA — SIN 400 H */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque5')}</h3>
          <p className="help-text">{t('cadastroConserto.expAyuda')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroConserto.anosExperiencia')}</label>
              <input
                type="number"
                min="0"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.piezas')}</label>
              <select name="piezas" value={formData.piezas} onChange={handleChange}>
                <option value="original">{t('cadastroConserto.piezasOriginal')}</option>
                <option value="mixta">{t('cadastroConserto.piezasMixta')}</option>
                <option value="compativel">{t('cadastroConserto.piezasCompativel')}</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroConserto.certificacoes')}</label>
              <textarea
                name="certificacoes"
                rows="2"
                value={formData.certificacoes}
                onChange={handleChange}
                placeholder={t('cadastroConserto.certificacoesPh')}
              />
            </div>
          </div>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="autorizadoFabricante"
              checked={formData.autorizadoFabricante}
              onChange={handleChange}
            />
            {t('cadastroConserto.autorizadoFabricante')}
          </label>
          {formData.autorizadoFabricante && (
            <div className="form-group">
              <label>{t('cadastroConserto.credencialFabricante')}</label>
              <input
                type="text"
                name="credencialFabricante"
                value={formData.credencialFabricante}
                onChange={handleChange}
              />
            </div>
          )}
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="bancadaPropria"
              checked={formData.bancadaPropria}
              onChange={handleChange}
            />
            {t('cadastroConserto.bancadaPropria')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="stockPropio"
              checked={formData.stockPropio}
              onChange={handleChange}
            />
            {t('cadastroConserto.stockPropio')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="trazaSerie"
              checked={formData.trazaSerie}
              onChange={handleChange}
            />
            {t('cadastroConserto.trazaSerie')}
          </label>
          <div className="form-group full-width">
            <label>{t('cadastroConserto.resumoTecnico')}</label>
            <textarea
              name="resumoTecnico"
              rows="3"
              value={formData.resumoTecnico}
              onChange={handleChange}
              placeholder={t('cadastroConserto.resumoPh')}
            />
          </div>
        </section>

        {/* 6. CONDICIONES DE ATENCION + LOGISTICA + MODALIDADES */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque6')}</h3>
          <p className="help-text">{t('cadastroConserto.modalidadesAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MODALIDADES.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.modalidades || []).includes(key)}
                  onChange={() => handleArrayToggle('modalidades', key)}
                />
                {t(`cadastroConserto.mod.${key}`)}
              </label>
            ))}
          </div>
          <div className="checkbox-group checkbox-group-2col">
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="atendePresencial"
                checked={formData.atendePresencial}
                onChange={handleChange}
              />
              {t('cadastroConserto.atendePresencial')}
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="atendeRemessaNacional"
                checked={formData.atendeRemessaNacional}
                onChange={handleChange}
              />
              {t('cadastroConserto.atendeRemessaNacional')}
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="enviaInternacional"
                checked={formData.enviaInternacional}
                onChange={handleChange}
              />
              {t('cadastroConserto.enviaInternacional')}
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="atendeCampo"
                checked={formData.atendeCampo}
                onChange={handleChange}
              />
              {t('cadastroConserto.atendeCampo')}
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                name="clientePagaEnvio"
                checked={formData.clientePagaEnvio}
                onChange={handleChange}
              />
              {t('cadastroConserto.clientePagaEnvio')}
            </label>
          </div>
          <p className="help-text">{t('cadastroConserto.idiomasAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {IDIOMAS_ATENCION.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.idiomasAtencion || []).includes(key)}
                  onChange={() => handleArrayToggle('idiomasAtencion', key)}
                />
                {t(`cadastroConserto.idioma.${key}`)}
              </label>
            ))}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroConserto.prazoDiagnostico')}</label>
              <input
                type="number"
                min="0"
                name="prazoDiagnosticoDias"
                value={formData.prazoDiagnosticoDias}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.prazoReparo')}</label>
              <input
                type="number"
                min="0"
                name="prazoReparoDias"
                value={formData.prazoReparoDias}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.garantiaDias')}</label>
              <input
                type="number"
                min="0"
                name="garantiaDias"
                value={formData.garantiaDias}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.garantiaCubre')}</label>
              <select name="garantiaCubre" value={formData.garantiaCubre} onChange={handleChange}>
                <option value="mao">{t('cadastroConserto.garantiaMao')}</option>
                <option value="peca">{t('cadastroConserto.garantiaPeca')}</option>
                <option value="ambos">{t('cadastroConserto.garantiaAmbos')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.osSimultaneas')}</label>
              <input
                type="number"
                min="0"
                name="osSimultaneas"
                value={formData.osSimultaneas}
                onChange={handleChange}
              />
            </div>
          </div>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="orcamentoPago"
              checked={formData.orcamentoPago}
              onChange={handleChange}
            />
            {t('cadastroConserto.orcamentoPago')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="seguroRC"
              checked={formData.seguroRC}
              onChange={handleChange}
            />
            {t('cadastroConserto.seguroRC')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="ndaFlota"
              checked={formData.ndaFlota}
              onChange={handleChange}
            />
            {t('cadastroConserto.ndaFlota')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="descarteBateria"
              checked={formData.descarteBateria}
              onChange={handleChange}
            />
            {t('cadastroConserto.descarteBateria')}
          </label>
        </section>

        {/* 7. REGION UF — SOLO BRASIL */}
        {esBrasil && (
          <section className="form-section">
            <h3>{t('cadastroConserto.bloque7')}</h3>
            <div className="checkbox-group cols-3">
              {ESTADOS_BRASIL.map((uf) => (
                <label key={uf} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.regioesAtendimento || []).includes(uf)}
                    onChange={() => handleArrayToggle('regioesAtendimento', uf)}
                  />
                  {uf}
                </label>
              ))}
            </div>
          </section>
        )}

        {/* 8. COMERCIAL — SIN PRECIOS */}
        <section className="form-section">
          <h3>{t('cadastroConserto.bloque8')}</h3>
          <p className="help-text">{t('cadastroConserto.panelNota')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroConserto.horario')}</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder={t('cadastroConserto.horarioPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroConserto.notaFiscal')}</label>
              <select
                name="emiteNotaFiscal"
                value={formData.emiteNotaFiscal}
                onChange={handleChange}
              >
                <option value="Sim">{t('cadastroConserto.nfSim')}</option>
                <option value="Não">{t('cadastroConserto.nfNao')}</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroConserto.formasPago')}</label>
              <div className="checkbox-group checkbox-group-2col">
                {FORMAS_PAGO.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.formasPagamento || []).includes(key)}
                      onChange={() => handleArrayToggle('formasPagamento', key)}
                    />
                    {t(`cadastroConserto.pago.${key}`)}
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
              {t('cadastroConserto.propuestasEmail')}
            </label>
            <label className="checkbox-item full-width">
              <input
                type="checkbox"
                name="contactoComercialAmplio"
                checked={formData.contactoComercialAmplio}
                onChange={handleChange}
              />
              {t('cadastroConserto.contactoAmplio')}
            </label>
            <div className="form-group full-width">
              <label>{t('cadastroConserto.observacoes')}</label>
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
          {t('cadastroConserto.termo')}
        </label>

        <p className="help-text">{t('cadastroConserto.leyendaFinal')}</p>
        {erroForm && <p className="erro">{erroForm}</p>}

        {/* CTA ANCHO + VOLVER ABAJO — SIN CANCELAR */}
        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {isEditing
              ? t('cadastroConserto.ctaEditar')
              : t('cadastroConserto.ctaFinalizar')}
          </button>
          <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
            {t('cadastroUsuario.volver')}
          </button>
        </div>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>{t('cadastroConserto.enviado')}</h3>
          <p>{t('cadastroConserto.codigo')}</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
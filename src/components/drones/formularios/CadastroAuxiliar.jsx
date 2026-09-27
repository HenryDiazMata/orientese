// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroAuxiliar.jsx
// FICHA INFORMATIVA DE AUXILIAR DE CAMPO — NO COBRA
// UNA CUENTA PORTAL / UNA CLAVE DRONES SI NO EXISTE / VARIOS ROLES
// PAIS EN DATOS PERSONALES (PROMOS Y RELANZAMIENTO)
// EJE: SUELO / OBSERVADOR / LOGISTICA — SIN 400 H DE PILOTO
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
// TIPOS DE DRONE CON LOS QUE APOYA EN SUELO
// CARD PROPIA — DOS COLUMNAS
// ==========================================
const TIPOS_DRONE = [
  'multirotor',
  'asaFixa',
  'fpv',
  'hibrido',
  'outros',
];

// ==========================================
// AREAS DE ACTUACION DE SUELO — OBLIGATORIO AL MENOS UNA
// CARD PROPIA — DOS COLUMNAS
// ==========================================
const AREAS_ATUACAO = [
  'observadorEvlos',
  'trocaBaterias',
  'radioVhf',
  'apoioSolo',
  'logisticaMissao',
  'mapeamento',
  'inspecao',
  'pulverizacao',
  'audiovisual',
  'buscaResgate',
  'outros',
];

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

export default function CadastroAuxiliar({
  auxiliarParaEditar = null,
  onSalvar,
  onCancelar,
  setCurrentView,
}) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user } = useAuth();
  const isEditing = Boolean(auxiliarParaEditar);

  // ==========================================
  // SSO PORTAL: NOMBRE Y EMAIL SOLO LECTURA
  // ==========================================
  const nomeSso =
    (user && (user.nomeCompleto || user.nome)) ||
    (auxiliarParaEditar && auxiliarParaEditar.nomeCompleto) ||
    '';
  const emailSso =
    (user && user.email) ||
    (auxiliarParaEditar && auxiliarParaEditar.email) ||
    '';

  // ==========================================
  // PRELLENO PAIS: PORTAL → SESION SIMULADOR → BR
  // ==========================================
  const paisInicial = (() => {
    if (auxiliarParaEditar && auxiliarParaEditar.pais) return auxiliarParaEditar.pais;
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
      (auxiliarParaEditar && auxiliarParaEditar.claveDrones)
  );

  const [formData, setFormData] = useState(
    auxiliarParaEditar || {
      nomeCompleto: nomeSso,
      email: emailSso,
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
      tiposDrone: [],
      areasAtuacao: [],
      experienciasCampo: '',
      anosExperiencia: '',
      temEquipoPropio: false,
      equiposPropios: '',
      modalidades: [],
      regioesAtendimento: [],
      horarioAtendimento: '',
      formasPagamento: [],
      emiteNotaFiscal: 'Sim',
      aceptaPropuestasEmail: true,
      contactoComercialAmplio: true,
      observacoesParticulares: '',
      crearClaveDrones: !yaTieneClaveDrones,
    }
  );

  const [fotoPreview, setFotoPreview] = useState(
    (auxiliarParaEditar && auxiliarParaEditar.fotoUrl) || null
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
  // PREFIJO A = AUXILIAR
  // ==========================================
  const generarCodigoCadastro = (dataNasc) => {
    const tipo = 'A';
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
    if ((formData.areasAtuacao || []).length === 0) {
      setErroForm(t('cadastroAuxiliar.erroAreas'));
      return;
    }
    setErroForm('');

    const registroCompleto = {
      ...formData,
      nomeCompleto: nomeSso || formData.nomeCompleto,
      email: emailSso || formData.email,
      codigoRegistro:
        formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento),
      dataCadastro: formData.dataCadastro || new Date().toISOString(),
      disponibilidadePainel: 'editar_en_panel',
      tipo: 'auxiliar',
      listaDestino: 'auxiliares',
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
            ? t('cadastroAuxiliar.tituloEditar')
            : t('cadastroAuxiliar.titulo')}
        </h2>
        <p>{t('cadastroAuxiliar.subtitulo')}</p>
      </div>

      {/* ==========================================
          VERACIDAD + LEYENDA INFORMATIVA
          ========================================== */}
      <div className="aviso-box">
        <strong>{t('cadastroAuxiliar.veracidadTitulo')}</strong>
        <p>{t('cadastroAuxiliar.veracidadTexto')}</p>
      </div>
      <div className="aviso-box">
        <strong>{t('cadastroAuxiliar.leyendaTitulo')}</strong>
        <p>{t('cadastroAuxiliar.leyendaTexto')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1. DATOS PERSONALES + PAIS + SSO */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque1')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAuxiliar.nomePortal')}</label>
              <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.emailPortal')}</label>
              <input type="email" value={emailSso || formData.email} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.dataNascimento')} *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.pais')} *</label>
              <select name="pais" value={formData.pais} onChange={handleChange} required>
                {paisOptions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {t(`cadastroAuxiliar.${p.labelKey}`)}
                    {p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroAuxiliar.foto')}</label>
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
                {t('cadastroAuxiliar.crearClave')}
              </label>
            )}
          </div>
        </section>

        {/* 2. CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque2')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAuxiliar.telefone1')} *</label>
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
              <label>{t('cadastroAuxiliar.telefone2')}</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.telegram')}</label>
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
                {t('cadastroAuxiliar.cep')}
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
              <label>{t('cadastroAuxiliar.logradouro')} *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.cidade')} *</label>
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
                <label>{t('cadastroAuxiliar.estado')} *</label>
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
          </div>
        </section>

        {/* 3. TIPOS DE DRONE — CARD PROPIA */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque3')}</h3>
          <p className="help-text">{t('cadastroAuxiliar.tiposAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {TIPOS_DRONE.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.tiposDrone || []).includes(key)}
                  onChange={() => handleArrayToggle('tiposDrone', key)}
                />
                {t(`cadastroAuxiliar.drone.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 4. AREAS DE SUELO — CARD PROPIA — OBLIGATORIO */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque4')}</h3>
          <p className="help-text">{t('cadastroAuxiliar.areasAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {AREAS_ATUACAO.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.areasAtuacao || []).includes(key)}
                  onChange={() => handleArrayToggle('areasAtuacao', key)}
                />
                {t(`cadastroAuxiliar.area.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 5. EXPERIENCIA DE CAMPO — SIN 400 H */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque5')}</h3>
          <p className="help-text">{t('cadastroAuxiliar.expAyuda')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAuxiliar.anosExperiencia')}</label>
              <input
                type="number"
                min="0"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroAuxiliar.experienciasCampo')}</label>
              <textarea
                name="experienciasCampo"
                rows="3"
                value={formData.experienciasCampo}
                onChange={handleChange}
                placeholder={t('cadastroAuxiliar.experienciasPh')}
              />
            </div>
          </div>
        </section>

        {/* 6. MODALIDADES + EQUIPO PROPIO */}
        <section className="form-section">
          <h3>{t('cadastroAuxiliar.bloque6')}</h3>
          <p className="help-text">{t('cadastroAuxiliar.modalidadesAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MODALIDADES.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.modalidades || []).includes(key)}
                  onChange={() => handleArrayToggle('modalidades', key)}
                />
                {t(`cadastroAuxiliar.mod.${key}`)}
              </label>
            ))}
          </div>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="temEquipoPropio"
              checked={formData.temEquipoPropio}
              onChange={handleChange}
            />
            {t('cadastroAuxiliar.temEquipo')}
          </label>
          {formData.temEquipoPropio && (
            <div className="form-group full-width">
              <label>{t('cadastroAuxiliar.equiposCuales')}</label>
              <textarea
                name="equiposPropios"
                rows="2"
                value={formData.equiposPropios}
                onChange={handleChange}
                placeholder={t('cadastroAuxiliar.equiposPh')}
              />
            </div>
          )}
        </section>

        {/* 7. REGION UF — SOLO BRASIL */}
        {esBrasil && (
          <section className="form-section">
            <h3>{t('cadastroAuxiliar.bloque7')}</h3>
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
          <h3>{t('cadastroAuxiliar.bloque8')}</h3>
          <p className="help-text">{t('cadastroAuxiliar.panelNota')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAuxiliar.horario')}</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder={t('cadastroAuxiliar.horarioPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroAuxiliar.notaFiscal')}</label>
              <select
                name="emiteNotaFiscal"
                value={formData.emiteNotaFiscal}
                onChange={handleChange}
              >
                <option value="Sim">{t('cadastroAuxiliar.nfSim')}</option>
                <option value="Não">{t('cadastroAuxiliar.nfNao')}</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroAuxiliar.formasPago')}</label>
              <div className="checkbox-group checkbox-group-2col">
                {FORMAS_PAGO.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.formasPagamento || []).includes(key)}
                      onChange={() => handleArrayToggle('formasPagamento', key)}
                    />
                    {t(`cadastroAuxiliar.pago.${key}`)}
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
              {t('cadastroAuxiliar.propuestasEmail')}
            </label>
            <label className="checkbox-item full-width">
              <input
                type="checkbox"
                name="contactoComercialAmplio"
                checked={formData.contactoComercialAmplio}
                onChange={handleChange}
              />
              {t('cadastroAuxiliar.contactoAmplio')}
            </label>
            <div className="form-group full-width">
              <label>{t('cadastroAuxiliar.observacoes')}</label>
              <textarea
                name="observacoesParticulares"
                rows="3"
                value={formData.observacoesParticulares}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <p className="help-text">{t('cadastroAuxiliar.leyendaFinal')}</p>
        {erroForm && <p className="erro">{erroForm}</p>}

        {/* CTA ANCHO + VOLVER ABAJO A LA DERECHA */}
        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {isEditing
              ? t('cadastroAuxiliar.ctaEditar')
              : t('cadastroAuxiliar.ctaFinalizar')}
          </button>
          <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
            {t('cadastroUsuario.volver')}
          </button>
        </div>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>{t('cadastroAuxiliar.enviado')}</h3>
          <p>{t('cadastroAuxiliar.codigo')}</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
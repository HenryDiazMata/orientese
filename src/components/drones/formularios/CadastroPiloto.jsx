// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroPiloto.jsx
// FICHA INFORMATIVA DE PILOTO — NO COBRA
// UNA CUENTA PORTAL / UNA CLAVE DRONES SI NO EXISTE / VARIOS ROLES
// PAIS EN DATOS PERSONALES (PROMOS Y RELANZAMIENTO)
// 400 H NO EXPULSA: SOLO SELLO EN DIRECTORIO
// UI SIN DARK — SIN data-theme — SIN STYLE INLINE
// ESTILO: CadastroForm.css
// VOLVER SUPERIOR IZQUIERDO + INFERIOR DERECHO → VISTA CADASTRO
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

const SERVICOS_PILOTO = [
  'mapeamento', 'fotogrametria', 'inspecaoVisual', 'filmagem', 'pulverizacao',
  'contagemGado', 'contagemOvinos', 'contagemFrutos', 'ndvi', 'pastagem',
  'linhasTransmissao', 'topografia', 'supervisaoObras',
];

const SERVICOS_AUX_TEC = [
  'apoioSolo', 'observador', 'logisticaMissao', 'preventiva',
  'corretiva', 'calibracao', 'bancada', 'mecanica',
];

const PORTES_DRONE = [
  'pesadoAgricola', 'subpesadoMapeamento', 'medioInspecao', 'leveRecreativo',
];

const MODALIDADES = [
  'autonomo', 'contrato', 'zafra', 'cltBrasil',
  'porDias', 'porHora', 'empregadoFijo', 'temporal',
];

const FORMAS_PAGO = ['pix', 'credito', 'debito', 'boleto'];

export default function CadastroPiloto({
  pilotoParaEditar = null,
  onSalvar,
  setCurrentView,
}) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user } = useAuth();
  const isEditing = Boolean(pilotoParaEditar);

  // ==========================================
  // SSO PORTAL: NOMBRE Y EMAIL SOLO LECTURA
  // ==========================================
  const nomeSso =
    (user && (user.nomeCompleto || user.nome)) ||
    (pilotoParaEditar && pilotoParaEditar.nomeCompleto) ||
    '';
  const emailSso =
    (user && user.email) ||
    (pilotoParaEditar && pilotoParaEditar.email) ||
    '';

  // ==========================================
  // PRELLENO PAIS: PORTAL → SESION SIMULADOR → BR
  // ==========================================
  const paisInicial = (() => {
    if (pilotoParaEditar && pilotoParaEditar.pais) return pilotoParaEditar.pais;
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
      (pilotoParaEditar && pilotoParaEditar.claveDrones)
  );

  const [formData, setFormData] = useState(
    pilotoParaEditar || {
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
      servicos: [],
      servicosAuxTec: [],
      portesDrone: [],
      temEquipoPropio: false,
      equiposPropios: '',
      licencias: '',
      modalidades: [],
      nivelExperiencias: 'estagiario',
      horasVoo: '',
      oferecerComoAuxiliar: false,
      oferecerManutencao: false,
      oferecerConserto: false,
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
    (pilotoParaEditar && pilotoParaEditar.fotoUrl) || null
  );
  const [cadastroResultado, setCadastroResultado] = useState(null);
  const [erroForm, setErroForm] = useState('');

  const esBrasil = formData.pais === 'BR';
  const horasNum = Number(formData.horasVoo || 0);
  const selloAvanzado = horasNum >= 400;

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
  // ==========================================
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
  // VOLVER AL HUB REGISTRO / CADASTRO — NO AL INICIO DEL SITE
  // ==========================================
  const handleVolver = () => {
    if (typeof setCurrentView === 'function') {
      setCurrentView('CADASTRO');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const horas = Number(formData.horasVoo || 0);
    if (Number.isNaN(horas) || horas < 0) {
      setErroForm(t('cadastroPiloto.erroHoras'));
      return;
    }
    setErroForm('');

    const registroCompleto = {
      ...formData,
      nomeCompleto: nomeSso || formData.nomeCompleto,
      email: emailSso || formData.email,
      horasVoo: horas,
      sello: horas >= 400 ? 'piloto_avancado' : 'em_formacao_recien_graduado',
      codigoRegistro:
        formData.codigoRegistro || generarCodigoCadastro(formData.dataNascimento),
      dataCadastro: formData.dataCadastro || new Date().toISOString(),
      disponibilidadePainel: 'editar_en_panel',
      tipo: 'piloto',
      listaDestino: 'pilotos',
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
          ========================================== */}
      <div className="cadastro-header-nav">
        <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
          {t('cadastroUsuario.volver')}
        </button>
      </div>

      <div className="cadastro-header">
        <h2>
          {isEditing ? t('cadastroPiloto.tituloEditar') : t('cadastroPiloto.titulo')}
        </h2>
        <p>{t('cadastroPiloto.subtitulo')}</p>
      </div>

      {/* ==========================================
          VERACIDAD + LEYENDA INFORMATIVA
          ========================================== */}
      <div className="aviso-box">
        <strong>{t('cadastroPiloto.veracidadTitulo')}</strong>
        <p>{t('cadastroPiloto.veracidadTexto')}</p>
      </div>
      <div className="aviso-box">
        <strong>{t('cadastroPiloto.leyendaTitulo')}</strong>
        <p>{t('cadastroPiloto.leyendaTexto')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1. DATOS PERSONALES + PAIS + SSO */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque1')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroPiloto.nomePortal')}</label>
              <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.emailPortal')}</label>
              <input type="email" value={emailSso || formData.email} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.dataNascimento')} *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.pais')} *</label>
              <select name="pais" value={formData.pais} onChange={handleChange} required>
                {paisOptions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {t(`cadastroPiloto.${p.labelKey}`)}
                    {p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroPiloto.foto')}</label>
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
                {t('cadastroPiloto.crearClave')}
              </label>
            )}
          </div>
        </section>

        {/* 2. CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque2')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroPiloto.telefone1')} *</label>
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
              <label>{t('cadastroPiloto.telefone2')}</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.telegram')}</label>
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
                {t('cadastroPiloto.cep')}
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
              <label>{t('cadastroPiloto.logradouro')} *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.cidade')} *</label>
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
                <label>{t('cadastroPiloto.estado')} *</label>
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

        {/* 3. SERVICIOS */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque3')}</h3>
          <p className="help-text">{t('cadastroPiloto.servicosAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {SERVICOS_PILOTO.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.servicos.includes(key)}
                  onChange={() => handleArrayToggle('servicos', key)}
                />
                {t(`cadastroPiloto.serv.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 4. PORTE + EQUIPO */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque4')}</h3>
          <div className="checkbox-group checkbox-group-2col">
            {PORTES_DRONE.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.portesDrone.includes(key)}
                  onChange={() => handleArrayToggle('portesDrone', key)}
                />
                {t(`cadastroPiloto.porte.${key}`)}
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
            {t('cadastroPiloto.temEquipo')}
          </label>
          {formData.temEquipoPropio && (
            <div className="form-group full-width">
              <label>{t('cadastroPiloto.equiposCuales')}</label>
              <textarea
                name="equiposPropios"
                rows="2"
                value={formData.equiposPropios}
                onChange={handleChange}
              />
            </div>
          )}
        </section>

        {/* 5. LICENCIAS + MODALIDADES */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque5')}</h3>
          <div className="form-group full-width">
            <label>{t('cadastroPiloto.licencias')}</label>
            <textarea
              name="licencias"
              rows="2"
              value={formData.licencias}
              onChange={handleChange}
              placeholder={t('cadastroPiloto.licenciasPh')}
            />
          </div>
          <p className="help-text">{t('cadastroPiloto.modalidadesAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MODALIDADES.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.modalidades.includes(key)}
                  onChange={() => handleArrayToggle('modalidades', key)}
                />
                {t(`cadastroPiloto.mod.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 6. EXPERIENCIA + ROLES */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque6')}</h3>
          <div className="form-grid linea-horas-nivel">
            <div className="form-group">
              <label>{t('cadastroPiloto.horasVoo')} *</label>
              <input
                type="number"
                min="0"
                name="horasVoo"
                value={formData.horasVoo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.nivel')}</label>
              <div className="radio-group inline">
                {[
                  { value: 'estagiario', labelKey: 'nivelEstagiario' },
                  { value: 'intermediario', labelKey: 'nivelInter' },
                  { value: 'avancado', labelKey: 'nivelAvancado' },
                ].map((nivel) => (
                  <label key={nivel.value} className="radio-item">
                    <input
                      type="radio"
                      name="nivelExperiencias"
                      value={nivel.value}
                      checked={formData.nivelExperiencias === nivel.value}
                      onChange={handleChange}
                    />
                    {t(`cadastroPiloto.${nivel.labelKey}`)}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <p className="help-text">
            {t('cadastroPiloto.leyenda400')}
            {formData.horasVoo !== '' && (
              <strong>
                {' '}
                {selloAvanzado
                  ? t('cadastroPiloto.selloAhoraAvancado')
                  : t('cadastroPiloto.selloAhoraFormacao')}
              </strong>
            )}
          </p>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="oferecerComoAuxiliar"
              checked={formData.oferecerComoAuxiliar}
              onChange={handleChange}
            />
            {t('cadastroPiloto.rolAuxiliar')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="oferecerManutencao"
              checked={formData.oferecerManutencao}
              onChange={handleChange}
            />
            {t('cadastroPiloto.rolManutencao')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="oferecerConserto"
              checked={formData.oferecerConserto}
              onChange={handleChange}
            />
            {t('cadastroPiloto.rolConserto')}
          </label>
          <p className="help-text">{t('cadastroPiloto.auxTecAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {SERVICOS_AUX_TEC.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.servicosAuxTec.includes(key)}
                  onChange={() => handleArrayToggle('servicosAuxTec', key)}
                />
                {t(`cadastroPiloto.aux.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 7. REGION UF */}
        {esBrasil && (
          <section className="form-section">
            <h3>{t('cadastroPiloto.bloque7')}</h3>
            <div className="checkbox-group cols-3">
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
          </section>
        )}

        {/* 8. COMERCIAL — SIN PRECIOS */}
        <section className="form-section">
          <h3>{t('cadastroPiloto.bloque8')}</h3>
          <p className="help-text">{t('cadastroPiloto.panelNota')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroPiloto.horario')}</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder={t('cadastroPiloto.horarioPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroPiloto.notaFiscal')}</label>
              <select
                name="emiteNotaFiscal"
                value={formData.emiteNotaFiscal}
                onChange={handleChange}
              >
                <option value="Sim">{t('cadastroPiloto.nfSim')}</option>
                <option value="Não">{t('cadastroPiloto.nfNao')}</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroPiloto.formasPago')}</label>
              <div className="checkbox-group checkbox-group-2col">
                {FORMAS_PAGO.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={formData.formasPagamento.includes(key)}
                      onChange={() => handleArrayToggle('formasPagamento', key)}
                    />
                    {t(`cadastroPiloto.pago.${key}`)}
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
              {t('cadastroPiloto.propuestasEmail')}
            </label>
            <label className="checkbox-item full-width">
              <input
                type="checkbox"
                name="contactoComercialAmplio"
                checked={formData.contactoComercialAmplio}
                onChange={handleChange}
              />
              {t('cadastroPiloto.contactoAmplio')}
            </label>
            <div className="form-group full-width">
              <label>{t('cadastroPiloto.observacoes')}</label>
              <textarea
                name="observacoesParticulares"
                rows="3"
                value={formData.observacoesParticulares}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <p className="help-text">{t('cadastroPiloto.leyendaFinal')}</p>
        {erroForm && <p className="erro">{erroForm}</p>}

        {/* CTA ANCHO + VOLVER ABAJO A LA DERECHA */}
        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {isEditing ? t('cadastroPiloto.ctaEditar') : t('cadastroPiloto.ctaFinalizar')}
          </button>
          <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
            {t('cadastroUsuario.volver')}
          </button>
        </div>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>{t('cadastroPiloto.enviado')}</h3>
          <p>{t('cadastroPiloto.codigo')}</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
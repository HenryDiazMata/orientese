// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroManutencao.jsx
// FICHA INFORMATIVA DE TECNICO DE MANTENIMIENTO — NO COBRA
// UNA CUENTA PORTAL / UNA CLAVE DRONES SI NO EXISTE / VARIOS ROLES
// PAIS EN DATOS PERSONALES (PROMOS Y RELANZAMIENTO)
// EJE: PREVENTIVA / CORRECTIVA / CALIBRACION / REVISION — SIN 400 H DE PILOTO
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
// TIPOS DE TRABAJO — CARD PROPIA — DOS COLUMNAS
// ==========================================
const SERVICOS_MANUTENCAO = [
  'preventiva',
  'corretiva',
  'diagnostico',
  'calibracao',
  'motores',
  'placas',
  'baterias',
  'firmware',
  'estrutura',
  'cameras',
  'campo',
];

// ==========================================
// EQUIPOS / MARCAS QUE ATIENDE — CARD PROPIA — DOS COLUMNAS
// ==========================================
const MARCAS_DRONE = [
  'dji',
  'autel',
  'skydio',
  'parrot',
  'fimi',
  'agricolas',
  'fpv',
  'outras',
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

export default function CadastroManutencao({
  tecnicoParaEditar = null,
  onSalvar,
  onCancelar,
  setCurrentView,
}) {
  const { t } = useTranslation('translation', { i18n: i18nDrones });
  const { user } = useAuth();
  const isEditing = Boolean(tecnicoParaEditar);

  // ==========================================
  // SSO PORTAL: NOMBRE Y EMAIL SOLO LECTURA
  // ==========================================
  const nomeSso =
    (user && (user.nomeCompleto || user.nome)) ||
    (tecnicoParaEditar && tecnicoParaEditar.nomeCompleto) ||
    '';
  const emailSso =
    (user && user.email) ||
    (tecnicoParaEditar && tecnicoParaEditar.email) ||
    '';

  // ==========================================
  // PRELLENO PAIS: PORTAL → SESION SIMULADOR → BR
  // ==========================================
  const paisInicial = (() => {
    if (tecnicoParaEditar && tecnicoParaEditar.pais) return tecnicoParaEditar.pais;
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
      (tecnicoParaEditar && tecnicoParaEditar.claveDrones)
  );

  const [formData, setFormData] = useState(
    tecnicoParaEditar || {
      nomeCompleto: nomeSso,
      email: emailSso,
      nomeProfissional: '',
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
      marcas: [],
      certificacoes: '',
      anosExperiencia: '',
      experienciasCampo: '',
      atendeEmCampo: true,
      possuiOficina: false,
      enderecoOficina: '',
      prazoMedio: '',
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
    (tecnicoParaEditar && (tecnicoParaEditar.fotoUrl || tecnicoParaEditar.foto)) || null
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
  // PREFIJO M = MANTENIMIENTO
  // ==========================================
  const generarCodigoCadastro = (dataNasc) => {
    const tipo = 'M';
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
    if ((formData.servicos || []).length === 0) {
      setErroForm(t('cadastroManutencao.erroServicos'));
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
      tipo: 'manutencao',
      listaDestino: 'manutencao',
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
            ? t('cadastroManutencao.tituloEditar')
            : t('cadastroManutencao.titulo')}
        </h2>
        <p>{t('cadastroManutencao.subtitulo')}</p>
      </div>

      {/* ==========================================
          VERACIDAD + LEYENDA INFORMATIVA
          ========================================== */}
      <div className="aviso-box">
        <strong>{t('cadastroManutencao.veracidadTitulo')}</strong>
        <p>{t('cadastroManutencao.veracidadTexto')}</p>
      </div>
      <div className="aviso-box">
        <strong>{t('cadastroManutencao.leyendaTitulo')}</strong>
        <p>{t('cadastroManutencao.leyendaTexto')}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1. DATOS PERSONALES + PAIS + SSO */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque1')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroManutencao.nomePortal')}</label>
              <input type="text" value={nomeSso || formData.nomeCompleto} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.emailPortal')}</label>
              <input type="email" value={emailSso || formData.email} readOnly />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.nomeProfissional')}</label>
              <input
                type="text"
                name="nomeProfissional"
                value={formData.nomeProfissional}
                onChange={handleChange}
                placeholder={t('cadastroManutencao.nomeProfissionalPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.dataNascimento')} *</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.pais')} *</label>
              <select name="pais" value={formData.pais} onChange={handleChange} required>
                {paisOptions.map((p) => (
                  <option key={p.code} value={p.code}>
                    {t(`cadastroManutencao.${p.labelKey}`)}
                    {p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.foto')}</label>
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
                {t('cadastroManutencao.crearClave')}
              </label>
            )}
          </div>
        </section>

        {/* 2. CONTACTO Y DIRECCION */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque2')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroManutencao.telefone1')} *</label>
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
              <label>{t('cadastroManutencao.telefone2')}</label>
              <input
                type="tel"
                name="telefone2"
                value={formData.telefone2}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.telegram')}</label>
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
                {t('cadastroManutencao.cep')}
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
              <label>{t('cadastroManutencao.logradouro')} *</label>
              <input
                type="text"
                name="logradouro"
                value={formData.endereco.logradouro}
                onChange={handleEnderecoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.cidade')} *</label>
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
                <label>{t('cadastroManutencao.estado')} *</label>
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

        {/* 3. TIPOS DE TRABAJO — CARD PROPIA */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque3')}</h3>
          <p className="help-text">{t('cadastroManutencao.servicosAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {SERVICOS_MANUTENCAO.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.servicos || []).includes(key)}
                  onChange={() => handleArrayToggle('servicos', key)}
                />
                {t(`cadastroManutencao.serv.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 4. EQUIPOS QUE ATIENDE — CARD PROPIA */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque4')}</h3>
          <p className="help-text">{t('cadastroManutencao.marcasAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MARCAS_DRONE.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.marcas || []).includes(key)}
                  onChange={() => handleArrayToggle('marcas', key)}
                />
                {t(`cadastroManutencao.marca.${key}`)}
              </label>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICACIONES Y EXPERIENCIA — SIN 400 H */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque5')}</h3>
          <p className="help-text">{t('cadastroManutencao.expAyuda')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroManutencao.anosExperiencia')}</label>
              <input
                type="number"
                min="0"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.certificacoes')}</label>
              <textarea
                name="certificacoes"
                rows="2"
                value={formData.certificacoes}
                onChange={handleChange}
                placeholder={t('cadastroManutencao.certificacoesPh')}
              />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.experienciasCampo')}</label>
              <textarea
                name="experienciasCampo"
                rows="3"
                value={formData.experienciasCampo}
                onChange={handleChange}
                placeholder={t('cadastroManutencao.experienciasPh')}
              />
            </div>
          </div>
        </section>

        {/* 6. CONDICIONES DE ATENCION + MODALIDADES */}
        <section className="form-section">
          <h3>{t('cadastroManutencao.bloque6')}</h3>
          <p className="help-text">{t('cadastroManutencao.modalidadesAyuda')}</p>
          <div className="checkbox-group checkbox-group-2col">
            {MODALIDADES.map((key) => (
              <label key={key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.modalidades || []).includes(key)}
                  onChange={() => handleArrayToggle('modalidades', key)}
                />
                {t(`cadastroManutencao.mod.${key}`)}
              </label>
            ))}
          </div>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="atendeEmCampo"
              checked={formData.atendeEmCampo}
              onChange={handleChange}
            />
            {t('cadastroManutencao.atendeEmCampo')}
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="possuiOficina"
              checked={formData.possuiOficina}
              onChange={handleChange}
            />
            {t('cadastroManutencao.possuiOficina')}
          </label>
          {formData.possuiOficina && (
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.enderecoOficina')}</label>
              <input
                type="text"
                name="enderecoOficina"
                value={formData.enderecoOficina}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <label>{t('cadastroManutencao.prazoMedio')}</label>
            <input
              type="text"
              name="prazoMedio"
              value={formData.prazoMedio}
              onChange={handleChange}
              placeholder={t('cadastroManutencao.prazoMedioPh')}
            />
          </div>
        </section>

        {/* 7. REGION UF — SOLO BRASIL */}
        {esBrasil && (
          <section className="form-section">
            <h3>{t('cadastroManutencao.bloque7')}</h3>
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
          <h3>{t('cadastroManutencao.bloque8')}</h3>
          <p className="help-text">{t('cadastroManutencao.panelNota')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroManutencao.horario')}</label>
              <input
                type="text"
                name="horarioAtendimento"
                value={formData.horarioAtendimento}
                onChange={handleChange}
                placeholder={t('cadastroManutencao.horarioPh')}
              />
            </div>
            <div className="form-group">
              <label>{t('cadastroManutencao.notaFiscal')}</label>
              <select
                name="emiteNotaFiscal"
                value={formData.emiteNotaFiscal}
                onChange={handleChange}
              >
                <option value="Sim">{t('cadastroManutencao.nfSim')}</option>
                <option value="Não">{t('cadastroManutencao.nfNao')}</option>
              </select>
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.formasPago')}</label>
              <div className="checkbox-group checkbox-group-2col">
                {FORMAS_PAGO.map((key) => (
                  <label key={key} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(formData.formasPagamento || []).includes(key)}
                      onChange={() => handleArrayToggle('formasPagamento', key)}
                    />
                    {t(`cadastroManutencao.pago.${key}`)}
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
              {t('cadastroManutencao.propuestasEmail')}
            </label>
            <label className="checkbox-item full-width">
              <input
                type="checkbox"
                name="contactoComercialAmplio"
                checked={formData.contactoComercialAmplio}
                onChange={handleChange}
              />
              {t('cadastroManutencao.contactoAmplio')}
            </label>
            <div className="form-group full-width">
              <label>{t('cadastroManutencao.observacoes')}</label>
              <textarea
                name="observacoesParticulares"
                rows="3"
                value={formData.observacoesParticulares}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <p className="help-text">{t('cadastroManutencao.leyendaFinal')}</p>
        {erroForm && <p className="erro">{erroForm}</p>}

        {/* CTA ANCHO + VOLVER ABAJO A LA DERECHA */}
        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {isEditing
              ? t('cadastroManutencao.ctaEditar')
              : t('cadastroManutencao.ctaFinalizar')}
          </button>
          <button type="button" className="btn-volver-inicio" onClick={handleVolver}>
            {t('cadastroUsuario.volver')}
          </button>
        </div>
      </form>

      {cadastroResultado && (
        <div className="success-card">
          <h3>{t('cadastroManutencao.enviado')}</h3>
          <p>{t('cadastroManutencao.codigo')}</p>
          <div className="code-badge">{cadastroResultado.codigoRegistro}</div>
        </div>
      )}
    </div>
  );
}
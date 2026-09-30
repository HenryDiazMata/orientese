// ==========================================
// ARCHIVO: src/components/drones/formularios/CadastroAnunciante.jsx
// Ficha: crear anuncio o patrocinio
// Reserva: recuadro propio (cajaReserva) — editar ahí la leyenda
// ==========================================

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CadastroForm.css';
import {
  PAGINAS_VITRINA,
  PAISES_VITRINA,
  ESTADOS_BRASIL,
  PASOS_DURACION_DIAS,
  PRECIO_REF,
  MAX_ESPACIOS_POR_PAGINA,
  MAX_PATROCINADORES_POR_PAGINA,
  calcularValorReferencia,
  etiquetaDuracion,
  etiquetaEspacio,
  formatUSD,
} from './anunciantesPaginas';

// ==========================================
// LEYENDA / CASILLA «RESERVAR ESPACIO»
// EDITA AQUÍ: color de fondo, borde, letra, padding
// El TEXTO sale de es.json / pt-BR.json
//   cadastroAnunciante.reservarEspacio
//   cadastroAnunciante.reservarAyuda
//   cadastroAnunciante.ctaReserva
// ==========================================
const cajaReserva = {
  background: '#E8F6FC',
  border: '2px solid #1A8FD0',
  borderRadius: 12,
  padding: '14px 16px',
  margin: '12px 0 16px 0',
};

const textoReserva = {
  fontWeight: 800,
  fontSize: '1.05rem',
  color: '#0f172a',
  letterSpacing: 0.2,
};

export default function CadastroAnunciante({ onSalvar, onCancelar }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    modalidade: 'anunciante',
    tipoPersona: 'juridica',
    nome: '',
    pais: 'BR',
    estado: 'SP',
    cidade: '',
    website: '',
    email: '',
    telefone: '',
    whatsapp: '',
    telegram: '',
    resumo: '',
    paginas: ['anunciantes'],
    dias: 30,
    espacioPreferido: 0,
    logoPreview: null,
    reservaPostBeta: true,
  });
  const [erro, setErro] = useState('');

  const esBrasil = formData.pais === 'BR';
  const esPJ = formData.tipoPersona === 'juridica';
  const pagsCount = (formData.paginas || []).length;
  const idsTodas = PAGINAS_VITRINA.map((p) => p.id);
  const todasMarcadas = idsTodas.every((id) => (formData.paginas || []).includes(id));

  const valorRef = useMemo(
    () =>
      calcularValorReferencia({
        modalidade: formData.modalidade,
        paginasCount: pagsCount,
        dias: formData.dias,
      }),
    [formData.modalidade, pagsCount, formData.dias]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'dias' || name === 'espacioPreferido' ? Number(value) : value,
    }));
  };

  const togglePagina = (id) => {
    setFormData((prev) => {
      const tiene = (prev.paginas || []).includes(id);
      const paginas = tiene
        ? prev.paginas.filter((p) => p !== id)
        : [...prev.paginas, id];
      if (paginas.length === 0) return prev;
      return { ...prev, paginas };
    });
  };

  const toggleTodas = () => {
    setFormData((prev) => ({
      ...prev,
      paginas: todasMarcadas ? ['anunciantes'] : [...idsTodas],
    }));
  };

  const toggleReserva = () => {
    setFormData((prev) => ({
      ...prev,
      reservaPostBeta: !prev.reservaPostBeta,
    }));
  };

  const handleLogo = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        logoPreview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.cidade.trim() || !formData.email.trim()) {
      setErro(t('cadastroAnunciante.erroObligatorios'));
      return;
    }
    if ((formData.paginas || []).length === 0) {
      setErro(t('cadastroAnunciante.erroPaginas'));
      return;
    }
    if (!formData.whatsapp.trim() && !formData.telefone.trim()) {
      setErro(t('cadastroAnunciante.erroContacto'));
      return;
    }
    setErro('');
    const agora = Date.now();
    const registro = {
      ...formData,
      segmento: '',
      id: agora,
      valorReferenciaUSD: valorRef.usd,
      valorReferenciaBRL: valorRef.brl,
      moedaReferencia: PRECIO_REF.moneda,
      dataInicio: new Date(agora).toISOString(),
      dataFim: new Date(agora + Number(formData.dias) * 86400000).toISOString(),
      origem: 'local',
      status: formData.reservaPostBeta ? 'reserva-beta' : 'beta-local',
    };
    if (typeof onSalvar === 'function') onSalvar(registro);
  };

  return (
    <div className="cadastro-container">
      {typeof onCancelar === 'function' && (
        <div className="cadastro-header-nav">
          <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
            {t('cadastroAnunciante.volver')}
          </button>
        </div>
      )}

      <div className="cadastro-header">
        <h2>{t('cadastroAnunciante.titulo')}</h2>
        <p>{t('cadastroAnunciante.subtitulo')}</p>
      </div>

      <div className="aviso-box">
        <strong>{t('cadastroAnunciante.avisoTitulo', { max: MAX_ESPACIOS_POR_PAGINA })}</strong>
        <p>{t('cadastroAnunciante.avisoTexto', { maxPatro: MAX_PATROCINADORES_POR_PAGINA })}</p>
      </div>

      <div className="aviso-box" style={{ background: '#E8F6FC', borderColor: '#1A8FD0' }}>
        <strong>
          {formData.modalidade === 'patrocinador'
            ? t('cadastroAnunciante.patrocinio')
            : t('cadastroAnunciante.anuncio')}
          {' · '}
          {etiquetaDuracion(formData.dias)}
          {' · '}
          {pagsCount}{' '}
          {pagsCount === 1
            ? t('cadastroAnunciante.paginaUna')
            : t('cadastroAnunciante.paginasVarias')}
          {formData.reservaPostBeta ? ` · ${t('cadastroAnunciante.reservarBadge')}` : ''}
        </strong>
        <p style={{ margin: '6px 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#1A8FD0' }}>
          {formatUSD(valorRef.usd)}{' '}
          <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
            {t('cadastroAnunciante.aproxBrl', { brl: valorRef.brl })}
          </span>
        </p>
        <p className="help-text" style={{ marginTop: 6 }}>
          {t('anunciantes.leyendaPrecio')}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque1')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAnunciante.quiero')}</label>
              <select name="modalidade" value={formData.modalidade} onChange={handleChange}>
                <option value="anunciante">{t('cadastroAnunciante.opAnuncio')}</option>
                <option value="patrocinador">{t('cadastroAnunciante.opPatrocinio')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.tipoPersona')}</label>
              <select name="tipoPersona" value={formData.tipoPersona} onChange={handleChange}>
                <option value="juridica">{t('cadastroAnunciante.personaJuridica')}</option>
                <option value="fisica">{t('cadastroAnunciante.personaFisica')}</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque2')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{esPJ ? t('cadastroAnunciante.razon') : t('cadastroAnunciante.nome')}</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroAnunciante.logo')}</label>
              <input type="file" accept="image/*" onChange={handleLogo} />
              {formData.logoPreview && (
                <img src={formData.logoPreview} alt="" className="preview-photo" />
              )}
            </div>
            <div className="form-group full-width">
              <label>{t('cadastroAnunciante.ofrece')}</label>
              <textarea
                name="resumo"
                rows="3"
                value={formData.resumo}
                onChange={handleChange}
                placeholder={t('cadastroAnunciante.ofrecePh')}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque3')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAnunciante.pais')}</label>
              <select name="pais" value={formData.pais} onChange={handleChange}>
                {PAISES_VITRINA.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.label}{p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.cidade')}</label>
              <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />
            </div>
            {esBrasil && (
              <div className="form-group">
                <label>{t('cadastroAnunciante.estado')}</label>
                <select name="estado" value={formData.estado} onChange={handleChange}>
                  {ESTADOS_BRASIL.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </section>

        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque4')}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAnunciante.site')}</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.email')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.telefone')}</label>
              <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="11999999999" />
            </div>
            <div className="form-group">
              <label>Telegram</label>
              <input type="text" name="telegram" value={formData.telegram} onChange={handleChange} placeholder="@usuario" />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque5Libre')}</h3>
          <p className="help-text">
            {t('cadastroAnunciante.bloque5AyudaLibre', {
              n: pagsCount,
              total: idsTodas.length,
            })}
          </p>

          <div style={cajaReserva}>
            <label className="checkbox-item" style={textoReserva}>
              <input
                type="checkbox"
                checked={!!formData.reservaPostBeta}
                onChange={toggleReserva}
              />
              {t('cadastroAnunciante.reservarEspacio')}
            </label>
            <p className="help-text" style={{ margin: '8px 0 0 0' }}>
              {t('cadastroAnunciante.reservarAyuda')}
            </p>
          </div>

          <div className="checkbox-group checkbox-group-2col">
            <label className="checkbox-item">
              <input type="checkbox" checked={todasMarcadas} onChange={toggleTodas} />
              {t('cadastroAnunciante.todasPaginas')}
            </label>
            {PAGINAS_VITRINA.map((p) => {
              const marcada = (formData.paginas || []).includes(p.id);
              return (
                <label key={p.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={marcada}
                    onChange={() => togglePagina(p.id)}
                  />
                  {p.label}
                </label>
              );
            })}
          </div>
        </section>

        <section className="form-section">
          <h3>{t('cadastroAnunciante.bloque6')}</h3>
          <p className="help-text">{t('cadastroAnunciante.bloque6Ayuda')}</p>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('cadastroAnunciante.espacioPref')}</label>
              <select name="espacioPreferido" value={formData.espacioPreferido} onChange={handleChange}>
                <option value={0}>{t('cadastroAnunciante.espacioLibre')}</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{etiquetaEspacio(n)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.duracion')}</label>
              <select name="dias" value={formData.dias} onChange={handleChange}>
                {PASOS_DURACION_DIAS.map((d) => (
                  <option key={d} value={d}>{etiquetaDuracion(d)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('cadastroAnunciante.valorRef')}</label>
              <input
                type="text"
                readOnly
                value={`${formatUSD(valorRef.usd)}  ·  ≈ R$ ${valorRef.brl}`}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <caption style={{ textAlign: 'left', fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>
                {t('cadastroAnunciante.tablaTitulo')}
              </caption>
              <thead>
                <tr style={{ background: '#BFE8F7', textAlign: 'left' }}>
                  <th style={thTd}>{t('cadastroAnunciante.thTipo')}</th>
                  <th style={thTd}>{t('cadastroAnunciante.th30')}</th>
                  <th style={thTd}>{t('cadastroAnunciante.thExtra')}</th>
                  <th style={thTd}>{t('cadastroAnunciante.thPlazos')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={thTd}>{t('cadastroAnunciante.thAnunciante')}</td>
                  <td style={thTd}>{formatUSD(PRECIO_REF.anunciante.base30d)}</td>
                  <td style={thTd}>+ {formatUSD(PRECIO_REF.anunciante.paginaExtra)}</td>
                  <td style={thTd} rowSpan={2}>{t('cadastroAnunciante.thPlazosValor')}</td>
                </tr>
                <tr>
                  <td style={thTd}>{t('cadastroAnunciante.thPatrocinador')}</td>
                  <td style={thTd}>{formatUSD(PRECIO_REF.patrocinador.base30d)}</td>
                  <td style={thTd}>+ {formatUSD(PRECIO_REF.patrocinador.paginaExtra)}</td>
                </tr>
              </tbody>
            </table>
            <p className="help-text" style={{ marginTop: 8 }}>
              {t('anunciantes.leyendaPrecio')}
            </p>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {formData.reservaPostBeta
              ? t('cadastroAnunciante.ctaReserva')
              : t('cadastroAnunciante.cta')}
          </button>
          {typeof onCancelar === 'function' && (
            <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
              {t('cadastroAnunciante.cancelar')}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const thTd = {
  border: '1px solid #cbd5e1',
  padding: '8px 10px',
  verticalAlign: 'top',
};
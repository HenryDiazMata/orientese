// ==========================================
// ARCHIVO COMPLETO:
// src/components/drones/formularios/CadastroAnunciante.jsx
// FICHA: CREAR ANUNCIO O PATROCINIO
// NO COBRA. VALOR = REFERENCIA BETA
// UI CLARA — CadastroForm.css
// MAX 6 ESPACIOS PUBLICITARIOS POR PAGINA
// MAX 6 PAGINAS DESTINO POR AVISO
// PATROCINIO = DESTAQUE (ORDEN 1-2 + BORDE), NO EXCLUSIVIDAD
// ==========================================

import React, { useMemo, useState } from 'react';
import './CadastroForm.css';
import {
  PAGINAS_VITRINA,
  PAISES_VITRINA,
  ESTADOS_BRASIL,
  PASOS_DURACION_DIAS,
  PRECIO_REF,
  LEYENDA_PRECIO,
  MAX_ESPACIOS_POR_PAGINA,
  MAX_PATROCINADORES_POR_PAGINA,
  calcularValorReferencia,
  etiquetaDuracion,
  etiquetaEspacio,
  formatUSD,
} from './anunciantesPaginas';

export default function CadastroAnunciante({ onSalvar, onCancelar }) {
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
  });
  const [erro, setErro] = useState('');

  const esBrasil = formData.pais === 'BR';
  const esPJ = formData.tipoPersona === 'juridica';
  const pagsCount = (formData.paginas || []).length;

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
      if (!tiene && (prev.paginas || []).length >= MAX_ESPACIOS_POR_PAGINA) {
        return prev;
      }
      const paginas = tiene
        ? prev.paginas.filter((p) => p !== id)
        : [...prev.paginas, id];
      return { ...prev, paginas };
    });
  };

  const handleLogo = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      logoPreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.cidade.trim() || !formData.email.trim()) {
      setErro('Preencha nome / razão social, cidade e e-mail.');
      return;
    }
    if ((formData.paginas || []).length === 0) {
      setErro('Escolha ao menos uma página para o aviso.');
      return;
    }
    if ((formData.paginas || []).length > MAX_ESPACIOS_POR_PAGINA) {
      setErro(`No máximo ${MAX_ESPACIOS_POR_PAGINA} páginas por aviso.`);
      return;
    }
    if (!formData.whatsapp.trim() && !formData.telefone.trim()) {
      setErro('Informe telefone ou WhatsApp para contato.');
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
      status: 'beta-local',
    };
    if (typeof onSalvar === 'function') onSalvar(registro);
  };

  return (
    <div className="cadastro-container">
      {typeof onCancelar === 'function' && (
        <div className="cadastro-header-nav">
          <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
            Voltar à vitrine
          </button>
        </div>
      )}

      <div className="cadastro-header">
        <h2>Criar anúncio ou patrocínio</h2>
        <p>
          Vitrine informativa. O valor é referência de beta — este hub não cobra agora.
          Contato direto com a marca. Sem intermediação.
        </p>
      </div>

      <div className="aviso-box">
        <strong>{MAX_ESPACIOS_POR_PAGINA} espaços publicitários por página</strong>
        <p>
          Ordem de leitura: 3 colunas × 2 filas em tela larga. Patrocínio tem prioridade
          nos espaços 1 e 2 (máx. {MAX_PATROCINADORES_POR_PAGINA} por página) e badge visual.
          Se o número preferido estiver ocupado, vai para o próximo livre.
        </p>
      </div>

      {/* BARRA DE VALOR EN VIVO */}
      <div className="aviso-box" style={{ background: '#E8F6FC', borderColor: '#1A8FD0' }}>
        <strong>
          {formData.modalidade === 'patrocinador' ? 'Patrocínio' : 'Anúncio'}
          {' · '}
          {etiquetaDuracion(formData.dias)}
          {' · '}
          {pagsCount} {pagsCount === 1 ? 'página' : 'páginas'}
        </strong>
        <p style={{ margin: '6px 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#1A8FD0' }}>
          {formatUSD(valorRef.usd)}{' '}
          <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>
            (≈ R$ {valorRef.brl} no câmbio ref. · não cobrado)
          </span>
        </p>
        <p className="help-text" style={{ marginTop: 6 }}>{LEYENDA_PRECIO}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>1. Modalidade</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Quero *</label>
              <select name="modalidade" value={formData.modalidade} onChange={handleChange}>
                <option value="anunciante">Anúncio (card padrão)</option>
                <option value="patrocinador">Patrocínio (destaque, espaços 1–2)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de pessoa *</label>
              <select name="tipoPersona" value={formData.tipoPersona} onChange={handleChange}>
                <option value="juridica">Pessoa jurídica</option>
                <option value="fisica">Pessoa física</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>2. Identificação</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{esPJ ? 'Razão social *' : 'Nome *'}</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
              <label>Logo / imagem da marca</label>
              <input type="file" accept="image/*" onChange={handleLogo} />
              {formData.logoPreview && (
                <img src={formData.logoPreview} alt="" className="preview-photo" />
              )}
            </div>
            <div className="form-group full-width">
              <label>O que oferece</label>
              <textarea
                name="resumo"
                rows="3"
                value={formData.resumo}
                onChange={handleChange}
                placeholder="Produtos ou serviços. Sem preços obrigatórios."
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>3. País e local</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>País *</label>
              <select name="pais" value={formData.pais} onChange={handleChange}>
                {PAISES_VITRINA.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.label}{p.moeda ? ` (${p.moeda})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Cidade *</label>
              <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />
            </div>
            {esBrasil && (
              <div className="form-group">
                <label>Estado (UF) *</label>
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
          <h3>4. Contato e links</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Site oficial</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
            </div>
            <div className="form-group">
              <label>E-mail *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefone</label>
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
          <h3>5. Onde publicar (máx. {MAX_ESPACIOS_POR_PAGINA} páginas)</h3>
          <p className="help-text">
            Diretórios e telas do hub. O aviso sai na vitrine e em cada página marcada.
            {pagsCount}/{MAX_ESPACIOS_POR_PAGINA} selecionadas.
          </p>
          <div className="checkbox-group checkbox-group-2col">
            {PAGINAS_VITRINA.map((p) => {
              const marcada = (formData.paginas || []).includes(p.id);
              const bloqueada = !marcada && pagsCount >= MAX_ESPACIOS_POR_PAGINA;
              return (
                <label key={p.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={marcada}
                    disabled={bloqueada}
                    onChange={() => togglePagina(p.id)}
                  />
                  {p.label}
                </label>
              );
            })}
          </div>
        </section>

        <section className="form-section">
          <h3>6. Espaço preferido, prazo e preço vigente</h3>
          <p className="help-text">
            Ordem de leitura; em tela larga: 3 colunas × 2 filas. Não é posição fixa de impressão.
          </p>
          <div className="form-grid">
            <div className="form-group">
              <label>Espaço publicitário preferido</label>
              <select name="espacioPreferido" value={formData.espacioPreferido} onChange={handleChange}>
                <option value={0}>Próximo livre (recomendado)</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{etiquetaEspacio(n)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Duração *</label>
              <select name="dias" value={formData.dias} onChange={handleChange}>
                {PASOS_DURACION_DIAS.map((d) => (
                  <option key={d} value={d}>{etiquetaDuracion(d)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Valor de referência (não cobrado)</label>
              <input type="text" readOnly value={`${formatUSD(valorRef.usd)}  ·  ≈ R$ ${valorRef.brl}`} />
            </div>
          </div>

          {/* TABLA PRECIOS VIGENTES */}
          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <caption style={{ textAlign: 'left', fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>
                PREÇOS VIGENTES — ESPAÇOS PUBLICITÁRIOS (USD)
              </caption>
              <thead>
                <tr style={{ background: '#BFE8F7', textAlign: 'left' }}>
                  <th style={thTd}>Tipo</th>
                  <th style={thTd}>30 dias / 1 página</th>
                  <th style={thTd}>Página extra</th>
                  <th style={thTd}>Prazos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={thTd}>Anunciante</td>
                  <td style={thTd}>{formatUSD(PRECIO_REF.anunciante.base30d)}</td>
                  <td style={thTd}>+ {formatUSD(PRECIO_REF.anunciante.paginaExtra)}</td>
                  <td style={thTd} rowSpan={2}>30 · 90 · 180 · 365 dias (pró-rata sobre 30)</td>
                </tr>
                <tr>
                  <td style={thTd}>Patrocinador</td>
                  <td style={thTd}>{formatUSD(PRECIO_REF.patrocinador.base30d)}</td>
                  <td style={thTd}>+ {formatUSD(PRECIO_REF.patrocinador.paginaExtra)}</td>
                </tr>
              </tbody>
            </table>
            <p className="help-text" style={{ marginTop: 8 }}>{LEYENDA_PRECIO}</p>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            CRIAR ANÚNCIO OU PATROCÍNIO
          </button>
          {typeof onCancelar === 'function' && (
            <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
              Cancelar
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

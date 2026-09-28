// ==========================================
// CADASTROANUNCIANTE.JSX
// FICHA INFORMATIVA DE ANUNCIANTE / PATROCINADOR
// NO COBRA. VALOR = REFERENCIA BETA
// UI CLARA — CadastroForm.css
// MAX 6 HUECOS POR PAGINA = REGLA DE PUBLICACION, NO DEL FORM
// ==========================================

import React, { useMemo, useState } from 'react';
import './CadastroForm.css';
import {
  PAGINAS_VITRINA,
  PAISES_VITRINA,
  ESTADOS_BRASIL,
  PASOS_DURACION_DIAS,
  PRECIO_REF,
  calcularValorReferencia,
  etiquetaDuracion,
} from './anunciantesPaginas';

export default function CadastroAnunciante({ onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    modalidade: 'anunciante',
    tipoPersona: 'juridica',
    nome: '',
    segmento: '',
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
    logoPreview: null,
  });
  const [erro, setErro] = useState('');

  const esBrasil = formData.pais === 'BR';

  const valorRef = useMemo(
    () =>
      calcularValorReferencia({
        modalidade: formData.modalidade,
        paginasCount: (formData.paginas || []).length,
        dias: formData.dias,
      }),
    [formData.modalidade, formData.paginas, formData.dias]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePagina = (id) => {
    setFormData((prev) => {
      const tiene = (prev.paginas || []).includes(id);
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
      setErro('Preencha nome, cidade e e-mail.');
      return;
    }
    if ((formData.paginas || []).length === 0) {
      setErro('Escolha ao menos uma página para o aviso.');
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
      id: agora,
      valorReferenciaBRL: valorRef,
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
        <h2>Publicar anúncio ou patrocínio</h2>
        <p>
          Vitrine informativa. O valor abaixo é só referência de beta — este hub não cobra agora.
        </p>
      </div>

      <div className="aviso-box">
        <strong>6 vagas por página</strong>
        <p>
          Cada página do portal reserva no máximo {6} espaços. A ordem e a vigência saem deste
          formulário (datas de início e fim).
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>1. Modalidade</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Quero *</label>
              <select name="modalidade" value={formData.modalidade} onChange={handleChange}>
                <option value="anunciante">Anunciar (card padrão)</option>
                <option value="patrocinador">Patrocinar (destaque)</option>
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
              <label>{formData.tipoPersona === 'juridica' ? 'Razão / nome comercial *' : 'Nome *'}</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Segmento</label>
              <input
                type="text"
                name="segmento"
                value={formData.segmento}
                onChange={handleChange}
                placeholder="Peças, seguro, software, treino..."
              />
            </div>
            <div className="form-group full-width">
              <label>Logo / imagem da empresa</label>
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
                placeholder="Produtos ou serviços, sem preços obrigatórios."
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
          <h3>5. Onde publicar (máx. 6 por página no ar)</h3>
          <p className="help-text">Marque as telas do hub. Sujeito a vaga no período escolhido.</p>
          <div className="checkbox-group checkbox-group-2col">
            {PAGINAS_VITRINA.map((p) => (
              <label key={p.id} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={(formData.paginas || []).includes(p.id)}
                  onChange={() => togglePagina(p.id)}
                />
                {p.label}
              </label>
            ))}
          </div>
        </section>

        <section className="form-section">
          <h3>6. Tempo e valor de referência</h3>
          <div className="form-grid">
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
              <input type="text" readOnly value={`R$ ${valorRef}`} />
            </div>
          </div>
          <p className="help-text">
            Base 30 dias / 1 página: anunciante R$ {PRECIO_REF.anunciante.base30d} · patrocinador R$ {PRECIO_REF.patrocinador.base30d}.
            Página extra: R$ {PRECIO_REF.anunciante.paginaExtra} / R$ {PRECIO_REF.patrocinador.paginaExtra}.
            Passos de tempo: 15 · 30 · 90 · 180 · 365 dias. Checkout fica para outro momento.
          </p>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">Publicar na vitrine (beta)</button>
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

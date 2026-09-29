// ==========================================
// ARCHIVO COMPLETO:
// src/components/drones/formularios/CadastroVenta.jsx
// ALTA DE ITEM EN VENTA (DRONE / PECA / ACESSORIO)
// NO ES CADASTRO DE MARCA. SIN PLAZOS DE ANUNCIO
// UI: CadastroForm.css — SIN DARK
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18nDrones from '../i18n';
import './CadastroForm.css';
import {
  CATEGORIAS_VENTA,
  CONDICOES_VENTA,
  ESTADOS_BRASIL_VENTA,
} from '../../../data/drones/ventasDatos';

export default function CadastroVenta({ onSalvar, onCancelar }) {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'drone',
    condicao: 'usado',
    preco: '',
    pais: 'BR',
    estado: 'SP',
    cidade: '',
    descricao: '',
    email: '',
    telefone: '',
    whatsapp: '',
    fotoPreview: null,
  });
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      fotoPreview: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.cidade.trim()) {
      setErro(
        t('ventas.erroTituloCidade', {
          defaultValue: 'Preencha título do item e cidade.',
        })
      );
      return;
    }
    const precoNum = Number(String(formData.preco).replace(',', '.'));
    if (!Number.isFinite(precoNum) || precoNum < 0) {
      setErro(t('ventas.erroPreco', { defaultValue: 'Informe um preço válido.' }));
      return;
    }
    if (!formData.whatsapp.trim() && !formData.telefone.trim() && !formData.email.trim()) {
      setErro(
        t('ventas.erroContato', {
          defaultValue: 'Informe e-mail, telefone ou WhatsApp para contato direto.',
        })
      );
      return;
    }
    setErro('');
    const agora = Date.now();
    const registro = {
      ...formData,
      preco: precoNum,
      moeda: 'BRL',
      id: agora,
      origem: 'local',
      status: 'publicado',
      createdAt: new Date(agora).toISOString(),
    };
    if (typeof onSalvar === 'function') onSalvar(registro);
  };

  return (
    <div className="cadastro-container">
      {typeof onCancelar === 'function' && (
        <div className="cadastro-header-nav">
          <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
            {t('ventas.voltar', { defaultValue: 'Voltar ao tabuleiro' })}
          </button>
        </div>
      )}

      <div className="cadastro-header">
        <h2>{t('ventas.formTitulo', { defaultValue: 'Cadastrar item' })}</h2>
        <p>
          {t('ventas.formSub', {
            defaultValue:
              'Liste um drone, peça ou acessório. O hub não intermedia a venda. O contato é direto com quem anuncia o item.',
          })}
        </p>
      </div>

      <div className="aviso-box">
        <strong>
          {t('ventas.avisoMarca', { defaultValue: 'Não é anúncio de marca' })}
        </strong>
        <p>
          {t('ventas.avisoMarcaTexto', {
            defaultValue:
              'Quer visibilidade da marca no hub, não um equipamento? Volte ao tabuleiro e use o atalho para anúncio ou patrocínio.',
          })}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h3>{t('ventas.bloqueItem', { defaultValue: '1. Item' })}</h3>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>{t('ventas.labelTitulo', { defaultValue: 'Título *' })}</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                placeholder={t('ventas.phTitulo', { defaultValue: 'Ex.: DJI Mini 4 Pro' })}
              />
            </div>
            <div className="form-group">
              <label>{t('ventas.labelCategoria', { defaultValue: 'Categoria *' })}</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange}>
                {CATEGORIAS_VENTA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(`ventas.cat.${c.id}`, { defaultValue: c.label })}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('ventas.labelCondicao', { defaultValue: 'Condição *' })}</label>
              <select name="condicao" value={formData.condicao} onChange={handleChange}>
                {CONDICOES_VENTA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(`ventas.cond.${c.id}`, { defaultValue: c.label })}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('ventas.labelPreco', { defaultValue: 'Preço (R$) *' })}</label>
              <input
                type="number"
                name="preco"
                min="0"
                step="0.01"
                value={formData.preco}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>{t('ventas.labelFoto', { defaultValue: 'Foto' })}</label>
              <input type="file" accept="image/*" onChange={handleFoto} />
              {formData.fotoPreview && (
                <img src={formData.fotoPreview} alt="" className="preview-photo" />
              )}
            </div>
            <div className="form-group full-width">
              <label>{t('ventas.labelDescricao', { defaultValue: 'Descrição' })}</label>
              <textarea
                name="descricao"
                rows="4"
                value={formData.descricao}
                onChange={handleChange}
                placeholder={t('ventas.phDescricao', {
                  defaultValue: 'Estado, incluso na venda, retirada ou envio.',
                })}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>{t('ventas.bloqueLocal', { defaultValue: '2. Local' })}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('ventas.labelCidade', { defaultValue: 'Cidade *' })}</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('ventas.labelEstado', { defaultValue: 'Estado (UF)' })}</label>
              <select name="estado" value={formData.estado} onChange={handleChange}>
                {ESTADOS_BRASIL_VENTA.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h3>{t('ventas.bloqueContato', { defaultValue: '3. Contato direto' })}</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>{t('ventas.labelEmail', { defaultValue: 'E-mail' })}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('ventas.labelTelefone', { defaultValue: 'Telefone' })}</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>{t('ventas.labelWhatsapp', { defaultValue: 'WhatsApp' })}</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder={t('ventas.phWhatsapp', { defaultValue: '11999999999' })}
              />
            </div>
          </div>
        </section>

        {erro && <p className="erro">{erro}</p>}

        <div className="cadastro-acciones-final">
          <button type="submit" className="btn-submit">
            {t('ventas.publicar', { defaultValue: 'PUBLICAR ITEM' })}
          </button>
          {typeof onCancelar === 'function' && (
            <button type="button" className="btn-volver-inicio" onClick={onCancelar}>
              {t('ventas.cancelar', { defaultValue: 'Cancelar' })}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
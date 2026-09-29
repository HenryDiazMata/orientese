// ==========================================
// ARCHIVO COMPLETO: src/views/drones/ventas.jsx
// TABLERO EN VENTA — NOVOS E USADOS
// NO ES ESPACIO PUBLICITARIO DE MARCA
// CONTACTO DIRECTO. EL HUB NO INTERMEDIA
// COMENTARIOS EN CASTELLANO Y MAYUSCULAS
// ==========================================

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/drones/AuthContext';
import i18nDrones from '../../components/drones/i18n';
import CadastroVenta from '../../components/drones/formularios/CadastroVenta.jsx';
import './css/ventas.css';
import {
  CATEGORIAS_VENTA,
  CONDICOES_VENTA,
  carregarItensVentas,
  formatPrecoBRL,
  guardarItemVenta,
} from '../../data/drones/ventasDatos';

export default function Ventas({ setCurrentView }) {
  const { t } = useTranslation(undefined, { i18n: i18nDrones });
  const { isAuthenticated } = useAuth();
  const [itens, setItens] = useState(() => carregarItensVentas());
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [cond, setCond] = useState('');
  const [ordem, setOrdem] = useState('recentes');
  const [sel, setSel] = useState(null);
  const [modoForm, setModoForm] = useState(false);

  // ==========================================
  // ETIQUETA I18N POR ID. NO USAR c.label FIJO
  // ==========================================
  const labelCat = (id) => t(`ventas.cat.${id}`, { defaultValue: id || '—' });
  const labelCond = (id) => t(`ventas.cond.${id}`, { defaultValue: id || '—' });

  const filtrados = useMemo(() => {
    const texto = q.trim().toLowerCase();
    let lista = itens.filter((it) => {
      if (cat && it.categoria !== cat) return false;
      if (cond && it.condicao !== cond) return false;
      if (!texto) return true;
      const blob = [it.titulo, it.cidade, it.estado, it.descricao]
        .join(' ')
        .toLowerCase();
      return blob.includes(texto);
    });
    if (ordem === 'menor') {
      lista = [...lista].sort((a, b) => Number(a.preco) - Number(b.preco));
    } else if (ordem === 'maior') {
      lista = [...lista].sort((a, b) => Number(b.preco) - Number(a.preco));
    } else {
      lista = [...lista].sort((a, b) =>
        String(b.createdAt).localeCompare(String(a.createdAt))
      );
    }
    return lista;
  }, [itens, q, cat, cond, ordem]);

  const irMarca = () => {
    if (typeof setCurrentView === 'function') setCurrentView('ANUNCIANTES');
  };

  const handleSalvar = (registro) => {
    guardarItemVenta(registro);
    setItens((prev) => [registro, ...prev]);
    setModoForm(false);
    setSel(registro);
  };

  if (modoForm) {
    return (
      <CadastroVenta
        onSalvar={handleSalvar}
        onCancelar={() => setModoForm(false)}
      />
    );
  }

  if (sel) {
    return (
      <div className="ventas-page">
        <button type="button" className="ventas-back" onClick={() => setSel(null)}>
          {t('ventas.voltar', { defaultValue: 'Voltar ao tabuleiro' })}
        </button>
        <article className="ventas-ficha">
          <div className="ventas-ficha-foto" aria-hidden="true">
            {sel.fotoPreview ? (
              <img src={sel.fotoPreview} alt="" />
            ) : (
              <span>{t('ventas.semFoto', { defaultValue: 'Sem foto' })}</span>
            )}
          </div>
          <div className="ventas-ficha-body">
            <div className="ventas-badges">
              <span className="ventas-badge">{labelCond(sel.condicao)}</span>
              <span className="ventas-badge is-cat">{labelCat(sel.categoria)}</span>
            </div>
            <h1>{sel.titulo}</h1>
            <p className="ventas-preco">{formatPrecoBRL(sel.preco)}</p>
            <p className="ventas-lugar">
              {sel.cidade}
              {sel.estado ? ` · ${sel.estado}` : ''}
            </p>
            <p className="ventas-desc">{sel.descricao}</p>
            <div className="ventas-contato">
              <h3>{t('ventas.contato', { defaultValue: 'Contato direto' })}</h3>
              {sel.whatsapp ? (
                <p>
                  {t('ventas.whatsapp', { defaultValue: 'WhatsApp' })}: {sel.whatsapp}
                </p>
              ) : null}
              {sel.telefone ? (
                <p>
                  {t('ventas.telefone', { defaultValue: 'Telefone' })}: {sel.telefone}
                </p>
              ) : null}
              {sel.email ? (
                <p>
                  {t('ventas.email', { defaultValue: 'E-mail' })}: {sel.email}
                </p>
              ) : null}
            </div>
            <p className="ventas-disclaimer">
              {t('ventas.disclaimer', {
                defaultValue:
                  'Orientese não intermedia a transação. Combine preço, envio e pagamento só com o anunciante do item.',
              })}
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="ventas-page">
      <header className="ventas-hero">
        <h1>{t('ventas.titulo', { defaultValue: 'EN VENTA' })}</h1>
        <p className="ventas-sub">
          {t('ventas.subtitulo', { defaultValue: 'novos e usados' })}
        </p>
        <p className="ventas-puente">
          {t('ventas.puente', {
            defaultValue: 'Quer visibilidade da marca no hub, não um equipamento?',
          })}{' '}
          <button type="button" className="ventas-link" onClick={irMarca}>
            {t('ventas.puenteCta', {
              defaultValue: 'Criar anúncio ou patrocínio',
            })}
          </button>
          .
        </p>
      </header>

      <div className="ventas-toolbar">
        <input
          type="search"
          className="ventas-search"
          placeholder={t('ventas.buscar', {
            defaultValue: 'Buscar modelo, cidade…',
          })}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="">
            {t('ventas.todasCat', { defaultValue: 'Todas as categorias' })}
          </option>
          {CATEGORIAS_VENTA.map((c) => (
            <option key={c.id} value={c.id}>
              {t(`ventas.cat.${c.id}`, { defaultValue: c.label })}
            </option>
          ))}
        </select>
        <select value={cond} onChange={(e) => setCond(e.target.value)}>
          <option value="">
            {t('ventas.todaCond', { defaultValue: 'Nova e usada' })}
          </option>
          {CONDICOES_VENTA.map((c) => (
            <option key={c.id} value={c.id}>
              {t(`ventas.cond.${c.id}`, { defaultValue: c.label })}
            </option>
          ))}
        </select>
        <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
          <option value="recentes">
            {t('ventas.recentes', { defaultValue: 'Mais recentes' })}
          </option>
          <option value="menor">
            {t('ventas.menor', { defaultValue: 'Menor preço' })}
          </option>
          <option value="maior">
            {t('ventas.maior', { defaultValue: 'Maior preço' })}
          </option>
        </select>
        <button
          type="button"
          className="ventas-cta"
          onClick={() => setModoForm(true)}
        >
          {t('ventas.cta', { defaultValue: 'Cadastrar item' })}
        </button>
      </div>

      {!isAuthenticated ? (
        <p className="ventas-help">
          {t('ventas.helpVisitante', {
            defaultValue:
              'Visitante pode ver o tabuleiro. Para publicar um item, entre com a conta do hub quando for salvar o cadastro.',
          })}
        </p>
      ) : null}

      {filtrados.length === 0 ? (
        <div className="ventas-vazio">
          <p>{t('ventas.vazio', { defaultValue: 'Nenhum item no momento.' })}</p>
          <button type="button" className="ventas-cta" onClick={() => setModoForm(true)}>
            {t('ventas.cta', { defaultValue: 'Cadastrar item' })}
          </button>
        </div>
      ) : (
        <div className="ventas-grid">
          {filtrados.map((it) => (
            <button
              key={it.id}
              type="button"
              className="ventas-card"
              onClick={() => setSel(it)}
            >
              <div className="ventas-card-foto" aria-hidden="true">
                {it.fotoPreview ? <img src={it.fotoPreview} alt="" /> : <span />}
              </div>
              <div className="ventas-card-body">
                <div className="ventas-badges">
                  <span className="ventas-badge">{labelCond(it.condicao)}</span>
                  <span className="ventas-badge is-cat">{labelCat(it.categoria)}</span>
                </div>
                <h2>{it.titulo}</h2>
                <p className="ventas-preco">{formatPrecoBRL(it.preco)}</p>
                <p className="ventas-lugar">
                  {it.cidade}
                  {it.estado ? ` · ${it.estado}` : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
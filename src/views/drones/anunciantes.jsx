// ==========================================
// ANUNCIANTES.JSX
// VITRINA: ANUNCIANTES + PATROCINADORES
// FORMULARIO = CadastroAnunciante.jsx
// MOCKS = anunciantes.json
// BETA LOCAL = localStorage
// SEM CHECKOUT
// ==========================================

import React, { useMemo, useState } from 'react';
import ANUNCIANTES_MOCK from '../../data/drones/anunciantes.json';
import CadastroAnunciante from '../../components/drones/formularios/CadastroAnunciante';
import {
  ESTADOS_BRASIL,
  PAISES_VITRINA,
} from '../../components/drones/formularios/anunciantesPaginas';

const STORAGE_KEY = 'drones.anunciantes.beta';

function normalizarTipoPersona(valor) {
  const t = String(valor || '').toLowerCase().trim();
  if (t === 'juridica' || t === 'jurídica' || t === 'pj') return 'juridica';
  return 'fisica';
}

function lerLocais() {
  try {
    const bruto = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(bruto) ? bruto : [];
  } catch (e) {
    return [];
  }
}

function gravarLocais(lista) {
  try {
    const soLocais = (lista || []).filter((i) => i.origem === 'local');
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(soLocais));
  } catch (e) { /* SIN STORAGE */ }
}

export default function Anunciantes() {
  const [modo, setModo] = useState('lista');
  const [itens, setItens] = useState(() => [
    ...lerLocais(),
    ...(ANUNCIANTES_MOCK || []).map((i) => ({ ...i, origem: 'mock' })),
  ]);

  const [busca, setBusca] = useState('');
  const [filtroPais, setFiltroPais] = useState('TODOS');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [filtroMod, setFiltroMod] = useState('TODOS');

  const hayFiltrosActivos =
    busca.trim() !== '' ||
    filtroPais !== 'TODOS' ||
    filtroEstado !== 'TODOS' ||
    filtroTipo !== 'TODOS' ||
    filtroMod !== 'TODOS';

  const handleLimparFiltros = () => {
    setBusca('');
    setFiltroPais('TODOS');
    setFiltroEstado('TODOS');
    setFiltroTipo('TODOS');
    setFiltroMod('TODOS');
  };

  const handleSalvar = (registro) => {
    const proxima = [registro, ...itens];
    setItens(proxima);
    gravarLocais(proxima);
    setModo('lista');
  };

  const lista = useMemo(() => {
    return itens.filter((item) => {
      const termo = busca.toLowerCase();
      const matchTexto =
        !termo ||
        (item.nome || '').toLowerCase().includes(termo) ||
        (item.segmento || '').toLowerCase().includes(termo) ||
        (item.cidade || '').toLowerCase().includes(termo);
      const matchPais = filtroPais === 'TODOS' || item.pais === filtroPais;
      const matchUF =
        filtroEstado === 'TODOS' ||
        item.pais !== 'BR' ||
        item.estado === filtroEstado;
      const tipo = normalizarTipoPersona(item.tipoPersona);
      const matchTipo = filtroTipo === 'TODOS' || tipo === filtroTipo;
      const matchMod = filtroMod === 'TODOS' || item.modalidade === filtroMod;
      return matchTexto && matchPais && matchUF && matchTipo && matchMod;
    });
  }, [itens, busca, filtroPais, filtroEstado, filtroTipo, filtroMod]);

  if (modo === 'cadastro') {
    return (
      <CadastroAnunciante
        onSalvar={handleSalvar}
        onCancelar={() => setModo('lista')}
      />
    );
  }

  return (
    <div style={{ padding: '28px 20px', maxWidth: 1240, margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        flexWrap: 'wrap',
        marginBottom: 24
      }}>
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
            Anunciantes / Patrocinadores
          </h1>
          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: 15 }}>
            Vitrine informativa. Até 6 espaços por página do hub, no período escolhido.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModo('cadastro')}
          style={{
            padding: '10px 18px',
            borderRadius: 10,
            border: 'none',
            background: '#1A8FD0',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Publicar aviso
        </button>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: 18,
        marginBottom: 12
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={filtroMod} onChange={(e) => setFiltroMod(e.target.value)} style={sel}>
            <option value="TODOS">Anunciantes e patrocinadores</option>
            <option value="anunciante">Só anunciantes</option>
            <option value="patrocinador">Só patrocinadores</option>
          </select>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} style={sel}>
            <option value="TODOS">Tipo de pessoa</option>
            <option value="fisica">Pessoa física</option>
            <option value="juridica">Pessoa jurídica</option>
          </select>
          <select value={filtroPais} onChange={(e) => setFiltroPais(e.target.value)} style={sel}>
            <option value="TODOS">Todos os países</option>
            {PAISES_VITRINA.map((p) => (
              <option key={p.code} value={p.code}>{p.label}</option>
            ))}
          </select>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={sel}>
            <option value="TODOS">UF (se Brasil)</option>
            {ESTADOS_BRASIL.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nome, segmento ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ flex: '1 1 200px', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          <button
            type="button"
            onClick={handleLimparFiltros}
            disabled={!hayFiltrosActivos}
            style={{
              background: 'none',
              border: 'none',
              color: hayFiltrosActivos ? '#C46B6B' : '#94a3b8',
              cursor: hayFiltrosActivos ? 'pointer' : 'default',
              fontWeight: 600,
              fontSize: 13
            }}
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {lista.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: 48 }}>
          Nenhum aviso com os filtros atuais.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {lista.map((item) => {
            const tipo = normalizarTipoPersona(item.tipoPersona);
            const wa = String(item.whatsapp || '').replace(/\D/g, '');
            return (
              <div key={item.id} style={{
                background: '#ffffff',
                border: item.modalidade === 'patrocinador' ? '2px solid #1A8FD0' : '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 20
              }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={chip(item.modalidade === 'patrocinador')}>
                    {item.modalidade === 'patrocinador' ? 'Patrocinador' : 'Anunciante'}
                  </span>
                  <span style={chip(false)}>
                    {tipo === 'juridica' ? 'Pessoa jurídica' : 'Pessoa física'}
                  </span>
                  {item.origem === 'local' && (
                    <span style={chip(true)}>Beta — neste navegador</span>
                  )}
                </div>
                {item.logoPreview && (
                  <img src={item.logoPreview} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, marginBottom: 10 }} />
                )}
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem' }}>{item.nome}</h3>
                {item.segmento && (
                  <p style={{ margin: '0 0 4px 0', fontSize: 13, color: '#1A8FD0', fontWeight: 600 }}>{item.segmento}</p>
                )}
                <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#64748b' }}>
                  {item.cidade}{item.pais === 'BR' && item.estado ? ` — ${item.estado}` : ''} · {item.pais || 'BR'}
                </p>
                {item.resumo && (
                  <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#64748b', lineHeight: 1.45 }}>{item.resumo}</p>
                )}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 13 }}>
                  {wa && (
                    <a href={`https://wa.me/55${wa}`} target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>WhatsApp</a>
                  )}
                  {item.telegram && (
                    <a href={`https://t.me/${String(item.telegram).replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'none' }}>Telegram</a>
                  )}
                  {item.email && (
                    <a href={`mailto:${item.email}`} style={{ color: '#475569', textDecoration: 'none' }}>E-mail</a>
                  )}
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer" style={{ color: '#1A8FD0', textDecoration: 'none' }}>Site</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const sel = {
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  background: '#fff',
};

function chip(destaque) {
  return {
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 20,
    background: destaque ? '#e0f2fe' : '#f1f5f9',
    color: destaque ? '#0369a1' : '#475569',
  };
}

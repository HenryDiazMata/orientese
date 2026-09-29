// ==========================================
// ARCHIVO COMPLETO:
// src/views/drones/anunciantes.jsx
// VITRINA ANUNCIANTES / PATROCINADORES
// FORMULARIO = CadastroAnunciante.jsx
// MOCKS = anunciantes.json
// BETA LOCAL = localStorage
// SEM CHECKOUT / SEM PASARELA
// GRILLA: 3 COLS ESCRITORIO → 2 TABLET → 1 TELEFONO
// ==========================================

import React, { useMemo, useState } from 'react';
import ANUNCIANTES_MOCK from '../../data/drones/anunciantes.json';
import CadastroAnunciante from '../../components/drones/formularios/CadastroAnunciante';
import {
  ESTADOS_BRASIL,
  PAISES_VITRINA,
  PRECIO_REF,
  LEYENDA_PRECIO,
  formatUSD,
  MAX_ESPACIOS_POR_PAGINA,
  MAX_PATROCINADORES_POR_PAGINA,
  PAGINAS_VITRINA,
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

// ASIGNA ESPACIO 1-6 POR PAGINA. PATROCINIO PRIORIZA 1-2
function asignarEspacios(registro, existentes) {
  const paginas = registro.paginas && registro.paginas.length
    ? registro.paginas
    : ['anunciantes'];
  const espaciosPorPagina = {};
  const preferido = Number(registro.espacioPreferido) || 0;

  paginas.forEach((paginaId) => {
    const ocupados = existentes
      .filter((i) => (i.paginas || ['anunciantes']).includes(paginaId))
      .map((i) => (i.espaciosPorPagina && i.espaciosPorPagina[paginaId]) || i.espacio)
      .filter((n) => Number(n) >= 1 && Number(n) <= MAX_ESPACIOS_POR_PAGINA)
      .map(Number);

    const libres = [];
    for (let n = 1; n <= MAX_ESPACIOS_POR_PAGINA; n += 1) {
      if (!ocupados.includes(n)) libres.push(n);
    }

    let elegido = null;
    if (registro.modalidade === 'patrocinador') {
      const libresPatro = libres.filter((n) => n <= MAX_PATROCINADORES_POR_PAGINA);
      if (preferido >= 1 && preferido <= MAX_PATROCINADORES_POR_PAGINA && libres.includes(preferido)) {
        elegido = preferido;
      } else if (libresPatro.length) {
        elegido = libresPatro[0];
      } else if (libres.length) {
        elegido = libres[0];
      }
    } else if (preferido >= 1 && libres.includes(preferido)) {
      elegido = preferido;
    } else if (libres.length) {
      elegido = libres[0];
    }

    espaciosPorPagina[paginaId] = elegido || null;
  });

  return espaciosPorPagina;
}

export default function Anunciantes() {
  const [modo, setModo] = useState('lista');
  const [itens, setItens] = useState(() => [
    ...lerLocais(),
    ...(ANUNCIANTES_MOCK || []).map((i) => ({ ...i, origem: i.origem || 'mock' })),
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
    const espaciosPorPagina = asignarEspacios(registro, itens);
    const conEspacio = {
      ...registro,
      espaciosPorPagina,
      espacio: espaciosPorPagina.anunciantes || Object.values(espaciosPorPagina)[0] || null,
    };
    const proxima = [conEspacio, ...itens];
    setItens(proxima);
    gravarLocais(proxima);
    setModo('lista');
  };

  const lista = useMemo(() => {
    const filtrada = itens.filter((item) => {
      const termo = busca.toLowerCase();
      const matchTexto =
        !termo ||
        (item.nome || '').toLowerCase().includes(termo) ||
        (item.segmento || '').toLowerCase().includes(termo) ||
        (item.cidade || '').toLowerCase().includes(termo);
      const matchPais = filtroPais === 'TODOS' || item.pais === filtroPais || (!item.pais && filtroPais === 'BR');
      const matchUF =
        filtroEstado === 'TODOS' ||
        item.pais !== 'BR' ||
        item.estado === filtroEstado;
      const tipo = normalizarTipoPersona(item.tipoPersona);
      const matchTipo = filtroTipo === 'TODOS' || tipo === filtroTipo;
      const matchMod = filtroMod === 'TODOS' || item.modalidade === filtroMod;
      return matchTexto && matchPais && matchUF && matchTipo && matchMod;
    });

    // PATROCINADORES PRIMERO, LUEGO POR ESPACIO
    return filtrada.slice().sort((a, b) => {
      const pa = a.modalidade === 'patrocinador' ? 0 : 1;
      const pb = b.modalidade === 'patrocinador' ? 0 : 1;
      if (pa !== pb) return pa - pb;
      return (Number(a.espacio) || 99) - (Number(b.espacio) || 99);
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
      {/* HERO COMERCIAL */}
      <div style={{
        background: '#BFE8F7',
        borderRadius: 16,
        padding: '28px 24px',
        marginBottom: 24,
      }}>
        <h1 style={{ margin: 0, fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
          Sua marca em drones.orientese.com
        </h1>
        <p style={{ margin: '8px 0 16px 0', color: '#334155', fontSize: 16, maxWidth: 720 }}>
          Espaços publicitários no hub informativo. Contato direto. Sem intermediação de negócio.
          Até {MAX_ESPACIOS_POR_PAGINA} espaços por página.
        </p>
        <button type="button" onClick={() => setModo('cadastro')} style={btnCta}>
          CRIAR ANÚNCIO OU PATROCÍNIO
        </button>
      </div>

      {/* UN SOLO CARD CONTENEDOR — VERDE BILLETE 100 */}
      <div style={cardContenedorBillete}>
        <div style={gridTres}>
          <div style={cardBenef}>
            <strong>6 espaços por página</strong>
            <p style={pMuted}>Inventário limitado. Ordem de leitura 3×2 no desktop.</p>
          </div>
          <div style={cardBenef}>
            <strong>Vigência que você escolhe</strong>
            <p style={pMuted}>30, 90, 180 ou 365 dias. Pró-rata sobre 30.</p>
          </div>
          <div style={cardBenef}>
            <strong>Contato direto</strong>
            <p style={pMuted}>Logo, site, e-mail, telefone, WhatsApp e Telegram.</p>
          </div>
          <div style={cardBenef}>
            <strong>Anúncio</strong>
            <p style={pMuted}>Card padrão. {formatUSD(PRECIO_REF.anunciante.base30d)} / 30 dias / 1 página. Extra + {formatUSD(PRECIO_REF.anunciante.paginaExtra)}.</p>
          </div>
          <div style={{ ...cardBenef, border: '2px solid #22C55E' }}>
            <strong>Patrocínio</strong>
            <p style={pMuted}>
              Mesmo card, destaque (borda verde + badge). Prioridade espaços 1–2.
              Máx. {MAX_PATROCINADORES_POR_PAGINA} por página. {formatUSD(PRECIO_REF.patrocinador.base30d)} / 30 dias / 1 página. Extra + {formatUSD(PRECIO_REF.patrocinador.paginaExtra)}.
            </p>
          </div>
          <div style={cardBenef}>
            <strong>PREÇOS VIGENTES — ESPAÇOS PUBLICITÁRIOS</strong>
            <p style={pMuted}>
              Prazos 30 · 90 · 180 · 365. {LEYENDA_PRECIO}
            </p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
        flexWrap: 'wrap',
        margin: '8px 0 16px',
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
            Anunciantes / Patrocinadores
          </h2>
          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: 14 }}>
            Publicação nesta vitrine e nas páginas marcadas no cadastro.
          </p>
        </div>
        <button type="button" onClick={() => setModo('cadastro')} style={btnCta}>
          CRIAR ANÚNCIO OU PATROCÍNIO
        </button>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: 18,
        marginBottom: 12,
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
            placeholder="Nome ou cidade..."
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
              fontSize: 13,
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 20,
        }}>
          {lista.map((item) => {
            const tipo = normalizarTipoPersona(item.tipoPersona);
            const wa = String(item.whatsapp || '').replace(/\D/g, '');
            const esPatro = item.modalidade === 'patrocinador';
            const pagLabels = (item.paginas || [])
              .map((id) => (PAGINAS_VITRINA.find((p) => p.id === id) || {}).label || id)
              .filter(Boolean);
            return (
              <div
                key={item.id}
                style={{
                  background: '#ffffff',
                  border: esPatro ? '3px solid #22C55E' : '1px solid #cfe3d4',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={chip(esPatro)}>
                    {esPatro ? 'PATROCINADOR' : 'Anunciante'}
                  </span>
                  <span style={chip(false)}>
                    {tipo === 'juridica' ? 'Pessoa jurídica' : 'Pessoa física'}
                  </span>
                  {item.espacio ? (
                    <span style={chip(false)}>Espaço {item.espacio}</span>
                  ) : null}
                  {item.origem === 'local' && (
                    <span style={chip(true)}>Beta — neste navegador</span>
                  )}
                </div>
                {item.logoPreview && (
                  <img
                    src={item.logoPreview}
                    alt=""
                    style={{
                      width: esPatro ? 72 : 56,
                      height: esPatro ? 72 : 56,
                      objectFit: 'cover',
                      borderRadius: 8,
                      marginBottom: 10,
                    }}
                  />
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
                {pagLabels.length > 0 && (
                  <p style={{ margin: '0 0 10px 0', fontSize: 12, color: '#94a3b8' }}>
                    Páginas: {pagLabels.join(', ')}
                  </p>
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
                  {item.telefone && (
                    <a href={`tel:${item.telefone}`} style={{ color: '#475569', textDecoration: 'none' }}>Tel</a>
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

const btnCta = {
  padding: '12px 18px',
  borderRadius: 10,
  border: 'none',
  background: '#22C55E',
  color: '#fff',
  fontWeight: 800,
  cursor: 'pointer',
  letterSpacing: 0.2,
};

const cardContenedorBillete = {
  background: '#D7E8D4',
  border: '1px solid #8FB89A',
  borderRadius: 18,
  padding: 16,
  marginBottom: 20,
  boxShadow: 'inset 0 0 0 1px rgba(27, 67, 50, 0.06)',
};

const gridTres = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
  gap: 12,
  marginBottom: 20,
};

const cardBenef = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: 14,
  padding: 16,
};

const pMuted = { margin: '6px 0 0 0', color: '#64748b', fontSize: 14 };

function chip(destaque) {
  return {
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 20,
    background: destaque ? '#F4E7B8' : '#f1f5f9',
    color: destaque ? '#6B5420' : '#475569',
  };
}

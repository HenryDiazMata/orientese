// ==========================================
// VAGAS.JSX
// LISTADO INFORMATIVO DE VACANTES
// MOCKS = src/data/drones/vagas.json
// TIPO PERSONA = DE QUIEN PUBLICA (EMPRESA / PF). NO ES ROL NUEVO
// SIN PRECIOS / SIN SALARIOS INVENTADOS
// CadastroVagas DEL HUB PROFISSIONAIS NO SE TOCA AQUI
// ==========================================

import React, { useMemo, useState } from 'react';
import VAGAS_MOCK from '../../data/drones/vagas.json';

const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

function normalizarTipoPersona(valor) {
  const t = String(valor || '').toLowerCase().trim();
  if (t === 'juridica' || t === 'jurídica' || t === 'pj') return 'juridica';
  return 'fisica';
}

export default function Vagas() {
  const [busca, setBusca] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');

  const hayFiltrosActivos =
    busca.trim() !== '' ||
    filtroEstado !== 'TODOS' ||
    filtroTipo !== 'TODOS';

  const handleLimparFiltros = () => {
    setBusca('');
    setFiltroEstado('TODOS');
    setFiltroTipo('TODOS');
  };

  const vagasFiltradas = useMemo(() => {
    return (VAGAS_MOCK || []).filter((vaga) => {
      const termo = busca.toLowerCase();
      const matchTexto =
        !termo ||
        (vaga.titulo || '').toLowerCase().includes(termo) ||
        (vaga.empresa || '').toLowerCase().includes(termo) ||
        (vaga.local || '').toLowerCase().includes(termo) ||
        (vaga.area || '').toLowerCase().includes(termo);
      const matchUF = filtroEstado === 'TODOS' || vaga.estado === filtroEstado;
      const tipo = normalizarTipoPersona(vaga.tipoPersona);
      const matchTipo = filtroTipo === 'TODOS' || tipo === filtroTipo;
      return matchTexto && matchUF && matchTipo;
    });
  }, [busca, filtroEstado, filtroTipo]);

  return (
    <div style={{ padding: '28px 20px', maxWidth: 1240, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, textAlign: 'left' }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
          Vagas
        </h1>
        <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: 15 }}>
          Oportunidades informativas da área de drones. Dados de teste (beta).
        </p>
      </div>

      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 14,
        padding: 18,
        marginBottom: 12
      }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="TODOS">Tipo de pessoa (quem publica)</option>
            <option value="fisica">Pessoa física</option>
            <option value="juridica">Pessoa jurídica</option>
          </select>
          <input
            type="text"
            placeholder="Buscar por título, empresa ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ flex: '1 1 240px', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1' }}
          />
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="TODOS">Todos os Estados</option>
            {ESTADOS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
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

      {vagasFiltradas.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: 48 }}>
          Nenhuma vaga encontrada com os filtros atuais.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {vagasFiltradas.map((vaga) => {
            const tipo = normalizarTipoPersona(vaga.tipoPersona);
            return (
              <div
                key={vaga.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 16,
                  padding: 20
                }}
              >
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: '#e0f2fe',
                    color: '#0369a1'
                  }}>
                    {vaga.contrato}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 20,
                    background: tipo === 'juridica' ? '#e0f2fe' : '#f1f5f9',
                    color: tipo === 'juridica' ? '#0369a1' : '#475569'
                  }}>
                    {tipo === 'juridica' ? 'Pessoa jurídica' : 'Pessoa física'}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.15rem', color: '#0f172a' }}>{vaga.titulo}</h3>
                <p style={{ margin: '0 0 4px 0', fontSize: 14, color: '#334155' }}>{vaga.empresa}</p>
                <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#64748b' }}>
                  {vaga.local}{vaga.estado ? ` — ${vaga.estado}` : ''}
                </p>
                {vaga.area && (
                  <p style={{ margin: '0 0 8px 0', fontSize: 13, color: '#1A8FD0', fontWeight: 600 }}>{vaga.area}</p>
                )}
                {vaga.descricao && (
                  <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.45 }}>{vaga.descricao}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

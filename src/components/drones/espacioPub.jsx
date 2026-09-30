// ==========================================
// ARCHIVO: src/components/drones/espacioPub.jsx
// 6 espacios publicitarios por página del hub
// NO es formulario. Solo pinta avisos guardados.
// Lee mocks + localStorage (drones.anunciantes.beta)
// Filtra por paginaId === item.paginas[]
// Logo: contain (no recorta)
// Card: no se sale del main (minWidth 0 + wordBreak)
// Uso: <EspacioPub paginaId="planes" />
// ==========================================

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ANUNCIANTES_MOCK from '../../data/drones/anunciantes.json';
import { MAX_ESPACIOS_POR_PAGINA } from './formularios/anunciantesPaginas';

const STORAGE_KEY = 'drones.anunciantes.beta';

const logoBox = {
  width: '100%',
  maxWidth: 64,
  height: 64,
  objectFit: 'contain',
  objectPosition: 'center',
  background: '#f8fafc',
  borderRadius: 8,
  marginBottom: 8,
  display: 'block',
};

function leerLocais() {
  try {
    const bruto = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(bruto) ? bruto : [];
  } catch (e) {
    return [];
  }
}

function chip(destaque) {
  return {
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 16,
    background: destaque ? '#F4E7B8' : '#f1f5f9',
    color: destaque ? '#6B5420' : '#475569',
  };
}

export default function EspacioPub({ paginaId = 'inicio' }) {
  const { t } = useTranslation();

  const lista = useMemo(() => {
    const todos = [
      ...leerLocais(),
      ...(ANUNCIANTES_MOCK || []).map((i) => ({ ...i, origem: i.origem || 'mock' })),
    ];
    return todos
      .filter((item) => (item.paginas || ['anunciantes']).includes(paginaId))
      .slice()
      .sort((a, b) => {
        const pa = a.modalidade === 'patrocinador' ? 0 : 1;
        const pb = b.modalidade === 'patrocinador' ? 0 : 1;
        if (pa !== pb) return pa - pb;
        const ea = (a.espaciosPorPagina && a.espaciosPorPagina[paginaId]) || a.espacio || 99;
        const eb = (b.espaciosPorPagina && b.espaciosPorPagina[paginaId]) || b.espacio || 99;
        return Number(ea) - Number(eb);
      })
      .slice(0, MAX_ESPACIOS_POR_PAGINA);
  }, [paginaId]);

  const huecos = Array.from(
    { length: MAX_ESPACIOS_POR_PAGINA },
    (_, i) => lista[i] || null
  );

  return (
    <aside
      className="drones-espacio-pub"
      style={{
        marginTop: '1.25rem',
        marginBottom: '1.5rem',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '0 8px',
      }}
    >
      <p
        style={{
          margin: '0 0 0.7rem',
          fontWeight: 700,
          color: '#1A8FD0',
          letterSpacing: '0.06em',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {t('inicio.espacioAnunciantes')}
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
          gap: '0.7rem',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {huecos.map((item, idx) => {
          if (!item) {
            return (
              <article
                key={`vacio-${paginaId}-${idx}`}
                style={{
                  background: '#fff',
                  border: '1px dashed #cbd5e1',
                  borderRadius: 12,
                  minHeight: 96,
                  minWidth: 0,
                  boxSizing: 'border-box',
                }}
              />
            );
          }

          const esPatro = item.modalidade === 'patrocinador';
          const wa = String(item.whatsapp || '').replace(/\D/g, '');

          return (
            <article
              key={item.id}
              style={{
                background: '#fff',
                border: esPatro ? '2px solid #22C55E' : '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 12,
                minHeight: 96,
                minWidth: 0,
                maxWidth: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={chip(esPatro)}>
                  {esPatro
                    ? t('anunciantes.badgePatrocinador')
                    : t('anunciantes.badgeAnunciante')}
                </span>
              </div>

              {item.logoPreview ? (
                <img src={item.logoPreview} alt="" style={logoBox} />
              ) : null}

              <strong
                style={{
                  display: 'block',
                  fontSize: 13,
                  wordBreak: 'break-word',
                }}
              >
                {item.nome}
              </strong>

              {item.resumo ? (
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: 11,
                    color: '#64748b',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.resumo}
                </p>
              ) : null}

              <div
                style={{
                  marginTop: 6,
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  fontSize: 11,
                }}
              >
                {wa ? (
                  <a
                    href={`https://wa.me/55${wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#16a34a' }}
                  >
                    WhatsApp
                  </a>
                ) : null}
                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1A8FD0' }}
                  >
                    {t('anunciantes.sitio')}
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}